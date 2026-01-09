import { MessageSquare, Globe, Brain, Clock } from "lucide-react";
import { FeatureList } from "@/components/ui/feature-card";
import { StatGrid } from "@/components/ui/stat-card";
import { MediaPlayer } from "@/components/ui/media-player";
import { scrollToContact } from "@/utils/scroll";

export default function InteractiveAIAvatars() {
  const features = [
    {
      icon: MessageSquare,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "Real-Time Conversation",
      description: "Natural, fluid conversations with AI avatars that understand context and respond intelligently in real-time."
    },
    {
      icon: Globe,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      title: "Multi-Language Intelligence",
      description: "Communicate seamlessly in 50+ languages with native-level fluency and cultural awareness."
    },
    {
      icon: Brain,
      iconColor: "text-accent",
      bgColor: "bg-accent/10",
      title: "Emotion Recognition",
      description: "Advanced AI that detects and responds to emotional cues, creating more empathetic interactions."
    },
    {
      icon: Clock,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      title: "24/7 Availability",
      description: "Always-on AI avatars ready to engage customers, answer questions, and provide support around the clock."
    }
  ];

  const useCases = [
    "Customer Support",
    "Sales & Marketing", 
    "Training & Education",
    "Virtual Reception"
  ];

  // Fallback demo video URL
  const demoVideoUrl = "https://play.gumlet.io/embed/69609dc7525cbb35561fd5a8?autoplay=true&preload=true&loop=true";

  return (
    <section
      id="interactive-avatars"
      className="section-padding bg-gradient-to-br from-purple-50 to-indigo-50"
      aria-labelledby="interactive-avatars-heading"
    >
      <div className="container-custom">
        <header className="text-center mb-12 sm:mb-16">
          <h2
            id="interactive-avatars-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-4 sm:mb-6"
          >
            <span className="gradient-text">Interactive AI Avatars</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Engage your audience with lifelike AI avatars that converse naturally, understand emotions, and deliver personalized experiences 24/7.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-16 items-center">
          <aside className="relative order-1 lg:order-2 w-full">
            <div className="bg-gradient-to-br from-purple-100 to-indigo-200 rounded-2xl p-3 xs:p-4 sm:p-6 md:p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-3 xs:p-4 sm:p-6 mb-3 xs:mb-4 sm:mb-6 shadow-lg">
                <h4 className="font-semibold text-slate-900 mb-2 xs:mb-3 sm:mb-4 text-base xs:text-lg sm:text-xl">Interactive Demo</h4>
                <MediaPlayer type="video" src={demoVideoUrl} title="AI Avatar Demo" />
              </div>

              <div className="bg-white rounded-xl p-3 xs:p-4 sm:p-6 mb-3 xs:mb-4 sm:mb-6 shadow-lg">
                <h4 className="font-semibold text-slate-900 mb-3 text-base sm:text-lg">Perfect For</h4>
                <div className="flex flex-wrap gap-2">
                  {useCases.map((useCase, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              <StatGrid stats={[
                { label: "Languages", value: "50+", color: "text-purple-600" },
                { label: "Response", value: "< 1s", color: "text-green-600" },
                { label: "Uptime", value: "99.9%", color: "text-blue-600" }
              ]} />
            </div>
          </aside>

          <div className="space-y-6 xs:space-y-8 order-2 lg:order-1">
            <FeatureList features={features} />

            <div className="pt-4 xs:pt-6">
              <button
                onClick={scrollToContact}
                className="w-full xs:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 xs:px-8 py-3 xs:py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1 text-center"
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
