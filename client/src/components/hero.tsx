import { Video, UserCircle, Mic } from "lucide-react";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
            Create with{" "}
            <span className="gradient-text">
              AI Power
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into stunning videos, realistic avatars, and premium audio content with our cutting-edge AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Creating Now
            </button>
            <button className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-primary hover:text-primary transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Video className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">AI Video Creation</h3>
            <p className="text-slate-600">Generate professional videos from text prompts in minutes</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
              <UserCircle className="text-secondary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Realistic Avatars</h3>
            <p className="text-slate-600">Create lifelike digital personas for any application</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <Mic className="text-accent h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Voice Synthesis</h3>
            <p className="text-slate-600">Generate natural-sounding speech in multiple languages</p>
          </div>
        </div>
      </div>
    </section>
  );
}
