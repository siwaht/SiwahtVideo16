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
      className="pt-16 md:pt-20 bg-background min-h-screen flex items-center relative overflow-hidden hero-section"
      aria-label="Hero section"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3" />
      
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-8 xs:py-12 sm:py-16 md:py-20 relative z-10 hero-content">
        <div className="text-center animate-fade-in">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-3 xs:mb-4 sm:mb-6 leading-tight">
            Create with{" "}
            <span className="gradient-text block xs:inline">
              AI Power
            </span>
          </h1>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 xs:mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-1 xs:px-2">
            Transform your ideas into stunning videos, realistic avatars, and premium audio content with our cutting-edge AI technology.
          </p>
          
          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-6 justify-center items-center mb-6 xs:mb-8 sm:mb-12">
            <button 
              onClick={scrollToContact}
              className="btn-primary w-full xs:w-auto text-sm xs:text-base sm:text-lg px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 min-w-[180px] xs:min-w-[200px] sm:min-w-[220px]"
              data-testid="hero-start-creating"
              aria-label="Start creating with Siwaht"
            >
              <span className="hidden xs:inline">Start Creating Now</span>
              <span className="xs:hidden">Start Now</span>
            </button>
            <button 
              onClick={scrollToServices}
              className="w-full xs:w-auto bg-muted border border-border text-foreground px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-lg text-sm xs:text-base sm:text-lg font-medium hover:bg-muted/80 transition-all duration-200 flex items-center justify-center gap-2 xs:gap-3 min-w-[180px] xs:min-w-[200px] sm:min-w-[220px]"
              data-testid="hero-watch-demo"
              aria-label="Learn about our services"
            >
              <Play className="h-4 w-4 xs:h-5 xs:w-5" />
              <span className="hidden xs:inline">Explore Services</span>
              <span className="xs:hidden">Services</span>
            </button>
          </div>
        </div>

        <div className="mt-8 xs:mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 xs:gap-8 sm:gap-10 animate-slide-up">
          <article className="feature-card hover-lift group">
            <div className="feature-icon bg-primary/10 mb-4 xs:mb-6 w-16 h-16 rounded-lg flex items-center justify-center">
              <Video className="text-primary h-7 w-7 xs:h-8 xs:w-8" aria-hidden="true" />
            </div>
            <h3 className="text-xl xs:text-2xl font-semibold text-foreground mb-3">AI Video Creation</h3>
            <p className="text-muted-foreground text-base xs:text-lg leading-relaxed">Generate professional videos from text prompts in minutes</p>
          </article>

          <article className="feature-card hover-lift group">
            <div className="feature-icon bg-secondary/10 mb-4 xs:mb-6 w-16 h-16 rounded-lg flex items-center justify-center">
              <UserCircle className="text-secondary h-7 w-7 xs:h-8 xs:w-8" aria-hidden="true" />
            </div>
            <h3 className="text-xl xs:text-2xl font-semibold text-foreground mb-3">Realistic Avatars</h3>
            <p className="text-muted-foreground text-base xs:text-lg leading-relaxed">Create lifelike digital personas for any application</p>
          </article>

          <article className="feature-card hover-lift group">
            <div className="feature-icon bg-primary/10 mb-4 xs:mb-6 w-16 h-16 rounded-lg flex items-center justify-center">
              <Mic className="text-primary h-7 w-7 xs:h-8 xs:w-8" aria-hidden="true" />
            </div>
            <h3 className="text-xl xs:text-2xl font-semibold text-foreground mb-3">Voice Synthesis</h3>
            <p className="text-muted-foreground text-base xs:text-lg leading-relaxed">Generate natural-sounding speech in multiple languages</p>
          </article>
        </div>
      </div>
    </section>
  );
}
