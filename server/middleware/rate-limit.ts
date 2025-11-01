import { Request, Response, NextFunction } from "express";

interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message?: string;
}

interface ClientInfo {
  count: number;
  resetTime: number;
}

// Simple in-memory rate limiter
class RateLimiter {
  private clients: Map<string, ClientInfo> = new Map();
  private windowMs: number;
  private maxRequests: number;
  private message: string;

  constructor(options: RateLimitOptions) {
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
    this.message = options.message || "Too many requests, please try again later.";

    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, info] of this.clients.entries()) {
      if (now > info.resetTime) {
        this.clients.delete(key);
      }
    }
  }

  private getClientKey(req: Request): string {
    // Use IP address as the client identifier
    return req.ip || req.socket.remoteAddress || "unknown";
  }

  middleware = (req: Request, res: Response, next: NextFunction) => {
    const clientKey = this.getClientKey(req);
    const now = Date.now();

    let clientInfo = this.clients.get(clientKey);

    if (!clientInfo || now > clientInfo.resetTime) {
      // Create new window
      clientInfo = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      this.clients.set(clientKey, clientInfo);
      return next();
    }

    if (clientInfo.count < this.maxRequests) {
      // Within limit
      clientInfo.count++;
      return next();
    }

    // Rate limit exceeded
    res.status(429).json({
      success: false,
      message: this.message,
      retryAfter: Math.ceil((clientInfo.resetTime - now) / 1000),
    });
  };
}

// Create rate limiters for different endpoints
export const apiRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // 100 requests per window
  message: "Too many API requests, please try again later.",
});

export const uploadRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10, // 10 uploads per hour
  message: "Too many upload requests, please try again later.",
});

export const contactFormRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5, // 5 form submissions per hour
  message: "Too many contact form submissions, please try again later.",
});

export const loginRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 login attempts per window
  message: "Too many login attempts, please try again later.",
});
