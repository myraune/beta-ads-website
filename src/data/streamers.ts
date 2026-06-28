/**
 * Fler-marked streamer-indeks.
 *
 * Samler creator-datasettene fra alle nordiske markeder bak felles oppslag, så
 * profilsiden (/streamere/<handle>) og hub-sidene kan finne en streamer uansett
 * hvilket land hun tilhører. Twitch-handles er globalt unike, så ett flatt
 * oppslag holder.
 *
 * Markedene legges til etter hvert som datasettene bygges:
 *   no -> norskeStreamere.ts (ferdig)
 *   se -> svenskaStreamare.ts
 *   da -> danskeStreamere.ts
 *   fi -> suomalaisetStriimaajat.ts
 */
import { CREATORS as NO_CREATORS, type CreatorProfile } from "@/data/norskeStreamere";

export type { CreatorProfile };

export type MarketCode = "no" | "se" | "da" | "fi";

/** Creator-lister per marked. Tomme markeder utelates til de er bygget. */
export const MARKET_CREATORS: Partial<Record<MarketCode, CreatorProfile[]>> = {
  no: NO_CREATORS,
};

/** Flat liste over alle creators på tvers av markeder. */
export const ALL_CREATORS: CreatorProfile[] = Object.values(MARKET_CREATORS).flat();

/** Slå opp en creator på Twitch-handle på tvers av alle markeder. */
export function getCreatorByHandle(handle: string): CreatorProfile | undefined {
  const h = handle.toLowerCase();
  return ALL_CREATORS.find((c) => c.handle.toLowerCase() === h);
}

/** Hvilket marked en handle tilhører (for breadcrumbs/lenker). */
export function getMarketOfHandle(handle: string): MarketCode | undefined {
  const h = handle.toLowerCase();
  for (const [market, list] of Object.entries(MARKET_CREATORS) as [MarketCode, CreatorProfile[]][]) {
    if (list.some((c) => c.handle.toLowerCase() === h)) return market;
  }
  return undefined;
}

type Lang = CreatorProfile["language"];

/** Det lokale språknavnet per marked (for "mixed"-merker). */
const MARKET_NATIVE_NAME: Record<MarketCode, string> = {
  no: "Norsk",
  se: "Svensk",
  da: "Dansk",
  fi: "Finsk",
};

const LANG_NATIVE_NAME: Record<string, string> = {
  no: "Norsk",
  sv: "Svensk",
  da: "Dansk",
  fi: "Finsk",
};

/** Streamer på engelsk vs. lokalt språk - styrer farge på språk-taggen. */
export function isNativeLanguage(lang: Lang): boolean {
  return lang === "no" || lang === "sv" || lang === "da" || lang === "fi";
}

/** Kort tag-tekst, f.eks. "Norsk", "Engelsk", "Svensk / Engelsk". */
export function languageLabel(lang: Lang, market: MarketCode = "no"): string {
  if (lang === "en") return "Engelsk";
  if (lang === "mixed") return `${MARKET_NATIVE_NAME[market]} / Engelsk`;
  return LANG_NATIVE_NAME[lang] ?? "Lokalt";
}

/** Lengre tooltip, f.eks. "Streamer på norsk". */
export function languageTooltip(lang: Lang, market: MarketCode = "no"): string {
  if (lang === "en") return "Streamer på engelsk";
  if (lang === "mixed") return `Innhold på ${MARKET_NATIVE_NAME[market].toLowerCase()} og engelsk`;
  return `Streamer på ${(LANG_NATIVE_NAME[lang] ?? "lokalt språk").toLowerCase()}`;
}
