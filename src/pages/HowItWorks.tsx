import React from "react";
import { SEO } from "@/components/SEO";
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
      <SEO
        title="How It Works | Beta Ads – Native Twitch Advertising"
        description="Learn how Beta Ads delivers native overlay ads inside Nordic Twitch livestreams. Ad formats: video, snipe banners, sidebars, rich media, polls, and interactive."
        canonical="/how-it-works"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "How It Works | Beta Ads – Native Twitch Advertising",
          description: "Learn how Beta Ads delivers native overlay ads inside Nordic Twitch livestreams. Ad formats: video, snipe banners, sidebars, rich media, polls, and interactive.",
          url: "https://beta-ads.no/how-it-works",
          publisher: {
            "@type": "Organization",
            name: "Beta Ads",
            url: "https://beta-ads.no",
          },
        }}
      />
      <LiveStreamPreview />
      <AdFormats />
      <Mechanisms t={t} />
      <Footer t={t} />
    </div>
  );
};

export default HowItWorks;
