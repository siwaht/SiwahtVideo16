import { z } from "zod";

// TypeScript interfaces for type safety (no database tables needed)
export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  company?: string | null;
  projectDetails: string;
  status: string;
  adminNotes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DemoVideo {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  videoUrl: string;
  thumbnailUrl?: string | null;
  isHostedVideo: boolean;
  isPublished: boolean;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Avatar {
  id: string;
  name: string;
  description?: string | null;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  gender: string;
  ethnicity?: string | null;
  ageRange?: string | null;
  voicePreview?: string | null;
  isPublished: boolean;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoiceSample {
  id: string;
  name: string;
  description?: string | null;
  audioUrl: string;
  language: string;
  gender: string;
  accent?: string | null;
  ageRange?: string | null;
  isPublished: boolean;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditedVideo {
  id: string;
  title: string;
  description?: string | null;
  videoUrl: string;
  thumbnailUrl?: string | null;
  isHostedVideo: boolean;
  clientName?: string | null;
  category: string;
  tags?: string | null;
  isPublished: boolean;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PodcastSample {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  category: string;
  duration?: string | null;
  hostName?: string | null;
  guestName?: string | null;
  isPublished: boolean;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

// Insert type definitions
export type InsertContactSubmission = {
  fullName: string;
  email: string;
  company?: string;
  projectDetails: string;
};
export type InsertDemoVideo = Omit<DemoVideo, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertAvatar = Omit<Avatar, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertVoiceSample = Omit<VoiceSample, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertEditedVideo = Omit<EditedVideo, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertPodcastSample = Omit<PodcastSample, 'id' | 'createdAt' | 'updatedAt'>;

// Validation schemas
export const insertContactSubmissionSchema = z.object({
  fullName: z.string().min(1, "Full name is required").min(2, "Please enter your full name"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  company: z.string().optional(),
  projectDetails: z.string().min(1, "Message is required").min(10, "Please provide more details about your project"),
});