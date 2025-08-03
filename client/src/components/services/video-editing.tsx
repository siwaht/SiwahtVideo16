import { Scissors, MousePointer2, Captions, Minimize2, Check } from "lucide-react";

export default function VideoEditing() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const capabilities = [
    { label: "4K Resolution", icon: Check },
    { label: "Multi-track Audio", icon: Check },
    { label: "Real-time Preview", icon: Check },
    { label: "Cloud Rendering", icon: Check },
  ];

  return (
    <section id="editing" className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            AI-Enhanced Video Editing
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Professional video editing powered by AI. Automatically cut, enhance, and optimize your content for maximum impact and engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-white font-semibold">AI Video Editor</h4>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Video preview area */}
              <div className="bg-black rounded-lg aspect-video mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center mb-2 mx-auto">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                  </div>
                  <p className="text-white text-sm opacity-80">Professional Business Presentation</p>
                </div>
              </div>

              {/* Timeline mockup */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                  <div className="flex-1 bg-blue-600 h-8 rounded relative">
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-xs font-medium">Main Video Track</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                    <div className="w-3 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-green-600 h-6 rounded relative">
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-xs">Audio Track</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                    <div className="w-3 h-1 bg-white rounded"></div>
                  </div>
                  <div className="flex-1 bg-purple-600 h-4 rounded relative">
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-xs">Subtitles</div>
                  </div>
                </div>
              </div>

              {/* AI suggestions panel */}
              <div className="bg-slate-700 rounded-lg p-4 mt-6">
                <h5 className="text-white font-medium mb-3">AI Suggestions</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-green-400">
                    <Check className="h-4 w-4" />
                    <span>Smooth transitions added</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-400">
                    <MousePointer2 className="h-4 w-4" />
                    <span>Color grading optimized</span>
                  </div>
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="w-2 h-2 bg-current rounded-full"></div>
                    </div>
                    <span>Audio levels balanced</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Scissors className="text-primary h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Smart Auto-Editing</h3>
                <p className="text-slate-600">AI analyzes your footage to automatically create compelling cuts, transitions, and pacing that keeps viewers engaged.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <MousePointer2 className="text-secondary h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Intelligent Color Grading</h3>
                <p className="text-slate-600">Professional color correction and grading applied automatically based on scene analysis and mood detection.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Captions className="text-accent h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Auto Subtitles & Captions</h3>
                <p className="text-slate-600">Generate accurate subtitles in multiple languages with speaker identification and perfect timing.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Minimize2 className="text-green-600 h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Platform Optimization</h3>
                <p className="text-slate-600">Automatically format and optimize videos for different platforms with perfect aspect ratios and quality settings.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <h4 className="font-semibold text-slate-900 mb-4">Editing Capabilities</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="text-green-600 h-4 w-4" />
                    <span>{capability.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Editing Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
