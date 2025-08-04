import { Video, UserCircle, Mic, Play } from "lucide-react";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className="pt-16 md:pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen flex items-center relative overflow-hidden hero-section"
      aria-label="Hero section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-8 xs:py-12 sm:py-16 md:py-20 relative z-10 hero-content">
        <div className="text-center animate-fade-in">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-3 xs:mb-4 sm:mb-6 leading-tight">
            Create with{" "}
            <span className="gradient-text block xs:inline">
              AI Power
            </span>
          </h1>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-600 mb-4 xs:mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-1 xs:px-2">
            Transform your ideas into stunning videos, realistic avatars, and premium audio content with our cutting-edge AI technology.
          </p>
          
          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-6 justify-center items-center mb-6 xs:mb-8 sm:mb-12">
            <button 
              onClick={scrollToContact}
              className="btn-primary w-full xs:w-auto text-base xs:text-lg sm:text-xl px-6 xs:px-8 sm:px-10 py-3 xs:py-4 sm:py-5 min-w-[200px] xs:min-w-[220px]"
              data-testid="hero-start-creating"
              aria-label="Start creating with Siwaht"
            >
              Start Creating Now
            </button>
            <button 
              onClick={scrollToServices}
              className="w-full xs:w-auto glass-card border-2 border-white/40 text-slate-700 px-6 xs:px-8 py-3 xs:py-4 rounded-xl text-base xs:text-lg sm:text-xl font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 flex items-center justify-center gap-2 xs:gap-3 min-w-[200px] xs:min-w-[220px] hover-lift"
              data-testid="hero-watch-demo"
              aria-label="Learn about our services"
            >
              <Play className="h-5 w-5" />
              Explore Services
            </button>
          </div>
        </div>

        <div className="mt-8 xs:mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 xs:gap-8 sm:gap-10 animate-slide-up">
          <article className="feature-card hover-lift">
            <div className="feature-icon bg-blue-100 icon-gradient mb-4 xs:mb-6">
              <Video className="text-blue-600 h-6 w-6 xs:h-7 xs:w-7" aria-hidden="true" />
            </div>
            <h3 className="text-xl xs:text-2xl font-bold text-slate-900 mb-3 text-shadow">AI Video Creation</h3>
            <p className="text-slate-600 text-base xs:text-lg leading-relaxed">Generate professional videos from text prompts in minutes</p>
          </article>

          <article className="feature-card hover-lift">
            <div className="feature-icon bg-purple-100 icon-gradient mb-4 xs:mb-6">
              <UserCircle className="text-purple-600 h-6 w-6 xs:h-7 xs:w-7" aria-hidden="true" />
            </div>
            <h3 className="text-xl xs:text-2xl font-bold text-slate-900 mb-3 text-shadow">Realistic Avatars</h3>
            <p className="text-slate-600 text-base xs:text-lg leading-relaxed">Create lifelike digital personas for any application</p>
          </article>

          <article className="feature-card hover-lift">
            <div className="feature-icon bg-emerald-100 icon-gradient mb-4 xs:mb-6">
              <Mic className="text-emerald-600 h-6 w-6 xs:h-7 xs:w-7" aria-hidden="true" />
            </div>
            <h3 className="text-xl xs:text-2xl font-bold text-slate-900 mb-3 text-shadow">Voice Synthesis</h3>
            <p className="text-slate-600 text-base xs:text-lg leading-relaxed">Generate natural-sounding speech in multiple languages</p>
          </article>
        </div>
      </div>
    </section>
  );
}
