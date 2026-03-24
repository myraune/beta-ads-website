import React from "react";
import { SEO } from "@/components/SEO";
import { SPHero } from "@/components/sections/SPHero";
import { SPBrands } from "@/components/sections/SPBrands";
import { SPFeatures } from "@/components/sections/SPFeatures";
import { SPVideoShowcase } from "@/components/sections/SPVideoShowcase";
import { SPHowItWorks } from "@/components/sections/SPHowItWorks";
import { SPUseCases } from "@/components/sections/SPUseCases";
import { SPStats } from "@/components/sections/SPStats";
import { SPStreamers } from "@/components/sections/SPStreamers";
import { SPAdFormats } from "@/components/sections/SPAdFormats";
import { SPCTA } from "@/components/sections/SPCTA";
import { SPFooter } from "@/components/sections/SPFooter";

const Index: React.FC = () => {
  return (
    <>
      <SEO
        title="Beta Ads | Native Twitch & Livestream Advertising in the Nordics"
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
            "https://www.linkedin.com/company/betaads/",
            "https://discord.gg/betaads",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            email: "hello@betaads.no",
            contactType: "sales",
          },
        }}
      />
      <main className="min-h-screen">
        <SPHero />
        <SPBrands />
        <SPFeatures />
        <SPVideoShowcase />
        <SPHowItWorks />
        <SPUseCases />
        <SPStats />
        <SPStreamers />
        <SPAdFormats />
        <SPCTA />
        <SPFooter />
      </main>
    </>
  );
};

export default Index;
