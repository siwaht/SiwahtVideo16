import { Headphones, Volume2, Mic2, Radio } from "lucide-react";

export default function PodcastProduction() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Mic2,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "AI Host Generation",
      description: "Create engaging AI podcast hosts with unique personalities and natural conversation flow."
    },
    {
      icon: Volume2,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      title: "Audio Enhancement",
      description: "Automatically remove background noise, balance levels, and optimize audio quality."
    },
    {
      icon: Headphones,
      iconColor: "text-accent",
      bgColor: "bg-accent/10",
      title: "Content Optimization",
      description: "AI analyzes and optimizes content structure for maximum listener engagement and retention."
    },
    {
      icon: Radio,
      iconColor: "text-pink-600",
      bgColor: "bg-pink-100",
      title: "Multi-Format Export",
      description: "Export in all podcast formats with automatic metadata, show notes, and transcript generation."
    }
  ];

  const podcastTypes = [
    "Interview", "Educational", "News", "Storytelling", "Comedy", "Business"
  ];

  return (
    <section 
      id="podcast" 
      className="py-12 xs:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white to-pink-50 relative overflow-hidden"
      aria-labelledby="podcast-heading"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-2xl" />
    
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8 relative z-10">
        <header className="text-center mb-12 xs:mb-16">
          <h2 
            id="podcast-heading"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 xs:mb-6"
          >
            AI Podcast Production
          </h2>
          <p className="text-lg xs:text-xl lg:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed px-2 font-light">
            Create professional podcasts with AI hosts, automated editing, and intelligent content optimization. From concept to publishing.
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
                className="w-full xs:w-auto bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-6 xs:px-8 py-3 xs:py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:-translate-y-1 text-center"
                data-testid="podcast-cta"
                aria-label="Start podcast production"
              >
                Start Your Podcast
              </button>
            </div>
          </div>

          {/* Podcast Studio Preview */}
          <aside className="relative order-1 lg:order-2">
            <div className="bg-gradient-to-br from-pink-100 to-rose-200 rounded-2xl p-4 xs:p-6 md:p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-4 xs:p-6 mb-4 xs:mb-6 shadow-lg">
                <h4 className="font-semibold text-slate-900 mb-3 xs:mb-4 text-sm xs:text-base">Podcast Studio</h4>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 xs:p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 xs:w-20 xs:h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center shadow-lg">
                      <Radio className="h-8 w-8 xs:h-10 xs:w-10 text-white" />
                    </div>
                  </div>
                  
                  {/* Audio Waveform Visualization */}
                  <div className="mb-4">
                    <div className="flex items-end justify-center space-x-1 h-12">
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-pink-400 rounded-sm w-1 animate-pulse" 
                          style={{
                            height: `${Math.random() * 80 + 20}%`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center text-white">
                    <p className="text-xs xs:text-sm opacity-90 mb-2">Recording:</p>
                    <p className="text-sm xs:text-base font-medium">"Welcome to AI Insights..."</p>
                    <div className="flex items-center justify-center mt-3 space-x-4">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs opacity-80">LIVE</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 xs:p-4 shadow-md">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-2">Podcast Formats</div>
                  <div className="flex flex-wrap gap-1 xs:gap-2">
                    {podcastTypes.slice(0, 4).map((type, index) => (
                      <span key={index} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
                        {type}
                      </span>
                    ))}
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">+2 more</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3 shadow-md text-center">
                    <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Duration</div>
                    <div className="text-sm xs:text-base font-bold text-pink-600">Any Length</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-md text-center">
                    <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Quality</div>
                    <div className="text-sm xs:text-base font-bold text-rose-600">Studio</div>
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