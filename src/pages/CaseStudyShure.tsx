import React from "react";
import { SEO } from "@/components/SEO";
import ShureCaseStudy from "@/components/blog/ShureCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudyShure: React.FC = () => {
  return (
    <>
      <SEO
        title="Shure MV6 Case Study | Beta Ads"
        description="Shure MV6 on Norwegian Twitch: 182,554 completed views, 2,378 verified clicks, 9.12% peak CTR - with just 2 streamers. 48,617 unique Norwegian viewers."
        canonical="/case-study/shure"
        ogType="article"
        articlePublishedTime="2025-07-01"
        articleModifiedTime="2026-05-11"
        ogImage="/lovable-uploads/shure-mv6-banner.jpg"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": "https://beta-ads.no/case-study/shure#article",
            "headline": "Shure MV6 × Beta Ads: Concentrated Creator Launch",
            "description":
              "Shure used a concentrated two-streamer Beta Rich Media Overlay run for the MV6 microphone, driving 182,554 views and a 9.12% peak-day CTR across 761 hours of on-screen presence.",
            "url": "https://beta-ads.no/case-study/shure",
            "image": "https://beta-ads.no/lovable-uploads/shure-mv6-banner.jpg",
            "datePublished": "2025-07-01",
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
              { "@type": "ListItem", "position": 3, "name": "Shure", "item": "https://beta-ads.no/case-study/shure" }
            ],
          },
        ]}
      />
      <ShureCaseStudy />
      <SPFooter />
    </>
  );
};

export default CaseStudyShure;
