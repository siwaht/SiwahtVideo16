import { 
  type ContactSubmission, 
  type InsertContactSubmission,
  type DemoVideo,
  type InsertDemoVideo,
  type Avatar,
  type InsertAvatar,
  type VoiceSample,
  type InsertVoiceSample,
  type EditedVideo,
  type InsertEditedVideo,
  type PodcastSample,
  type InsertPodcastSample,
  contactSubmissions,
  demoVideos,
  avatars,
  voiceSamples,
  editedVideos,
  podcastSamples,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, or, ilike } from "drizzle-orm";

export interface IStorage {
  // Contact submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactSubmission(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission>;
  
  // Demo videos
  getDemoVideos(limit?: number): Promise<DemoVideo[]>;
  getDemoVideo(id: string): Promise<DemoVideo | undefined>;
  createDemoVideo(video: InsertDemoVideo): Promise<DemoVideo>;
  updateDemoVideo(id: string, updates: Partial<DemoVideo>): Promise<DemoVideo>;
  deleteDemoVideo(id: string): Promise<void>;
  searchDemoVideos(query: string): Promise<DemoVideo[]>;
  
  // Avatars
  getAvatars(limit?: number): Promise<Avatar[]>;
  getAvatar(id: string): Promise<Avatar | undefined>;
  createAvatar(avatar: InsertAvatar): Promise<Avatar>;
  updateAvatar(id: string, updates: Partial<Avatar>): Promise<Avatar>;
  deleteAvatar(id: string): Promise<void>;
  searchAvatars(query: string): Promise<Avatar[]>;
  
  // Voice samples
  getVoiceSamples(limit?: number): Promise<VoiceSample[]>;
  getVoiceSample(id: string): Promise<VoiceSample | undefined>;
  createVoiceSample(sample: InsertVoiceSample): Promise<VoiceSample>;
  updateVoiceSample(id: string, updates: Partial<VoiceSample>): Promise<VoiceSample>;
  deleteVoiceSample(id: string): Promise<void>;
  searchVoiceSamples(query: string): Promise<VoiceSample[]>;
  
  // Edited videos
  getEditedVideos(limit?: number): Promise<EditedVideo[]>;
  getEditedVideo(id: string): Promise<EditedVideo | undefined>;
  createEditedVideo(video: InsertEditedVideo): Promise<EditedVideo>;
  updateEditedVideo(id: string, updates: Partial<EditedVideo>): Promise<EditedVideo>;
  deleteEditedVideo(id: string): Promise<void>;
  searchEditedVideos(query: string): Promise<EditedVideo[]>;
  
  // Podcast samples
  getPodcastSamples(limit?: number): Promise<PodcastSample[]>;
  getPodcastSample(id: string): Promise<PodcastSample | undefined>;
  createPodcastSample(sample: InsertPodcastSample): Promise<PodcastSample>;
  updatePodcastSample(id: string, updates: Partial<PodcastSample>): Promise<PodcastSample>;
  deletePodcastSample(id: string): Promise<void>;
  searchPodcastSamples(query: string): Promise<PodcastSample[]>;
  
  // Dashboard stats (for public metrics)
  getDashboardStats(): Promise<{
    totalContacts: number;
    totalDemoVideos: number;
    totalAvatars: number;
    totalVoiceSamples: number;
    totalEditedVideos: number;
    totalPodcastSamples: number;
  }>;
}

// In-memory storage for development with proper sample data
class MemStorage implements IStorage {
  private contacts: ContactSubmission[] = [];
  private demoVideos: DemoVideo[] = [];
  private avatars: Avatar[] = [];
  private voiceSamples: VoiceSample[] = [];
  private editedVideos: EditedVideo[] = [];
  private podcastSamples: PodcastSample[] = [];

