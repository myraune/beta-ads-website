import React from "react";
import { SEO } from "@/components/SEO";
import { StreamerSection } from "@/components/sections/StreamerSection";
import { SPFooter } from "@/components/sections/SPFooter";

interface StreamersProps {
  t: any;
}

const Streamers: React.FC<StreamersProps> = ({ t }) => {
  return (
    <div className="pt-16 lg:pt-20">
      <SEO
        title="For Streamers | Beta Ads"
        description="Earn passive income as a Twitch, YouTube or Kick streamer with Beta Ads. Automated overlay ads, no shoutouts required. Join 40+ Nordic streamers already earning."
        canonical="/streamers"
        ogType="website"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "For Streamers - Beta Ads",
          "description": "Earn passive income as a Twitch, YouTube or Kick streamer with Beta Ads. Automated overlay ads, no shoutouts required.",
          "url": "https://beta-ads.no/streamers",
          "isPartOf": { "@id": "https://beta-ads.no/#website" }
        }}
      />
      <main>
        <StreamerSection t={t} language="en" />
        <SPFooter />
      </main>
    </div>
  );
};

export default Streamers;
