import { User, Sparkles, Settings, Download } from "lucide-react";
import { MediaPlayer } from "@/components/ui/media-player";
import { FeatureList } from "@/components/ui/feature-card";
import { StatGrid } from "@/components/ui/stat-card";
import { scrollToContact } from "@/utils/scroll";

const features = [
  { icon: User, iconColor: "text-blue-600", bgColor: "bg-blue-100", title: "Photorealistic Generation", description: "Micro-gestures and subtle expressions captured with unprecedented fidelity." },
  { icon: Sparkles, iconColor: "text-purple-600", bgColor: "bg-purple-100", title: "Brand Personality", description: "Custom avatars that embody your brand's voice, tone, and values." },
  { icon: Settings, iconColor: "text-emerald-600", bgColor: "bg-emerald-100", title: "Deep Customization", description: "Control age, ethnicity, wardrobe style, and facial details." },
  { icon: Download, iconColor: "text-orange-600", bgColor: "bg-orange-100", title: "Omnichannel Ready", description: "Deploy across web, mobile, VR, and AR platforms." }
];

const stats = [
  { label: "Quality", value: "4K", color: "text-blue-600" },
  { label: "Expressions", value: "50+", color: "text-cyan-600" },
  { label: "Styles", value: "500+", color: "text-emerald-600" }
];

export default function Avatars() {
  return (
    <section id="avatars" className="section-padding bg-gradient-to-br from-sky-50/50 via-white to-blue-50/30">
      <div className="container-custom">
        <header className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            <span className="gradient-text">Hyper-Realistic Avatars</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            Digital humans so lifelike they bypass the uncanny valley.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="order-2 lg:order-1">
            <FeatureList features={features} />
            <div className="pt-4 sm:pt-6">
              <button onClick={scrollToContact} className="btn-secondary w-full sm:w-auto">
                Order Custom Avatars
              </button>
            </div>
          </div>

          <aside className="order-1 lg:order-2">
            <div className="service-preview from-sky-100 via-blue-100 to-cyan-100 bg-gradient-to-br">
              <div className="glass-card p-4 sm:p-6 mb-4 sm:mb-6">
                <h4 className="font-bold text-slate-900 mb-3 text-base sm:text-lg">Avatar Studio</h4>
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
