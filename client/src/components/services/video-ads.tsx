import { useQuery } from "@tanstack/react-query";
import { Play, Target, Zap, Sparkles } from "lucide-react";
import { EnhancedVideoPlayer } from "@/components/ui/enhanced-video-player";
import { useMediaData } from "@/hooks/useMediaData";
import { processVideoUrl, getPlatformName } from "@/lib/videoUtils";
import type { DemoVideo } from "@shared/schema";

export default function VideoAds() {
  // Fetch demo videos from API
  const { data: demoVideos = [], isLoading, error } = useQuery<DemoVideo[]>({
    queryKey: ['/api/samples/demo-videos'],
    refetchOnWindowFocus: true,
    staleTime: 0, // Always fetch fresh data
  });

  // Get media data for enhanced video serving
  const { hasVideo, availableVideos } = useMediaData();

  // Get the first published demo video for preview, sorted by order index
  const publishedVideos = demoVideos
    .filter(video => video.isPublished)
    .sort((a, b) => a.orderIndex - b.orderIndex);
  const featuredVideo = publishedVideos[0];

  // Process video URL for embedding
  const processedVideo = featuredVideo?.videoUrl ? processVideoUrl(featuredVideo.videoUrl) : null;

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('Video Ads Debug:', { 
      demoVideos: demoVideos.length, 
      publishedVideos: publishedVideos.length, 
      featuredVideo: featuredVideo?.title || 'none',
      featuredVideoUrl: featuredVideo?.videoUrl || 'none',
      isHostedVideo: featuredVideo?.isHostedVideo || false,
      thumbnailUrl: featuredVideo?.thumbnailUrl || 'none',
      isLoading,
      error,
      processedVideo: processedVideo ? {
        platform: processedVideo.platform,
        canEmbed: processedVideo.canEmbed,
        embedUrl: processedVideo.embedUrl
      } : null
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
      icon: Play,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      title: "Custom AI Video Production",
      description: "Our team creates compelling video ads tailored to your brand using advanced AI and creative expertise."
    },
    {
      icon: Target,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      title: "Targeted Messaging",
      description: "We craft personalized ad content that resonates with your specific demographics and customer segments."
    },
    {
      icon: Zap,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
      title: "Fast Turnaround",
      description: "From concept to finished ad delivered quickly. Perfect for fast-paced marketing campaigns and tight deadlines."
    },
    {
      icon: Sparkles,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      title: "Multi-Format Support",
      description: "We deliver video ads optimized for every platform - social media, web, television, and mobile applications."
    }
  ];

  return (
    <section id="video-ads" className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="container-custom">
        <header className="text-center mb-16 lg:mb-20 xl:mb-24">
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 text-shadow"
          >
            <span className="gradient-text">AI Video Ads</span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-600 max-w-5xl mx-auto leading-relaxed">
            Professional AI video advertisement services that convert. Our expert team transforms your vision into compelling video content.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Video Ad Preview */}
          <aside className="relative order-1 lg:order-1 hover-lift">
            <div className="service-preview from-blue-100 via-indigo-100 to-purple-100 bg-gradient-to-br shadow-2xl">
              <div className="glass-card p-6 sm:p-8 mb-6 sm:mb-8 border-2 border-white/20">
                <h4 className="font-bold text-slate-900 mb-4 sm:mb-6 text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Video Studio</h4>

                {featuredVideo ? (
                  <div className="relative">
                    {processedVideo && processedVideo.canEmbed ? (
                      <div className="video-container bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl">
                        {processedVideo.platform === 'direct' ? (
                          // Direct video file (mp4, webm, etc.)
                          <div className="video-player-wrapper">
                            <EnhancedVideoPlayer
                              filename="ikea-demo-new.mp4"
                              title={featuredVideo.title}
                              autoPlay={true}
                              muted={true}
                              loop={true}
                              className="w-full h-full rounded-xl"
                              fallbackUrl={processedVideo.embedUrl}
                            />
                          </div>
                        ) : (
                          // Embedded video (YouTube, Vimeo, Google Drive)
                          <>
                            <iframe
                              src={processedVideo.embedUrl}
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={featuredVideo.title}
                              data-testid={`${processedVideo.platform}-iframe`}
                            />
                            <div className="absolute top-2 right-2 z-10">
                              <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {getPlatformName(processedVideo.platform)}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      // Preview mode for videos without URLs or external videos
                      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl aspect-video relative overflow-hidden shadow-2xl">
                        {featuredVideo.thumbnailUrl ? (
                          <img 
                            src={featuredVideo.thumbnailUrl} 
                            alt={featuredVideo.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="relative z-10 h-full flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 mx-auto shadow-2xl floating-animation">
                              <Play className="h-10 w-10 sm:h-12 sm:w-12 text-white fill-current" />
                            </div>
                            <p className="text-sm sm:text-base opacity-90 font-semibold">{featuredVideo.title}</p>
                            {featuredVideo.description && (
                              <p className="text-xs opacity-70 mt-2 line-clamp-2 max-w-xs mx-auto">{featuredVideo.description}</p>
                            )}
                            <div className="text-xs opacity-60 mt-1">Category: {featuredVideo.category}</div>
                            {processedVideo && !processedVideo.canEmbed && (
                              <div className="text-xs opacity-80 mt-2 text-yellow-300">
                                Unsupported video platform: {getPlatformName(processedVideo.platform)}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Video Timeline */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full h-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-full w-1/3 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Loading or no video state
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl aspect-video relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 mx-auto shadow-2xl floating-animation">
                          <Play className="h-10 w-10 sm:h-12 sm:w-12 text-white fill-current" />
                        </div>
                        <p className="text-sm sm:text-base opacity-90 font-semibold">
                          {isLoading ? 'Loading videos...' : 'Professional Video Ads Coming Soon'}
                        </p>
                        <p className="text-xs opacity-70 mt-2 line-clamp-2 max-w-xs mx-auto">AI-powered video creation</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <button 
                  onClick={scrollToContact}
                  className="w-full btn-primary py-3 px-6 text-lg font-semibold hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Get Video Quote
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">48h</div>
                    <div className="text-xs text-slate-600">Delivery</div>
                  </div>
                  <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">HD+</div>
                    <div className="text-xs text-slate-600">Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Features */}
          <main className="order-2 lg:order-2">
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
                Start Your Project
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}