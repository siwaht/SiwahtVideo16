import { useQuery } from "@tanstack/react-query";
import { Mic, Languages, Volume2, Download } from "lucide-react";
import { MediaPlayer } from "@/components/ui/media-player";
import { FeatureList } from "@/components/ui/feature-card";
import { StatGrid } from "@/components/ui/stat-card";
import { scrollToContact } from "@/utils/scroll";
import type { VoiceSample } from "@shared/schema";

const features = [
  { icon: Languages, iconColor: "text-indigo-600", bgColor: "bg-indigo-50", title: "Dubbing & Translation", description: "Dub your content into 29+ languages while preserving voice and emotion." },
  { icon: Mic, iconColor: "text-teal-600", bgColor: "bg-teal-50", title: "Voice Isolation", description: "Crystal clear audio extraction from noisy backgrounds." },
  { icon: Volume2, iconColor: "text-violet-600", bgColor: "bg-violet-50", title: "Custom Sound Effects", description: "Custom SFX tailored to your project's needs." },
  { icon: Download, iconColor: "text-amber-600", bgColor: "bg-amber-50", title: "Voice Transformation", description: "Transform vocals into any character or style you need." },
];

const stats = [
  { label: "Languages", value: "80+", color: "text-teal-600" },
  { label: "Voices", value: "1000+", color: "text-indigo-600" },
  { label: "Quality", value: "Studio", color: "text-violet-600" },
];

const fallbackAudioSamples = [
  {
    id: 1,
    name: "English Voice Ad",
    language: "English",
    description: "Professional English voice ad showcasing premium brand messaging.",
    audioUrl: "https://files.catbox.moe/pm2f2x.mp3",
  },
  {
    id: 2,
    name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0625\u0639\u0644\u0627\u0646 \u0635\u0648\u062A\u064A",
    language: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
    description: "\u0625\u0639\u0644\u0627\u0646 \u0635\u0648\u062A\u064A \u0639\u0631\u0628\u064A \u0627\u062D\u062A\u0631\u0627\u0641\u064A \u064A\u0639\u0631\u0636 \u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062A\u062C\u0627\u0631\u064A\u0629 \u0627\u0644\u0645\u062A\u0645\u064A\u0632\u0629.",
    audioUrl: "https://files.catbox.moe/qn19pu.mp3",
  },
];

export default function VoiceSynthesis() {
  const { data: voiceSamples = [] } = useQuery<VoiceSample[]>({
    queryKey: ["/api/samples/voice-samples"],
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const publishedVoices = voiceSamples.filter((v) => v.isPublished).sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <section id="voice-synthesis" className="section-padding">
      <div className="container-custom">
        <header className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            <span className="gradient-text">Professional Voice Services</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
            Studio-grade audio post-production: Dubbing, Voice Isolation, and Custom SFX.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <aside className="order-1">
            <div className="bg-gradient-to-br from-teal-50/80 to-slate-50/80 rounded-3xl p-5 sm:p-6 border border-teal-100/50">
              <div className="bg-white rounded-2xl p-4 sm:p-5 mb-4 border border-slate-100" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-teal-600 mb-3">Voice Samples</h4>
                {publishedVoices.length > 0 ? (
                  <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin">
                    {publishedVoices.slice(0, 4).map((voice) => (
                      <div key={voice.id} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-slate-900 text-sm">{voice.name}</h5>
                          <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">{voice.language}</span>
                        </div>
                        {voice.audioUrl && <MediaPlayer src={voice.audioUrl} type="audio" title={voice.name} />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {fallbackAudioSamples.map((sample) => (
                      <div key={sample.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-slate-900 text-sm">{sample.name}</h5>
                          <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">{sample.language}</span>
                        </div>
                        <p className="text-slate-500 text-xs mb-3">{sample.description}</p>
                        <audio controls className="w-full h-10" preload="metadata">
                          <source src={sample.audioUrl} type="audio/mpeg" />
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
            <div className="pt-6 pl-5">
              <button onClick={scrollToContact} className="btn-secondary">Order Voice Services</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
