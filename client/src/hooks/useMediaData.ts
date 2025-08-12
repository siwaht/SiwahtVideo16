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

export function useMediaData() {
  const [mediaCache, setMediaCache] = useState<MediaData>({ videos: {}, audio: {} });

  const { data, isLoading, error, refetch } = useQuery<MediaResponse>({
    queryKey: ['/api/media/all'],
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
    retry: 3,
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
    return `/videos/${filename}`;
  };

  const getAudioUrl = (filename: string): string => {
    return `/audio/${filename}`;
  };

  // Check if a specific file is available
  const hasVideo = (filename: string): boolean => {
    return filename in mediaCache.videos;
  };

  const hasAudio = (filename: string): boolean => {
    return filename in mediaCache.audio;
  };

  return {
    mediaCache,
    isLoading,
    error,
    refetch,
    getVideoData,
    getAudioData,
    getVideoUrl,
    getAudioUrl,
    hasVideo,
    hasAudio,
    // Available files lists
    availableVideos: Object.keys(mediaCache.videos),
    availableAudio: Object.keys(mediaCache.audio),
  };
}