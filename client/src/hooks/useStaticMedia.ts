import { useMemo } from "react";

// Static media configuration for deployment
// These files will be available at ./videos/ and ./audio/ in the built static site
const STATIC_VIDEOS = [
  'artisan-baker-avatar.mp4',
  'coach-avatar.mp4', 
  'dairy-farmer-edited.mp4',
  'dairy-farmer-new.mp4',
  'ikea-demo-new.mp4',
  'ikea-demo-updated.mp4',
  'ikea-demo.mp4'
];

const STATIC_AUDIO = [
  'context-is-king.mp3',
  'dub-arabic.aac',
  'dub-original-chinese.mp3',
  'dub-original-english.mp3',
  'fasten-your-nightmares.mp3'
];

export function useStaticMedia() {
  
  // Helper functions to get static media URLs
  const getVideoUrl = (filename: string): string => {
    // For static deployment, use relative paths
    return `./videos/${filename}`;
  };

  const getAudioUrl = (filename: string): string => {
    // For static deployment, use relative paths  
    return `./audio/${filename}`;
  };

  // Check if a specific file is available
  const hasVideo = (filename: string): boolean => {
    return STATIC_VIDEOS.includes(filename);
  };

  const hasAudio = (filename: string): boolean => {
    return STATIC_AUDIO.includes(filename);
  };

  // Get available files
  const availableVideos = useMemo(() => STATIC_VIDEOS, []);
  const availableAudio = useMemo(() => STATIC_AUDIO, []);

  return {
    getVideoUrl,
    getAudioUrl,
    hasVideo,
    hasAudio,
    availableVideos,
    availableAudio,
    // For compatibility with existing code
    isLoading: false,
    error: null,
    getVideoData: (filename: string) => null, // No data URLs in static mode
    getAudioData: (filename: string) => null, // No data URLs in static mode
    mediaCache: { videos: {}, audio: {} }
  };
}