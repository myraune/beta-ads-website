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

/** client: ran as a paid campaign. concept: spec work, shown as "Concept". */
export type CreativeKind = "client" | "concept";

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
  /** Only present in API responses for visitors with a valid access token. */
  video?: string;
  createdAt: string;
};

export const isIndustry = (v: unknown): v is Industry => typeof v === "string" && (INDUSTRIES as readonly string[]).includes(v);
