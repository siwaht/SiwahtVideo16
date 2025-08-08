import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Play, Volume2, User, Video, ChevronLeft, ChevronRight } from "lucide-react";
import type { DemoVideo, Avatar, VoiceSample, EditedVideo } from "@shared/schema";

interface PortfolioSectionProps {
  category: 'demo-videos' | 'avatars' | 'voice-samples' | 'edited-videos';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function PortfolioSection({ category, title, description, icon: Icon }: PortfolioSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: samples = [], isLoading } = useQuery<(DemoVideo | Avatar | VoiceSample | EditedVideo)[]>({
    queryKey: [`/api/samples/${category}`],
  });

  const nextSlide = () => {
    if (samples.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(samples.length / 3));
    }
  };

  const prevSlide = () => {
    if (samples.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + Math.ceil(samples.length / 3)) % Math.ceil(samples.length / 3));
    }
  };

  const getCurrentSamples = () => {
    const itemsPerSlide = 3;
    const startIndex = currentIndex * itemsPerSlide;
    return samples.slice(startIndex, startIndex + itemsPerSlide);
  };

  const renderSample = (sample: DemoVideo | Avatar | VoiceSample | EditedVideo) => {
    if (category === 'demo-videos' || category === 'edited-videos') {
      const video = sample as DemoVideo | EditedVideo;
      return (
        <article key={sample.id} className="feature-card hover-lift">
          <div className="relative aspect-video bg-muted rounded-xl overflow-hidden mb-4">
            {video.thumbnailUrl ? (
              <img 
                src={video.thumbnailUrl} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <button className="absolute inset-0 flex items-center justify-center group">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                <Play className="h-8 w-8 text-white" />
              </div>
            </button>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{video.title}</h3>
          {video.description && (
            <p className="text-muted-foreground text-sm line-clamp-2">{video.description}</p>
          )}
        </article>
      );
    }

    if (category === 'avatars') {
      const avatar = sample as Avatar;
      return (
        <article key={sample.id} className="feature-card hover-lift">
          <div className="relative aspect-square bg-muted rounded-xl overflow-hidden mb-4">
            {avatar.thumbnailUrl ? (
              <img 
                src={avatar.thumbnailUrl} 
                alt={avatar.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{avatar.name}</h3>
          {avatar.description && (
            <p className="text-muted-foreground text-sm line-clamp-2">{avatar.description}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              {avatar.gender}
            </span>
            {avatar.ageRange && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {avatar.ageRange}
              </span>
            )}
          </div>
        </article>
      );
    }

    if (category === 'voice-samples') {
      const voice = sample as VoiceSample;
      return (
        <article key={sample.id} className="feature-card hover-lift">
          <div className="relative aspect-video bg-secondary/10 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 mx-auto">
                <Volume2 className="h-8 w-8 text-white" />
              </div>
              <p className="text-emerald-700 font-semibold">Voice Sample</p>
            </div>
            {voice.audioUrl && (
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                  <Play className="h-6 w-6 text-emerald-700" />
                </div>
              </button>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{voice.name}</h3>
          {voice.description && (
            <p className="text-muted-foreground text-sm line-clamp-2">{voice.description}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
              {voice.language}
            </span>
            <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
              {voice.gender}
            </span>
          </div>
        </article>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <header className="text-center mb-16">
            <h2 className="text-3xl xs:text-4xl font-semibold text-foreground mb-4">{title}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="feature-card animate-pulse">
                <div className="aspect-video bg-slate-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-slate-200 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!samples || !Array.isArray(samples) || samples.length === 0) {
    return (
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <header className="text-center mb-16">
            <div className="feature-icon bg-blue-100 icon-gradient mx-auto mb-6">
              <Icon className="text-blue-600 h-8 w-8" />
            </div>
            <h2 className="text-3xl xs:text-4xl font-semibold text-foreground mb-4 text-shadow">
              <span className="gradient-text">{title}</span>
            </h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </header>
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">Coming soon! We're working on amazing samples to showcase.</p>
          </div>
        </div>
      </section>
    );
  }

  const currentSamples = getCurrentSamples();
  const totalSlides = Math.ceil(samples.length / 3);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <header className="text-center mb-16">
          <div className="feature-icon bg-primary/10 mx-auto mb-6">
            <Icon className="text-primary h-8 w-8" />
          </div>
          <h2 className="text-3xl xs:text-4xl font-semibold text-foreground mb-4">
            <span className="gradient-text">{title}</span>
          </h2>
          <p className="text-xl text-muted-foreground">{description}</p>
        </header>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentSamples.map(renderSample)}
          </div>
          
          {totalSlides > 1 && (
            <div className="flex justify-center items-center mt-8 gap-4">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {totalSlides}
              </span>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                disabled={currentIndex === totalSlides - 1}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}