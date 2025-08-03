import { AudioWaveform, Globe, Sliders, Download, Play } from "lucide-react";

export default function VoiceSynthesis() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const voiceTypes = [
    { title: "Professional Female", subtitle: "Clear, authoritative tone", bgColor: "bg-blue-100", iconColor: "text-blue-600" },
    { title: "Conversational Male", subtitle: "Warm, friendly delivery", bgColor: "bg-green-100", iconColor: "text-green-600" },
    { title: "Narrative Style", subtitle: "Perfect for storytelling", bgColor: "bg-purple-100", iconColor: "text-purple-600" },
  ];

  return (
    <section id="voice" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            AI Voice Synthesis
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Transform text into natural-sounding speech with emotional depth and perfect pronunciation in dozens of languages and voices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Voice Library</h3>
              
              <div className="space-y-4">
                {voiceTypes.map((voice, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 ${voice.bgColor} rounded-full flex items-center justify-center`}>
                        <AudioWaveform className={`${voice.iconColor} h-5 w-5`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">{voice.title}</h4>
                        <p className="text-sm text-slate-600">{voice.subtitle}</p>
                      </div>
                    </div>
                    <button className="text-primary hover:text-primary/80 transition-colors duration-200">
                      <Play className="h-6 w-6" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={scrollToContact}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Try Voice Synthesis
            </button>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <AudioWaveform className="text-primary h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Natural Intonation</h3>
                <p className="text-slate-600">Advanced neural networks create speech with natural rhythm, stress patterns, and emotional expression.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Globe className="text-secondary h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">40+ Languages</h3>
                <p className="text-slate-600">Support for major world languages with authentic accents and pronunciation patterns.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Sliders className="text-accent h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Emotion Control</h3>
                <p className="text-slate-600">Adjust tone, pace, and emotional delivery to match your content's mood and purpose.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Download className="text-orange-600 h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Multiple Formats</h3>
                <p className="text-slate-600">Export in various audio formats optimized for different platforms and use cases.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold text-slate-900 mb-3">Performance Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">99.8%</div>
                  <div className="text-sm text-slate-600">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">&lt; 2s</div>
                  <div className="text-sm text-slate-600">Generation Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
