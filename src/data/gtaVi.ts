/**
 * Grand Theft Auto VI: the facts a Nordic marketer needs before planning around it.
 *
 * This module is the evidence layer for the blog post. Everything here is a
 * published, checkable third-party fact with a source id pointing at SOURCES
 * below. Nothing in here is ours, and nothing in here is estimated by us. The
 * one figure we do own (our own tracked-clip count) lives in the component and
 * is labelled as ours there.
 *
 * Where a widely-repeated number is a third-party estimate rather than an
 * official disclosure, it says so in the copy. Streams Charts' 3.97 million
 * concurrent figure is the obvious case: it is modelled from public stream
 * data, not published by Netflix or Twitch, and we are not going to launder it
 * into a hard number just because it flatters the argument.
 *
 * Artwork under /lovable-uploads/gta6/ is Rockstar Games' own promotional
 * material, used editorially to illustrate coverage of the game. Beta Agency AS
 * has no relationship with Rockstar Games or Take-Two Interactive, and the post
 * says so in the credit line.
 */

export type Lang = "en" | "no";

export interface Source {
  id: string;
  publisher: string;
  title: string;
  href: string;
}

export const SOURCES: Source[] = [
  {
    id: "variety-netflix",
    publisher: "Variety",
    title: "'GTA 6' Netflix Extended Look Tops Charts With 31.1 Million Views in Four Days",
    href: "https://variety.com/2026/tv/news/gta-6-netflix-extended-look-views-1236848409/",
  },
  {
    id: "inven-concurrents",
    publisher: "Inven Global",
    title: "'GTA6' Tops Netflix, Draws 3.97 Million Concurrent Viewers",
    href: "https://www.invenglobal.com/articles/25362/gta6-tops-netflix-draws-397-million-concurrent-viewers",
  },
  {
    id: "variety-preorders",
    publisher: "Variety",
    title: "'GTA 6' Pre-Orders Reach 'Unprecedented and Astonishing' Level, Take-Two CEO Says",
    href: "https://variety.com/2026/gaming/news/gta-6-preorder-sales-take-two-earnings-1236829396/",
  },
  {
    id: "techradar-preorders",
    publisher: "TechRadar",
    title: "Take-Two reportedly made $1.39 billion in sales during GTA 6's pre-order period",
    href: "https://www.techradar.com/gaming/the-level-of-pre-orders-is-unprecedented-take-two-reportedly-made-usd1-39-billion-in-sales-during-gta-6s-pre-order-period",
  },
  {
    id: "gtavispot-date",
    publisher: "GTA VI Spot",
    title: "GTA 6 Release Date: November 19, 2026 Confirmed",
    href: "https://www.gtavispot.com/news/gta-6-release-date/",
  },
  {
    id: "gtavispot-timeline",
    publisher: "GTA VI Spot",
    title: "GTA 6 Timeline: Complete Development & Trailer History",
    href: "https://www.gtavispot.com/gta-6-timeline/",
  },
  {
    id: "stg-sales",
    publisher: "ShaneTheGamer",
    title: "GTA Sales Statistics (2013-2026)",
    href: "https://www.shanethegamer.com/research/gta-sales-statistics/",
  },
];

/** The four things somebody who has never followed the game needs first. */
export interface FactTile {
  label: Record<Lang, string>;
  value: Record<Lang, string>;
  detail: Record<Lang, string>;
}

export const BASICS: FactTile[] = [
  {
    label: { en: "Out", no: "Ute" },
    value: { en: "19 November 2026", no: "19. november 2026" },
    detail: {
      en: "PlayStation 5 and Xbox Series X|S. No PC version at launch, which historically arrives a year or more later.",
      no: "PlayStation 5 og Xbox Series X|S. Ingen PC-versjon ved lansering, og den har historisk kommet et år eller mer etterpå.",
    },
  },
  {
    label: { en: "Where", no: "Hvor" },
    value: { en: "The state of Leonida", no: "Delstaten Leonida" },
    detail: {
      en: "A fictional Florida: Vice City on the coast, plus swamps, keys, backcountry and small towns inland. Far larger than one city.",
      no: "Et oppdiktet Florida: Vice City ved kysten, pluss sumper, øyer, innland og småbyer. Mye større enn bare én by.",
    },
  },
  {
    label: { en: "Who you play", no: "Hvem du spiller" },
    value: { en: "Lucia and Jason", no: "Lucia og Jason" },
    detail: {
      en: "Two playable leads in a Bonnie-and-Clyde partnership. Lucia Caminos is the first female protagonist in the mainline series.",
      no: "To spillbare hovedpersoner i et Bonnie og Clyde-forhold. Lucia Caminos er den første kvinnelige hovedpersonen i hovedserien.",
    },
  },
  {
    label: { en: "Who makes it", no: "Hvem lager det" },
    value: { en: "Rockstar Games", no: "Rockstar Games" },
    detail: {
      en: "Owned by Take-Two Interactive. The last entry, GTA V, came out in 2013 and is still selling. This is a thirteen-year gap.",
      no: "Eid av Take-Two Interactive. Forrige spill, GTA V, kom i 2013 og selger fortsatt. Det er tretten år mellom dem.",
    },
  },
];

