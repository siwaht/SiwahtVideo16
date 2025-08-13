import { useEffect, useRef } from 'react';

interface UseMediaVisibilityOptions {
  threshold?: number;
  onVisibilityChange?: (isVisible: boolean) => void;
  autoPlay?: boolean;
  autoPause?: boolean;
}

/**
 * Hook to manage media playback based on visibility in viewport
 * Automatically pauses media when it scrolls out of view
 */
export function useMediaVisibility(
  mediaRef: React.RefObject<HTMLVideoElement | HTMLAudioElement>,
  options: UseMediaVisibilityOptions = {}
) {
  const {
    threshold = 0.3,
    onVisibilityChange,
    autoPlay = false,
    autoPause = true
  } = options;
  
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    const mediaElement = mediaRef.current;
    if (!mediaElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          onVisibilityChange?.(isVisible);

          if (isVisible) {
            // Media is visible
            if (autoPlay && !mediaElement.paused) {
              mediaElement.play().catch((error) => {
                console.log('Autoplay failed:', error);
              });
            }
          } else {
            // Media is not visible
            if (autoPause && !mediaElement.paused) {
              wasPlayingRef.current = true;
              mediaElement.pause();
            }
          }
        });
      },
      { threshold }
    );

    observer.observe(mediaElement);

    return () => {
      observer.disconnect();
    };
  }, [mediaRef, threshold, onVisibilityChange, autoPlay, autoPause]);

  return { wasPlayingRef };
}