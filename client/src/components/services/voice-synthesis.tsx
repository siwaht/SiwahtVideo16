import { useQuery } from "@tanstack/react-query";
import { Mic, Languages, Volume2, Download } from "lucide-react";
import { MediaPlayer } from "@/components/ui/media-player";
import { FeatureList } from "@/components/ui/feature-card";
import { StatGrid } from "@/components/ui/stat-card";
import { scrollToContact } from "@/utils/scroll";
import type { VoiceSample } from "@shared/schema";

const features = [
  { icon: Languages, iconColor: "text-blue-600", bgColor: "bg-blue-100", title: "Dubbing & Translation", description: "We dub your content into 29+ languages while preserving voice and emotion." },
  { icon: Mic, iconColor: "text-emerald-600", bgColor: "bg-emerald-100", title: "Voice Isolation", description: "Our team delivers crystal clear audio extraction from noisy backgrounds." },
  { icon: Volume2, iconColor: "text-purple-600", bgColor: "bg-purple-100", title: "Custom Sound Effects", description: "We create custom SFX tailored to your project's needs." },
  { icon: Download, iconColor: "text-orange-600", bgColor: "bg-orange-100", title: "Voice Transformation", description: "We transform vocals into any character or style you need." }
];

const stats = [
  { label: "Languages", value: "80+", color: "text-emerald-600" },
  { label: "Voices", value: "1000+", color: "text-teal-600" },
  { label: "Quality", value: "Studio", color: "text-blue-600" }
];

// Audio samples hosted on Cloudflare R2
const fallbackAudioSamples = [
  { 
    id: 1, 
    name: "English Voice Ad", 
    language: "English",
    tags: ["professional", "native", "adult"],
    description: "Professional English voice ad showcasing premium brand messaging and clear articulation for global markets.",
    audioUrl: "https://pub-d3419d11c45d499a9ce43bb169f92f3c.r2.dev/siwaht_english.mp4"
  },
  { 
    id: 2, 
    name: "العربية إعلان صوتي", 
    language: "العربية",
    tags: ["احترافي", "أصلي", "بالغ"],
    description: "إعلان صوتي عربي احترافي يعرض رسائل العلامة التجارية المتميزة والنطق الواضح للأسواق العالمية.",
    audioUrl: "https://pub-d3419d11c45d499a9ce43bb169f92f3c.r2.dev/siwaht%20arabic.mp4"
  }
];


export default function VoiceSynthesis() {
  const { data: voiceSamples = [] } = useQuery<VoiceSample[]>({
    queryKey: ['/api/samples/voice-samples'],
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const publishedVoices = voiceSamples.filter(v => v.isPublished).sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <section id="voice-synthesis" className="section-padding bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/40">
      <div className="container-custom">
        <header className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            <span className="gradient-text">Professional Voice Services</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            We deliver studio-grade audio post-production: Dubbing, Voice Isolation, and Custom SFX.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <aside className="order-1">
            <div className="service-preview from-emerald-100 via-teal-100 to-cyan-100 bg-gradient-to-br">
              <div className="glass-card p-4 sm:p-6 mb-4 sm:mb-6">
                <h4 className="font-bold text-slate-900 mb-3 text-base sm:text-lg">Professional Multilingual Voice Ads</h4>
                {publishedVoices.length > 0 ? (
                  <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin">
                    {publishedVoices.slice(0, 4).map(voice => (
                      <div key={voice.id} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-200">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-slate-900 text-sm">{voice.name}</h5>
                          <div className="flex gap-1">
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{voice.language}</span>
                          </div>
                        </div>
                        {voice.audioUrl && <MediaPlayer src={voice.audioUrl} type="audio" title={voice.name} />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {fallbackAudioSamples.map(sample => (
                      <div key={sample.id} className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h5 className="font-semibold text-slate-900 text-base">{sample.name}</h5>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">{sample.language}</span>
                              {sample.tags.map((tag, idx) => (
                                <span key={idx} className="text-xs bg-slate-50 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">{tag}</span>
                              ))}
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                            <Volume2 className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm mb-3">{sample.description}</p>
                        {/* Audio Player using video element (audio-only MP4) */}
                        <audio 
                          controls 
                          className="w-full h-12"
                          preload="metadata"
                        >
                          <source src={sample.audioUrl} type="video/mp4" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <StatGrid stats={stats} />
            </div>
          </aside>

          <div className="order-2">
            <FeatureList features={features} />
            <div className="pt-4 sm:pt-6">
              <button onClick={scrollToContact} className="btn-secondary w-full sm:w-auto">Order Voice Services</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
