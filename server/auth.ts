import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { storage } from "./storage";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
const TOKEN_EXPIRY = "24h";

export interface AuthRequest extends Request {
  adminUser?: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    role: string;
  };
}

// Generate JWT token
export function generateToken(adminUser: any): string {
  return jwt.sign(
    {
      id: adminUser.id,
      username: adminUser.username,
      email: adminUser.email,
      fullName: adminUser.fullName,
      role: adminUser.role,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Middleware to check if user is authenticated
export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ 
        success: false, 
        message: "No token provided" 
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid or expired token" 
      });
    }

    // Verify user still exists and is active
    const adminUser = await storage.getAdminUser(decoded.id);
    if (!adminUser || !adminUser.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: "User account is inactive" 
      });
    }

    // Add user info to request object
    req.adminUser = {
      id: adminUser.id,
      username: adminUser.username,
      email: adminUser.email,
      fullName: adminUser.fullName,
      role: adminUser.role,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Authentication error" 
    });
  }
}

// Middleware to check if user has required role
export function requireRole(roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.adminUser) {
      return res.status(401).json({ 
        success: false, 
        message: "Not authenticated" 
      });
    }

    if (!roles.includes(req.adminUser.role)) {
      return res.status(403).json({ 
        success: false, 
        message: "Insufficient permissions" 
      });
    }

    next();
  };
}

// Create default admin user if none exists
export async function createDefaultAdminUser() {
  try {
    // Check if any admin users exist
    const adminUsers = await storage.getDashboardStats();
    
    if (adminUsers.totalContacts === 0) { // Using a proxy check since we don't have a direct count method
      const hashedPassword = await hashPassword("admin123");
      
      await storage.createAdminUser({
        username: "admin",
        email: "admin@siwahtai.com",
        passwordHash: hashedPassword,
        fullName: "System Administrator",
        role: "super_admin",
        isActive: true,
      });
      
      console.log("Default admin user created:");
      console.log("Username: admin");
      console.log("Password: admin123");
      console.log("Please change the password after first login!");
    }
  } catch (error) {
    console.error("Error creating default admin user:", error);
  }
}