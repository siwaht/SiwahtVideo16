import type { InsertMedia, UpdateMedia, Media } from "@shared/schema";
import crypto from "crypto";

// In-memory storage for media items
export class MediaStorage {
  private mediaItems: Map<string, Media> = new Map();

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
    return updated;
  }

  // Delete media item
  async deleteMedia(id: string): Promise<boolean> {
    return this.mediaItems.delete(id);
  }

  // Get media items by category
  async getMediaByCategory(category: string): Promise<Media[]> {
    const items = Array.from(this.mediaItems.values());
    return items.filter(item => item.category === category);
  }
}

export const mediaStorage = new MediaStorage();