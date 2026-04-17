import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

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
}

const SITE_URL = "https://beta-ads.no";
const DEFAULT_OG_IMAGE = `${SITE_URL}/lovable-uploads/og-social-preview.png`;
const SITE_NAME = "Beta Ads";

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
}) => {
  const fullTitle = title.includes("Beta Ads") ? title : `${title} | Beta Ads`;

  // Build absolute canonical URL: if already absolute keep it, otherwise prepend SITE_URL
  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${SITE_URL}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : undefined;

  // Build absolute OG image URL
  const resolvedOgImage = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${SITE_URL}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`
    : DEFAULT_OG_IMAGE;

  // Imperative fallback — react-helmet-async@3 has a known React 18 StrictMode
  // issue where Helmet updates don't propagate reliably on route changes, so
  // every page ended up with the static title from index.html. Setting these
  // directly via useEffect guarantees the browser tab, social crawlers that
  // re-fetch the DOM, and any analytics that read document.title see the
  // correct per-page values immediately.
  useEffect(() => {
    document.title = fullTitle;

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

    if (noindex) {
      upsertMeta('meta[name="robots"]', "name", "robots", "noindex, nofollow");
    } else {
      const robots = document.head.querySelector('meta[name="robots"]');
      if (robots?.getAttribute("content")?.includes("noindex")) {
        robots.setAttribute("content", "index, follow");
      }
    }
  }, [fullTitle, description, canonicalUrl, resolvedOgImage, ogType, noindex]);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

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
      <meta property="og:locale" content="en_US" />

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
