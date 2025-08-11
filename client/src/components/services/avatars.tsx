import { useQuery } from "@tanstack/react-query";
import { User, Sparkles, Settings, Download } from "lucide-react";
import type { Avatar } from "@shared/schema";

export default function Avatars() {
  // Fetch avatars from API
  const { data: avatars = [], isLoading, error } = useQuery<Avatar[]>({
    queryKey: ['/api/samples/avatars'],
    refetchOnWindowFocus: true,
    staleTime: 0, // Always fetch fresh data
  });

  // Get the first published avatar for preview, sorted by order index
  const publishedAvatars = avatars
    .filter(avatar => avatar.isPublished)
    .sort((a, b) => a.orderIndex - b.orderIndex);
  const featuredAvatar = publishedAvatars[0];

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('Avatars Debug:', { 
      avatars: avatars.length, 
      publishedAvatars: publishedAvatars.length, 
      featuredAvatar: featuredAvatar?.name || 'none',
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
      icon: User,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      title: "Photorealistic Generation",
      description: "Create incredibly lifelike avatars with advanced AI that captures human expressions and characteristics."
    },
    {
      icon: Sparkles,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      title: "Custom Personalities",
      description: "Design unique character traits, emotions, and speaking styles that perfectly match your brand or vision."
    },
    {
      icon: Settings,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-100",
      title: "Advanced Customization",
      description: "Fine-tune every detail from facial features to clothing, ensuring your avatar meets exact specifications."
    },
    {
      icon: Download,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
      title: "Multiple Formats",
      description: "Export your avatars in various formats for use across different platforms and applications."
    }
  ];

  return (
    <section 
      id="avatars" 
      className="section-padding bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30"
      aria-labelledby="avatars-heading"
    >
      <div className="container-custom">
        <header className="text-center mb-16 sm:mb-20">
          <h2 
            id="avatars-heading"
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 text-shadow"
          >
            <span className="gradient-text">Realistic Avatars</span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-600 max-w-5xl mx-auto leading-relaxed">
            Create photorealistic digital humans with AI-powered avatar generation. Perfect for any virtual environment.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Features */}
          <div className="space-y-8 sm:space-y-10 order-2 lg:order-1">
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
                className="btn-secondary w-full xs:w-auto text-lg xs:text-xl px-10 py-5"
                data-testid="avatars-cta"
                aria-label="Start creating realistic avatars"
              >
                Create Avatars
              </button>
            </div>
          </div>

          {/* Avatar Preview */}
          <aside className="relative order-1 lg:order-2 hover-lift">
            <div className="service-preview from-purple-100 via-indigo-100 to-blue-100 bg-gradient-to-br shadow-2xl">
              <div className="glass-card p-6 xs:p-8 mb-6 xs:mb-8 border-2 border-white/20">
                <h4 className="font-bold text-slate-900 mb-4 xs:mb-6 text-lg xs:text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Avatar Studio</h4>

{featuredAvatar ? (
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl aspect-square relative overflow-hidden shadow-2xl mx-auto max-w-md">
                    {/* Embed YouTube video if available */}
                    {featuredAvatar.videoUrl && featuredAvatar.videoUrl.includes('youtu') ? (
                      <iframe
                        src={featuredAvatar.videoUrl
                          .replace('youtu.be/', 'youtube.com/embed/')
                          .replace('youtube.com/watch?v=', 'youtube.com/embed/')
                        }
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={featuredAvatar.name}
                      />
                    ) : featuredAvatar.videoUrl ? (
                      <video 
                        src={featuredAvatar.videoUrl} 
                        poster={featuredAvatar.thumbnailUrl || undefined}
                        className="w-full h-full object-cover rounded-xl"
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ 
                          objectPosition: 'center center',
                          aspectRatio: '1/1'
                        }}
                        onError={(e) => {
                          console.log('Avatar video failed to load:', featuredAvatar.videoUrl);
                        }}
                      />
                    ) : featuredAvatar.thumbnailUrl ? (
                      <img 
                        src={featuredAvatar.thumbnailUrl} 
                        alt={featuredAvatar.name}
                        className="w-full h-full object-cover rounded-xl"
                        style={{ 
                          objectPosition: 'center center',
                          aspectRatio: '1/1'
                        }}
                        onError={(e) => {
                          console.log('Avatar thumbnail failed to load:', featuredAvatar.thumbnailUrl);
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                    )}
                    
                    {/* Only show overlay if not a YouTube video */}
                    {!(featuredAvatar.videoUrl && featuredAvatar.videoUrl.includes('youtu')) && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Avatar Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-gradient-to-t from-black/80 to-transparent">
                          <h5 className="font-semibold text-lg leading-tight">{featuredAvatar.name}</h5>
                          {featuredAvatar.description && (
                            <p className="text-sm opacity-90 mt-1 line-clamp-2 leading-tight">{featuredAvatar.description}</p>
                          )}
                          {featuredAvatar.videoUrl && !featuredAvatar.videoUrl.includes('youtu') && (
                            <p className="text-xs opacity-75 mt-1">🎬 Video Demo</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl aspect-square relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                    
                    {/* Avatar Preview */}
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="w-32 h-32 xs:w-40 xs:h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl floating-animation">
                        <User className="h-16 w-16 xs:h-20 xs:w-20 text-white" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-center">
                        <p className="text-slate-600 text-sm">Upload avatars in admin panel to showcase here</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center floating-animation" style={{animationDelay: '1s'}}>
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center floating-animation" style={{animationDelay: '2s'}}>
                <Settings className="h-5 w-5 text-blue-600" />
              </div>
              
              <div className="grid grid-cols-3 gap-3 xs:gap-4">
                <div className="glass-card p-3 xs:p-4 text-center hover-lift">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Quality</div>
                  <div className="text-sm xs:text-base font-bold text-blue-600">8K</div>
                </div>
                <div className="glass-card p-3 xs:p-4 text-center hover-lift">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Expressions</div>
                  <div className="text-sm xs:text-base font-bold text-purple-600">50+</div>
                </div>
                <div className="glass-card p-3 xs:p-4 text-center hover-lift">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Styles</div>
                  <div className="text-sm xs:text-base font-bold text-emerald-600">∞</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}