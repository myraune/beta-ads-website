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
      {/* Ad Formats Visual Preview */}
      <AdFormatsPreview t={t} />

      {/* Mechanisms Content */}
      <Mechanisms t={t} />

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default HowItWorks;
