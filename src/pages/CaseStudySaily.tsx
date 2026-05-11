import React from "react";
import { SEO } from "@/components/SEO";
import SailyCaseStudy from "@/components/blog/SailyCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudySaily: React.FC = () => {
  return (
    <>
      <SEO
        title="Saily eSIM Case Study | Beta Ads"
        description="Saily on Norwegian Twitch: 102,794 completed views, 518 verified clicks, 1.08% CTR across 22 streamers. 53,229 unique viewers reached in peak travel season."
        canonical="/case-study/saily"
        ogType="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Saily eSIM × Beta Ads: Travel-Intent Twitch Campaign",
            "description":
              "Saily used Beta's Rich Media Overlays across 22 Norwegian Twitch streamers, delivering 102,794 completed views with 65% of screen time inside Travel & Outdoors streams.",
            "url": "https://beta-ads.no/case-study/saily",
            "datePublished": "2025-11-01",
            "dateModified": "2026-05-11",
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
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://beta-ads.no/" },
              { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://beta-ads.no/case-studies" },
              { "@type": "ListItem", "position": 3, "name": "Saily", "item": "https://beta-ads.no/case-study/saily" }
            ],
          },
        ]}
      />
      <SailyCaseStudy />
      <SPFooter />
    </>
  );
};

export default CaseStudySaily;
