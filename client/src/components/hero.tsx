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
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,_hsla(234,62%,56%,0.08),_transparent)]" />
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[hsla(234,62%,56%,0.04)] rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[hsla(262,52%,58%,0.04)] rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-8 border border-slate-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Professional AI Content Agency
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 mb-8 leading-[1.05] tracking-tight">
            Your Vision, Our{" "}
            <span className="gradient-text">AI Expertise</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
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
              className="w-full sm:w-auto bg-white text-slate-700 px-10 py-4 rounded-2xl text-base sm:text-lg font-semibold hover:bg-slate-50 transition-all duration-300 border border-slate-200 hover:border-slate-300"
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
              color: "text-indigo-600",
              bg: "bg-indigo-50",
              title: "Cinematic AI Video",
              desc: "Broadcast-quality video production generated in minutes, not months.",
            },
            {
              icon: UserCircle,
              color: "text-violet-600",
              bg: "bg-violet-50",
              title: "Hyper-Real Avatars",
              desc: "Digital brand ambassadors that speak any language fluently.",
            },
            {
              icon: Mic,
              color: "text-teal-600",
              bg: "bg-teal-50",
              title: "AI Audio Editing",
              desc: "Dubbing, voice isolation, and generative SFX for cinematic soundscapes.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="group bg-white rounded-2xl p-8 border border-slate-100 hover:border-slate-200 transition-all duration-500"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            >
              <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                <item.icon className={`${item.color} h-6 w-6`} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
