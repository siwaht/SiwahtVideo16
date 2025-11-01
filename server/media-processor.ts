import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import { logger } from "./utils/logger";

// Ensure uploads directory exists
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const COMPRESSED_DIR = path.join(UPLOAD_DIR, "compressed");
const THUMBNAILS_DIR = path.join(UPLOAD_DIR, "thumbnails");

// Create directories if they don't exist
async function ensureDirectories() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.mkdir(COMPRESSED_DIR, { recursive: true });
  await fs.mkdir(THUMBNAILS_DIR, { recursive: true });
}

interface ProcessedMedia {
  compressedPath: string;
  thumbnailPath?: string;
  duration?: string;
  fileSize: string;
  metadata?: {
    width?: number;
    height?: number;
    codec?: string;
    bitrate?: string;
  };
}

export class MediaProcessor {
  private initPromise: Promise<void>;

  constructor() {
    // Store the initialization promise
    this.initPromise = ensureDirectories().catch(err => {
      logger.error("Failed to create upload directories", err);
      throw err;
    });
  }

  // Ensure directories are created before processing
  private async ensureReady(): Promise<void> {
    await this.initPromise;
  }

  // Generate unique filename
  private generateFilename(originalName: string): string {
    const timestamp = Date.now();
    const hash = crypto.randomBytes(4).toString("hex");
    const ext = path.extname(originalName);
    const name = path.basename(originalName, ext);
    return `${name}-${timestamp}-${hash}${ext}`;
  }

  // Process video file
  async processVideo(inputPath: string, originalName: string): Promise<ProcessedMedia> {
    await this.ensureReady();

    const outputFilename = this.generateFilename(originalName).replace(/\.[^.]+$/, ".mp4");
    const outputPath = path.join(COMPRESSED_DIR, outputFilename);
    const thumbnailFilename = outputFilename.replace(".mp4", ".jpg");
    const thumbnailPath = path.join(THUMBNAILS_DIR, thumbnailFilename);

    return new Promise((resolve, reject) => {
      // Get video metadata first
      ffmpeg.ffprobe(inputPath, (err, metadata) => {
        if (err) {
          logger.warn("Error getting video metadata, continuing without metadata", err);
        }

        const videoStream = metadata?.streams?.find(s => s.codec_type === "video");
        const duration = metadata?.format?.duration;

        // Compress video
        ffmpeg(inputPath)
          .outputOptions([
            "-c:v libx264",        // H.264 codec
            "-preset medium",       // Compression preset
            "-crf 28",             // Quality (lower = better, 23 is default)
            "-c:a aac",            // AAC audio codec
            "-b:a 128k",           // Audio bitrate
            "-movflags +faststart", // Web optimization
            "-vf scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" // Max 720p
          ])
          .on("end", async () => {
            logger.info("Video compression completed", { filename: outputFilename });

            // Generate thumbnail
            ffmpeg(outputPath)
              .screenshots({
                timestamps: ["10%"],
                filename: thumbnailFilename,
                folder: THUMBNAILS_DIR,
                size: "320x240"
              })
              .on("end", async () => {
                try {
                  const stats = await fs.stat(outputPath);

                  resolve({
                    compressedPath: `/uploads/compressed/${outputFilename}`,
                    thumbnailPath: `/uploads/thumbnails/${thumbnailFilename}`,
                    duration: duration ? Math.round(duration).toString() : undefined,
                    fileSize: stats.size.toString(),
                    metadata: {
                      width: videoStream?.width,
                      height: videoStream?.height,
                      codec: videoStream?.codec_name,
                      bitrate: metadata?.format?.bit_rate?.toString()
                    }
                  });
                } catch (statError) {
                  logger.error("Error reading video stats", statError);
                  reject(statError);
                }
              })
              .on("error", async (err) => {
                logger.warn("Error generating thumbnail, continuing without it", err);
                // Continue without thumbnail
                try {
                  const stats = await fs.stat(outputPath);
                  resolve({
                    compressedPath: `/uploads/compressed/${outputFilename}`,
                    duration: duration ? Math.round(duration).toString() : undefined,
                    fileSize: stats.size.toString(),
                    metadata: {
                      width: videoStream?.width,
                      height: videoStream?.height,
                      codec: videoStream?.codec_name,
                      bitrate: metadata?.format?.bit_rate?.toString()
                    }
                  });
                } catch (statError) {
                  logger.error("Error reading video stats after thumbnail failure", statError);
                  reject(statError);
                }
              });
          })
          .on("error", (err) => {
            logger.error("Error compressing video", err);
            reject(err);
          })
          .save(outputPath);
      });
    });
  }

