import { 
  type ContactSubmission, 
  type InsertContactSubmission,
  type AdminUser,
  type InsertAdminUser,
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
  type Webhook,
  type InsertWebhook,
  type MCPServer,
  type InsertMCPServer,
  contactSubmissions,
  adminUsers,
  demoVideos,
  avatars,
  voiceSamples,
  editedVideos,
  podcastSamples,
  webhooks,
  mcpServers,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, or, ilike } from "drizzle-orm";

export interface IStorage {
  // Contact submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactSubmission(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission>;
  
  // Admin users
  getAdminUser(id: string): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  updateAdminUser(id: string, updates: Partial<AdminUser>): Promise<AdminUser>;
  
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

  // Webhooks
  getWebhooks(): Promise<Webhook[]>;
  getWebhook(id: string): Promise<Webhook | undefined>;
  createWebhook(webhook: InsertWebhook): Promise<Webhook>;
  updateWebhook(id: string, updates: Partial<Webhook>): Promise<Webhook>;
  deleteWebhook(id: string): Promise<boolean>;

  // MCP Servers
  getMCPServers(): Promise<MCPServer[]>;
  getMCPServer(id: string): Promise<MCPServer | undefined>;
  createMCPServer(server: InsertMCPServer): Promise<MCPServer>;
  updateMCPServer(id: string, updates: Partial<MCPServer>): Promise<MCPServer>;
  deleteMCPServer(id: string): Promise<boolean>;
  
  // Analytics
  getDashboardStats(): Promise<{
    totalContacts: number;
    totalVideos: number;
    totalAvatars: number;
    totalVoiceSamples: number;
    totalEditedVideos: number;
    recentActivity: any[];
  }>;
}

