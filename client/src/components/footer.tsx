import { Twitter, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    { name: "AI Video Ads", id: "video-ads" },
    { name: "AI Avatars", id: "avatars" },
    { name: "Voice Synthesis", id: "voice" },
    { name: "Video Editing", id: "editing" },
    { name: "Podcast Production", id: "podcast" },
  ];

  const companyLinks = [
    { name: "About Us", href: "#about" },
    { name: "Careers", href: "#careers" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Contact", id: "contact" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/siwahtai", label: "Follow us on Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/siwahtai", label: "Connect on LinkedIn" },
    { icon: Github, href: "https://github.com/siwahtai", label: "Check our GitHub" },
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@siwahtai.com", href: "mailto:hello@siwahtai.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", href: "#" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8 py-12 xs:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xs:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4 xs:mb-6">
              <h2 className="text-2xl xs:text-3xl font-bold gradient-text">
                SiwahtAI
              </h2>
            </div>
            <p className="text-slate-300 mb-4 xs:mb-6 text-sm xs:text-base leading-relaxed">
              Empowering creators with cutting-edge AI technology for video, audio, and content creation. Transform your ideas into reality with our advanced AI solutions.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 xs:space-y-3 mb-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a 
                    key={index}
                    href={info.href}
                    className="flex items-center text-slate-300 hover:text-white transition-colors duration-200 text-sm xs:text-base"
                    aria-label={`Contact us: ${info.text}`}
                  >
                    <Icon className="h-4 w-4 xs:h-5 xs:w-5 mr-2 xs:mr-3 flex-shrink-0" aria-hidden="true" />
                    {info.text}
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 xs:space-x-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href} 
                    className="text-slate-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-slate-800"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5 xs:h-6 xs:w-6" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg xs:text-xl font-semibold mb-4 xs:mb-6 text-white">Our Services</h3>
            <nav aria-label="Services navigation">
              <ul className="space-y-2 xs:space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => scrollToSection(service.id)}
                      className="text-slate-300 hover:text-white transition-colors duration-200 text-left text-sm xs:text-base hover:underline focus:underline focus:outline-none"
                      data-testid={`footer-service-${service.id}`}
                    >
                      {service.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg xs:text-xl font-semibold mb-4 xs:mb-6 text-white">Company</h3>
            <nav aria-label="Company navigation">
              <ul className="space-y-2 xs:space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    {link.id ? (
                      <button 
                        onClick={() => scrollToSection(link.id)}
                        className="text-slate-300 hover:text-white transition-colors duration-200 text-left text-sm xs:text-base hover:underline focus:underline focus:outline-none"
                        data-testid={`footer-company-${link.id}`}
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a 
                        href={link.href}
                        className="text-slate-300 hover:text-white transition-colors duration-200 text-sm xs:text-base hover:underline focus:underline"
                        data-testid={`footer-company-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Newsletter/CTA */}
          <div>
            <h3 className="text-lg xs:text-xl font-semibold mb-4 xs:mb-6 text-white">Stay Updated</h3>
            <p className="text-slate-300 mb-4 xs:mb-6 text-sm xs:text-base">
              Get the latest AI innovations and updates delivered to your inbox.
            </p>
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-4 xs:px-6 py-2 xs:py-3 rounded-lg font-semibold transition-all duration-200 text-sm xs:text-base"
              data-testid="footer-newsletter-cta"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 xs:mt-12 pt-6 xs:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-slate-400 text-xs xs:text-sm text-center sm:text-left">
              © {currentYear} SiwahtAI. All rights reserved. Powered by cutting-edge artificial intelligence.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 xs:gap-6 text-xs xs:text-sm">
              <a href="#privacy" className="text-slate-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="text-slate-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#cookies" className="text-slate-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}