  // Process audio file
  async processAudio(inputPath: string, originalName: string): Promise<ProcessedMedia> {
    await this.ensureReady();

    const outputFilename = this.generateFilename(originalName).replace(/\.[^.]+$/, ".mp3");
    const outputPath = path.join(COMPRESSED_DIR, outputFilename);

    return new Promise((resolve, reject) => {
      // Get audio metadata first
      ffmpeg.ffprobe(inputPath, (err, metadata) => {
        if (err) {
          logger.warn("Error getting audio metadata, continuing without metadata", err);
        }

        const duration = metadata?.format?.duration;

        // Compress audio
        ffmpeg(inputPath)
          .outputOptions([
            "-c:a libmp3lame",     // MP3 codec
            "-b:a 128k",           // Bitrate 128kbps
            "-ar 44100"            // Sample rate
          ])
          .on("end", async () => {
            logger.info("Audio compression completed", { filename: outputFilename });
            try {
              const stats = await fs.stat(outputPath);

              resolve({
                compressedPath: `/uploads/compressed/${outputFilename}`,
                duration: duration ? Math.round(duration).toString() : undefined,
                fileSize: stats.size.toString(),
                metadata: {
                  codec: "mp3",
                  bitrate: "128k"
                }
              });
            } catch (statError) {
              logger.error("Error reading audio stats", statError);
              reject(statError);
            }
          })
          .on("error", (err) => {
            logger.error("Error compressing audio", err);
            reject(err);
          })
          .save(outputPath);
      });
    });
  }

  // Main processing method
  async processMedia(
    inputPath: string, 
    originalName: string, 
    fileType: "video" | "audio"
  ): Promise<ProcessedMedia> {
    if (fileType === "video") {
      return this.processVideo(inputPath, originalName);
    } else {
      return this.processAudio(inputPath, originalName);
    }
  }

  // Sanitize file path to prevent directory traversal
  private sanitizeFilePath(filePath: string): string {
    // Remove leading slash
    const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;

    // Resolve the path and ensure it stays within the public directory
    const publicDir = path.join(process.cwd(), "public");
    const resolvedPath = path.resolve(publicDir, cleanPath);

    // Check if the resolved path is within the public directory
    if (!resolvedPath.startsWith(publicDir)) {
      throw new Error(`Invalid file path: ${filePath}`);
    }

    return resolvedPath;
  }

  // Delete media files
  async deleteMediaFiles(compressedPath: string, thumbnailPath?: string): Promise<void> {
    try {
      // Sanitize and delete compressed file
      const compressedFullPath = this.sanitizeFilePath(compressedPath);
      await fs.unlink(compressedFullPath);

      if (thumbnailPath) {
        try {
          const thumbnailFullPath = this.sanitizeFilePath(thumbnailPath);
          await fs.unlink(thumbnailFullPath);
        } catch (err) {
          // Ignore error if thumbnail doesn't exist or can't be deleted
          logger.warn("Could not delete thumbnail", err);
        }
      }
    } catch (error) {
      logger.error("Error deleting media files", error);
      throw error;
    }
  }
}

export const mediaProcessor = new MediaProcessor();