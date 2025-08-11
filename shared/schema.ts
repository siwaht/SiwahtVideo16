import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Contact submissions table
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  serviceInterest: text("service_interest").notNull(),
  projectDetails: text("project_details").notNull(),
  status: text("status").default("unread").notNull(), // unread, read, responded
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});



// Demo videos table
export const demoVideos = pgTable("demo_videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(), // product-demo, testimonial, explainer, etc.
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  isHostedVideo: boolean("is_hosted_video").default(true), // true for object storage, false for YouTube/external
  isPublished: boolean("is_published").default(false).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// AI avatars table
export const avatars = pgTable("avatars", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  videoUrl: text("video_url"),
  thumbnailUrl: text("thumbnail_url"),
  gender: text("gender").notNull(), // male, female, other
  ethnicity: text("ethnicity"),
  ageRange: text("age_range"),
  voicePreview: text("voice_preview"),
  isPublished: boolean("is_published").default(false).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Voice samples table
export const voiceSamples = pgTable("voice_samples", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  audioUrl: text("audio_url").notNull(),
  language: text("language").notNull(),
  gender: text("gender").notNull(), // male, female, other
  accent: text("accent"),
  ageRange: text("age_range"),
  isPublished: boolean("is_published").default(false).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Edited videos table (portfolio showcases)
export const editedVideos = pgTable("edited_videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  isHostedVideo: boolean("is_hosted_video").default(true), // true for object storage, false for YouTube/external
  clientName: text("client_name"),
  category: text("category").notNull(), // advertisement, educational, entertainment, corporate, social, other
  tags: text("tags"),
  isPublished: boolean("is_published").default(false).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Podcast samples table
export const podcastSamples = pgTable("podcast_samples", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  audioUrl: text("audio_url").notNull(),
  category: text("category").notNull().default("interview"),
  duration: text("duration"),
  hostName: text("host_name"),
  guestName: text("guest_name"),
  isPublished: boolean("is_published").default(true),
  orderIndex: integer("order_index").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});



// Insert schemas
export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Export type definitions only for public-facing content
export const insertDemoVideoSchema = createInsertSchema(demoVideos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAvatarSchema = createInsertSchema(avatars).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVoiceSampleSchema = createInsertSchema(voiceSamples).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEditedVideoSchema = createInsertSchema(editedVideos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPodcastSampleSchema = createInsertSchema(podcastSamples).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Type exports
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertDemoVideo = z.infer<typeof insertDemoVideoSchema>;
export type DemoVideo = typeof demoVideos.$inferSelect;

export type InsertAvatar = z.infer<typeof insertAvatarSchema>;
export type Avatar = typeof avatars.$inferSelect;

export type InsertVoiceSample = z.infer<typeof insertVoiceSampleSchema>;
export type VoiceSample = typeof voiceSamples.$inferSelect;

export type InsertEditedVideo = z.infer<typeof insertEditedVideoSchema>;
export type EditedVideo = typeof editedVideos.$inferSelect;

export type InsertPodcastSample = z.infer<typeof insertPodcastSampleSchema>;
export type PodcastSample = typeof podcastSamples.$inferSelect;
