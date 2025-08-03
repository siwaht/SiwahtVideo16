import { Mic, Globe, Headphones, Volume2 } from "lucide-react";

export default function VoiceSynthesis() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Volume2,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "Natural Speech",
      description: "Generate human-like speech with natural intonation, pacing, and emotional expression."
    },
    {
      icon: Globe,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      title: "Multi-Language Support",
      description: "Support for 40+ languages and dialects with native accent and pronunciation."
    },
    {
      icon: Mic,
      iconColor: "text-accent",
      bgColor: "bg-accent/10",
      title: "Voice Cloning",
      description: "Clone any voice with just a few minutes of audio samples for personalized content."
    },
    {
      icon: Headphones,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-100",
      title: "Studio Quality",
      description: "Professional-grade audio output ready for podcasts, videos, and commercial use."
    }
  ];

  const languages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", "Japanese", "Korean", "Chinese"
  ];

  return (
    <section 
      id="voice" 
      className="py-12 xs:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white to-emerald-50 relative overflow-hidden"
      aria-labelledby="voice-heading"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-2xl" />
    
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8 relative z-10">
        <header className="text-center mb-12 xs:mb-16">
          <h2 
            id="voice-heading"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 xs:mb-6"
          >
            AI Voice Synthesis
          </h2>
          <p className="text-lg xs:text-xl lg:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed px-2 font-light">
            Transform text into natural-sounding speech in any voice, language, or style. Perfect for audiobooks, podcasts, and multimedia content.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-12 xl:gap-16 items-center">
          {/* Features */}
          <div className="space-y-6 xs:space-y-8 order-2 lg:order-1">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article 
                  key={index}
                  className="luxury-card p-6 xs:p-8 group hover:scale-105 transition-all duration-300"
                >
                  <div className={`w-12 h-12 xs:w-16 xs:h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`${feature.iconColor} h-6 w-6 xs:h-8 xs:w-8`} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg xs:text-xl mb-3">{feature.title}</h3>
                    <p className="text-slate-600 text-base xs:text-lg leading-relaxed">{feature.description}</p>
                  </div>
                </article>
              );
            })}

            <div className="pt-4 xs:pt-6">
              <button 
                onClick={scrollToContact}
                className="w-full xs:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 xs:px-8 py-3 xs:py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1 text-center"
                data-testid="voice-cta"
                aria-label="Start creating AI voices"
              >
                Generate Voice Content
              </button>
            </div>
          </div>

          {/* Voice Studio Preview */}
          <aside className="relative order-1 lg:order-2">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-200 rounded-2xl p-4 xs:p-6 md:p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-4 xs:p-6 mb-4 xs:mb-6 shadow-lg">
                <h4 className="font-semibold text-slate-900 mb-3 xs:mb-4 text-sm xs:text-base">Voice Synthesis Studio</h4>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 xs:p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 xs:w-20 xs:h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg">
                      <Mic className="h-8 w-8 xs:h-10 xs:w-10 text-white" />
                    </div>
                  </div>
                  <div className="text-center text-white">
                    <p className="text-xs xs:text-sm opacity-90 mb-2">Text Input:</p>
                    <p className="text-sm xs:text-base italic mb-4">"Welcome to SiwahtAI..."</p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-1 h-4 bg-emerald-400 rounded animate-pulse"></div>
                      <div className="w-1 h-6 bg-emerald-400 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1 h-8 bg-emerald-400 rounded animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      <div className="w-1 h-6 bg-emerald-400 rounded animate-pulse" style={{animationDelay: '0.6s'}}></div>
                      <div className="w-1 h-4 bg-emerald-400 rounded animate-pulse" style={{animationDelay: '0.8s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 xs:p-4 shadow-md">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-2">Supported Languages</div>
                  <div className="flex flex-wrap gap-1 xs:gap-2">
                    {languages.slice(0, 6).map((lang, index) => (
                      <span key={index} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                        {lang}
                      </span>
                    ))}
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">+35 more</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3 shadow-md text-center">
                    <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Quality</div>
                    <div className="text-sm xs:text-base font-bold text-emerald-600">Studio</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-md text-center">
                    <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Speed</div>
                    <div className="text-sm xs:text-base font-bold text-teal-600">Real-time</div>
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