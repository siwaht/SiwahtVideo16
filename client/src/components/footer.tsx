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
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
          
          {/* Brand Section */}
          <div className="flex items-center gap-3">
            <img 
              src="/attached_assets/siwath_logo_withoutbackground_1754297217184.png" 
              alt="Siwaht Logo" 
              className="w-8 h-8"
            />
            <div>
              <h2 className="text-xl font-bold text-white mb-1">
                Siwaht
              </h2>
              <p className="text-slate-400 text-sm">
                Your Presence, Perfected
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:text-center">
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <nav aria-label="Quick navigation links">
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                    data-testid="footer-services"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                    data-testid="footer-contact"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <a 
                    href="#privacy"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                    data-testid="footer-privacy"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Connect With Us */}
          <div className="lg:text-right">
            <h3 className="text-white font-medium mb-4">Connect With Us</h3>
            <div className="flex gap-3 lg:justify-end">
              {socialLinks.slice(0, 2).map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href} 
                    className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
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

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-6">
          <div className="text-center">
            <p className="text-slate-500 text-sm">
              © {currentYear} Siwaht. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}