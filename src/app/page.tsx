import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatsBanner } from "@/components/StatsBanner";
import { HowItWorks } from "@/components/HowItWorks";
import { DiscoverFundraisers } from "@/components/DiscoverFundraisers";
import { YellowBanner } from "@/components/YellowBanner";
import { FeaturedTopics } from "@/components/FeaturedTopics";
import { VideoSection } from "@/components/VideoSection";
import { TrustSafety } from "@/components/TrustSafety";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#1d2c22] flex flex-col selection:bg-[#005e3a] selection:text-white">
      {/* 1. Sticky Navigation */}
      <Header />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Social Proof Stats */}
        <StatsBanner />

        {/* 4. How GoFundMe Works 3-Step Interactive */}
        <HowItWorks />

        {/* 5. Discover Fundraisers 1+4 Grid */}
        <DiscoverFundraisers />

        {/* 6. Warm Yellow CTA Banner */}
        <YellowBanner />

        {/* 7. Featured Topics (Smart Coaching & Disaster Relief) */}
        <FeaturedTopics />

        {/* 8. Video / Testimonial Showcase */}
        <VideoSection />

        {/* 9. Trust & Safety Dark Forest Green Section */}
        <TrustSafety />
      </main>

      {/* 10. Multi-Column Footer & App Store Links */}
      <Footer />
    </div>
  );
}
