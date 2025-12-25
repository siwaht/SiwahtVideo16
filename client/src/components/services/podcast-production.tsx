import { useQuery } from "@tanstack/react-query";
import { MessageSquare, Globe, Heart, Clock, Sparkles, User } from "lucide-react";
import { MediaPlayer } from "@/components/ui/media-player";

interface InteractiveAvatar {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  category: string;
  duration?: string;
  hostName?: string;
  guestName?: string;
  isPublished: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export default function PodcastProduction() {
  const { data: avatarSamples, isLoading } = useQuery({
    queryKey: ["/api/samples/podcast-samples"],
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const featuredAvatar = avatarSamples && Array.isArray(avatarSamples) && avatarSamples.length > 0 
    ? avatarSamples[0] as InteractiveAvatar 
    : null;

  const features = [
    {
      icon: MessageSquare,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      title: "Real-Time Conversation",
      description: "Natural voice interaction with sub-second latency. Context-aware responses with memory retention across multi-turn dialogues."
    },
    {
      icon: Globe,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-100",
      title: "Multi-Language Intelligence",
      description: "Speak in 100+ languages with native accents. Automatic language detection and seamless switching mid-conversation."
    },
    {
      icon: Heart,
      iconColor: "text-rose-600",
      bgColor: "bg-rose-100",
      title: "Emotion Recognition",
      description: "Adapts tone and demeanor based on user sentiment. Micro-expressions automatically match conversation mood and context."
    },
    {
      icon: Clock,
      iconColor: "text-violet-600",
      bgColor: "bg-violet-100",
      title: "24/7 Availability",
      description: "Never sleeps, always professional. Consistent brand voice across all interactions with unlimited scalability."
    }
  ];

  const useCases = [
    "Customer Support",
    "Sales Assistance", 
    "Training & Onboarding",
    "Virtual Reception",
    "Healthcare Guidance",
    "Educational Tutoring"
  ];


  return (
    <section
      id="interactive-avatars"
      className="py-12 xs:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20"
      aria-labelledby="interactive-avatars-heading"
    >
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
        <header className="text-center mb-12 xs:mb-16">
          <h2
            id="interactive-avatars-heading"
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 xs:mb-8 text-shadow"
          >
            <span className="gradient-text">Interactive AI Avatars</span>
          </h2>
          <p className="text-xl xs:text-2xl lg:text-3xl text-slate-600 max-w-5xl mx-auto leading-relaxed px-2 font-light">
            Conversational digital humans that engage in real-time. Natural voice interaction with context-aware intelligence and adaptive personalities.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-12 xl:gap-16 items-start">
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

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 xs:p-6 border border-slate-200/50">
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-sm xs:text-base">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Perfect For
              </h4>
              <div className="flex flex-wrap gap-2">
                {useCases.map((useCase, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-slate-700 rounded-full text-xs xs:text-sm font-medium border border-blue-100"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 xs:pt-6">
              <button
                onClick={scrollToContact}
                className="w-full xs:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 xs:px-8 py-3 xs:py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 text-center"
                data-testid="interactive-avatars-cta"
                aria-label="Get interactive AI avatar"
              >
                Deploy Your AI Avatar
              </button>
            </div>
          </div>


          <aside className="relative order-1 lg:order-2">
            <div className="bg-gradient-to-br from-blue-100/80 to-cyan-100/80 rounded-2xl p-4 xs:p-6 md:p-8 shadow-2xl backdrop-blur-sm">
              <h4 className="font-semibold text-slate-900 mb-4 xs:mb-6 text-sm xs:text-base flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Interactive Demo
              </h4>

              {isLoading ? (
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                </div>
              ) : featuredAvatar && featuredAvatar.audioUrl ? (
                <MediaPlayer
                  src={featuredAvatar.audioUrl}
                  title={featuredAvatar.title}
                  type="video"
                  gifLike={true}
                  className="rounded-xl overflow-hidden"
                />
              ) : (
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4 mx-auto shadow-2xl">
                        <User className="h-10 w-10 text-white" />
                      </div>
                      <p className="text-sm opacity-90 font-semibold">Interactive Avatar Demo</p>
                      <p className="text-xs opacity-70 mt-2">Demo video will appear here</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 xs:gap-3 mt-4 xs:mt-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 xs:p-3 text-center">
                  <div className="text-xs font-medium text-slate-600 mb-1">Response</div>
                  <div className="text-sm xs:text-base font-bold text-blue-600">&lt;500ms</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 xs:p-3 text-center">
                  <div className="text-xs font-medium text-slate-600 mb-1">Languages</div>
                  <div className="text-sm xs:text-base font-bold text-emerald-600">100+</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 xs:p-3 text-center">
                  <div className="text-xs font-medium text-slate-600 mb-1">Uptime</div>
                  <div className="text-sm xs:text-base font-bold text-violet-600">99.9%</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
