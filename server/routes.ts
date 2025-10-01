import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { adminLogin, adminLogout, requireAuth, checkAuth } from "./middleware/auth";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/samples/demo-videos", async (req, res) => {
    try {
      const videos = await storage.getDemoVideos(12);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch demo videos" });
    }
  });

  app.get("/api/samples/avatars", async (req, res) => {
    try {
      const avatars = await storage.getAvatars(12);

      const formattedAvatars = avatars.map(avatar => ({
        id: avatar.id,
        name: avatar.name,
        role: avatar.gender || "Custom Avatar",
        videoUrl: avatar.videoUrl,
        thumbnailUrl: avatar.thumbnailUrl,
        description: avatar.description,
        orderIndex: avatar.orderIndex,
        isPublished: avatar.isPublished,
        createdAt: avatar.createdAt,
        updatedAt: avatar.updatedAt,
      }));

      res.json(formattedAvatars);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch avatars" });
    }
  });

  app.get("/api/samples/voice-samples", async (req, res) => {
    try {
      const samples = await storage.getVoiceSamples(12);
      res.json(samples);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch voice samples" });
    }
  });

  app.get("/api/samples/edited-videos", async (req, res) => {
    try {
      const videos = await storage.getEditedVideos(12);

      const formattedVideos = videos.map(video => ({
        id: video.id,
        title: video.title,
        projectType: video.category || "Custom Edit",
        duration: "60s",
        videoUrl: video.videoUrl,
        thumbnailUrl: video.thumbnailUrl,
        description: video.description,
        orderIndex: video.orderIndex,
        isPublished: video.isPublished,
        createdAt: video.createdAt,
        updatedAt: video.updatedAt,
      }));

      res.json(formattedVideos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch edited videos" });
    }
  });

  app.get("/api/samples/podcast-samples", async (req, res) => {
    try {
      const samples = await storage.getPodcastSamples(12);
      res.json(samples);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch podcast samples" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);

      res.json({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
        id: submission.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  app.post("/api/admin/login", adminLogin);
  app.post("/api/admin/logout", adminLogout);
  app.get("/api/admin/check-auth", checkAuth);

  app.get("/api/admin/contacts", requireAuth, async (req, res) => {
    try {
      const contacts = await storage.getContactSubmissions();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  app.patch("/api/admin/contacts/:id", requireAuth, async (req, res) => {
    try {
      const { status, adminNotes } = req.body;
      const contact = await storage.updateContactSubmission(req.params.id, { status, adminNotes });
      res.json(contact);
    } catch (error) {
      res.status(500).json({ error: "Failed to update contact submission" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
