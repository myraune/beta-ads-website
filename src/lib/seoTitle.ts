// Final <title> rule, shared by <SEO> and scripts/generate-seo-pages.mjs so the
// static shell and the rendered page agree. Google truncates around 60 chars,
// so the " | Beta Ads" suffix is only added (or kept) when the whole title
// still fits. The keyword-first page title always wins over the brand suffix.
export const SEO_TITLE_MAX = 60;
const SUFFIX = " | Beta Ads";

export function formatSeoTitle(title: string): string {
  const t = title.trim();
  if (t.includes("Beta Ads")) {
    if (t.length > SEO_TITLE_MAX && t.endsWith(SUFFIX)) return t.slice(0, -SUFFIX.length).trim();
    return t;
  }
  const full = `${t}${SUFFIX}`;
  return full.length <= SEO_TITLE_MAX ? full : t;
}
