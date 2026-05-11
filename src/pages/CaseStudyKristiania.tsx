import React from "react";
import { SEO } from "@/components/SEO";
import KristianiaCaseStudy from "@/components/blog/KristianiaCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudyKristiania: React.FC = () => {
  return (
    <>
      <SEO
        title="Høyskolen Kristiania Case Study | Beta Ads"
        description="Høyskolen Kristiania on Twitch: two parallel campaigns, ~600K display views, ~6,000 verified clicks across 31 Norwegian streamers over 8 weeks."
        canonical="/case-study/kristiania"
        ogType="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": "https://beta-ads.no/case-study/kristiania#article",
            "headline": "Høyskolen Kristiania × Beta Ads: Two-Campaign Twitch Run, ~600K Combined Views",
            "description":
              "Høyskolen Kristiania ran two parallel native overlay campaigns (awareness + voting) across the same Norwegian creator network, delivering ~600K combined display views and ~6,000 verified clicks across an 8-week recruitment window.",
            "url": "https://beta-ads.no/case-study/kristiania",
            "image": "https://beta-ads.no/lovable-uploads/og-social-preview.png",
            "datePublished": "2025-09-01",
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
              { "@type": "ListItem", "position": 3, "name": "Kristiania", "item": "https://beta-ads.no/case-study/kristiania" }
            ],
          },
        ]}
      />
      <KristianiaCaseStudy />
      <SPFooter />
    </>
  );
};

export default CaseStudyKristiania;
