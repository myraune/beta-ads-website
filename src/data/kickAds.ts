/**
 * Facts and copy for the Kick advertising pages (en, no, sv, da, fi).
 *
 * Every number below is taken from Kick's own "KICK Ads Media Kit 2026"
 * (Ads Beta edition, sent to Beta Ads in September 2026) and is labelled with
 * the source Kick gives for it. The kit itself is confidential, so we quote
 * its figures with attribution and draw every chart ourselves; none of Kick's
 * own artwork is reproduced here.
 *
 * The one figure that is ours, not Kick's, is the size of Beta Ads' Nordic
 * Kick creator network. It is labelled as such wherever it appears.
 */

export type KickLang = "en" | "no" | "sv" | "da" | "fi";

export const KICK_LANGS: KickLang[] = ["en", "no", "sv", "da", "fi"];

export const KICK_ROUTES: Record<KickLang, string> = {
  en: "/kick-advertising",
  no: "/kick-annonsering",
  sv: "/kick-annonsering-sverige",
  da: "/kick-annoncering",
  fi: "/kick-mainonta",
};

export const KICK_OG: Record<KickLang, string> = {
  en: "/lovable-uploads/og/kick-advertising-en.png",
  no: "/lovable-uploads/og/kick-advertising-no.png",
  sv: "/lovable-uploads/og/kick-advertising-sv.png",
  da: "/lovable-uploads/og/kick-advertising-da.png",
  fi: "/lovable-uploads/og/kick-advertising-fi.png",
};

/** Kick brand green, used only on Kick's own numbers. */
export const KICK_GREEN = "#53FC18";

/* ------------------------------------------------------------------ */
/* Language-neutral numbers                                             */
/* ------------------------------------------------------------------ */

/** Share of all live-streaming hours watched, Q1 2026. Source: Stream Hatchet x Streamlabs. */
export const MARKET_SHARE = [
  { name: "Twitch", pct: 51.3 },
  { name: "YouTube Gaming", pct: 25.1 },
  { name: "Kick", pct: 14.4 },
  { name: "AfreecaTV", pct: 3.6 },
  { name: "Chzzk", pct: 3.0 },
] as const;

/** Kick's share of Kick + Twitch watch hours, Q2 2026. Source: Kick media kit p. 8. */
export const EUROPE_SHARE = [
  { key: "eastern", pct: 22.4 },
  { key: "northern", pct: 20.0 },
  { key: "southern", pct: 17.4 },
  { key: "europe", pct: 14.9 },
  { key: "western", pct: 4.4 },
] as const;

/** 18 to 34 as share of audience, by platform. Sources listed in the kit (Kick internal, DataReportal, SimilarWeb, Nielsen). */
export const AGE_18_34 = [
  { name: "Kick", pct: 81.7 },
  { name: "Twitch", pct: 69.0 },
  { name: "TikTok", pct: 66.0 },
  { name: "YouTube", pct: 37.5 },
  { key: "tv", name: "Linear TV", pct: 20.0 },
] as const;

/** Kick's own age split. Source: Kick internal 2026. */
export const KICK_AGES = [
  { label: "18-24", pct: 42.3 },
  { label: "25-34", pct: 39.4 },
  { label: "35-44", pct: 8.1 },
  { label: "45+", pct: 3.8 },
] as const;

/** Audience by language spoken. Source: Kick media kit p. 15. */
export const LANGUAGES = [
  { key: "english", pct: 23 },
  { key: "arabic", pct: 19 },
  { key: "spanish", pct: 18 },
  { key: "turkish", pct: 9 },
  { key: "portuguese", pct: 7 },
  { key: "polish", pct: 6 },
  { key: "japanese", pct: 4 },
  { key: "other", pct: 4 },
] as const;

/** Content mix. Source: Kick media kit p. 12. */
export const CONTENT_MIX = [
  { key: "gaming", pct: 48, hours: "186M" },
  { key: "talk", pct: 37, hours: "143M" },
  { key: "sport", pct: 6, hours: null },
] as const;

/* ------------------------------------------------------------------ */
/* Copy                                                                 */
/* ------------------------------------------------------------------ */

export interface KickCopy {
  seoTitle: string;
  seoDescription: string;
  ogAlt: string;
  hero: {
    badge: string;
    h1Accent: string;
    h1Rest: string;
    sub: string;
    primary: string;
    secondary: string;
    stats: { value: string; label: string }[];
  };
  share: {
    label: string;
    heading: string;
    body: string[];
    globalTitle: string;
    globalNote: string;
    europeTitle: string;
    europeNote: string;
    regions: Record<(typeof EUROPE_SHARE)[number]["key"], string>;
  };
  audience: {
    label: string;
    heading: string;
    body: string[];
    chartTitle: string;
    chartNote: string;
    tv: string;
    splitTitle: string;
    engagement: { value: string; label: string }[];
    engagementNote: string;
  };
  content: {
    label: string;
    heading: string;
    body: string;
    rows: Record<(typeof CONTENT_MIX)[number]["key"], { title: string; desc: string }>;
    figureCaption: string;
  };
  routes: {
    label: string;
    heading: string;
    intro: string;
    kick: {
      title: string;
      lead: string;
      formats: { name: string; desc: string; spec: string }[];
      buying: string;
      contact: string;
    };
    beta: {
      title: string;
      lead: string;
      formats: { name: string; desc: string }[];
      network: string;
      cta: string;
    };
    verdict: string;
  };
  safety: {
    label: string;
    heading: string;
    body: string;
    tiers: { name: string; rating: string; desc: string; note?: string }[];
    systems: { title: string; desc: string }[];
    betaNote: string;
    betaLink: string;
  };
  moments: {
    label: string;
    heading: string;
    items: { date: string; title: string; desc: string; link?: { href: string; label: string } }[];
  };
  honest: {
    label: string;
    heading: string;
    body: string[];
    chartTitle: string;
    chartNote: string;
    languages: Record<(typeof LANGUAGES)[number]["key"], string>;
  };
  faq: { q: string; a: string }[];
  sources: {
    label: string;
    intro: string;
    items: string[];
  };
  cta: { heading: string; subtext: string; primary: string; secondary: string };
  otherLanguages: string;
}

