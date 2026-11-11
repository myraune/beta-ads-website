import React from "react";
import { SEO } from "@/components/SEO";
import { recapVideoLd, RecapFilm } from "@/components/blog/RecapFilm";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* Every number on this page is from Norstat's campaign report (norstat-report-general, June 2024). */
const results: [string, string][] = [
  ["70,083", "Completed views"],
  ["1,012", "Times the ad was displayed"],
  ["24,065", "Unique viewers"],
  ["100%", "Male audience"],
  ["76%", "Aged 18 to 24 (the other 24% aged 25 to 34)"],
  ["20", "Norwegian streamers"],
];

const CaseStudyNorstat: React.FC = () => {
  return (
    <>
      <SEO
        title="Norstat Case Study | Beta Ads"
        description="How Norstat put its survey panel in front of young Norwegian men on Twitch: 20 streamers, 70,083 completed views and a 100% male audience, 76% aged 18 to 24."
        canonical="/case-study/norstat"
        ogType="article"
        articlePublishedTime="2026-11-02"
        articleModifiedTime="2026-11-02"
        ogImage="/videos/norstat-recap-poster.webp"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": "https://beta-ads.no/case-study/norstat#article",
            "headline": "Norstat x Beta Ads: Panel Recruitment on Twitch",
            "description": "How Norstat put its survey panel in front of young Norwegian men on Twitch: 20 streamers, 70,083 completed views, 24,065 unique viewers.",
            "url": "https://beta-ads.no/case-study/norstat",
            "image": "https://beta-ads.no/videos/norstat-recap-poster.webp",
            "datePublished": "2026-11-02",
            "dateModified": "2026-11-02",
            "author": {
              "@type": "Organization",
              "name": "Beta Ads",
              "url": "https://beta-ads.no",
              "sameAs": ["https://www.linkedin.com/company/beta-ads-nordics/"],
            },
            "publisher": { "@type": "Organization", "name": "Beta Ads", "logo": {
                "@type": "ImageObject",
                "url": "https://beta-ads.no/brand/beta-ads-logo-512.png",
                "width": 512,
                "height": 512,
              } },
            "isPartOf": { "@id": "https://beta-ads.no/#website" }
          },
          recapVideoLd("norstat", "Norstat × Beta Ads: campaign recap", "Recap of Norstat's panel campaign on Norwegian Twitch: 20 streamers, 70,083 completed views, 24,065 unique viewers, a 100% male audience.", 32, "2026-11-02"),
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://beta-ads.no/" },
              { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://beta-ads.no/case-studies" },
              { "@type": "ListItem", "position": 3, "name": "Norstat", "item": "https://beta-ads.no/case-study/norstat" }
            ]
          }
        ]}
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
              style={{ borderColor: "#00C99933", boxShadow: "0 0 0 1px #00C9991a" }}
            >
              <img src="/lovable-uploads/logo-norstat.png" alt="Norstat" className="logo-ink h-7 w-auto object-contain" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">Panel recruitment · Norway</span>
              <span className="text-xs text-muted-foreground">Case Study · June 2024</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Norstat × Beta Ads</h1>
          <p className="text-muted-foreground">
            How Norstat put its survey panel in front of young Norwegian men, in the streams they watch every evening.
          </p>
        </div>

        <div className="space-y-8">
          {/* Recap film - real clips from the campaign's streams, cut to the final report numbers */}
          <RecapFilm slug="norstat" label="Norstat × Beta Ads campaign recap" />

          <section>
            <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">Challenge</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Norstat runs a survey panel: members answer short surveys and collect points they can swap for gift cards. Norstat wanted more young men in the panel, so the ad had to reach them where they actually spend their evenings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">Solution</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              In June 2024 the panel offer ran as an overlay on 20 Norwegian Twitch streams. The ad showed the Norstat app and the gift cards on offer, from PlayStation, Steam and Power, and viewers typed !norstat in chat to get the sign-up link. Several streamers explained the offer in their own words while it was on screen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">Results</h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              The audience was exactly the group Norstat asked for: the report shows a 100% male audience, 76% of them aged 18 to 24, and 92.6% of viewers in Norway.
            </p>
            <ul className="space-y-3 mb-8">
              {results.map(([v, l]) => (
                <li key={l} className="text-lg text-muted-foreground flex items-start gap-3">
                  <span className="text-primary font-bold text-2xl leading-none">•</span>
                  <span><strong className="text-foreground">{v}</strong> {l}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed text-lg mt-8">
              <strong className="text-foreground">
                Want to reach the same audience?{" "}
                <Link to="/contact" className="text-primary hover:underline font-bold">Talk to us</Link>.
              </strong>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default CaseStudyNorstat;