/** Real locations from Rockstar's published material, with their own stills. */
export interface Place {
  img: string;
  name: string;
  caption: Record<Lang, string>;
}

export const PLACES: Place[] = [
  {
    img: "/lovable-uploads/gta6/vice-city-beach.webp",
    name: "Vice City",
    caption: {
      en: "The coastal city at the centre of it, rebuilt from the 1986 original as a present-day Miami.",
      no: "Kystbyen i sentrum av det hele, bygget opp igjen fra originalen fra 1986 som et nåtidig Miami.",
    },
  },
  {
    img: "/lovable-uploads/gta6/leonida-keys.webp",
    name: "Leonida Keys",
    caption: {
      en: "The island chain south of the city, reached by causeway, boat or seaplane.",
      no: "Øyrekken sør for byen, som nås med bru, båt eller sjøfly.",
    },
  },
  {
    img: "/lovable-uploads/gta6/grassrivers.webp",
    name: "Grassrivers",
    caption: {
      en: "The wetlands inland. Airboats, alligators and people who would rather not be found.",
      no: "Våtmarkene i innlandet. Sumpbåter, alligatorer og folk som helst ikke vil bli funnet.",
    },
  },
  {
    img: "/lovable-uploads/gta6/mount-kalaga.webp",
    name: "Mount Kalaga",
    caption: {
      en: "The national park in the north, and the off-road riding that comes with it.",
      no: "Nasjonalparken i nord, og terrengkjøringen som følger med.",
    },
  },
  {
    img: "/lovable-uploads/gta6/ambrosia.webp",
    name: "Ambrosia County",
    caption: {
      en: "Small-town Leonida: strip malls, gas stations and a motorcycle club that runs the road.",
      no: "Leonida på bygda: kjøpesentre, bensinstasjoner og en MC-klubb som eier veien.",
    },
  },
  {
    img: "/lovable-uploads/gta6/port-gellhorn.webp",
    name: "Port Gellhorn",
    caption: {
      en: "The faded resort town up the coast, all neon motel signs and out-of-season quiet.",
      no: "Den falmede feriebyen oppover kysten, full av neonskilt og stillhet utenfor sesongen.",
    },
  },
];

/** How the game got here, for a reader who tuned out during the delays. */
export interface Beat {
  date: Record<Lang, string>;
  title: Record<Lang, string>;
  body: Record<Lang, string>;
  source?: string;
}

export const TIMELINE: Beat[] = [
  {
    date: { en: "December 2023", no: "Desember 2023" },
    title: { en: "The first trailer", no: "Den første traileren" },
    body: {
      en: "Rockstar posts a 90-second trailer. It takes 93 million views in 24 hours and becomes the most-viewed non-music video ever over that window.",
      no: "Rockstar legger ut en trailer på 90 sekunder. Den får 93 millioner visninger på 24 timer og blir den mest sette videoen som ikke er musikk i det tidsrommet.",
    },
    source: "gtavispot-timeline",
  },
  {
    date: { en: "May 2025", no: "Mai 2025" },
    title: { en: "Trailer two, and the first delay", no: "Trailer to, og første utsettelse" },
    body: {
      en: "The second trailer pulls over 475 million cross-platform views in a day. In the same month the release slips out of 2025 and into May 2026.",
      no: "Trailer nummer to får over 475 millioner visninger på tvers av plattformer på ett døgn. Samme måned glir lanseringen ut av 2025 og over i mai 2026.",
    },
    source: "gtavispot-timeline",
  },
  {
    date: { en: "June 2026", no: "Juni 2026" },
    title: { en: "Pre-orders open", no: "Forhåndssalget åpner" },
    body: {
      en: "Standard edition at $79.99, Ultimate at $99.99. Take-Two's CEO later calls the level of pre-orders unprecedented, with reported sales of $1.39 billion in the quarter.",
      no: "Standardutgaven til 79,99 dollar, Ultimate til 99,99. Take-Twos toppsjef kaller senere forhåndssalget uten sidestykke, med rapporterte 1,39 milliarder dollar i kvartalet.",
    },
    source: "variety-preorders",
  },
  {
    date: { en: "27 August 2026", no: "27. august 2026" },
    title: { en: "The Extended Look, on Netflix", no: "Extended Look, på Netflix" },
    body: {
      en: "Rockstar premieres a long gameplay showcase on Netflix rather than YouTube. It takes 31.1 million views in four days and ranks number one in 87 of the 93 countries Netflix tracks.",
      no: "Rockstar har premiere på en lang gameplay-visning på Netflix i stedet for YouTube. Den får 31,1 millioner visninger på fire dager og havner på førsteplass i 87 av de 93 landene Netflix måler.",
    },
    source: "variety-netflix",
  },
  {
    date: { en: "19 November 2026", no: "19. november 2026" },
    title: { en: "Launch", no: "Lansering" },
    body: {
      en: "A Thursday. Expect the surrounding week, not the day, to be the media event.",
      no: "En torsdag. Regn med at uken rundt, ikke selve dagen, blir medieøyeblikket.",
    },
    source: "gtavispot-date",
  },
];

