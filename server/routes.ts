import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertContactSubmissionSchema,
  updateMediaSchema,
  type Media,
} from "@shared/schema";
import { z } from "zod";
import { adminLogin, adminLogout, requireAuth, checkAuth } from "./middleware/auth";
import { mediaStorage } from "./media-storage";
import { mediaProcessor } from "./media-processor";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

// Helper to transform media items for public sample endpoints
function mapMediaToSample(
  media: Media,
  index: number,
  transform: (m: Media, i: number) => Record<string, unknown>,
) {
  return {
    id: media.id,
    ...transform(media, index),
    isPublished: true,
    createdAt: media.createdAt,
    updatedAt: media.updatedAt,
  };
}

// Creates a public sample endpoint that fetches media by category and transforms it
function registerSampleRoute(
  app: Express,
  path: string,
  category: string,
  fileType: "video" | "audio",
  transform: (m: Media, i: number) => Record<string, unknown>,
) {
  app.get(path, async (_req, res) => {
    try {
      const items = await mediaStorage.getMediaByCategory(category);
      const filtered = items
        .filter((m) => m.fileType === fileType)
        .map((m, i) => mapMediaToSample(m, i, transform));
      res.json(filtered);
    } catch (error) {
      console.error(`Error fetching ${path}:`, error);
      res.status(500).json({ error: `Failed to fetch data` });
    }
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Public sample endpoints
  registerSampleRoute(app, "/api/samples/demo-videos", "AI Video Studio", "video", (m, i) => ({
    title: m.title,
    description: m.description || "Professional AI-generated video content",
    videoUrl: m.compressedFilePath,
    thumbnailUrl: m.thumbnailPath || null,
    category: "demo",
    duration: m.duration || "30s",
    orderIndex: i,
  }));

  registerSampleRoute(app, "/api/samples/avatars", "Avatar Studio", "video", (m, i) => ({
    name: m.title,
    role: "Custom Avatar",
    videoUrl: m.compressedFilePath,
    thumbnailUrl: m.thumbnailPath || null,
    description: m.description || "Professional AI-generated avatar",
    orderIndex: i,
  }));

  registerSampleRoute(app, "/api/samples/voice-samples", "Professional Multilingual Voice Ads", "audio", (m, i) => ({
    name: m.title,
    language: m.audioMetadata?.language || "English",
    gender: m.audioMetadata?.gender || "Neutral",
    accent: m.audioMetadata?.accent || undefined,
    ageRange: m.audioMetadata?.ageRange || undefined,
    audioUrl: m.compressedFilePath,
    duration: m.duration || "30s",
    description: m.description || "Custom voice ad",
    orderIndex: i,
  }));

  registerSampleRoute(app, "/api/samples/edited-videos", "AI Video Editing", "video", (m, i) => ({
    title: m.title,
    projectType: "Custom Edit",
    duration: m.duration || "60s",
    videoUrl: m.compressedFilePath,
    thumbnailUrl: m.thumbnailPath || null,
    description: m.description || "Professionally edited video content",
    orderIndex: i,
  }));

  registerSampleRoute(app, "/api/samples/podcast-samples", "Interactive AI Avatars", "audio", (m, i) => ({
    title: m.title,
    category: m.audioMetadata?.tags?.[0] || "general",
    episodeNumber: m.audioMetadata?.episodeType || "",
    duration: m.duration || "15m",
    audioUrl: m.compressedFilePath,
    description: m.description || "Professional podcast episode",
    hostName: m.audioMetadata?.hostName || undefined,
    guestName: m.audioMetadata?.guestName || undefined,
    orderIndex: i,
  }));

  // Contact form submission — validates, stores, and forwards to webhook
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);

      // Forward to webhook in the background (don't block the response)
      const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
      if (webhookUrl) {
        const webhookData = {
          fullName: validatedData.fullName,
          email: validatedData.email,
          company: validatedData.company || "",
          projectDetails: validatedData.projectDetails,
          timestamp: new Date().toISOString(),
        };
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webhookData),
        }).catch((err) => console.error("Webhook delivery failed:", err));
      }

      res.json({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
        id: submission.id,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors,
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  });

  // Admin Routes
  // Configure multer for file uploads
  const upload = multer({
    dest: path.join(process.cwd(), "temp-uploads"),
    limits: {
      fileSize: 500 * 1024 * 1024, // 500MB max file size
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = [
        'video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm',
        'audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav'
      ];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only video and audio files are allowed.'));
      }
    }
  });

  // Auth endpoints
  app.post("/api/admin/login", adminLogin);
  app.post("/api/admin/logout", adminLogout);
  app.get("/api/admin/check-auth", checkAuth);

  // Protected admin endpoints
  app.get("/api/admin/media", requireAuth, async (req, res) => {
    try {
      const media = await mediaStorage.getAllMedia();
      res.json(media);
    } catch (error) {
      console.error("Error fetching media:", error);
      res.status(500).json({ error: "Failed to fetch media" });
    }
  });

  app.get("/api/admin/media/:id", requireAuth, async (req, res) => {
    try {
      const media = await mediaStorage.getMediaById(req.params.id);
      if (!media) {
        return res.status(404).json({ error: "Media not found" });
      }
      res.json(media);
    } catch (error) {
      console.error("Error fetching media:", error);
      res.status(500).json({ error: "Failed to fetch media" });
    }
  });

  // Upload endpoint with file processing
  app.post("/api/admin/media/upload", requireAuth, upload.single('file'), async (req, res) => {
    const tempPath = req.file?.path;

    try {
      const { title, category, description, audioMetadata, url, fileType: manualFileType } = req.body;

      // Determine if this is a file upload or external link
      const isExternalLink = !req.file && !!url;

      if (!req.file && !isExternalLink) {
        return res.status(400).json({ error: "No file or URL provided" });
      }

      if (!title || !category) {
        // Clean up temp file
        if (tempPath) await fs.unlink(tempPath).catch(console.error);
        return res.status(400).json({ error: "Title and category are required" });
      }

      // Parse audio metadata if provided
      let parsedAudioMetadata = null;
      if (audioMetadata) {
        try {
          parsedAudioMetadata = JSON.parse(audioMetadata);
        } catch (e) {
          console.error("Failed to parse audio metadata:", e);
        }
      }

      let processed: any;
      let finalFileType = "video"; // default

      if (isExternalLink) {
        if (!manualFileType || !['video', 'audio'].includes(manualFileType)) {
          return res.status(400).json({ error: "File type (video/audio) is required for external links" });
        }

        finalFileType = manualFileType;

        // Mock processed data for external link
        processed = {
          compressedPath: url,
          thumbnailPath: null,
          duration: "0",
          fileSize: "External",
          metadata: null,
          isExternalLink: true
        };
      } else {
        // Handle physical file upload
        finalFileType = req.file!.mimetype.startsWith('video/') ? 'video' : 'audio';

        console.log(`Processing ${finalFileType}: ${req.file!.originalname}`);

        // Process the media file (compress and generate thumbnail)
        processed = await mediaProcessor.processMedia(
          tempPath!,
          req.file!.originalname,
          finalFileType as "video" | "audio"
        );
      }

      // Save to database
      const media = await mediaStorage.createMedia({
        title,
        category,
        description: description || undefined,
        fileType: finalFileType as "video" | "audio",
        originalFilename: isExternalLink ? url : req.file!.originalname,
        compressedFilePath: processed.compressedPath,
        thumbnailPath: processed.thumbnailPath,
        duration: processed.duration,
        fileSize: processed.fileSize,
        isExternalLink: isExternalLink,
        metadata: processed.metadata,
        audioMetadata: parsedAudioMetadata || undefined,
      });

      // Clean up temp file if it exists
      if (tempPath) await fs.unlink(tempPath).catch(console.error);

      res.json(media);
    } catch (error) {
      console.error("Error uploading media:", error);
      // Clean up temp file on error
      if (tempPath) await fs.unlink(tempPath).catch(console.error);
      res.status(500).json({ error: "Failed to upload and process media" });
    }
  });

  // Update media
  app.patch("/api/admin/media/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = updateMediaSchema.parse(req.body);
      const media = await mediaStorage.updateMedia(req.params.id, validatedData);

      if (!media) {
        return res.status(404).json({ error: "Media not found" });
      }

      res.json(media);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Error updating media:", error);
        res.status(500).json({ error: "Failed to update media" });
      }
    }
  });

  // Delete media
  app.delete("/api/admin/media/:id", requireAuth, async (req, res) => {
    try {
      console.log(`Attempting to delete media with ID: ${req.params.id}`);
      const media = await mediaStorage.getMediaById(req.params.id);

      if (!media) {
        console.warn(`Media not found for deletion: ${req.params.id}`);
        return res.status(404).json({ error: "Media not found" });
      }

      // Only delete files from storage if it's not an external link
      if (!media.isExternalLink) {
        console.log(`Deleting physical files for media: ${media.title}`);
        await mediaProcessor.deleteMediaFiles(media.compressedFilePath, media.thumbnailPath || undefined);
      } else {
        console.log(`Skipping physical file deletion for external link: ${media.title}`);
      }

      // Delete from database
      await mediaStorage.deleteMedia(req.params.id);
      console.log(`Media deleted successfully from DB: ${req.params.id}`);

      res.json({ success: true, message: "Media deleted successfully" });
    } catch (error) {
      console.error("Error deleting media:", error);
      res.status(500).json({ error: "Failed to delete media", details: error instanceof Error ? error.message : String(error) });
    }
  });

  // Delete all media
  app.delete("/api/admin/media/all", requireAuth, async (req, res) => {
    try {
      console.log("Attempting to delete all media");
      const allMedia = await mediaStorage.getAllMedia();

      console.log(`Found ${allMedia.length} media items to delete`);

      // Delete files for all non-external media
      for (const media of allMedia) {
        if (!media.isExternalLink) {
          await mediaProcessor.deleteMediaFiles(media.compressedFilePath, media.thumbnailPath || undefined);
        }
      }

      // Clear the database
      await mediaStorage.deleteAllMedia();
      console.log("All media deleted successfully");

      res.json({ success: true, message: "All media deleted successfully" });
    } catch (error) {
      console.error("Error deleting all media:", error);
      res.status(500).json({ error: "Failed to delete all media", details: error instanceof Error ? error.message : String(error) });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}