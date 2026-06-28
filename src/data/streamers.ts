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
import { CREATORS as SE_CREATORS } from "@/data/svenskaStreamare";
import { CREATORS as DA_CREATORS } from "@/data/danskeStreamere";
import { CREATORS as FI_CREATORS } from "@/data/suomalaisetStriimaajat";

export type { CreatorProfile };

export type MarketCode = "no" | "se" | "da" | "fi";

/** Creator-lister per marked. */
export const MARKET_CREATORS: Partial<Record<MarketCode, CreatorProfile[]>> = {
  no: NO_CREATORS,
  se: SE_CREATORS,
  da: DA_CREATORS,
  fi: FI_CREATORS,
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

/** Lokaliserte språk-labels per marked, på markedets eget språk. */
const MARKET_LABELS: Record<MarketCode, { native: string; en: string; on: string }> = {
  no: { native: "Norsk", en: "Engelsk", on: "Streamer på" },
  se: { native: "Svenska", en: "Engelska", on: "Streamar på" },
  da: { native: "Dansk", en: "Engelsk", on: "Streamer på" },
  fi: { native: "Suomi", en: "Englanti", on: "Striimaa kielellä" },
};

/** Streamer på engelsk vs. lokalt språk - styrer farge på språk-taggen. */
export function isNativeLanguage(lang: Lang): boolean {
  return lang === "no" || lang === "sv" || lang === "da" || lang === "fi";
}

/** Kort tag-tekst lokalisert til markedet, f.eks. "Svenska", "Engelska", "Suomi / Englanti". */
export function languageLabel(lang: Lang, market: MarketCode = "no"): string {
  const L = MARKET_LABELS[market];
  if (lang === "en") return L.en;
  if (lang === "mixed") return `${L.native} / ${L.en}`;
  return L.native;
}

/** Lengre tooltip lokalisert til markedet. */
export function languageTooltip(lang: Lang, market: MarketCode = "no"): string {
  const L = MARKET_LABELS[market];
  return `${L.on} ${(lang === "en" ? L.en : lang === "mixed" ? `${L.native} / ${L.en}` : L.native).toLowerCase()}`;
}

/** "Streamer på" / "Streamar på" / "Striimaa kielellä" - til legend-prefiks. */
export function languageLegendPrefix(market: MarketCode = "no"): string {
  return `${MARKET_LABELS[market].on}:`;
}

/** Roundup-post + lokaliserte navigasjons-etiketter per marked. */
/** Lokaliserte UI-etiketter for profilsiden + medieseksjonen per marked. */
export interface ProfileLabels {
  eyebrow: string;
  follow: string;
  highlights: string;
  twitchStats: string;
  followers: string;
  statusLabel: string;
  partner: string;
  affiliate: string;
  since: string;
  category: string;
  statsNote: string;
  inPress: string;
  sources: string;
  sourcesNote: string;
  latestYouTube: string;
  seeAllYouTube: string;
  allClipsTwitch: string;
  seeAllTikTok: string;
  clipsTab: string;
}

const PROFILE_LABELS: Record<MarketCode, ProfileLabels> = {
  no: {
    eyebrow: "Norsk streaming", follow: "Følg", highlights: "Høydepunkter",
    twitchStats: "Twitch-statistikk", followers: "følgere", statusLabel: "Twitch-status",
    partner: "Partner", affiliate: "Affiliate", since: "på Twitch siden", category: "siste kategori",
    statsNote: "Tall hentet fra Twitch. Følgertall er et øyeblikksbilde og endrer seg kontinuerlig.",
    inPress: "I pressen", sources: "Bakgrunn og kilder",
    sourcesNote: "Faktagrunnlag hentet fra sjekkbare offentlige kilder. Tall fra trackere (følgere, gjennomsnittsseere) er øyeblikksbilder og varierer over tid.",
    latestYouTube: "Siste videoer på YouTube", seeAllYouTube: "Se alle på YouTube",
    allClipsTwitch: "Alle klipp på Twitch", seeAllTikTok: "Se alle på TikTok", clipsTab: "Twitch-klipp",
  },
  se: {
    eyebrow: "Svensk streaming", follow: "Följ", highlights: "Höjdpunkter",
    twitchStats: "Twitch-statistik", followers: "följare", statusLabel: "Twitch-status",
    partner: "Partner", affiliate: "Affiliate", since: "på Twitch sedan", category: "senaste kategori",
    statsNote: "Siffror hämtade från Twitch. Följarantal är en ögonblicksbild och ändras kontinuerligt.",
    inPress: "I pressen", sources: "Bakgrund och källor",
    sourcesNote: "Faktaunderlag från kontrollerbara offentliga källor. Siffror från trackers är ögonblicksbilder och varierar över tid.",
    latestYouTube: "Senaste videor på YouTube", seeAllYouTube: "Se alla på YouTube",
    allClipsTwitch: "Alla klipp på Twitch", seeAllTikTok: "Se alla på TikTok", clipsTab: "Twitch-klipp",
  },
  da: {
    eyebrow: "Dansk streaming", follow: "Følg", highlights: "Højdepunkter",
    twitchStats: "Twitch-statistik", followers: "følgere", statusLabel: "Twitch-status",
    partner: "Partner", affiliate: "Affiliate", since: "på Twitch siden", category: "seneste kategori",
    statsNote: "Tal hentet fra Twitch. Følgertal er et øjebliksbillede og ændrer sig løbende.",
    inPress: "I pressen", sources: "Baggrund og kilder",
    sourcesNote: "Faktagrundlag fra kontrollerbare offentlige kilder. Tal fra trackere er øjebliksbilleder og varierer over tid.",
    latestYouTube: "Seneste videoer på YouTube", seeAllYouTube: "Se alle på YouTube",
    allClipsTwitch: "Alle klip på Twitch", seeAllTikTok: "Se alle på TikTok", clipsTab: "Twitch-klip",
  },
  fi: {
    eyebrow: "Suomalainen striimaus", follow: "Seuraa", highlights: "Kohokohdat",
    twitchStats: "Twitch-tilastot", followers: "seuraajaa", statusLabel: "Twitch-status",
    partner: "Partner", affiliate: "Affiliate", since: "Twitchissä vuodesta", category: "viimeisin kategoria",
    statsNote: "Luvut haettu Twitchistä. Seuraajamäärä on tilannekuva ja muuttuu jatkuvasti.",
    inPress: "Mediassa", sources: "Taustat ja lähteet",
    sourcesNote: "Faktapohja tarkistettavista julkisista lähteistä. Trackereiden luvut ovat tilannekuvia ja vaihtelevat ajan myötä.",
    latestYouTube: "Uusimmat videot YouTubessa", seeAllYouTube: "Katso kaikki YouTubessa",
    allClipsTwitch: "Kaikki klipit Twitchissä", seeAllTikTok: "Katso kaikki TikTokissa", clipsTab: "Twitch-klipit",
  },
};

export function profileLabels(market: MarketCode = "no"): ProfileLabels {
  return PROFILE_LABELS[market];
}

export const MARKET_ROUNDUP: Record<
  MarketCode,
  { slug: string; back: string; all: string; noun: string; seoLocale: "no" | "sv" | "da" | "fi" }
> = {
  no: { slug: "norske-twitch-streamere-2026", back: "Tilbake til norske streamere", all: "Alle", noun: "Norske streamere", seoLocale: "no" },
  se: { slug: "svenska-twitch-streamare-2026", back: "Tillbaka till svenska streamers", all: "Alla", noun: "Svenska streamers", seoLocale: "sv" },
  da: { slug: "danske-twitch-streamere-2026", back: "Tilbage til danske streamere", all: "Alle", noun: "Danske streamere", seoLocale: "da" },
  fi: { slug: "suomalaiset-twitch-striimaajat-2026", back: "Takaisin suomalaisiin striimaajiin", all: "Kaikki", noun: "Suomalaiset striimaajat", seoLocale: "fi" },
};
