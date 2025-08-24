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
      className="pt-16 md:pt-20 min-h-screen flex items-center relative overflow-hidden hero-section"
      aria-label="Hero section"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite'
      }}
    >
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(120,198,255,0.2),transparent_50%)]" />
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/25 to-pink-600/25 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
      <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}} />
      
      <div className="container-custom relative z-10 hero-content">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
            Your Vision, Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 block sm:inline">
              AI Expertise
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Professional AI agency specializing in custom video ads, realistic avatars, and premium audio content. We bring your brand to life with cutting-edge technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12">
            <button 
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-white text-purple-700 font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] min-w-[200px]"
              data-testid="hero-start-creating"
              aria-label="Start creating with Siwaht"
            >
              Get Your Quote
            </button>
            <button 
              onClick={scrollToServices}
              className="w-full sm:w-auto backdrop-blur-xl bg-white/10 border-2 border-white/30 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-500 flex items-center justify-center gap-3 min-w-[200px] hover:-translate-y-1 shadow-xl"
              data-testid="hero-watch-demo"
              aria-label="Learn about our services"
            >
              <Play className="h-5 w-5" />
              View Our Work
            </button>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 animate-slide-up">
          <article className="backdrop-blur-xl bg-white/95 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] group relative overflow-hidden border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Video className="text-white h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4 leading-tight">AI Video Creation</h3>
              <p className="text-slate-600 text-base lg:text-lg leading-relaxed">Generate professional videos from text prompts in minutes with cutting-edge AI technology</p>
              <div className="mt-6 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </article>

          <article className="backdrop-blur-xl bg-white/95 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] group relative overflow-hidden border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <UserCircle className="text-white h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4 leading-tight">Realistic Avatars</h3>
              <p className="text-slate-600 text-base lg:text-lg leading-relaxed">Create lifelike digital personas for any application or industry need</p>
              <div className="mt-6 h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </article>

          <article className="backdrop-blur-xl bg-white/95 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] group relative overflow-hidden border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Mic className="text-white h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4 leading-tight">Voice Ads</h3>
              <p className="text-slate-600 text-base lg:text-lg leading-relaxed">Generate natural-sounding speech in multiple languages and accents</p>
              <div className="mt-6 h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
