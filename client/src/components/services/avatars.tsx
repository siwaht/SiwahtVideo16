import { User, Sparkles, Settings, Download } from "lucide-react";
import { MediaPlayer } from "@/components/ui/media-player";
import { FeatureList } from "@/components/ui/feature-card";
import { StatGrid } from "@/components/ui/stat-card";
import { scrollToContact } from "@/utils/scroll";

const features = [
  { icon: User, iconColor: "text-indigo-600", bgColor: "bg-indigo-50", title: "Photorealistic Quality", description: "Micro-gestures and subtle expressions captured with unprecedented fidelity." },
  { icon: Sparkles, iconColor: "text-violet-600", bgColor: "bg-violet-50", title: "Brand Alignment", description: "Custom avatars that embody your brand's voice, tone, and values." },
  { icon: Settings, iconColor: "text-teal-600", bgColor: "bg-teal-50", title: "Full Customization", description: "Complete control over age, ethnicity, wardrobe style, and facial details." },
  { icon: Download, iconColor: "text-amber-600", bgColor: "bg-amber-50", title: "Multi-Platform Delivery", description: "Assets ready for web, mobile, VR, and AR platforms." },
];

const stats = [
  { label: "Quality", value: "4K", color: "text-indigo-600" },
  { label: "Expressions", value: "50+", color: "text-violet-600" },
  { label: "Styles", value: "500+", color: "text-teal-600" },
];

export default function Avatars() {
  return (
    <section id="avatars" className="section-padding bg-slate-50/50">
      <div className="container-custom">
        <header className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            <span className="gradient-text">Hyper-Realistic Avatars</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
            Digital humans so lifelike they bypass the uncanny valley.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="order-2 lg:order-1">
            <FeatureList features={features} />
            <div className="pt-6 pl-5">
              <button onClick={scrollToContact} className="btn-secondary">Order Custom Avatars</button>
            </div>
          </div>

          <aside className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-violet-50/80 to-slate-50/80 rounded-3xl p-5 sm:p-6 border border-violet-100/50">
              <div className="bg-white rounded-2xl p-4 sm:p-5 mb-4 border border-slate-100" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-violet-600 mb-3">Sample Work</h4>
                <MediaPlayer src="https://gumlet.tv/watch/695b78acb8291f84b740c85d" title="AI Avatar Demo" />
              </div>
              <StatGrid stats={stats} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
