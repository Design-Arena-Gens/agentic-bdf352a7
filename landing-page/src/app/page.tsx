import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MessagingOptions } from "@/components/MessagingOptions";
import { BenefitsSection } from "@/components/BenefitsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { OfferSection } from "@/components/OfferSection";
import { SpecsGrid } from "@/components/SpecsGrid";
import { HowItWorksTimeline } from "@/components/HowItWorksTimeline";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { StrategySummary } from "@/components/StrategySummary";
import { ConnectPublishSection } from "@/components/ConnectPublishSection";
import { LegalSection } from "@/components/LegalSection";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <StrategySummary />
        <MessagingOptions />
        <BenefitsSection />
        <FeaturesSection />
        <SocialProofSection />
        <OfferSection />
        <SpecsGrid />
        <HowItWorksTimeline />
        <FAQSection />
        <ConnectPublishSection />
        <LegalSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
