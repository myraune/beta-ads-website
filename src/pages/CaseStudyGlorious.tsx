import React from "react";
import { SEO } from "@/components/SEO";
import GloriousCaseStudy from "@/components/blog/GloriousCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudyGlorious: React.FC = () => {
  return (
    <>
      <SEO
        title="Glorious Gaming Case Study | Beta Ads"
        description="How Glorious used rich media overlays to promote the O3 mouse across 25 Nordic Twitch streamers, reaching 137K+ views in Finland, Norway, and Sweden."
        canonical="/case-study/glorious"
        ogType="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": "https://beta-ads.no/case-study/glorious#article",
            "headline": "Glorious x Beta Ads: Nordic Gaming Community Campaign",
            "description": "How Glorious used rich media overlays to promote the O3 mouse across 25 Nordic Twitch streamers, reaching 137K+ views.",
            "url": "https://beta-ads.no/case-study/glorious",
            "image": "https://beta-ads.no/lovable-uploads/og-social-preview.png",
            "datePublished": "2025-04-01",
            "dateModified": "2026-05-11",
            "author": {
              "@type": "Organization",
              "name": "Beta Ads",
              "url": "https://beta-ads.no",
              "sameAs": ["https://www.linkedin.com/company/beta-nordic/"],
            },
            "publisher": { "@type": "Organization", "name": "Beta Ads", "logo": {
                "@type": "ImageObject",
                "url": "https://beta-ads.no/lovable-uploads/logo-color.png",
                "width": 200,
                "height": 50,
              } },
            "isPartOf": { "@id": "https://beta-ads.no/#website" }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://beta-ads.no/" },
              { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://beta-ads.no/case-studies" },
              { "@type": "ListItem", "position": 3, "name": "Glorious", "item": "https://beta-ads.no/case-study/glorious" }
            ]
          }
        ]}
      />
      <GloriousCaseStudy />
      <SPFooter />
    </>
  );
};

export default CaseStudyGlorious;
