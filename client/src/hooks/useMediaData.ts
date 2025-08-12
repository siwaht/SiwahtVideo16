import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

interface MediaData {
  videos: Record<string, string>; // filename -> data URL
  audio: Record<string, string>;  // filename -> data URL
}

interface MediaResponse {
  success: boolean;
  media: MediaData;
  timestamp: number;
}

// Static media configuration for deployment
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

// Check if we're in static/production mode (no API server available)
const isStaticMode = () => {
  // Check if we're in a static build environment
  return import.meta.env.VITE_STATIC_BUILD === 'true' || 
         typeof window !== 'undefined' && !window.location.origin.includes('5000');
};

export function useMediaData() {
  const [mediaCache, setMediaCache] = useState<MediaData>({ videos: {}, audio: {} });
  
  // Skip API calls in static mode
  const shouldUseAPI = !isStaticMode();
  
  const { data, isLoading, error, refetch } = useQuery<MediaResponse>({
    queryKey: ['/api/media/all'],
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
    retry: shouldUseAPI ? 3 : 0,
    enabled: shouldUseAPI, // Only run query if not in static mode
  });

  useEffect(() => {
    if (data?.success && data.media) {
      setMediaCache(data.media);
      console.log('[MEDIA HOOK] Loaded media data:', {
        videos: Object.keys(data.media.videos).length,
        audio: Object.keys(data.media.audio).length,
        timestamp: data.timestamp,
        videoFiles: Object.keys(data.media.videos).slice(0, 3)
      });
    } else if (data && !data.success) {
      console.error('[MEDIA HOOK] Failed to load media data:', data);
    }
  }, [data]);

  // Helper functions to get specific media files
  const getVideoData = (filename: string): string | null => {
    return mediaCache.videos[filename] || null;
  };

  const getAudioData = (filename: string): string | null => {
    return mediaCache.audio[filename] || null;
  };

  // Get traditional URL for fallback
  const getVideoUrl = (filename: string): string => {
    if (isStaticMode()) {
      return `./videos/${filename}`;
    }
    return `/videos/${filename}`;
  };

  const getAudioUrl = (filename: string): string => {
    if (isStaticMode()) {
      return `./audio/${filename}`;
    }
    return `/audio/${filename}`;
  };

  // Check if a specific file is available
  const hasVideo = (filename: string): boolean => {
    if (isStaticMode()) {
      return STATIC_VIDEOS.includes(filename);
    }
    return filename in mediaCache.videos;
  };

  const hasAudio = (filename: string): boolean => {
    if (isStaticMode()) {
      return STATIC_AUDIO.includes(filename);
    }
    return filename in mediaCache.audio;
  };

  return {
    mediaCache,
    isLoading: isStaticMode() ? false : isLoading,
    error: isStaticMode() ? null : error,
    refetch,
    getVideoData,
    getAudioData,
    getVideoUrl,
    getAudioUrl,
    hasVideo,
    hasAudio,
    // Available files lists
    availableVideos: isStaticMode() ? STATIC_VIDEOS : Object.keys(mediaCache.videos),
    availableAudio: isStaticMode() ? STATIC_AUDIO : Object.keys(mediaCache.audio),
  };
}