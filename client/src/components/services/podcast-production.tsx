import { useQuery } from "@tanstack/react-query";
import { Mic, Headphones, Radio, Music } from "lucide-react";
import { MediaPlayer } from "@/components/ui/media-player";
import type { PodcastSample } from "@shared/schema";

export default function PodcastProduction() {
  const { data: podcasts = [], isLoading, error } = useQuery<PodcastSample[]>({
    queryKey: ['/api/samples/podcasts'],
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const publishedPodcasts = podcasts
    .filter(podcast => podcast.isPublished)
    .sort((a, b) => a.orderIndex - b.orderIndex);
  const featuredPodcast = publishedPodcasts[0];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Mic,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "Professional Audio Production",
      description: "Crystal-clear audio recording and production with industry-standard equipment and techniques."
    },
    {
      icon: Headphones,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      title: "Expert Audio Editing",
      description: "Precise editing to remove noise, enhance clarity, and create a polished listening experience."
    },
    {
      icon: Radio,
      iconColor: "text-accent",
      bgColor: "bg-accent/10",
      title: "Multi-Platform Distribution",
      description: "Optimized formats for all major podcast platforms including Spotify, Apple Podcasts, and more."
    },
    {
      icon: Music,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      title: "Custom Music & Sound Design",
      description: "Unique intros, outros, and sound effects tailored to your podcast's brand and style."
    }
  ];

  return (
    <section
      id="podcast"
      className="section-padding bg-gradient-to-br from-purple-50 to-indigo-50"
      aria-labelledby="podcast-heading"
    >
      <div className="container-custom">
        <header className="text-center mb-12 sm:mb-16">
          <h2
            id="podcast-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-4 sm:mb-6"
          >
            <span className="gradient-text">Podcast Production</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            From concept to publication, we handle every aspect of podcast production with professional-grade tools and expertise.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-16 items-center">
          <aside className="relative order-1 lg:order-2 w-full">
            <div className="bg-gradient-to-br from-purple-100 to-indigo-200 rounded-2xl p-3 xs:p-4 sm:p-6 md:p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-3 xs:p-4 sm:p-6 mb-3 xs:mb-4 sm:mb-6 shadow-lg">
                <h4 className="font-semibold text-slate-900 mb-2 xs:mb-3 sm:mb-4 text-base xs:text-lg sm:text-xl">AI Podcast Studio</h4>

                {featuredPodcast ? (
                  <div className="audio-container bg-gradient-to-br from-slate-800 to-slate-900 min-h-[200px] xs:min-h-[250px] sm:min-h-[300px] rounded-lg flex items-center justify-center p-4">
                    {featuredPodcast.audioUrl ? (
                      <div className="w-full">
                        <div className="text-center mb-4">
                          <h5 className="text-white font-semibold text-lg">{featuredPodcast.title}</h5>
                          {featuredPodcast.description && (
                            <p className="text-white/70 text-sm mt-2">{featuredPodcast.description}</p>
                          )}
                        </div>
                        <audio 
                          controls 
                          className="w-full"
                          src={featuredPodcast.audioUrl}
                        >
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                          <Mic className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-white/80 text-sm">{featuredPodcast.title}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg aspect-video relative overflow-hidden min-h-[200px] xs:min-h-[250px] sm:min-h-[300px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20"></div>
                    <div className="relative z-10 p-4 h-full flex flex-col items-center justify-center">
                      <div className="w-12 h-12 xs:w-16 xs:h-16 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                        <Mic className="h-6 w-6 xs:h-8 xs:w-8 text-white" />
                      </div>
                      <p className="text-xs text-white/80 text-center">Professional podcast samples will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4">
                <div className="bg-white rounded-lg p-2 xs:p-3 sm:p-4 shadow-md text-center">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Turnaround</div>
                  <div className="text-sm xs:text-base sm:text-lg font-bold text-purple-600">48 Hours</div>
                </div>
                <div className="bg-white rounded-lg p-2 xs:p-3 sm:p-4 shadow-md text-center">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Quality</div>
                  <div className="text-sm xs:text-base sm:text-lg font-bold text-green-600">Studio</div>
                </div>
                <div className="bg-white rounded-lg p-2 xs:p-3 sm:p-4 shadow-md text-center">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Episodes</div>
                  <div className="text-sm xs:text-base sm:text-lg font-bold text-blue-600">Any</div>
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-6 xs:space-y-8 order-2 lg:order-1">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article
                  key={index}
                  className="flex items-start space-x-3 xs:space-x-4 p-3 xs:p-4 rounded-xl hover:bg-white/50 transition-colors duration-200"
                >
                  <div className={`w-10 h-10 xs:w-12 xs:h-12 ${feature.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                    <Icon className={`${feature.iconColor} h-5 w-5 xs:h-6 xs:w-6`} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg xs:text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm xs:text-base leading-relaxed">{feature.description}</p>
                  </div>
                </article>
              );
            })}

            <div className="pt-4 xs:pt-6">
              <button
                onClick={scrollToContact}
                className="w-full xs:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 xs:px-8 py-3 xs:py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1 text-center"
                data-testid="podcast-cta"
                aria-label="Start podcast production"
              >
                Request Our Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
