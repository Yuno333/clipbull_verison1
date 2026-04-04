import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { FeatureEvolution } from "@/components/landing/feature-evolution";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SocialProof } from "@/components/landing/social-proof";
import { TrustSafety } from "@/components/landing/trust-safety";
import { Footer } from "@/components/landing/footer";
import { VisionStack } from "@/components/landing/vision-stack";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050508] relative overflow-x-hidden">
      {/* Global Soft Lighting - Purple Ambient */}
      <div className="fixed top-[20%] right-[-10%] w-[800px] h-[800px] bg-purple-900/15 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <FeatureEvolution />
        <FeaturesGrid />
        <VisionStack />
        <HowItWorks />
        <SocialProof />
        <TrustSafety />
        <Footer />
      </div>
    </main>
  );
}
