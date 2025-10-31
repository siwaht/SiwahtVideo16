import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof ZodError) {
    return res.status(400).json({ message: "Invalid data", errors: err.errors });
  }
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};

// Admin authentication middleware
const ADMIN_USER = process.env.ADMIN_USER || "cc@siwaht.com";
const ADMIN_PASS = process.env.ADMIN_PASS || "Hola173!";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_change_this_in_production";

interface AuthRequest extends Request {
  admin?: { username: string };
}

import bcrypt from "bcryptjs";

// Login handler
export const adminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const storedPasswordHash = await bcrypt.hash(ADMIN_PASS, 10);

  // Check credentials
  if (username === ADMIN_USER && (await bcrypt.compare(password, storedPasswordHash))) {
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

  throw new ApiError(401, "Invalid credentials");
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
  const token = req.cookies?.adminToken;

  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
    req.admin = decoded;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
};

// Check auth status
export const checkAuth = async (req: Request, res: Response) => {
  const token = req.cookies?.adminToken;

  if (!token) {
    return res.json({ authenticated: false });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return res.json({ authenticated: true });
  } catch (error) {
    return res.json({ authenticated: false });
  }
};