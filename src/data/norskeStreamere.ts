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
  },
];

export function getCreatorByHandle(handle: string): CreatorProfile | undefined {
  return CREATORS.find((c) => c.handle === handle.toLowerCase());
}
