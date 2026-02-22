import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { id: "video-ads", label: "Video Ads" },
    { id: "avatars", label: "AI Avatars" },
    { id: "voice-synthesis", label: "Voice Ads" },
    { id: "editing", label: "Video Editing" },
    { id: "interactive-avatars", label: "AI Agents" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
        ? "bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm py-0"
        : "bg-transparent py-2"
        }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Siwaht - Go to top"
          >
            <img
              src="/logo.png"
              alt="Siwaht Logo"
              className="w-9 h-9 lg:w-10 lg:h-10 transition-transform duration-300 group-hover:scale-105"
              loading="eager"
              width="40"
              height="40"
            />
            <span className="text-xl lg:text-2xl font-bold text-slate-900">
              Siwaht
            </span>
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-slate-600 hover:text-primary transition-colors duration-300 font-medium text-[15px] py-2 px-4 group overflow-hidden"
                data-testid={`nav-${item.id}`}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-full" />
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="ml-4 bg-gradient-to-r from-primary to-secondary text-white px-7 py-2.5 rounded-full text-[15px] font-semibold hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 relative overflow-hidden group"
              data-testid="nav-contact"
            >
              <span className="relative z-10">Get Quote</span>
              <div className="absolute inset-0 h-full w-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-expanded={isMenuOpen}
            aria-label="Toggle main menu"
            data-testid="mobile-menu-button"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bg-white border-t border-slate-100 z-50 shadow-xl">
            <div className="px-5 py-4 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-[15px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                  data-testid={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block w-full bg-slate-900 text-white px-4 py-3 rounded-xl text-center font-medium hover:bg-slate-800 transition-colors"
                  data-testid="mobile-nav-contact"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
