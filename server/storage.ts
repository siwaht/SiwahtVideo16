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
import * as fs from 'fs';
import * as path from 'path';

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

// Load media configuration from JSON file
function loadMediaConfig() {
  try {
    const configPath = path.join(process.cwd(), 'public', 'media-config.json');
    const configData = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(configData);
  } catch (error) {
    console.warn('Could not load media-config.json, using default configuration');
    return null;
  }
}

// In-memory storage implementation for development
class MemStorage implements IStorage {
  private contacts: ContactSubmission[] = [];
  private demoVideos: DemoVideo[] = [];
  private avatars: Avatar[] = [];
  private voiceSamples: VoiceSample[] = [];
  private editedVideos: EditedVideo[] = [];
  private podcastSamples: PodcastSample[] = [];
  private mediaConfig: any = null;

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

  // Demo videos - load from config or use defaults
  async getDemoVideos(limit = 50): Promise<DemoVideo[]> {
    if (this.demoVideos.length === 0) {
      // Try to load from config file
      if (!this.mediaConfig) {
        this.mediaConfig = loadMediaConfig();
      }
      
      if (this.mediaConfig && this.mediaConfig.videoAds) {
        this.demoVideos = this.mediaConfig.videoAds.map((video: any, index: number) => ({
          id: video.id,
          title: video.title,
          description: video.description || null,
          videoUrl: video.videoUrl,
          thumbnailUrl: video.thumbnailUrl || null,
          category: video.category || "commercial",
          isHostedVideo: true,
          isPublished: true,
          orderIndex: index + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
      } else {
        // Fallback to default
        this.demoVideos = [
          {
            id: "d44a33c6-fc96-4cd6-badc-6f88e9f2c3a1",
            title: "IKEA Demo",
            description: "Professional furniture showcase video featuring modern home design",
            videoUrl: "/videos/ikea-demo-new-web.mp4",
            thumbnailUrl: null,
            category: "commercial",
            isHostedVideo: true,
            isPublished: true,
            orderIndex: 1,
            createdAt: new Date("2025-01-26"),
            updatedAt: new Date("2025-01-26"),
          },
        ];
      }
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

  // Avatars - load from config or use defaults
  async getAvatars(limit = 50): Promise<Avatar[]> {
    if (this.avatars.length === 0) {
      // Try to load from config file
      if (!this.mediaConfig) {
        this.mediaConfig = loadMediaConfig();
      }
      
      if (this.mediaConfig && this.mediaConfig.avatars) {
        this.avatars = this.mediaConfig.avatars.map((avatar: any, index: number) => ({
          id: avatar.id,
          name: avatar.name,
          description: avatar.description || null,
          videoUrl: avatar.videoUrl || null,
          thumbnailUrl: avatar.thumbnailUrl || null,
          gender: avatar.gender || "diverse",
          ethnicity: avatar.ethnicity || null,
          ageRange: avatar.ageRange || null,
          voicePreview: avatar.voicePreview || null,
          isPublished: true,
          orderIndex: index + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
      } else {
        // Fallback to default
        this.avatars = [
          {
            id: "38c0f2ac-a33c-49ae-a202-7ba905b8c451",
            name: "Artisan Baker Avatar",
            description: "Professional artisan baker demonstrating traditional bread-making techniques",
            videoUrl: "/videos/artisan-baker-avatar-web.mp4",
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

  // Voice samples - load from config or use defaults
  async getVoiceSamples(limit = 50): Promise<VoiceSample[]> {
    if (this.voiceSamples.length === 0) {
      // Try to load from config file
      if (!this.mediaConfig) {
        this.mediaConfig = loadMediaConfig();
      }
      
      if (this.mediaConfig && this.mediaConfig.voiceSamples) {
        this.voiceSamples = this.mediaConfig.voiceSamples.map((sample: any, index: number) => ({
          id: sample.id,
          name: sample.name,
          description: sample.description || null,
          audioUrl: sample.audioUrl,
          language: sample.language,
          gender: sample.gender,
          accent: sample.accent || null,
          ageRange: sample.ageRange || null,
          isPublished: true,
          orderIndex: index + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
      } else {
        // Fallback to defaults
        this.voiceSamples = [
          {
            id: "603b04e8-b085-4a5f-8b86-1c45d7f8e9a2",
            name: "English Voice Ad",
            description: "Professional English voice ad showcasing premium brand messaging and clear articulation for global markets.",
            audioUrl: "/audio/dub-original-english-web.mp3",
            language: "English",
            gender: "professional",
            accent: "native",
            ageRange: "adult",
            isPublished: true,
            orderIndex: 1,
            createdAt: new Date("2025-01-26"),
            updatedAt: new Date("2025-01-26"),
          },
          {
            id: "704c15f9-c196-5b6g-9c97-2d56e8g9f0b3",
            name: "中文语音广告",
            description: "专业的中文语音广告，展现品牌优势和清晰表达，适合中国市场推广。",
            audioUrl: "/audio/dub-original-chinese-web.mp3",
            language: "中文",
            gender: "专业",
            accent: "标准",
            ageRange: "成人",
            isPublished: true,
            orderIndex: 2,
            createdAt: new Date("2025-01-26"),
            updatedAt: new Date("2025-01-26"),
          },
          {
            id: "815d26g0-d207-6c7h-0d08-3e67f9h0g1c4",
            name: "إعلان صوتي عربي",
            description: "إعلان صوتي عربي احترافي يعرض رسائل العلامة التجارية المتميزة والتعبير الواضح للأسواق العربية.",
            audioUrl: "/audio/dub-arabic-web.mp3",
            language: "عربي",
            gender: "محترف",
            accent: "أصلي",
            ageRange: "بالغ",
            isPublished: true,
            orderIndex: 3,
            createdAt: new Date("2025-01-26"),
            updatedAt: new Date("2025-01-26"),
          }
        ];
      }
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

  // Edited videos - load from config or use defaults
  async getEditedVideos(limit = 50): Promise<EditedVideo[]> {
    if (this.editedVideos.length === 0) {
      // Try to load from config file
      if (!this.mediaConfig) {
        this.mediaConfig = loadMediaConfig();
      }
      
      if (this.mediaConfig && this.mediaConfig.editedVideos) {
        this.editedVideos = this.mediaConfig.editedVideos.map((video: any, index: number) => ({
          id: video.id,
          title: video.title,
          description: video.description || null,
          videoUrl: video.videoUrl,
          thumbnailUrl: video.thumbnailUrl || null,
          isHostedVideo: true,
          clientName: video.clientName || null,
          category: video.category || "documentary",
          tags: video.tags || null,
          isPublished: true,
          orderIndex: index + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
      } else {
        // Fallback to default
        this.editedVideos = [
          {
            id: "a37d48i2-f429-8e9j-2f20-5g89h1j2i3e6",
            title: "Japanese Market Documentary",
            description: "Professional documentary showcasing vibrant Japanese market culture and traditions",
            videoUrl: "/videos/japanese-market.mp4",
            thumbnailUrl: null,
            isHostedVideo: true,
            clientName: "Cultural Productions",
            category: "documentary",
            tags: null,
            isPublished: true,
            orderIndex: 1,
            createdAt: new Date("2025-01-26"),
            updatedAt: new Date("2025-01-26"),
          }
        ];
      }
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

  // Podcast samples - load from config or use defaults
  async getPodcastSamples(limit = 50): Promise<PodcastSample[]> {
    if (this.podcastSamples.length === 0) {
      // Try to load from config file
      if (!this.mediaConfig) {
        this.mediaConfig = loadMediaConfig();
      }
      
      if (this.mediaConfig && this.mediaConfig.podcasts) {
        this.podcastSamples = this.mediaConfig.podcasts.map((podcast: any, index: number) => ({
          id: podcast.id,
          title: podcast.title,
          description: podcast.description,
          audioUrl: podcast.audioUrl,
          category: podcast.category || "technology",
          duration: podcast.duration || null,
          hostName: podcast.hostName || null,
          guestName: podcast.guestName || null,
          isPublished: true,
          orderIndex: index + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
      } else {
        // Fallback to defaults
        this.podcastSamples = [
          {
            id: "4ac9c44d-dbd7-4763-88d0-fd8f7e6c5a94",
            title: "Context is King: Engineering the Brains, and Nightmares, of AI Agents",
            description: "The era of simple \"prompt engineering\" is over. We explore why \"context engineering\" is the critical discipline for building powerful AI agents and why it's also the source of their greatest dangers.",
            audioUrl: "/audio/context-is-king-web.mp3",
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
            audioUrl: "/audio/fasten-your-nightmares-web.mp3",
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
}

export const storage = new MemStorage();