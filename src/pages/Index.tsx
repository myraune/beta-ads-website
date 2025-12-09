import React from "react";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { LiveDashboard } from "@/components/sections/LiveDashboard";
import { Mechanisms } from "@/components/sections/Mechanisms";
import { StreamerSection } from "@/components/sections/StreamerSection";
import { Press } from "@/components/sections/Press";
import { CTA } from "@/components/sections/CTA";
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
      <LiveDashboard />
      <Mechanisms t={t} />
      <StreamerSection t={t} language={language} />
      <Press t={t} />
      <CTA t={t} />
      <Footer t={t} language={language} setLanguage={setLanguage} />
    </>
  );
};

export default Index;
