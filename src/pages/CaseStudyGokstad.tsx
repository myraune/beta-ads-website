import React from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import GokstadCaseStudy from "@/components/blog/GokstadCaseStudy";
import { ArrowLeft } from "lucide-react";
import { SPFooter } from "@/components/sections/SPFooter";

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
      {/* Gokstad brand accent — navy + red nods to Sandefjord's viking heritage */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent 0%, #0d2c5e 35%, #b8212e 65%, transparent 100%)" }}
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

        <div className="mb-6">
          <div className="flex items-center gap-4 mb-5">
            <div
              className="flex items-center justify-center rounded-xl border bg-background p-2.5"
              style={{ borderColor: "#0d2c5e33", boxShadow: "0 0 0 1px #0d2c5e1a" }}
            >
              <img
                src="/lovable-uploads/logo-gokstad.webp"
                alt="Gokstad Akademiet"
                className="h-7 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span
                className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: "#b8212e" }}
              >
                Sandefjord · IT &amp; design academy · Recruitment
              </span>
              <span className="text-xs text-muted-foreground tracking-wide">
                Case Study · Autumn 2026 intake
              </span>
            </div>
          </div>
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
      <SPFooter />
    </>
  );
};

export default CaseStudyGokstad;
