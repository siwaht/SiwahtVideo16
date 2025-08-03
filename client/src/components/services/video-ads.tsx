import { Wand2, Palette, TrendingUp } from "lucide-react";

export default function VideoAds() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="video-ads" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            AI Video Ad Creation
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Create compelling video advertisements that convert. Our AI analyzes your brand and generates high-performing ad content automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Wand2 className="text-primary h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Smart Script Generation</h3>
                <p className="text-slate-600">AI analyzes your product and target audience to create compelling scripts that drive conversions.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Palette className="text-secondary h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Brand-Aligned Visuals</h3>
                <p className="text-slate-600">Automatically generate visuals that match your brand guidelines and aesthetic preferences.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <TrendingUp className="text-accent h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Performance Optimization</h3>
                <p className="text-slate-600">Built-in A/B testing and performance analytics to maximize your ad effectiveness.</p>
              </div>
            </div>

            <button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Create Your First Ad
            </button>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
                <h4 className="font-semibold text-slate-900 mb-4">Video Ad Preview</h4>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center mb-2 mx-auto">
                      <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
                    </div>
                    <p className="text-sm opacity-80">AI-Generated Video Preview</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Engagement</span>
                    <span className="text-lg font-bold text-green-600">94%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Conversion</span>
                    <span className="text-lg font-bold text-blue-600">87%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
