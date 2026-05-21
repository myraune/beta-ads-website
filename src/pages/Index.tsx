import React from "react";
import { SEO } from "@/components/SEO";
import { SPHero } from "@/components/sections/SPHero";
import { SPBrands } from "@/components/sections/SPBrands";
import { SPFeatures } from "@/components/sections/SPFeatures";
import { SPVideoShowcase } from "@/components/sections/SPVideoShowcase";
import { SPUseCases } from "@/components/sections/SPUseCases";
import { SPCTA } from "@/components/sections/SPCTA";
import { SPFooter } from "@/components/sections/SPFooter";
// SEO fix: FAQ section added so FAQPage JSON-LD schema matches visible page content
import { HomepageFAQ } from "@/components/sections/HomepageFAQ";

const Index: React.FC = () => {
  return (
    <>
      <SEO
        title="Beta Ads | Native Twitch & Livestream Advertising"
        description="Native advertising platform for Twitch, YouTube and Kick livestreams in the Nordics. Overlay ads that bypass adblock and deliver 3-5x higher engagement."
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
            "@type": "Organization",
            "@id": "https://beta-ads.no/#organization",
            name: "Beta Ads",
            legalName: "Beta Agency AS",
            alternateName: ["Beta Ads Nordic", "Beta Ads Norway", "Beta Ads Norge"],
            url: "https://beta-ads.no",
            logo: {
              "@type": "ImageObject",
              url: "https://beta-ads.no/lovable-uploads/logo-color.png",
              width: 200,
              height: 50,
            },
            description: "Native advertising platform for Twitch, YouTube and Kick livestreams in the Nordics. Overlay ads that bypass adblock and deliver 3-5x higher engagement.",
            foundingDate: "2023",
            slogan: "Your brand, live on Twitch – without interruptions",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Oslo",
              addressRegion: "Oslo",
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
              email: "hello@betaads.no",
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
              sameAs: ["https://www.linkedin.com/in/andreasmyraune"],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://beta-ads.no/#website",
            name: "Beta Ads",
            url: "https://beta-ads.no",
            publisher: { "@id": "https://beta-ads.no/#organization" },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://beta-ads.no/blog?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "How is this different from Twitch's own ads?", acceptedAnswer: { "@type": "Answer", text: "Twitch's native ads are pre-rolls and mid-rolls that viewers skip or block with adblock. Our overlay ads are built directly into the stream itself - they bypass adblock entirely and feel like part of the content, not an interruption." } },
              { "@type": "Question", name: "What's the minimum campaign budget?", acceptedAnswer: { "@type": "Answer", text: "Campaign budgets vary based on reach, duration, and market. Contact us directly for a custom quote - we'll match the right streamers and format to your goals and budget." } },
              { "@type": "Question", name: "How do you ensure brand safety?", acceptedAnswer: { "@type": "Answer", text: "Every streamer in our network is vetted and approved. We monitor streams in real-time and have content guidelines in place. You approve every streamer before your campaign goes live." } },
              { "@type": "Question", name: "What metrics and reporting do I get?", acceptedAnswer: { "@type": "Answer", text: "You get real-time access to impressions, CTR, viewership data, and engagement metrics through our dashboard. Weekly reports are delivered during active campaigns with actionable insights." } },
              { "@type": "Question", name: "Can I target specific games or audiences?", acceptedAnswer: { "@type": "Answer", text: "Yes. You can target by game category, streamer demographics, viewer location (country-level), streaming schedule, and audience size. We help you find the right streamers for your brand." } },
              { "@type": "Question", name: "How quickly can a campaign go live?", acceptedAnswer: { "@type": "Answer", text: "From brief to broadcast in as little as 5 business days. We handle creative production, streamer matching, and deployment - you just approve the final artwork and streamer list." } },
            ],
          },
        ]}
      />
      {/* Accessibility fix: Layout.tsx already provides <main> - nested <main> is invalid HTML (WCAG 1.3.6) */}
      <div className="min-h-screen">
        <SPHero />
        <SPBrands />
        <SPFeatures />
        <SPVideoShowcase />
        <SPUseCases />
        <SPCTA />
        <HomepageFAQ />
        <SPFooter />
      </div>
    </>
  );
};

export default Index;
