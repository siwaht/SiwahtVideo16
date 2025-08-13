import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  src: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
}

export function AudioPlayer({ 
  src, 
  title, 
  className = "", 
  autoPlay = false,
  onPlay,
  onPause 
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Detect URL type and render appropriate player
  const getEmbedPlayer = (url: string) => {
    if (!url) return null;

    // SoundCloud
    if (url.includes('soundcloud.com')) {
      const embedUrl = url.replace('soundcloud.com', 'w.soundcloud.com/player/?url=https://soundcloud.com');
      return (
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={`${embedUrl}&color=%23ff5500&auto_play=${autoPlay}&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
        />
      );
    }

    // Spotify
    if (url.includes('spotify.com')) {
      const trackId = url.split('/').pop()?.split('?')[0];
      if (trackId) {
        return (
          <iframe
            src={`https://open.spotify.com/embed/track/${trackId}`}
            width="100%"
            height="152"
            frameBorder="0"
            allowTransparency={true}
            allow="encrypted-media"
          />
        );
      }
    }

    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('youtube.com')) {
        videoId = url.split('v=')[1]?.split('&')[0] || '';
      } else {
        videoId = url.split('/').pop()?.split('?')[0] || '';
      }
      
      if (videoId) {
        return (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
    }

    return null;
  };

  const embedPlayer = getEmbedPlayer(src);

  // If it's an embeddable URL, show the embed player
  if (embedPlayer) {
    return (
      <div className={className}>
        {title && (
          <h4 className="text-sm font-medium text-slate-700 mb-2 px-1">{title}</h4>
        )}
        {embedPlayer}
      </div>
    );
  }

  // Otherwise, show the custom audio player
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
      setIsLoading(false);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    if (audio.readyState > 0) {
      setAudioData();
    }

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, [src]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      onPause?.();
    } else {
      audio.play();
      setIsPlaying(true);
      onPlay?.();
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = (value[0] / 100) * duration;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const vol = value[0] / 100;
    audio.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`bg-white border rounded-lg p-4 shadow-sm ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setIsPlaying(false)}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
      />
      
      {title && (
        <h4 className="text-sm font-medium text-slate-700 mb-3">{title}</h4>
      )}
      
      <div className="space-y-3">
        {/* Progress bar */}
        <div className="space-y-1">
          <div className="w-full bg-slate-200 rounded-full h-2 relative cursor-pointer"
               onClick={(e) => {
                 if (isLoading || !duration) return;
                 const rect = e.currentTarget.getBoundingClientRect();
                 const percent = (e.clientX - rect.left) / rect.width;
                 handleSeek([percent * 100]);
               }}>
            <div 
              className="bg-blue-500 rounded-full h-2 transition-all duration-150"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <Button
            onClick={togglePlayPause}
            variant="outline"
            size="sm"
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isLoading ? "Loading..." : isPlaying ? "Pause" : "Play"}
          </Button>

          {/* Volume control */}
          <div className="flex items-center gap-2">
            <Button
              onClick={toggleMute}
              variant="ghost"
              size="sm"
              className="p-2"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <div className="w-20 bg-slate-200 rounded-full h-1 relative cursor-pointer"
                 onClick={(e) => {
                   if (isLoading) return;
                   const rect = e.currentTarget.getBoundingClientRect();
                   const percent = (e.clientX - rect.left) / rect.width;
                   handleVolumeChange([percent * 100]);
                 }}>
              <div 
                className="bg-blue-500 rounded-full h-1 transition-all duration-150"
                style={{ width: `${isMuted ? 0 : volume * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}