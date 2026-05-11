import React from "react";
import { SEO } from "@/components/SEO";
import SurfsharkCaseStudy from "@/components/blog/SurfsharkCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudySurfshark: React.FC = () => {
  return (
    <>
      <SEO
        title="Surfshark VPN Case Study | Beta Ads"
        description="Surfshark on Norwegian Twitch: 90,473 verified views, 704h on-screen, 1.39% CTR across 25 streamers. 37,614 unique viewers, zero adblock impact."
        canonical="/case-study/surfshark"
        ogType="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": "https://beta-ads.no/case-study/surfshark#article",
            "headline": "Surfshark × Beta Ads: VPN Awareness on Norwegian Twitch",
            "description":
              "Surfshark used Beta's Rich Media Overlays across 25 Norwegian Twitch streamers, delivering 90,473 completed views and 552 verified clicks over six weeks.",
            "url": "https://beta-ads.no/case-study/surfshark",
            "datePublished": "2025-03-01",
            "dateModified": "2026-05-11",
            "author": {
              "@type": "Organization",
              "name": "Beta Ads",
              "url": "https://beta-ads.no",
              "sameAs": ["https://www.linkedin.com/company/beta-nordic/"],
            },
            "publisher": {
              "@type": "Organization",
              "name": "Beta Ads",
              "logo": {
                "@type": "ImageObject",
                "url": "https://beta-ads.no/lovable-uploads/logo-color.png",
                "width": 200,
                "height": 50,
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
              { "@type": "ListItem", "position": 3, "name": "Surfshark", "item": "https://beta-ads.no/case-study/surfshark" }
            ],
          },
        ]}
      />
      <SurfsharkCaseStudy />
      <SPFooter />
    </>
  );
};

export default CaseStudySurfshark;
