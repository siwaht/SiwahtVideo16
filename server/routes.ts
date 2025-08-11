import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSubmissionSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Public endpoints
  
  // Public API endpoints for frontend samples/portfolio
  app.get("/api/samples/demo-videos", async (req, res) => {
    try {
      const videos = await storage.getDemoVideos(12);
      const publishedVideos = videos.filter(video => video.isPublished);
      res.json(publishedVideos);
    } catch (error) {
      console.error("Error fetching demo videos:", error);
      res.status(500).json({ error: "Failed to fetch demo videos" });
    }
  });

  app.get("/api/samples/avatars", async (req, res) => {
    try {
      const avatars = await storage.getAvatars(12);
      const publishedAvatars = avatars.filter(avatar => avatar.isPublished);
      res.json(publishedAvatars);
    } catch (error) {
      console.error("Error fetching avatars:", error);
      res.status(500).json({ error: "Failed to fetch avatars" });
    }
  });

  app.get("/api/samples/voice-samples", async (req, res) => {
    try {
      const samples = await storage.getVoiceSamples(12);
      const publishedSamples = samples.filter(sample => sample.isPublished);
      res.json(publishedSamples);
    } catch (error) {
      console.error("Error fetching voice samples:", error);
      res.status(500).json({ error: "Failed to fetch voice samples" });
    }
  });

  app.get("/api/samples/edited-videos", async (req, res) => {
    try {
      const videos = await storage.getEditedVideos(12);
      const publishedVideos = videos.filter(video => video.isPublished);
      res.json(publishedVideos);
    } catch (error) {
      console.error("Error fetching edited videos:", error);
      res.status(500).json({ error: "Failed to fetch edited videos" });
    }
  });

  app.get("/api/samples/podcast-samples", async (req, res) => {
    try {
      const samples = await storage.getPodcastSamples(12);
      const publishedSamples = samples.filter(sample => sample.isPublished);
      res.json(publishedSamples);
    } catch (error) {
      console.error("Error fetching podcast samples:", error);
      res.status(500).json({ error: "Failed to fetch podcast samples" });
    }
  });

  // Contact form submission
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
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Serve public objects
  app.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    try {
      const { ObjectStorageService } = await import("./objectStorage");
      const objectStorageService = new ObjectStorageService();
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}