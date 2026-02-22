import { Video, UserCircle, Mic, ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="pt-32 md:pt-40 pb-20 md:pb-28 min-h-screen flex items-center relative overflow-hidden"
      aria-label="Hero section"
    >
      {/* Dark elegant background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,_hsla(185,100%,50%,0.15),_transparent)]" />
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[hsla(260,60%,75%,0.08)] rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[hsla(185,100%,50%,0.08)] rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium mb-8 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(185,100%,50%)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[hsl(185,100%,50%)]"></span>
            </div>
            Professional AI Content Agency
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[1.05] tracking-tight text-white drop-shadow-2xl">
            Your Vision, Our{" "}
            <span className="gradient-text">AI Expertise</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            We create custom video ads, realistic avatars, and premium audio content that brings your brand to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={scrollToContact}
              className="btn-primary w-full sm:w-auto text-base sm:text-lg px-10 py-4 flex items-center justify-center gap-2 group"
              data-testid="hero-start-creating"
              aria-label="Start your project with Siwaht"
            >
              Start Project
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={scrollToServices}
              className="btn-secondary w-full sm:w-auto text-base sm:text-lg px-10 py-4"
              data-testid="hero-watch-demo"
              aria-label="Explore our AI services"
            >
              Explore Services
            </button>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-20 sm:mt-28 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          {[
            {
              icon: Video,
              color: "text-[hsl(185,100%,50%)]",
              bg: "bg-[hsl(185,100%,50%)]/10",
              title: "Cinematic AI Video",
              desc: "Broadcast-quality video production generated in minutes, not months.",
            },
            {
              icon: UserCircle,
              color: "text-[hsl(260,60%,75%)]",
              bg: "bg-[hsl(260,60%,75%)]/10",
              title: "Hyper-Real Avatars",
              desc: "Digital brand ambassadors that speak any language fluently.",
            },
            {
              icon: Mic,
              color: "text-[hsl(280,60%,60%)]",
              bg: "bg-[hsl(280,60%,60%)]/10",
              title: "AI Audio Editing",
              desc: "Dubbing, voice isolation, and generative SFX for cinematic soundscapes.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="feature-card group"
            >
              <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5`}>
                <item.icon className={`${item.color} h-7 w-7`} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-white/60 text-[15px] leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
