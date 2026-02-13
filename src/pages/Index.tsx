import React from "react";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { StatCounters } from "@/components/sections/StatCounters";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { AdFormatsCarousel } from "@/components/sections/AdFormatsCarousel";
import { HomepageFAQ } from "@/components/sections/HomepageFAQ";
import { Press } from "@/components/sections/Press";
import { Footer } from "@/components/sections/Footer";

interface IndexProps {
  t: any;
}

const Index: React.FC<IndexProps> = ({ t }) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Hero t={t} scrollToSection={scrollToSection} />
      <TrustedBy />
      <ProblemSolution />
      <StatCounters />
      <HowItWorksSection t={t} />
      <AdFormatsCarousel t={t} />
      <CaseStudiesSection t={t} />
      <HomepageFAQ />
      <Press t={t} />
      <Footer t={t} />
    </>
  );
};

export default Index;
