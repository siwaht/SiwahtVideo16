import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import siwath_logo_withoutbackground from "@assets/siwath_logo_withoutbackground.png";

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
    { id: "voice", label: "Voice Synthesis" },
    { id: "editing", label: "Video Editing" },
    { id: "podcast", label: "Podcasts" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 shadow-lg" : "bg-background/80"
      } backdrop-blur-sm border-b border-border`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 gap-3 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Siwaht - Go to top">
            <img 
              src={siwath_logo_withoutbackground} 
              alt="Siwaht Logo" 
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <h1 className="text-xl xs:text-2xl md:text-3xl font-bold gradient-text">
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
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm xl:text-base py-2 px-1"
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection("contact")}
                className="bg-primary text-white px-4 xl:px-6 py-2 xl:py-3 rounded-lg hover:opacity-90 transition-all duration-200 font-medium text-sm xl:text-base shadow-sm hover:shadow-md"
                data-testid="nav-contact"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200 touch-action-optimization"
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
          <div className="fixed top-16 md:top-20 left-0 right-0 bg-background shadow-lg border-t border-border z-50 max-h-screen overflow-y-auto">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="mobile-nav-item block w-full text-left px-4 py-3 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors duration-200 touch-action-optimization"
                  data-testid={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block w-full bg-primary text-white px-4 py-3 rounded-lg hover:opacity-90 transition-all duration-200 font-medium text-center touch-action-optimization min-h-[44px]"
                  data-testid="mobile-nav-contact"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}