import React from "react";
import { SEO } from "@/components/SEO";
import { Mechanisms } from "@/components/sections/Mechanisms";
import { LiveStreamPreview } from "@/components/sections/LiveStreamPreview";
import { AdFormats } from "@/components/sections/AdFormats";
import { SPFooter } from '@/components/sections/SPFooter';

interface HowItWorksProps {
  t: any;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ t }) => {
  return (
    <div className="pt-24 lg:pt-32">
      <SEO
        title="How It Works | Beta Ads"
        description="See how Beta Ads native overlay advertising works on Twitch, YouTube and Kick. Ad formats, AI-powered features, and live stream ad technology explained."
        canonical="/how-it-works"
        ogType="website"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "How It Works - Beta Ads",
          "description": "See how Beta Ads native overlay advertising works on Twitch, YouTube and Kick. Ad formats, AI-powered features, and live stream ad technology explained.",
          "url": "https://beta-ads.no/how-it-works",
          "isPartOf": { "@id": "https://beta-ads.no/#website" }
        }}
      />
      <main>
        <LiveStreamPreview />
        <AdFormats />
        <Mechanisms t={t} />
        <SPFooter />
      </main>
    </div>
  );
};

export default HowItWorks;
