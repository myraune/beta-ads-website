import React from "react";
import { SEO } from "@/components/SEO";
import KomplettCaseStudy from "@/components/blog/KomplettCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudyKomplett: React.FC = () => {
  return (
    <>
      <SEO
        title="Komplett Månedens Gaming Deal Case Study | Beta Ads"
        description="How Komplett's tactical retail campaign hit a 4.48% peak-day CTR across 34 Norwegian gaming streamers. 151,278 display views, 1,768 verified clicks in 17 days."
        canonical="/case-study/komplett"
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Komplett × Beta Ads: Tactical Norwegian Gaming Retail Campaign",
          "description":
            "Komplett ran the Månedens Gaming Deal across 34 Norwegian streamers and 46 categories, delivering 151,278 display views with a 4.48% peak-day CTR.",
          "url": "https://beta-ads.no/case-study/komplett",
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
      <KomplettCaseStudy />
      <SPFooter />
    </>
  );
};

export default CaseStudyKomplett;
