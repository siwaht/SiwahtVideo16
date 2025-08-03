import { useQuery } from "@tanstack/react-query";
import { Scissors, Layers, Zap, Sparkles } from "lucide-react";
import type { EditedVideo } from "@shared/schema";

export default function VideoEditing() {
  // Fetch edited videos from API
  const { data: editedVideos = [] } = useQuery<EditedVideo[]>({
    queryKey: ['/api/samples/edited-videos'],
  });

  // Get the first edited video for preview
  const featuredEditedVideo = editedVideos[0];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Scissors,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "Intelligent Editing",
      description: "AI automatically cuts, trims, and arranges your footage for optimal flow and engagement."
    },
    {
      icon: Layers,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      title: "Advanced Effects",
      description: "Apply professional-grade transitions, filters, and effects with AI-powered precision."
    },
    {
      icon: Zap,
      iconColor: "text-accent",
      bgColor: "bg-accent/10",
      title: "Rapid Processing",
      description: "Process hours of footage in minutes with our high-performance AI editing pipeline."
    },
    {
      icon: Sparkles,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
      title: "Auto Enhancement",
      description: "AI automatically enhances color, audio, and lighting for professional-quality results."
    }
  ];

  return (
    <section 
      id="editing" 
      className="py-12 xs:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-100 to-orange-50"
      aria-labelledby="editing-heading"
    >
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
        <header className="text-center mb-12 xs:mb-16">
          <h2 
            id="editing-heading"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 xs:mb-6"
          >
            AI Video Editing
          </h2>
          <p className="text-lg xs:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-2">
            Transform raw footage into polished videos with AI-powered editing. Cut, enhance, and produce professional content automatically.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-12 xl:gap-16 items-center">
          {/* Video Editor Preview */}
          <aside className="relative order-1 lg:order-1">
            <div className="bg-gradient-to-br from-orange-100 to-red-200 rounded-2xl p-4 xs:p-6 md:p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-4 xs:p-6 mb-4 xs:mb-6 shadow-lg">
                <h4 className="font-semibold text-slate-900 mb-3 xs:mb-4 text-sm xs:text-base">AI Video Editor</h4>
{featuredEditedVideo ? (
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg aspect-video relative overflow-hidden">
                    {featuredEditedVideo.thumbnailUrl ? (
                      <img 
                        src={featuredEditedVideo.thumbnailUrl} 
                        alt={featuredEditedVideo.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                      {/* Video Info */}
                      <div className="text-white">
                        <h5 className="font-semibold text-sm">{featuredEditedVideo.title}</h5>
                        {featuredEditedVideo.clientName && (
                          <p className="text-xs opacity-80">Client: {featuredEditedVideo.clientName}</p>
                        )}
                      </div>
                      
                      {/* Preview Screen */}
                      <div className="bg-white/10 backdrop-blur-sm rounded p-2 text-center">
                        <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mx-auto mb-1">
                          <Scissors className="h-4 w-4 xs:h-5 xs:w-5 text-white" />
                        </div>
                        <p className="text-xs text-white/80">Professional Edit</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg aspect-video relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20"></div>
                    <div className="relative z-10 p-4 h-full flex flex-col">
                      {/* Timeline */}
                      <div className="flex-1 flex items-end mb-4">
                        <div className="w-full space-y-2">
                          <div className="flex space-x-1">
                            <div className="h-6 bg-blue-500 rounded-sm flex-1"></div>
                            <div className="h-6 bg-green-500 rounded-sm flex-1"></div>
                            <div className="h-6 bg-purple-500 rounded-sm flex-1"></div>
                          </div>
                          <div className="flex space-x-1">
                            <div className="h-4 bg-orange-400 rounded-sm w-2/3"></div>
                            <div className="h-4 bg-teal-400 rounded-sm flex-1"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Preview Screen */}
                      <div className="bg-white/10 rounded p-2 text-center">
                        <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mx-auto mb-1">
                          <Scissors className="h-4 w-4 xs:h-5 xs:w-5 text-white" />
                        </div>
                        <p className="text-xs text-white/80">Upload edited videos in admin panel to showcase here</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-2 xs:gap-3">
                <div className="bg-white rounded-lg p-2 xs:p-3 shadow-md text-center">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Speed</div>
                  <div className="text-sm xs:text-base font-bold text-orange-600">10x Faster</div>
                </div>
                <div className="bg-white rounded-lg p-2 xs:p-3 shadow-md text-center">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Quality</div>
                  <div className="text-sm xs:text-base font-bold text-green-600">4K HDR</div>
                </div>
                <div className="bg-white rounded-lg p-2 xs:p-3 shadow-md text-center">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Format</div>
                  <div className="text-sm xs:text-base font-bold text-blue-600">Any</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Features */}
          <div className="space-y-6 xs:space-y-8 order-2 lg:order-2">
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
                className="w-full xs:w-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 xs:px-8 py-3 xs:py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1 text-center"
                data-testid="editing-cta"
                aria-label="Start AI video editing"
              >
                Start Editing Videos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}