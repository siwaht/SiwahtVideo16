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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/90 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] py-2"
        : "bg-transparent py-5"
        }`}
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="/logo.png"
              alt="Siwaht Logo"
              className="w-9 h-9"
              loading="eager"
            />
            <span className="text-[24px] font-[800] bg-gradient-to-r from-[#04befe] via-[#a855f7] to-[#04befe] text-transparent bg-clip-text tracking-tight animate-[gradientFlow_6s_ease-in-out_infinite] bg-[length:200%_200%]">
              Siwaht
            </span>
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-[#475569] hover:text-slate-900 font-semibold text-[13px] tracking-wide"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollToSection("contact")}
              className="ml-4 bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] hover:opacity-90 text-white px-6 py-2.5 rounded-md text-[14px] font-semibold transition-opacity shadow-[0_4px_14px_-4px_rgba(139,92,246,0.5)]"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-slate-600 focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl">
          <div className="px-6 py-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-3 text-[15px] font-medium text-slate-600 hover:text-slate-900"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 pb-2">
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] hover:opacity-90 text-white py-3 rounded-md text-center font-semibold transition-opacity shadow-[0_4px_14px_-4px_rgba(139,92,246,0.5)]"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
