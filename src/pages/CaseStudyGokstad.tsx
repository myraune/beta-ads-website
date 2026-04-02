import React from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import GokstadCaseStudy from "@/components/blog/GokstadCaseStudy";
import { ArrowLeft } from "lucide-react";

const CaseStudyGokstad: React.FC = () => {
  return (
    <>
      <SEO
        title="Gokstad Akademiet Case Study | Beta Ads"
        description="How Gokstad Akademiet recruited IT students through native Twitch overlays with 22 creators, 100K+ views, and 1.22% CTR across 49 categories."
        canonical="/case-study/gokstad"
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Gokstad Akademiet x Beta Ads: Student Recruitment Campaign",
          "description": "How Gokstad Akademiet recruited IT and design students through native Twitch stream overlays with 22 creators across 49 categories.",
          "url": "https://beta-ads.no/case-study/gokstad",
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
            Gokstad Akademiet × Beta Ads
          </h1>
          <p className="text-muted-foreground">
            How Gokstad Akademiet recruited the next generation of IT and design
            students through native Twitch stream overlays.
          </p>
        </div>

        <GokstadCaseStudy />
      </div>
    </>
  );
};

export default CaseStudyGokstad;
