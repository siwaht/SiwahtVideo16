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
    <footer className="bg-slate-50/50 backdrop-blur-xl border-t border-slate-200/50 text-slate-600 relative overflow-hidden mt-20" role="contentinfo">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div
              className="flex items-center gap-3 mb-4 group cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img src="/logo.png" alt="Siwaht Logo" className="w-10 h-10 transition-transform duration-700 group-hover:rotate-[360deg] group-hover:scale-110" loading="lazy" width="40" height="40" />
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Siwaht</h2>
                <p className="text-slate-500 text-sm font-medium mt-0.5">Defining Digital Presence</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5">Services</h3>
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
                      className="text-slate-500 hover:text-primary transition-colors duration-200 text-sm font-medium hover:translate-x-1 inline-block transform"
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
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5">Company</h3>
            <nav aria-label="Quick navigation links">
              <ul className="space-y-3">
                <li>
                  <button onClick={() => scrollToSection("services")} className="text-slate-500 hover:text-primary transition-colors duration-200 text-sm font-medium hover:translate-x-1 inline-block transform">
                    Our Work
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="text-slate-500 hover:text-primary transition-colors duration-200 text-sm font-medium hover:translate-x-1 inline-block transform">
                    Get Quote
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowPrivacyPolicy(true)} className="text-slate-500 hover:text-primary transition-colors duration-200 text-sm font-medium hover:translate-x-1 inline-block transform" type="button">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5">Connect</h3>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/siwahtofficial/"
                className="w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-500 hover:text-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md shadow-sm"
                aria-label="Follow us on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/siwaht/"
                className="w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-500 hover:text-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md shadow-sm"
                aria-label="Connect on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-14 pt-8">
          <p className="text-center text-slate-400 text-sm font-medium">
            © {currentYear} Siwaht. All rights reserved.
          </p>
        </div>
      </div>

      <PrivacyPolicy isOpen={showPrivacyPolicy} onClose={() => setShowPrivacyPolicy(false)} />
    </footer>
  );
}
