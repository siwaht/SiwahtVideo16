import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/90" : "bg-white/80"
    } backdrop-blur-md border-b border-slate-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold gradient-text">
                SiwahtAI
              </span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection("video-ads")}
                className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                Video Ads
              </button>
              <button 
                onClick={() => scrollToSection("avatars")}
                className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                AI Avatars
              </button>
              <button 
                onClick={() => scrollToSection("voice")}
                className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                Voice Synthesis
              </button>
              <button 
                onClick={() => scrollToSection("editing")}
                className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                Video Editing
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-primary transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection("video-ads")}
              className="block w-full text-left px-3 py-2 text-slate-600 hover:text-primary transition-colors duration-200 font-medium"
            >
              Video Ads
            </button>
            <button 
              onClick={() => scrollToSection("avatars")}
              className="block w-full text-left px-3 py-2 text-slate-600 hover:text-primary transition-colors duration-200 font-medium"
            >
              AI Avatars
            </button>
            <button 
              onClick={() => scrollToSection("voice")}
              className="block w-full text-left px-3 py-2 text-slate-600 hover:text-primary transition-colors duration-200 font-medium"
            >
              Voice Synthesis
            </button>
            <button 
              onClick={() => scrollToSection("editing")}
              className="block w-full text-left px-3 py-2 text-slate-600 hover:text-primary transition-colors duration-200 font-medium"
            >
              Video Editing
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="block mx-3 my-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium text-center"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
