import { Scissors, Layers, Zap, Sparkles } from "lucide-react";
import { MediaPlayer } from "@/components/ui/media-player";
import { FeatureList } from "@/components/ui/feature-card";
import { StatGrid } from "@/components/ui/stat-card";
import { scrollToContact } from "@/utils/scroll";

const features = [
  { icon: Scissors, iconColor: "text-indigo-600", bgColor: "bg-indigo-50", title: "Narrative Assembly", description: "Our editors understand story arcs, assembling your footage into compelling narratives." },
  { icon: Layers, iconColor: "text-violet-600", bgColor: "bg-violet-50", title: "VFX Integration", description: "Industry-standard visual effects tailored to your brand's aesthetic." },
  { icon: Zap, iconColor: "text-amber-600", bgColor: "bg-amber-50", title: "Fast Turnaround", description: "Lightning-fast results with our GPU-accelerated rendering pipeline." },
  { icon: Sparkles, iconColor: "text-teal-600", bgColor: "bg-teal-50", title: "Professional Color Grading", description: "Balanced color, exposure, and tone across all shots for a polished look." },
];

const stats = [
  { label: "Turnaround", value: "72 Hours", color: "text-amber-600" },
  { label: "Quality", value: "4K HDR", color: "text-teal-600" },
  { label: "Format", value: "Any", color: "text-indigo-600" },
];

export default function VideoEditing() {
  return (
    <section id="editing" className="section-padding bg-slate-50/50">
      <div className="container-custom">
        <header className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            <span className="gradient-text">Professional Post-Production</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
            Transform your raw footage into cinematic masterpieces in record time.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <aside className="order-1">
            <div className="bg-gradient-to-br from-amber-50/80 to-slate-50/80 rounded-3xl p-5 sm:p-6 border border-amber-100/50">
              <div className="bg-white rounded-2xl p-4 sm:p-5 mb-4 border border-slate-100" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-amber-600 mb-3">Sample Work</h4>
                <MediaPlayer src="https://gumlet.tv/watch/695b78ac143ef68b1070a48e" title="AI Video Editor Demo" />
              </div>
              <StatGrid stats={stats} />
            </div>
          </aside>

          <div className="order-2">
            <FeatureList features={features} />
            <div className="pt-6 pl-5">
              <button onClick={scrollToContact} className="btn-primary">Request Our Services</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
