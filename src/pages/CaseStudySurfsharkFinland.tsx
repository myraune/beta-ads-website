/*
 * <!-- Needs Surfshark written approval before publishing (poll results are client market data). -->
 *
 * Surfshark VPN Finland, 1 Aug to 1 Sep 2026. Not client-approved.
 * Every figure traces to the sources listed in
 * src/components/case-surfshark-finland/data.ts. Never add prices, CPM,
 * budget or invoice figures to this page.
 */
import React, { lazy, Suspense } from "react";
import { SEO } from "@/components/SEO";

const SurfsharkFinlandCaseStudy = lazy(() => import("@/components/case-surfshark-finland/SurfsharkFinlandCaseStudy"));

const URL = "https://beta-ads.no/case-study/surfshark-finland";
const OG = "/lovable-uploads/case-surfshark-finland/poll-driving.webp";

const CaseStudySurfsharkFinland: React.FC = () => {
  return (
    <>
      <div
        hidden
        aria-hidden
        dangerouslySetInnerHTML={{
          __html: "<!-- Needs Surfshark written approval before publishing (poll results are client market data). -->",
        }}
      />
      <SEO
        title="Surfshark VPN Finland Case Study | Beta Ads"
        description="Surfshark VPN on Finnish Twitch: 100,000 views bought, 119,041 delivered live and 949,957 with replays across 14 creators. 1,281 clicks, 1.08% CTR and 2,833 poll votes on VPN use."
        canonical="/case-study/surfshark-finland"
        ogType="article"
        articlePublishedTime="2026-10-07"
        articleModifiedTime="2026-10-07"
        ogImage={OG}
        ogImageWidth={1280}
        ogImageHeight={720}
        ogImageAlt="Surfshark overlay and Finnish VPN poll on a live Twitch stream"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `${URL}#article`,
            headline: "Surfshark VPN Finland: bought 100,000 views, got close to a million",
            description:
              "How Surfshark ran a month on 14 Finnish Twitch creators with a live poll on every ad moment: delivery, clip verification, poll results, chat, click audience and replays.",
            url: URL,
            image: `https://beta-ads.no${OG}`,
            datePublished: "2026-10-07",
            dateModified: "2026-10-07",
            author: {
              "@type": "Organization",
              name: "Beta Ads",
              url: "https://beta-ads.no",
              sameAs: ["https://www.linkedin.com/company/beta-nordic/"],
            },
            publisher: {
              "@type": "Organization",
              name: "Beta Ads",
              logo: {
                "@type": "ImageObject",
                url: "https://beta-ads.no/lovable-uploads/logo-color.png",
                width: 200,
                height: 50,
              },
            },
            isPartOf: { "@id": "https://beta-ads.no/#website" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://beta-ads.no/" },
              { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://beta-ads.no/case-studies" },
              { "@type": "ListItem", position: 3, name: "Surfshark VPN Finland", item: URL },
            ],
          },
        ]}
      />
      <Suspense fallback={<div className="min-h-screen" />}>
        <SurfsharkFinlandCaseStudy />
      </Suspense>
    </>
  );
};

export default CaseStudySurfsharkFinland;
