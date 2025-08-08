import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import VideoAds from "@/components/services/video-ads";
import Avatars from "@/components/services/avatars";
import VoiceSynthesis from "@/components/services/voice-synthesis";
import VideoEditing from "@/components/services/video-editing";
import PortfolioSection from "@/components/portfolio-section";
import { Video, User, Volume2, Edit } from "lucide-react";
import PodcastProduction from "@/components/services/podcast-production";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  useEffect(() => {
    // Set page metadata for SEO
    document.title = "Siwaht - AI-Powered Video & Audio Content Creation Services";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Transform your ideas into professional videos, realistic AI avatars, and premium audio content with Siwaht\'s cutting-edge artificial intelligence technology. Get started today.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Transform your ideas into professional videos, realistic AI avatars, and premium audio content with Siwaht\'s cutting-edge artificial intelligence technology. Get started today.';
      document.head.appendChild(meta);
    }

    // Add Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: 'Siwaht - AI-Powered Video & Audio Content Creation' },
      { property: 'og:description', content: 'Professional AI video creation, realistic avatars, and voice synthesis services.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href }
    ];

    ogTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Navigation />
      
      <main role="main">
        <Hero />
        
        <section id="services" className="w-full" aria-label="Our AI-powered services">
          <VideoAds />
          <Avatars />
          <VoiceSynthesis />
          <VideoEditing />
          <PodcastProduction />
        </section>

        <section id="portfolio" className="w-full" aria-label="Our portfolio and samples">
          <PortfolioSection 
            category="demo-videos"
            title="Demo Videos"
            description="Watch our latest AI-generated video advertisements and promotional content"
            icon={Video}
          />
          <PortfolioSection 
            category="avatars"
            title="AI Avatar Gallery"
            description="Explore our collection of photorealistic AI avatars for any purpose"
            icon={User}
          />
        </section>
        
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
