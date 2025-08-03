import { Wand2, Palette, TrendingUp } from "lucide-react";

export default function VideoAds() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Wand2,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "Smart Script Generation",
      description: "AI analyzes your product and target audience to create compelling scripts that drive conversions."
    },
    {
      icon: Palette,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      title: "Brand-Aligned Visuals",
      description: "Automatically generate visuals that match your brand guidelines and aesthetic preferences."
    },
    {
      icon: TrendingUp,
      iconColor: "text-accent",
      bgColor: "bg-accent/10",
      title: "Performance Optimization",
      description: "Built-in A/B testing and performance analytics to maximize your ad effectiveness."
    }
  ];

  return (
    <section 
      id="video-ads" 
      className="py-12 xs:py-16 md:py-20 lg:py-24 bg-white"
      aria-labelledby="video-ads-heading"
    >
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
        <header className="text-center mb-12 xs:mb-16">
          <h2 
            id="video-ads-heading"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 xs:mb-6"
          >
            AI Video Ad Creation
          </h2>
          <p className="text-lg xs:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-2">
            Create compelling video advertisements that convert. Our AI analyzes your brand and generates high-performing ad content automatically.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-12 xl:gap-16 items-center">
          <div className="space-y-6 xs:space-y-8 order-2 lg:order-1">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article 
                  key={index}
                  className="flex items-start space-x-3 xs:space-x-4 p-3 xs:p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200"
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
                className="w-full xs:w-auto bg-gradient-to-r from-primary to-secondary text-white px-6 xs:px-8 py-3 xs:py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1 text-center"
                data-testid="video-ads-cta"
                aria-label="Start creating your first video ad"
              >
                Create Your First Ad
              </button>
            </div>
          </div>

          <aside className="relative order-1 lg:order-2">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-4 xs:p-6 md:p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-4 xs:p-6 mb-4 xs:mb-6 shadow-lg">
                <h4 className="font-semibold text-slate-900 mb-3 xs:mb-4 text-sm xs:text-base">Video Ad Preview</h4>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-12 h-12 xs:w-16 xs:h-16 rounded-full border-4 border-white/20 flex items-center justify-center mb-2 mx-auto">
                      <div className="w-0 h-0 border-l-[6px] xs:border-l-[8px] border-l-white border-y-[4px] xs:border-y-[6px] border-y-transparent ml-1"></div>
                    </div>
                    <p className="text-xs xs:text-sm opacity-80">AI-Generated Video Preview</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 xs:gap-4">
                <div className="bg-white rounded-lg p-3 xs:p-4 shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs xs:text-sm font-medium text-slate-600">Engagement</span>
                    <span className="text-sm xs:text-lg font-bold text-green-600">94%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 xs:h-2">
                    <div className="bg-green-500 h-1.5 xs:h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-3 xs:p-4 shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs xs:text-sm font-medium text-slate-600">Conversion</span>
                    <span className="text-sm xs:text-lg font-bold text-blue-600">87%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 xs:h-2">
                    <div className="bg-blue-500 h-1.5 xs:h-2 rounded-full" style={{width: '87%'}}></div>
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
