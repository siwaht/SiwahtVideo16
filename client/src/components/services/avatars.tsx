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
      className="py-12 xs:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-100 to-blue-50"
      aria-labelledby="avatars-heading"
    >
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
        <header className="text-center mb-12 xs:mb-16">
          <h2 
            id="avatars-heading"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 xs:mb-6"
          >
            Realistic AI Avatars
          </h2>
          <p className="text-lg xs:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-2">
            Bring your digital presence to life with photorealistic AI avatars. Perfect for presentations, social media, and customer interactions.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-12 xl:gap-16 items-center">
          {/* Avatar Preview */}
          <aside className="relative order-1 lg:order-1">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl p-4 xs:p-6 md:p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-4 xs:p-6 mb-4 xs:mb-6 shadow-lg">
                <h4 className="font-semibold text-slate-900 mb-3 xs:mb-4 text-sm xs:text-base">AI Avatar Studio</h4>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg aspect-[4/3] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
                  <div className="text-center text-white relative z-10">
                    <div className="w-16 h-16 xs:w-20 xs:h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center mb-3 mx-auto shadow-lg">
                      <User className="h-8 w-8 xs:h-10 xs:w-10 text-white" />
                    </div>
                    <p className="text-xs xs:text-sm opacity-90 font-medium">AI Avatar Preview</p>
                    <p className="text-xs opacity-70 mt-1">Customizable & Realistic</p>
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
                className="w-full xs:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 xs:px-8 py-3 xs:py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 text-center"
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