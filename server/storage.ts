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
} from "@shared/schema";
import { supabase } from "./db";

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactSubmission(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission>;

  getDemoVideos(limit?: number): Promise<DemoVideo[]>;
  getDemoVideo(id: string): Promise<DemoVideo | undefined>;
  createDemoVideo(video: InsertDemoVideo): Promise<DemoVideo>;
  updateDemoVideo(id: string, updates: Partial<DemoVideo>): Promise<DemoVideo>;
  deleteDemoVideo(id: string): Promise<void>;

  getAvatars(limit?: number): Promise<Avatar[]>;
  getAvatar(id: string): Promise<Avatar | undefined>;
  createAvatar(avatar: InsertAvatar): Promise<Avatar>;
  updateAvatar(id: string, updates: Partial<Avatar>): Promise<Avatar>;
  deleteAvatar(id: string): Promise<void>;

  getVoiceSamples(limit?: number): Promise<VoiceSample[]>;
  getVoiceSample(id: string): Promise<VoiceSample | undefined>;
  createVoiceSample(sample: InsertVoiceSample): Promise<VoiceSample>;
  updateVoiceSample(id: string, updates: Partial<VoiceSample>): Promise<VoiceSample>;
  deleteVoiceSample(id: string): Promise<void>;

  getEditedVideos(limit?: number): Promise<EditedVideo[]>;
  getEditedVideo(id: string): Promise<EditedVideo | undefined>;
  createEditedVideo(video: InsertEditedVideo): Promise<EditedVideo>;
  updateEditedVideo(id: string, updates: Partial<EditedVideo>): Promise<EditedVideo>;
  deleteEditedVideo(id: string): Promise<void>;

  getPodcastSamples(limit?: number): Promise<PodcastSample[]>;
  getPodcastSample(id: string): Promise<PodcastSample | undefined>;
  createPodcastSample(sample: InsertPodcastSample): Promise<PodcastSample>;
  updatePodcastSample(id: string, updates: Partial<PodcastSample>): Promise<PodcastSample>;
  deletePodcastSample(id: string): Promise<void>;
}

