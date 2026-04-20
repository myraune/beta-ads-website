import React from "react";
import { SEO } from "@/components/SEO";
import ShureCaseStudy from "@/components/blog/ShureCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudyShure: React.FC = () => {
  return (
    <>
      <SEO
        title="Shure MV7+ Case Study | Beta Ads"
        description="How Shure reached 48,617 unique Norwegian viewers with a concentrated two-creator MV7+ microphone campaign. 182,554 completed views, 2,378 verified clicks, 9.12% peak CTR."
        canonical="/case-study/shure"
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Shure MV7+ × Beta Ads: Concentrated Creator Launch",
          "description":
            "Shure used a concentrated two-streamer Beta Rich Media Overlay run for the MV7+ microphone, driving 182,554 views and a 9.12% peak-day CTR across 761 hours of on-screen presence.",
          "url": "https://beta-ads.no/case-study/shure",
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
      <ShureCaseStudy />
      <SPFooter />
    </>
  );
};

export default CaseStudyShure;
