import React from "react";
import { SEO } from "@/components/SEO";
import { StreamerSection } from "@/components/sections/StreamerSection";
import { SPFooter } from "@/components/sections/SPFooter";

interface StreamersProps {
  t: any;
}

const Streamers: React.FC<StreamersProps> = ({ t }) => {
  return (
    <div>
      <SEO
        title="Earn from Your Stream | Beta Ads Streamer Program"
        description="Get real brand deals on Twitch, YouTube & Kick. Accept offers you like, skip the rest. No minimum followers, no contracts. Join 40+ Nordic streamers."
        canonical="/streamers"
        ogType="website"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "For Streamers - Beta Ads",
            "description": "Earn passive income as a Twitch, YouTube or Kick streamer with Beta Ads. Automated overlay ads, no shoutouts required.",
            "url": "https://beta-ads.no/streamers",
            "isPartOf": { "@id": "https://beta-ads.no/#website" }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://beta-ads.no/" },
              { "@type": "ListItem", "position": 2, "name": "For Streamers", "item": "https://beta-ads.no/streamers" }
            ]
          }
        ]}
      />
      {/* Accessibility fix: Layout.tsx already provides <main> - nested <main> is invalid HTML (WCAG 1.3.6) */}
      <div>
        <StreamerSection t={t} language="en" />
        <SPFooter />
      </div>
    </div>
  );
};

export default Streamers;
