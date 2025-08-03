import { Mic, Headphones, Radio, Zap, Clock, Users } from "lucide-react";

export default function PodcastProduction() {
  const features = [
    {
      icon: Mic,
      title: "Script to Audio",
      description: "We transform your written content into professional-quality podcast episodes using advanced AI narration"
    },
    {
      icon: Headphones,
      title: "Audio Enhancement",
      description: "Our team applies professional noise reduction, EQ optimization, and mastering for broadcast-ready sound"
    },
    {
      icon: Radio,
      title: "Multi-Voice Production",
      description: "We create dynamic conversations with multiple AI voices and natural dialogue flow for your brand"
    },
    {
      icon: Zap,
      title: "Rapid Turnaround",
      description: "Our streamlined process delivers finished episodes from script to publication in record time"
    },
    {
      icon: Clock,
      title: "Content Strategy",
      description: "We manage your podcast release schedule and distribution across all major platforms"
    },
    {
      icon: Users,
      title: "Performance Optimization",
      description: "Our analytics team tracks engagement metrics and optimizes content for better listener retention"
    }
  ];

  return (
    <section id="podcast-production" className="py-24 bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-800 text-sm font-medium mb-6">
            <Mic className="w-4 h-4 mr-2" />
            AI Podcast Production
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Professional Podcast Production Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We handle your podcast workflow from script to distribution. Our team helps you engage your audience with high-quality audio content, without the studio hassle.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Features */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="ml-4 text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Demo/Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-200">
              <div className="space-y-6">
                {/* Podcast Interface Mockup */}
                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <Radio className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Episode 42: AI in Business</h4>
                    <p className="text-sm text-gray-600">Ready for upload • 24:30 duration</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>

                {/* Audio Waveform Visualization */}
                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">Audio Processing</span>
                    <span className="text-sm text-purple-600 font-medium">95% Complete</span>
                  </div>
                  <div className="flex items-end space-x-1 h-16">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-gradient-to-t from-purple-400 to-purple-600 rounded-full transition-all duration-300 ${
                          i < 38 ? 'opacity-100' : 'opacity-30'
                        }`}
                        style={{
                          height: `${Math.random() * 60 + 20}%`,
                          animationDelay: `${i * 50}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Publishing Status */}
                <div className="space-y-3">
                  {[
                    { platform: "Spotify", status: "Published", color: "green" },
                    { platform: "Apple Podcasts", status: "Publishing...", color: "yellow" },
                    { platform: "Google Podcasts", status: "Queued", color: "gray" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{item.platform}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.color === 'green' ? 'bg-green-100 text-green-800' :
                        item.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-200 rounded-full blur-xl opacity-60"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-200 rounded-full blur-xl opacity-40"></div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Partner with SiwahtAI for Podcasts?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced team delivers professional podcast production with cutting-edge AI technology and personalized service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Fast Turnaround</h4>
              <p className="text-gray-600">
                Our efficient production process delivers high-quality podcast episodes in a fraction of traditional time
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Studio-Quality Audio</h4>
              <p className="text-gray-600">
                Our audio engineers ensure broadcast-ready sound with professional enhancement and mastering
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Radio className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Full-Service Management</h4>
              <p className="text-gray-600">
                We handle distribution to all major podcast platforms and manage your content strategy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}