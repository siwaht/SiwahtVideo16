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
      
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8 py-8 xs:py-12 relative z-10">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-16">
          
          {/* Brand Section - Left */}
          <div className="flex items-start gap-3">
            <img 
              src={siwath_logo_withoutbackground} 
              alt="Siwaht Logo" 
              className="w-8 h-8 flex-shrink-0"
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

          {/* Quick Links - Center */}
          <div className="text-center lg:text-center">
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <nav aria-label="Quick navigation links">
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm block"
                    data-testid="footer-services"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm block"
                    data-testid="footer-contact"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPrivacyPolicy(true);
                    }}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm block"
                    data-testid="footer-privacy"
                    type="button"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Connect With Us - Right */}
          <div className="text-center lg:text-right">
            <h3 className="text-white font-medium mb-4">Connect With Us</h3>
            <div className="flex gap-3 justify-center lg:justify-end">
              {socialLinks.slice(0, 2).map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href} 
                    className="w-10 h-10 bg-slate-800/50 hover:bg-slate-700/70 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 border border-slate-600/30"
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
      
      {/* Privacy Policy Modal */}
      <PrivacyPolicy 
        isOpen={showPrivacyPolicy} 
        onClose={() => setShowPrivacyPolicy(false)} 
      />
    </footer>
  );
}