const EN: KickCopy = {
  seoTitle: "Kick Advertising in the Nordics: Reach, Formats and Prices | Beta Ads",
  seoDescription:
    "Kick's own 2026 media kit says one in five Kick and Twitch hours in Northern Europe is now watched on Kick. What that means for Nordic brands, which formats exist, and how Beta Ads places brands inside Nordic Kick streams.",
  ogAlt: "Kick advertising in the Nordics, by Beta Ads",
  hero: {
    badge: "Kick advertising",
    h1Accent: "One in five",
    h1Rest: "live hours in Northern Europe is on Kick.",
    sub: "Kick opened for advertisers in 2026 and put the numbers on the table. We read the media kit so you do not have to, and we run the creator network that puts Nordic brands inside the streams.",
    primary: "Book a demo",
    secondary: "See prices",
    stats: [
      { value: "20.0%", label: "Kick's share of Kick + Twitch hours, Northern Europe" },
      { value: "81.7%", label: "of Kick's audience is 18 to 34" },
      { value: "55 min", label: "average viewing session" },
      { value: "5.1B", label: "hours watched in 2025" },
    ],
  },
  share: {
    label: "Where Kick stands",
    heading: "Third in the world. Second in the north.",
    body: [
      "Globally Kick is the third-largest live platform, with 14.4 percent of all hours watched in the first quarter of 2026. That is the headline Kick leads with, and it is true.",
      "The number that matters for a Nordic brand is different. In Northern Europe, Kick already takes one in five of all hours watched across Kick and Twitch combined. In Western Europe it is one in twenty-three. The Nordics are not a Kick afterthought; they are one of its strongest European regions.",
    ],
    globalTitle: "Share of all live-streaming hours, Q1 2026",
    globalNote: "Source: Stream Hatchet x Streamlabs, quoted in the Kick Ads Media Kit 2026.",
    europeTitle: "Kick's share of Kick + Twitch hours, Q2 2026",
    europeNote: "Source: Kick Ads Media Kit 2026, regional watch-hour share.",
    regions: {
      eastern: "Eastern Europe",
      northern: "Northern Europe",
      southern: "Southern Europe",
      europe: "Europe, all regions",
      western: "Western Europe",
    },
  },
  audience: {
    label: "Who is watching",
    heading: "Eight in ten viewers are under 35.",
    body: [
      "Kick's audience is 81.7 percent 18 to 34, the highest share of any platform in its own comparison. Twitch is at 69, TikTok at 66, YouTube at 37.5. Linear TV, the medium most Nordic media budgets still default to, is at 20.",
      "The people are not only there, they stay. An average session runs 55 minutes, and the chat moves at more than 26,000 messages a minute across the platform. That is the attention a brand borrows when it appears inside a stream.",
    ],
    chartTitle: "Share of audience aged 18 to 34, by platform",
    chartNote: "Sources as listed by Kick: Kick internal 2026, DataReportal, SimilarWeb, Nielsen 2025.",
    tv: "Linear TV",
    splitTitle: "Kick's own age split",
    engagement: [
      { value: "55 min", label: "average session" },
      { value: "26k+", label: "chat messages per minute" },
      { value: "3M+", label: "weekly chatters" },
      { value: "65k+", label: "new streamers every week" },
      { value: "39M+", label: "new users in 2025" },
      { value: "70M+", label: "monthly active users" },
    ],
    engagementNote: "Source: Kick Ads Media Kit 2026, pages 9 and 11.",
  },
  content: {
    label: "What they watch",
    heading: "Half gaming, a third talk.",
    body: "Kick is not a casino channel with a gaming section attached. Gaming is 48 percent of everything watched, talk and IRL another 37. The 18+ categories exist, and they can be excluded with one targeting flag; more on that below.",
    rows: {
      gaming: { title: "Gaming", desc: "186 million watch hours a month on average. Kick is an official Riot Games broadcast partner and holds 47.7 percent of all GTA V watch time." },
      talk: { title: "Talk, podcasts and IRL", desc: "143 million hours a month. Just Chatting, podcasts, talk shows and vlogs, live and unedited." },
      sport: { title: "Sport and live events", desc: "Around 6 percent of content. Single events have passed four million concurrent viewers." },
    },
    figureCaption: "Kick's front page on a weekday: GTA V alone had 203,600 viewers, Just Chatting 167,800. The green banner at the bottom is Kick's own homepage takeover format.",
  },
  routes: {
    label: "How to buy",
    heading: "Two ways onto Kick. They do different jobs.",
    intro: "Kick sells its own inventory: banners, native tiles and video spots inside the player. Beta Ads places brands inside the broadcast itself, through the Nordic creators we work with. Most brands that take Kick seriously will end up using both, so here is what each one actually is.",
    kick: {
      title: "Kick Ads (Kick's own inventory)",
      lead: "Platform placements bought from Kick directly, through your DSP, or on the open exchange. Geo-targeted by country, so a Norway-only buy is possible.",
      formats: [
        { name: "In-stream video", desc: "Non-skippable pre-roll on VOD, mid-roll in live streams, post-roll. Full screen, sound on.", spec: "6, 15 or 30 s. 1280x720 MP4, max 512 MB" },
        { name: "Homepage banner takeover", desc: "The full-width hero slot on the front page for 24 hours or one week, 100 percent share of voice in your country.", spec: "1920x250 rich media, or 970x90 / 728x90 / 320x50" },
        { name: "Homepage native takeover", desc: "Your campaign styled as a stream card in the top rows of the homepage grid, with a clear ad label.", spec: "1280x720 image or 15 s video, 128x128 logo" },
        { name: "Category masthead and native", desc: "Own the header or a native card inside one category, from Just Chatting to a single game. Language-gated.", spec: "Standard banner sizes; 1280x720 for native" },
      ],
      buying: "Bought three ways: Direct (fixed rate, guaranteed placements), Programmatic (PG, PMP or PD deals through your DSP) or Open Exchange (auction via SSP partners and Google AdX). Rates are in USD CPM and the program is still labelled Beta.",
      contact: "Kick's sales contact is advertising@kick.com.",
    },
    beta: {
      title: "Beta Ads (inside the stream)",
      lead: "Your brand appears in the broadcast the creator is making, not in the frame around it. Viewers see it on every device and with every ad blocker, because it is part of the video.",
      formats: [
        { name: "Native overlay", desc: "A branded graphic on the stream during sponsored moments, animated or static. Never constant, never covering the game." },
        { name: "Voice-triggered", desc: "Fires when the creator says your brand, using real-time voice recognition. The ad shows up exactly when the endorsement happens." },
        { name: "Polls and chat", desc: "Questions the audience answers in chat, with the results in your report. Our poll campaigns have reached 67 percent response rates." },
        { name: "Replay reach", desc: "The overlay is burned into the VOD and the clips, so the campaign keeps being seen after the stream ends." },
      ],
      network: "Beta Ads works with more than 2,800 Kick creators in Norway, Sweden, Denmark and Finland. That figure is ours, not Kick's.",
      cta: "See how a campaign runs",
    },
    verdict: "If you need a country-wide moment on a launch day, Kick's homepage takeover is the tool. If you need a Nordic audience to hear your brand from someone they trust, in their own language, that is us. The kit's own numbers say 3.2 times more people trust a creator's recommendation than a celebrity's.",
  },
  safety: {
    label: "Brand safety",
    heading: "Pick your comfort zone. Kick calls it that too.",
    body: "Kick sorts its inventory into four tiers by content rating. Standard is the default and covers everyday gaming; the 18+ tier is only sold direct and only in some countries. Whichever tier you choose, streams under active moderation drop out of the ad inventory automatically.",
    tiers: [
      { name: "Limited", rating: "G to PG", desc: "G and PG rated games and categories. No IRL, Just Chatting or mature themes." },
      { name: "Standard", rating: "M", desc: "M-rated games and categories. Everyday gaming and streaming content with mild to moderate themes.", note: "Default" },
      { name: "Expanded", rating: "M to MA", desc: "M to MA rated video game categories. Extra reach for advertisers comfortable with more intensity." },
      { name: "Restricted", rating: "18+", desc: "18+ content. Only available in select countries to select advertisers, sold direct only.", note: "Direct only" },
    ],
    systems: [
      { title: "70+ visual classifiers", desc: "Every stream is analysed every 60 seconds. High-risk content is flagged and escalated automatically." },
      { title: "Real-time chat moderation", desc: "NLP removes hate speech, bullying and slurs before viewers see them, with a timestamped audit log." },
      { title: "Humans decide", desc: "All reports are reviewed by people. No automated bans, plus pre-monetisation review and KYC on creators." },
      { title: "Invalid traffic", desc: "Google's ad server filters bot traffic with 200+ filters, and Kick passes a per-user trust score to it." },
    ],
    betaNote: "Beta Ads adds its own layer: every creator in a campaign is hand-picked, and every campaign goes through our compliance check for the market it runs in, including Norway's marketing rules for gambling and alcohol.",
    betaLink: "Our compliance process",
  },
  moments: {
    label: "2026 on Kick",
    heading: "Two dates already in the calendar.",
    items: [
      {
        date: "19 November 2026",
        title: "GTA VI launches",
        desc: "Kick holds 47.7 percent of all GTA V watch time, 844 million hours in the last twelve months. Kick expects to be the place the world watches GTA VI, and is selling launch inventory now. We wrote a full guide to what the launch means for Nordic brands.",
        link: { href: "/blog/gta-vi-nordic-brand-playbook", label: "Read the GTA VI guide" },
      },
      {
        date: "October 2026",
        title: "Stream Fighters 5",
        desc: "The fourth edition reached 4.6 million concurrent viewers and briefly outranked Twitch and YouTube combined. The fifth is targeting ten million, mostly Spanish-speaking. A global reach moment more than a Nordic one, but it shows what a single Kick event can do.",
      },
    ],
  },
  honest: {
    label: "The honest part",
    heading: "Kick in the Nordics is a share story, not a scale story.",
    body: [
      "Kick's audience speaks English, Arabic, Spanish and Turkish. Norwegian, Swedish, Danish and Finnish together sit inside the four percent labelled Other. In absolute numbers, Twitch still has far more Nordic viewers.",
      "So why bother? Because the 20 percent Northern Europe share means Kick is already where one in five live hours goes, and its creators are the ones with the least advertising on them. A Nordic brand that shows up now competes with almost nobody. On Twitch it competes with everyone.",
    ],
    chartTitle: "Kick's audience by language spoken",
    chartNote: "Source: Kick Ads Media Kit 2026, page 15. Nordic languages are inside Other.",
    languages: {
      english: "English",
      arabic: "Arabic",
      spanish: "Spanish",
      turkish: "Turkish",
      portuguese: "Portuguese",
      polish: "Polish",
      japanese: "Japanese",
      other: "Other, incl. Nordic",
    },
  },
  faq: [
    { q: "Can I advertise on Kick in Norway only?", a: "Yes, both ways. Kick's own formats are geo-targeted by country and language-gated per category. Beta Ads campaigns are built creator by creator, so a Norway-only, Norwegian-language campaign is the normal case, not a special request." },
    { q: "What does Kick advertising cost?", a: "Kick's own inventory is priced in USD CPM and sold direct, programmatic or on the open exchange; the media kit publishes no rate card. Beta Ads prices on a CPM for verified overlay views, with three budget tiers. Our cost page walks through both." },
    { q: "Is Kick brand-safe?", a: "It depends on the tier you pick. Standard, the default, is M-rated gaming and everyday content, and streams under active moderation are removed from inventory automatically. The 18+ tier is a separate, direct-only product. With Beta Ads you also choose the specific creators, which is the strongest brand-safety control there is." },
    { q: "Kick or Twitch for a Nordic campaign?", a: "Twitch for scale, Kick for share of attention and low ad clutter. Most of our Nordic campaigns now run on both, with Twitch carrying reach and Kick carrying frequency among the 18 to 34 core. We can show you the split from real campaigns in a demo." },
  ],
  sources: {
    label: "Sources",
    intro: "Every figure on this page comes from the KICK Ads Media Kit 2026 (Ads Beta edition) unless marked as Beta Ads' own. Kick's stated sources for the third-party numbers:",
    items: [
      "Stream Hatchet x Streamlabs, Q1 2026: live-streaming market share",
      "Kick internal data 2026: regional watch-hour share Q2 2026, age split, sessions, chat volume, content mix",
      "DataReportal / DesignRush 2025-26, SimilarWeb 2025-26, Nielsen 2025, PwC Global E&M Outlook 2026: audience age by platform",
      "Edelman Gen Z Trust Report 2026: creator vs celebrity trust (3.2x)",
      "Beta Ads network data, September 2026: 2,800+ Nordic Kick creators",
    ],
  },
  cta: {
    heading: "See a Kick campaign before you buy one.",
    subtext: "Thirty minutes, real Nordic Kick streams, real reports. No slides.",
    primary: "Book a demo",
    secondary: "Pricing",
  },
  otherLanguages: "This page in other languages",
};

