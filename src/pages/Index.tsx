import React from "react";
import { SEO } from "@/components/SEO";
// Homepage "31 Final / Platform" (approved static design, ported 1:1 in
// src/components/home-final). It renders its own nav and footer; Layout hides the
// site-wide ones on "/". The v2 home/* and SP* sections are kept as files.
import { HomeFinal, finalFaqs } from "@/components/home-final/HomeFinal";

const Index: React.FC = () => {
  return (
    <>
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
            mainEntity: finalFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />
      <HomeFinal />
    </>
  );
};

export default Index;
