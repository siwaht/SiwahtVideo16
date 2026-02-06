import type { InsertMedia, UpdateMedia, Media } from "@shared/schema";
import crypto from "crypto";
import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "server", "media-db.json");

// File-based storage for media items that persists across restarts
export class MediaStorage {
  private mediaItems: Map<string, Media> = new Map();
  private loaded = false;
  private saving = false;

  constructor() {
    // Load synchronously on startup only — after that, all ops are async
    this.loadFromFileSync();
  }

  private loadFromFileSync() {
    try {
      if (existsSync(DB_PATH)) {
        const { readFileSync } = require("fs");
        const data = readFileSync(DB_PATH, "utf-8");
        this.parseAndLoad(data);
      }
    } catch (error) {
      console.error("Error loading media database:", error);
    }
    this.loaded = true;
  }

  private parseAndLoad(raw: string) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed.media && Array.isArray(parsed.media)) {
        for (const item of parsed.media) {
          item.createdAt = new Date(item.createdAt);
          item.updatedAt = new Date(item.updatedAt);
          this.mediaItems.set(item.id, item);
        }
      }
    } catch (error) {
      console.error("Error parsing media database:", error);
    }
  }

  private async saveToFile(): Promise<void> {
    if (this.saving) return; // Prevent concurrent writes
    this.saving = true;
    try {
      const data = {
        media: Array.from(this.mediaItems.values()),
      };
      await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error saving media database:", error);
    } finally {
      this.saving = false;
    }
  }

  async getAllMedia(): Promise<Media[]> {
    const items = Array.from(this.mediaItems.values());
    return items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getMediaById(id: string): Promise<Media | undefined> {
    return this.mediaItems.get(id);
  }

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
    await this.saveToFile();
    return newMedia;
  }

  async updateMedia(id: string, data: UpdateMedia): Promise<Media | undefined> {
    const existing = this.mediaItems.get(id);
    if (!existing) return undefined;

    const updated: Media = {
      ...existing,
      ...data,
      updatedAt: new Date(),
    };
    this.mediaItems.set(id, updated);
    await this.saveToFile();
    return updated;
  }

  async deleteMedia(id: string): Promise<boolean> {
    const result = this.mediaItems.delete(id);
    if (result) {
      await this.saveToFile();
    }
    return result;
  }

  async deleteAllMedia(): Promise<void> {
    this.mediaItems.clear();
    await this.saveToFile();
  }

  async getMediaByCategory(category: string): Promise<Media[]> {
    const items = Array.from(this.mediaItems.values());
    return items.filter((item) => item.category === category);
  }
}

export const mediaStorage = new MediaStorage();
