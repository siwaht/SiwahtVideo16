import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Validate required environment variables
function validateEnvVariables() {
  const missingVars: string[] = [];

  if (!process.env.ADMIN_USER) {
    missingVars.push("ADMIN_USER");
  }
  if (!process.env.ADMIN_PASS) {
    missingVars.push("ADMIN_PASS");
  }
  if (!process.env.JWT_SECRET) {
    missingVars.push("JWT_SECRET");
  }

  // In development, use defaults with warning
  if (missingVars.length > 0 && process.env.NODE_ENV === "development") {
    console.warn(`⚠️  WARNING: Missing environment variables: ${missingVars.join(", ")}`);
    console.warn(`⚠️  Using default values for development only. DO NOT use in production!`);
    return true;
  }

  // In production, fail hard if variables are missing
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
  }

  // Validate JWT secret strength in production
  if (process.env.NODE_ENV === "production" && process.env.JWT_SECRET) {
    if (process.env.JWT_SECRET.length < 32) {
      throw new Error("JWT_SECRET must be at least 32 characters long in production");
    }
    if (process.env.JWT_SECRET === "your_jwt_secret_key_change_this_in_production") {
      throw new Error("JWT_SECRET must be changed from default value in production");
    }
  }

  return true;
}

// Validate on module load
validateEnvVariables();

// Admin authentication configuration
const ADMIN_USER = process.env.ADMIN_USER || "cc@siwaht.com";
const ADMIN_PASS = process.env.ADMIN_PASS || "Hola173!";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_change_this_in_production";

interface AuthRequest extends Request {
  admin?: { username: string };
}

// Login handler
export const adminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check credentials
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    // Create JWT token
    const token = jwt.sign(
      { username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Set HTTP-only cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    return res.json({ success: true, message: "Login successful" });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
};

// Logout handler
export const adminLogout = async (req: Request, res: Response) => {
  res.clearCookie("adminToken");
  return res.json({ success: true, message: "Logout successful" });
};

// Authentication middleware
export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.adminToken;

    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

// Check auth status
export const checkAuth = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.adminToken;
    
    if (!token) {
      return res.json({ authenticated: false });
    }

    // Verify token
    jwt.verify(token, JWT_SECRET);
    return res.json({ authenticated: true });
  } catch (error) {
    return res.json({ authenticated: false });
  }
};