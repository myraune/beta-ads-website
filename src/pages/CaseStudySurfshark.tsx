import React from "react";
import { SEO } from "@/components/SEO";
import SurfsharkCaseStudy from "@/components/blog/SurfsharkCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudySurfshark: React.FC = () => {
  return (
    <>
      <SEO
        title="Surfshark VPN Case Study | Beta Ads"
        description="Surfshark on Norwegian Twitch: 91,006 completed views, 707h on-screen and 37,713 unique viewers across 26 streamers. A reach-led VPN awareness run, zero adblock impact."
        canonical="/case-study/surfshark"
        ogType="article"
        articlePublishedTime="2025-03-01"
        articleModifiedTime="2026-05-11"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": "https://beta-ads.no/case-study/surfshark#article",
            "headline": "Surfshark × Beta Ads: VPN Awareness on Norwegian Twitch",
            "description":
              "Surfshark used Beta's Rich Media Overlays across 26 Norwegian Twitch streamers, delivering 91,006 completed views and 37,713 unique viewers reached.",
            "url": "https://beta-ads.no/case-study/surfshark",
            "image": "https://beta-ads.no/lovable-uploads/og-social-preview.png",
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
