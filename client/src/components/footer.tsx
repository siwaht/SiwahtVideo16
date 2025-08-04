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
    <footer className="bg-slate-900 text-white border-t border-slate-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8 py-8 xs:py-12">
        {/* Main Content - Properly Aligned Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <h2 className="text-2xl xs:text-3xl font-bold gradient-text mb-2">
              Siwaht
            </h2>
            <p className="text-slate-400 text-sm">
              AI-powered video and audio creation solutions
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            {/* Services */}
            <nav aria-label="Services navigation">
              <h3 className="text-sm font-medium text-slate-300 mb-3">Services</h3>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => scrollToSection(service.id)}
                      className="text-slate-400 hover:text-white transition-colors duration-200 text-sm text-left"
                      data-testid={`footer-service-${service.id}`}
                    >
                      {service.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Company */}
            <nav aria-label="Company navigation">
              <h3 className="text-sm font-medium text-slate-300 mb-3">Company</h3>
              <ul className="space-y-2">
                {companyLinks.slice(0, 3).map((link, index) => (
                  <li key={index}>
                    {link.id ? (
                      <button 
                        onClick={() => scrollToSection(link.id)}
                        className="text-slate-400 hover:text-white transition-colors duration-200 text-sm text-left"
                        data-testid={`footer-company-${link.id}`}
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a 
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
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

          {/* Contact & Social - Right Aligned */}
          <div className="lg:col-span-3 flex flex-col gap-4 lg:items-end">
            {/* Contact Button */}
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 text-sm w-fit"
              data-testid="footer-contact-cta"
            >
              Get In Touch
            </button>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href} 
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section - Minimal */}
        <div className="border-t border-slate-800 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs text-center sm:text-left">
              © {currentYear} Siwaht. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs">
              <a href="#privacy" className="text-slate-500 hover:text-slate-300 transition-colors duration-200">
                Privacy
              </a>
              <a href="#terms" className="text-slate-500 hover:text-slate-300 transition-colors duration-200">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}