/** The scale, in figures that are not ours. */
export interface Figure {
  value: string;
  label: Record<Lang, string>;
  source: string;
}

export const SCALE: Figure[] = [
  {
    value: "475M",
    label: {
      en: "views of trailer two in its first 24 hours, across platforms",
      no: "visninger av trailer to på det første døgnet, på tvers av plattformer",
    },
    source: "gtavispot-timeline",
  },
  {
    value: "470M+",
    label: {
      en: "copies sold across the Grand Theft Auto series to date",
      no: "solgte eksemplarer i Grand Theft Auto-serien til nå",
    },
    source: "stg-sales",
  },
  {
    value: "$1.39bn",
    label: {
      en: "reported pre-order sales in a single quarter, before release",
      no: "rapportert forhåndssalg i ett enkelt kvartal, før lansering",
    },
    source: "techradar-preorders",
  },
  {
    value: "87 / 93",
    label: {
      en: "countries where the Extended Look was Netflix's number one title",
      no: "land der Extended Look var Netflix' mest sette tittel",
    },
    source: "variety-netflix",
  },
];

/** The platform split of hours watched during the Extended Look. */
export const PLATFORM_SPLIT: { name: string; pct: number }[] = [
  { name: "Twitch", pct: 44 },
  { name: "YouTube", pct: 34.8 },
  { name: "Kick", pct: 20.2 },
];

/**
 * Rockstar's own uploads on their own YouTube channel. Each id was checked
 * against YouTube's oembed endpoint on 3 September 2026 and confirmed to be
 * published by "Rockstar Games", so none of these are reuploads.
 *
 * Embedded through a click-to-load facade: the poster is a local file and no
 * YouTube script or cookie loads until a reader actually presses play.
 */
export interface Film {
  id: string;
  poster: string;
  title: Record<Lang, string>;
  meta: Record<Lang, string>;
}

export const FILMS: Film[] = [
  {
    id: "QdBZY2fkU-0",
    poster: "/lovable-uploads/gta6/yt-trailer-1.webp",
    title: { en: "Trailer 1", no: "Trailer 1" },
    meta: {
      en: "December 2023. 93 million views in its first 24 hours, a record for a non-music video.",
      no: "Desember 2023. 93 millioner visninger det første døgnet, rekord for en video som ikke er musikk.",
    },
  },
  {
    id: "VQRLujxTm3c",
    poster: "/lovable-uploads/gta6/yt-trailer-2.webp",
    title: { en: "Trailer 2", no: "Trailer 2" },
    meta: {
      en: "May 2025. Over 475 million cross-platform views in a day, the biggest video launch on record.",
      no: "Mai 2025. Over 475 millioner visninger på tvers av plattformer på et døgn, den største videolanseringen som er målt.",
    },
  },
  {
    id: "tJbzMqJGH4k",
    poster: "/lovable-uploads/gta6/yt-extended-look.webp",
    title: { en: "An Extended Look", no: "An Extended Look" },
    meta: {
      en: "August 2026. Twenty-six minutes of PS5 gameplay, premiered on Netflix before it reached YouTube.",
      no: "August 2026. Tjueseks minutter med PS5-gameplay, med premiere på Netflix før den kom på YouTube.",
    },
  },
];
