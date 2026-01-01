import { useQuery } from "@tanstack/react-query";
import { Play, Target, Zap, Sparkles } from "lucide-react";
import { MediaPlayer } from "@/components/ui/media-player";
import type { DemoVideo } from "@shared/schema";

export default function VideoAds() {
  // Fetch demo videos from API
  const { data: demoVideos = [], isLoading, error } = useQuery<DemoVideo[]>({
    queryKey: ['/api/samples/demo-videos'],
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  // Get the first published demo video for preview, sorted by order index
  const publishedVideos = demoVideos
    .filter(video => video.isPublished)
    .sort((a, b) => a.orderIndex - b.orderIndex);
  const featuredVideo = publishedVideos[0];

  // Fallback Gumlet video URL if no videos from API
  const fallbackVideoUrl = "https://gumlet.tv/watch/694d0e18f1ad267a06552696";
  const videoUrl = featuredVideo?.videoUrl || fallbackVideoUrl;


  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Play,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      title: "Custom AI Video Production",
      description: "Bespoke video campaigns engineered for maximum engagement using our proprietary generative video models."
    },
    {
      icon: Target,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      title: "Precision Targeting",
      description: "Data-driven creative variations that dynamically adapt to your audience segments for higher ROAS."
    },
    {
      icon: Zap,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
      title: "Lightning Execution",
      description: "From storyboard to final render in 72 hours. Capture market trends while they are still trending."
    },
    {
      icon: Sparkles,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      title: "Cinematic Excellence",
      description: "4K resolution, professional color grading, and seamless transitions that rival traditional production houses."
    }
  ];

  return (
    <section
      id="video-ads"
      className="section-padding bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/50"
      aria-labelledby="video-ads-heading"
    >
      <div className="container-custom">
        <header className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2
            id="video-ads-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-4 sm:mb-6"
          >
            <span className="gradient-text">Cinematic AI Video Ads</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Stop the scroll with broadcast-quality video advertisements generated in minutes.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Video Ad Preview */}
          <aside className="order-1">
            <div className="service-preview from-blue-100 via-cyan-100 to-sky-100 bg-gradient-to-br">
              <div className="glass-card p-4 sm:p-6 mb-4 sm:mb-6">
                <h4 className="font-bold text-slate-900 mb-3 sm:mb-4 text-base sm:text-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">AI Video Studio</h4>

                {featuredVideo ? (
                  <MediaPlayer
                    src={featuredVideo.videoUrl}
                    poster={featuredVideo.thumbnailUrl || undefined}
                    title={featuredVideo.title}
                    gifLike={true}
                  />
                ) : (
                  <MediaPlayer
                    src={videoUrl}
                    title="AI Video Demo"
                    gifLike={false}
                  />
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="glass-card p-2 sm:p-3 text-center">
                  <div className="text-xs font-medium text-slate-600 mb-1">Duration</div>
                  <div className="text-sm font-bold text-blue-600">08-10s</div>
                </div>
                <div className="glass-card p-2 sm:p-3 text-center">
                  <div className="text-xs font-medium text-slate-600 mb-1">Quality</div>
                  <div className="text-sm font-bold text-green-600">4K</div>
                </div>
                <div className="glass-card p-2 sm:p-3 text-center">
                  <div className="text-xs font-medium text-slate-600 mb-1">Delivery</div>
                  <div className="text-sm font-bold text-cyan-600">72 Hours</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Features */}
          <div className="space-y-4 sm:space-y-6 order-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article key={index} className="feature-card">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`feature-icon ${feature.bgColor} icon-gradient flex-shrink-0`}>
                      <Icon className={`${feature.iconColor} h-5 w-5 sm:h-6 sm:w-6`} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="pt-4 sm:pt-6">
              <button
                onClick={scrollToContact}
                className="btn-primary w-full sm:w-auto"
                data-testid="video-ads-cta"
                aria-label="Start creating AI video ads"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}