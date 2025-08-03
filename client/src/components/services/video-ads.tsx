import { useQuery } from "@tanstack/react-query";
import { Play, Target, Zap, Sparkles } from "lucide-react";
import type { DemoVideo } from "@shared/schema";

export default function VideoAds() {
  // Fetch demo videos from API
  const { data: demoVideos = [] } = useQuery<DemoVideo[]>({
    queryKey: ['/api/samples/demo-videos'],
  });

  // Get the first demo video for preview
  const featuredVideo = demoVideos[0];

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
      title: "AI-Powered Creation",
      description: "Generate compelling video ads in minutes using advanced AI that understands your brand and audience."
    },
    {
      icon: Target,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      title: "Targeted Messaging",
      description: "Create personalized ad content that resonates with specific demographics and customer segments."
    },
    {
      icon: Zap,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
      title: "Rapid Production",
      description: "From concept to finished ad in under 10 minutes. Perfect for fast-paced marketing campaigns."
    },
    {
      icon: Sparkles,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      title: "Professional Quality",
      description: "Studio-quality output with professional editing, transitions, and effects automatically applied."
    }
  ];

  return (
    <section 
      id="video-ads" 
      className="section-padding bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50"
      aria-labelledby="video-ads-heading"
    >
      <div className="container-custom">
        <header className="text-center mb-16 xs:mb-20">
          <h2 
            id="video-ads-heading"
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 xs:mb-8 text-shadow"
          >
            <span className="gradient-text">AI Video Ads</span>
          </h2>
          <p className="text-xl xs:text-2xl lg:text-3xl text-slate-600 max-w-5xl mx-auto leading-relaxed px-2">
            Create high-converting video advertisements with AI-powered automation. From script to screen in minutes.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xs:gap-16 xl:gap-20 items-center">
          {/* Video Ad Preview */}
          <aside className="relative order-1 lg:order-1 hover-lift">
            <div className="service-preview from-blue-100 via-indigo-100 to-purple-100">
              <div className="glass-card p-6 xs:p-8 mb-6 xs:mb-8">
                <h4 className="font-bold text-slate-900 mb-4 xs:mb-6 text-lg xs:text-xl">AI Video Studio</h4>
{featuredVideo ? (
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl aspect-video relative overflow-hidden shadow-2xl">
                    {featuredVideo.thumbnailUrl ? (
                      <img 
                        src={featuredVideo.thumbnailUrl} 
                        alt={featuredVideo.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-20 h-20 xs:w-24 xs:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 mx-auto shadow-2xl floating-animation">
                          <Play className="h-10 w-10 xs:h-12 xs:w-12 text-white fill-current" />
                        </div>
                        <p className="text-sm xs:text-base opacity-90 font-semibold">{featuredVideo.title}</p>
                        {featuredVideo.description && (
                          <p className="text-xs opacity-70 mt-2 line-clamp-2 max-w-xs mx-auto">{featuredVideo.description}</p>
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
                ) : (
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl aspect-video relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-20 h-20 xs:w-24 xs:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 mx-auto shadow-2xl floating-animation">
                          <Play className="h-10 w-10 xs:h-12 xs:w-12 text-white fill-current" />
                        </div>
                        <p className="text-sm xs:text-base opacity-90 font-semibold">AI Video Preview</p>
                        <p className="text-xs opacity-70 mt-2">Upload videos in admin panel to showcase here</p>
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
              
              <div className="grid grid-cols-3 gap-3 xs:gap-4">
                <div className="glass-card p-3 xs:p-4 text-center hover-lift">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Duration</div>
                  <div className="text-sm xs:text-base font-bold text-blue-600">30-60s</div>
                </div>
                <div className="glass-card p-3 xs:p-4 text-center hover-lift">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Quality</div>
                  <div className="text-sm xs:text-base font-bold text-green-600">4K</div>
                </div>
                <div className="glass-card p-3 xs:p-4 text-center hover-lift">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Speed</div>
                  <div className="text-sm xs:text-base font-bold text-purple-600">10 min</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Features */}
          <div className="space-y-8 xs:space-y-10 order-2 lg:order-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article 
                  key={index}
                  className="feature-card hover-lift"
                >
                  <div className="flex items-start space-x-4 xs:space-x-6">
                    <div className={`feature-icon ${feature.bgColor} icon-gradient`}>
                      <Icon className={`${feature.iconColor} h-6 w-6 xs:h-7 xs:w-7`} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl xs:text-2xl font-bold text-slate-900 mb-3 text-shadow">{feature.title}</h3>
                      <p className="text-slate-600 text-base xs:text-lg leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="pt-6 xs:pt-8">
              <button 
                onClick={scrollToContact}
                className="btn-primary w-full xs:w-auto text-lg xs:text-xl px-10 py-5"
                data-testid="video-ads-cta"
                aria-label="Start creating AI video ads"
              >
                Create Video Ads
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}