import { useQuery } from "@tanstack/react-query";
import { Play, Target, Zap, Sparkles } from "lucide-react";
import { MediaPlayer } from "@/components/ui/media-player";
import { FeatureList } from "@/components/ui/feature-card";
import { StatGrid } from "@/components/ui/stat-card";
import { scrollToContact } from "@/utils/scroll";
import type { DemoVideo } from "@shared/schema";

const FALLBACK_VIDEO = "https://gumlet.tv/watch/694d0e18f1ad267a06552696";

const features = [
  { icon: Play, iconColor: "text-blue-600", bgColor: "bg-blue-100", title: "Custom Video Production", description: "We craft bespoke video campaigns engineered for maximum engagement using cutting-edge AI technology." },
  { icon: Target, iconColor: "text-green-600", bgColor: "bg-green-100", title: "Audience-Focused Strategy", description: "Our team creates data-driven creative variations tailored to your audience segments for higher ROAS." },
  { icon: Zap, iconColor: "text-yellow-600", bgColor: "bg-yellow-100", title: "Rapid Turnaround", description: "We deliver from storyboard to final render in 72 hours. Capture market trends while they're still trending." },
  { icon: Sparkles, iconColor: "text-purple-600", bgColor: "bg-purple-100", title: "Cinematic Excellence", description: "Our productions feature 4K resolution, professional color grading, and seamless transitions." }
];

const stats = [
  { label: "Duration", value: "08-10s", color: "text-blue-600" },
  { label: "Quality", value: "4K", color: "text-green-600" },
  { label: "Delivery", value: "72 Hours", color: "text-cyan-600" }
];

export default function VideoAds() {
  const { data: demoVideos = [] } = useQuery<DemoVideo[]>({
    queryKey: ['/api/samples/demo-videos'],
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const featuredVideo = demoVideos.filter(v => v.isPublished).sort((a, b) => a.orderIndex - b.orderIndex)[0];
  const videoUrl = featuredVideo?.videoUrl || FALLBACK_VIDEO;

  return (
    <section id="video-ads" className="section-padding bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/50">
      <div className="container-custom">
        <header className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
            <span className="gradient-text">Cinematic AI Video Ads</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            We create scroll-stopping, broadcast-quality video advertisements that drive results.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <aside className="order-1">
            <div className="service-preview from-blue-100 via-cyan-100 to-sky-100 bg-gradient-to-br">
              <div className="glass-card p-4 sm:p-6 mb-4 sm:mb-6">
                <h4 className="font-bold text-slate-900 mb-3 sm:mb-4 text-base sm:text-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Sample Work</h4>
                <MediaPlayer src={videoUrl} poster={featuredVideo?.thumbnailUrl || undefined} title={featuredVideo?.title || "AI Video Demo"} />
              </div>
              <StatGrid stats={stats} />
            </div>
          </aside>

          <div className="order-2">
            <FeatureList features={features} />
            <div className="pt-4 sm:pt-6">
              <button onClick={scrollToContact} className="btn-primary w-full sm:w-auto">Start Your Project</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}