import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SPFooter } from "@/components/sections/SPFooter";
import { SEO } from "@/components/SEO";

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  jsonLd?: object | object[];
}

interface CtaProps {
  heading: string;
  subtext: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

interface MarketingPageLayoutProps {
  seo: SeoProps;
  cta: CtaProps;
  children: React.ReactNode;
}

/**
 * Standard wrapper for all marketing / platform pages.
 * Handles SEO, the end-of-page CTA block, and the footer.
 *
 * Structure expected from children:
 *   1. A hero <section> (full-width, handles its own background)
 *   2. Any number of content <section> elements with `border-t border-border`
 *
 * The CTA block and <SPFooter> are rendered automatically after children.
 */
export const MarketingPageLayout: React.FC<MarketingPageLayoutProps> = ({
  seo,
  cta,
  children,
}) => {
  return (
    /* SEO fix: changed from <main> to <div> — Layout.tsx already provides the <main> landmark;
       nested <main> elements are invalid HTML (WCAG 1.3.6) and confuse screen readers / search engines */
    <div className="min-h-screen text-foreground">
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        jsonLd={seo.jsonLd}
      />

      {children}

      {/* ── End-of-page CTA ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="rounded-3xl bg-foreground text-background p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3">
                {cta.heading}
              </h2>
              <p className="text-background/60 max-w-md text-sm leading-relaxed">
                {cta.subtext}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link to={cta.primaryHref}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                >
                  {cta.primaryLabel}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              {cta.secondaryLabel && cta.secondaryHref && (
                <Link to={cta.secondaryHref}>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-background hover:bg-background/10 rounded-full px-8 border border-background/20"
                  >
                    {cta.secondaryLabel}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <SPFooter />
    </div>
  );
};
