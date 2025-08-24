import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navigationItems = [
    { id: "video-ads", label: "Video Ads" },
    { id: "avatars", label: "AI Avatars" },
    { id: "voice-synthesis", label: "Voice Ads" },
    { id: "editing", label: "Video Editing" },
    { id: "podcast", label: "Podcasts" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? "bg-white/98 shadow-2xl border-gray-200/80 backdrop-blur-2xl" 
          : "bg-white/10 border-white/20 backdrop-blur-md"
      } border-b`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 gap-3 cursor-pointer group transition-all duration-300 hover:scale-105"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Siwaht - Go to top">
            <img 
              src="/logo.png" 
              alt="Siwaht - Professional AI Video & Audio Creation Agency Logo" 
              className="w-10 h-10 lg:w-12 lg:h-12 transition-transform duration-300 group-hover:scale-110"
              loading="eager"
              width="48"
              height="48"
            />
            <h1 className={`text-xl sm:text-2xl lg:text-3xl font-black transition-all duration-500 ${
              isScrolled ? "gradient-text" : "text-white drop-shadow-2xl"
            }`}>
              Siwaht
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-6 xl:space-x-8">
              {navigationItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`${
                    isScrolled ? "text-slate-700" : "text-white/90"
                  } hover:text-primary transition-all duration-300 font-semibold text-sm xl:text-base py-2 px-4 rounded-xl hover:bg-white/10 relative group`}
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></div>
                </button>
              ))}
              <button 
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 xl:px-7 py-2.5 xl:py-3.5 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-500 font-bold text-sm xl:text-base shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105 border border-white/20"
                data-testid="nav-contact"
              >
                Get Quote
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-primary hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200 touch-action-optimization"
              aria-expanded={isMenuOpen}
              aria-label="Toggle main menu"
              data-testid="mobile-menu-button"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed top-16 lg:top-20 left-0 right-0 bg-white shadow-xl border-t border-slate-200 z-50 max-h-screen overflow-y-auto">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="mobile-nav-item block w-full text-left px-4 py-3 text-base font-medium text-slate-600 hover:text-primary hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50 rounded-lg transition-all duration-300 touch-action-optimization border border-transparent hover:border-blue-200/50"
                  data-testid={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block w-full bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 font-medium text-center touch-action-optimization min-h-[44px] shadow-lg hover:shadow-xl"
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