import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSubmissionSchema,
  insertAdminUserSchema,
  insertDemoVideoSchema,
  insertAvatarSchema,
  insertVoiceSampleSchema,
  insertEditedVideoSchema,
} from "@shared/schema";
import { z } from "zod";
import { 
  requireAuth, 
  requireRole, 
  generateToken, 
  verifyPassword, 
  hashPassword, 
  createDefaultAdminUser,
  type AuthRequest 
} from "./auth";
import { ObjectStorageService } from "./objectStorage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize default admin user
  await createDefaultAdminUser();

  // Object storage service instance
  const objectStorageService = new ObjectStorageService();

  // Public endpoints
  
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

  // Authentication endpoints
  
  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ 
          success: false, 
          message: "Username and password are required" 
        });
      }

      const adminUser = await storage.getAdminUserByUsername(username);
      if (!adminUser) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid credentials" 
        });
      }

      const isPasswordValid = await verifyPassword(password, adminUser.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid credentials" 
        });
      }

      if (!adminUser.isActive) {
        return res.status(401).json({ 
          success: false, 
          message: "Account is inactive" 
        });
      }

      // Update last login
      await storage.updateAdminUser(adminUser.id, { lastLoginAt: new Date() });

      // Generate token
      const token = generateToken(adminUser);

      res.json({
        success: true,
        token,
        user: {
          id: adminUser.id,
          username: adminUser.username,
          email: adminUser.email,
          fullName: adminUser.fullName,
          role: adminUser.role,
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Admin auth check
  app.get("/api/admin/me", requireAuth, async (req: AuthRequest, res) => {
    res.json({
      success: true,
      user: req.adminUser
    });
  });

  // Protected admin endpoints

  // Dashboard stats
  app.get("/api/admin/dashboard", requireAuth, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error("Dashboard stats error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Contact submissions management
  app.get("/api/admin/contacts", requireAuth, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json({
        success: true,
        data: submissions
      });
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  app.put("/api/admin/contacts/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const submission = await storage.updateContactSubmission(id, updates);
      res.json({
        success: true,
        data: submission
      });
    } catch (error) {
      console.error("Update contact error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Demo videos management
  app.get("/api/admin/demo-videos", requireAuth, async (req, res) => {
    try {
      const { search } = req.query;
      let videos;
      
      if (search && typeof search === 'string') {
        videos = await storage.searchDemoVideos(search);
      } else {
        videos = await storage.getDemoVideos();
      }
      
      res.json({
        success: true,
        data: videos
      });
    } catch (error) {
      console.error("Get demo videos error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  app.post("/api/admin/demo-videos", requireAuth, async (req: AuthRequest, res) => {
    try {
      const validatedData = insertDemoVideoSchema.parse({
        ...req.body,
        createdBy: req.adminUser?.id
      });
      
      const video = await storage.createDemoVideo(validatedData);
      res.json({
        success: true,
        data: video
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid data", 
          errors: error.errors 
        });
      } else {
        console.error("Create demo video error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  app.put("/api/admin/demo-videos/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const video = await storage.updateDemoVideo(id, updates);
      res.json({
        success: true,
        data: video
      });
    } catch (error) {
      console.error("Update demo video error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  app.delete("/api/admin/demo-videos/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteDemoVideo(id);
      res.json({
        success: true,
        message: "Video deleted successfully"
      });
    } catch (error) {
      console.error("Delete demo video error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Avatars management
  app.get("/api/admin/avatars", requireAuth, async (req, res) => {
    try {
      const { search } = req.query;
      let avatars;
      
      if (search && typeof search === 'string') {
        avatars = await storage.searchAvatars(search);
      } else {
        avatars = await storage.getAvatars();
      }
      
      res.json({
        success: true,
        data: avatars
      });
    } catch (error) {
      console.error("Get avatars error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  app.post("/api/admin/avatars", requireAuth, async (req: AuthRequest, res) => {
    try {
      const validatedData = insertAvatarSchema.parse({
        ...req.body,
        createdBy: req.adminUser?.id
      });
      
      const avatar = await storage.createAvatar(validatedData);
      res.json({
        success: true,
        data: avatar
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid data", 
          errors: error.errors 
        });
      } else {
        console.error("Create avatar error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  app.put("/api/admin/avatars/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const avatar = await storage.updateAvatar(id, updates);
      res.json({
        success: true,
        data: avatar
      });
    } catch (error) {
      console.error("Update avatar error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  app.delete("/api/admin/avatars/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteAvatar(id);
      res.json({
        success: true,
        message: "Avatar deleted successfully"
      });
    } catch (error) {
      console.error("Delete avatar error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Voice samples management
  app.get("/api/admin/voice-samples", requireAuth, async (req, res) => {
    try {
      const { search } = req.query;
      let samples;
      
      if (search && typeof search === 'string') {
        samples = await storage.searchVoiceSamples(search);
      } else {
        samples = await storage.getVoiceSamples();
      }
      
      res.json({
        success: true,
        data: samples
      });
    } catch (error) {
      console.error("Get voice samples error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  app.post("/api/admin/voice-samples", requireAuth, async (req: AuthRequest, res) => {
    try {
      const validatedData = insertVoiceSampleSchema.parse({
        ...req.body,
        createdBy: req.adminUser?.id
      });
      
      const sample = await storage.createVoiceSample(validatedData);
      res.json({
        success: true,
        data: sample
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid data", 
          errors: error.errors 
        });
      } else {
        console.error("Create voice sample error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  app.put("/api/admin/voice-samples/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const sample = await storage.updateVoiceSample(id, updates);
      res.json({
        success: true,
        data: sample
      });
    } catch (error) {
      console.error("Update voice sample error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  app.delete("/api/admin/voice-samples/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteVoiceSample(id);
      res.json({
        success: true,
        message: "Voice sample deleted successfully"
      });
    } catch (error) {
      console.error("Delete voice sample error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Edited videos management
  app.get("/api/admin/edited-videos", requireAuth, async (req, res) => {
    try {
      const { search } = req.query;
      let videos;
      
      if (search && typeof search === 'string') {
        videos = await storage.searchEditedVideos(search);
      } else {
        videos = await storage.getEditedVideos();
      }
      
      res.json({
        success: true,
        data: videos
      });
    } catch (error) {
      console.error("Get edited videos error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  app.post("/api/admin/edited-videos", requireAuth, async (req: AuthRequest, res) => {
    try {
      const validatedData = insertEditedVideoSchema.parse({
        ...req.body,
        createdBy: req.adminUser?.id
      });
      
      const video = await storage.createEditedVideo(validatedData);
      res.json({
        success: true,
        data: video
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid data", 
          errors: error.errors 
        });
      } else {
        console.error("Create edited video error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  app.put("/api/admin/edited-videos/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const video = await storage.updateEditedVideo(id, updates);
      res.json({
        success: true,
        data: video
      });
    } catch (error) {
      console.error("Update edited video error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  app.delete("/api/admin/edited-videos/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteEditedVideo(id);
      res.json({
        success: true,
        message: "Edited video deleted successfully"
      });
    } catch (error) {
      console.error("Delete edited video error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // File upload endpoints
  app.post("/api/admin/upload", requireAuth, async (req, res) => {
    try {
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({
        success: true,
        uploadURL
      });
    } catch (error) {
      console.error("Get upload URL error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Admin user management (super admin only)
  app.post("/api/admin/users", requireAuth, requireRole(['super_admin']), async (req, res) => {
    try {
      const { password, ...userData } = req.body;
      
      if (!password) {
        return res.status(400).json({ 
          success: false, 
          message: "Password is required" 
        });
      }

      const hashedPassword = await hashPassword(password);
      const validatedData = insertAdminUserSchema.parse({
        ...userData,
        passwordHash: hashedPassword
      });
      
      const user = await storage.createAdminUser(validatedData);
      
      // Remove password hash from response
      const { passwordHash, ...userResponse } = user;
      
      res.json({
        success: true,
        data: userResponse
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid data", 
          errors: error.errors 
        });
      } else {
        console.error("Create admin user error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