const NO: KickCopy = {
  seoTitle: "Kick-annonsering i Norge og Norden: rekkevidde, formater og pris | Beta Ads",
  seoDescription:
    "Kicks eget mediekit for 2026 sier at hver femte Kick- og Twitch-time i Nord-Europa nå ses på Kick. Hva det betyr for norske merkevarer, hvilke formater som finnes, og hvordan Beta Ads plasserer merkevarer inne i nordiske Kick-strømmer.",
  ogAlt: "Kick-annonsering i Norden, av Beta Ads",
  hero: {
    badge: "Kick-annonsering",
    h1Accent: "Hver femte",
    h1Rest: "live-time i Nord-Europa ses på Kick.",
    sub: "Kick åpnet for annonsører i 2026 og la tallene på bordet. Vi har lest mediekittet så du ikke trenger det, og vi driver nettverket som setter norske merkevarer inn i strømmene.",
    primary: "Book en demo",
    secondary: "Se priser",
    stats: [
      { value: "20,0 %", label: "Kicks andel av Kick + Twitch-timer i Nord-Europa" },
      { value: "81,7 %", label: "av Kicks publikum er 18 til 34 år" },
      { value: "55 min", label: "gjennomsnittlig seerøkt" },
      { value: "5,1 mrd", label: "timer sett i 2025" },
    ],
  },
  share: {
    label: "Hvor Kick står",
    heading: "Tredje størst i verden. Nummer to i nord.",
    body: [
      "Globalt er Kick den tredje største live-plattformen, med 14,4 prosent av alle timer sett i første kvartal 2026. Det er tallet Kick åpner med, og det stemmer.",
      "Tallet som betyr noe for en norsk merkevare er et annet. I Nord-Europa tar Kick allerede hver femte time av alt som ses på Kick og Twitch til sammen. I Vest-Europa er det én av tjuetre. Norden er ikke et sidespor for Kick, det er en av de sterkeste regionene de har i Europa.",
    ],
    globalTitle: "Andel av alle live-strømmetimer, Q1 2026",
    globalNote: "Kilde: Stream Hatchet x Streamlabs, gjengitt i Kick Ads Media Kit 2026.",
    europeTitle: "Kicks andel av Kick + Twitch-timer, Q2 2026",
    europeNote: "Kilde: Kick Ads Media Kit 2026, regional andel av setimer.",
    regions: {
      eastern: "Øst-Europa",
      northern: "Nord-Europa",
      southern: "Sør-Europa",
      europe: "Europa samlet",
      western: "Vest-Europa",
    },
  },
  audience: {
    label: "Hvem ser",
    heading: "Åtte av ti seere er under 35.",
    body: [
      "81,7 prosent av Kicks publikum er mellom 18 og 34, den høyeste andelen av alle plattformene i Kicks egen sammenligning. Twitch ligger på 69, TikTok på 66, YouTube på 37,5. Lineær TV, som fortsatt er standardvalget i mange norske mediebudsjetter, ligger på 20.",
      "Folk er ikke bare der, de blir. En gjennomsnittlig økt varer 55 minutter, og chatten går i over 26 000 meldinger i minuttet på tvers av plattformen. Det er den oppmerksomheten en merkevare låner når den dukker opp inne i en strøm.",
    ],
    chartTitle: "Andel av publikum i alderen 18 til 34, per plattform",
    chartNote: "Kilder slik Kick oppgir dem: Kick internt 2026, DataReportal, SimilarWeb, Nielsen 2025.",
    tv: "Lineær TV",
    splitTitle: "Kicks egen aldersfordeling",
    engagement: [
      { value: "55 min", label: "gjennomsnittlig økt" },
      { value: "26k+", label: "chatmeldinger i minuttet" },
      { value: "3M+", label: "aktive i chat hver uke" },
      { value: "65k+", label: "nye strømmere hver uke" },
      { value: "39M+", label: "nye brukere i 2025" },
      { value: "70M+", label: "månedlige aktive brukere" },
    ],
    engagementNote: "Kilde: Kick Ads Media Kit 2026, side 9 og 11.",
  },
  content: {
    label: "Hva de ser på",
    heading: "Halvparten gaming, en tredjedel prat.",
    body: "Kick er ikke en casinokanal med en gaming-avdeling på siden. Gaming er 48 prosent av alt som ses, prat og IRL 37 prosent til. 18+-kategoriene finnes, og de kan slås av med ett målrettingsvalg; mer om det lenger ned.",
    rows: {
      gaming: { title: "Gaming", desc: "186 millioner setimer i måneden i snitt. Kick er offisiell sendepartner for Riot Games og har 47,7 prosent av all GTA V-setid." },
      talk: { title: "Prat, podkast og IRL", desc: "143 millioner timer i måneden. Just Chatting, podkaster, talkshow og vlogger, live og uredigert." },
      sport: { title: "Sport og live-arrangementer", desc: "Rundt 6 prosent av innholdet. Enkeltarrangementer har passert fire millioner samtidige seere." },
    },
    figureCaption: "Kicks forside en hverdag: GTA V alene hadde 203 600 seere, Just Chatting 167 800. Det grønne banneret nederst er Kicks eget homepage takeover-format.",
  },
  routes: {
    label: "Slik kjøper du",
    heading: "To veier inn på Kick. De gjør forskjellige jobber.",
    intro: "Kick selger sine egne flater: bannere, native-kort og videospotter inne i spilleren. Beta Ads plasserer merkevarer inne i selve sendingen, gjennom de nordiske skaperne vi jobber med. De fleste som tar Kick seriøst ender opp med å bruke begge, så her er hva hver av dem faktisk er.",
    kick: {
      title: "Kick Ads (Kicks egne flater)",
      lead: "Plattformplasseringer kjøpt direkte fra Kick, via din DSP, eller på open exchange. Geomålrettet per land, så et kjøp kun for Norge er mulig.",
      formats: [
        { name: "In-stream video", desc: "Pre-roll på VOD, mid-roll i live-strømmer og post-roll, alle uten mulighet for å hoppe over. Fullskjerm med lyd på.", spec: "6, 15 eller 30 s. 1280x720 MP4, maks 512 MB" },
        { name: "Homepage banner takeover", desc: "Toppflaten på forsiden i 24 timer eller én uke, 100 prosent share of voice i ditt land.", spec: "1920x250 rich media, eller 970x90 / 728x90 / 320x50" },
        { name: "Homepage native takeover", desc: "Kampanjen din formet som et strømmekort i de øverste radene på forsiden, tydelig merket som annonse.", spec: "1280x720 bilde eller 15 s video, 128x128 logo" },
        { name: "Category masthead og native", desc: "Eie toppen av, eller et native-kort inne i, én kategori, fra Just Chatting til ett enkelt spill. Kan låses til språk.", spec: "Standard bannerstørrelser; 1280x720 for native" },
      ],
      buying: "Kjøpes på tre måter: Direct (fast pris, garanterte plasseringer), Programmatic (PG-, PMP- eller PD-avtaler gjennom din DSP) eller Open Exchange (auksjon via SSP-partnere og Google AdX). Prisene er i USD CPM, og programmet er fortsatt merket Beta.",
      contact: "Kicks salgskontakt er advertising@kick.com.",
    },
    beta: {
      title: "Beta Ads (inne i strømmen)",
      lead: "Merkevaren din vises i sendingen skaperen lager, ikke i rammen rundt. Seerne ser den på alle enheter og med alle adblockere, fordi den er en del av videoen.",
      formats: [
        { name: "Native overlay", desc: "En merket grafikk på strømmen i sponsede øyeblikk, animert eller statisk. Aldri konstant, aldri over spillet." },
        { name: "Stemmestyrt", desc: "Utløses når skaperen sier navnet på merkevaren, med sanntids talegjenkjenning. Annonsen vises akkurat når anbefalingen skjer." },
        { name: "Avstemninger og chat", desc: "Spørsmål publikum svarer på i chatten, med resultatene i rapporten din. Avstemningskampanjene våre har nådd 67 prosent svarandel." },
        { name: "Replay reach", desc: "Overlayet ligger i VOD-en og klippene, så kampanjen blir sett videre etter at strømmen er over." },
      ],
      network: "Beta Ads jobber med over 2 800 Kick-skapere i Norge, Sverige, Danmark og Finland. Det tallet er vårt, ikke Kicks.",
      cta: "Se hvordan en kampanje kjøres",
    },
    verdict: "Trenger du et landsdekkende øyeblikk på en lanseringsdag, er Kicks homepage takeover verktøyet. Trenger du at et nordisk publikum hører om merkevaren din fra noen de stoler på, på sitt eget språk, er det oss. Kittets egne tall sier at 3,2 ganger flere stoler på en skapers anbefaling enn på en kjendis.",
  },
  safety: {
    label: "Merkevaresikkerhet",
    heading: "Velg komfortsonen din. Kick kaller det det samme.",
    body: "Kick deler flatene sine i fire nivåer etter innholdsrating. Standard er utgangspunktet og dekker vanlig gaming; 18+-nivået selges kun direkte og kun i noen land. Uansett nivå faller strømmer med aktive moderasjonstiltak automatisk ut av annonseflatene.",
    tiers: [
      { name: "Limited", rating: "G til PG", desc: "Spill og kategorier med G- og PG-rating. Ingen IRL, Just Chatting eller voksne temaer." },
      { name: "Standard", rating: "M", desc: "Spill og kategorier med M-rating. Vanlig gaming og strømmeinnhold med milde til moderate temaer.", note: "Standard" },
      { name: "Expanded", rating: "M til MA", desc: "Spillkategorier med M- til MA-rating. Ekstra rekkevidde for annonsører som tåler mer intensitet." },
      { name: "Restricted", rating: "18+", desc: "18+-innhold. Kun tilgjengelig i utvalgte land for utvalgte annonsører, selges kun direkte.", note: "Kun direkte" },
    ],
    systems: [
      { title: "70+ visuelle klassifiserere", desc: "Hver strøm analyseres hvert 60. sekund. Innhold med høy risiko flagges og eskaleres automatisk." },
      { title: "Chatmoderering i sanntid", desc: "NLP fjerner hatprat, mobbing og skjellsord før seerne ser dem, med tidsstemplet logg." },
      { title: "Mennesker bestemmer", desc: "Alle rapporter gjennomgås av folk. Ingen automatiske utestengelser, pluss gjennomgang før monetisering og KYC på skapere." },
      { title: "Ugyldig trafikk", desc: "Googles annonseserver filtrerer bot-trafikk med over 200 filtre, og Kick sender en tillitsscore per bruker til den." },
    ],
    betaNote: "Beta Ads legger på et eget lag: hver skaper i en kampanje er håndplukket, og hver kampanje går gjennom vår compliance-sjekk for markedet den kjører i, inkludert det norske regelverket for markedsføring av pengespill og alkohol.",
    betaLink: "Slik jobber vi med compliance",
  },
  moments: {
    label: "2026 på Kick",
    heading: "To datoer som allerede står i kalenderen.",
    items: [
      {
        date: "19. november 2026",
        title: "GTA VI lanseres",
        desc: "Kick har 47,7 prosent av all GTA V-setid, 844 millioner timer de siste tolv månedene. Kick regner med å være stedet verden ser GTA VI, og selger lanseringsflater nå. Vi har skrevet en full guide til hva lanseringen betyr for norske merkevarer.",
        link: { href: "/blog/gta-vi-nordisk-merkevareguide", label: "Les GTA VI-guiden" },
      },
      {
        date: "Oktober 2026",
        title: "Stream Fighters 5",
        desc: "Fjerde utgave nådde 4,6 millioner samtidige seere og lå en stund over Twitch og YouTube til sammen. Den femte sikter på ti millioner, for det meste spansktalende. Mer et globalt rekkeviddeøyeblikk enn et nordisk, men det viser hva ett enkelt Kick-arrangement kan gjøre.",
      },
    ],
  },
  honest: {
    label: "Den ærlige delen",
    heading: "Kick i Norden handler om andel, ikke om volum.",
    body: [
      "Kicks publikum snakker engelsk, arabisk, spansk og tyrkisk. Norsk, svensk, dansk og finsk ligger sammen inne i de fire prosentene som heter Other. I absolutte tall har Twitch fortsatt langt flere nordiske seere.",
      "Så hvorfor bry seg? Fordi de 20 prosentene i Nord-Europa betyr at Kick allerede er der hver femte live-time går, og skaperne der er de med minst reklame på seg. En norsk merkevare som dukker opp nå, konkurrerer med nesten ingen. På Twitch konkurrerer den med alle.",
    ],
    chartTitle: "Kicks publikum etter språk",
    chartNote: "Kilde: Kick Ads Media Kit 2026, side 15. De nordiske språkene ligger inne i Other.",
    languages: {
      english: "Engelsk",
      arabic: "Arabisk",
      spanish: "Spansk",
      turkish: "Tyrkisk",
      portuguese: "Portugisisk",
      polish: "Polsk",
      japanese: "Japansk",
      other: "Annet, inkl. nordisk",
    },
  },
  faq: [
    { q: "Kan jeg annonsere på Kick kun i Norge?", a: "Ja, på begge måter. Kicks egne formater geomålrettes per land og kan låses til språk per kategori. Beta Ads-kampanjer bygges skaper for skaper, så en kampanje kun for Norge og på norsk er normalen, ikke et spesialønske." },
    { q: "Hva koster Kick-annonsering?", a: "Kicks egne flater prises i USD CPM og selges direkte, programmatisk eller på open exchange; mediekittet har ingen offentlig prisliste. Beta Ads priser på CPM for verifiserte overlay-visninger, med tre budsjettnivåer. Prissiden vår går gjennom begge." },
    { q: "Er Kick trygt for merkevaren?", a: "Det avhenger av nivået du velger. Standard, som er utgangspunktet, er gaming med M-rating og vanlig innhold, og strømmer under aktiv moderering fjernes automatisk fra flatene. 18+-nivået er et eget produkt som kun selges direkte. Med Beta Ads velger du i tillegg de konkrete skaperne, som er den sterkeste kontrollen som finnes." },
    { q: "Kick eller Twitch for en norsk kampanje?", a: "Twitch for volum, Kick for andel av oppmerksomheten og lite reklamestøy. De fleste av våre nordiske kampanjer kjører nå på begge, der Twitch tar rekkevidden og Kick tar frekvensen i kjernen på 18 til 34. Vi kan vise deg fordelingen fra ekte kampanjer i en demo." },
  ],
  sources: {
    label: "Kilder",
    intro: "Alle tall på denne siden kommer fra KICK Ads Media Kit 2026 (Ads Beta-utgaven) med mindre de er merket som Beta Ads' egne. Kicks oppgitte kilder for tredjepartstallene:",
    items: [
      "Stream Hatchet x Streamlabs, Q1 2026: markedsandel for live-strømming",
      "Kick interne data 2026: regional andel av setimer Q2 2026, aldersfordeling, økter, chatvolum, innholdsmiks",
      "DataReportal / DesignRush 2025-26, SimilarWeb 2025-26, Nielsen 2025, PwC Global E&M Outlook 2026: publikumsalder per plattform",
      "Edelman Gen Z Trust Report 2026: tillit til skapere mot kjendiser (3,2x)",
      "Beta Ads nettverksdata, september 2026: 2 800+ nordiske Kick-skapere",
    ],
  },
  cta: {
    heading: "Se en Kick-kampanje før du kjøper en.",
    subtext: "Tretti minutter, ekte nordiske Kick-strømmer, ekte rapporter. Ingen slides.",
    primary: "Book en demo",
    secondary: "Priser",
  },
  otherLanguages: "Denne siden på andre språk",
};

