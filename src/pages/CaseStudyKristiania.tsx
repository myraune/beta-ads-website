import React from "react";
import { SEO } from "@/components/SEO";
import KristianiaCaseStudy from "@/components/blog/KristianiaCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudyKristiania: React.FC = () => {
  return (
    <>
      <SEO
        title="Høyskolen Kristiania Case Study | Beta Ads"
        description="Two parallel Kristiania Twitch campaigns (recruitment awareness + voting activation) — combined ~600K display views, ~6,000 verified clicks, 31 Norwegian streamers, 8-week Feb-Apr 2025 application window."
        canonical="/case-study/kristiania"
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Høyskolen Kristiania × Beta Ads: Two-Campaign Twitch Run, ~600K Combined Views",
          "description":
            "Høyskolen Kristiania ran two parallel native overlay campaigns (awareness + voting) across the same Norwegian creator network, delivering ~600K combined display views and ~6,000 verified clicks across an 8-week recruitment window.",
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