export class DatabaseStorage implements IStorage {
  // Contact submissions
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }

  async updateContactSubmission(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission> {
    const [submission] = await db
      .update(contactSubmissions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return submission;
  }

  // Admin users
  async getAdminUser(id: string): Promise<AdminUser | undefined> {
    const [user] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.id, id));
    return user;
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    const [user] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, username));
    return user;
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    const [user] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email));
    return user;
  }

  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    const [user] = await db
      .insert(adminUsers)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateAdminUser(id: string, updates: Partial<AdminUser>): Promise<AdminUser> {
    const [user] = await db
      .update(adminUsers)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(adminUsers.id, id))
      .returning();
    return user;
  }

  // Demo videos
  async getDemoVideos(limit = 50): Promise<DemoVideo[]> {
    return await db
      .select()
      .from(demoVideos)
      .orderBy(desc(demoVideos.createdAt))
      .limit(limit);
  }

  async getDemoVideo(id: string): Promise<DemoVideo | undefined> {
    const [video] = await db
      .select()
      .from(demoVideos)
      .where(eq(demoVideos.id, id));
    return video;
  }

  async createDemoVideo(insertVideo: InsertDemoVideo): Promise<DemoVideo> {
    const [video] = await db
      .insert(demoVideos)
      .values(insertVideo)
      .returning();
    return video;
  }

  async updateDemoVideo(id: string, updates: Partial<DemoVideo>): Promise<DemoVideo> {
    const [video] = await db
      .update(demoVideos)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(demoVideos.id, id))
      .returning();
    return video;
  }

  async deleteDemoVideo(id: string): Promise<void> {
    await db
      .delete(demoVideos)
      .where(eq(demoVideos.id, id));
  }

  async searchDemoVideos(query: string): Promise<DemoVideo[]> {
    return await db
      .select()
      .from(demoVideos)
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
    return await db
      .select()
      .from(avatars)
      .orderBy(desc(avatars.createdAt))
      .limit(limit);
  }

  async getAvatar(id: string): Promise<Avatar | undefined> {
    const [avatar] = await db
      .select()
      .from(avatars)
      .where(eq(avatars.id, id));
    return avatar;
  }

  async createAvatar(insertAvatar: InsertAvatar): Promise<Avatar> {
    const [avatar] = await db
      .insert(avatars)
      .values(insertAvatar)
      .returning();
    return avatar;
  }

  async updateAvatar(id: string, updates: Partial<Avatar>): Promise<Avatar> {
    const [avatar] = await db
      .update(avatars)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(avatars.id, id))
      .returning();
    return avatar;
  }

  async deleteAvatar(id: string): Promise<void> {
    await db
      .delete(avatars)
      .where(eq(avatars.id, id));
  }

  async searchAvatars(query: string): Promise<Avatar[]> {
    return await db
      .select()
      .from(avatars)
      .where(
        or(
          ilike(avatars.name, `%${query}%`),
          ilike(avatars.description, `%${query}%`),
          ilike(avatars.gender, `%${query}%`),
          ilike(avatars.ethnicity, `%${query}%`)
        )
      )
      .orderBy(desc(avatars.createdAt));
  }

  // Voice samples
  async getVoiceSamples(limit = 50): Promise<VoiceSample[]> {
    return await db
      .select()
      .from(voiceSamples)
      .orderBy(desc(voiceSamples.createdAt))
      .limit(limit);
  }

  async getVoiceSample(id: string): Promise<VoiceSample | undefined> {
    const [sample] = await db
      .select()
      .from(voiceSamples)
      .where(eq(voiceSamples.id, id));
    return sample;
  }

  async createVoiceSample(insertSample: InsertVoiceSample): Promise<VoiceSample> {
    const [sample] = await db
      .insert(voiceSamples)
      .values(insertSample)
      .returning();
    return sample;
  }

  async updateVoiceSample(id: string, updates: Partial<VoiceSample>): Promise<VoiceSample> {
    const [sample] = await db
      .update(voiceSamples)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(voiceSamples.id, id))
      .returning();
    return sample;
  }

  async deleteVoiceSample(id: string): Promise<void> {
    await db
      .delete(voiceSamples)
      .where(eq(voiceSamples.id, id));
  }

  async searchVoiceSamples(query: string): Promise<VoiceSample[]> {
    return await db
      .select()
      .from(voiceSamples)
      .where(
        or(
          ilike(voiceSamples.name, `%${query}%`),
          ilike(voiceSamples.description, `%${query}%`),
          ilike(voiceSamples.language, `%${query}%`),
          ilike(voiceSamples.gender, `%${query}%`)
        )
      )
      .orderBy(desc(voiceSamples.createdAt));
  }

  // Edited videos
  async getEditedVideos(limit = 50): Promise<EditedVideo[]> {
    return await db
      .select()
      .from(editedVideos)
      .orderBy(desc(editedVideos.createdAt))
      .limit(limit);
  }

  async getEditedVideo(id: string): Promise<EditedVideo | undefined> {
    const [video] = await db
      .select()
      .from(editedVideos)
      .where(eq(editedVideos.id, id));
    return video;
  }

  async createEditedVideo(insertVideo: InsertEditedVideo): Promise<EditedVideo> {
    const [video] = await db
      .insert(editedVideos)
      .values(insertVideo)
      .returning();
    return video;
  }

  async updateEditedVideo(id: string, updates: Partial<EditedVideo>): Promise<EditedVideo> {
    const [video] = await db
      .update(editedVideos)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(editedVideos.id, id))
      .returning();
    return video;
  }

  async deleteEditedVideo(id: string): Promise<void> {
    await db
      .delete(editedVideos)
      .where(eq(editedVideos.id, id));
  }

  async searchEditedVideos(query: string): Promise<EditedVideo[]> {
    return await db
      .select()
      .from(editedVideos)
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
  async getPodcastSamples(limit?: number): Promise<PodcastSample[]> {
    const query = db
      .select()
      .from(podcastSamples)
      .orderBy(podcastSamples.orderIndex, desc(podcastSamples.createdAt));
    
    if (limit) {
      return await query.limit(limit);
    }
    
    return await query;
  }

  async getPodcastSample(id: string): Promise<PodcastSample | undefined> {
    const [sample] = await db
      .select()
      .from(podcastSamples)
      .where(eq(podcastSamples.id, id));
    return sample;
  }

  async createPodcastSample(insertSample: InsertPodcastSample): Promise<PodcastSample> {
    const [sample] = await db
      .insert(podcastSamples)
      .values(insertSample)
      .returning();
    return sample;
  }

  async updatePodcastSample(id: string, updates: Partial<PodcastSample>): Promise<PodcastSample> {
    const [sample] = await db
      .update(podcastSamples)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(podcastSamples.id, id))
      .returning();
    return sample;
  }

  async deletePodcastSample(id: string): Promise<void> {
    await db
      .delete(podcastSamples)
      .where(eq(podcastSamples.id, id));
  }

  async searchPodcastSamples(query: string): Promise<PodcastSample[]> {
    return await db
      .select()
      .from(podcastSamples)
      .where(
        or(
          ilike(podcastSamples.title, `%${query}%`),
          ilike(podcastSamples.description, `%${query}%`),
          ilike(podcastSamples.category, `%${query}%`),
          ilike(podcastSamples.hostName, `%${query}%`),
          ilike(podcastSamples.guestName, `%${query}%`)
        )
      )
      .orderBy(podcastSamples.orderIndex, desc(podcastSamples.createdAt));
  }

  // Analytics
  async getDashboardStats() {
    const [totalContacts] = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactSubmissions);

    const [totalVideos] = await db
      .select({ count: sql<number>`count(*)` })
      .from(demoVideos);

    const [totalAvatars] = await db
      .select({ count: sql<number>`count(*)` })
      .from(avatars);

    const [totalVoiceSamples] = await db
      .select({ count: sql<number>`count(*)` })
      .from(voiceSamples);

    const [totalEditedVideos] = await db
      .select({ count: sql<number>`count(*)` })
      .from(editedVideos);

    const [totalPodcastSamples] = await db
      .select({ count: sql<number>`count(*)` })
      .from(podcastSamples);

    // Get recent activity from contact submissions
    const recentActivity = await db
      .select({
        id: contactSubmissions.id,
        type: sql<string>`'contact'`,
        title: sql<string>`${contactSubmissions.firstName} || ' ' || ${contactSubmissions.lastName}`,
        createdAt: contactSubmissions.createdAt,
      })
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt))
      .limit(10);

    return {
      totalContacts: totalContacts.count,
      totalVideos: totalVideos.count,
      totalAvatars: totalAvatars.count,
      totalVoiceSamples: totalVoiceSamples.count,
      totalEditedVideos: totalEditedVideos.count,
      totalPodcastSamples: totalPodcastSamples.count,
      recentActivity,
    };
  }

  // Webhooks
  async getWebhooks(): Promise<Webhook[]> {
    return await db
      .select()
      .from(webhooks)
      .orderBy(desc(webhooks.createdAt));
  }

  async getWebhook(id: string): Promise<Webhook | undefined> {
    const [webhook] = await db
      .select()
      .from(webhooks)
      .where(eq(webhooks.id, id));
    return webhook;
  }

  async createWebhook(insertWebhook: InsertWebhook): Promise<Webhook> {
    const [webhook] = await db
      .insert(webhooks)
      .values(insertWebhook)
      .returning();
    return webhook;
  }

  async updateWebhook(id: string, updates: Partial<Webhook>): Promise<Webhook> {
    const [webhook] = await db
      .update(webhooks)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(webhooks.id, id))
      .returning();
    return webhook;
  }

  async deleteWebhook(id: string): Promise<boolean> {
    const result = await db
      .delete(webhooks)
      .where(eq(webhooks.id, id));
    return result.rowCount > 0;
  }

  // MCP Servers
  async getMCPServers(): Promise<MCPServer[]> {
    return await db
      .select()
      .from(mcpServers)
      .orderBy(desc(mcpServers.createdAt));
  }

  async getMCPServer(id: string): Promise<MCPServer | undefined> {
    const [server] = await db
      .select()
      .from(mcpServers)
      .where(eq(mcpServers.id, id));
    return server;
  }

  async createMCPServer(insertServer: InsertMCPServer): Promise<MCPServer> {
    const [server] = await db
      .insert(mcpServers)
      .values(insertServer)
      .returning();
    return server;
  }

  async updateMCPServer(id: string, updates: Partial<MCPServer>): Promise<MCPServer> {
    const [server] = await db
      .update(mcpServers)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(mcpServers.id, id))
      .returning();
    return server;
  }

  async deleteMCPServer(id: string): Promise<boolean> {
    const result = await db
      .delete(mcpServers)
      .where(eq(mcpServers.id, id));
    return result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();
