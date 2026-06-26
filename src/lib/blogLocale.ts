/**
 * Shared blog-locale resolution + Nordic-market metadata.
 *
 * Single source of truth for "what language is this post, and which country
 * hub does it belong to". Used by BlogPost.tsx (hreflang / og:locale) and the
 * per-country blog hubs (/blog/norge, /blog/sverige, /blog/suomi, /blog/danmark).
 *
 * Posts get their language from an explicit `locale` field when present;
 * otherwise we fall back to the legacy heuristic (category + slug + title) so
 * the ~100 existing posts keep working without being re-tagged.
 */
import type { PageLocale } from "@/components/SEO";

/** Minimal shape both the full BlogPost and the lightweight BlogPostMeta satisfy. */
export interface LocalizablePost {
  locale?: PageLocale;
  translationGroup?: string;
  category: string;
  slug: string;
  title: string;
  excerpt: string;
}

const NORWEGIAN_CATEGORIES = new Set(["Guider", "Innsikt", "Strategi"]);
const FINNISH_CATEGORIES = new Set(["Oppaat"]);

/** Legacy heuristic - only used when a post has no explicit `locale`. */
function detectFromHeuristics(post: LocalizablePost): PageLocale {
  if (FINNISH_CATEGORIES.has(post.category) || /\b(suomi|mainonta|opas)\b/i.test(post.slug)) {
    return "fi";
  }
  if (/\b(sverige|reklam-sverige|svensk)\b/i.test(post.slug)) return "sv";
  if (/\b(danmark|dansk|reklame-danmark)\b/i.test(post.slug)) return "da";
  if (NORWEGIAN_CATEGORIES.has(post.category)) return "no";
  if (post.category === "Streamer Guide" && /[æøå]/i.test(post.title)) return "no";
  if (
    /[æøå]/i.test(post.title) &&
    /\b(hvordan|slik|norge|norsk|annonser|markedsf)\b/i.test(
      post.title.toLowerCase() + " " + post.excerpt.toLowerCase()
    )
  ) {
    return "no";
  }
  return "en";
}

/** The post's content language. Prefers the explicit field, falls back to heuristics. */
export function resolvePostLocale(post: LocalizablePost): PageLocale {
  return post.locale ?? detectFromHeuristics(post);
}

export interface NordicMarket {
  code: PageLocale;
  /** Native country name used in the hub URL: /blog/<hubSlug> */
  hubSlug: string;
  /** Native language/country label for UI + nav */
  label: string;
  /** Short country name */
  country: string;
  /** <html lang> + hreflang value */
  htmlLang: string;
  /** Native "Read in <language>" style label for the language switcher */
  switchLabel: string;
}

/** The four Nordic markets we publish localized content for, in display order. */
export const NORDIC_MARKETS: NordicMarket[] = [
  { code: "no", hubSlug: "norge",   label: "Norge",   country: "Norway",  htmlLang: "no", switchLabel: "Norsk" },
  { code: "sv", hubSlug: "sverige", label: "Sverige", country: "Sweden",  htmlLang: "sv", switchLabel: "Svenska" },
  { code: "fi", hubSlug: "suomi",   label: "Suomi",   country: "Finland", htmlLang: "fi", switchLabel: "Suomi" },
  { code: "da", hubSlug: "danmark", label: "Danmark", country: "Denmark", htmlLang: "da", switchLabel: "Dansk" },
];

export const marketByCode = (code: PageLocale): NordicMarket | undefined =>
  NORDIC_MARKETS.find((m) => m.code === code);

export const marketByHubSlug = (hubSlug: string): NordicMarket | undefined =>
  NORDIC_MARKETS.find((m) => m.hubSlug === hubSlug);
