/**
 * Delt datasett for norske streamer-profiler.
 *
 * Brukt av roundup-saken (/blog/norske-twitch-streamere-2026) OG av de
 * individuelle profilsidene (/streamere/<handle>).
 *
 * Alt innhold er hentet fra ekte, sjekkbare kilder - se `sources` per streamer.
 * Tone er profesjonell/positiv (dette er en agency-blogg, ikke journalistikk);
 * negative nyhetsoppslag er bevisst utelatt selv om de finnes.
 */

export interface SocialLink {
  label: string;
  url: string;
}

export interface ReferenceLink {
  label: string;
  url: string;
  type: "official-site" | "press" | "wikipedia" | "news" | "tracker" | "agency" | "platform";
}

export interface YouTubeVideo {
  id: string;
  title: string;
  published: string;
}

export interface NewsArticle {
  title: string;
  url: string;
  source: string;
  date: string;
  summary?: string;
  ogImage?: string | null;
  tone?: "positive" | "neutral" | "negative";
}

export interface CreatorProfile {
  /** Twitch-handle - også URL-slug for profilsiden. */
  handle: string;
  name: string;
  realName?: string;
  meta: string;
  /** Kort blurb til roundup-kortet. */
  blurb: string;
  /** Lengre intro brukt på profilsiden. */
  bio: string;
  /** 3-6 etterprøvbare høydepunkter fra forskningen. */
  highlights: string[];
  image: string;
  attribution: string;
  attributionUrl: string;
  language: "no" | "en" | "mixed";
  socials: SocialLink[];
  /** Eksterne kilder leseren kan klikke for å lese mer. */
  references: ReferenceLink[];
  /** Ekte presse- og nyhetsoppslag, hentet inn separat. */
  news?: NewsArticle[];
  /** YouTube-handle for kanalen (uten @), hvis aktiv. */
  youtubeChannelHandle?: string;
  /** De siste videoene fra YouTube RSS, fetchet ved build. */
  youtubeVideos?: YouTubeVideo[];
}

