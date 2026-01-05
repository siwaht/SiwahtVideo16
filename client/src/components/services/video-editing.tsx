import { useQuery } from "@tanstack/react-query";
import { Scissors, Layers, Zap, Sparkles } from "lucide-react";
import { MediaPlayer } from "@/components/ui/media-player";
import type { EditedVideo } from "@shared/schema";

export default function VideoEditing() {
  // Fetch edited videos from API
  const { data: editedVideos = [], isLoading, error } = useQuery<EditedVideo[]>({
    queryKey: ['/api/samples/edited-videos'],
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  // Get the first published edited video for preview, sorted by order index
  const publishedEditedVideos = editedVideos
    .filter(video => video.isPublished)
    .sort((a, b) => a.orderIndex - b.orderIndex);
  const featuredEditedVideo = publishedEditedVideos[0];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Scissors,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "Intelligent Narrative Assembly",
      description: "Our AI understands story arcs, automatically assembling footage to create compelling, coherent narratives."
    },
    {
      icon: Layers,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      title: "Cinematic VFX Integration",
      description: "Seamlessly integrate industry-standard visual effects and transitions tailored to your brand's aesthetic."
    },
    {
      icon: Zap,
      iconColor: "text-accent",
      bgColor: "bg-accent/10",
      title: "Hyper-Fast Rendering",
      description: "Experience lightning-fast turnaround times with our distributed, GPU-accelerated rendering cloud."
    },
    {
      icon: Sparkles,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
      title: "Automated Color Grading",
      description: "Achieve the 'film look' instantly with AI that balances color, exposure, and tone across all shots."
    }
  ];

  return (
    <section
      id="editing"
      className="section-padding bg-gradient-to-br from-slate-100 to-orange-50"
      aria-labelledby="editing-heading"
    >
      <div className="container-custom">
        <header className="text-center mb-12 sm:mb-16">
          <h2
            id="editing-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-4 sm:mb-6"
          >
            <span className="gradient-text">Algorithmic Post-Production</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            From raw footage to cinematic masterpiece in record time. Our AI pipeline handles cutting, grading, and effects with surgical precision.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-16 items-center">
          {/* Video Editor Preview */}
          <aside className="relative order-1 lg:order-1 w-full">
            <div className="bg-gradient-to-br from-orange-100 to-red-200 rounded-2xl p-3 xs:p-4 sm:p-6 md:p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-3 xs:p-4 sm:p-6 mb-3 xs:mb-4 sm:mb-6 shadow-lg">
                <h4 className="font-semibold text-slate-900 mb-2 xs:mb-3 sm:mb-4 text-base xs:text-lg sm:text-xl">AI Video Editor</h4>

                <div className="video-container bg-gradient-to-br from-slate-800 to-slate-900 min-h-[200px] xs:min-h-[250px] sm:min-h-[300px]">
                  <MediaPlayer
                    src="https://gumlet.tv/watch/695b78ac143ef68b1070a48e"
                    title="AI Video Editor Demo"
                    gifLike={true}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4">
                <div className="bg-white rounded-lg p-2 xs:p-3 sm:p-4 shadow-md text-center">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Turnaround</div>
                  <div className="text-sm xs:text-base sm:text-lg font-bold text-orange-600">72 Hours</div>
                </div>
                <div className="bg-white rounded-lg p-2 xs:p-3 sm:p-4 shadow-md text-center">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Quality</div>
                  <div className="text-sm xs:text-base sm:text-lg font-bold text-green-600">4K HDR</div>
                </div>
                <div className="bg-white rounded-lg p-2 xs:p-3 sm:p-4 shadow-md text-center">
                  <div className="text-xs xs:text-sm font-medium text-slate-600 mb-1">Format</div>
                  <div className="text-sm xs:text-base sm:text-lg font-bold text-blue-600">Any</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Features */}
          <div className="space-y-6 xs:space-y-8 order-2 lg:order-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article
                  key={index}
                  className="flex items-start space-x-3 xs:space-x-4 p-3 xs:p-4 rounded-xl hover:bg-white/50 transition-colors duration-200"
                >
                  <div className={`w-10 h-10 xs:w-12 xs:h-12 ${feature.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                    <Icon className={`${feature.iconColor} h-5 w-5 xs:h-6 xs:w-6`} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg xs:text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm xs:text-base leading-relaxed">{feature.description}</p>
                  </div>
                </article>
              );
            })}

            <div className="pt-4 xs:pt-6">
              <button
                onClick={scrollToContact}
                className="w-full xs:w-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 xs:px-8 py-3 xs:py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1 text-center"
                data-testid="editing-cta"
                aria-label="Start AI video editing"
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