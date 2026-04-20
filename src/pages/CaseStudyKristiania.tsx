import React from "react";
import { SEO } from "@/components/SEO";
import KristianiaCaseStudy from "@/components/blog/KristianiaCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudyKristiania: React.FC = () => {
  return (
    <>
      <SEO
        title="Høyskolen Kristiania Case Study | Beta Ads"
        description="How Kristiania reached 136,828 unique Norwegian Gen Z viewers across 31 streamers — 459K display views and 4,372 verified clicks during the Feb-Apr 2025 application window."
        canonical="/case-study/kristiania"
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Kristiania × Beta Ads: Norwegian Gen Z University Recruitment",
          "description":
            "Høyskolen Kristiania ran an 8-week native overlay campaign across 31 Norwegian streamers, delivering 459,237 display views and a 1.53% verified CTR.",
          "url": "https://beta-ads.no/case-study/kristiania",
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
      <KristianiaCaseStudy />
      <SPFooter />
    </>
  );
};

export default CaseStudyKristiania;
