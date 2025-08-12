import { useRef, useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import { useMediaData } from "@/hooks/useMediaData";

interface EnhancedVideoPlayerProps {
  filename: string;
  title?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  fallbackUrl?: string;
}

export function EnhancedVideoPlayer({
  filename,
  title = "Video",
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
  className = "",
  fallbackUrl
}: EnhancedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { getVideoData, getVideoUrl, hasVideo, isLoading } = useMediaData();

  // Get video source - try data URL first, then fallback to regular URL
  const videoSrc = getVideoData(filename) || fallbackUrl || getVideoUrl(filename);
  const isDataUrl = videoSrc.startsWith('data:');

  console.log(`[ENHANCED VIDEO] ${filename}:`, {
    hasVideo: hasVideo(filename),
    isDataUrl,
    srcLength: videoSrc.length,
    isLoading,
    hasError
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error(`[ENHANCED VIDEO] Error loading ${filename}:`, e);
      setHasError(true);
    };
    const handleLoadStart = () => {
      console.log(`[ENHANCED VIDEO] Loading started: ${filename}`);
      setHasError(false);
    };
    const handleCanPlay = () => {
      console.log(`[ENHANCED VIDEO] Can play: ${filename}`);
      setHasError(false);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [filename]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(e => {
        console.error(`[ENHANCED VIDEO] Play failed for ${filename}:`, e);
        setHasError(true);
      });
    } else {
      video.pause();
    }
  };

  if (isLoading) {
    return (
      <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
        <div className="aspect-video flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
            <p>Loading {title}...</p>
          </div>
        </div>
      </div>
    );
  }

  if (hasError || (!hasVideo(filename) && !fallbackUrl)) {
    return (
      <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
        <div className="aspect-video flex items-center justify-center">
          <div className="text-white text-center">
            <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-sm opacity-75">Video temporarily unavailable</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden group ${className}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        className="w-full h-full object-cover"
        preload="metadata"
      />
      
      {!controls && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={togglePlay}
            className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
        </div>
      )}
      
      <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
        {title}
      </div>
    </div>
  );
}