import { Settings, Globe, Brain, Rocket } from "lucide-react";

export default function Avatars() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const avatarTypes = [
    { title: "Professional", subtitle: "Business & Corporate", bgColor: "bg-blue-100" },
    { title: "Creative", subtitle: "Arts & Entertainment", bgColor: "bg-purple-100" },
    { title: "Friendly", subtitle: "Customer Service", bgColor: "bg-green-100" },
    { title: "Technical", subtitle: "Education & Training", bgColor: "bg-orange-100" },
  ];

  return (
    <section id="avatars" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            AI Avatar Creation
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Generate photorealistic digital avatars for presentations, customer service, or entertainment. Customize every detail to match your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              {avatarTypes.map((avatar, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-full h-32 ${avatar.bgColor} rounded-xl mb-4 flex items-center justify-center`}>
                    <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-slate-400 rounded-full"></div>
                    </div>
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-1">{avatar.title}</h4>
                  <p className="text-sm text-slate-600">{avatar.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Settings className="text-primary h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Complete Customization</h3>
                <p className="text-slate-600">Fine-tune appearance, personality, voice, and mannerisms to create the perfect digital representative.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Globe className="text-secondary h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Multilingual Support</h3>
                <p className="text-slate-600">Create avatars that speak naturally in over 40 languages with proper cultural nuances.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Brain className="text-accent h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Intelligent Responses</h3>
                <p className="text-slate-600">Advanced AI enables natural conversations and context-aware responses for any scenario.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Rocket className="text-green-600 h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Real-time Animation</h3>
                <p className="text-slate-600">Smooth, lifelike animations powered by advanced motion capture technology and AI.</p>
              </div>
            </div>

            <button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Create Your Avatar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
