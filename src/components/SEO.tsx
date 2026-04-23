import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

/**
 * Supported page locales. `x-default` is emitted automatically as the
 * hreflang fallback when the page declares any locale.
 */
export type PageLocale = "en" | "no" | "sv" | "fi";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  // Explicit dimensions avoid social crawlers having to download the image to detect size
  ogImageWidth?: number;
  ogImageHeight?: number;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /**
   * Page language code. Sets <html lang>, og:locale, and (when combined with
   * `alternates` or a canonical URL) emits the matching self-referential
   * hreflang link so Google can geo/language-target properly.
   */
  locale?: PageLocale;
  /**
   * Explicit alternate-language URLs for the same content. Pass absolute or
   * root-relative URLs. If provided, a self-referential entry for the
   * current locale and an x-default fallback are added automatically.
   *
   * Example:
   *   alternates={[
   *     { hreflang: "en", href: "/blog/my-post" },
   *     { hreflang: "no", href: "/blog/innlegget-mitt" },
   *   ]}
   */
  alternates?: Array<{ hreflang: PageLocale | "x-default"; href: string }>;
}

const OG_LOCALES: Record<PageLocale, string> = {
  en: "en_US",
  no: "nb_NO",
  sv: "sv_SE",
  fi: "fi_FI",
};

const SITE_URL = "https://beta-ads.no";
const DEFAULT_OG_IMAGE = `${SITE_URL}/lovable-uploads/og-social-preview.png`;
const SITE_NAME = "Beta Ads";

const toAbsolute = (href: string): string =>
  href.startsWith("http")
    ? href
    : `${SITE_URL}${href.startsWith("/") ? href : `/${href}`}`;

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage,
  ogImageAlt = "Beta Ads - Native Twitch Advertising Platform for the Nordics",
  ogImageWidth = 1200,
  ogImageHeight = 630,
  noindex = false,
  jsonLd,
  locale = "en",
  alternates,
}) => {
  const fullTitle = title.includes("Beta Ads") ? title : `${title} | Beta Ads`;

  const canonicalUrl = canonical ? toAbsolute(canonical) : undefined;

  const resolvedOgImage = ogImage ? toAbsolute(ogImage) : DEFAULT_OG_IMAGE;

  // Build the hreflang list. If explicit alternates are passed, use them;
  // otherwise emit just a self-referential entry for the current locale plus
  // x-default (both point at the canonical URL). We only emit hreflang if the
  // caller gave us a canonical URL to anchor against — without one, Google
  // can't trust the mapping anyway.
  const hreflangTags: Array<{ hreflang: string; href: string }> = [];
  if (canonicalUrl) {
    if (alternates && alternates.length > 0) {
      alternates.forEach((alt) => {
        hreflangTags.push({ hreflang: alt.hreflang, href: toAbsolute(alt.href) });
      });
      // Ensure self-referential entry exists for the current locale.
      if (!alternates.some((a) => a.hreflang === locale)) {
        hreflangTags.push({ hreflang: locale, href: canonicalUrl });
      }
      // Ensure x-default exists (falls back to the current canonical).
      if (!alternates.some((a) => a.hreflang === "x-default")) {
        hreflangTags.push({ hreflang: "x-default", href: canonicalUrl });
      }
    } else if (locale !== "en") {
      // Single-language page that's not English — still worth signalling the
      // language explicitly plus an x-default fallback.
      hreflangTags.push({ hreflang: locale, href: canonicalUrl });
      hreflangTags.push({ hreflang: "x-default", href: canonicalUrl });
    }
  }

  const ogLocale = OG_LOCALES[locale];

  // Imperative fallback — react-helmet-async@3 has a known React 18 StrictMode
  // issue where Helmet updates don't propagate reliably on route changes, so
  // every page ended up with the static title from index.html. Setting these
  // directly via useEffect guarantees the browser tab, social crawlers that
  // re-fetch the DOM, and any analytics that read document.title see the
  // correct per-page values immediately.
  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.setAttribute("lang", locale);

    const upsertMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:type"]', "property", "og:type", ogType);
    upsertMeta('meta[property="og:image"]', "property", "og:image", resolvedOgImage);
    upsertMeta('meta[property="og:locale"]', "property", "og:locale", ogLocale);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", resolvedOgImage);

    if (canonicalUrl) {
      let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalUrl);
      upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    }

    // Replace any existing hreflang links — simpler than tracking individual
    // entries because route changes can add/remove languages per page.
    document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((el) => el.remove());
    hreflangTags.forEach(({ hreflang, href }) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", hreflang);
      link.setAttribute("href", href);
      document.head.appendChild(link);
    });

    if (noindex) {
      upsertMeta('meta[name="robots"]', "name", "robots", "noindex, nofollow");
    } else {
      const robots = document.head.querySelector('meta[name="robots"]');
      if (robots?.getAttribute("content")?.includes("noindex")) {
        robots.setAttribute("content", "index, follow");
      }
    }
  }, [fullTitle, description, canonicalUrl, resolvedOgImage, ogType, noindex, locale, ogLocale, hreflangTags]);

  return (
    <Helmet>
      <html lang={locale} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* hreflang alternates are emitted imperatively by useEffect above —
           rendering them via Helmet here too caused duplicates because
           Helmet's tags survive the useEffect cleanup pass on re-renders. */}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      <meta name="twitter:site" content="@betaads" />

      {/* JSON-LD structured data */}
      {jsonLd && (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};
