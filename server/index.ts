import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Multiple fallback paths for serving static assets in different environments
const possiblePublicPaths = [
  path.resolve(import.meta.dirname, "public"),           // Production: dist/public
  path.resolve(import.meta.dirname, "..", "public"),     // Development: workspace/public  
  path.resolve(import.meta.dirname, "..", "client", "public"), // Fallback: client/public
];

let publicPath = null;
for (const testPath of possiblePublicPaths) {
  if (fs.existsSync(testPath)) {
    publicPath = testPath;
    break;
  }
}

if (!publicPath) {
  console.error("[ASSET SERVING] ERROR: No valid public directory found!");
  publicPath = possiblePublicPaths[0]; // Use first as fallback
}

console.log(`[ASSET SERVING] Environment: ${process.env.NODE_ENV}`);
console.log(`[ASSET SERVING] Using publicPath: ${publicPath}`);

const videosPath = path.join(publicPath, "videos");
const audioPath = path.join(publicPath, "audio");

console.log(`[ASSET SERVING] Videos path: ${videosPath} (exists: ${fs.existsSync(videosPath)})`);
console.log(`[ASSET SERVING] Audio path: ${audioPath} (exists: ${fs.existsSync(audioPath)})`);

// Direct file serving endpoints for videos
app.get('/videos/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(videosPath, filename);
  
  console.log(`[VIDEO API] Request for: ${filename}, checking: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`[VIDEO API] File not found: ${filePath}`);
    return res.status(404).json({ error: 'Video file not found' });
  }
  
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
      'Accept-Ranges': 'bytes',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
  
  console.log(`[VIDEO API] Serving: ${filePath} (${fileSize} bytes)`);
});

// Direct file serving endpoints for audio
app.get('/audio/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(audioPath, filename);
  
  console.log(`[AUDIO API] Request for: ${filename}, checking: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`[AUDIO API] File not found: ${filePath}`);
    return res.status(404).json({ error: 'Audio file not found' });
  }
  
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  
  const contentType = filename.endsWith('.mp3') ? 'audio/mpeg' : 
                      filename.endsWith('.aac') ? 'audio/aac' : 'audio/mpeg';
  
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
  
  console.log(`[AUDIO API] Serving: ${filePath} (${fileSize} bytes)`);
});

console.log(`[ASSET SERVING] Direct API endpoints configured`);
console.log(`[ASSET SERVING] Videos: ${fs.existsSync(videosPath) ? 'FOUND' : 'MISSING'} at ${videosPath}`);
console.log(`[ASSET SERVING] Audio: ${fs.existsSync(audioPath) ? 'FOUND' : 'MISSING'} at ${audioPath}`);

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
