import { Video, UserCircle, Mic, Play, Sparkles, ArrowRight } from "lucide-react";

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
      className="pt-16 md:pt-20 min-h-screen flex items-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          hsl(265, 85%, 58%) 0%, 
          hsl(268, 100%, 72%) 25%, 
          hsl(320, 100%, 84%) 50%,
          hsl(286, 94%, 65%) 75%,
          hsl(265, 85%, 58%) 100%)`
      }}
      aria-label="Hero section"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-white/15 rounded-full blur-2xl animate-pulse-gentle" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-white/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}} />
      </div>
      
      {/* Glass overlay */}
      <div className="absolute inset-0 glass-effect opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8 py-12 xs:py-16 md:py-20 relative z-10">
        <div className="text-center animate-fade-in">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full mb-6 text-white/90 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Premium AI Agency
          </div>
          
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 xs:mb-6 leading-tight text-shadow-elegant">
            Create with{" "}
            <span className="block xs:inline relative">
              <span className="bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                AI Excellence
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-pink-200/20 blur-lg rounded-lg -z-10" />
            </span>
          </h1>
          <p className="text-lg xs:text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 xs:mb-8 max-w-4xl mx-auto leading-relaxed px-2 font-light">
            Transform your vision into stunning videos, lifelike avatars, and premium audio content with our cutting-edge AI technology.
          </p>
          
          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center items-center mb-8 xs:mb-12">
            <button 
              onClick={scrollToContact}
              className="w-full xs:w-auto luxury-button text-white px-8 xs:px-10 py-4 xs:py-5 rounded-2xl text-base xs:text-lg font-semibold min-w-[220px] flex items-center justify-center gap-2"
              data-testid="hero-start-creating"
              aria-label="Start creating with SiwahtAI"
            >
              Start Creating Now
              <ArrowRight className="h-5 w-5" />
            </button>
            <button 
              onClick={scrollToServices}
              className="w-full xs:w-auto glass-effect border border-white/20 text-white px-8 xs:px-10 py-4 xs:py-5 rounded-2xl text-base xs:text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 min-w-[220px] backdrop-blur-md"
              data-testid="hero-watch-demo"
              aria-label="Learn about our services"
            >
              <Play className="h-5 w-5" />
              Explore Services
            </button>
          </div>
        </div>

        <div className="mt-12 xs:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 xs:gap-8 animate-slide-up">
          <article className="luxury-card p-6 xs:p-8 text-center group">
            <div className="w-16 h-16 xs:w-20 xs:h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center mb-4 xs:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Video className="text-white h-8 w-8 xs:h-10 xs:w-10" aria-hidden="true" />
            </div>
            <h3 className="text-xl xs:text-2xl font-bold text-white mb-3">AI Video Creation</h3>
            <p className="text-white/80 text-base xs:text-lg leading-relaxed">Generate professional videos from text prompts in minutes</p>
          </article>

          <article className="luxury-card p-6 xs:p-8 text-center group">
            <div className="w-16 h-16 xs:w-20 xs:h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center mb-4 xs:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <UserCircle className="text-white h-8 w-8 xs:h-10 xs:w-10" aria-hidden="true" />
            </div>
            <h3 className="text-xl xs:text-2xl font-bold text-white mb-3">Realistic Avatars</h3>
            <p className="text-white/80 text-base xs:text-lg leading-relaxed">Create lifelike digital personas for any application</p>
          </article>

          <article className="luxury-card p-6 xs:p-8 text-center group md:col-span-1">
            <div className="w-16 h-16 xs:w-20 xs:h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center mb-4 xs:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Mic className="text-white h-8 w-8 xs:h-10 xs:w-10" aria-hidden="true" />
            </div>
            <h3 className="text-xl xs:text-2xl font-bold text-white mb-3">Voice Synthesis</h3>
            <p className="text-white/80 text-base xs:text-lg leading-relaxed">Generate natural-sounding speech in multiple languages</p>
          </article>
        </div>
      </div>
    </section>
  );
}
