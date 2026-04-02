import React, { lazy, Suspense } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SamsungCaseStudy = lazy(() => import("@/components/blog/SamsungCaseStudy"));

const CaseStudySamsungPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Samsung x Beta Ads Case Study | Beta Ads"
        description="How Samsung launched the Galaxy S25 Ultra and Galaxy Z Fold7 to Norwegian gamers on Twitch. 800,000+ combined views, 2.34-2.93% CTR, zero adblock impact across two campaigns in 2025."
        canonical="/case-study/samsung"
        ogType="article"
        ogImage="/lovable-uploads/samsung-zfold7-banner.png"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Samsung x Beta Ads: Two Twitch Campaigns in Norway 2025",
          "description": "How Samsung launched the Galaxy S25 Ultra and Galaxy Z Fold7 to Norwegian gamers through native Twitch overlay ads and streamer integrations.",
          "url": "https://beta-ads.no/case-study/samsung",
          "image": "https://beta-ads.no/lovable-uploads/samsung-zfold7-banner.png",
          "author": { "@type": "Organization", "name": "Beta Ads" },
          "publisher": { "@type": "Organization", "name": "Beta Ads", "logo": { "@type": "ImageObject", "url": "https://beta-ads.no/lovable-uploads/logo-color.png" } },
          "isPartOf": { "@id": "https://beta-ads.no/#website" }
        }}
      />

      <Suspense fallback={<div className="min-h-screen" />}>
        <SamsungCaseStudy />
      </Suspense>
    </>
  );
};

export default CaseStudySamsungPage;