const SV: KickCopy = {
  seoTitle: "Kick-annonsering i Sverige och Norden: räckvidd, format och pris | Beta Ads",
  seoDescription:
    "Kicks eget mediekit för 2026 säger att var femte Kick- och Twitch-timme i Nordeuropa nu ses på Kick. Vad det betyder för svenska varumärken, vilka format som finns, och hur Beta Ads placerar varumärken inne i nordiska Kick-streams.",
  ogAlt: "Kick-annonsering i Norden, av Beta Ads",
  hero: {
    badge: "Kick-annonsering",
    h1Accent: "Var femte",
    h1Rest: "live-timme i Nordeuropa ses på Kick.",
    sub: "Kick öppnade för annonsörer 2026 och lade siffrorna på bordet. Vi har läst mediekitet så att du inte behöver, och vi driver nätverket som sätter svenska varumärken in i streamsen.",
    primary: "Boka en demo",
    secondary: "Se priser",
    stats: [
      { value: "20,0 %", label: "Kicks andel av Kick + Twitch-timmar i Nordeuropa" },
      { value: "81,7 %", label: "av Kicks publik är 18 till 34 år" },
      { value: "55 min", label: "genomsnittlig tittarsession" },
      { value: "5,1 mdr", label: "timmar sedda 2025" },
    ],
  },
  share: {
    label: "Var Kick står",
    heading: "Tredje störst i världen. Nummer två i norr.",
    body: [
      "Globalt är Kick den tredje största live-plattformen, med 14,4 procent av alla timmar sedda under första kvartalet 2026. Det är siffran Kick öppnar med, och den stämmer.",
      "Siffran som spelar roll för ett svenskt varumärke är en annan. I Nordeuropa tar Kick redan var femte timme av allt som ses på Kick och Twitch tillsammans. I Västeuropa är det en av tjugotre. Norden är inget sidospår för Kick, det är en av deras starkaste regioner i Europa.",
    ],
    globalTitle: "Andel av alla live-streamade timmar, Q1 2026",
    globalNote: "Källa: Stream Hatchet x Streamlabs, återgiven i Kick Ads Media Kit 2026.",
    europeTitle: "Kicks andel av Kick + Twitch-timmar, Q2 2026",
    europeNote: "Källa: Kick Ads Media Kit 2026, regional andel av tittartimmar.",
    regions: {
      eastern: "Östeuropa",
      northern: "Nordeuropa",
      southern: "Sydeuropa",
      europe: "Europa totalt",
      western: "Västeuropa",
    },
  },
  audience: {
    label: "Vem tittar",
    heading: "Åtta av tio tittare är under 35.",
    body: [
      "81,7 procent av Kicks publik är mellan 18 och 34, den högsta andelen av alla plattformar i Kicks egen jämförelse. Twitch ligger på 69, TikTok på 66, YouTube på 37,5. Linjär tv, som fortfarande är standardvalet i många svenska mediebudgetar, ligger på 20.",
      "Folk är inte bara där, de stannar. En genomsnittlig session varar 55 minuter, och chatten rör sig i över 26 000 meddelanden i minuten över hela plattformen. Det är den uppmärksamhet ett varumärke lånar när det dyker upp inne i en stream.",
    ],
    chartTitle: "Andel av publiken i åldern 18 till 34, per plattform",
    chartNote: "Källor så som Kick anger dem: Kick internt 2026, DataReportal, SimilarWeb, Nielsen 2025.",
    tv: "Linjär tv",
    splitTitle: "Kicks egen åldersfördelning",
    engagement: [
      { value: "55 min", label: "genomsnittlig session" },
      { value: "26k+", label: "chattmeddelanden per minut" },
      { value: "3M+", label: "aktiva i chatten varje vecka" },
      { value: "65k+", label: "nya streamers varje vecka" },
      { value: "39M+", label: "nya användare 2025" },
      { value: "70M+", label: "månatligt aktiva användare" },
    ],
    engagementNote: "Källa: Kick Ads Media Kit 2026, sidorna 9 och 11.",
  },
  content: {
    label: "Vad de tittar på",
    heading: "Hälften gaming, en tredjedel prat.",
    body: "Kick är ingen casinokanal med en gaming-avdelning på sidan. Gaming är 48 procent av allt som ses, prat och IRL ytterligare 37. 18+-kategorierna finns, och de kan stängas av med ett enda målstyrningsval; mer om det längre ner.",
    rows: {
      gaming: { title: "Gaming", desc: "186 miljoner tittartimmar i månaden i snitt. Kick är officiell sändningspartner till Riot Games och har 47,7 procent av all GTA V-tittartid." },
      talk: { title: "Prat, poddar och IRL", desc: "143 miljoner timmar i månaden. Just Chatting, poddar, pratshower och vloggar, live och oredigerat." },
      sport: { title: "Sport och live-evenemang", desc: "Runt 6 procent av innehållet. Enskilda evenemang har passerat fyra miljoner samtidiga tittare." },
    },
    figureCaption: "Kicks startsida en vardag: GTA V ensamt hade 203 600 tittare, Just Chatting 167 800. Den gröna bannern längst ner är Kicks eget homepage takeover-format.",
  },
  routes: {
    label: "Så köper du",
    heading: "Två vägar in på Kick. De gör olika jobb.",
    intro: "Kick säljer sina egna ytor: banners, native-kort och videospottar inne i spelaren. Beta Ads placerar varumärken inne i själva sändningen, genom de nordiska kreatörer vi jobbar med. De flesta som tar Kick på allvar använder till slut båda, så här är vad var och en faktiskt är.",
    kick: {
      title: "Kick Ads (Kicks egna ytor)",
      lead: "Plattformsplaceringar köpta direkt från Kick, via din DSP, eller på open exchange. Geostyrt per land, så ett köp enbart för Sverige är möjligt.",
      formats: [
        { name: "In-stream video", desc: "Pre-roll på VOD, mid-roll i live-streams och post-roll, alla utan möjlighet att hoppa över. Helskärm med ljud på.", spec: "6, 15 eller 30 s. 1280x720 MP4, max 512 MB" },
        { name: "Homepage banner takeover", desc: "Toppytan på startsidan i 24 timmar eller en vecka, 100 procent share of voice i ditt land.", spec: "1920x250 rich media, eller 970x90 / 728x90 / 320x50" },
        { name: "Homepage native takeover", desc: "Din kampanj formad som ett streamkort i de översta raderna på startsidan, tydligt märkt som annons.", spec: "1280x720 bild eller 15 s video, 128x128 logotyp" },
        { name: "Category masthead och native", desc: "Äg toppen av, eller ett native-kort inne i, en kategori, från Just Chatting till ett enskilt spel. Kan låsas till språk.", spec: "Standardstorlekar för banners; 1280x720 för native" },
      ],
      buying: "Köps på tre sätt: Direct (fast pris, garanterade placeringar), Programmatic (PG-, PMP- eller PD-affärer via din DSP) eller Open Exchange (auktion via SSP-partners och Google AdX). Priserna är i USD CPM, och programmet är fortfarande märkt Beta.",
      contact: "Kicks säljkontakt är advertising@kick.com.",
    },
    beta: {
      title: "Beta Ads (inne i streamen)",
      lead: "Ditt varumärke syns i sändningen kreatören gör, inte i ramen runt den. Tittarna ser det på alla enheter och med alla adblockers, eftersom det är en del av videon.",
      formats: [
        { name: "Native overlay", desc: "En varumärkt grafik på streamen under sponsrade ögonblick, animerad eller statisk. Aldrig konstant, aldrig över spelet." },
        { name: "Röststyrd", desc: "Triggas när kreatören säger varumärkets namn, med röstigenkänning i realtid. Annonsen visas exakt när rekommendationen sker." },
        { name: "Omröstningar och chatt", desc: "Frågor publiken svarar på i chatten, med resultaten i din rapport. Våra omröstningskampanjer har nått 67 procents svarsfrekvens." },
        { name: "Replay reach", desc: "Overlayen ligger kvar i VOD:en och klippen, så kampanjen fortsätter ses efter att streamen är slut." },
      ],
      network: "Beta Ads jobbar med över 2 800 Kick-kreatörer i Sverige, Norge, Danmark och Finland. Den siffran är vår, inte Kicks.",
      cta: "Se hur en kampanj körs",
    },
    verdict: "Behöver du ett rikstäckande ögonblick på en lanseringsdag är Kicks homepage takeover verktyget. Behöver du att en nordisk publik hör om ditt varumärke från någon de litar på, på sitt eget språk, är det vi. Kitets egna siffror säger att 3,2 gånger fler litar på en kreatörs rekommendation än på en kändis.",
  },
  safety: {
    label: "Varumärkessäkerhet",
    heading: "Välj din komfortzon. Kick kallar det samma sak.",
    body: "Kick delar in sina ytor i fyra nivåer efter innehållsrating. Standard är utgångsläget och täcker vanlig gaming; 18+-nivån säljs bara direkt och bara i vissa länder. Oavsett nivå faller streams med aktiva modereringsåtgärder automatiskt bort ur annonsytorna.",
    tiers: [
      { name: "Limited", rating: "G till PG", desc: "Spel och kategorier med G- och PG-rating. Ingen IRL, Just Chatting eller vuxna teman." },
      { name: "Standard", rating: "M", desc: "Spel och kategorier med M-rating. Vanlig gaming och streaminginnehåll med milda till måttliga teman.", note: "Standard" },
      { name: "Expanded", rating: "M till MA", desc: "Spelkategorier med M- till MA-rating. Extra räckvidd för annonsörer som tål mer intensitet." },
      { name: "Restricted", rating: "18+", desc: "18+-innehåll. Bara tillgängligt i utvalda länder för utvalda annonsörer, säljs enbart direkt.", note: "Enbart direkt" },
    ],
    systems: [
      { title: "70+ visuella klassificerare", desc: "Varje stream analyseras var 60:e sekund. Innehåll med hög risk flaggas och eskaleras automatiskt." },
      { title: "Chattmoderering i realtid", desc: "NLP tar bort hatpropaganda, mobbning och skällsord innan tittarna ser dem, med tidsstämplad logg." },
      { title: "Människor bestämmer", desc: "Alla anmälningar granskas av människor. Inga automatiska avstängningar, plus granskning före monetisering och KYC på kreatörer." },
      { title: "Ogiltig trafik", desc: "Googles annonsserver filtrerar bottrafik med över 200 filter, och Kick skickar en förtroendepoäng per användare till den." },
    ],
    betaNote: "Beta Ads lägger på ett eget lager: varje kreatör i en kampanj är handplockad, och varje kampanj går igenom vår compliance-kontroll för marknaden den körs i, inklusive de svenska reglerna för spel- och alkoholreklam.",
    betaLink: "Så jobbar vi med compliance",
  },
  moments: {
    label: "2026 på Kick",
    heading: "Två datum som redan står i kalendern.",
    items: [
      {
        date: "19 november 2026",
        title: "GTA VI lanseras",
        desc: "Kick har 47,7 procent av all GTA V-tittartid, 844 miljoner timmar de senaste tolv månaderna. Kick räknar med att vara platsen där världen ser GTA VI, och säljer lanseringsytor nu. Vi har skrivit en guide till vad lanseringen betyder för nordiska varumärken.",
        link: { href: "/blog/gta-vi-nordic-brand-playbook", label: "Läs GTA VI-guiden (på engelska)" },
      },
      {
        date: "Oktober 2026",
        title: "Stream Fighters 5",
        desc: "Fjärde upplagan nådde 4,6 miljoner samtidiga tittare och låg en stund över Twitch och YouTube tillsammans. Den femte siktar på tio miljoner, mestadels spansktalande. Mer ett globalt räckviddsögonblick än ett nordiskt, men det visar vad ett enda Kick-evenemang kan göra.",
      },
    ],
  },
  honest: {
    label: "Den ärliga delen",
    heading: "Kick i Norden handlar om andel, inte om volym.",
    body: [
      "Kicks publik talar engelska, arabiska, spanska och turkiska. Svenska, norska, danska och finska ligger tillsammans inne i de fyra procent som heter Other. I absoluta tal har Twitch fortfarande långt fler nordiska tittare.",
      "Så varför bry sig? För att de 20 procenten i Nordeuropa betyder att Kick redan är där var femte live-timme går, och kreatörerna där är de med minst reklam på sig. Ett svenskt varumärke som dyker upp nu konkurrerar med nästan ingen. På Twitch konkurrerar det med alla.",
    ],
    chartTitle: "Kicks publik efter språk",
    chartNote: "Källa: Kick Ads Media Kit 2026, sidan 15. De nordiska språken ligger inne i Other.",
    languages: {
      english: "Engelska",
      arabic: "Arabiska",
      spanish: "Spanska",
      turkish: "Turkiska",
      portuguese: "Portugisiska",
      polish: "Polska",
      japanese: "Japanska",
      other: "Övriga, inkl. nordiska",
    },
  },
  faq: [
    { q: "Kan jag annonsera på Kick enbart i Sverige?", a: "Ja, på båda sätten. Kicks egna format geostyrs per land och kan låsas till språk per kategori. Beta Ads-kampanjer byggs kreatör för kreatör, så en kampanj enbart för Sverige och på svenska är normalfallet, inte ett specialönskemål." },
    { q: "Vad kostar Kick-annonsering?", a: "Kicks egna ytor prissätts i USD CPM och säljs direkt, programmatiskt eller på open exchange; mediekitet har ingen offentlig prislista. Beta Ads prissätter på CPM för verifierade overlay-visningar, med tre budgetnivåer. Vår prissida går igenom båda." },
    { q: "Är Kick säkert för varumärket?", a: "Det beror på nivån du väljer. Standard, som är utgångsläget, är gaming med M-rating och vanligt innehåll, och streams under aktiv moderering tas automatiskt bort från ytorna. 18+-nivån är en egen produkt som bara säljs direkt. Med Beta Ads väljer du dessutom de konkreta kreatörerna, vilket är den starkaste kontrollen som finns." },
    { q: "Kick eller Twitch för en svensk kampanj?", a: "Twitch för volym, Kick för andel av uppmärksamheten och lite reklambrus. De flesta av våra nordiska kampanjer körs nu på båda, där Twitch tar räckvidden och Kick tar frekvensen i kärnan 18 till 34. Vi kan visa fördelningen från riktiga kampanjer i en demo." },
  ],
  sources: {
    label: "Källor",
    intro: "Alla siffror på den här sidan kommer från KICK Ads Media Kit 2026 (Ads Beta-utgåvan) om de inte är märkta som Beta Ads egna. Kicks angivna källor för tredjepartssiffrorna:",
    items: [
      "Stream Hatchet x Streamlabs, Q1 2026: marknadsandel för live-streaming",
      "Kick interna data 2026: regional andel av tittartimmar Q2 2026, åldersfördelning, sessioner, chattvolym, innehållsmix",
      "DataReportal / DesignRush 2025-26, SimilarWeb 2025-26, Nielsen 2025, PwC Global E&M Outlook 2026: publikens ålder per plattform",
      "Edelman Gen Z Trust Report 2026: förtroende för kreatörer mot kändisar (3,2x)",
      "Beta Ads nätverksdata, september 2026: 2 800+ nordiska Kick-kreatörer",
    ],
  },
  cta: {
    heading: "Se en Kick-kampanj innan du köper en.",
    subtext: "Trettio minuter, riktiga nordiska Kick-streams, riktiga rapporter. Inga slides.",
    primary: "Boka en demo",
    secondary: "Priser",
  },
  otherLanguages: "Den här sidan på andra språk",
};

