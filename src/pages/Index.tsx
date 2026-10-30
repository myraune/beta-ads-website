import React from "react";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
// Homepage "31 Final / Platform" (approved static design, ported 1:1 in
// src/components/home-final). It renders its own nav and footer; Layout hides the
// site-wide ones on "/". The v2 home/* and SP* sections are kept as files.
import { HomeFinal, finalFaqs } from "@/components/home-final/HomeFinal";
import { HERO_POSTER } from "@/components/home-final/heroPlayer";

const Index: React.FC = () => {
  return (
    <>
      {/* The hero poster is the mobile LCP. It is drawn inside the lazy Index
          chunk, so the preload scanner cannot find it in the static HTML. This
          lands in the prerendered / only, not on every route. */}
      <Helmet>
        <link rel="preload" as="image" href={HERO_POSTER} {...{ fetchpriority: "high" }} />
      </Helmet>
      <SEO
        title="Beta Ads | The platform for livestream ads"
        description="Find streamers, launch animated brand overlays and read the report in one platform for Twitch, YouTube and Kick. Pay per 1,000 views that played."
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
            "@type": "ProfessionalService",
            "@id": "https://beta-ads.no/#service",
            parentOrganization: { "@id": "https://beta-ads.no/#organization" },
            name: "Beta Ads",
            legalName: "BETA AGENCY AS",
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
              url: "https://beta-ads.no/brand/beta-ads-logo-512.png",
              width: 512,
              height: 512,
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
              email: "sales@beta-ads.no",
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
              image: "https://myraune.com/about/andreas.jpg",
              sameAs: ["https://www.linkedin.com/in/myraune", "https://myraune.com/about"],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: finalFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />
      <HomeFinal />
    </>
  );
};

export default Index;
