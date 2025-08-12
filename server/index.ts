import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { MediaHandler } from "./media-handler.js";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize Media Handler for robust asset serving
const mediaHandler = new MediaHandler();

// New approach: Serve media as data URLs via API endpoints
app.get('/api/media/all', (req, res) => {
  try {
    const allMedia = mediaHandler.getAllMedia();
    res.json({
      success: true,
      media: allMedia,
      timestamp: Date.now()
    });
    console.log(`[MEDIA API] Served all media data (${Object.keys(allMedia.videos).length} videos, ${Object.keys(allMedia.audio).length} audio files)`);
  } catch (error) {
    console.error('[MEDIA API] Error serving media:', error);
    res.status(500).json({ success: false, error: 'Failed to load media' });
  }
});

// Fallback streaming endpoints for compatibility
app.get('/videos/:filename', (req, res) => {
  const success = mediaHandler.streamFile('video', req.params.filename, req, res);
  if (!success) {
    res.status(404).json({ error: 'Video not found' });
  }
});

app.get('/audio/:filename', (req, res) => {
  const success = mediaHandler.streamFile('audio', req.params.filename, req, res);
  if (!success) {
    res.status(404).json({ error: 'Audio not found' });
  }
});

console.log(`[MEDIA HANDLER] Initialized with data URL and streaming support`);

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
