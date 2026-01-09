import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import type { Media, InsertMedia, UpdateMedia, ContactSubmission, InsertContactSubmission } from "@shared/schema";

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.MONGODB_DB || "siwaht_media";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDB(): Promise<Db> {
  if (db) return db;
  
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log("Connected to MongoDB");
    
    // Create indexes
    await db.collection("media").createIndex({ category: 1 });
    await db.collection("media").createIndex({ createdAt: -1 });
    await db.collection("contacts").createIndex({ createdAt: -1 });
    
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export async function getDB(): Promise<Db> {
  if (!db) {
    return connectDB();
  }
  return db;
}

// Media Collection Operations
export class MongoMediaStorage {
  private async getCollection(): Promise<Collection> {
    const database = await getDB();
    return database.collection("media");
  }

  async getAllMedia(): Promise<Media[]> {
    const collection = await this.getCollection();
    const items = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return items.map(this.mapToMedia);
  }

  async getMediaById(id: string): Promise<Media | undefined> {
    const collection = await this.getCollection();
    try {
      const item = await collection.findOne({ _id: new ObjectId(id) });
      return item ? this.mapToMedia(item) : undefined;
    } catch {
      return undefined;
    }
  }

  async getMediaByCategory(category: string): Promise<Media[]> {
    const collection = await this.getCollection();
    const items = await collection.find({ category }).sort({ createdAt: -1 }).toArray();
    return items.map(this.mapToMedia);
  }

  async createMedia(data: InsertMedia): Promise<Media> {
    const collection = await this.getCollection();
    const now = new Date();
    const doc = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    const result = await collection.insertOne(doc);
    return {
      id: result.insertedId.toString(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };
  }

  async updateMedia(id: string, data: UpdateMedia): Promise<Media | undefined> {
    const collection = await this.getCollection();
    try {
      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...data, updatedAt: new Date() } },
        { returnDocument: "after" }
      );
      return result ? this.mapToMedia(result) : undefined;
    } catch {
      return undefined;
    }
  }

  async deleteMedia(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    try {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch {
      return false;
    }
  }

  async deleteAllMedia(): Promise<void> {
    const collection = await this.getCollection();
    await collection.deleteMany({});
  }

  private mapToMedia(doc: any): Media {
    return {
      id: doc._id.toString(),
      title: doc.title,
      category: doc.category,
      description: doc.description,
      fileType: doc.fileType,
      originalFilename: doc.originalFilename,
      compressedFilePath: doc.compressedFilePath,
      thumbnailPath: doc.thumbnailPath,
      duration: doc.duration,
      fileSize: doc.fileSize,
      isExternalLink: doc.isExternalLink,
      metadata: doc.metadata,
      audioMetadata: doc.audioMetadata,
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
    };
  }
}

// Contact Submissions Collection
export class MongoContactStorage {
  private async getCollection(): Promise<Collection> {
    const database = await getDB();
    return database.collection("contacts");
  }

  async getAllContacts(): Promise<ContactSubmission[]> {
    const collection = await this.getCollection();
    const items = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return items.map(this.mapToContact);
  }

  async createContact(data: InsertContactSubmission): Promise<ContactSubmission> {
    const collection = await this.getCollection();
    const now = new Date();
    const doc = {
      ...data,
      status: "new",
      adminNotes: null,
      createdAt: now,
      updatedAt: now,
    };
    const result = await collection.insertOne(doc);
    return {
      id: result.insertedId.toString(),
      ...data,
      status: "new",
      adminNotes: null,
      createdAt: now,
      updatedAt: now,
    };
  }

  async updateContactStatus(id: string, status: string, adminNotes?: string): Promise<ContactSubmission | undefined> {
    const collection = await this.getCollection();
    try {
      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { status, adminNotes, updatedAt: new Date() } },
        { returnDocument: "after" }
      );
      return result ? this.mapToContact(result) : undefined;
    } catch {
      return undefined;
    }
  }

  async deleteContact(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    try {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch {
      return false;
    }
  }

  private mapToContact(doc: any): ContactSubmission {
    return {
      id: doc._id.toString(),
      fullName: doc.fullName,
      email: doc.email,
      company: doc.company,
      projectDetails: doc.projectDetails,
      status: doc.status,
      adminNotes: doc.adminNotes,
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
    };
  }
}

export const mongoMediaStorage = new MongoMediaStorage();
export const mongoContactStorage = new MongoContactStorage();
