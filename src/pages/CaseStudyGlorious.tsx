import React from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import GloriousCaseStudy from "@/components/blog/GloriousCaseStudy";
import { ArrowLeft } from "lucide-react";

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
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-28 md:pt-36 pb-20">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to campaigns
        </Link>

        <div className="mb-6">
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            Case Study
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Glorious × Beta Ads
          </h1>
          <p className="text-muted-foreground">
            How Glorious reached the Nordic gaming community with native stream
            overlays to promote the Glorious O3 mouse.
          </p>
        </div>

        <GloriousCaseStudy />
      </div>
    </>
  );
};

export default CaseStudyGlorious;