const DA: KickCopy = {
  seoTitle: "Kick-annoncering i Danmark og Norden: rækkevidde, formater og pris | Beta Ads",
  seoDescription:
    "Kicks eget mediekit for 2026 siger, at hver femte Kick- og Twitch-time i Nordeuropa nu ses på Kick. Hvad det betyder for danske brands, hvilke formater der findes, og hvordan Beta Ads placerer brands inde i nordiske Kick-streams.",
  ogAlt: "Kick-annoncering i Norden, af Beta Ads",
  hero: {
    badge: "Kick-annoncering",
    h1Accent: "Hver femte",
    h1Rest: "live-time i Nordeuropa ses på Kick.",
    sub: "Kick åbnede for annoncører i 2026 og lagde tallene på bordet. Vi har læst mediekittet, så du ikke behøver, og vi driver det netværk, der sætter danske brands ind i streamsene.",
    primary: "Book en demo",
    secondary: "Se priser",
    stats: [
      { value: "20,0 %", label: "Kicks andel af Kick + Twitch-timer i Nordeuropa" },
      { value: "81,7 %", label: "af Kicks publikum er 18 til 34 år" },
      { value: "55 min", label: "gennemsnitlig seersession" },
      { value: "5,1 mia.", label: "timer set i 2025" },
    ],
  },
  share: {
    label: "Hvor Kick står",
    heading: "Tredjestørst i verden. Nummer to i nord.",
    body: [
      "Globalt er Kick den tredjestørste live-platform med 14,4 procent af alle timer set i første kvartal 2026. Det er det tal, Kick åbner med, og det holder.",
      "Det tal, der betyder noget for et dansk brand, er et andet. I Nordeuropa tager Kick allerede hver femte time af alt, der ses på Kick og Twitch tilsammen. I Vesteuropa er det én ud af treogtyve. Norden er ikke et sidespor for Kick, det er en af deres stærkeste regioner i Europa.",
    ],
    globalTitle: "Andel af alle live-streamede timer, Q1 2026",
    globalNote: "Kilde: Stream Hatchet x Streamlabs, gengivet i Kick Ads Media Kit 2026.",
    europeTitle: "Kicks andel af Kick + Twitch-timer, Q2 2026",
    europeNote: "Kilde: Kick Ads Media Kit 2026, regional andel af setimer.",
    regions: {
      eastern: "Østeuropa",
      northern: "Nordeuropa",
      southern: "Sydeuropa",
      europe: "Europa samlet",
      western: "Vesteuropa",
    },
  },
  audience: {
    label: "Hvem ser med",
    heading: "Otte ud af ti seere er under 35.",
    body: [
      "81,7 procent af Kicks publikum er mellem 18 og 34, den højeste andel af alle platforme i Kicks egen sammenligning. Twitch ligger på 69, TikTok på 66, YouTube på 37,5. Lineært tv, som stadig er standardvalget i mange danske mediebudgetter, ligger på 20.",
      "Folk er ikke bare der, de bliver. En gennemsnitlig session varer 55 minutter, og chatten kører med over 26.000 beskeder i minuttet på tværs af platformen. Det er den opmærksomhed, et brand låner, når det dukker op inde i en stream.",
    ],
    chartTitle: "Andel af publikum i alderen 18 til 34, per platform",
    chartNote: "Kilder som Kick angiver dem: Kick internt 2026, DataReportal, SimilarWeb, Nielsen 2025.",
    tv: "Lineært tv",
    splitTitle: "Kicks egen aldersfordeling",
    engagement: [
      { value: "55 min", label: "gennemsnitlig session" },
      { value: "26k+", label: "chatbeskeder i minuttet" },
      { value: "3M+", label: "aktive i chatten hver uge" },
      { value: "65k+", label: "nye streamere hver uge" },
      { value: "39M+", label: "nye brugere i 2025" },
      { value: "70M+", label: "månedligt aktive brugere" },
    ],
    engagementNote: "Kilde: Kick Ads Media Kit 2026, side 9 og 11.",
  },
  content: {
    label: "Hvad de ser",
    heading: "Halvdelen gaming, en tredjedel snak.",
    body: "Kick er ikke en casinokanal med en gaming-afdeling på siden. Gaming er 48 procent af alt, der ses, snak og IRL yderligere 37. 18+-kategorierne findes, og de kan slås fra med ét enkelt målretningsvalg; mere om det længere nede.",
    rows: {
      gaming: { title: "Gaming", desc: "186 millioner setimer om måneden i gennemsnit. Kick er officiel sendepartner for Riot Games og har 47,7 procent af al GTA V-setid." },
      talk: { title: "Snak, podcasts og IRL", desc: "143 millioner timer om måneden. Just Chatting, podcasts, talkshows og vlogs, live og uredigeret." },
      sport: { title: "Sport og live-events", desc: "Omkring 6 procent af indholdet. Enkelte events har passeret fire millioner samtidige seere." },
    },
    figureCaption: "Kicks forside en hverdag: GTA V alene havde 203.600 seere, Just Chatting 167.800. Det grønne banner nederst er Kicks eget homepage takeover-format.",
  },
  routes: {
    label: "Sådan køber du",
    heading: "To veje ind på Kick. De løser forskellige opgaver.",
    intro: "Kick sælger sine egne flader: bannere, native-kort og videospots inde i afspilleren. Beta Ads placerer brands inde i selve udsendelsen gennem de nordiske creators, vi arbejder med. De fleste, der tager Kick seriøst, ender med at bruge begge, så her er, hvad hver af dem faktisk er.",
    kick: {
      title: "Kick Ads (Kicks egne flader)",
      lead: "Platformsplaceringer købt direkte hos Kick, via din DSP eller på open exchange. Geomålrettet per land, så et køb kun for Danmark er muligt.",
      formats: [
        { name: "In-stream video", desc: "Pre-roll på VOD, mid-roll i live-streams og post-roll, alle uden mulighed for at springe over. Fuld skærm med lyd på.", spec: "6, 15 eller 30 s. 1280x720 MP4, maks. 512 MB" },
        { name: "Homepage banner takeover", desc: "Topfladen på forsiden i 24 timer eller en uge, 100 procent share of voice i dit land.", spec: "1920x250 rich media, eller 970x90 / 728x90 / 320x50" },
        { name: "Homepage native takeover", desc: "Din kampagne formet som et streamkort i de øverste rækker på forsiden, tydeligt markeret som annonce.", spec: "1280x720 billede eller 15 s video, 128x128 logo" },
        { name: "Category masthead og native", desc: "Ej toppen af, eller et native-kort inde i, én kategori, fra Just Chatting til et enkelt spil. Kan låses til sprog.", spec: "Standard bannerstørrelser; 1280x720 til native" },
      ],
      buying: "Købes på tre måder: Direct (fast pris, garanterede placeringer), Programmatic (PG-, PMP- eller PD-aftaler gennem din DSP) eller Open Exchange (auktion via SSP-partnere og Google AdX). Priserne er i USD CPM, og programmet er stadig mærket Beta.",
      contact: "Kicks salgskontakt er advertising@kick.com.",
    },
    beta: {
      title: "Beta Ads (inde i streamen)",
      lead: "Dit brand vises i den udsendelse, creatoren laver, ikke i rammen omkring den. Seerne ser det på alle enheder og med alle adblockere, fordi det er en del af videoen.",
      formats: [
        { name: "Native overlay", desc: "En brandet grafik på streamen i sponsorerede øjeblikke, animeret eller statisk. Aldrig konstant, aldrig over spillet." },
        { name: "Stemmestyret", desc: "Udløses, når creatoren siger brandets navn, med stemmegenkendelse i realtid. Annoncen vises præcis, når anbefalingen sker." },
        { name: "Afstemninger og chat", desc: "Spørgsmål publikum svarer på i chatten, med resultaterne i din rapport. Vores afstemningskampagner har nået 67 procents svarprocent." },
        { name: "Replay reach", desc: "Overlayet ligger i VOD'en og klippene, så kampagnen bliver set videre, efter streamen er slut." },
      ],
      network: "Beta Ads arbejder med over 2.800 Kick-creators i Danmark, Norge, Sverige og Finland. Det tal er vores, ikke Kicks.",
      cta: "Se hvordan en kampagne kører",
    },
    verdict: "Har du brug for et landsdækkende øjeblik på en lanceringsdag, er Kicks homepage takeover værktøjet. Har du brug for, at et nordisk publikum hører om dit brand fra nogen, de stoler på, på deres eget sprog, er det os. Kittets egne tal siger, at 3,2 gange flere stoler på en creators anbefaling end på en kendis.",
  },
  safety: {
    label: "Brand safety",
    heading: "Vælg din komfortzone. Kick kalder det det samme.",
    body: "Kick inddeler sine flader i fire niveauer efter indholdsrating. Standard er udgangspunktet og dækker almindelig gaming; 18+-niveauet sælges kun direkte og kun i visse lande. Uanset niveau falder streams med aktive modereringstiltag automatisk ud af annonceflader.",
    tiers: [
      { name: "Limited", rating: "G til PG", desc: "Spil og kategorier med G- og PG-rating. Ingen IRL, Just Chatting eller voksne temaer." },
      { name: "Standard", rating: "M", desc: "Spil og kategorier med M-rating. Almindelig gaming og streamingindhold med milde til moderate temaer.", note: "Standard" },
      { name: "Expanded", rating: "M til MA", desc: "Spilkategorier med M- til MA-rating. Ekstra rækkevidde for annoncører, der kan tåle mere intensitet." },
      { name: "Restricted", rating: "18+", desc: "18+-indhold. Kun tilgængeligt i udvalgte lande for udvalgte annoncører, sælges kun direkte.", note: "Kun direkte" },
    ],
    systems: [
      { title: "70+ visuelle klassifikatorer", desc: "Hver stream analyseres hvert 60. sekund. Indhold med høj risiko flages og eskaleres automatisk." },
      { title: "Chatmoderering i realtid", desc: "NLP fjerner hadefulde ytringer, mobning og skældsord, før seerne ser dem, med tidsstemplet log." },
      { title: "Mennesker bestemmer", desc: "Alle anmeldelser gennemgås af mennesker. Ingen automatiske udelukkelser, plus gennemgang før monetisering og KYC på creators." },
      { title: "Ugyldig trafik", desc: "Googles annonceserver filtrerer bottrafik med over 200 filtre, og Kick sender en tillidsscore per bruger til den." },
    ],
    betaNote: "Beta Ads lægger sit eget lag på: hver creator i en kampagne er håndplukket, og hver kampagne går gennem vores compliance-tjek for det marked, den kører i, inklusive de danske regler for spil- og alkoholreklame.",
    betaLink: "Sådan arbejder vi med compliance",
  },
  moments: {
    label: "2026 på Kick",
    heading: "To datoer, der allerede står i kalenderen.",
    items: [
      {
        date: "19. november 2026",
        title: "GTA VI udkommer",
        desc: "Kick har 47,7 procent af al GTA V-setid, 844 millioner timer de seneste tolv måneder. Kick regner med at være stedet, hvor verden ser GTA VI, og sælger lanceringsflader nu. Vi har skrevet en guide til, hvad lanceringen betyder for nordiske brands.",
        link: { href: "/blog/gta-vi-nordic-brand-playbook", label: "Læs GTA VI-guiden (på engelsk)" },
      },
      {
        date: "Oktober 2026",
        title: "Stream Fighters 5",
        desc: "Fjerde udgave nåede 4,6 millioner samtidige seere og lå i en periode over Twitch og YouTube tilsammen. Den femte sigter efter ti millioner, mest spansktalende. Mere et globalt rækkeviddeøjeblik end et nordisk, men det viser, hvad et enkelt Kick-event kan gøre.",
      },
    ],
  },
  honest: {
    label: "Den ærlige del",
    heading: "Kick i Norden handler om andel, ikke om volumen.",
    body: [
      "Kicks publikum taler engelsk, arabisk, spansk og tyrkisk. Dansk, norsk, svensk og finsk ligger tilsammen inde i de fire procent, der hedder Other. I absolutte tal har Twitch stadig langt flere nordiske seere.",
      "Så hvorfor bekymre sig? Fordi de 20 procent i Nordeuropa betyder, at Kick allerede er der, hvor hver femte live-time går, og creatorerne der er dem med mindst reklame på sig. Et dansk brand, der dukker op nu, konkurrerer med næsten ingen. På Twitch konkurrerer det med alle.",
    ],
    chartTitle: "Kicks publikum efter sprog",
    chartNote: "Kilde: Kick Ads Media Kit 2026, side 15. De nordiske sprog ligger inde i Other.",
    languages: {
      english: "Engelsk",
      arabic: "Arabisk",
      spanish: "Spansk",
      turkish: "Tyrkisk",
      portuguese: "Portugisisk",
      polish: "Polsk",
      japanese: "Japansk",
      other: "Andet, inkl. nordisk",
    },
  },
  faq: [
    { q: "Kan jeg annoncere på Kick kun i Danmark?", a: "Ja, på begge måder. Kicks egne formater geomålrettes per land og kan låses til sprog per kategori. Beta Ads-kampagner bygges creator for creator, så en kampagne kun for Danmark og på dansk er normalen, ikke et særønske." },
    { q: "Hvad koster Kick-annoncering?", a: "Kicks egne flader prissættes i USD CPM og sælges direkte, programmatisk eller på open exchange; mediekittet har ingen offentlig prisliste. Beta Ads prissætter på CPM for verificerede overlay-visninger med tre budgetniveauer. Vores prisside gennemgår begge." },
    { q: "Er Kick sikkert for brandet?", a: "Det afhænger af det niveau, du vælger. Standard, som er udgangspunktet, er gaming med M-rating og almindeligt indhold, og streams under aktiv moderering fjernes automatisk fra fladerne. 18+-niveauet er et separat produkt, der kun sælges direkte. Med Beta Ads vælger du desuden de konkrete creators, hvilket er den stærkeste kontrol, der findes." },
    { q: "Kick eller Twitch til en dansk kampagne?", a: "Twitch for volumen, Kick for andel af opmærksomheden og lidt reklamestøj. De fleste af vores nordiske kampagner kører nu på begge, hvor Twitch tager rækkevidden og Kick tager frekvensen i kernen 18 til 34. Vi kan vise fordelingen fra rigtige kampagner i en demo." },
  ],
  sources: {
    label: "Kilder",
    intro: "Alle tal på denne side kommer fra KICK Ads Media Kit 2026 (Ads Beta-udgaven), medmindre de er markeret som Beta Ads' egne. Kicks angivne kilder for tredjepartstallene:",
    items: [
      "Stream Hatchet x Streamlabs, Q1 2026: markedsandel for live-streaming",
      "Kick interne data 2026: regional andel af setimer Q2 2026, aldersfordeling, sessioner, chatvolumen, indholdsmiks",
      "DataReportal / DesignRush 2025-26, SimilarWeb 2025-26, Nielsen 2025, PwC Global E&M Outlook 2026: publikums alder per platform",
      "Edelman Gen Z Trust Report 2026: tillid til creators mod kendte (3,2x)",
      "Beta Ads netværksdata, september 2026: 2.800+ nordiske Kick-creators",
    ],
  },
  cta: {
    heading: "Se en Kick-kampagne, før du køber en.",
    subtext: "Tredive minutter, rigtige nordiske Kick-streams, rigtige rapporter. Ingen slides.",
    primary: "Book en demo",
    secondary: "Priser",
  },
  otherLanguages: "Denne side på andre sprog",
};