  // Contact submissions
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const contact: ContactSubmission = {
      id: Math.random().toString(36).substr(2, 9),
      ...submission,
      status: submission.status || "unread",
      adminNotes: submission.adminNotes || null,
      company: submission.company || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.contacts.push(contact);
    return contact;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return [...this.contacts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateContactSubmission(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission> {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Contact not found");
    
    this.contacts[index] = { ...this.contacts[index], ...updates, updatedAt: new Date() };
    return this.contacts[index];
  }

  // Demo videos - with sample data
  async getDemoVideos(limit = 50): Promise<DemoVideo[]> {
    if (this.demoVideos.length === 0) {
      this.demoVideos = [
        {
          id: "d44a33c6-fc96-4cd6-badc-6f88e9f2c3a1",
          title: "IKEA Demo",
          description: "Professional furniture showcase video featuring modern home design",
          videoUrl: "/videos/ikea-demo-new.mp4",
          thumbnailUrl: null,
          category: "commercial",
          isHostedVideo: true,
          isPublished: true,
          orderIndex: 1,
          createdAt: new Date("2025-01-26"),
          updatedAt: new Date("2025-01-26"),
        },
        {
          id: "e55b44d7-gd07-5d7e-cedc-7g99f0g3d4b2",
          title: "Launch Demo",
          description: "Dynamic product launch video with animated elements",
          videoUrl: "/videos/launch-demo-new.mp4",
          thumbnailUrl: null,
          category: "product",
          isHostedVideo: true,
          isPublished: true,
          orderIndex: 2,
          createdAt: new Date("2025-01-26"),
          updatedAt: new Date("2025-01-26"),
        }
      ];
    }
    return this.demoVideos.slice(0, limit);
  }

  async getDemoVideo(id: string): Promise<DemoVideo | undefined> {
    return this.demoVideos.find(v => v.id === id);
  }

  async createDemoVideo(video: InsertDemoVideo): Promise<DemoVideo> {
    const newVideo: DemoVideo = {
      id: Math.random().toString(36).substr(2, 9),
      ...video,
      description: video.description || null,
      thumbnailUrl: video.thumbnailUrl || null,
      isHostedVideo: video.isHostedVideo ?? true,
      isPublished: video.isPublished ?? false,
      orderIndex: video.orderIndex ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.demoVideos.push(newVideo);
    return newVideo;
  }

  async updateDemoVideo(id: string, updates: Partial<DemoVideo>): Promise<DemoVideo> {
    const index = this.demoVideos.findIndex(v => v.id === id);
    if (index === -1) throw new Error("Video not found");
    
    this.demoVideos[index] = { ...this.demoVideos[index], ...updates, updatedAt: new Date() };
    return this.demoVideos[index];
  }

  async deleteDemoVideo(id: string): Promise<void> {
    const index = this.demoVideos.findIndex(v => v.id === id);
    if (index !== -1) {
      this.demoVideos.splice(index, 1);
    }
  }

  async searchDemoVideos(query: string): Promise<DemoVideo[]> {
    const lowerQuery = query.toLowerCase();
    return this.demoVideos.filter(v => 
      v.title.toLowerCase().includes(lowerQuery) ||
      (v.description && v.description.toLowerCase().includes(lowerQuery)) ||
      v.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Avatars - with sample data
  async getAvatars(limit = 50): Promise<Avatar[]> {
    if (this.avatars.length === 0) {
      this.avatars = [
        {
          id: "38c0f2ac-a33c-49ae-a202-7ba905b8c451",
          name: "Artisan Baker Avatar",
          description: "Professional artisan baker demonstrating traditional bread-making techniques",
          videoUrl: "/videos/artisan-baker-avatar.mp4",
          thumbnailUrl: null,
          gender: "male",
          ethnicity: "caucasian",
          ageRange: "30-40",
          voicePreview: null,
          isPublished: true,
          orderIndex: 1,
          createdAt: new Date("2025-01-26"),
          updatedAt: new Date("2025-01-26"),
        }
      ];
    }
    return this.avatars.slice(0, limit);
  }

  async getAvatar(id: string): Promise<Avatar | undefined> {
    return this.avatars.find(a => a.id === id);
  }

  async createAvatar(avatar: InsertAvatar): Promise<Avatar> {
    const newAvatar: Avatar = {
      id: Math.random().toString(36).substr(2, 9),
      ...avatar,
      description: avatar.description || null,
      videoUrl: avatar.videoUrl || null,
      thumbnailUrl: avatar.thumbnailUrl || null,
      ethnicity: avatar.ethnicity || null,
      ageRange: avatar.ageRange || null,
      voicePreview: avatar.voicePreview || null,
      isPublished: avatar.isPublished ?? false,
      orderIndex: avatar.orderIndex ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.avatars.push(newAvatar);
    return newAvatar;
  }

  async updateAvatar(id: string, updates: Partial<Avatar>): Promise<Avatar> {
    const index = this.avatars.findIndex(a => a.id === id);
    if (index === -1) throw new Error("Avatar not found");
    
    this.avatars[index] = { ...this.avatars[index], ...updates, updatedAt: new Date() };
    return this.avatars[index];
  }

  async deleteAvatar(id: string): Promise<void> {
    const index = this.avatars.findIndex(a => a.id === id);
    if (index !== -1) {
      this.avatars.splice(index, 1);
    }
  }

  async searchAvatars(query: string): Promise<Avatar[]> {
    const lowerQuery = query.toLowerCase();
    return this.avatars.filter(a => 
      a.name.toLowerCase().includes(lowerQuery) ||
      (a.description && a.description.toLowerCase().includes(lowerQuery)) ||
      a.gender.toLowerCase().includes(lowerQuery)
    );
  }

  // Voice samples - with sample data
  async getVoiceSamples(limit = 50): Promise<VoiceSample[]> {
    if (this.voiceSamples.length === 0) {
      this.voiceSamples = [
        {
          id: "603b04e8-b085-4a5f-8b86-1c45d7f8e9a2",
          name: "Cucarafa",
          description: "Dynamic energetic voice perfect for commercials and promotional content",
          audioUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1969080677&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
          language: "english",
          gender: "male",
          accent: "american",
          ageRange: "25-35",
          isPublished: true,
          orderIndex: 1,
          createdAt: new Date("2025-01-26"),
          updatedAt: new Date("2025-01-26"),
        },
        {
          id: "704c15f9-c196-5b6g-9c97-2d56e8g9f0b3",
          name: "Josh Wyles Movement",
          description: "Professional authoritative voice ideal for corporate presentations",
          audioUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1969078985&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
          language: "english",
          gender: "male",
          accent: "british",
          ageRange: "30-40",
          isPublished: true,
          orderIndex: 2,
          createdAt: new Date("2025-01-26"),
          updatedAt: new Date("2025-01-26"),
        },
        {
          id: "815d26g0-d207-6c7h-0d08-3e67f9h0g1c4",
          name: "JXXXO West Code",
          description: "Modern urban voice perfect for lifestyle and tech content",
          audioUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1969079086&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
          language: "english",
          gender: "male",
          accent: "american",
          ageRange: "20-30",
          isPublished: true,
          orderIndex: 3,
          createdAt: new Date("2025-01-26"),
          updatedAt: new Date("2025-01-26"),
        },
        {
          id: "926e37h1-e318-7d8i-1e19-4f78g0i1h2d5",
          name: "Jacotanu - Aaru 3",
          description: "Versatile expressive voice suitable for various content types",
          audioUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1969079008&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
          language: "english",
          gender: "male",
          accent: null,
          ageRange: "25-35",
          isPublished: true,
          orderIndex: 4,
          createdAt: new Date("2025-01-26"),
          updatedAt: new Date("2025-01-26"),
        }
      ];
    }
    return this.voiceSamples.slice(0, limit);
  }

  async getVoiceSample(id: string): Promise<VoiceSample | undefined> {
    return this.voiceSamples.find(v => v.id === id);
  }

  async createVoiceSample(sample: InsertVoiceSample): Promise<VoiceSample> {
    const newSample: VoiceSample = {
      id: Math.random().toString(36).substr(2, 9),
      ...sample,
      description: sample.description || null,
      accent: sample.accent || null,
      ageRange: sample.ageRange || null,
      isPublished: sample.isPublished ?? false,
      orderIndex: sample.orderIndex ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.voiceSamples.push(newSample);
    return newSample;
  }

  async updateVoiceSample(id: string, updates: Partial<VoiceSample>): Promise<VoiceSample> {
    const index = this.voiceSamples.findIndex(v => v.id === id);
    if (index === -1) throw new Error("Voice sample not found");
    
    this.voiceSamples[index] = { ...this.voiceSamples[index], ...updates, updatedAt: new Date() };
    return this.voiceSamples[index];
  }

  async deleteVoiceSample(id: string): Promise<void> {
    const index = this.voiceSamples.findIndex(v => v.id === id);
    if (index !== -1) {
      this.voiceSamples.splice(index, 1);
    }
  }

  async searchVoiceSamples(query: string): Promise<VoiceSample[]> {
    const lowerQuery = query.toLowerCase();
    return this.voiceSamples.filter(v => 
      v.name.toLowerCase().includes(lowerQuery) ||
      (v.description && v.description.toLowerCase().includes(lowerQuery)) ||
      v.language.toLowerCase().includes(lowerQuery)
    );
  }

  // Edited videos - with sample data
  async getEditedVideos(limit = 50): Promise<EditedVideo[]> {
    if (this.editedVideos.length === 0) {
      this.editedVideos = [
        {
          id: "a37d48i2-f429-8e9j-2f20-5g89h1j2i3e6",
          title: "Dairy Farmer Documentary",
          description: "Cinematic documentary showcasing traditional dairy farming practices with professional editing",
          videoUrl: "/videos/dairy-farmer-new.mp4",
          thumbnailUrl: null,
          isHostedVideo: true,
          clientName: "Local Farm Co-op",
          category: "documentary",
          tags: null,
          isPublished: true,
          orderIndex: 1,
          createdAt: new Date("2025-01-26"),
          updatedAt: new Date("2025-01-26"),
        }
      ];
    }
    return this.editedVideos.slice(0, limit);
  }

  async getEditedVideo(id: string): Promise<EditedVideo | undefined> {
    return this.editedVideos.find(v => v.id === id);
  }

  async createEditedVideo(video: InsertEditedVideo): Promise<EditedVideo> {
    const newVideo: EditedVideo = {
      id: Math.random().toString(36).substr(2, 9),
      ...video,
      description: video.description || null,
      thumbnailUrl: video.thumbnailUrl || null,
      isHostedVideo: video.isHostedVideo ?? true,
      clientName: video.clientName || null,
      tags: video.tags || null,
      isPublished: video.isPublished ?? false,
      orderIndex: video.orderIndex ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.editedVideos.push(newVideo);
    return newVideo;
  }

  async updateEditedVideo(id: string, updates: Partial<EditedVideo>): Promise<EditedVideo> {
    const index = this.editedVideos.findIndex(v => v.id === id);
    if (index === -1) throw new Error("Edited video not found");
    
    this.editedVideos[index] = { ...this.editedVideos[index], ...updates, updatedAt: new Date() };
    return this.editedVideos[index];
  }

  async deleteEditedVideo(id: string): Promise<void> {
    const index = this.editedVideos.findIndex(v => v.id === id);
    if (index !== -1) {
      this.editedVideos.splice(index, 1);
    }
  }

  async searchEditedVideos(query: string): Promise<EditedVideo[]> {
    const lowerQuery = query.toLowerCase();
    return this.editedVideos.filter(v => 
      v.title.toLowerCase().includes(lowerQuery) ||
      (v.description && v.description.toLowerCase().includes(lowerQuery)) ||
      v.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Podcast samples - with sample data
  async getPodcastSamples(limit = 50): Promise<PodcastSample[]> {
    if (this.podcastSamples.length === 0) {
      this.podcastSamples = [
        {
          id: "4ac9c44d-dbd7-4763-88d0-fd8f7e6c5a94",
          title: "Context is King: Engineering the Brains, and Nightmares, of AI Agents",
          description: "The era of simple \"prompt engineering\" is over. We explore why \"context engineering\" is the critical discipline for building powerful AI agents and why it's also the source of their greatest dangers.",
          audioUrl: "/audio/context-is-king.mp3",
          category: "technology",
          duration: "Short Episode",
          hostName: null,
          guestName: null,
          isPublished: true,
          orderIndex: 1,
          createdAt: new Date("2025-08-11"),
          updatedAt: new Date("2025-08-11"),
        },
        {
          id: "7f8e9d0c-1a2b-3c4d-5e6f-789012345678",
          title: "Fasten Your Nightmares",
          description: "Forget ghosts and ghouls; the real horror is at 30,000 feet, and it's asking for a pen.",
          audioUrl: "/audio/fasten-your-nightmares.mp3",
          category: "comedy",
          duration: "Short Episode",
          hostName: null,
          guestName: null,
          isPublished: true,
          orderIndex: 2,
          createdAt: new Date("2025-08-11"),
          updatedAt: new Date("2025-08-11"),
        }
      ];
    }
    return this.podcastSamples.slice(0, limit);
  }

  async getPodcastSample(id: string): Promise<PodcastSample | undefined> {
    return this.podcastSamples.find(p => p.id === id);
  }

  async createPodcastSample(sample: InsertPodcastSample): Promise<PodcastSample> {
    const newSample: PodcastSample = {
      id: Math.random().toString(36).substr(2, 9),
      ...sample,
      category: sample.category ?? "interview",
      duration: sample.duration || null,
      hostName: sample.hostName || null,
      guestName: sample.guestName || null,
      isPublished: sample.isPublished ?? true,
      orderIndex: sample.orderIndex ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.podcastSamples.push(newSample);
    return newSample;
  }

  async updatePodcastSample(id: string, updates: Partial<PodcastSample>): Promise<PodcastSample> {
    const index = this.podcastSamples.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Podcast sample not found");
    
    this.podcastSamples[index] = { ...this.podcastSamples[index], ...updates, updatedAt: new Date() };
    return this.podcastSamples[index];
  }

  async deletePodcastSample(id: string): Promise<void> {
    const index = this.podcastSamples.findIndex(p => p.id === id);
    if (index !== -1) {
      this.podcastSamples.splice(index, 1);
    }
  }

  async searchPodcastSamples(query: string): Promise<PodcastSample[]> {
    const lowerQuery = query.toLowerCase();
    return this.podcastSamples.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Dashboard stats
  async getDashboardStats() {
    return {
      totalContacts: this.contacts.length,
      totalDemoVideos: this.demoVideos.length,
      totalAvatars: this.avatars.length,
      totalVoiceSamples: this.voiceSamples.length,
      totalEditedVideos: this.editedVideos.length,
      totalPodcastSamples: this.podcastSamples.length,
    };
  }
}

class DatabaseStorage implements IStorage {
  // Contact submissions
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [created] = await db.insert(contactSubmissions).values(submission).returning();
    return created;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async updateContactSubmission(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission> {
    const [updated] = await db
      .update(contactSubmissions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return updated;
  }

  // Demo videos
  async getDemoVideos(limit = 50): Promise<DemoVideo[]> {
    const query = db.select().from(demoVideos).orderBy(desc(demoVideos.orderIndex), desc(demoVideos.createdAt));
    if (limit > 0) {
      return query.limit(limit);
    }
    return query;
  }

  async getDemoVideo(id: string): Promise<DemoVideo | undefined> {
    const [video] = await db.select().from(demoVideos).where(eq(demoVideos.id, id));
    return video;
  }

  async createDemoVideo(video: InsertDemoVideo): Promise<DemoVideo> {
    const [created] = await db.insert(demoVideos).values(video).returning();
    return created;
  }

  async updateDemoVideo(id: string, updates: Partial<DemoVideo>): Promise<DemoVideo> {
    const [updated] = await db
      .update(demoVideos)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(demoVideos.id, id))
      .returning();
    return updated;
  }

  async deleteDemoVideo(id: string): Promise<void> {
    await db.delete(demoVideos).where(eq(demoVideos.id, id));
  }

  async searchDemoVideos(query: string): Promise<DemoVideo[]> {
    return db.select().from(demoVideos)
      .where(
        or(
          ilike(demoVideos.title, `%${query}%`),
          ilike(demoVideos.description, `%${query}%`),
          ilike(demoVideos.category, `%${query}%`)
        )
      )
      .orderBy(desc(demoVideos.createdAt));
  }

  // Avatars
  async getAvatars(limit = 50): Promise<Avatar[]> {
    const query = db.select().from(avatars).orderBy(desc(avatars.orderIndex), desc(avatars.createdAt));
    if (limit > 0) {
      return query.limit(limit);
    }
    return query;
  }

  async getAvatar(id: string): Promise<Avatar | undefined> {
    const [avatar] = await db.select().from(avatars).where(eq(avatars.id, id));
    return avatar;
  }

  async createAvatar(avatar: InsertAvatar): Promise<Avatar> {
    const [created] = await db.insert(avatars).values(avatar).returning();
    return created;
  }

  async updateAvatar(id: string, updates: Partial<Avatar>): Promise<Avatar> {
    const [updated] = await db
      .update(avatars)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(avatars.id, id))
      .returning();
    return updated;
  }

  async deleteAvatar(id: string): Promise<void> {
    await db.delete(avatars).where(eq(avatars.id, id));
  }

  async searchAvatars(query: string): Promise<Avatar[]> {
    return db.select().from(avatars)
      .where(
        or(
          ilike(avatars.name, `%${query}%`),
          ilike(avatars.description, `%${query}%`),
          ilike(avatars.gender, `%${query}%`)
        )
      )
      .orderBy(desc(avatars.createdAt));
  }

  // Voice samples
  async getVoiceSamples(limit = 50): Promise<VoiceSample[]> {
    const query = db.select().from(voiceSamples).orderBy(desc(voiceSamples.orderIndex), desc(voiceSamples.createdAt));
    if (limit > 0) {
      return query.limit(limit);
    }
    return query;
  }

  async getVoiceSample(id: string): Promise<VoiceSample | undefined> {
    const [sample] = await db.select().from(voiceSamples).where(eq(voiceSamples.id, id));
    return sample;
  }

  async createVoiceSample(sample: InsertVoiceSample): Promise<VoiceSample> {
    const [created] = await db.insert(voiceSamples).values(sample).returning();
    return created;
  }

  async updateVoiceSample(id: string, updates: Partial<VoiceSample>): Promise<VoiceSample> {
    const [updated] = await db
      .update(voiceSamples)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(voiceSamples.id, id))
      .returning();
    return updated;
  }

  async deleteVoiceSample(id: string): Promise<void> {
    await db.delete(voiceSamples).where(eq(voiceSamples.id, id));
  }

  async searchVoiceSamples(query: string): Promise<VoiceSample[]> {
    return db.select().from(voiceSamples)
      .where(
        or(
          ilike(voiceSamples.name, `%${query}%`),
          ilike(voiceSamples.description, `%${query}%`),
          ilike(voiceSamples.language, `%${query}%`)
        )
      )
      .orderBy(desc(voiceSamples.createdAt));
  }

  // Edited videos
  async getEditedVideos(limit = 50): Promise<EditedVideo[]> {
    const query = db.select().from(editedVideos).orderBy(desc(editedVideos.orderIndex), desc(editedVideos.createdAt));
    if (limit > 0) {
      return query.limit(limit);
    }
    return query;
  }

  async getEditedVideo(id: string): Promise<EditedVideo | undefined> {
    const [video] = await db.select().from(editedVideos).where(eq(editedVideos.id, id));
    return video;
  }

  async createEditedVideo(video: InsertEditedVideo): Promise<EditedVideo> {
    const [created] = await db.insert(editedVideos).values(video).returning();
    return created;
  }

  async updateEditedVideo(id: string, updates: Partial<EditedVideo>): Promise<EditedVideo> {
    const [updated] = await db
      .update(editedVideos)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(editedVideos.id, id))
      .returning();
    return updated;
  }

  async deleteEditedVideo(id: string): Promise<void> {
    await db.delete(editedVideos).where(eq(editedVideos.id, id));
  }

  async searchEditedVideos(query: string): Promise<EditedVideo[]> {
    return db.select().from(editedVideos)
      .where(
        or(
          ilike(editedVideos.title, `%${query}%`),
          ilike(editedVideos.description, `%${query}%`),
          ilike(editedVideos.category, `%${query}%`)
        )
      )
      .orderBy(desc(editedVideos.createdAt));
  }

  // Podcast samples
  async getPodcastSamples(limit = 50): Promise<PodcastSample[]> {
    const query = db.select().from(podcastSamples).orderBy(desc(podcastSamples.orderIndex), desc(podcastSamples.createdAt));
    if (limit > 0) {
      return query.limit(limit);
    }
    return query;
  }

  async getPodcastSample(id: string): Promise<PodcastSample | undefined> {
    const [sample] = await db.select().from(podcastSamples).where(eq(podcastSamples.id, id));
    return sample;
  }

  async createPodcastSample(sample: InsertPodcastSample): Promise<PodcastSample> {
    const [created] = await db.insert(podcastSamples).values(sample).returning();
    return created;
  }

  async updatePodcastSample(id: string, updates: Partial<PodcastSample>): Promise<PodcastSample> {
    const [updated] = await db
      .update(podcastSamples)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(podcastSamples.id, id))
      .returning();
    return updated;
  }

  async deletePodcastSample(id: string): Promise<void> {
    await db.delete(podcastSamples).where(eq(podcastSamples.id, id));
  }

  async searchPodcastSamples(query: string): Promise<PodcastSample[]> {
    return db.select().from(podcastSamples)
      .where(
        or(
          ilike(podcastSamples.title, `%${query}%`),
          ilike(podcastSamples.description, `%${query}%`),
          ilike(podcastSamples.category, `%${query}%`)
        )
      )
      .orderBy(desc(podcastSamples.createdAt));
  }

  // Dashboard stats
  async getDashboardStats() {
    const [contactCount] = await db.select({ count: sql<number>`count(*)` }).from(contactSubmissions);
    const [videoCount] = await db.select({ count: sql<number>`count(*)` }).from(demoVideos);
    const [avatarCount] = await db.select({ count: sql<number>`count(*)` }).from(avatars);
    const [voiceCount] = await db.select({ count: sql<number>`count(*)` }).from(voiceSamples);
    const [editedVideoCount] = await db.select({ count: sql<number>`count(*)` }).from(editedVideos);
    const [podcastCount] = await db.select({ count: sql<number>`count(*)` }).from(podcastSamples);

    return {
      totalContacts: contactCount?.count || 0,
      totalDemoVideos: videoCount?.count || 0,
      totalAvatars: avatarCount?.count || 0,
      totalVoiceSamples: voiceCount?.count || 0,
      totalEditedVideos: editedVideoCount?.count || 0,
      totalPodcastSamples: podcastCount?.count || 0,
    };
  }
}

export const storage: IStorage = process.env.NODE_ENV === "development" 
  ? new MemStorage()
  : new DatabaseStorage();