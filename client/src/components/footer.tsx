import { useState } from "react";
import { Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

import siwath_logo_withoutbackground from "@assets/siwath_logo_withoutbackground.png";
import PrivacyPolicy from "./privacy-policy";

export default function Footer() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
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
    { icon: FaInstagram, href: "https://www.instagram.com/siwahtofficial/", label: "Follow us on Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/13273833", label: "Connect on LinkedIn" },
    { icon: Github, href: "https://github.com/siwahtai", label: "Check our GitHub" },
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@siwahtai.com", href: "mailto:hello@siwahtai.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", href: "#" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-t border-slate-700/50 relative overflow-hidden" role="contentinfo">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8 py-12 xs:py-16 relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={siwath_logo_withoutbackground} 
                alt="Siwaht Logo" 
                className="w-10 h-10"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Siwaht
                </h2>
                <p className="text-slate-400 text-sm">
                  Your Presence, Perfected
                </p>
              </div>
            </div>

            
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Our Services</h3>
            <nav aria-label="Services navigation">
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                    data-testid="footer-video-ads"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full group-hover:bg-white transition-colors"></span>
                    AI Video Ads
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                    data-testid="footer-avatars"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full group-hover:bg-white transition-colors"></span>
                    Realistic Avatars
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                    data-testid="footer-voice"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full group-hover:bg-white transition-colors"></span>
                    Voice Synthesis
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                    data-testid="footer-editing"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full group-hover:bg-white transition-colors"></span>
                    Video Editing
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                    data-testid="footer-podcasts"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full group-hover:bg-white transition-colors"></span>
                    Podcast Production
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
            <nav aria-label="Quick navigation links">
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                    data-testid="footer-services"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full group-hover:bg-white transition-colors"></span>
                    Our Work
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                    data-testid="footer-contact"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full group-hover:bg-white transition-colors"></span>
                    Get Quote
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPrivacyPolicy(true);
                    }}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                    data-testid="footer-privacy"
                    type="button"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full group-hover:bg-white transition-colors"></span>
                    Privacy Policy
                  </button>
                </li>

              </ul>
            </nav>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/siwahtofficial/"
                className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-700 hover:from-pink-500/20 hover:to-purple-500/20 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-slate-600/30 hover:border-pink-500/50"
                aria-label="Follow us on Instagram"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-instagram"
              >
                <FaInstagram className="h-6 w-6" aria-hidden="true" />
              </a>
              <a 
                href="https://www.linkedin.com/company/siwaht/"
                className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-700 hover:from-blue-500/20 hover:to-cyan-500/20 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-slate-600/30 hover:border-blue-500/50"
                aria-label="Connect on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-linkedin"
              >
                <Linkedin className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-16 pt-8">
          <div className="flex justify-center items-center">
            <div className="text-slate-500 text-sm">
              © {currentYear} Siwaht. All rights reserved.
            </div>
          </div>
        </div>
      </div>
      {/* Privacy Policy Modal */}
      <PrivacyPolicy 
        isOpen={showPrivacyPolicy} 
        onClose={() => setShowPrivacyPolicy(false)} 
      />
    </footer>
  );
}