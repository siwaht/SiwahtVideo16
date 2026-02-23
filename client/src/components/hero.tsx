import { Video, UserCircle, Mic, Play } from "lucide-react";

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="pt-32 md:pt-44 pb-20 md:pb-28 min-h-screen flex items-center relative overflow-hidden bg-[#f8fafe]"
      aria-label="Hero section"
    >
      {/* Soft Background Orbs as in the image */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold text-[#1e293b] mb-6 leading-[1.1] tracking-tight">
            Your Vision, Our <span className="text-[#2ca5f5]">AI Expertise</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-3xl mx-auto leading-relaxed">
            Professional AI agency specializing in custom video ads, realistic avatars, and
            premium audio content. We bring your brand to life with cutting-edge
            technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={scrollToContact}
              className="bg-[#2a68eb] hover:bg-blue-700 text-white text-[15px] font-semibold px-8 py-3.5 rounded-md transition-colors w-full sm:w-auto"
            >
              Start Project
            </button>
            <button
              onClick={scrollToServices}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-[15px] font-semibold px-8 py-3.5 rounded-md transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm"
            >
              <Play className="w-4 h-4 text-slate-600" strokeWidth={2} />
              Explore Services
            </button>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Video,
              color: "text-[#3b82f6]",
              bg: "bg-[#e0f2fe]",
              title: "Cinematic AI Video",
              desc: "Broadcast-quality video production generated in minutes, not months. Visual storytelling redefined.",
            },
            {
              icon: UserCircle,
              color: "text-[#a855f7]",
              bg: "bg-[#f3e8ff]",
              title: "Hyper-Real Avatars",
              desc: "Indistinguishable from reality. Create digital brand ambassadors that speak any language fluently.",
            },
            {
              icon: Mic,
              color: "text-[#10b981]",
              bg: "bg-[#dcfce7]",
              title: "AI Audio Editing",
              desc: "Complete audio post-production. Dubbing, voice isolation, and Generative SFX for cinematic soundscapes.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="bg-white rounded-[16px] p-8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-slate-100"
            >
              <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-5`}>
                <item.icon className={`${item.color} h-6 w-6`} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-snug">{item.title}</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
