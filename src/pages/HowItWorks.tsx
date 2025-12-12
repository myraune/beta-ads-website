import React from "react";
import { Mechanisms } from "@/components/sections/Mechanisms";
import { AdFormatsPreview } from "@/components/sections/AdFormatsPreview";
import { Footer } from "@/components/sections/Footer";

interface HowItWorksProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ t, language, setLanguage }) => {
  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-primary text-sm md:text-base tracking-widest uppercase mb-6 font-light">
            {t.mechanismsSubtitle}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-foreground mb-8 tracking-tighter">
            {t.mechanismsTitle}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-extralight leading-relaxed">
            {t.mechanismsDescription}
          </p>
        </div>
      </section>

      {/* Ad Formats Visual Preview */}
      <AdFormatsPreview t={t} />

      {/* Mechanisms Content */}
      <Mechanisms t={t} />

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default HowItWorks;
