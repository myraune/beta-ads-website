import React from "react";
import { SEO } from "@/components/SEO";
import { recapVideoLd } from "@/components/blog/RecapFilm";
import NkiCaseStudy from "@/components/blog/NkiCaseStudy";

const CaseStudyNki: React.FC = () => {
  return (
    <>
      <SEO
        title="NKI Distance Learning Case Study | Beta Ads"
        description="NKI quiz campaign on Norwegian Twitch: 220,003 completed views, 1,595 verified clicks, 90,356 unique viewers across 19 streamers in Oct-Nov 2025."
        canonical="/case-study/nki"
        ogType="article"
        articlePublishedTime="2025-10-01"
        articleModifiedTime="2026-11-02"
        ogImage="/lovable-uploads/case-studies/nki-detoo.png"
        ogImageAlt="NKI quiz campaign on Norwegian Twitch - detoo streamer overlay"
        ogImageWidth={1065}
        ogImageHeight={583}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": "https://beta-ads.no/case-study/nki#article",
            "headline": "NKI × Beta Ads: Distance-Learning Quiz Lead-Gen Campaign",
            "description":
              "NKI ran a four-week interactive quiz campaign across 19 Norwegian streamers, driving 220,003 completed views and 90,356 unique viewers into the lead-capture funnel.",
            "url": "https://beta-ads.no/case-study/nki",
            "image": "https://beta-ads.no/lovable-uploads/case-studies/nki-detoo.png",
            "datePublished": "2025-11-28",
            "dateModified": "2026-11-02",
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
                "url": "https://beta-ads.no/brand/beta-ads-logo-512.png",
                "width": 512,
                "height": 512,
              },
            },
            "isPartOf": { "@id": "https://beta-ads.no/#website" },
          },
          recapVideoLd("nki", "NKI × Beta Ads: campaign recap", "Recap of NKI on Norwegian Twitch, booked through dentsu: 19 creators asked their chat what type of student they are, 220,003 completed views and 1,595 verified clicks.", 33, "2026-11-02"),
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
    </>
  );
};

export default CaseStudyNki;
