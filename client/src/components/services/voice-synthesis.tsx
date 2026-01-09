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

// Fallback audio samples
const fallbackAudioSamples = [
  { id: 1, name: "AI Voice Sample 1", url: "https://play.gumlet.io/embed/6960a746195f98d9e15cadba?autoplay=false&preload=true" },
  { id: 2, name: "AI Voice Sample 2", url: "https://play.gumlet.io/embed/6960a746195f98d9e15cadb7?autoplay=false&preload=true" }
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
                <h4 className="font-bold text-slate-900 mb-3 text-base sm:text-lg">Sample Work</h4>
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
                  <div className="space-y-3">
                    {fallbackAudioSamples.map(sample => (
                      <div key={sample.id} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-200">
                        <h5 className="font-semibold text-slate-900 text-sm mb-2">{sample.name}</h5>
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <iframe
                            src={sample.url}
                            className="w-full h-full border-0"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            title={sample.name}
                          />
                        </div>
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
