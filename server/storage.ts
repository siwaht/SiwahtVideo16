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
}


// In-memory storage implementation for development
class MemStorage implements IStorage {
  private contacts: ContactSubmission[] = [];
  private demoVideos: DemoVideo[] = [];
  private avatars: Avatar[] = [];
  private voiceSamples: VoiceSample[] = [];
  private editedVideos: EditedVideo[] = [];
  private podcastSamples: PodcastSample[] = [];

  // Contact submissions - simplified for webhook integration
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const contact: ContactSubmission = {
      id: Math.random().toString(36).substr(2, 9),
      ...submission,
      status: "unread",
      adminNotes: null,
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

  // Demo videos - returns empty by default, populated from admin panel
  async getDemoVideos(limit = 50): Promise<DemoVideo[]> {
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

  // Avatars - returns empty by default, populated from admin panel
  async getAvatars(limit = 50): Promise<Avatar[]> {
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

  // Voice samples - returns empty by default, populated from admin panel
  async getVoiceSamples(limit = 50): Promise<VoiceSample[]> {
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

  // Edited videos - returns empty by default, populated from admin panel
  async getEditedVideos(limit = 50): Promise<EditedVideo[]> {
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

  // Podcast samples - returns empty by default, populated from admin panel
  async getPodcastSamples(limit = 50): Promise<PodcastSample[]> {
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
}

export const storage = new MemStorage();