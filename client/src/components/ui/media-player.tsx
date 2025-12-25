import { useState } from "react";
import { Play, Volume2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/ui/video-player";
import { processVideoUrl, getPlatformName } from "@/lib/videoUtils";
import { processAudioUrl, getAudioPlatformName } from "@/lib/audioUtils";
import { cn } from "@/lib/utils";

interface MediaPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
  type?: 'video' | 'audio';
  gifLike?: boolean;
}

export function MediaPlayer({
  src,
  poster,
  title,
  className,
  type = 'video',
  gifLike = false,
}: MediaPlayerProps) {
  const [hasError, setHasError] = useState(false);

  // Handle audio
  if (type === 'audio') {
    const processedAudio = processAudioUrl(src);

    // SoundCloud embed
    if (processedAudio.platform === 'soundcloud') {
      return (
        <div className={cn("rounded-lg overflow-hidden", className)}>
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={processedAudio.embedUrl}
            className="rounded-lg"
          />
          {title && <p className="text-xs text-slate-600 mt-2 truncate">{title}</p>}
        </div>
      );
    }

    // Spotify embed
    if (processedAudio.platform === 'spotify') {
      return (
        <div className={cn("rounded-lg overflow-hidden", className)}>
          <iframe
            src={processedAudio.embedUrl}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
          />
          {title && <p className="text-xs text-slate-600 mt-2 truncate">{title}</p>}
        </div>
      );
    }

    // Apple embed
    if (processedAudio.platform === 'apple') {
      return (
        <div className={cn("rounded-lg overflow-hidden", className)}>
          <iframe
            src={processedAudio.embedUrl}
            width="100%"
            height="175"
            frameBorder="0"
            allow="autoplay *; encrypted-media *; fullscreen *"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            loading="lazy"
            className="rounded-lg"
          />
          {title && <p className="text-xs text-slate-600 mt-2 truncate">{title}</p>}
        </div>
      );
    }

    // Direct audio file
    return (
      <div className={cn("bg-slate-50 p-3 rounded-lg", className)}>
        <audio
          controls
          controlsList="nodownload"
          className="w-full"
          preload="metadata"
          style={{ height: '40px' }}
        >
          <source src={src} type="audio/mpeg" />
          <source src={src} type="audio/mp3" />
          <source src={src} type="audio/wav" />
          <source src={src} type="audio/aac" />
          Your browser does not support the audio element.
        </audio>
        {title && <p className="text-xs text-slate-600 mt-2 truncate">{title}</p>}
      </div>
    );
  }

  // Process video URL
  const processedVideo = processVideoUrl(src);

  // Error state
  if (hasError) {
    return (
      <div 
        className={cn(
          "relative bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center text-white aspect-video",
          className
        )}
      >
        <div className="text-center p-6">
          <div className="text-slate-400 mb-4">
            <Play className="h-12 w-12 mx-auto mb-2" />
            <p className="text-sm">Unable to load video</p>
            {title && <p className="text-xs text-slate-500 mt-1">{title}</p>}
          </div>
          <Button
            onClick={() => setHasError(false)}
            variant="outline"
            size="sm"
            className="gap-2 text-white border-white/20 hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Direct video file (mp4, webm, etc.) - use VideoPlayer
  if (processedVideo.platform === 'direct') {
    return (
      <div className={cn("relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl rounded-xl overflow-hidden", className)}>
        <VideoPlayer
          src={processedVideo.embedUrl}
          poster={poster}
          title={title}
          className="absolute inset-0 w-full h-full"
          width="100%"
          height="100%"
          gifLike={gifLike}
        />
      </div>
    );
  }

  // Embedded video (YouTube, Vimeo, Gumlet, Google Drive)
  if (processedVideo.canEmbed) {
    return (
      <div className={cn("relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl rounded-xl overflow-hidden", className)}>
        <iframe
          src={processedVideo.embedUrl}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          title={title || 'Video'}
          loading="lazy"
          onError={() => setHasError(true)}
        />
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
            {getPlatformName(processedVideo.platform)}
          </span>
        </div>
      </div>
    );
  }

  // Unsupported platform - show placeholder
  return (
    <div className={cn(
      "bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl aspect-video relative overflow-hidden shadow-2xl",
      className
    )}>
      {poster ? (
        <img
          src={poster}
          alt={title || 'Video thumbnail'}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4 mx-auto shadow-2xl">
            <Play className="h-10 w-10 text-white fill-current" />
          </div>
          {title && <p className="text-sm opacity-90 font-semibold">{title}</p>}
          <p className="text-xs opacity-70 mt-2">
            Unsupported platform: {getPlatformName(processedVideo.platform)}
          </p>
          <a 
            href={src} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block"
          >
            Open in new tab →
          </a>
        </div>
      </div>
    </div>
  );
}
