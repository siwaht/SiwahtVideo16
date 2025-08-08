import { useQuery } from "@tanstack/react-query";
import { Mic, Languages, Volume2, Download } from "lucide-react";
import type { VoiceSample } from "@shared/schema";

export default function VoiceSynthesis() {
  // Fetch voice samples from API
  const { data: voiceSamples = [], isLoading, error } = useQuery<VoiceSample[]>({
    queryKey: ['/api/samples/voice-samples'],
    refetchOnWindowFocus: true,
    staleTime: 0, // Always fetch fresh data
  });

  // Get the first published voice sample for preview, sorted by order index
  const publishedVoices = voiceSamples
    .filter(voice => voice.isPublished)
    .sort((a, b) => a.orderIndex - b.orderIndex);
  const featuredVoice = publishedVoices[0];

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('Voice Synthesis Debug:', { 
      voiceSamples: voiceSamples.length, 
      publishedVoices: publishedVoices.length, 
      featuredVoice: featuredVoice?.name || 'none',
      isLoading,
      error 
    });
  }

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Mic,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      title: "Natural AI Voices",
      description: "Generate incredibly realistic speech that's indistinguishable from human voice recordings."
    },
    {
      icon: Languages,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-100",
      title: "Multi-Language Support",
      description: "Create voice content in over 50 languages with native pronunciation and cultural nuances."
    },
    {
      icon: Volume2,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      title: "Voice Customization",
      description: "Fine-tune pitch, speed, tone, and emotion to match your exact requirements."
    },
    {
      icon: Download,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
      title: "Professional Output",
      description: "Export high-quality audio files ready for podcasts, videos, and commercial use."
    }
  ];

  return (
    <section 
      id="voice-synthesis" 
      className="section-padding bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/40"
      aria-labelledby="voice-synthesis-heading"
    >
      <div className="container-custom">
        <header className="text-center mb-16 xs:mb-20">
          <h2 
            id="voice-synthesis-heading"
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 xs:mb-8 text-shadow"
          >
            <span className="gradient-text">Voice Synthesis</span>
          </h2>
          <p className="text-xl xs:text-2xl lg:text-3xl text-slate-600 max-w-5xl mx-auto leading-relaxed px-2">
            Transform text into lifelike speech with AI-powered voice generation. Perfect for any audio content needs.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Features */}
          <div className="space-y-8 xs:space-y-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article 
                  key={index}
                  className="feature-card hover-lift"
                >
                  <div className="flex items-start space-x-4 xs:space-x-6">
                    <div className={`feature-icon ${feature.bgColor} icon-gradient`}>
                      <Icon className={`${feature.iconColor} h-6 w-6 xs:h-7 xs:w-7`} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl xs:text-2xl font-bold text-slate-900 mb-3 text-shadow">{feature.title}</h3>
                      <p className="text-slate-600 text-base xs:text-lg leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="pt-6 xs:pt-8">
              <button 
                onClick={scrollToContact}
                className="btn-secondary w-full xs:w-auto text-lg xs:text-xl px-10 py-5"
                data-testid="voice-synthesis-cta"
                aria-label="Start creating voice synthesis"
              >
                Generate Voices
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}