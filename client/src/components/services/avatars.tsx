import { useQuery } from "@tanstack/react-query";
import { User, Sparkles, Settings, Download } from "lucide-react";
import { MediaPlayer } from "@/components/ui/media-player";
import type { Avatar } from "@shared/schema";

export default function Avatars() {
  // Fetch avatars from API
  const { data: avatars = [], isLoading, error } = useQuery<Avatar[]>({
    queryKey: ['/api/samples/avatars'],
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  // Get the first published avatar for preview, sorted by order index
  const publishedAvatars = avatars
    .filter(avatar => avatar.isPublished)
    .sort((a, b) => a.orderIndex - b.orderIndex);
  const featuredAvatar = publishedAvatars[0];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: User,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      title: "Photorealistic Generation",
      description: "Micro-gestures and subtle expressions captured with unprecedented fidelity for true human connection."
    },
    {
      icon: Sparkles,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      title: "Brand Personality",
      description: "Custom-designed avatars that embody your brand's voice, tone, and values in every interaction."
    },
    {
      icon: Settings,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-100",
      title: "Deep Customization",
      description: "Control everything from age and ethnicity to wardrobe style and microscopic facial details."
    },
    {
      icon: Download,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
      title: "Omnichannel Ready",
      description: "Deploy your digital humans across web, mobile, VR, and AR platforms with optimized asset pipelines."
    }
  ];

  return (
    <section
      id="avatars"
      className="section-padding bg-gradient-to-br from-sky-50/50 via-white to-blue-50/30"
      aria-labelledby="avatars-heading"
    >
      <div className="container-custom">
        <header className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2
            id="avatars-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-4 sm:mb-6"
          >
            <span className="gradient-text">Hyper-Realistic Avatars</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Digital humans so lifelike they bypass the uncanny valley. Perfect for 24/7 customer support and brand ambassadorship.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Features */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article key={index} className="feature-card">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`feature-icon ${feature.bgColor} icon-gradient flex-shrink-0`}>
                      <Icon className={`${feature.iconColor} h-5 w-5 sm:h-6 sm:w-6`} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="pt-4 sm:pt-6">
              <button
                onClick={scrollToContact}
                className="btn-secondary w-full sm:w-auto"
                data-testid="avatars-cta"
                aria-label="Start creating realistic avatars"
              >
                Order Custom Avatars
              </button>
            </div>
          </div>

          {/* Avatar Preview */}
          <aside className="order-1 lg:order-2">
            <div className="service-preview from-sky-100 via-blue-100 to-cyan-100 bg-gradient-to-br">
              <div className="glass-card p-4 sm:p-6 mb-4 sm:mb-6">
                <h4 className="font-bold text-slate-900 mb-3 sm:mb-4 text-base sm:text-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Avatar Studio</h4>

                <div className="aspect-square max-w-sm mx-auto">
                  <MediaPlayer
                    src="https://gumlet.tv/watch/695b67d6b8291f84b73fab34"
                    title="AI Avatar Demo"
                    gifLike={true}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="glass-card p-2 sm:p-3 text-center">
                  <div className="text-xs font-medium text-slate-600 mb-1">Quality</div>
                  <div className="text-sm font-bold text-blue-600">4K</div>
                </div>
                <div className="glass-card p-2 sm:p-3 text-center">
                  <div className="text-xs font-medium text-slate-600 mb-1">Expressions</div>
                  <div className="text-sm font-bold text-cyan-600">50+</div>
                </div>
                <div className="glass-card p-2 sm:p-3 text-center">
                  <div className="text-xs font-medium text-slate-600 mb-1">Styles</div>
                  <div className="text-sm font-bold text-emerald-600">500+</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}