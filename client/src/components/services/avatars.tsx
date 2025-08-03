import { User, Zap, Settings, Sparkles } from "lucide-react";

export default function Avatars() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: User,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "Realistic Appearances",
      description: "Create lifelike digital personas with natural expressions and movements that captivate your audience."
    },
    {
      icon: Zap,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      title: "Quick Generation",
      description: "Generate high-quality avatars in minutes, not hours. Perfect for rapid content creation needs."
    },
    {
      icon: Settings,
      iconColor: "text-accent",
      bgColor: "bg-accent/10",
      title: "Full Customization",
      description: "Customize appearance, personality, voice, and behaviors to match your brand perfectly."
    },
    {
      icon: Sparkles,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      title: "AI-Powered Animation",
      description: "Advanced AI ensures natural lip-sync, gestures, and emotional expressions for authentic interactions."
    }
  ];

  return (
    <section 
      id="avatars" 
      className="py-12 xs:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
      aria-labelledby="avatars-heading"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl" />
    
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8 relative z-10">
        <header className="text-center mb-12 xs:mb-16">
          <h2 
            id="avatars-heading"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 xs:mb-6"
          >
            Realistic AI Avatars
          </h2>
          <p className="text-lg xs:text-xl lg:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed px-2 font-light">
            Bring your digital presence to life with photorealistic AI avatars. Perfect for presentations, social media, and customer interactions.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-12 xl:gap-16 items-center">
          {/* Avatar Preview */}
          <aside className="relative order-1 lg:order-1">
            <div className="luxury-card p-6 xs:p-8 md:p-10">
              <div className="glass-effect rounded-2xl p-6 xs:p-8 mb-6">
                <h4 className="font-bold text-slate-900 mb-6 text-lg xs:text-xl">AI Avatar Studio</h4>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl aspect-[4/3] flex items-center justify-center relative overflow-hidden luxury-shadow">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
                  <div className="text-center text-white relative z-10">
                    <div className="w-20 h-20 xs:w-24 xs:h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center mb-4 mx-auto luxury-shadow animate-pulse-gentle">
                      <User className="h-10 w-10 xs:h-12 xs:w-12 text-white" />
                    </div>
                    <p className="text-sm xs:text-base opacity-90 font-medium">AI Avatar Preview</p>
                    <p className="text-xs opacity-70 mt-2">Photorealistic & Interactive</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 xs:gap-3">
                <div className="bg-white rounded-lg p-2 xs:p-3 shadow-md text-center">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Style</div>
                  <div className="text-sm xs:text-base font-bold text-blue-600">Professional</div>
                </div>
                <div className="bg-white rounded-lg p-2 xs:p-3 shadow-md text-center">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Quality</div>
                  <div className="text-sm xs:text-base font-bold text-green-600">4K</div>
                </div>
                <div className="bg-white rounded-lg p-2 xs:p-3 shadow-md text-center">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Time</div>
                  <div className="text-sm xs:text-base font-bold text-purple-600">5 min</div>
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
                className="w-full xs:w-auto luxury-button text-white px-8 xs:px-10 py-4 xs:py-5 rounded-2xl font-semibold text-center"
                data-testid="avatars-cta"
                aria-label="Start creating your AI avatar"
              >
                Create Your Avatar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}