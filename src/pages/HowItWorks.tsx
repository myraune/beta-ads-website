import React from "react";
import { Helmet } from "react-helmet";
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
      <Helmet>
        <title>How It Works | Beta Ads – Native Twitch Advertising</title>
        <meta name="description" content="Learn how Beta Ads delivers native overlay ads inside Nordic Twitch livestreams. Ad formats: video, snipe banners, sidebars, rich media, polls, and interactive." />
        <link rel="canonical" href="https://beta-ads.no/how-it-works" />
        <meta property="og:title" content="How It Works | Beta Ads – Native Twitch Advertising" />
        <meta property="og:description" content="Native overlay ad formats inside Nordic Twitch livestreams. Video, banners, sidebars, rich media, polls and interactive — all adblock-proof." />
        <meta property="og:url" content="https://beta-ads.no/how-it-works" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How It Works | Beta Ads – Native Twitch Advertising" />
        <meta name="twitter:description" content="Native overlay ad formats inside Nordic Twitch livestreams. Video, banners, sidebars, rich media, polls and interactive — all adblock-proof." />
      </Helmet>
      <LiveStreamPreview />
      <AdFormats />
      <Mechanisms t={t} />
      <Footer t={t} />
    </div>
  );
};

export default HowItWorks;
