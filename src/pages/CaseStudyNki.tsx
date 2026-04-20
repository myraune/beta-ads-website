import React from "react";
import { SEO } from "@/components/SEO";
import NkiCaseStudy from "@/components/blog/NkiCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudyNki: React.FC = () => {
  return (
    <>
      <SEO
        title="NKI Distance Learning Case Study | Beta Ads"
        description='How NKI drove 90,356 unique Norwegian viewers into a "what type of student are you?" quiz. 220,003 completed views, 1,595 verified clicks across 19 streamers in Oct-Nov 2025.'
        canonical="/case-study/nki"
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "NKI × Beta Ads: Distance-Learning Quiz Lead-Gen Campaign",
          "description":
            "NKI ran a four-week interactive quiz campaign across 19 Norwegian streamers, driving 220,003 completed views and 90,356 unique viewers into the lead-capture funnel.",
          "url": "https://beta-ads.no/case-study/nki",
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
      <NkiCaseStudy />
      <SPFooter />
    </>
  );
};

export default CaseStudyNki;
