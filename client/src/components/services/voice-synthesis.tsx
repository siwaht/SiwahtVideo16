import { useQuery } from "@tanstack/react-query";
import { Mic, Languages, Volume2, Download } from "lucide-react";
import { MediaPlayer } from "@/components/ui/media-player";
import { FeatureList } from "@/components/ui/feature-card";
import { StatGrid } from "@/components/ui/stat-card";
import { scrollToContact } from "@/utils/scroll";
import type { VoiceSample } from "@shared/schema";

const features = [
  { icon: Languages, iconColor: "text-blue-600", bgColor: "bg-blue-100", title: "AI Dubbing & Translation", description: "Dub content into 29+ languages preserving voice and emotion." },
  { icon: Mic, iconColor: "text-emerald-600", bgColor: "bg-emerald-100", title: "Precision Voice Isolation", description: "Crystal clear audio extraction from noisy backgrounds." },
  { icon: Volume2, iconColor: "text-purple-600", bgColor: "bg-purple-100", title: "Generative Sound Effects", description: "Create custom SFX from simple text prompts." },
  { icon: Download, iconColor: "text-orange-600", bgColor: "bg-orange-100", title: "Speech-to-Speech", description: "Transform vocals into any character or style." }
];

const stats = [
  { label: "Languages", value: "80+", color: "text-emerald-600" },
  { label: "Voices", value: "1000+", color: "text-teal-600" },
  { label: "Quality", value: "Studio", color: "text-blue-600" }
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
            <span className="gradient-text">AI Voice Editing Suite</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            Studio-grade post-production: Dubbing, Voice Isolation, and Generative SFX.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <aside className="order-1">
            <div className="service-preview from-emerald-100 via-teal-100 to-cyan-100 bg-gradient-to-br">
              <div className="glass-card p-4 sm:p-6 mb-4 sm:mb-6">
                <h4 className="font-bold text-slate-900 mb-3 text-base sm:text-lg">Voice Samples</h4>
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
                  <div className="bg-slate-100 rounded-xl aspect-video flex items-center justify-center">
                    <p className="text-slate-500 text-sm">Voice samples coming soon</p>
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