class SupabaseStorage implements IStorage {
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        full_name: submission.fullName,
        email: submission.email,
        company: submission.company || null,
        project_details: submission.projectDetails,
        status: 'unread',
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      fullName: data.full_name,
      email: data.email,
      company: data.company,
      projectDetails: data.project_details,
      status: data.status,
      adminNotes: data.admin_notes,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id,
      fullName: item.full_name,
      email: item.email,
      company: item.company,
      projectDetails: item.project_details,
      status: item.status,
      adminNotes: item.admin_notes,
      createdAt: new Date(item.created_at),
      updatedAt: new Date(item.updated_at),
    }));
  }

  async updateContactSubmission(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission> {
    const updateData: any = {};
    if (updates.status) updateData.status = updates.status;
    if (updates.adminNotes !== undefined) updateData.admin_notes = updates.adminNotes;

    const { data, error } = await supabase
      .from('contact_submissions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      fullName: data.full_name,
      email: data.email,
      company: data.company,
      projectDetails: data.project_details,
      status: data.status,
      adminNotes: data.admin_notes,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async getDemoVideos(limit: number = 50): Promise<DemoVideo[]> {
    const { data, error } = await supabase
      .from('demo_videos')
      .select('*')
      .eq('is_published', true)
      .order('order_index', { ascending: true })
      .limit(limit);

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      videoUrl: item.video_url,
      thumbnailUrl: item.thumbnail_url,
      category: item.category,
      isHostedVideo: item.is_hosted_video,
      isPublished: item.is_published,
      orderIndex: item.order_index,
      createdAt: new Date(item.created_at),
      updatedAt: new Date(item.updated_at),
    }));
  }

  async getDemoVideo(id: string): Promise<DemoVideo | undefined> {
    const { data, error } = await supabase
      .from('demo_videos')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      videoUrl: data.video_url,
      thumbnailUrl: data.thumbnail_url,
      category: data.category,
      isHostedVideo: data.is_hosted_video,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async createDemoVideo(video: InsertDemoVideo): Promise<DemoVideo> {
    const { data, error } = await supabase
      .from('demo_videos')
      .insert({
        title: video.title,
        description: video.description || null,
        video_url: video.videoUrl,
        thumbnail_url: video.thumbnailUrl || null,
        category: video.category,
        is_hosted_video: video.isHostedVideo ?? true,
        is_published: video.isPublished ?? false,
        order_index: video.orderIndex ?? 0,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      videoUrl: data.video_url,
      thumbnailUrl: data.thumbnail_url,
      category: data.category,
      isHostedVideo: data.is_hosted_video,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async updateDemoVideo(id: string, updates: Partial<DemoVideo>): Promise<DemoVideo> {
    const updateData: any = {};
    if (updates.title) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.category) updateData.category = updates.category;
    if (updates.isPublished !== undefined) updateData.is_published = updates.isPublished;

    const { data, error } = await supabase
      .from('demo_videos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      videoUrl: data.video_url,
      thumbnailUrl: data.thumbnail_url,
      category: data.category,
      isHostedVideo: data.is_hosted_video,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async deleteDemoVideo(id: string): Promise<void> {
    const { error } = await supabase
      .from('demo_videos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async getAvatars(limit: number = 50): Promise<Avatar[]> {
    const { data, error } = await supabase
      .from('avatars')
      .select('*')
      .eq('is_published', true)
      .order('order_index', { ascending: true })
      .limit(limit);

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      videoUrl: item.video_url,
      thumbnailUrl: item.thumbnail_url,
      gender: item.gender,
      ethnicity: item.ethnicity,
      ageRange: item.age_range,
      voicePreview: item.voice_preview,
      isPublished: item.is_published,
      orderIndex: item.order_index,
      createdAt: new Date(item.created_at),
      updatedAt: new Date(item.updated_at),
    }));
  }

  async getAvatar(id: string): Promise<Avatar | undefined> {
    const { data, error } = await supabase
      .from('avatars')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      videoUrl: data.video_url,
      thumbnailUrl: data.thumbnail_url,
      gender: data.gender,
      ethnicity: data.ethnicity,
      ageRange: data.age_range,
      voicePreview: data.voice_preview,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async createAvatar(avatar: InsertAvatar): Promise<Avatar> {
    const { data, error } = await supabase
      .from('avatars')
      .insert({
        name: avatar.name,
        description: avatar.description || null,
        video_url: avatar.videoUrl || null,
        thumbnail_url: avatar.thumbnailUrl || null,
        gender: avatar.gender,
        ethnicity: avatar.ethnicity || null,
        age_range: avatar.ageRange || null,
        voice_preview: avatar.voicePreview || null,
        is_published: avatar.isPublished ?? false,
        order_index: avatar.orderIndex ?? 0,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      videoUrl: data.video_url,
      thumbnailUrl: data.thumbnail_url,
      gender: data.gender,
      ethnicity: data.ethnicity,
      ageRange: data.age_range,
      voicePreview: data.voice_preview,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async updateAvatar(id: string, updates: Partial<Avatar>): Promise<Avatar> {
    const updateData: any = {};
    if (updates.name) updateData.name = updates.name;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.isPublished !== undefined) updateData.is_published = updates.isPublished;

    const { data, error } = await supabase
      .from('avatars')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      videoUrl: data.video_url,
      thumbnailUrl: data.thumbnail_url,
      gender: data.gender,
      ethnicity: data.ethnicity,
      ageRange: data.age_range,
      voicePreview: data.voice_preview,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async deleteAvatar(id: string): Promise<void> {
    const { error } = await supabase
      .from('avatars')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async getVoiceSamples(limit: number = 50): Promise<VoiceSample[]> {
    const { data, error } = await supabase
      .from('voice_samples')
      .select('*')
      .eq('is_published', true)
      .order('order_index', { ascending: true })
      .limit(limit);

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      audioUrl: item.audio_url,
      language: item.language,
      gender: item.gender,
      accent: item.accent,
      ageRange: item.age_range,
      isPublished: item.is_published,
      orderIndex: item.order_index,
      createdAt: new Date(item.created_at),
      updatedAt: new Date(item.updated_at),
    }));
  }

  async getVoiceSample(id: string): Promise<VoiceSample | undefined> {
    const { data, error } = await supabase
      .from('voice_samples')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      audioUrl: data.audio_url,
      language: data.language,
      gender: data.gender,
      accent: data.accent,
      ageRange: data.age_range,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async createVoiceSample(sample: InsertVoiceSample): Promise<VoiceSample> {
    const { data, error } = await supabase
      .from('voice_samples')
      .insert({
        name: sample.name,
        description: sample.description || null,
        audio_url: sample.audioUrl,
        language: sample.language,
        gender: sample.gender,
        accent: sample.accent || null,
        age_range: sample.ageRange || null,
        is_published: sample.isPublished ?? false,
        order_index: sample.orderIndex ?? 0,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      audioUrl: data.audio_url,
      language: data.language,
      gender: data.gender,
      accent: data.accent,
      ageRange: data.age_range,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async updateVoiceSample(id: string, updates: Partial<VoiceSample>): Promise<VoiceSample> {
    const updateData: any = {};
    if (updates.name) updateData.name = updates.name;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.isPublished !== undefined) updateData.is_published = updates.isPublished;

    const { data, error } = await supabase
      .from('voice_samples')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      audioUrl: data.audio_url,
      language: data.language,
      gender: data.gender,
      accent: data.accent,
      ageRange: data.age_range,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async deleteVoiceSample(id: string): Promise<void> {
    const { error } = await supabase
      .from('voice_samples')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async getEditedVideos(limit: number = 50): Promise<EditedVideo[]> {
    const { data, error } = await supabase
      .from('edited_videos')
      .select('*')
      .eq('is_published', true)
      .order('order_index', { ascending: true })
      .limit(limit);

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      videoUrl: item.video_url,
      thumbnailUrl: item.thumbnail_url,
      isHostedVideo: item.is_hosted_video,
      clientName: item.client_name,
      category: item.category,
      tags: item.tags,
      isPublished: item.is_published,
      orderIndex: item.order_index,
      createdAt: new Date(item.created_at),
      updatedAt: new Date(item.updated_at),
    }));
  }

  async getEditedVideo(id: string): Promise<EditedVideo | undefined> {
    const { data, error } = await supabase
      .from('edited_videos')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      videoUrl: data.video_url,
      thumbnailUrl: data.thumbnail_url,
      isHostedVideo: data.is_hosted_video,
      clientName: data.client_name,
      category: data.category,
      tags: data.tags,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async createEditedVideo(video: InsertEditedVideo): Promise<EditedVideo> {
    const { data, error } = await supabase
      .from('edited_videos')
      .insert({
        title: video.title,
        description: video.description || null,
        video_url: video.videoUrl,
        thumbnail_url: video.thumbnailUrl || null,
        is_hosted_video: video.isHostedVideo ?? true,
        client_name: video.clientName || null,
        category: video.category,
        tags: video.tags || null,
        is_published: video.isPublished ?? false,
        order_index: video.orderIndex ?? 0,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      videoUrl: data.video_url,
      thumbnailUrl: data.thumbnail_url,
      isHostedVideo: data.is_hosted_video,
      clientName: data.client_name,
      category: data.category,
      tags: data.tags,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async updateEditedVideo(id: string, updates: Partial<EditedVideo>): Promise<EditedVideo> {
    const updateData: any = {};
    if (updates.title) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.category) updateData.category = updates.category;
    if (updates.isPublished !== undefined) updateData.is_published = updates.isPublished;

    const { data, error } = await supabase
      .from('edited_videos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      videoUrl: data.video_url,
      thumbnailUrl: data.thumbnail_url,
      isHostedVideo: data.is_hosted_video,
      clientName: data.client_name,
      category: data.category,
      tags: data.tags,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async deleteEditedVideo(id: string): Promise<void> {
    const { error } = await supabase
      .from('edited_videos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async getPodcastSamples(limit: number = 50): Promise<PodcastSample[]> {
    const { data, error } = await supabase
      .from('podcast_samples')
      .select('*')
      .eq('is_published', true)
      .order('order_index', { ascending: true })
      .limit(limit);

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      audioUrl: item.audio_url,
      category: item.category,
      duration: item.duration,
      hostName: item.host_name,
      guestName: item.guest_name,
      isPublished: item.is_published,
      orderIndex: item.order_index,
      createdAt: new Date(item.created_at),
      updatedAt: new Date(item.updated_at),
    }));
  }

  async getPodcastSample(id: string): Promise<PodcastSample | undefined> {
    const { data, error } = await supabase
      .from('podcast_samples')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      audioUrl: data.audio_url,
      category: data.category,
      duration: data.duration,
      hostName: data.host_name,
      guestName: data.guest_name,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async createPodcastSample(sample: InsertPodcastSample): Promise<PodcastSample> {
    const { data, error } = await supabase
      .from('podcast_samples')
      .insert({
        title: sample.title,
        description: sample.description,
        audio_url: sample.audioUrl,
        category: sample.category ?? 'interview',
        duration: sample.duration || null,
        host_name: sample.hostName || null,
        guest_name: sample.guestName || null,
        is_published: sample.isPublished ?? true,
        order_index: sample.orderIndex ?? 0,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      audioUrl: data.audio_url,
      category: data.category,
      duration: data.duration,
      hostName: data.host_name,
      guestName: data.guest_name,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async updatePodcastSample(id: string, updates: Partial<PodcastSample>): Promise<PodcastSample> {
    const updateData: any = {};
    if (updates.title) updateData.title = updates.title;
    if (updates.description) updateData.description = updates.description;
    if (updates.category) updateData.category = updates.category;
    if (updates.isPublished !== undefined) updateData.is_published = updates.isPublished;

    const { data, error } = await supabase
      .from('podcast_samples')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      audioUrl: data.audio_url,
      category: data.category,
      duration: data.duration,
      hostName: data.host_name,
      guestName: data.guest_name,
      isPublished: data.is_published,
      orderIndex: data.order_index,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async deletePodcastSample(id: string): Promise<void> {
    const { error } = await supabase
      .from('podcast_samples')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

export const storage = new SupabaseStorage();
