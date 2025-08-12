import fs from 'fs';
import path from 'path';

// Alternative approach: Convert media files to base64 data URLs for reliable serving
export class MediaHandler {
  private mediaCache = new Map<string, string>();
  private videosPath: string;
  private audioPath: string;

  constructor() {
    // Try multiple possible paths for media files
    const possiblePaths = [
      path.resolve(import.meta.dirname, "public"),                    // Production dist/public
      path.resolve(import.meta.dirname, "..", "public"),              // Development public/
      path.resolve(import.meta.dirname, "..", "client", "public"),    // Client public/
      path.resolve(process.cwd(), "public"),                          // Root public/
      path.resolve(process.cwd(), "dist", "public"),                  // Production build path
    ];

    let basePath = null;
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        basePath = testPath;
        break;
      }
    }

    if (!basePath) {
      console.error("[MEDIA HANDLER] No valid base path found");
      basePath = possiblePaths[0];
    }

    this.videosPath = path.join(basePath, "videos");
    this.audioPath = path.join(basePath, "audio");
    
    console.log(`[MEDIA HANDLER] Base path: ${basePath}`);
    console.log(`[MEDIA HANDLER] Videos: ${this.videosPath} (exists: ${fs.existsSync(this.videosPath)})`);
    console.log(`[MEDIA HANDLER] Audio: ${this.audioPath} (exists: ${fs.existsSync(this.audioPath)})`);
    
    // Debug: List actual files found
    if (fs.existsSync(this.videosPath)) {
      const videoFiles = fs.readdirSync(this.videosPath).filter(f => f.endsWith('.mp4'));
      console.log(`[MEDIA HANDLER] Found ${videoFiles.length} video files:`, videoFiles.slice(0, 3));
    }
    if (fs.existsSync(this.audioPath)) {
      const audioFiles = fs.readdirSync(this.audioPath).filter(f => f.endsWith('.mp3') || f.endsWith('.aac'));
      console.log(`[MEDIA HANDLER] Found ${audioFiles.length} audio files:`, audioFiles.slice(0, 3));
    }
  }

  // Get file as base64 data URL for embedding
  getFileAsDataURL(type: 'video' | 'audio', filename: string): string | null {
    const cacheKey = `${type}:${filename}`;
    
    if (this.mediaCache.has(cacheKey)) {
      return this.mediaCache.get(cacheKey)!;
    }

    const basePath = type === 'video' ? this.videosPath : this.audioPath;
    const filePath = path.join(basePath, filename);

    if (!fs.existsSync(filePath)) {
      console.log(`[MEDIA HANDLER] File not found: ${filePath}`);
      return null;
    }

    try {
      const fileBuffer = fs.readFileSync(filePath);
      const base64 = fileBuffer.toString('base64');
      
      let mimeType = '';
      if (type === 'video') {
        mimeType = 'video/mp4';
      } else {
        mimeType = filename.endsWith('.mp3') ? 'audio/mpeg' : 'audio/aac';
      }
      
      const dataURL = `data:${mimeType};base64,${base64}`;
      this.mediaCache.set(cacheKey, dataURL);
      
      console.log(`[MEDIA HANDLER] Cached ${type} file: ${filename} (${Math.round(fileBuffer.length / 1024)}KB)`);
      return dataURL;
    } catch (error) {
      console.error(`[MEDIA HANDLER] Error reading file ${filePath}:`, error);
      return null;
    }
  }

  // Get all available media files as data URLs
  getAllMedia() {
    const media = {
      videos: {} as Record<string, string>,
      audio: {} as Record<string, string>
    };

    // Load videos
    if (fs.existsSync(this.videosPath)) {
      const videoFiles = fs.readdirSync(this.videosPath).filter(f => f.endsWith('.mp4'));
      for (const file of videoFiles) {
        const dataURL = this.getFileAsDataURL('video', file);
        if (dataURL) {
          media.videos[file] = dataURL;
        }
      }
    }

    // Load audio
    if (fs.existsSync(this.audioPath)) {
      const audioFiles = fs.readdirSync(this.audioPath).filter(f => f.endsWith('.mp3') || f.endsWith('.aac'));
      for (const file of audioFiles) {
        const dataURL = this.getFileAsDataURL('audio', file);
        if (dataURL) {
          media.audio[file] = dataURL;
        }
      }
    }

    console.log(`[MEDIA HANDLER] Loaded ${Object.keys(media.videos).length} videos, ${Object.keys(media.audio).length} audio files`);
    return media;
  }

  // Alternative: Serve files directly via streaming (keeping original approach as fallback)
  streamFile(type: 'video' | 'audio', filename: string, req: any, res: any): boolean {
    const basePath = type === 'video' ? this.videosPath : this.audioPath;
    const filePath = path.join(basePath, filename);

    if (!fs.existsSync(filePath)) {
      return false;
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    const mimeType = type === 'video' ? 'video/mp4' : 
                     filename.endsWith('.mp3') ? 'audio/mpeg' : 'audio/aac';

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
        'Content-Type': mimeType,
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': mimeType,
        'Accept-Ranges': 'bytes',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }

    console.log(`[MEDIA HANDLER] Streamed ${type}: ${filename} (${fileSize} bytes)`);
    return true;
  }
}