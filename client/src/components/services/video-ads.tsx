import { useQuery } from "@tanstack/react-query";
import { Play, Target, Zap, Sparkles } from "lucide-react";
import { MediaPlayer } from "@/components/ui/media-player";
import { FeatureList } from "@/components/ui/feature-card";
import { StatGrid } from "@/components/ui/stat-card";
import { scrollToContact } from "@/utils/scroll";
import type { DemoVideo } from "@shared/schema";

const FALLBACK_VIDEO = "https://gumlet.tv/watch/694d0e18f1ad267a06552696";

const features = [
  { icon: Play, iconColor: "text-indigo-600", bgColor: "bg-indigo-50", title: "Custom Video Production", description: "Bespoke video campaigns engineered for maximum engagement using cutting-edge AI technology." },
  { icon: Target, iconColor: "text-emerald-600", bgColor: "bg-emerald-50", title: "Audience-Focused Strategy", description: "Data-driven creative variations tailored to your audience segments for higher ROAS." },
  { icon: Zap, iconColor: "text-amber-600", bgColor: "bg-amber-50", title: "Rapid Turnaround", description: "From storyboard to final render in 72 hours. Capture market trends while they're still trending." },
  { icon: Sparkles, iconColor: "text-violet-600", bgColor: "bg-violet-50", title: "Cinematic Excellence", description: "4K resolution, professional color grading, and seamless transitions as standard." },
];

const stats = [
  { label: "Duration", value: "08-10s", color: "text-indigo-600" },
  { label: "Quality", value: "4K", color: "text-emerald-600" },
  { label: "Delivery", value: "72 Hours", color: "text-amber-600" },
];

export default function VideoAds() {
  const { data: demoVideos = [] } = useQuery<DemoVideo[]>({
    queryKey: ["/api/samples/demo-videos"],
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const featuredVideo = demoVideos.filter((v) => v.isPublished).sort((a, b) => a.orderIndex - b.orderIndex)[0];
  const videoUrl = featuredVideo?.videoUrl || FALLBACK_VIDEO;

  return (
    <section id="video-ads" className="section-padding">
      <div className="container-custom">
        <header className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            <span className="gradient-text">Cinematic AI Video Ads</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
            Scroll-stopping, broadcast-quality video advertisements that drive results.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <aside className="order-1">
            <div className="bg-gradient-to-br from-indigo-50/80 to-slate-50/80 rounded-3xl p-5 sm:p-6 border border-indigo-100/50">
              <div className="bg-white rounded-2xl p-4 sm:p-5 mb-4 border border-slate-100" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider text-indigo-600">Sample Work</h4>
                <MediaPlayer src={videoUrl} poster={featuredVideo?.thumbnailUrl || undefined} title={featuredVideo?.title || "AI Video Demo"} />
              </div>
              <StatGrid stats={stats} />
            </div>
          </aside>

          <div className="order-2">
            <FeatureList features={features} />
            <div className="pt-6 pl-5">
              <button onClick={scrollToContact} className="btn-primary">Start Your Project</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
