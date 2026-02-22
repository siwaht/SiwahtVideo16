import { useState } from "react";
import { Linkedin } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import PrivacyPolicy from "./privacy-policy";

export default function Footer() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white relative border-t border-white/10" role="contentinfo">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Siwaht Logo" className="w-10 h-10" loading="lazy" width="40" height="40" />
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white drop-shadow-md">Siwaht</h2>
                <p className="text-white/50 text-sm">Defining Digital Presence</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-5">Services</h3>
            <nav aria-label="Services navigation">
              <ul className="space-y-3">
                {[
                  { label: "AI Video Ads", id: "video-ads" },
                  { label: "Realistic Avatars", id: "avatars" },
                  { label: "Voice Synthesis", id: "voice-synthesis" },
                  { label: "Video Editing", id: "editing" },
                  { label: "AI Agents", id: "interactive-avatars" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-white/50 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-5">Company</h3>
            <nav aria-label="Quick navigation links">
              <ul className="space-y-3">
                <li>
                  <button onClick={() => scrollToSection("services")} className="text-white/50 hover:text-white transition-colors text-sm">
                    Our Work
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="text-white/50 hover:text-white transition-colors text-sm">
                    Get Quote
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowPrivacyPolicy(true)} className="text-white/50 hover:text-white transition-colors text-sm" type="button">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-5">Connect</h3>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/siwahtofficial/"
                className="w-10 h-10 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)]"
                aria-label="Follow us on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/siwaht/"
                className="w-10 h-10 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)]"
                aria-label="Connect on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-14 pt-8">
          <p className="text-center text-white/40 text-sm">
            © {currentYear} Siwaht. All rights reserved.
          </p>
        </div>
      </div>

      <PrivacyPolicy isOpen={showPrivacyPolicy} onClose={() => setShowPrivacyPolicy(false)} />
    </footer>
  );
}
