import React from "react";
import { SEO } from "@/components/SEO";
import GloriousCaseStudy from "@/components/blog/GloriousCaseStudy";

const CaseStudyGlorious: React.FC = () => {
  return (
    <>
      <SEO
        title="Glorious Gaming Case Study | Beta Ads"
        description="How Glorious used rich media overlays to promote the O3 mouse across 25 Nordic Twitch streamers, reaching 137K+ views in Finland, Norway, and Sweden."
        canonical="/case-study/glorious"
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Glorious x Beta Ads: Nordic Gaming Community Campaign",
          "description": "How Glorious used rich media overlays to promote the O3 mouse across 25 Nordic Twitch streamers, reaching 137K+ views.",
          "url": "https://beta-ads.no/case-study/glorious",
          "author": { "@type": "Organization", "name": "Beta Ads" },
          "publisher": { "@type": "Organization", "name": "Beta Ads", "logo": { "@type": "ImageObject", "url": "https://beta-ads.no/lovable-uploads/logo-color.png" } },
          "isPartOf": { "@id": "https://beta-ads.no/#website" }
        }}
      />
      <GloriousCaseStudy />
    </>
  );
};

export default CaseStudyGlorious;
