import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import VideoAds from "@/components/services/video-ads";
import Avatars from "@/components/services/avatars";
import VoiceSynthesis from "@/components/services/voice-synthesis";
import VideoEditing from "@/components/services/video-editing";
import PodcastProduction from "@/components/services/podcast-production";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <Hero />
      <VideoAds />
      <Avatars />
      <VoiceSynthesis />
      <VideoEditing />
      <PodcastProduction />
      <Contact />
      <Footer />
    </div>
  );
}
