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
      className="pt-16 md:pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen flex items-center relative overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8 py-12 xs:py-16 md:py-20 relative z-10">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 mb-4 xs:mb-6 leading-tight">
            Create with{" "}
            <span className="gradient-text block xs:inline">
              AI Power
            </span>
          </h1>
          <p className="text-lg xs:text-xl md:text-2xl lg:text-3xl text-slate-600 mb-6 xs:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            Transform your ideas into stunning videos, realistic avatars, and premium audio content with our cutting-edge AI technology.
          </p>
          
          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center items-center mb-8 xs:mb-12">
            <button 
              onClick={scrollToContact}
              className="w-full xs:w-auto bg-gradient-to-r from-primary to-secondary text-white px-6 xs:px-8 py-3 xs:py-4 rounded-xl text-base xs:text-lg font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1 min-w-[200px]"
              data-testid="hero-start-creating"
              aria-label="Start creating with SiwahtAI"
            >
              Start Creating Now
            </button>
            <button 
              onClick={scrollToServices}
              className="w-full xs:w-auto border-2 border-slate-300 text-slate-700 px-6 xs:px-8 py-3 xs:py-4 rounded-xl text-base xs:text-lg font-semibold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px]"
              data-testid="hero-watch-demo"
              aria-label="Learn about our services"
            >
              <Play className="h-4 w-4" />
              Explore Services
            </button>
          </div>
        </div>

        <div className="mt-12 xs:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 xs:gap-8 animate-slide-up">
          <article className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 xs:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 xs:mb-4">
              <Video className="text-primary h-5 w-5 xs:h-6 xs:w-6" aria-hidden="true" />
            </div>
            <h3 className="text-lg xs:text-xl font-semibold text-slate-900 mb-2">AI Video Creation</h3>
            <p className="text-slate-600 text-sm xs:text-base">Generate professional videos from text prompts in minutes</p>
          </article>

          <article className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 xs:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-3 xs:mb-4">
              <UserCircle className="text-secondary h-5 w-5 xs:h-6 xs:w-6" aria-hidden="true" />
            </div>
            <h3 className="text-lg xs:text-xl font-semibold text-slate-900 mb-2">Realistic Avatars</h3>
            <p className="text-slate-600 text-sm xs:text-base">Create lifelike digital personas for any application</p>
          </article>

          <article className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 xs:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 md:col-span-1">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-3 xs:mb-4">
              <Mic className="text-accent h-5 w-5 xs:h-6 xs:w-6" aria-hidden="true" />
            </div>
            <h3 className="text-lg xs:text-xl font-semibold text-slate-900 mb-2">Voice Synthesis</h3>
            <p className="text-slate-600 text-sm xs:text-base">Generate natural-sounding speech in multiple languages</p>
          </article>
        </div>
      </div>
    </section>
  );
}
