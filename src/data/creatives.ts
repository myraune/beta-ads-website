/* Creative library (/creative-library): shared by the page, the admin page and
   the /api/creatives* functions. The items themselves live in the private Blob
   store (manifest.json); the video files and posters in the public Blob store
   under random-suffixed paths, so a video URL is only known once the API hands
   it out to a visitor who has left their email. */

export const INDUSTRIES = [
  "Food & delivery",
  "Grocery & FMCG",
  "Snacks & drinks",
  "Gaming & hardware",
  "Games & entertainment",
  "Telecom & tech",
  "Fashion & retail",
  "Music & streaming",
  "Education",
  "Finance",
  "Other",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

/** client: a Beta Ads campaign that ran. concept: our spec work for a pitch.
    network: ran on the partner platform in another market, made by the partner. */
export type CreativeKind = "client" | "concept" | "network";

export const KIND_LABEL: Record<CreativeKind, string> = { client: "Campaign", concept: "Concept", network: "Partner network" };
export const isKind = (v: unknown): v is CreativeKind => typeof v === "string" && v in KIND_LABEL;

export type Creative = {
  id: string;
  brand: string;
  title: string;
  industry: Industry;
  kind: CreativeKind;
  /** One or two lines: the idea, not the production notes. */
  description?: string;
  /** Short format label, e.g. "Corner overlay, 12 s". */
  format?: string;
  poster: string;
  /** Only present in API responses for free items or visitors with a valid access token. */
  video?: string;
  /** Set by the API on the FREE_IDS items: watchable without signing up. */
  free?: boolean;
  createdAt: string;
};

export const isIndustry = (v: unknown): v is Industry => typeof v === "string" && (INDUSTRIES as readonly string[]).includes(v);

/** The creatives that play without signing up, shown first in this order:
    three campaigns that ran (Andreas' pick). If one is removed from the
    library, the next in library order takes its place. */
export const FREE_IDS = ["shure-mv6", "samsung-galaxy-z-fold7", "hoyskolen-kristiania"];

/** Library order: manifest order, round-robin across brands (keeping each
    brand's own order), so the first rows show many brands instead of ten
    Komplett ideas in a row. The API puts the free previews in front of it. */
export function libraryOrder(list: Creative[]): Creative[] {
  const groups = new Map<string, Creative[]>();
  list.forEach((c) => groups.set(c.brand, [...(groups.get(c.brand) || []), c]));
  const out: Creative[] = [];
  for (let round = 0; out.length < list.length; round++) groups.forEach((g) => g[round] && out.push(g[round]));
  return out;
}
