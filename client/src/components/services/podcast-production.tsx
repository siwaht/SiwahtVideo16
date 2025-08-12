import { useQuery } from "@tanstack/react-query";
import { Headphones, Mic, Users, Zap } from "lucide-react";

import type { PodcastSample } from "@shared/schema";

export default function PodcastProduction() {
  // Fetch podcast samples from API
  const { data: podcastSamples = [], isLoading, error } = useQuery<PodcastSample[]>({
    queryKey: ['/api/samples/podcast-samples'],
    refetchOnWindowFocus: true,
    staleTime: 0, // Always fetch fresh data
  });

  // Get published podcast samples sorted by order index
  const publishedPodcasts = podcastSamples
    .filter(podcast => podcast.isPublished)
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('Podcast Production Debug:', { 
      podcastSamples: podcastSamples.length, 
      publishedPodcasts: publishedPodcasts.length, 
      isLoading,
      error 
    });
  }

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Headphones,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-100",
      title: "Professional Audio Production",
      description: "Our team produces high-quality podcast content with professional editing, mixing, and mastering services."
    },
    {
      icon: Mic,
      iconColor: "text-pink-600",
      bgColor: "bg-pink-100",
      title: "AI-Enhanced Recording",
      description: "We use advanced AI tools to optimize audio quality, reduce background noise, and enhance voice clarity."
    },
    {
      icon: Users,
      iconColor: "text-cyan-600",
      bgColor: "bg-cyan-100",
      title: "Multi-Host Support",
      description: "We handle complex multi-speaker recordings with seamless editing and balanced audio mixing."
    },
    {
      icon: Zap,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
      title: "Rapid Turnaround",
      description: "From raw recording to polished podcast episode, we deliver professional results quickly and efficiently."
    }
  ];

  return (
    <section id="podcast-production" className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-slate-50 via-indigo-50/30 to-slate-50">
      <div className="container-custom">
        <header className="text-center mb-16 lg:mb-20 xl:mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 text-shadow">
            <span className="gradient-text">Podcast Production</span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-600 max-w-5xl mx-auto leading-relaxed">
            Professional podcast production services powered by AI. We transform your ideas into engaging audio content that captivates listeners.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Features */}
          <main className="order-2 lg:order-1">
            <div className="space-y-8 lg:space-y-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4 lg:gap-6 hover-lift">
                    <div className={`flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className={`w-7 h-7 lg:w-8 lg:h-8 ${feature.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2 lg:mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed lg:text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 lg:mt-12">
              <button 
                onClick={scrollToContact}
                className="btn-secondary px-8 py-3 text-lg font-semibold hover:shadow-xl transition-all duration-300"
              >
                Start Your Podcast
              </button>
            </div>
          </main>

          {/* Podcast Preview */}
          <aside className="relative order-1 lg:order-2 hover-lift">
            <div className="service-preview from-indigo-100 via-purple-100 to-pink-100 bg-gradient-to-br shadow-2xl">
              <div className="glass-card p-6 sm:p-8 mb-6 sm:mb-8 border-2 border-white/20">
                <h4 className="font-bold text-slate-900 mb-4 sm:mb-6 text-lg sm:text-xl bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">Featured Episodes</h4>

                {/* Podcast Episodes */}
                <div className="space-y-4">
                  {publishedPodcasts.map((podcast, index) => (
                    <div key={podcast.id} className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h5 className="font-semibold text-slate-800 mb-1">{podcast.title}</h5>
                          <p className="text-sm text-slate-600 line-clamp-2">{podcast.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">{podcast.category}</span>
                            <span className="text-xs text-slate-500">{podcast.duration}</span>
                          </div>
                        </div>
                      </div>
                      <audio 
                        controls 
                        className="w-full h-10"
                        preload="metadata"
                      >
                        <source src={podcast.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ))}

                  {/* Loading state */}
                  {isLoading && (
                    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                      <div className="animate-pulse">
                        <div className="h-4 bg-slate-200 rounded mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-3/4 mb-2"></div>
                        <div className="h-10 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  )}

                  {/* No episodes state */}
                  {!isLoading && publishedPodcasts.length === 0 && (
                    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-white/30 text-center">
                      <Headphones className="w-12 h-12 mx-auto mb-3 text-indigo-400" />
                      <h5 className="font-semibold text-slate-800 mb-2">New Episodes Coming Soon</h5>
                      <p className="text-sm text-slate-600">Professional podcast episodes will be featured here</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={scrollToContact}
                  className="w-full btn-primary py-3 px-6 text-lg font-semibold hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700"
                >
                  Produce My Podcast
                </button>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                    <div className="text-xl font-bold text-indigo-600">Studio</div>
                    <div className="text-xs text-slate-600">Quality</div>
                  </div>
                  <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                    <div className="text-xl font-bold text-pink-600">5D</div>
                    <div className="text-xs text-slate-600">Delivery</div>
                  </div>
                  <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                    <div className="text-xl font-bold text-cyan-600">AI</div>
                    <div className="text-xs text-slate-600">Enhanced</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}