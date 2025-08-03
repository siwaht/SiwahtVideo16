import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Creative Director",
      company: "TechFlow",
      avatar: "SC",
      rating: 5,
      quote: "SiwahtAI transformed our video marketing strategy. What used to take weeks now takes hours, and the quality is exceptional. Our engagement rates increased by 300%.",
      color: "from-purple-600 to-blue-600"
    },
    {
      name: "Marcus Rodriguez",
      title: "Marketing Manager",
      company: "InnovateCorp",
      avatar: "MR",
      rating: 5,
      quote: "The AI avatars are incredibly realistic. Our customers love the personalized video messages, and it's revolutionized how we communicate with our audience.",
      color: "from-pink-600 to-purple-600"
    },
    {
      name: "Emily Johnson",
      title: "Content Creator",
      company: "DigitalStorm",
      avatar: "EJ",
      rating: 5,
      quote: "I've produced more high-quality content in the past month than in the entire previous year. The AI voice synthesis is so natural, my audience can't tell the difference.",
      color: "from-blue-600 to-cyan-600"
    }
  ];

  const clientLogos = [
    { name: "TechFlow", logo: "TF" },
    { name: "InnovateCorp", logo: "IC" },
    { name: "DigitalStorm", logo: "DS" },
    { name: "CreativeHub", logo: "CH" },
    { name: "NextGen", logo: "NG" },
    { name: "FutureTech", logo: "FT" }
  ];

  return (
    <section 
      className="py-12 xs:py-16 md:py-20 lg:py-24 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          hsl(0, 0%, 100%) 0%, 
          hsl(265, 85%, 98%) 25%, 
          hsl(320, 100%, 98%) 50%,
          hsl(0, 0%, 100%) 100%)`
      }}
      aria-labelledby="testimonials-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8 relative z-10">
        {/* Client Logos Section */}
        <div className="text-center mb-16 xs:mb-20">
          <p className="text-slate-600 font-medium mb-8 text-sm xs:text-base tracking-wide uppercase">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 xs:gap-8 lg:gap-12">
            {clientLogos.map((client, index) => (
              <div 
                key={index}
                className="w-16 h-16 xs:w-20 xs:h-20 glass-effect rounded-2xl flex items-center justify-center text-slate-700 font-bold text-lg xs:text-xl hover:scale-110 transition-transform duration-200"
              >
                {client.logo}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Header */}
        <header className="text-center mb-12 xs:mb-16">
          <h2 
            id="testimonials-heading"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 xs:mb-6"
          >
            What Our Clients Say
          </h2>
          <p className="text-lg xs:text-xl lg:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed px-2 font-light">
            Discover how leading brands are transforming their content creation with our AI solutions.
          </p>
        </header>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
          {testimonials.map((testimonial, index) => (
            <article 
              key={index}
              className="luxury-card p-6 xs:p-8 text-center group relative overflow-hidden"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="h-8 w-8 text-primary" />
              </div>

              {/* Avatar */}
              <div className="mb-6">
                <div 
                  className={`w-16 h-16 xs:w-20 xs:h-20 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg xs:text-xl mx-auto mb-4 shadow-lg`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg xs:text-xl">{testimonial.name}</h3>
                  <p className="text-slate-600 text-sm xs:text-base">{testimonial.title}</p>
                  <p className="text-primary font-medium text-sm">{testimonial.company}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-slate-700 text-base xs:text-lg leading-relaxed italic">
                "{testimonial.quote}"
              </blockquote>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 xs:mt-16">
          <div className="inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full mb-6 text-slate-700 text-sm font-medium">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            Join 500+ satisfied clients
          </div>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8 text-base xs:text-lg">
            Ready to see similar results for your brand? Let's discuss how our AI solutions can transform your content strategy.
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="luxury-button text-white px-8 xs:px-10 py-4 xs:py-5 rounded-2xl font-semibold"
            data-testid="testimonials-cta"
          >
            Start Your Success Story
          </button>
        </div>
      </div>
    </section>
  );
}