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

const DATE_LOCALE: Record<PageLocale, string> = {
  en: "en-US",
  no: "nb-NO",
  sv: "sv-SE",
  da: "da-DK",
  fi: "fi-FI",
};

/**
 * Locale-correct display date derived from `dateISO`, NOT the stored `date`
 * string (which is authored in English - e.g. "Mar 31, 2026" - and reads
 * jarring stitched into Norwegian/Swedish/Danish/Finnish copy). Every listing
 * surface should call this instead of rendering `post.date` directly.
 */
export function formatPostDate(dateISO: string, locale: PageLocale): string {
  // Parse the Y-M-D parts explicitly and build a LOCAL date at noon, rather
  // than `new Date(dateISO)` (parsed as UTC midnight) - the latter renders as
  // the previous day for any visitor in a timezone behind UTC.
  const m = dateISO.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return dateISO;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12);
  if (Number.isNaN(d.getTime())) return dateISO;
  return d.toLocaleDateString(DATE_LOCALE[locale], { day: "numeric", month: "short", year: "numeric" });
}

/** Small UI-chrome strings that appear around every post regardless of its own content. */
export interface BlogUiLabels {
  backToBlog: string;
  relatedArticles: string;
  share: string;
  loadingDashboard: string;
}

const BLOG_UI_LABELS: Record<PageLocale, BlogUiLabels> = {
  en: { backToBlog: "Back to Blog", relatedArticles: "Related Articles", share: "Share:", loadingDashboard: "Loading dashboard..." },
  no: { backToBlog: "Tilbake til bloggen", relatedArticles: "Relaterte artikler", share: "Del:", loadingDashboard: "Laster dashboard …" },
  sv: { backToBlog: "Tillbaka till bloggen", relatedArticles: "Relaterade artiklar", share: "Dela:", loadingDashboard: "Laddar dashboard …" },
  da: { backToBlog: "Tilbage til bloggen", relatedArticles: "Relaterede artikler", share: "Del:", loadingDashboard: "Indlæser dashboard …" },
  fi: { backToBlog: "Takaisin blogiin", relatedArticles: "Aiheeseen liittyvät artikkelit", share: "Jaa:", loadingDashboard: "Ladataan hallintapaneelia …" },
};

export function blogUiLabels(locale: PageLocale): BlogUiLabels {
  return BLOG_UI_LABELS[locale] ?? BLOG_UI_LABELS.en;
}

/**
 * Best-guess visitor language from the browser, mapped onto the site's
 * supported locales. Used to pick which single language card to show on the
 * general /blog listing (see `dedupeByTranslationGroup`) - a Swedish visitor
 * should not see the Norwegian/Danish/Finnish copies of the same article.
 */
export function detectPreferredLocale(): PageLocale {
  if (typeof navigator === "undefined") return "en";
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    const base = raw?.toLowerCase().slice(0, 2);
    if (base === "nb" || base === "nn" || base === "no") return "no";
    if (base === "sv") return "sv";
    if (base === "da") return "da";
    if (base === "fi") return "fi";
    if (base === "en") return "en";
  }
  return "en";
}

/**
 * Collapses every language variant of the same article (posts sharing a
 * `translationGroup`) down to ONE card, picking the visitor's preferred
 * locale when available and falling back through en -> no -> whatever's
 * first. Posts with no translationGroup (one-off, single-language content
 * like the streamer roundups) pass through untouched.
 *
 * The /blog/<country> hubs intentionally do NOT use this - they already
 * filter to a single market and are meant to show every post in that
 * language, translationGroup or not.
 */
export function dedupeByTranslationGroup<T extends LocalizablePost>(posts: T[], preferred: PageLocale): T[] {
  const groups = new Map<string, T[]>();
  const singles: T[] = [];
  for (const p of posts) {
    if (!p.translationGroup) { singles.push(p); continue; }
    const arr = groups.get(p.translationGroup);
    if (arr) arr.push(p); else groups.set(p.translationGroup, [p]);
  }
  const picks: T[] = [...singles];
  for (const variants of groups.values()) {
    const pick =
      variants.find((p) => resolvePostLocale(p) === preferred) ??
      variants.find((p) => resolvePostLocale(p) === "en") ??
      variants.find((p) => resolvePostLocale(p) === "no") ??
      variants[0];
    picks.push(pick);
  }
  return picks;
}
