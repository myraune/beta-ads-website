import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SPFooter } from "@/components/sections/SPFooter";
import { SEO } from "@/components/SEO";
import type { PageLocale } from "@/lib/blogLocale";

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  jsonLd?: object | object[];
  locale?: PageLocale;
  alternates?: Array<{ hreflang: PageLocale | "x-default"; href: string }>;
  ogImage?: string;
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
  /**
   * Opt in to a page that is dark end to end, regardless of the visitor's
   * theme. Scopes Tailwind's `dark` class to this page so every semantic token
   * (bg-card, border-border, text-muted-foreground) resolves to its dark value,
   * and paints the page background so the hero colour carries all the way down
   * through the CTA block instead of stopping at the first section.
   * Opt in only; every existing page keeps following the visitor's theme.
   */
  darkPage?: boolean;
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
  darkPage = false,
}) => {
  return (
    /* SEO fix: changed from <main> to <div> - Layout.tsx already provides the <main> landmark;
       nested <main> elements are invalid HTML (WCAG 1.3.6) and confuse screen readers / search engines */
    <div
      className={`min-h-screen text-foreground ${
        darkPage ? "dark bg-[hsl(240_11%_5%)]" : ""
      }`}
    >
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        jsonLd={seo.jsonLd}
        locale={seo.locale}
        alternates={seo.alternates}
        ogImage={seo.ogImage}
      />

      {children}

      {/* ── End-of-page CTA ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="rounded-3xl border border-border p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3">
                {cta.heading}
              </h2>
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
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
                    className="text-foreground hover:bg-muted rounded-full px-8 border border-border"
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
