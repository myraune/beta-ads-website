import React, { lazy, Suspense } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SPFooter } from "@/components/sections/SPFooter";

const SamsungFold7CaseStudy = lazy(() => import("@/components/blog/SamsungFold7CaseStudy"));

/** Samsung brand blue — sampled from their official brand guidelines. */
const SAMSUNG_BLUE = "#1428A0";

const CaseStudySamsungFold7: React.FC = () => {
  return (
    <>
      <SEO
        title="Samsung Galaxy Z Fold7 Case Study | Beta Ads"
        description="How Samsung launched the Galaxy Z Fold7 to Norwegian gamers through native Twitch overlay ads and streamer integrations - achieving a 2.47% CTR across 19 streamers."
        canonical="/case-study/samsung-fold7"
        ogType="article"
        ogImage="/lovable-uploads/blog-samsung-twitch-campaign-hero.jpg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Samsung Galaxy Z Fold7 × Beta Ads: Norwegian Twitch Campaign",
          "description": "How Samsung launched the Galaxy Z Fold7 to Norwegian gamers through native Twitch overlay ads and streamer integrations.",
          "url": "https://beta-ads.no/case-study/samsung-fold7",
          "image": "https://beta-ads.no/lovable-uploads/blog-samsung-twitch-campaign-hero.jpg",
          "author": { "@type": "Organization", "name": "Beta Ads" },
          "publisher": { "@type": "Organization", "name": "Beta Ads", "logo": { "@type": "ImageObject", "url": "https://beta-ads.no/lovable-uploads/logo-color.png" } },
          "isPartOf": { "@id": "https://beta-ads.no/#website" }
        }}
      />
      {/* Samsung-blue top accent stripe */}
      <div
        className="h-px w-full"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${SAMSUNG_BLUE} 50%, transparent 100%)` }}
        aria-hidden
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-28 md:pt-36 pb-20">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to campaigns
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-5">
            <div
              className="flex items-center justify-center rounded-xl border bg-background p-2.5"
              style={{ borderColor: `${SAMSUNG_BLUE}33`, boxShadow: `0 0 0 1px ${SAMSUNG_BLUE}1a` }}
            >
              <img src="/lovable-uploads/icon-samsung.svg" alt="Samsung" className="h-7 w-auto" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span
                className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: SAMSUNG_BLUE }}
              >
                Norway · Galaxy Z Fold7 launch
              </span>
              <span className="text-xs text-muted-foreground tracking-wide">Case Study · 2025</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Samsung × Beta Ads
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            How Samsung launched the Galaxy Z Fold7 to Norway's gaming community through native Twitch overlay ads
            and live streamer integrations - delivering 23× the CTR of standard display advertising.
          </p>
        </div>

        {/* Key stats bar */}
        <div className="grid grid-cols-3 gap-px mb-10 border border-border rounded-2xl overflow-hidden bg-border">
          {[
            { value: "300K+", label: "Completed views" },
            { value: "2.34%", label: "Click-through rate" },
            { value: "28", label: "Streamers" },
          ].map((s) => (
            <div key={s.label} className="bg-background px-6 py-5">
              <div className="text-2xl font-bold text-foreground tracking-tight">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <Suspense fallback={<div className="py-12 text-center text-muted-foreground text-sm">Loading...</div>}>
          <SamsungFold7CaseStudy />
        </Suspense>
      </div>
      <SPFooter />
    </>
  );
};

export default CaseStudySamsungFold7;
