import React from "react";
import { SEO } from "@/components/SEO";
import SurfsharkCaseStudy from "@/components/blog/SurfsharkCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudySurfshark: React.FC = () => {
  return (
    <>
      <SEO
        title="Surfshark VPN Case Study | Beta Ads"
        description="How Surfshark reached 37,614 unique Norwegian Twitch viewers with 704 hours of on-screen presence. 90,473 verified views, 1.39% CTR across 25 streamers in May-June 2025."
        canonical="/case-study/surfshark"
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Surfshark × Beta Ads: VPN Awareness on Norwegian Twitch",
          "description":
            "Surfshark used Beta's Rich Media Overlays across 25 Norwegian Twitch streamers, delivering 90,473 completed views and 552 verified clicks over six weeks.",
          "url": "https://beta-ads.no/case-study/surfshark",
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
      <SurfsharkCaseStudy />
      <SPFooter />
    </>
  );
};

export default CaseStudySurfshark;
