import React from "react";
import { SEO } from "@/components/SEO";
import SailyCaseStudy from "@/components/blog/SailyCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudySaily: React.FC = () => {
  return (
    <>
      <SEO
        title="Saily eSIM Case Study | Beta Ads"
        description="How Saily reached 53,229 unique Norwegian viewers during peak summer travel season. 102,794 completed views, 518 verified clicks across 22 streamers in June 2025."
        canonical="/case-study/saily"
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Saily eSIM × Beta Ads: Travel-Intent Twitch Campaign",
          "description":
            "Saily used Beta's Rich Media Overlays across 22 Norwegian Twitch streamers, delivering 102,794 completed views with 65% of screen time inside Travel & Outdoors streams.",
          "url": "https://beta-ads.no/case-study/saily",
          "author": { "@type": "Organization", "name": "Beta Ads" },
          "publisher": {
            "@type": "Organization",
            "name": "Beta Ads",
            "logo": {
              "@type": "ImageObject",
              "url": "https://beta-ads.no/lovable-uploads/logo-color.png",
            },
          },
          "isPartOf": { "@id": "https://beta-ads.no/#website" },
        }}
      />
      <SailyCaseStudy />
      <SPFooter />
    </>
  );
};

export default CaseStudySaily;
