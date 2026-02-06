import { MessageSquare, Globe, Brain, Clock } from "lucide-react";
import { FeatureList } from "@/components/ui/feature-card";
import { StatGrid } from "@/components/ui/stat-card";
import { MediaPlayer } from "@/components/ui/media-player";
import { scrollToContact } from "@/utils/scroll";

const features = [
  { icon: MessageSquare, iconColor: "text-indigo-600", bgColor: "bg-indigo-50", title: "Real-Time Conversation", description: "AI avatars that hold natural, fluid conversations with context and intelligence." },
  { icon: Globe, iconColor: "text-teal-600", bgColor: "bg-teal-50", title: "Multi-Language Support", description: "Seamless communication in 50+ languages with native-level fluency." },
  { icon: Brain, iconColor: "text-violet-600", bgColor: "bg-violet-50", title: "Emotion Recognition", description: "Advanced AI that detects and responds to emotional cues for empathetic interactions." },
  { icon: Clock, iconColor: "text-amber-600", bgColor: "bg-amber-50", title: "24/7 Availability", description: "Always-on avatars ready to engage customers and provide support around the clock." },
];

const useCases = ["Customer Support", "Sales & Marketing", "Training & Education", "Virtual Reception"];

const demoVideoUrl = "https://play.gumlet.io/embed/69609dc7525cbb35561fd5a8?autoplay=true&preload=true&loop=true";

export default function InteractiveAIAvatars() {
  return (
    <section
      id="interactive-avatars"
      className="section-padding"
      aria-labelledby="interactive-avatars-heading"
    >
      <div className="container-custom">
        <header className="text-center mb-12 lg:mb-16">
          <h2
            id="interactive-avatars-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight"
          >
            <span className="gradient-text">Interactive AI Avatars</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
            Lifelike AI avatars that converse naturally and deliver personalized experiences 24/7.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <aside className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-violet-50/80 to-indigo-50/80 rounded-3xl p-5 sm:p-6 border border-violet-100/50">
              <div className="bg-white rounded-2xl p-4 sm:p-5 mb-4 border border-slate-100" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-violet-600 mb-3">Sample Work</h4>
                <MediaPlayer type="video" src={demoVideoUrl} title="AI Avatar Demo" />
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 mb-4 border border-slate-100" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-violet-600 mb-3">Ideal For</h4>
                <div className="flex flex-wrap gap-2">
                  {useCases.map((useCase) => (
                    <span
                      key={useCase}
                      className="px-3 py-1.5 bg-violet-50 text-violet-700 rounded-full text-sm font-medium border border-violet-100"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              <StatGrid
                stats={[
                  { label: "Languages", value: "50+", color: "text-violet-600" },
                  { label: "Response", value: "< 1s", color: "text-teal-600" },
                  { label: "Uptime", value: "99.9%", color: "text-indigo-600" },
                ]}
              />
            </div>
          </aside>

          <div className="order-2 lg:order-1">
            <FeatureList features={features} />
            <div className="pt-6 pl-5">
              <button
                onClick={scrollToContact}
                className="btn-primary"
                data-testid="interactive-avatars-cta"
                aria-label="Get started with Interactive AI Avatars"
              >
                Request Our Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
