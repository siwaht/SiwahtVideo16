import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LazyVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  alt?: string; // SEO: Alt text for accessibility
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
  gifLike?: boolean;
  lazyLoad?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
}

export function LazyVideoPlayer({
  src,
  poster,
  title,
  alt,
  className,
  autoPlay = false,
  muted = false,
  controls = true,
  width = "100%",
  height = "auto",
  gifLike = false,
  lazyLoad = true,
  preload = 'none',
}: LazyVideoPlayerProps) {
  const [isInView, setIsInView] = useState(!lazyLoad);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted || gifLike);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazyLoad) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // For gif-like videos, auto-start when in view
            if (gifLike && videoRef.current && !hasStarted) {
              setTimeout(() => {
                handlePlayClick();
              }, 100);
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading slightly before element is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [lazyLoad, gifLike, hasStarted]);

  const handlePlayClick = async () => {
    if (!videoRef.current || hasStarted) return;
    
    setIsLoading(true);
    setHasStarted(true);
    
    try {
      // Ensure video is muted for autoplay to work
      videoRef.current.muted = true;
      setIsMuted(true);
      
      await videoRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Video play failed:', error);
      // Retry with muted if failed
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
        try {
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (retryError) {
          console.error('Retry failed:', retryError);
          setHasStarted(false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      handlePlayClick();
    }
  };

  // Mobile-optimized thumbnail with play button overlay
  const renderThumbnail = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      {poster && (
        <img 
          src={poster} 
          alt={alt || title || "Video thumbnail"}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-black/30" />
      {!isLoading && (
        <button
          onClick={handlePlayClick}
          className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 touch-manipulation"
          aria-label={`Play video: ${title || 'video'}`}
          data-testid="lazy-play-button"
        >
          <Play className="h-8 w-8 sm:h-10 sm:w-10 text-slate-900 ml-1" />
        </button>
      )}
      {isLoading && (
        <div className="relative z-10 text-white text-center">
          <Loader className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p className="text-sm">Loading video...</p>
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative bg-slate-900 rounded-xl overflow-hidden group",
        height === 'auto' && "aspect-video",
        className
      )}
      style={{ 
        width, 
        ...(height !== 'auto' && { height })
      }}
      role="region"
      aria-label={title || "Video player"}
    >
      {isInView ? (
        <>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            poster={poster}
            preload={hasStarted ? 'auto' : 'metadata'}
            muted={isMuted}
            loop={gifLike}
            playsInline
            controls={false} // We'll use custom controls
            aria-label={alt || title || "Video content"}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadStart={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            data-testid="lazy-video-element"
          >
            <source src={src} type="video/mp4" />
            <source src={src.replace('.mp4', '.webm')} type="video/webm" />
            Your browser does not support the video tag.
          </video>

          {/* Thumbnail and play button overlay - only show before starting */}
          {!hasStarted && !gifLike && renderThumbnail()}

          {/* Simple controls overlay for started videos */}
          {hasStarted && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
              <div className="flex gap-4">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center backdrop-blur-sm transition-all touch-manipulation"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 text-white" />
                  ) : (
                    <Play className="h-6 w-6 text-white ml-0.5" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center backdrop-blur-sm transition-all touch-manipulation"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5 text-white" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Mobile-friendly mute button for gif-like videos */}
          {gifLike && hasStarted && (
            <button
              onClick={toggleMute}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-all touch-manipulation"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-white" />
              ) : (
                <Volume2 className="h-4 w-4 text-white" />
              )}
            </button>
          )}
        </>
      ) : (
        // Placeholder while not in view
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          {poster ? (
            <img 
              src={poster} 
              alt={alt || title || "Video thumbnail"}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="text-slate-400 text-center p-4">
              <Play className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">{title || "Video"}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}