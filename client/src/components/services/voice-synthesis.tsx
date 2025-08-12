import { useQuery } from "@tanstack/react-query";
import { Volume2, Globe, Mic, Users } from "lucide-react";

import type { VoiceSample } from "@shared/schema";

export default function VoiceSynthesis() {
  // Fetch voice samples from API
  const { data: voiceSamples = [], isLoading, error } = useQuery<VoiceSample[]>({
    queryKey: ['/api/samples/voice-samples'],
    refetchOnWindowFocus: true,
    staleTime: 0, // Always fetch fresh data
  });

  // Get published voice samples sorted by order index
  const publishedVoices = voiceSamples
    .filter(voice => voice.isPublished)
    .sort((a, b) => a.orderIndex - b.orderIndex);
  const featuredVoice = publishedVoices[0];

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('Voice Synthesis Debug:', { 
      voiceSamples: voiceSamples.length, 
      publishedVoices: publishedVoices.length, 
      featuredVoice: featuredVoice?.name || 'none',
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
      icon: Volume2,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      title: "Natural Voice Quality",
      description: "We create incredibly realistic voice ads that sound completely natural using advanced AI voice synthesis technology."
    },
    {
      icon: Globe,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      title: "Multilingual Capabilities",
      description: "Our team produces voice ads in multiple languages with authentic pronunciation and cultural nuances for global reach."
    },
    {
      icon: Mic,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      title: "Custom Voice Branding",
      description: "We develop unique voice personas that align with your brand identity and resonate with your target audience."
    },
    {
      icon: Users,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
      title: "Diverse Voice Options",
      description: "Choose from a wide range of voice styles, ages, and accents to match your specific audience demographics perfectly."
    }
  ];

  return (
    <section id="voice-synthesis" className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-white via-green-50/30 to-white">
      <div className="container-custom">
        <header className="text-center mb-16 lg:mb-20 xl:mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 text-shadow">
            <span className="gradient-text">Your Brand's Voice, Understood Everywhere</span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-600 max-w-5xl mx-auto leading-relaxed">
            Professional multilingual voice ad creation that speaks your customer's language. Our AI-powered voice synthesis delivers authentic, compelling audio content.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Voice Preview */}
          <aside className="relative order-1 lg:order-2 hover-lift">
            <div className="service-preview from-green-100 via-emerald-100 to-teal-100 bg-gradient-to-br shadow-2xl">
              <div className="glass-card p-6 sm:p-8 mb-6 sm:mb-8 border-2 border-white/20">
                <h4 className="font-bold text-slate-900 mb-4 sm:mb-6 text-lg sm:text-xl bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Multilingual Voice Ads</h4>

                {/* Voice Ad Samples */}
                <div className="space-y-4">
                  {/* English Voice Ad */}
                  <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-slate-800">English Voice Ad</h5>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">EN</span>
                    </div>
                    <audio 
                      controls 
                      className="w-full h-10"
                      preload="metadata"
                    >
                      <source src="/audio/dub-original-english.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <p className="text-sm text-slate-600 mt-2">Professional English voice-over with American accent</p>
                  </div>

                  {/* Chinese Voice Ad */}
                  <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-slate-800">中文配音广告</h5>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">中文</span>
                    </div>
                    <audio 
                      controls 
                      className="w-full h-10"
                      preload="metadata"
                    >
                      <source src="/audio/dub-original-chinese.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <p className="text-sm text-slate-600 mt-2">地道的中文配音，适合中国市场推广</p>
                  </div>

                  {/* Arabic Voice Ad */}
                  <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-slate-800">إعلان صوتي باللغة العربية</h5>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">عربي</span>
                    </div>
                    <audio 
                      controls 
                      className="w-full h-10"
                      preload="metadata"
                    >
                      <source src="/audio/dub-arabic.aac" type="audio/aac" />
                      <source src="/audio/dub-arabic.aac" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <p className="text-sm text-slate-600 mt-2">صوت احترافي باللغة العربية للأسواق الناطقة بالعربية</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={scrollToContact}
                  className="w-full btn-primary py-3 px-6 text-lg font-semibold hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                >
                  Order Voice Services
                </button>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                    <div className="text-xl font-bold text-green-600">50+</div>
                    <div className="text-xs text-slate-600">Languages</div>
                  </div>
                  <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                    <div className="text-xl font-bold text-teal-600">24h</div>
                    <div className="text-xs text-slate-600">Delivery</div>
                  </div>
                  <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                    <div className="text-xl font-bold text-emerald-600">AI+</div>
                    <div className="text-xs text-slate-600">Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

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
                Get Voice Quote
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}