const FI: KickCopy = {
  seoTitle: "Kick-mainonta Suomessa ja Pohjoismaissa: tavoittavuus, formaatit ja hinta | Beta Ads",
  seoDescription:
    "Kickin oma mediakortti 2026 kertoo, että joka viides Kickin ja Twitchin katselutunti Pohjois-Euroopassa katsotaan nyt Kickissä. Mitä se tarkoittaa suomalaisille brändeille, mitä formaatteja on olemassa ja miten Beta Ads tuo brändit pohjoismaisten Kick-lähetysten sisään.",
  ogAlt: "Kick-mainonta Pohjoismaissa, Beta Ads",
  hero: {
    badge: "Kick-mainonta",
    h1Accent: "Joka viides",
    h1Rest: "live-tunti Pohjois-Euroopassa katsotaan Kickissä.",
    sub: "Kick avautui mainostajille 2026 ja laittoi luvut pöytään. Me luimme mediakortin, jotta sinun ei tarvitse, ja pyöritämme verkostoa, joka tuo suomalaiset brändit lähetysten sisään.",
    primary: "Varaa demo",
    secondary: "Katso hinnat",
    stats: [
      { value: "20,0 %", label: "Kickin osuus Kick + Twitch -tunneista Pohjois-Euroopassa" },
      { value: "81,7 %", label: "Kickin yleisöstä on 18-34-vuotiaita" },
      { value: "55 min", label: "keskimääräinen katselusessio" },
      { value: "5,1 mrd", label: "katselutuntia vuonna 2025" },
    ],
  },
  share: {
    label: "Missä Kick on",
    heading: "Kolmanneksi suurin maailmassa. Toinen pohjoisessa.",
    body: [
      "Maailmanlaajuisesti Kick on kolmanneksi suurin live-alusta: 14,4 prosenttia kaikista katselutunneista vuoden 2026 ensimmäisellä neljänneksellä. Sillä luvulla Kick aloittaa, ja se pitää paikkansa.",
      "Suomalaiselle brändille merkitsevä luku on toinen. Pohjois-Euroopassa Kick vie jo joka viidennen tunnin kaikesta, mitä Kickissä ja Twitchissä yhteensä katsotaan. Länsi-Euroopassa osuus on yksi kahdestakymmenestäkolmesta. Pohjoismaat eivät ole Kickille sivujuonne, vaan yksi sen vahvimmista alueista Euroopassa.",
    ],
    globalTitle: "Osuus kaikista live-katselutunneista, Q1 2026",
    globalNote: "Lähde: Stream Hatchet x Streamlabs, lainattu Kick Ads Media Kit 2026:ssa.",
    europeTitle: "Kickin osuus Kick + Twitch -tunneista, Q2 2026",
    europeNote: "Lähde: Kick Ads Media Kit 2026, alueellinen katselutuntiosuus.",
    regions: {
      eastern: "Itä-Eurooppa",
      northern: "Pohjois-Eurooppa",
      southern: "Etelä-Eurooppa",
      europe: "Eurooppa yhteensä",
      western: "Länsi-Eurooppa",
    },
  },
  audience: {
    label: "Kuka katsoo",
    heading: "Kahdeksan kymmenestä katsojasta on alle 35.",
    body: [
      "Kickin yleisöstä 81,7 prosenttia on 18-34-vuotiaita, korkein osuus kaikista alustoista Kickin omassa vertailussa. Twitch on 69:ssä, TikTok 66:ssa, YouTube 37,5:ssä. Lineaarinen tv, joka on yhä oletusvalinta monessa suomalaisessa mediabudjetissa, on 20:ssä.",
      "Ihmiset eivät vain ole siellä, he jäävät. Keskimääräinen sessio kestää 55 minuuttia, ja chat liikkuu yli 26 000 viestin minuuttivauhtia koko alustalla. Sen huomion brändi lainaa, kun se ilmestyy lähetyksen sisään.",
    ],
    chartTitle: "18-34-vuotiaiden osuus yleisöstä alustoittain",
    chartNote: "Lähteet Kickin ilmoittamina: Kick internal 2026, DataReportal, SimilarWeb, Nielsen 2025.",
    tv: "Lineaarinen tv",
    splitTitle: "Kickin oma ikäjakauma",
    engagement: [
      { value: "55 min", label: "keskimääräinen sessio" },
      { value: "26k+", label: "chat-viestiä minuutissa" },
      { value: "3M+", label: "chattaajaa viikossa" },
      { value: "65k+", label: "uutta striimaajaa viikossa" },
      { value: "39M+", label: "uutta käyttäjää 2025" },
      { value: "70M+", label: "kuukausittaista aktiivista käyttäjää" },
    ],
    engagementNote: "Lähde: Kick Ads Media Kit 2026, sivut 9 ja 11.",
  },
  content: {
    label: "Mitä he katsovat",
    heading: "Puolet pelaamista, kolmannes puhetta.",
    body: "Kick ei ole kasinokanava, jonka kyljessä on peliosasto. Pelaaminen on 48 prosenttia kaikesta katsotusta, puhe ja IRL vielä 37. 18+-kategoriat ovat olemassa, ja ne voi sulkea pois yhdellä kohdennusvalinnalla; siitä lisää alempana.",
    rows: {
      gaming: { title: "Pelaaminen", desc: "Keskimäärin 186 miljoonaa katselutuntia kuukaudessa. Kick on Riot Gamesin virallinen lähetyskumppani ja sillä on 47,7 prosenttia kaikesta GTA V:n katseluajasta." },
      talk: { title: "Puhe, podcastit ja IRL", desc: "143 miljoonaa tuntia kuukaudessa. Just Chatting, podcastit, keskusteluohjelmat ja vlogit, livenä ja leikkaamatta." },
      sport: { title: "Urheilu ja live-tapahtumat", desc: "Noin 6 prosenttia sisällöstä. Yksittäiset tapahtumat ovat ylittäneet neljä miljoonaa samanaikaista katsojaa." },
    },
    figureCaption: "Kickin etusivu arkipäivänä: pelkällä GTA V:llä oli 203 600 katsojaa, Just Chattingilla 167 800. Alareunan vihreä banneri on Kickin oma homepage takeover -formaatti.",
  },
  routes: {
    label: "Näin ostat",
    heading: "Kaksi reittiä Kickiin. Ne tekevät eri työt.",
    intro: "Kick myy omia pintojaan: bannereita, native-kortteja ja videospotteja soittimen sisällä. Beta Ads tuo brändit itse lähetyksen sisään niiden pohjoismaisten tekijöiden kautta, joiden kanssa työskentelemme. Useimmat, jotka ottavat Kickin tosissaan, päätyvät käyttämään molempia, joten tässä on, mitä kumpikin oikeasti on.",
    kick: {
      title: "Kick Ads (Kickin omat pinnat)",
      lead: "Alustan mainospaikat ostettuna suoraan Kickiltä, oman DSP:n kautta tai open exchangesta. Maakohdennettu, joten pelkkään Suomeen rajattu osto on mahdollinen.",
      formats: [
        { name: "In-stream video", desc: "Pre-roll VOD:eissa, mid-roll live-lähetyksissä ja post-roll, kaikki ohittamattomia. Koko ruutu, ääni päällä.", spec: "6, 15 tai 30 s. 1280x720 MP4, maks. 512 MB" },
        { name: "Homepage banner takeover", desc: "Etusivun pääpaikka 24 tunniksi tai viikoksi, 100 prosentin share of voice omassa maassasi.", spec: "1920x250 rich media tai 970x90 / 728x90 / 320x50" },
        { name: "Homepage native takeover", desc: "Kampanjasi striimikortin muodossa etusivun ylimmillä riveillä, selvästi mainokseksi merkittynä.", spec: "1280x720 kuva tai 15 s video, 128x128 logo" },
        { name: "Category masthead ja native", desc: "Omista yhden kategorian yläosa tai native-kortti sen sisällä, Just Chattingista yksittäiseen peliin. Voidaan rajata kielen mukaan.", spec: "Vakiobannerikoot; 1280x720 nativelle" },
      ],
      buying: "Ostetaan kolmella tavalla: Direct (kiinteä hinta, taatut paikat), Programmatic (PG-, PMP- tai PD-sopimukset oman DSP:n kautta) tai Open Exchange (huutokauppa SSP-kumppanien ja Google AdX:n kautta). Hinnat ovat USD CPM, ja ohjelma on yhä merkitty Beta-vaiheeseen.",
      contact: "Kickin myynnin yhteystieto on advertising@kick.com.",
    },
    beta: {
      title: "Beta Ads (lähetyksen sisällä)",
      lead: "Brändisi näkyy tekijän tekemässä lähetyksessä, ei sen ympärillä olevassa kehyksessä. Katsojat näkevät sen kaikilla laitteilla ja kaikilla mainosestäjillä, koska se on osa videota.",
      formats: [
        { name: "Native overlay", desc: "Brändätty grafiikka lähetyksessä sponsoroitujen hetkien aikana, animoituna tai staattisena. Ei koskaan jatkuvasti, ei koskaan pelin päällä." },
        { name: "Ääniohjattu", desc: "Käynnistyy, kun tekijä sanoo brändisi nimen, reaaliaikaisella puheentunnistuksella. Mainos näkyy juuri silloin, kun suositus tapahtuu." },
        { name: "Äänestykset ja chat", desc: "Kysymyksiä, joihin yleisö vastaa chatissa, tulokset raportissasi. Äänestyskampanjamme ovat yltäneet 67 prosentin vastausasteeseen." },
        { name: "Replay reach", desc: "Overlay jää VOD:iin ja klippeihin, joten kampanjaa katsotaan vielä lähetyksen päätyttyä." },
      ],
      network: "Beta Ads työskentelee yli 2 800 Kick-tekijän kanssa Suomessa, Ruotsissa, Norjassa ja Tanskassa. Se luku on meidän, ei Kickin.",
      cta: "Katso miten kampanja pyörii",
    },
    verdict: "Jos tarvitset koko maan kattavan hetken julkaisupäivänä, Kickin homepage takeover on työkalu siihen. Jos tarvitset, että pohjoismainen yleisö kuulee brändistäsi joltakulta, johon se luottaa, omalla kielellään, se olemme me. Mediakortin omat luvut sanovat, että 3,2 kertaa useampi luottaa tekijän suositukseen kuin julkkiksen.",
  },
  safety: {
    label: "Bränditurvallisuus",
    heading: "Valitse mukavuusalueesi. Kick kutsuu sitä samalla nimellä.",
    body: "Kick jakaa pintansa neljään tasoon sisällön ikäluokituksen mukaan. Standard on oletus ja kattaa tavallisen pelaamisen; 18+-taso myydään vain suoraan ja vain joissakin maissa. Tasosta riippumatta lähetykset, joihin kohdistuu aktiivisia moderointitoimia, putoavat mainospinnoista automaattisesti.",
    tiers: [
      { name: "Limited", rating: "G-PG", desc: "G- ja PG-luokitellut pelit ja kategoriat. Ei IRL:ää, Just Chattingia tai aikuisteemoja." },
      { name: "Standard", rating: "M", desc: "M-luokitellut pelit ja kategoriat. Tavallista peli- ja striimisisältöä lievillä tai kohtalaisilla teemoilla.", note: "Oletus" },
      { name: "Expanded", rating: "M-MA", desc: "M- ja MA-luokitellut pelikategoriat. Lisätavoittavuutta mainostajille, jotka sietävät enemmän intensiteettiä." },
      { name: "Restricted", rating: "18+", desc: "18+-sisältö. Saatavilla vain valituissa maissa valituille mainostajille, myydään vain suoraan.", note: "Vain suoraan" },
    ],
    systems: [
      { title: "70+ visuaalista luokittelijaa", desc: "Jokainen lähetys analysoidaan 60 sekunnin välein. Korkean riskin sisältö merkitään ja eskaloidaan automaattisesti." },
      { title: "Chatin reaaliaikainen moderointi", desc: "NLP poistaa vihapuheen, kiusaamisen ja herjaukset ennen kuin katsojat näkevät ne, aikaleimatulla lokilla." },
      { title: "Ihmiset päättävät", desc: "Kaikki ilmoitukset käyvät ihmisen läpi. Ei automaattisia estoja, lisäksi tarkastus ennen monetisointia ja KYC tekijöille." },
      { title: "Virheellinen liikenne", desc: "Googlen mainospalvelin suodattaa bottiliikenteen yli 200 suodattimella, ja Kick välittää sille käyttäjäkohtaisen luottamuspisteen." },
    ],
    betaNote: "Beta Ads lisää oman kerroksensa: jokainen kampanjan tekijä on käsin valittu, ja jokainen kampanja käy läpi compliance-tarkastuksemme sen markkinan osalta, jossa se pyörii, mukaan lukien Suomen rahapeli- ja alkoholimainonnan säännöt.",
    betaLink: "Näin hoidamme compliancen",
  },
  moments: {
    label: "2026 Kickissä",
    heading: "Kaksi päivämäärää, jotka ovat jo kalenterissa.",
    items: [
      {
        date: "19. marraskuuta 2026",
        title: "GTA VI julkaistaan",
        desc: "Kickillä on 47,7 prosenttia kaikesta GTA V:n katseluajasta, 844 miljoonaa tuntia viimeisten kahdentoista kuukauden aikana. Kick odottaa olevansa paikka, jossa maailma katsoo GTA VI:ta, ja myy julkaisupintoja nyt. Kirjoitimme oppaan siitä, mitä julkaisu tarkoittaa pohjoismaisille brändeille.",
        link: { href: "/blog/gta-vi-nordic-brand-playbook", label: "Lue GTA VI -opas (englanniksi)" },
      },
      {
        date: "Lokakuu 2026",
        title: "Stream Fighters 5",
        desc: "Neljäs painos tavoitti 4,6 miljoonaa samanaikaista katsojaa ja ohitti hetkeksi Twitchin ja YouTuben yhteensä. Viides tähtää kymmeneen miljoonaan, enimmäkseen espanjankielisiin. Enemmän globaali tavoittavuushetki kuin pohjoismainen, mutta se näyttää, mitä yksi Kick-tapahtuma voi tehdä.",
      },
    ],
  },
  honest: {
    label: "Rehellinen osuus",
    heading: "Kick Pohjoismaissa on osuustarina, ei volyymitarina.",
    body: [
      "Kickin yleisö puhuu englantia, arabiaa, espanjaa ja turkkia. Suomi, ruotsi, norja ja tanska ovat yhdessä siinä neljässä prosentissa, jonka nimi on Other. Absoluuttisin luvuin Twitchillä on yhä paljon enemmän pohjoismaisia katsojia.",
      "Miksi siis vaivautua? Koska 20 prosentin osuus Pohjois-Euroopassa tarkoittaa, että Kick on jo siellä, minne joka viides live-tunti menee, ja sen tekijöillä on vähiten mainoksia päällään. Suomalainen brändi, joka ilmestyy nyt, kilpailee lähes kenenkään kanssa. Twitchissä se kilpailee kaikkien kanssa.",
    ],
    chartTitle: "Kickin yleisö puhutun kielen mukaan",
    chartNote: "Lähde: Kick Ads Media Kit 2026, sivu 15. Pohjoismaiset kielet ovat Other-ryhmässä.",
    languages: {
      english: "Englanti",
      arabic: "Arabia",
      spanish: "Espanja",
      turkish: "Turkki",
      portuguese: "Portugali",
      polish: "Puola",
      japanese: "Japani",
      other: "Muut, ml. pohjoismaiset",
    },
  },
  faq: [
    { q: "Voinko mainostaa Kickissä vain Suomessa?", a: "Kyllä, molemmilla tavoilla. Kickin omat formaatit kohdennetaan maittain ja voidaan rajata kielen mukaan kategoriaa kohti. Beta Adsin kampanjat rakennetaan tekijä kerrallaan, joten pelkkään Suomeen rajattu, suomenkielinen kampanja on normaali tapaus, ei erikoistoive." },
    { q: "Mitä Kick-mainonta maksaa?", a: "Kickin omat pinnat hinnoitellaan USD CPM -pohjalta ja myydään suoraan, ohjelmallisesti tai open exchangessa; mediakortissa ei ole julkista hinnastoa. Beta Ads hinnoittelee CPM:n mukaan varmennetuille overlay-näytöille kolmella budjettitasolla. Hintasivumme käy molemmat läpi." },
    { q: "Onko Kick bränditurvallinen?", a: "Riippuu valitsemastasi tasosta. Standard, joka on oletus, on M-luokiteltua pelaamista ja tavallista sisältöä, ja aktiivisen moderoinnin kohteena olevat lähetykset poistetaan pinnoista automaattisesti. 18+-taso on erillinen, vain suoraan myytävä tuote. Beta Adsin kanssa valitset lisäksi itse tekijät, mikä on vahvin olemassa oleva kontrolli." },
    { q: "Kick vai Twitch suomalaiseen kampanjaan?", a: "Twitch volyymiin, Kick huomio-osuuteen ja vähäiseen mainoshälyyn. Useimmat pohjoismaiset kampanjamme pyörivät nyt molemmilla: Twitch kantaa tavoittavuuden ja Kick toiston 18-34-ytimessä. Näytämme jaon oikeista kampanjoista demossa." },
  ],
  sources: {
    label: "Lähteet",
    intro: "Kaikki tämän sivun luvut ovat KICK Ads Media Kit 2026:sta (Ads Beta -painos), ellei niitä ole merkitty Beta Adsin omiksi. Kickin ilmoittamat lähteet kolmannen osapuolen luvuille:",
    items: [
      "Stream Hatchet x Streamlabs, Q1 2026: live-striimauksen markkinaosuus",
      "Kickin sisäinen data 2026: alueellinen katselutuntiosuus Q2 2026, ikäjakauma, sessiot, chat-volyymi, sisältöjakauma",
      "DataReportal / DesignRush 2025-26, SimilarWeb 2025-26, Nielsen 2025, PwC Global E&M Outlook 2026: yleisön ikä alustoittain",
      "Edelman Gen Z Trust Report 2026: luottamus tekijöihin vs. julkkiksiin (3,2x)",
      "Beta Adsin verkostodata, syyskuu 2026: 2 800+ pohjoismaista Kick-tekijää",
    ],
  },
  cta: {
    heading: "Katso Kick-kampanja ennen kuin ostat sellaisen.",
    subtext: "Kolmekymmentä minuuttia, oikeita pohjoismaisia Kick-lähetyksiä, oikeita raportteja. Ei kalvoja.",
    primary: "Varaa demo",
    secondary: "Hinnat",
  },
  otherLanguages: "Tämä sivu muilla kielillä",
};

export const KICK_COPY: Record<KickLang, KickCopy> = { en: EN, no: NO, sv: SV, da: DA, fi: FI };

export const KICK_LANG_NAMES: Record<KickLang, string> = {
  en: "English",
  no: "Norsk",
  sv: "Svenska",
  da: "Dansk",
  fi: "Suomi",
};

/** hreflang cluster shared by all five pages. */
export const KICK_ALTERNATES: Array<{ hreflang: KickLang | "x-default"; href: string }> = [
  ...KICK_LANGS.map((l) => ({ hreflang: l, href: KICK_ROUTES[l] })),
  { hreflang: "x-default", href: KICK_ROUTES.en },
];
