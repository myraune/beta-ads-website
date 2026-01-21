import React from "react";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { AdFormatsCarousel } from "@/components/sections/AdFormatsCarousel";
import { Press } from "@/components/sections/Press";
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
      <HowItWorksSection t={t} />
      <AdFormatsCarousel t={t} />
      <CaseStudiesSection t={t} />
      <Press t={t} />
      <Footer t={t} language={language} setLanguage={setLanguage} />
    </>
  );
};

export default Index;
