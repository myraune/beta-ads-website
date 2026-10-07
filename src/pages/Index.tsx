import React from "react";
import { SEO } from "@/components/SEO";
// Homepage v2: concept 05 "One screen" (hero + real booking calendar), concept 02
// planner, then 05's appendix for skeptics. The old SP* sections are kept as files.
import { HomeHero } from "@/components/home/HomeHero";
import { HomePlanner } from "@/components/home/HomePlanner";
import { HomeProof } from "@/components/home/HomeProof";
import "@/components/home/home.css";
import { SPFooter } from "@/components/sections/SPFooter";
// SEO fix: FAQ section added so FAQPage JSON-LD schema matches visible page content
import { HomepageFAQ, homepageFaqs } from "@/components/sections/HomepageFAQ";

const Index: React.FC = () => {
  return (
    <>
      <SEO
        title="Beta Ads | Native Twitch & Livestream Advertising"
        description="Native advertising platform for Twitch, YouTube and Kick livestreams in the Nordics. Custom overlay ads inside the stream that ad blockers can't remove."
        canonical="/"
        locale="en"
        alternates={[
          { hreflang: "en", href: "/" },
          { hreflang: "no", href: "/norge" },
          { hreflang: "x-default", href: "/" },
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Beta Ads in 60 seconds",
            description: "How Beta Ads puts brands inside livestreams: find streamers, build a campaign, go live across dozens of streams and measure every view, click and chat mention in one dashboard.",
            thumbnailUrl: "https://beta-ads.no/videos/beta-ads-film-poster.webp",
            contentUrl: "https://beta-ads.no/videos/beta-ads-film.mp4",
            uploadDate: "2026-09-29",
            duration: "PT1M7S",
            publisher: { "@id": "https://beta-ads.no/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": "https://beta-ads.no/#service",
            parentOrganization: { "@id": "https://beta-ads.no/#organization" },
            name: "Beta Ads",
            legalName: "Beta Agency AS",
            taxID: "933303136",
            identifier: {
              "@type": "PropertyValue",
              name: "Norwegian Organization Number",
              value: "933303136",
            },
            alternateName: ["Beta Ads Nordic", "Beta Ads Norway", "Beta Ads Norge"],
            url: "https://beta-ads.no",
            logo: {
              "@type": "ImageObject",
              url: "https://beta-ads.no/lovable-uploads/logo-color.png",
              width: 200,
              height: 50,
            },
            description: "Native advertising platform for Twitch, YouTube and Kick livestreams in the Nordics. Custom overlay ads inside the stream that ad blockers can't remove.",
            foundingDate: "2024-04-15",
            slogan: "Your brand, live on Twitch – without interruptions",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Frosta",
              addressRegion: "Trøndelag",
              postalCode: "7633",
              addressCountry: "NO",
            },
            areaServed: [
              { "@type": "Country", name: "Norway", alternateName: "Norge" },
              { "@type": "Country", name: "Sweden", alternateName: "Sverige" },
              { "@type": "Country", name: "Finland", alternateName: "Suomi" },
              { "@type": "Country", name: "Denmark", alternateName: "Danmark" },
            ],
            sameAs: [
              "https://www.linkedin.com/company/beta-nordic/",
              "https://discord.gg/tSmM6XMEkn",
              "https://www.instagram.com/betaadsofficial",
              "https://twitter.com/betaads",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              email: "andreas@beta-ads.no",
              telephone: "+47-46195548",
              contactType: "Customer Service",
              areaServed: ["NO", "SE", "DK", "FI"],
              availableLanguage: ["Norwegian", "English", "Swedish", "Danish", "Finnish"],
            },
            founder: {
              "@type": "Person",
              "@id": "https://beta-ads.no/#founder",
              name: "Andreas Myraune",
              jobTitle: "Founder & CEO",
              sameAs: ["https://www.linkedin.com/in/myraune"],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homepageFaqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
          },
        ]}
      />
      {/* Accessibility fix: Layout.tsx already provides <main> - nested <main> is invalid HTML (WCAG 1.3.6) */}
      <div className="min-h-screen bh-root">
        <HomeHero />
        <HomePlanner />
        <HomeProof />
        <div className="bh-tail">
          <HomepageFAQ />
          <SPFooter />
        </div>
      </div>
    </>
  );
};

export default Index;
