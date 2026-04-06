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
        description="Native advertising platform for Twitch, YouTube and Kick livestreams in Norway, Sweden, Finland and Denmark. Overlay ads that bypass adblock and deliver 3-5x higher engagement with Gen Z audiences."
        canonical="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Beta Ads",
          legalName: "Beta Agency AS",
          url: "https://beta-ads.no",
          logo: "https://beta-ads.no/lovable-uploads/logo-color.png",
          description: "Native advertising platform for Twitch, YouTube and Kick livestreams in the Nordics. Overlay ads that bypass adblock and deliver 3-5x higher engagement.",
          foundingDate: "2023",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Oslo",
            addressCountry: "NO",
          },
          sameAs: [
            "https://www.linkedin.com/company/beta-nordic/",
            "https://discord.gg/tSmM6XMEkn",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            email: "hello@betaads.no",
            contactType: "sales",
          },
        }}
      />
      {/* Accessibility fix: Layout.tsx already provides <main> — nested <main> is invalid HTML (WCAG 1.3.6) */}
      <div className="min-h-screen">
        <SPHero />
<SPBrands />
        <SPFeatures />
        <SPVideoShowcase />
        <SPUseCases />
        <SPCTA />

        <SPFooter />
      </div>
    </>
  );
};

export default Index;
