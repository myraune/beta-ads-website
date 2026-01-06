import React from "react";
import { Mechanisms } from "@/components/sections/Mechanisms";
import { LiveStreamPreview } from "@/components/sections/LiveStreamPreview";
import { AdFormats } from "@/components/sections/AdFormats";
import { Footer } from "@/components/sections/Footer";

interface HowItWorksProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ t, language, setLanguage }) => {
  return (
    <div className="pt-24 lg:pt-32">
      {/* Interactive Live Stream Preview */}
      <LiveStreamPreview />

      {/* Ad Formats Section */}
      <AdFormats />

      {/* Mechanisms Content */}
      <Mechanisms t={t} />

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default HowItWorks;
