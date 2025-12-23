import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Admin authentication middleware
const ADMIN_USER = "cc@siwaht.com";
const ADMIN_PASS = "Hola173!";
const JWT_SECRET = "siwaht_secure_admin_session_key_2024";

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
  // Direct access enabled
  next();
};

// Check auth status
export const checkAuth = async (req: Request, res: Response) => {
  // Always authenticated for direct access
  return res.json({ authenticated: true });
};