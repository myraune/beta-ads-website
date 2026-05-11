import React from "react";
import { SEO } from "@/components/SEO";
import NkiCaseStudy from "@/components/blog/NkiCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudyNki: React.FC = () => {
  return (
    <>
      <SEO
        title="NKI Distance Learning Case Study | Beta Ads"
        description='NKI's quiz campaign on Norwegian Twitch: 220,003 completed views, 1,595 verified clicks, 90,356 unique viewers across 19 streamers in Oct-Nov 2025.'
        canonical="/case-study/nki"
        ogType="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "NKI × Beta Ads: Distance-Learning Quiz Lead-Gen Campaign",
            "description":
              "NKI ran a four-week interactive quiz campaign across 19 Norwegian streamers, driving 220,003 completed views and 90,356 unique viewers into the lead-capture funnel.",
            "url": "https://beta-ads.no/case-study/nki",
            "datePublished": "2025-10-01",
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
              { "@type": "ListItem", "position": 3, "name": "NKI", "item": "https://beta-ads.no/case-study/nki" }
            ],
          },
        ]}
      />
      <NkiCaseStudy />
      <SPFooter />
    </>
  );
};

export default CaseStudyNki;
