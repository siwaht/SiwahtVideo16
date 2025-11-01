import type { InsertMedia, UpdateMedia, Media } from "@shared/schema";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { logger } from "./utils/logger";

const DB_PATH = path.join(process.cwd(), "server", "media-db.json");

// File-based storage for media items that persists across restarts
export class MediaStorage {
  private mediaItems: Map<string, Media> = new Map();

  constructor() {
    this.loadFromFile();
  }

  private loadFromFile() {
    try {
      if (fs.existsSync(DB_PATH)) {
        const data = fs.readFileSync(DB_PATH, "utf-8");
        const parsed = JSON.parse(data) as { media?: unknown[] };
        if (parsed.media && Array.isArray(parsed.media)) {
          parsed.media.forEach((item: unknown) => {
            // Validate and convert the item to Media type
            if (this.isValidMediaItem(item)) {
              const mediaItem: Media = {
                ...item,
                createdAt: new Date(item.createdAt),
                updatedAt: new Date(item.updatedAt),
              };
              this.mediaItems.set(mediaItem.id, mediaItem);
            } else {
              logger.warn("Skipping invalid media item during load", { item });
            }
          });
        }
      }
    } catch (error) {
      logger.error("Error loading media database", error);
      // Initialize with empty data if load fails
      this.saveToFile();
    }
  }

  private isValidMediaItem(item: unknown): item is Omit<Media, 'createdAt' | 'updatedAt'> & { createdAt: string | Date; updatedAt: string | Date } {
    if (typeof item !== "object" || item === null) return false;
    const obj = item as Record<string, unknown>;
    return (
      typeof obj.id === "string" &&
      typeof obj.title === "string" &&
      typeof obj.filePath === "string" &&
      typeof obj.category === "string" &&
      (obj.createdAt instanceof Date || typeof obj.createdAt === "string") &&
      (obj.updatedAt instanceof Date || typeof obj.updatedAt === "string")
    );
  }

  private saveToFile() {
    try {
      const data = {
        media: Array.from(this.mediaItems.values())
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
      logger.error("Error saving media database", error);
    }
  }

  // Get all media items
  async getAllMedia(): Promise<Media[]> {
    const items = Array.from(this.mediaItems.values());
    // Sort by createdAt descending
    return items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Get single media item
  async getMediaById(id: string): Promise<Media | undefined> {
    return this.mediaItems.get(id);
  }

  // Create new media item
  async createMedia(data: InsertMedia): Promise<Media> {
    const id = crypto.randomUUID();
    const now = new Date();
    const newMedia: Media = {
      id,
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    this.mediaItems.set(id, newMedia);
    this.saveToFile();
    return newMedia;
  }

  // Update media item
  async updateMedia(id: string, data: UpdateMedia): Promise<Media | undefined> {
    const existing = this.mediaItems.get(id);
    if (!existing) return undefined;
    
    const updated: Media = {
      ...existing,
      ...data,
      updatedAt: new Date(),
    };
    this.mediaItems.set(id, updated);
    this.saveToFile();
    return updated;
  }

  // Delete media item
  async deleteMedia(id: string): Promise<boolean> {
    const result = this.mediaItems.delete(id);
    if (result) {
      this.saveToFile();
    }
    return result;
  }

  // Get media items by category
  async getMediaByCategory(category: string): Promise<Media[]> {
    const items = Array.from(this.mediaItems.values());
    return items.filter(item => item.category === category);
  }
}

export const mediaStorage = new MediaStorage();