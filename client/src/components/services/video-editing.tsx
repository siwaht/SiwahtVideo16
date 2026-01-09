import { Scissors, Layers, Zap, Sparkles } from "lucide-react";
import { MediaPlayer } from "@/components/ui/media-player";
import { FeatureList } from "@/components/ui/feature-card";
import { StatGrid } from "@/components/ui/stat-card";
import { scrollToContact } from "@/utils/scroll";

const features = [
  { icon: Scissors, iconColor: "text-primary", bgColor: "bg-primary/10", title: "Intelligent Narrative Assembly", description: "AI understands story arcs, assembling footage into compelling narratives." },
  { icon: Layers, iconColor: "text-secondary", bgColor: "bg-secondary/10", title: "Cinematic VFX Integration", description: "Industry-standard visual effects tailored to your brand's aesthetic." },
  { icon: Zap, iconColor: "text-accent", bgColor: "bg-accent/10", title: "Hyper-Fast Rendering", description: "Lightning-fast turnaround with GPU-accelerated rendering cloud." },
  { icon: Sparkles, iconColor: "text-orange-600", bgColor: "bg-orange-100", title: "Automated Color Grading", description: "AI balances color, exposure, and tone across all shots." }
];

const stats = [
  { label: "Turnaround", value: "72 Hours", color: "text-orange-600" },
  { label: "Quality", value: "4K HDR", color: "text-green-600" },
  { label: "Format", value: "Any", color: "text-blue-600" }
];


export default function VideoEditing() {
  return (
    <section id="editing" className="section-padding bg-gradient-to-br from-slate-100 to-orange-50">
      <div className="container-custom">
        <header className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            <span className="gradient-text">Algorithmic Post-Production</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            From raw footage to cinematic masterpiece in record time.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <aside className="order-1">
            <div className="bg-gradient-to-br from-orange-100 to-red-200 rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg">
                <h4 className="font-semibold text-slate-900 mb-3 text-base sm:text-lg">AI Video Editor</h4>
                <MediaPlayer src="https://gumlet.tv/watch/695b78ac143ef68b1070a48e" title="AI Video Editor Demo" />
              </div>
              <StatGrid stats={stats} />
            </div>
          </aside>

          <div className="order-2">
            <FeatureList features={features} />
            <div className="pt-4 sm:pt-6">
              <button onClick={scrollToContact} className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all">
                Request Our Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
