import React from "react";
import { SEO } from "@/components/SEO";
import KomplettCaseStudy from "@/components/blog/KomplettCaseStudy";
import { SPFooter } from "@/components/sections/SPFooter";

const CaseStudyKomplett: React.FC = () => {
  return (
    <>
      <SEO
        title="Komplett Månedens Gaming Deal Case Study | Beta Ads"
        description="How Komplett's tactical retail campaign hit a 4.48% peak-day CTR across 34 Norwegian gaming streamers. 151,278 display views, 1,768 verified clicks in 17 days."
        canonical="/case-study/komplett"
        ogType="article"
        ogImage="/lovable-uploads/case-studies/komplett-preview.jpg"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": "https://beta-ads.no/case-study/komplett#article",
            "headline": "Komplett × Beta Ads: Tactical Norwegian Gaming Retail Campaign",
            "description":
              "Komplett ran the Månedens Gaming Deal across 34 Norwegian streamers and 46 categories, delivering 151,278 display views with a 4.48% peak-day CTR.",
            "url": "https://beta-ads.no/case-study/komplett",
            "datePublished": "2025-08-01",
            "dateModified": "2026-05-11",
            "author": {
              "@type": "Organization",
              "name": "Beta Ads",
              "url": "https://beta-ads.no",
              "sameAs": ["https://www.linkedin.com/company/beta-nordic/"],
            },
            "publisher": {
              "@type": "Organization",
              "name": "Beta Ads",
              "logo": {
                "@type": "ImageObject",
                "url": "https://beta-ads.no/lovable-uploads/logo-color.png",
                "width": 200,
                "height": 50,
              },
            },
            "isPartOf": { "@id": "https://beta-ads.no/#website" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://beta-ads.no/" },
              { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://beta-ads.no/case-studies" },
              { "@type": "ListItem", "position": 3, "name": "Komplett", "item": "https://beta-ads.no/case-study/komplett" }
            ],
          },
        ]}
      />
      <KomplettCaseStudy />
      <SPFooter />
    </>
  );
};

export default CaseStudyKomplett;
