import React from "react";
import { Mechanisms } from "@/components/sections/Mechanisms";
import { LiveStreamPreview } from "@/components/sections/LiveStreamPreview";
import { AdFormats } from "@/components/sections/AdFormats";
import { Footer } from "@/components/sections/Footer";

interface HowItWorksProps {
  t: any;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ t }) => {
  return (
    <div className="pt-24 lg:pt-32">
      <LiveStreamPreview />
      <AdFormats />
      <Mechanisms t={t} />
      <Footer t={t} />
    </div>
  );
};

export default HowItWorks;
