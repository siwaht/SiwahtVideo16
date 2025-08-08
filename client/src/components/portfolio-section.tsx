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
        <article key={sample.id} className="group relative">
          <div className="feature-card hover-lift h-full flex flex-col">
            <div className="relative aspect-video bg-gradient-to-br from-slate-100 via-white to-slate-200 rounded-2xl overflow-hidden mb-5 shadow-md group-hover:shadow-xl transition-all duration-500">
              {video.thumbnailUrl ? (
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <button className="absolute inset-0 flex items-center justify-center group/play opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover/play:bg-white/30 group-hover/play:scale-110 transition-all duration-300 shadow-2xl border border-white/30">
                  <Play className="h-10 w-10 text-white fill-white/20" />
                </div>
              </button>
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">{video.title}</h3>
              {video.description && (
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{video.description}</p>
              )}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{video.category}</span>
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </article>
      );
    }

    if (category === 'avatars') {
      const avatar = sample as Avatar;
      return (
        <article key={sample.id} className="group relative">
          <div className="feature-card hover-lift h-full flex flex-col">
            <div className="relative aspect-square bg-gradient-to-br from-slate-100 via-white to-slate-200 rounded-2xl overflow-hidden mb-5 shadow-md group-hover:shadow-xl transition-all duration-500">
              {avatar.thumbnailUrl ? (
                <img 
                  src={avatar.thumbnailUrl} 
                  alt={avatar.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <User className="h-10 w-10 text-white" />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2 leading-tight">{avatar.name}</h3>
              {avatar.description && (
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{avatar.description}</p>
              )}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200/50 hover:bg-gradient-to-r hover:from-purple-200 hover:to-pink-200 transition-all duration-300">
                  {avatar.gender}
                </span>
                {avatar.ageRange && (
                  <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200/50 hover:bg-gradient-to-r hover:from-blue-200 hover:to-indigo-200 transition-all duration-300">
                    {avatar.ageRange}
                  </span>
                )}
              </div>
            </div>
          </div>
        </article>
      );
    }

    if (category === 'voice-samples') {
      const voice = sample as VoiceSample;
      return (
        <article key={sample.id} className="group relative">
          <div className="feature-card hover-lift h-full flex flex-col">
            <div className="relative aspect-video bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 rounded-2xl overflow-hidden mb-5 flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-500">
              <div className="text-center relative z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                  <Volume2 className="h-9 w-9 text-white" />
                </div>
                <p className="text-emerald-700 font-semibold text-sm">Voice Sample</p>
                <div className="flex items-center justify-center mt-3 space-x-1">
                  <div className="w-1 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-6 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-3 bg-emerald-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1 h-5 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  <div className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
              {voice.audioUrl && (
                <button className="absolute inset-0 flex items-center justify-center group/play opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover/play:bg-white/30 group-hover/play:scale-110 transition-all duration-300 shadow-2xl border border-white/30">
                    <Play className="h-8 w-8 text-emerald-700 fill-emerald-700/20" />
                  </div>
                </button>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2 leading-tight">{voice.name}</h3>
              {voice.description && (
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{voice.description}</p>
              )}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200/50 hover:bg-gradient-to-r hover:from-emerald-200 hover:to-teal-200 transition-all duration-300">
                  {voice.language}
                </span>
                <span className="px-3 py-1.5 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 text-xs font-medium rounded-full border border-teal-200/50 hover:bg-gradient-to-r hover:from-teal-200 hover:to-cyan-200 transition-all duration-300">
                  {voice.gender}
                </span>
              </div>
            </div>
          </div>
        </article>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30">
        <div className="container-custom">
          <header className="text-center mb-16">
            <h2 className="text-3xl xs:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
            <p className="text-xl text-slate-600">{description}</p>
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
      <section className="section-padding bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30">
        <div className="container-custom">
          <header className="text-center mb-16">
            <div className="feature-icon bg-blue-100 icon-gradient mx-auto mb-6">
              <Icon className="text-blue-600 h-8 w-8" />
            </div>
            <h2 className="text-3xl xs:text-4xl font-bold text-slate-900 mb-4 text-shadow">
              <span className="gradient-text">{title}</span>
            </h2>
            <p className="text-xl text-slate-600">{description}</p>
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
    <section className="section-padding bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30">
      <div className="container-custom">
        <header className="text-center mb-16">
          <div className="feature-icon bg-blue-100 icon-gradient mx-auto mb-6">
            <Icon className="text-blue-600 h-8 w-8" />
          </div>
          <h2 className="text-3xl xs:text-4xl font-bold text-slate-900 mb-4 text-shadow">
            <span className="gradient-text">{title}</span>
          </h2>
          <p className="text-xl text-slate-600">{description}</p>
        </header>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {currentSamples.map(renderSample)}
          </div>
          
          {totalSlides > 1 && (
            <div className="flex justify-center items-center mt-12 gap-6">
              <button 
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 border border-slate-200/50"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-5 w-5 text-slate-700" />
              </button>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-600">
                  {currentIndex + 1} of {totalSlides}
                </span>
                <div className="flex gap-1.5">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-blue-500 w-6' 
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button 
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 border border-slate-200/50"
                disabled={currentIndex === totalSlides - 1}
              >
                <ChevronRight className="h-5 w-5 text-slate-700" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}