export const CREATORS: CreatorProfile[] = [
  {
    handle: "mrsavage",
    name: "MrSavage",
    realName: "Martin Foss Andersen",
    meta: "Twitch · YouTube · proff Fortnite",
    blurb:
      "Norges desidert største navn på Twitch. Profesjonell Fortnite-spiller med Fortnite-VM bak seg og et publikum i millionklassen på tvers av plattformene.",
    bio:
      "Martin Foss Andersen (f. 12. november 2004), kjent som MrSavage, er en av de mest dekorerte norske esports-utøverne noensinne. Han har vært aktiv på toppnivå i Fortnite siden de tidligste turneringene, deltok i Fortnite-VM i 2019, og har representert flere store esports-organisasjoner gjennom karrieren - blant annet 100 Thieves, NRG, 00 Nation, Red Bull Esports og XSET. Rekkevidden hans er global: rundt 4,6 millioner følgere på Twitch, omtrent 4,1 millioner abonnenter på YouTube og over 3 millioner på Instagram. Han streamer hovedsakelig på engelsk til et internasjonalt publikum.",
    highlights: [
      "Vant DreamHack Anaheim 2020 sammen med 100 Thieves",
      "Vant DreamHack Open October 2021 EU",
      "2. plass i C2S6 FNCS EU Grand Finals (2021), med rundt $135,000 i premiepenger",
      "Skin-samarbeid med Fortnite (Icon Series, lansert september 2025)",
      "Ifølge Liquipedia/Esports Insider: ~4,6M Twitch-følgere, ~4,1M YouTube-abonnenter, ~3,1M Instagram",
    ],
    image: "/lovable-uploads/creators/mrsavage.jpg",
    attribution: "Liquipedia (FNCS Major)",
    attributionUrl: "https://liquipedia.net/fortnite/MrSavage",
    language: "en",
    socials: [
      { label: "Twitch",    url: "https://www.twitch.tv/mrsavage" },
      { label: "YouTube",   url: "https://www.youtube.com/@MrSavageOG" },
      { label: "Instagram", url: "https://www.instagram.com/mrsavage" },
    ],
    references: [
      { label: "Liquipedia: MrSavage",         url: "https://liquipedia.net/fortnite/MrSavage", type: "wikipedia" },
      { label: "Wikipedia: MrSavage",          url: "https://en.wikipedia.org/wiki/MrSavage",   type: "wikipedia" },
      { label: "Esports.gg: Icon Series skin", url: "https://www.esports.gg/news/fortnite/mrsavage-icon-series/", type: "news" },
    ],
    news: [
      {
        title: "MrSavage - Liquipedia Fortnite Wiki",
        url: "https://liquipedia.net/fortnite/MrSavage",
        source: "Liquipedia",
        date: "2025",
        summary: "Esports-databasen Liquipedia med komplett oversikt over MrSavage sine turneringsresultater, premiepenger og lagshistorikk i Fortnite.",
        ogImage: "/lovable-uploads/news/mrsavage-1.jpg",
        tone: "neutral",
      },
      {
        title: "YouTuber MrSavage scores EPIC longest distance Fortnite elimination from over 1 km away",
        url: "https://www.guinnessworldrecords.com/news/2025/3/youtuber-mrsavage-scores-epic-longest-distance-fortnite-elimination-from-over-1-km-away",
        source: "Guinness World Records",
        date: "2025-03",
        summary: "Offisiell Guinness-artikkel om at MrSavage satte verdensrekord for lengste eliminasjon i Fortnite-historien med 1 161,31 meter, filmet pa Lofoten.",
        ogImage: "/lovable-uploads/news/mrsavage-3.jpg",
        tone: "positive",
      },
      {
        title: "MrSavage unveils Fortnite skin: First look, release date, and more",
        url: "https://esports.gg/news/fortnite/mrsavage-fortnite-icon-series-skin/",
        source: "Esports.gg",
        date: "2025-09",
        summary: "Esports.gg dekker lanseringen av MrSavages egen Icon Series-skin i Fortnite item shop, inkludert bundle-innhold og MrSavage Cup-turneringen.",
        ogImage: "/lovable-uploads/news/mrsavage-8.jpg",
        tone: "positive",
      },
      {
        title: "MrSavage - Wikipedia",
        url: "https://en.wikipedia.org/wiki/MrSavage",
        source: "Wikipedia",
        date: "2025",
        summary: "Wikipedia-profil av Martin Foss Andersen (MrSavage), norsk profesjonell Fortnite-spiller og innholdsskaper med karrierehoydepunkter, lagshistorikk og priser.",
        ogImage: null,
        tone: "neutral",
      },
      {
        title: "Martin 'MrSavage' Foss Andersen: Gaming – Profile page",
        url: "https://www.redbull.com/int-en/athlete/martin-mrsavage-foss-andersen",
        source: "Red Bull",
        date: "2023",
        summary: "Offisiell Red Bull athlete-profil av MrSavage som beskriver han som en av Norges mest suksessrike Fortnite-spillere etter signering i mai 2023.",
        ogImage: null,
        tone: "positive",
      },
      {
        title: "World record! MrSavage achieves longest Fortnite elimination in history",
        url: "https://www.redbull.com/int-en/mrsavage-fjordnite-longest-frag",
        source: "Red Bull",
        date: "2025-03",
        summary: "Red Bull dokumenterer 'Fjordnite'-stuntet pa Lofoten der MrSavage satte Guinness-rekord under arktiske forhold med teleskop og 32-tommers skjerm pa tvers av sjoen.",
        ogImage: null,
        tone: "positive",
      },
    ],
    youtubeChannelHandle: "MrSavageOG",
    youtubeVideos: [
      { id: "Aa8kGgwi-Ro", title: "SIN CONTEXTO.", published: "2022-01-21T20:31:06+00:00" },
    ],
  },
  {
    handle: "knut",
    name: "Knut",
    realName: "Knut Spildrejorde",
    meta: "Twitch · fitness, IRL & gaming",
    blurb:
      "Streameren som koblet norsk treningskultur til gaming. Kjent for «Camp Knut» og en blanding av gym, IRL og spill - i dag med mye av innholdet drevet fra USA.",
    bio:
      "Knut Spildrejorde er en norsk streamer og bodybuilder som har blitt en av de internasjonalt mest synlige norske Twitch-personlighetene. Innholdet hans blander Just Chatting, IRL/gym-strømming og gaming (notabelt Elden Ring). I 2022 lanserte han «Camp Knut», et 30-dagers trenings- og kostholdsprogram der andre streamere følger opplegget hans og kulminerer i en bodybuilding-konkurranse. Han flyttet til Austin, Texas og er medeier av Iron Forge Gym - et bodybuilding- og strongman-fokusert treningssenter der. Streamer hovedsakelig på engelsk.",
    highlights: [
      "Rundt 400 000+ Twitch-følgere (tall fra 2024-2025, kan variere)",
      "Grunnlegger av «Camp Knut» (siden 2022) - 30-dagers fitness-kohort med streamere",
      "Medeier av Iron Forge Gym i Austin, Texas",
      "Profilbilde på Wikimedia Commons (CC BY 3.0), brukt som infobox-bilde på Wikidata Q120869043",
    ],
    image: "/lovable-uploads/creators/knut.png",
    attribution: "Wikimedia Commons (CC BY 3.0)",
    attributionUrl: "https://commons.wikimedia.org/wiki/File:Knut_2023-06-09_01.png",
    language: "en",
    socials: [
      { label: "Twitch",    url: "https://www.twitch.tv/knut" },
      { label: "Instagram", url: "https://www.instagram.com/knutspild" },
      { label: "X",         url: "https://x.com/Knutspild" },
    ],
    references: [
      { label: "Wikimedia Commons (profilbilde)", url: "https://commons.wikimedia.org/wiki/File:Knut_2023-06-09_01.png", type: "wikipedia" },
      { label: "Wikidata: Knut Spildrejorde",     url: "https://www.wikidata.org/wiki/Q120869043", type: "wikipedia" },
    ],
    news: [
      {
        title: "Camp Knut is making athletes out of nerds",
        url: "https://www.jaxon.gg/camp-knut-is-making-athletes-out-of-nerds/",
        source: "Jaxon.gg",
        date: "2022",
        summary: "Jaxon.gg beskriver Camp Knut som et brudd med stigmaet om at streaming og fitness ikke hører sammen, og hvordan Knut bygger en ny kategori innhold på Twitch.",
        ogImage: "/lovable-uploads/news/knut-6.webp",
        tone: "positive",
      },
      {
        title: "Knut Spildrejorde - Wikidata",
        url: "https://www.wikidata.org/wiki/Q120869043",
        source: "Wikidata",
        date: "ukjent",
        summary: "Wikidata-oppføring for Knut Spildrejorde med strukturerte data om fødselsdato, nasjonalitet og Twitch-karriere.",
        ogImage: "/lovable-uploads/news/knut-7.png",
        tone: "neutral",
      },
      {
        title: "Camp Knut: The Biggest Fitness Event in Twitch History",
        url: "https://streamscharts.com/news/knutcamp-fitness-event-joined-some-biggest-streamers-twitch",
        source: "Streams Charts",
        date: "2022",
        summary: "Streams Charts dokumenterer hvordan Knuts 30-dagers fitness-camp ble en av Twitch sin største fitness-event noensinne, med 7 millioner timer sett, 97 000 peak viewers og 13 000 i snitt.",
        ogImage: null,
        tone: "positive",
      },
      {
        title: "Camp Knut Fitness Camp: What is it, how to watch, and all participating streamers",
        url: "https://dotesports.com/streaming/news/camp-knut-fitness-camp-what-is-it-how-to-watch-and-all-participating-streamers",
        source: "Dot Esports",
        date: "2022",
        summary: "Dot Esports forklarer konseptet Camp Knut: en 30-dagers treningsleir der den norske bodybuilderen Knut trener Mizkif, Tectone, Esfand og flere store streamere fram mot en bodybuilding-konkurranse.",
        ogImage: null,
        tone: "positive",
      },
      {
        title: "Mizkif and Knut buy a gym to get their Twitch viewers fit",
        url: "https://www.dexerto.com/entertainment/mizkif-and-knut-buy-a-gym-to-get-their-twitch-viewers-fit-2464443/",
        source: "Dexerto",
        date: "2024-01",
        summary: "Dexerto skriver om hvordan Knut og Mizkif kjøpte Iron Forge Gym i Austin, Texas - en streamer-vennlig treningsfasilitet med MMA-rom, smoothiebar og massasje.",
        ogImage: null,
        tone: "positive",
      },
      {
        title: "Mizkif and Knut officially reveal their gym in Austin, Texas",
        url: "https://www.sportskeeda.com/esports/news-we-decided-go-name-iron-forge-gym-mizkif-knut-officially-reveal-gym-austin-texas",
        source: "Sportskeeda",
        date: "2024-01",
        summary: "Sportskeeda dekker den offisielle lanseringen av Iron Forge Gym 7. januar 2024, der Knut og Mizkif annonserte navnet og konseptet for treningssenteret de eier sammen.",
        ogImage: null,
        tone: "positive",
      },
    ],
  },
  {
    handle: "detoo",
    name: "detoo",
    realName: "Jørgen Jenssen",
    meta: "Twitch · YouTube · variert",
    blurb:
      "En av de mest sette norskspråklige streamerne. Hopper mellom Fortnite, Minecraft, Rust og Just Chatting, og holder et høyt tempo med mange timer live.",
    bio:
      "Jørgen Jenssen, kjent som detoo, er en av Norges mest sette norskspråklige Twitch-streamere. Han er Twitch Partner med en kanal som ble opprettet i mai 2016, basert i Lillestrøm og kjent for et høyt streaming-tempo - statistikk-trackere viste rundt 447 streamede timer i et 30-dagers vindu. Kanalen er bredspektret: roterer mellom Fortnite, Minecraft, Rust, CS, VALORANT og Just Chatting/IRL. Han har egen offisiell nettside på detoo.no og en YouTube-kanal med samme navn.",
    highlights: [
      "Twitch Partner siden 16. mai 2016",
      "Rangert som #1 norskspråklig kanal på Streams Charts/Statista i flere uker (rangeringen varierer)",
      "Rundt 70 000+ Twitch-følgere (tall fra trackere - skal verifiseres ved publisering)",
      "Egen nettside detoo.no",
    ],
    image: "/lovable-uploads/creators/detoo.jpg",
    attribution: "detoo.no",
    attributionUrl: "https://detoo.no/",
    language: "no",
    socials: [
      { label: "Twitch",   url: "https://www.twitch.tv/detoo" },
      { label: "YouTube",  url: "https://www.youtube.com/@detoo" },
      { label: "Nettside", url: "https://detoo.no/" },
    ],
    references: [
      { label: "detoo.no (offisiell side)",   url: "https://detoo.no/",                       type: "official-site" },
      { label: "TwitchTracker: detoo",         url: "https://twitchtracker.com/detoo",        type: "tracker" },
      { label: "Streams Charts: detoo",        url: "https://streamscharts.com/channels/detoo", type: "tracker" },
    ],
    news: [
      {
        title: "Jørgen (20) har jobben mange drømmer om: – Det begynner å bli en ganske grei årsinntekt",
        url: "https://www.rb.no/jorgen-20-har-jobben-mange-drommer-om-det-begynner-a-bli-en-ganske-grei-arsinntekt/f/5-43-1899648",
        source: "Romerikes Blad",
        date: "2022-11",
        summary: "Lokalavisportrett av Jørgen Jenssen (20) fra Skedsmokorset som lever av å streame på Twitch under navnet Detoo, og som omtaler streamingen som drømmejobb med en grei årsinntekt.",
        ogImage: "/lovable-uploads/news/detoo-0.jpg",
        tone: "positive",
      },
      {
        title: "Jørgen (22) dro inn over 100.000 kroner på 30 dager: – Holder på 24 timer i døgnet",
        url: "https://www.rb.no/jorgen-22-dro-inn-over-100-000-kroner-pa-30-dager-holder-pa-24-timer-i-dognet/s/5-43-2239249",
        source: "Romerikes Blad",
        date: "2024-04",
        summary: "Oppfølgingsportrett av Jørgen Jenssen (Detoo) fra Lillestrøm som etter en intens streaming-periode drar inn over 100 000 kroner på 30 dager og er en av Norges mest sette Twitch-streamere.",
        ogImage: "/lovable-uploads/news/detoo-1.jpg",
        tone: "positive",
      },
      {
        title: "detoo – Streamer Overview & Stats",
        url: "https://twitchtracker.com/detoo",
        source: "TwitchTracker",
        date: "2026",
        summary: "Offentlig statistikkprofil som viser Detoo som #1 mest sette norske Twitch-kanal og #1 i Just Chatting på norsk, med rundt 438 snittseere og topper rundt 1 500.",
        ogImage: "/lovable-uploads/news/detoo-4.png",
        tone: "neutral",
      },
      {
        title: "Norway: most viewed Twitch streamers 2025",
        url: "https://www.statista.com/statistics/872185/most-popular-twitch-streamers-in-norway-by-weekly-viewership-hours/",
        source: "Statista",
        date: "2025-04",
        summary: "Statista rangerer Detoo som den mest sette norskspråklige Twitch-streameren i april 2025, med over 70 000 seetimer de siste 30 dagene, foran Danniz og Emzia.",
        ogImage: null,
        tone: "positive",
      },
      {
        title: "Detoo om streaming, subathons og lønn – Podden",
        url: "https://open.spotify.com/episode/7lsmEMiYvd3BeMN5n3u3ov",
        source: "Podden (Spotify)",
        date: "2026-03",
        summary: "Podcastepisode der Detoo (Jørgen Jenssen) intervjues om hverdagen som fulltidsstreamer, lønn, subathons og hvordan han har bygget Norges største Twitch-kanal.",
        ogImage: null,
        tone: "neutral",
      },
      {
        title: "detoo – Twitch Stats, Analytics and Channel Overview",
        url: "https://streamscharts.com/channels/detoo",
        source: "Streams Charts",
        date: "2026",
        summary: "Analyseprofil som dokumenterer Detoos status som Twitch Partner, kanalstart i mai 2016 og topplassering blant norske kanaler målt i seetimer.",
        ogImage: null,
        tone: "neutral",
      },
    ],
    youtubeChannelHandle: "detoo",
    youtubeVideos: [
      { id: "GyW60lORqQc", title: "GOONATHON 2026", published: "2026-05-26T15:00:11+00:00" },
      { id: "8JDp8HOfRBQ", title: "Goonathon Highlight #1", published: "2025-05-01T17:00:15+00:00" },
      { id: "rRxJFj9vzls", title: "GOONATHON | 1 APRIL 2025", published: "2025-03-27T21:00:45+00:00" },
      { id: "Gsf4UMR6nuM", title: "Tidenes Subathon - 2024", published: "2024-05-23T21:00:11+00:00" },
      { id: "Tq4ROSW0fuw", title: "Subathon highlights #1", published: "2023-08-12T19:13:05+00:00" },
      { id: "uAvJdbyBSY0", title: "SUBATHON 1 MARS | STREAM HIGHLIGHTS", published: "2023-02-28T09:07:10+00:00" },
    ],
  },
  {
    handle: "emzia",
    name: "Emzia",
    realName: "Emilie Helgesen",
    meta: "Twitch · skytespill & variert",
    blurb:
      "En av Norges mest etablerte streamere og en tydelig stemme for et trygt streamingmiljø. Tidligere Twitch-ambassadør, og et kjent fjes også utenfor plattformen.",
    bio:
      "Emilie Helgesen (Emzia) er en av Norges lengst-etablerte streamere - kanalen ble opprettet i april 2015, og hun gikk fulltid i 2018. Hun streamer hovedsakelig skytespill (Call of Duty, battle royales) i tillegg til adventure, horror, MMO og single-player-titler, kjent for et rolig, inkluderende fellesskap. Hun er Twitch-ambassadør (knyttet til TwitchCon EU 2019), har co-hostet ESL sitt «World of Esports»-program på Viasat Sport (2017), og har deltatt i norske TV-produksjoner som «Forræder» og «Fangene på Fortet». Streamer i hovedsak på engelsk til et internasjonalt publikum.",
    highlights: [
      "Twitch-kanal opprettet april 2015; fulltidsstreamer fra 2018",
      "Twitch-ambassadør tilknyttet TwitchCon EU 2019",
      "Co-host av ESL «World of Esports» (Viasat Sport, 2017 - 17 episoder)",
      "TV-deltakelser: «Forræder» og «Fangene på Fortet»",
      "Statista (april 2025): #2 mest sett blant norskspråklige Twitch-streamere på ukentlig viewership-timer",
    ],
    image: "/lovable-uploads/creators/emzia.png",
    attribution: "NOT Management",
    attributionUrl: "https://notmanagement.no/talent/emzia/",
    language: "en",
    socials: [
      { label: "Twitch",    url: "https://www.twitch.tv/emzia" },
      { label: "Instagram", url: "https://www.instagram.com/emziatv" },
      { label: "TikTok",    url: "https://www.tiktok.com/@emziatv" },
      { label: "YouTube",   url: "https://www.youtube.com/@emziatv" },
    ],
    references: [
      { label: "NOT Management: Emzia",        url: "https://notmanagement.no/talent/emzia/", type: "agency" },
      { label: "emzia.tv (offisiell side)",    url: "https://emzia.tv/",                      type: "official-site" },
    ],
    news: [
      {
        title: "Emilie er Norges uoffisielle dronning av Twitch",
        url: "https://www.vg.no/annonsorinnhold/smart/komplett/424-jenter-som-gamer-emilie-er-norges-uoffisielle-dronning-av-twitch",
        source: "VG Partnerstudio",
        date: "ukjent",
        summary: "VG-portrett som kaller Emzia 'Norges uoffisielle dronning av Twitch' og loefter henne frem som en av landets stoerste streamere og forbilde for jenter i gaming.",
        ogImage: "/lovable-uploads/news/emzia-0.jpg",
        tone: "positive",
      },
      {
        title: "Emzias beste raad: Slik lykkes du paa Twitch",
        url: "https://www.vg.no/annonsorinnhold/smart/komplett/445-emzias-beste-rad-slik-kan-du-lykkes-pa-twitch",
        source: "VG Partnerstudio",
        date: "2017-11",
        summary: "VG-artikkel hvor Emzia deler sine beste tips til nye streamere om utstyr, plan og fellesskap paa Twitch.",
        ogImage: "/lovable-uploads/news/emzia-2.jpg",
        tone: "positive",
      },
      {
        title: "Premiere paa Viaplay 2. desember: Fangene paa fortet er tilbake med 48 kjendiser som gir alt",
        url: "https://presse.viaplaygroup.no/post/premiere-pa-viaplay-2-desember-fangene-pa-fortet-er-tilbake-med-",
        source: "Viaplay Group (pressemelding)",
        date: "2022-12",
        summary: "Viaplays offisielle pressemelding om Fangene paa fortet-relanseringen, der Emzia var blant de 48 kjendisene som konkurrerte.",
        ogImage: "/lovable-uploads/news/emzia-5.jpg",
        tone: "positive",
      },
      {
        title: "Emilie lever av streaming: Faar donasjoner av fans som ser henne spille dataspill",
        url: "https://www.vg.no/sport/i/G178zl/emilie-lever-av-streaming-faar-donasjoner-av-fans-som-ser-henne-spille-dataspill",
        source: "VG Sport",
        date: "ukjent",
        summary: "VG Sport-intervju der Emilie 'Emzia' Helgesen forteller hvordan hun lever av Twitch-streaming og bygger lojalt fellesskap rundt kanalen sin.",
        ogImage: null,
        tone: "positive",
      },
      {
        title: "Her er spillerne i den nye sesongen av Forraeder",
        url: "https://kommunikasjon.ntb.no/pressemelding/her-er-spillerne-i-den-nye-sesongen-av-forraeder?publisherId=13318709&releaseId=17956230",
        source: "TV 2 / NTB Kommunikasjon",
        date: "ukjent",
        summary: "Offisiell TV 2-pressemelding som presenterer Emilie 'Emzia' Helgesen som deltaker i sesong 2 av Forraeder.",
        ogImage: null,
        tone: "neutral",
      },
      {
        title: "Forraeder sesong 2 - innspilling paa Kongsvinger Festning",
        url: "https://festningshotellene.no/festningen-hotel-resort/2023/02/15/forraeder-sesong-2/",
        source: "Festningshotellene",
        date: "2023-02",
        summary: "Omtale av innspillingen av Forraeder sesong 2 paa Kongsvinger Festning, der Emzia var en av de 16 deltakerne som naadde finalen som par.",
        ogImage: null,
        tone: "neutral",
      },
    ],
  },
  {
    handle: "thomaspaste",
    name: "thomasPASTE",
    meta: "Twitch · variert gaming",
    blurb:
      "Tidligere radioprofil som ble fulltidsstreamer. Pratsom, personlig stil og en av de mer langvarige norske kanalene.",
    bio:
      "thomasPASTE er en norsk Twitch-streamer hvis kanal ble opprettet 19. juni 2011, og som derfor er en av de mer langvarige norske kanalene. Før han gikk fulltid på streaming, tilbrakte han rundt ti år som programleder på NRJ (og P7 Klem) - en medie-bakgrunn som preger den pratsomme, personlige stilen hans live. Han streamer i Norsk og er Twitch Partner. Kanalen kjører bredspektret variert gaming på tvers av et stort utvalg titler (TwitchTracker krediterer ham med tusenvis av sendetimer over hundrevis av spill).",
    highlights: [
      "Twitch-kanal opprettet 19. juni 2011 - en av de eldste aktive norske kanalene",
      "Rundt 10 år som programleder på NRJ (og P7 Klem) før fulltid streaming",
      "Rundt 50 000 Twitch-følgere (snapshot)",
      "Rangerer rundt #10 blant norske Twitch-kanaler ifølge TwitchTracker (varierer over tid)",
    ],
    image: "/lovable-uploads/creators/thomaspaste.png",
    attribution: "Twitch / @thomaspaste",
    attributionUrl: "https://www.twitch.tv/thomaspaste",
    language: "no",
    socials: [
      { label: "Twitch",  url: "https://www.twitch.tv/thomaspaste" },
      { label: "YouTube", url: "https://www.youtube.com/@thomasPASTE" },
      { label: "X",       url: "https://x.com/thomaspaste" },
    ],
    references: [
      { label: "TwitchTracker: thomasPASTE",   url: "https://twitchtracker.com/thomaspaste",  type: "tracker" },
      { label: "Twitch (offisiell kanal)",     url: "https://www.twitch.tv/thomaspaste",      type: "platform" },
    ],
    news: [
      {
        title: "Seks eksperttips: Slik kan du bli god i Fortnite",
        url: "https://www.vg.no/annonsorinnhold/smart/komplett/528-seks-eksperttips-slik-kan-du-bli-god-i-fortnite",
        source: "VG Partnerstudio (Komplett)",
        date: "2018-04",
        summary: "VG Partnerstudio-sak i samarbeid med Komplett der Thomas Paste, beskrevet som Norges største Fortnite-streamer på Twitch, deler eksperttips om sensitivitet, keybindings og bygging. Saken bekrefter at han kombinerte radiojobb på NRJ med streaming på faste kveldsslots.",
        ogImage: "/lovable-uploads/news/thomaspaste-1.jpg",
        tone: "positive",
      },
      {
        title: "Har du en streamer i magen? Slik kommer du i gang med Twitch",
        url: "https://www.vg.no/annonsorinnhold/smart/komplett/550-slik-kommer-du-i-gang-med-streaming-pa-twitch",
        source: "VG Partnerstudio (Komplett)",
        date: "2018-06",
        summary: "VG Partnerstudio-sak om hvordan komme i gang som Twitch-streamer, med Thomas Paste vist i bildemateriale fra Komplett-samarbeidet som referansestreamer. Bekrefter hans posisjon som forbilde for norske aspirerende streamere.",
        ogImage: "/lovable-uploads/news/thomaspaste-3.jpg",
        tone: "neutral",
      },
      {
        title: "#21: Thomas Paste – Nerdelandslaget",
        url: "https://shows.acast.com/nerdelandslaget/episodes/21-thomas-paste",
        source: "Nerdelandslaget (Acast)",
        date: "2019",
        summary: "Lang podkastepisode der Thomas Paste forteller om karrieren som NRJ-programleder gjennom ti år og overgangen til å satse fulltid som Twitch-streamer. Sentral kilde for hans bakgrunn i radio og overgangen til content creation.",
        ogImage: "/lovable-uploads/news/thomaspaste-4.jpg",
        tone: "positive",
      },
      {
        title: "Thomas jobber beinhardt",
        url: "https://www.p4.no/thomas-jobber-beinhardt/artikkel/579974/",
        source: "P4 / Lyden av Norge",
        date: "2014-08",
        summary: "Kort sak fra P4 / Lyden av Norge som omtaler Thomas Paste som formiddags-DJ og viser studiohverdagen bak kulissene. Dokumenterer hans rolle som etablert radioprofil i norsk kommersiell radio før Twitch-karrieren.",
        ogImage: "/lovable-uploads/news/thomaspaste-5.jpg",
        tone: "neutral",
      },
      {
        title: "Forundret over Twitch-tall: – Helt «insane»",
        url: "https://www.tek.no/nyheter/nyhet/i/wenwRd/forundret-over-twitch-tall-helt-insane",
        source: "Tek.no",
        date: "2021-03",
        summary: "Tek.no intervjuer Thomas Paste, omtalt som Norges største norskspråklige Twitch-streamer ifølge Twitchtracker, om den enorme veksten i Twitch-seertall under pandemien. Paste hadde sendt over 130 timer den siste måneden og forklarte at dagtidsstreaming var blitt populært fordi folk hadde streamingen som bakgrunn mens de jobbet hjemmefra.",
        ogImage: null,
        tone: "positive",
      },
      {
        title: "Seks eksperttips: Slik kan du bli god i Fortnite",
        url: "https://www.komplett.no/article/61009/seks-eksperttips-slik-kan-du-bli-god-i-fortnite",
        source: "Komplett.no",
        date: "2018-04",
        summary: "Komplett.no-versjonen av eksperttipsene fra Norges største Fortnite-streamer, som befester samarbeidet mellom Thomas Paste og elektronikkjeden. Paste fremheves som en av Norges beste Fortnite-spillere på den uoffisielle Fortnite Tracker-rankingen.",
        ogImage: null,
        tone: "positive",
      },
    ],
    youtubeChannelHandle: "thomasPASTE",
    youtubeVideos: [
      { id: "H2wwcgLgqtA", title: "(NORSK) 007 First Light Early Access DAG 1 🔥 Uncharted møter Hitman?", published: "2026-05-26T21:32:52+00:00" },
      { id: "jfvhABZi9FE", title: "(NORSK) Forza Horizion 6 LAUNCH - Dag 1", published: "2026-05-21T17:48:03+00:00" },
      { id: "cuiJgmRawpE", title: "(NORSK) Forza Horizion 6 LAUNCH - Dag 1", published: "2026-05-19T14:20:58+00:00" },
      { id: "Smk-wL_2Izg", title: "thomasPASTE // BARE Mikrofonlyd stream 2", published: "2025-11-21T15:19:17+00:00" },
      { id: "h7AFdmQ3LI0", title: "thomasPASTE // BARE Mikrofonlyd stream 2", published: "2025-11-20T16:14:41+00:00" },
      { id: "Lvp0E6f1qVo", title: "thomasPASTE // BARE Mikrofonlyd stream 2", published: "2025-11-19T13:16:23+00:00" },
    ],
  },
  {
    handle: "klokkismann",
    name: "Klokkismann",
    realName: "Aslak Maurstad",
    meta: "Twitch · Minecraft, sjakk & prat",
    blurb:
      "Skuespiller og stemmeskuespiller som også streamer. Vant «Forræder» i 2023, og veksler mellom Minecraft, sjakk og Just Chatting.",
    bio:
      "Aslak Maurstad (f. 1992) er en norsk skuespiller, stemmeskuespiller, manusforfatter og TV-personlighet. Han startet å streame på Twitch som «Klokkismann» i 2021 og veksler på kanalen mellom Minecraft, World of Warcraft Classic Hardcore, sjakk og Just Chatting/typing (Typeracer). I 2023 vant han TV 2-reality-programmet «Forræder» og kom på 2. plass i «Skal vi danse» (sesong 19). I tillegg er han en prolifik stemmeskuespiller med roller i en lang rekke animasjonsproduksjoner, inkludert «Arcane». Han skal i 2026 lede TV 2-storsatsingen «Hotellet».",
    highlights: [
      "Vant «Forræder» 2023 (TV 2)",
      "2. plass i «Skal vi danse» sesong 19 (2023)",
      "Stemmeskuespiller i blant annet «Arcane»",
      "Skal lede TV 2-storsatsingen «Hotellet» (annonsert via NTB-pressemelding)",
      "Twitch-kanal startet 2021; primær Twitch-kategori har tidvis vært Minecraft",
    ],
    image: "/lovable-uploads/creators/klokkismann.jpg",
    attribution: "Foto: Jan-Petter Dahl / TV 2 (NTB pressemelding)",
    attributionUrl:
      "https://kommunikasjon.ntb.no/pressemelding/18478817/aslak-maurstad-leder-ny-storsatsing-pa-tv-2",
    language: "no",
    socials: [
      { label: "Twitch",    url: "https://www.twitch.tv/klokkismann" },
      { label: "Instagram", url: "https://www.instagram.com/klokkismann" },
      { label: "YouTube",   url: "https://www.youtube.com/@klokkismann" },
    ],
    references: [
      { label: "NTB pressemelding: «Hotellet»", url: "https://kommunikasjon.ntb.no/pressemelding/18478817/aslak-maurstad-leder-ny-storsatsing-pa-tv-2", type: "press" },
      { label: "Wikipedia (NO): Aslak Maurstad", url: "https://no.wikipedia.org/wiki/Aslak_Maurstad", type: "wikipedia" },
      { label: "Wikidata: Aslak Maurstad",       url: "https://www.wikidata.org/wiki/Q15675508",      type: "wikipedia" },
    ],
    news: [
      {
        title: "Forræder-vinner Aslak Maurstad tar styringen i nytt TV2-program",
        url: "https://popidol.no/forraeder-vinner-aslak-maurstad-tar-styringen-i-nytt-tv2-program/",
        source: "Popidol",
        date: "2025",
        summary: "Popidol omtaler at Maurstad, kjent som Twitch-streameren Klokkismann og «Forræder»-vinner, går fra deltaker til programleder med «Hotellet» på TV 2.",
        ogImage: "/lovable-uploads/news/klokkismann-3.png",
        tone: "positive",
      },
      {
        title: "Aslak Maurstad debuterer som programleder: – Dette blir så gøy!",
        url: "https://www.filmweb.no/streamingguide/artikkel/aslak-maurstad-leder-ny-storsatsing-pa-tv-2",
        source: "Filmweb",
        date: "2025",
        summary: "Filmweb skriver om Maurstads programlederdebut på «Hotellet» og oppsummerer karrieren: «Forræder»-seier, andreplass i «Skal vi danse», skuespiller, gamer og forfatter.",
        ogImage: "/lovable-uploads/news/klokkismann-4.jpg",
        tone: "positive",
      },
      {
        title: "Aslak Maurstad | Speaker | Nordic Media Days",
        url: "https://nordiskemediedager.no/en/speakers/aslak-maurstad",
        source: "Nordiske Mediedager",
        date: "2026",
        summary: "Offisiell talerprofil hos Nordiske Mediedager (Bergen, 6.–8. mai 2026), der Maurstad er invitert som ekspert på streaming, gaming og kommende generasjoners mediekonsum.",
        ogImage: "/lovable-uploads/news/klokkismann-7.png",
        tone: "positive",
      },
      {
        title: "Dette er vinneren av «Forræder»",
        url: "https://www.vg.no/rampelys/i/O80e9l/dette-er-vinneren-av-forraeder",
        source: "VG",
        date: "2023",
        summary: "VG melder at Aslak Maurstad (Klokkismann) vant TV 2 Plays «Forræder» sesong 2 og stakk av med en premiepott på 132 000 kroner etter å ha lurt de lojale deltakerne som rekruttert forræder.",
        ogImage: null,
        tone: "positive",
      },
      {
        title: "Aslak Maurstad blir programleder for TV-programmet «Hotellet» på TV2",
        url: "https://www.vg.no/rampelys/i/jQJ5JA/aslak-maurstad-blir-programleder-for-tv-programmet-hotellet-paa-tv2",
        source: "VG",
        date: "2025",
        summary: "VG melder at Aslak Maurstad får sin første programlederjobb og skal lede TV 2s nye storsatsing «Hotellet», et strategisk og sosialt spill med 11 kjendispar.",
        ogImage: null,
        tone: "positive",
      },
      {
        title: "Aslak Maurstad leder ny storsatsing på TV 2",
        url: "https://kommunikasjon.ntb.no/pressemelding/18478817/aslak-maurstad-leder-ny-storsatsing-pa-tv-2?publisherId=13318709&lang=no",
        source: "TV 2 / NTB Kommunikasjon",
        date: "2025",
        summary: "Offisiell pressemelding fra TV 2 om at «Forræder»-vinner og Twitch-streamer Aslak Maurstad debuterer som programleder for den nye realityserien «Hotellet», produsert av Nordisk Banijay.",
        ogImage: null,
        tone: "positive",
      },
    ],
    youtubeChannelHandle: "klokkismann",
    youtubeVideos: [
      { id: "-rpApW2_nmA", title: "De Finner Meg Aldri!", published: "2026-06-28T14:00:06+00:00" },
      { id: "1dMXtZ62FeE", title: "Er Dette Årets Spill?!", published: "2026-06-26T07:57:23+00:00" },
      { id: "iPVRx-COHA4", title: "Dette spillet er så fantastisk gøy!", published: "2026-06-24T14:00:35+00:00" },
      { id: "qqedSw6XM4Q", title: "Jeg Har Blitt En Mester Av Kamuflasje", published: "2026-06-21T14:00:14+00:00" },
      { id: "KAOvSb2t58I", title: "Meccha Chameleon Gjorde Meg Til Picasso!", published: "2026-06-14T14:01:07+00:00" },
      { id: "bmp3OPi-Kp8", title: "Hvis Jeg Slutter Å Skrive Blir Jeg SKUTT", published: "2026-06-07T14:00:37+00:00" },
    ],
  },
  {
    handle: "dennisvareide",
    name: "Dennis Vareide",
    realName: "Dennis Mikal Stabell Vareide",
    meta: "YouTube · Twitch · Minecraft",
    blurb:
      "En av Norges OG-skapere. Halvparten av «Prebz og Dennis», med en lang fartstid i norsk YouTube og TV i tillegg til streaming.",
    bio:
      "Dennis Vareide er en av Norges pioner-YouTubere. Han laget en hjemmelaget Minecraft-trailer i 2011 som Mojang adopterte som offisiell trailer for spillet, noe som ga ham tidlig internasjonal eksponering. Han er halvparten av duoen «Prebz og Dennis» (med Preben Fjell) - YouTube-kanalen PrebzOgDennis hadde over 250 000 abonnenter og 220 millioner visninger per mai 2022. Han har også krysset over i mainstream norsk media: jobbet som vaktsjef på NRK og teknologireporter på TV 2, co-hostet NRKs 17. mai-sending, og deltatt i en rekke norske reality-program som «Skal vi danse» (2021) og «Farmen kjendis». Innholdet er primært norsk, men han har også internasjonalt rettet materiale.",
    highlights: [
      "Hjemmelaget Minecraft-trailer (2011) ble offisiell Mojang-trailer",
      "Halvparten av duoen «Prebz og Dennis» (med Preben Fjell)",
      "PrebzOgDennis YouTube: 250 000+ abonnenter, 220M+ visninger (mai 2022)",
      "Tidligere NRK vaktsjef + TV 2 teknologireporter; co-host NRK 17. mai",
      "Reality-deltakelser: «Skal vi danse» sesong 17 (2021), «Farmen kjendis»",
      "Profilbilde på Wikimedia Commons (CC BY-SA 2.0)",
    ],
    image: "/lovable-uploads/creators/dennisvareide.jpg",
    attribution: "Thor Brødreskift, Wikimedia Commons (CC BY-SA 2.0)",
    attributionUrl:
      "https://commons.wikimedia.org/wiki/File:Dennis_Vareide_-_YouTube-talentene-_de_nye_mediestjernene_-_NMD_2015_(17236435890)_(cropped).jpg",
    language: "mixed",
    socials: [
      { label: "YouTube", url: "https://www.youtube.com/@PrebzOgDennis" },
      { label: "Twitch",  url: "https://www.twitch.tv/dennisvareide" },
    ],
    references: [
      { label: "Wikipedia (NO): Dennis Vareide", url: "https://no.wikipedia.org/wiki/Dennis_Vareide", type: "wikipedia" },
      { label: "Wikimedia Commons (profilbilde)", url: "https://commons.wikimedia.org/wiki/File:Dennis_Vareide_-_YouTube-talentene-_de_nye_mediestjernene_-_NMD_2015_(17236435890)_(cropped).jpg", type: "wikipedia" },
    ],
    news: [
      {
        title: "Dennis Vareide – Wikipedia",
        url: "https://no.wikipedia.org/wiki/Dennis_Vareide",
        source: "Wikipedia",
        date: "ukjent",
        summary: "Biografisk oppslagsside om Dennis Mikal Stabell Vareide (f. 1990), norsk YouTuber, programleder og realitydeltaker kjent fra «Prebz og Dennis», NRK og TV 2.",
        ogImage: "/lovable-uploads/news/dennisvareide-0.jpg",
        tone: "neutral",
      },
      {
        title: "Prebz og Dennis er tilbake",
        url: "https://www.nrk.no/vestfoldogtelemark/prebz-og-dennis-er-tilbake-1.17369331",
        source: "NRK Vestfold og Telemark",
        date: "2025",
        summary: "NRK omtaler at duoen Prebz og Dennis relanserer YouTube-kanalen sin med podcast og gaming etter flere års pause.",
        ogImage: "/lovable-uploads/news/dennisvareide-2.jpg",
        tone: "positive",
      },
      {
        title: "YouTube-stjernen Dennis Vareide blir reporter hos TV 2 hjelper deg: – Han har en unik bakgrunn og erfaring",
        url: "https://www.m24.no/dennis-vareide-erik-molland-folk/youtube-stjernen-dennis-vareide-blir-reporter-hos-tv-2-hjelper-deg--han-har-en-unik-bakgrunn-og-erfaring/227395",
        source: "Medier24",
        date: "2019",
        summary: "Medier24 melder at Vareide ansettes som ny teknologireporter i TV 2 hjelper deg, der han skal teste forbrukerteknologi og dingser.",
        ogImage: "/lovable-uploads/news/dennisvareide-4.jpg",
        tone: "positive",
      },
      {
        title: "Kongen av gutterommet – Dennis Vareide",
        url: "https://aschehoug.no/kongen-av-gutterommet-2",
        source: "Aschehoug",
        date: "2018",
        summary: "Forlagsside for Vareides selvbiografi «Kongen av gutterommet» som forteller historien om hvordan han ble en av Norges største YouTube-stjerner.",
        ogImage: "/lovable-uploads/news/dennisvareide-6.jpg",
        tone: "positive",
      },
      {
        title: "YouTube-stjerne inntar Boklista",
        url: "https://bok365.no/artikkel/youtube-stjerne-inntar-boklista/",
        source: "BOK365",
        date: "2018",
        summary: "Bransjenettstedet melder at Dennis Vareides bok «Kongen av gutterommet» gjør suksess på den norske bestselgerlisten.",
        ogImage: "/lovable-uploads/news/dennisvareide-7.jpg",
        tone: "positive",
      },
      {
        title: "Fra gutterommet til dansegulvet",
        url: "https://www.dagsavisen.no/nyheter/2021/09/23/fra-gutterommet-til-dansegulvet/",
        source: "Dagsavisen",
        date: "2021-09",
        summary: "Portrettartikkel om Vareides vei fra Minecraft-trailere på gutterommet til realitydeltakelse i Skal vi danse.",
        ogImage: "/lovable-uploads/news/dennisvareide-9.jpg",
        tone: "positive",
      },
    ],
    youtubeChannelHandle: "PrebzOgDennis",
    youtubeVideos: [
      { id: "fywGO8nltWg", title: "Lørdagskos med Prebz og Dennis (i 2025)", published: "2025-09-27T06:39:39+00:00" },
      { id: "YWohM_muN-g", title: "Minecraft, men vi er strandet på en øde øy #2", published: "2025-09-20T14:01:01+00:00" },
      { id: "MlU-jmZ14s4", title: "Minecraft, men vi er strandet på en øde øy", published: "2025-09-13T07:00:27+00:00" },
      { id: "ZtsY__EUno0", title: "Prebz Mot Dennis i Risk", published: "2025-09-06T16:03:33+00:00" },
      { id: "3XBxhZdC058", title: "Prebz og Dennis Drar På Fjelltur", published: "2025-08-23T15:30:33+00:00" },
      { id: "qdH381Fosps", title: "Prebz mot Dennis i Geoguessr", published: "2025-05-24T09:43:41+00:00" },
    ],
  },
  {
    handle: "jonieboi",
    name: "Jonieboi",
    realName: "Jonas Johannessen",
    meta: "YouTube · Twitch · reaksjon & humor",
    blurb:
      "Kjent for reaksjons- og komiinnhold med norsk humor. Størst på YouTube, men også aktiv på Twitch.",
    bio:
      "Jonas Johannessen (Jonieboi) er en YouTuber og streamer fra Arendal, mest kjent for komi-/reaksjonsinnhold med en utpreget norsk humor - inkludert reaksjoner på «Norsk Politi» og «Norske Tollere»-videoer, samt mat- og spillsegmenter. Hovedplattformen hans er YouTube, der @JonieBoi har rundt 117-123K abonnenter (varierer per kilde og dato per Social Blade). Han er Twitch Partner med handle «jonieboi» og rundt 24 000+ følgere, omtrent 135 gjennomsnittseere i en nylig 30-dagers periode. Også aktiv på Snapchat (~20K), Instagram (~10K) og TikTok.",
    highlights: [
      "YouTube: ~117-123K abonnenter på @JonieBoi (varierer per kilde)",
      "Twitch Partner, rundt 24 000+ følgere",
      "Kjent for norske reaksjonsvideoer (Norsk Politi, Norske Tollere)",
      "Representert av Spires Agency",
    ],
    image: "/lovable-uploads/creators/jonieboi.png",
    attribution: "Spires Agency",
    attributionUrl: "https://www.spiresagency.com/talent/jonieboi",
    language: "no",
    socials: [
      { label: "YouTube",   url: "https://www.youtube.com/@JonieBoi" },
      { label: "Twitch",    url: "https://www.twitch.tv/jonieboi" },
      { label: "Instagram", url: "https://www.instagram.com/jonieboitv" },
      { label: "TikTok",    url: "https://www.tiktok.com/@jonieboi" },
    ],
    references: [
      { label: "Spires Agency: Jonieboi",      url: "https://www.spiresagency.com/talent/jonieboi", type: "agency" },
    ],
    news: [
      {
        title: "NRK-profil flytter inn i gaminghuset",
        url: "https://www.m24.no/190223-jonas-johannessen-ll35/nrk-profil-flytter-inn-i-gaminghuset/584535",
        source: "Medier24 (M24)",
        date: "2023-02",
        summary: "Bransjenettstedet Medier24 melder at Jonas «Jonieboi» Johannessen (26) fra Arendal flytter inn i NRKs gaminghus LL35 sammen med Aslak Maurstad og Veronica «Msvosch» Langø. Prosjektleder Daria Almo omtaler ham som en sterk innholdsskaper med lang erfaring fra gaming og streaming.",
        ogImage: "/lovable-uploads/news/jonieboi-0.jpg",
        tone: "positive",
      },
      {
        title: "Meet JonieBoi",
        url: "https://www.spiresagency.com/talent/jonieboi",
        source: "Spires Agency",
        date: "ukjent",
        summary: "Talentbyrået Spires Agency presenterer Jonieboi som en av sine signerte skapere og beskriver ham som en høyenergisk norsk innholdsskaper med fokus på gaming, GTA RP, reaksjonsvideoer og uteliv. Profilen fremhever sterk lojal følgerskare i Norge og at han nå utforsker muligheter innen gaming og reality-TV.",
        ogImage: "/lovable-uploads/news/jonieboi-2.jpg",
        tone: "positive",
      },
      {
        title: "JonieBoi — Twitch-kanalprofil",
        url: "https://www.twitch.tv/jonieboi",
        source: "Twitch",
        date: "2026",
        summary: "Offisiell Twitch-kanal for Jonieboi, hvor han streamer GTA RP, Just Chatting og varierte gamingformater på norsk. Kanalen er Twitch Partner og rangert blant de mest fulgte norske kanalene innen Just Chatting.",
        ogImage: "/lovable-uploads/news/jonieboi-4.jpg",
        tone: "neutral",
      },
      {
        title: "Jonieboi — Streamer Overview & Stats",
        url: "https://twitchtracker.com/channels/ranking/norwegian",
        source: "TwitchTracker",
        date: "2026",
        summary: "TwitchTracker lister Jonieboi blant de topprangerte norske Twitch-kanalene, med plassering rundt #175 totalt i Norge og topp 40 innen Just Chatting på norsk Twitch i 2026.",
        ogImage: "/lovable-uploads/news/jonieboi-5.png",
        tone: "neutral",
      },
      {
        title: "Looking for gamers where they are: Norwegian broadcasting from television to Twitch",
        url: "https://journals.sagepub.com/doi/full/10.1177/13548565251326796",
        source: "Convergence / SAGE Journals (Mortensen & Jørgensen)",
        date: "2025",
        summary: "Akademisk artikkel om NRKs Twitch-satsing LL35 navngir Jonas «Jonieboi» Johannesen som én av tre faste profiler i huset under observasjonsperiode 3 i juni 2023, sammen med Maurstad og Msvosch. Artikkelen omtaler ham som en YouTuber hvis personlighet og strømmestil var en sentral del av innholdet.",
        ogImage: null,
        tone: "neutral",
      },
      {
        title: "Se når Leo og JonieBoi (Jonas) fra NRK Bremsespor besøkte oss i sommer",
        url: "https://www.facebook.com/sommarland/posts/se-n%C3%A5r-leo-og-jonieboi-jonas-fra-nrk-bremsespor-bes%C3%B8kte-oss-i-sommer-m%C3%A5let-for-d/10160589762526474/",
        source: "Bø Sommarland (Facebook)",
        date: "ukjent",
        summary: "Bø Sommarland deler video av Leo og Jonieboi fra NRK Bremsespor som besøker fornøyelsesparken og tester attraksjoner. Innlegget bekrefter Jonieboi som offisiell NRK Bremsespor-profil i samarbeid med en av Norges største turistdestinasjoner.",
        ogImage: null,
        tone: "positive",
      },
    ],
    youtubeChannelHandle: "JonieBoi",
    youtubeVideos: [
      { id: "DtZzomvrFkQ", title: "En oppdatering om livet mitt nå.", published: "2026-06-25T13:44:20+00:00" },
      { id: "E1kKyp6LYQw", title: "Dama ville ha DETTE i hagen... så jeg BYGDE DET SELV", published: "2026-06-04T12:00:30+00:00" },
      { id: "8cP_U7JqU5s", title: "Jeg bygde et gjerde uten erfaring…", published: "2026-05-21T12:59:39+00:00" },
      { id: "cUgyxmSGZlE", title: "Jeg brukte 40 000kr på hagen min… uten erfaring", published: "2026-05-13T13:22:11+00:00" },
      { id: "Bs8ZoO3C7hw", title: "Jeg dro tilbake til shelteret mitt… og noe føltes feil", published: "2026-05-10T06:24:56+00:00" },
      { id: "GGruAYqVH4c", title: "Jeg får ikke forlate denne før jeg får fisk…", published: "2026-05-07T12:28:06+00:00" },
    ],
  },
  {
    handle: "danniz",
    name: "DannizTV",
    meta: "Twitch · variert gaming",
    blurb:
      "«Løs humor og high-quality gaming.» En langvarig norsk kanal med en lojal seerskare - en av streamerne Beta Ads selv har jobbet med.",
    bio:
      "DannizTV (Twitch-handle «danniz») er en norskspråklig variert gaming-streamer som har vært aktiv lenge i det norske miljøet - kontoen ble opprettet 24. april 2015. Kanalen presenterer seg selv med «løs humor og high-quality gaming», og streameren tuller med å være «Gaming Sleeve-king». Han er Twitch Partner. Som av juni 2026 rangerer TwitchTracker kanalen rundt #24 blant norske kanaler med omtrent 104 gjennomsnittsseere og en topp på 1 501 samtidige seere; TwitchTracker plasserer kanalen i Top 0.25% på plattformen. Danniz er én av streamerne Beta Ads selv har jobbet med på kampanjer.",
    highlights: [
      "Twitch Partner",
      "Twitch-konto opprettet 24. april 2015",
      "Rundt 104 gjennomsnittsseere, peak 1 501 samtidige (TwitchTracker, juni 2026)",
      "TwitchTracker Top 0.25% på plattformen",
    ],
    image: "/lovable-uploads/creators/danniz.png",
    attribution: "Twitch / @danniz",
    attributionUrl: "https://www.twitch.tv/danniz",
    language: "no",
    socials: [{ label: "Twitch", url: "https://www.twitch.tv/danniz" }],
    references: [
      { label: "TwitchTracker: danniz",        url: "https://twitchtracker.com/danniz",       type: "tracker" },
      { label: "Twitch (offisiell kanal)",     url: "https://www.twitch.tv/danniz",           type: "platform" },
    ],
    news: [
      {
        title: "Twitch Top Streamers, Norwegian",
        url: "https://twitchtracker.com/channels/ranking/norwegian",
        source: "TwitchTracker",
        date: "2026",
        summary: "Danniz er konsekvent i toppsjiktet av norskspråklige Twitch-streamere på TwitchTrackers offisielle rangering.",
        ogImage: "/lovable-uploads/news/danniz-3.png",
        tone: "positive",
      },
      {
        title: "ONLAN 4.0 - Norges Største Digitale LAN",
        url: "https://m.twitch.tv/videos/2096405560",
        source: "Twitch",
        date: "2024",
        summary: "Danniz deltok som streamer under ONLAN 4.0, omtalt som Norges største digitale LAN-arrangement, med UNO og fellesinnhold sammen med andre norske streamere.",
        ogImage: "/lovable-uploads/news/danniz-4.jpg",
        tone: "positive",
      },
      {
        title: "Norway: most viewed Twitch streamers 2025",
        url: "https://www.statista.com/statistics/872185/most-popular-twitch-streamers-in-norway-by-weekly-viewership-hours/",
        source: "Statista",
        date: "2025-04",
        summary: "Statista rangerer Danniz som nest mest sette norskspråklige Twitch-streamer i april 2025, målt etter totale seertimer, bare slått av detoo.",
        ogImage: null,
        tone: "positive",
      },
      {
        title: "Danniz - Twitch Stats, Analytics and Channel Overview",
        url: "https://streamscharts.com/channels/danniz",
        source: "Streams Charts",
        date: "2026",
        summary: "Streams Charts dokumenterer Danniz som en av Norges mest aktive Twitch-kanaler med rekord på 1 501 samtidige seere (29. desember 2024) og over 44 000 følgere.",
        ogImage: null,
        tone: "neutral",
      },
      {
        title: "Danniz - Streams List and Statistics",
        url: "https://twitchtracker.com/danniz/streams",
        source: "TwitchTracker",
        date: "2026",
        summary: "TwitchTracker viser Danniz som Twitch Partner og topp 0,25 % av alle kanaler globalt, rangert som #23 blant norske kanaler med variert gaming og humor-stream.",
        ogImage: null,
        tone: "positive",
      },
      {
        title: "Most Watched Norwegian Streamers",
        url: "https://streamscharts.com/channels?lang=no",
        source: "Streams Charts",
        date: "2026",
        summary: "Streams Charts plasserer Danniz blant de mest sette norske streamerne målt på rullerende 7-dagers seertall.",
        ogImage: null,
        tone: "neutral",
      },
    ],
  },
  {
    handle: "mystixx",
    name: "Mystixx",
    meta: "Twitch · IRL & Minecraft",
    blurb:
      "Fulltidsstreamer fra Kongsberg, kjent for IRL/Just Chatting og Minecraft Hardcore.",
    bio:
      "Mystixx er en norsk Twitch Partner som har streamet siden 2015 (kanalen ble opprettet desember 2013), basert i Kongsberg og med fornavn rapportert som Runar. Han beskriver seg selv i Twitch-bioen som «Fulltime streamer og Minecraft Hardcore champion». Innholdet er primært Just Chatting og IRL i tillegg til variert gaming, med CS2, Fortnite og Call of Duty blant titlene som er strømmet over årene. Han plasseres høyt for norske Just Chatting-kanaler (StreamsCharts har ham som #2 NO Just Chatting; overall Norway-rangering varierer mellom #13 og #26 avhengig av kilde og tidsvindu).",
    highlights: [
      "Twitch Partner siden 2015 (kanal opprettet desember 2013)",
      "Basert i Kongsberg",
      "Selv-beskrevet «Fulltime streamer og Minecraft Hardcore champion»",
      "Rundt 34 000+ Twitch-følgere (snapshot)",
      "Aktiv på YouTube, TikTok, Instagram og X i tillegg til Twitch",
    ],
    image: "/lovable-uploads/creators/mystixx.png",
    attribution: "Twitch / @mystixx",
    attributionUrl: "https://www.twitch.tv/mystixx",
    language: "no",
    socials: [
      { label: "Twitch",    url: "https://www.twitch.tv/mystixx" },
      { label: "YouTube",   url: "https://www.youtube.com/@mystixx" },
      { label: "Instagram", url: "https://www.instagram.com/mystixxtv" },
      { label: "TikTok",    url: "https://www.tiktok.com/@mystixxtwitch" },
      { label: "X",         url: "https://x.com/MystixxTV" },
    ],
    references: [
      { label: "TwitchTracker: mystixx",       url: "https://twitchtracker.com/mystixx",      type: "tracker" },
      { label: "Twitch (offisiell kanal)",     url: "https://www.twitch.tv/mystixx",          type: "platform" },
    ],
    news: [
      {
        title: "Mystixx — Streamer Overview & Stats",
        url: "https://twitchtracker.com/mystixx",
        source: "TwitchTracker",
        date: "ukjent",
        summary: "Statistikkprofil som dokumenterer Mystixx som Twitch Partner med rundt 11 500 topp-aktive abonnenter og plassering blant de mest sette norske Twitch-kanalene.",
        ogImage: "/lovable-uploads/news/mystixx-0.png",
        tone: "neutral",
      },
      {
        title: "About Mystixx",
        url: "https://m.twitch.tv/mystixx/about",
        source: "Twitch",
        date: "ukjent",
        summary: "Offisiell Twitch-bio som beskriver Mystixx som fulltidsstrømmer, Minecraft Hardcore-mester og podkaster fra Norge, aktiv siden 2015.",
        ogImage: "/lovable-uploads/news/mystixx-2.jpg",
        tone: "positive",
      },
      {
        title: "Mystixx — Twitch Stats, Analytics and Channel Overview",
        url: "https://streamscharts.com/channels/mystixx",
        source: "Streams Charts",
        date: "ukjent",
        summary: "Analytics-oversikt som viser Mystixx blant Norges mest viste Twitch-strømmere, med jevn vekst innen Minecraft og IRL-kategorier.",
        ogImage: null,
        tone: "neutral",
      },
      {
        title: "Mystixx — Streamer & Innholdsskaper",
        url: "https://mystixx.no/",
        source: "mystixx.no",
        date: "ukjent",
        summary: "Offisiell hub-side som samler Mystixx sine plattformer (Twitch, YouTube, Instagram, TikTok, Discord), merch-butikk, Spotify-podkast og Vipps-støtte.",
        ogImage: null,
        tone: "positive",
      },
    ],
  },
];

export function getCreatorByHandle(handle: string): CreatorProfile | undefined {
  return CREATORS.find((c) => c.handle === handle.toLowerCase());
}
