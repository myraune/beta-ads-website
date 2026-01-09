import React from "react";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { WhyBetaAds } from "@/components/sections/WhyBetaAds";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { AdFormatsCarousel } from "@/components/sections/AdFormatsCarousel";
import { Testimonials } from "@/components/sections/Testimonials";
import { Press } from "@/components/sections/Press";
import { ScrollVideo } from "@/components/sections/ScrollVideo";
import { Footer } from "@/components/sections/Footer";

interface IndexProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const Index: React.FC<IndexProps> = ({ t, language, setLanguage }) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Hero t={t} scrollToSection={scrollToSection} language={language} setLanguage={setLanguage} />
      <TrustedBy />
      <WhyBetaAds />
      <CaseStudiesSection />
      <HowItWorksSection />
      <AdFormatsCarousel />
      <Testimonials />
      <ScrollVideo t={t} />
      <Press t={t} />
      <Footer t={t} language={language} setLanguage={setLanguage} />
    </>
  );
};

export default Index;
