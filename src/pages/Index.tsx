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
import { DecoCluster } from "@/components/ui/decorative-shapes";
import { GeometricBackground } from "@/components/ui/shape-landing-hero";

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
{/* Features + video — floating shapes add depth behind both sections */}
        <div className="relative">
          {/* Clip only the background shapes, not the whole section (overflow-hidden breaks sticky) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <GeometricBackground />
          </div>
          <SPFeatures />
          <SPVideoShowcase />
        </div>

        {/* Gradient break — cool mint/teal tint behind platforms */}
        <div className="relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 100% 50% at 60% 50%, hsl(170 50% 50% / 0.05) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full pointer-events-none opacity-[0.03] blur-3xl"
            style={{ background: "hsl(357 70% 55%)" }}
          />
          <DecoCluster position="center-right" variant="mint" />
          <SPUseCases />
        </div>


        {/* Gradient break — warm again behind CTA */}
        <div className="relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 60%, hsl(357 70% 60% / 0.06) 0%, transparent 60%)",
            }}
          />
          <SPCTA />
        </div>

        <SPFooter />
      </div>
    </>
  );
};

export default Index;
