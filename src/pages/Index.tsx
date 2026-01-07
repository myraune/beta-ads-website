import React from "react";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { AdFormatsCarousel } from "@/components/sections/AdFormatsCarousel";
import { Press } from "@/components/sections/Press";
import { ScrollCaseVideo } from "@/components/sections/ScrollCaseVideo";
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
      <AdFormatsCarousel />
      <Press t={t} />
      <ScrollCaseVideo
        src="/assets/case-samsung.mp4"
        poster="/lovable-uploads/twitch-ad-example.png"
        title="Samsung Campaign"
        subtitle="Native integration across Nordic streamers"
        metrics={[
          { label: "Views", value: "2.5M" },
          { label: "CTR", value: "4.2%" },
          { label: "Engagement", value: "12%" },
        ]}
        t={t}
      />
      <Footer t={t} language={language} setLanguage={setLanguage} />
    </>
  );
};

export default Index;
