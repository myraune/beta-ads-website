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

export interface TwitchStats {
  followers: number;
  partner: boolean;
  createdAt: string | null;
  lastGame: string | null;
}

/** Ytelsestall siste 30 dager fra TwitchTracker (øyeblikksbilde, bakt ved build). */
export interface TrackerStats {
  avgViewers: number;
  peakViewers: number;
  hoursStreamed: number;
}

/** Data fra Beta Ads' egen Streamer Explorer (mer autoritativt enn trackere). */
export interface BetaStats {
  avgViewers: number;
  airTimeHours: number;
  watchTimeHours: number;
  /** Hva publikummet er interessert i - for merkevare-matching. */
  audienceInterests: string[];
  /** Hva streameren selv er interessert i. */
  streamerInterests?: string[];
}

export interface TwitchClip {
  slug: string;
  title: string;
  viewCount: number;
  duration: number;
  createdAt: string;
  game?: string | null;
  thumbnailURL: string;
  url: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  published: string;
}

export interface TikTokVideo {
  id: string;
  url: string;
  title?: string;
  thumbnail?: string | null;
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
  language: "no" | "sv" | "da" | "fi" | "en" | "mixed";
  socials: SocialLink[];
  /** Eksterne kilder leseren kan klikke for å lese mer. */
  references: ReferenceLink[];
  /** Ekte presse- og nyhetsoppslag, hentet inn separat. */
  news?: NewsArticle[];
  /** YouTube-handle for kanalen (uten @), hvis aktiv. */
  youtubeChannelHandle?: string;
  /** De siste videoene fra YouTube RSS, fetchet ved build. */
  youtubeVideos?: YouTubeVideo[];
  /** Live Twitch-statistikk (offentlig GQL), bakt inn ved build. */
  twitchStats?: TwitchStats;
  /** Ytelsestall siste 30 dager (TwitchTracker), bakt inn ved build. */
  trackerStats?: TrackerStats;
  /** Data fra Beta Ads' egen Streamer Explorer (foretrukket kilde). */
  betaStats?: BetaStats;
  /** Mest sette Twitch-klipp (offentlig GQL), bakt inn ved build. */
  twitchClips?: TwitchClip[];
  /** Valgfri banner-override (når topp-klippet er en svak thumbnail). */
  bannerImage?: string;
  /** TikTok-handle (uten @), hvis aktiv. */
  tiktokHandle?: string;
  /** Utvalgte TikTok-videoer (manuelt kuratert / oEmbed). */
  tiktokVideos?: TikTokVideo[];
}

export const CREATORS: CreatorProfile[] = [
  {
    handle: "mrsavage",
    twitchStats: { followers: 4638403, partner: true, createdAt: "2018-02-24T18:41:22.909365Z", lastGame: "Fortnite" },
    trackerStats: { avgViewers: 4437, peakViewers: 16444, hoursStreamed: 65 },
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
    bannerImage: "/lovable-uploads/creators/mrsavage.jpg",
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
    twitchClips: [
      { slug: "GrossShakingThymeKappaRoss-TwlMXb9dsNYLO9u6", title: "Settings 12-12-2023", viewCount: 306366, duration: 50, createdAt: "2023-12-12T21:17:44Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/0f7e7f06-125c-439e-b406-feb424740a0c/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mrsavage/clip/GrossShakingThymeKappaRoss-TwlMXb9dsNYLO9u6" },
      { slug: "PleasantSuccessfulLouseChefFrank-JFfhdGFi1VMmEqwX", title: "Settings 13/09/2023", viewCount: 148203, duration: 25, createdAt: "2023-09-13T20:48:10Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/b9872aec-fae4-47d0-8d36-61cf503dee75/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mrsavage/clip/PleasantSuccessfulLouseChefFrank-JFfhdGFi1VMmEqwX" },
      { slug: "InexpensiveBlitheCiderFeelsBadMan-apgnTb1SX1AroOsM", title: "MrSavage 1v4's mongraal, peterbot, khanada and asianjeff", viewCount: 131794, duration: 33, createdAt: "2023-12-27T22:25:27Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/a7a02742-1cd5-409d-8ce2-d9a5ce4226d3/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mrsavage/clip/InexpensiveBlitheCiderFeelsBadMan-apgnTb1SX1AroOsM" },
      { slug: "BitterSlipperyPlumberCclamChamp-n9yA0vwM5uirjY14", title: "EZ snipe", viewCount: 124713, duration: 4, createdAt: "2024-04-12T17:55:23Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/24486b7e-ea3f-4bd8-9612-29fbacc50417/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mrsavage/clip/BitterSlipperyPlumberCclamChamp-n9yA0vwM5uirjY14" },
      { slug: "SuavePoisedPresidentMoreCowbell-hTF4W_5uSwk-GPaV", title: "I just saved our game...", viewCount: 104214, duration: 29, createdAt: "2024-02-16T18:49:14Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/1ac3fa29-3b5e-4741-98ad-998b7350a943/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mrsavage/clip/SuavePoisedPresidentMoreCowbell-hTF4W_5uSwk-GPaV" },
      { slug: "CrepuscularWrongPlumageAMPEnergyCherry", title: "hes so good", viewCount: 94226, duration: 26, createdAt: "2019-06-29T18:00:01Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/a194138b-7a78-44b6-8767-bfe35ac20099/landscape/thumb/thumb-0000000000-1536x864.jpg", url: "https://www.twitch.tv/mrsavage/clip/CrepuscularWrongPlumageAMPEnergyCherry" },
    ],
    youtubeChannelHandle: "mrsavage",
    youtubeVideos: [
      { id: "uYR_-JochCE", title: "ALMOST 3 WINS IN THE FNCS DIV CUP! ft. Velo", published: "2026-06-28T16:30:17+00:00" },
      { id: "he_oxPm1lPI", title: "Mongraal’s Icon Skin Is INSANE", published: "2026-06-26T20:57:57+00:00" },
      { id: "Lc_xpD3o6Xs", title: "Mongraal got an ICON SKIN!", published: "2026-06-26T19:49:32+00:00" },
      { id: "7d5jHAv3Iiw", title: "OUR GREATEST RUN IN THE FNCS DIV CUP! (Day 1)", published: "2026-06-25T16:30:23+00:00" },
      { id: "bK7EZTIfKCo", title: "12 Kill Win In World Cup Qualifiers", published: "2026-06-24T13:02:29+00:00" },
      { id: "kZD_XCi_QxI", title: "MrSavage Solo Clutch Is Insane", published: "2026-06-23T14:33:04+00:00" },
    ],
  },
  {
    handle: "knut",
    twitchStats: { followers: 419137, partner: true, createdAt: "2013-05-12T22:17:06.690621Z", lastGame: "Just Chatting" },
    betaStats: { avgViewers: 934, airTimeHours: 170.2, watchTimeHours: 158900, audienceInterests: ["Bodybuilding & Fitness", "Supplements & Biohacking", "PC Gaming Hardware", "Healthy Cooking", "Automotive & Supercars"], streamerInterests: ["Food", "Sports", "Technology", "Travel"] },
    trackerStats: { avgViewers: 1082, peakViewers: 15598, hoursStreamed: 179 },
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
    twitchClips: [
      { slug: "RudeTallJaguarTheRinger-8t50LHXd60cN27Aw", title: "Nmplol and Malena have broken up", viewCount: 492034, duration: 21, createdAt: "2024-09-13T21:13:33Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/d83fb3c8-e5c4-457f-8e86-5aa76cc39f84/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/knut/clip/RudeTallJaguarTheRinger-8t50LHXd60cN27Aw" },
      { slug: "AgileModernScallionHotPokket-Q0j0lOs1qNh9wKrH", title: "knut LOl", viewCount: 438552, duration: 26, createdAt: "2022-08-13T22:04:59Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/bc06a81f-00da-4714-bff9-09a20bc047ef/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/knut/clip/AgileModernScallionHotPokket-Q0j0lOs1qNh9wKrH" },
      { slug: "InnocentEnthusiasticGiraffePlanking", title: "Mizkif dies", viewCount: 402532, duration: 4, createdAt: "2019-04-12T23:21:52Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/10ec8c5a-0e7d-4afc-8245-63c68230f2db/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/knut/clip/InnocentEnthusiasticGiraffePlanking" },
      { slug: "EndearingAverageCobraWTRuck-gYZ1i5dgLbZZtSgL", title: "🟥Streamer Circus #komplett #mountaindew 🟥 !server 🟥 💪 !lastvid 🟥 !nordVPN #ad", viewCount: 391407, duration: 28, createdAt: "2022-09-25T16:44:17Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/4d137ca6-6bcf-470b-95ae-4b57bf88a880/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/knut/clip/EndearingAverageCobraWTRuck-gYZ1i5dgLbZZtSgL" },
      { slug: "FamousMushyLorisPrimeMe-weg9oOYlS5m4nV6n", title: "Woman lifts Knut at TwitchCon", viewCount: 366214, duration: 20, createdAt: "2022-07-17T15:54:31Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/767f091a-7bd1-443b-8c0a-541b856fad33/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/knut/clip/FamousMushyLorisPrimeMe-weg9oOYlS5m4nV6n" },
      { slug: "RenownedSpikySkunkChocolateRain", title: "Knut is being honest about Greek", viewCount: 350261, duration: 60, createdAt: "2020-06-01T18:23:11Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/37e3cd80-4074-4f80-a114-ec4150215fe5/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/knut/clip/RenownedSpikySkunkChocolateRain" },
    ],
    youtubeChannelHandle: "KnutSpildrejorde86",
    youtubeVideos: [
      { id: "b18R_fLMuks", title: "Knut x Gym80 @ FIBO", published: "2024-04-25T17:25:09+00:00" },
      { id: "nLxjfzId2js", title: "Knut and Jeanette driving a Dodge Viper SRT10 in Vegas", published: "2019-05-11T11:28:44+00:00" },
      { id: "zFgmH8mEjFY", title: "TexasRaw   Sixteen Tons", published: "2019-05-11T11:28:25+00:00" },
      { id: "Wr_1AouIeu4", title: "Podcast - Wickd, RoosterTV, Barbie_bad_buns and Giselle", published: "2019-05-11T11:28:01+00:00" },
      { id: "Aab0SZF2cMc", title: "Treatment on shoulder.", published: "2018-12-20T06:24:43+00:00" },
      { id: "nXpT4Nch-JE", title: "The 2012 season", published: "2018-12-17T03:24:10+00:00" },
    ],
  },
  {
    handle: "detoo",
    twitchStats: { followers: 85915, partner: true, createdAt: "2016-05-16T19:55:22.092212Z", lastGame: "IRL" },
    betaStats: { avgViewers: 399, airTimeHours: 140.3, watchTimeHours: 56000, audienceInterests: ["Apex Legends Competitive", "Energy Drinks & Supplements", "PC Customization", "Nordic Tech/Apparel Brands", "Weightlifting & Gym Lifestyle"], streamerInterests: ["Music", "Sports", "Technology", "Travel"] },
    trackerStats: { avgViewers: 403, peakViewers: 764, hoursStreamed: 154 },
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
    twitchClips: [
      { slug: "BillowingObeseNuggetsPogChamp-uH9lYCaoy0TnuCIM", title: "bicycle incident", viewCount: 22917, duration: 49, createdAt: "2025-04-15T23:08:33Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/f72db705-7758-42d1-96b4-085fccc385e8/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/detoo/clip/BillowingObeseNuggetsPogChamp-uH9lYCaoy0TnuCIM" },
      { slug: "SleepyDifficultBeefPastaThat-_5zD3cuF9a6IpY4y", title: "OMFG SAPPHIRE", viewCount: 13291, duration: 35, createdAt: "2023-05-12T16:54:20Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/17292a84-994f-40da-bbb7-40facffbe0c6/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/detoo/clip/SleepyDifficultBeefPastaThat-_5zD3cuF9a6IpY4y" },
      { slug: "RespectfulAlivePonySoBayed-ssJUpOPcxip4vtHH", title: "Her", viewCount: 7205, duration: 30, createdAt: "2025-04-17T10:14:03Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/4c911182-a267-432b-ac45-d74249411079/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/detoo/clip/RespectfulAlivePonySoBayed-ssJUpOPcxip4vtHH" },
      { slug: "CautiousAmazingMangetoutThisIsSparta-VYPXMf20K-7Pgbru", title: "Zame W", viewCount: 5225, duration: 26, createdAt: "2023-04-16T15:13:20Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/e6336dd6-b7ca-4edd-bd7d-9132f1ab85dd/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/detoo/clip/CautiousAmazingMangetoutThisIsSparta-VYPXMf20K-7Pgbru" },
      { slug: "ExpensiveOnerousUdonDansGame-kZbW-x1DX9BNB2Pu", title: "Detoo merch", viewCount: 4982, duration: 22, createdAt: "2022-08-31T13:54:06Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/2921a605-9c9d-4f6f-bb05-efc6738d78ec/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/detoo/clip/ExpensiveOnerousUdonDansGame-kZbW-x1DX9BNB2Pu" },
      { slug: "BlitheLuckyCrowArsonNoSexy-LAch7bGL9RY7VyGx", title: "Zame", viewCount: 4823, duration: 10, createdAt: "2022-09-10T00:19:37Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/763dfc9f-7fd7-4d4a-9b2a-495b0f6b7c04/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/detoo/clip/BlitheLuckyCrowArsonNoSexy-LAch7bGL9RY7VyGx" },
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
    twitchStats: { followers: 97618, partner: true, createdAt: "2015-04-10T23:35:13.51328Z", lastGame: "Just Chatting" },
    trackerStats: { avgViewers: 184, peakViewers: 270, hoursStreamed: 111 },
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
    twitchClips: [
      { slug: "VastNurturingSeahorseWow", title: "[ENG/NOR]  This game is not dead yet <3", viewCount: 15353, duration: 26, createdAt: "2018-02-04T22:52:55Z", game: "Z1: Battle Royale", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/d77e7543-9f37-47eb-9140-17d859dc2bbc/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/emzia/clip/VastNurturingSeahorseWow" },
      { slug: "GoodUglyMomFeelsBadMan", title: "[ENG/NOR] Duos with the one and only Marctastic. Sunday chill :)", viewCount: 12850, duration: 26, createdAt: "2018-01-29T00:01:38Z", game: "Z1: Battle Royale", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/209dbb30-f4d5-4f69-89f9-69b6b9b9afaa/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/emzia/clip/GoodUglyMomFeelsBadMan" },
      { slug: "CourteousCredulousTrayFloof", title: "Subscribed", viewCount: 2762, duration: 32, createdAt: "2016-10-21T20:30:18Z", game: null, thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/2de60863-6126-4c0e-aa3f-24a9ea2a3bca/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/emzia/clip/CourteousCredulousTrayFloof" },
      { slug: "UninterestedCleanNeanderthalOSkomodo", title: "Showing off my new clothing HAUL!🌟 Also doing challenges in Fall Guys! !asos !asquad #ad", viewCount: 2250, duration: 33, createdAt: "2020-11-11T16:22:13Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/4cb26fb8-c9ab-4a26-9695-30d299c090ab/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/emzia/clip/UninterestedCleanNeanderthalOSkomodo" },
      { slug: "CulturedTemperedSandwichDuDudu", title: "Showing my FULL HARLEY QUINN halloween costume", viewCount: 2083, duration: 32, createdAt: "2017-06-19T13:50:01Z", game: null, thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/19cef455-39cc-4989-badc-011c151104ad/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/emzia/clip/CulturedTemperedSandwichDuDudu" },
      { slug: "IronicBusyOtterFUNgineer", title: "Karl dont drop the soap monkaS", viewCount: 1946, duration: 11, createdAt: "2020-08-22T13:31:42Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/d771828e-1d18-475c-b754-0627c60af5b5/landscape/thumb/thumb-0000000000-1600x900.jpg", url: "https://www.twitch.tv/emzia/clip/IronicBusyOtterFUNgineer" },
    ],
    youtubeChannelHandle: "Emzia",
    youtubeVideos: [
      { id: "JV6ZaWv_6LM", title: "Birthday stream 2025 | Recap", published: "2025-09-28T22:00:18+00:00" },
      { id: "xvPhX1UG8Nk", title: "Galaxy Tab S11 Ultra✨", published: "2025-09-15T10:52:26+00:00" },
      { id: "QdoCDX53pHM", title: "Feel like a Monster", published: "2025-08-14T17:09:21+00:00" },
      { id: "qYJs9-_gBaE", title: "Best & Funny plays in Warzone! Call of Duty: Mordern Warfare | Highlights", published: "2020-12-13T11:00:49+00:00" },
      { id: "A3OnchD8qvo", title: "Emzia | Hunting ghosts in Phasmophobia | Stream highlights", published: "2020-11-22T13:00:02+00:00" },
      { id: "o1SgFj6Evuo", title: "Emzia | Call of Duty - Black Ops: Cold War BETA | Funny Moments", published: "2020-11-13T11:30:02+00:00" },
    ],
    tiktokHandle: "emziatv",
  },
  {
    handle: "thomaspaste",
    twitchStats: { followers: 51653, partner: true, createdAt: "2011-06-19T13:02:20.994124Z", lastGame: "Arma Reforger" },
    trackerStats: { avgViewers: 162, peakViewers: 340, hoursStreamed: 41 },
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
    twitchClips: [
      { slug: "TemperedStupidHerringNerfRedBlaster", title: "24-TIMER STREAM for å feire 1 år på twitch! (!sendetid)", viewCount: 4519, duration: 32, createdAt: "2016-10-23T00:48:01Z", game: "Outlast", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/cf136516-b3ce-4408-b1c3-a2dd038c63cb/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/thomaspaste/clip/TemperedStupidHerringNerfRedBlaster" },
      { slug: "GiftedWiseYakSpicyBoy", title: "GET", viewCount: 4043, duration: 59, createdAt: "2018-08-25T17:09:34Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/a2b68a6b-849c-41bf-ab35-01d1736d1254/landscape/thumb/thumb-0000000000-1600x900.jpg", url: "https://www.twitch.tv/thomaspaste/clip/GiftedWiseYakSpicyBoy" },
      { slug: "OptimisticBashfulLampUncleNox", title: "PASTE | Kos med ukens navle!", viewCount: 3050, duration: 30, createdAt: "2017-01-18T21:58:00Z", game: "Z1: Battle Royale", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/863a80a0-bc51-40c8-87b0-2da7429cdd0e/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/thomaspaste/clip/OptimisticBashfulLampUncleNox" },
      { slug: "IronicCrypticPterodactylDogFace-g1d3VUZmBzNbmDyy", title: "Jinx ⚡", viewCount: 2755, duration: 18, createdAt: "2022-09-17T23:46:48Z", game: "Call of Duty: Modern Warfare II", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/0617119f-9304-4753-a376-276058cbf978/landscape/thumb/thumb-0000000000-1664x936.jpg", url: "https://www.twitch.tv/thomaspaste/clip/IronicCrypticPterodactylDogFace-g1d3VUZmBzNbmDyy" },
      { slug: "StrangeSecretiveStarChefFrank", title: "NÅ ER DET NOK", viewCount: 2161, duration: 19, createdAt: "2019-10-31T21:34:38Z", game: "The Beast Inside", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/1b56d449-063e-4f1f-86f7-5636dff6785d/landscape/thumb/thumb-0000000000-1600x900.jpg", url: "https://www.twitch.tv/thomaspaste/clip/StrangeSecretiveStarChefFrank" },
      { slug: "HyperDeliciousChamoisLitFam", title: "Adam streamer", viewCount: 1996, duration: 60, createdAt: "2019-08-20T17:36:09Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/415cd628-0237-4f5f-b308-9fa8d6f6cf7d/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/thomaspaste/clip/HyperDeliciousChamoisLitFam" },
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
    twitchStats: { followers: 15922, partner: true, createdAt: "2014-09-09T14:03:12.471343Z", lastGame: "MECCHA CHAMELEON" },
    trackerStats: { avgViewers: 166, peakViewers: 242, hoursStreamed: 30 },
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
    twitchClips: [
      { slug: "CrackySecretiveCrowBCWarrior-BlfkvNOw_NEAK4Kp", title: "Knut show off ", viewCount: 18586, duration: 55, createdAt: "2022-05-01T19:26:14Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/283e1c6f-4b37-47d8-99b9-5899475dc842/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/klokkismann/clip/CrackySecretiveCrowBCWarrior-BlfkvNOw_NEAK4Kp" },
      { slug: "LazySteamyPterodactylAliens-UUxaD3KX5wabAW-u", title: "Blikket", viewCount: 1300, duration: 5, createdAt: "2024-07-21T17:41:02Z", game: "Chained Together", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/0c332977-fb9c-46bd-bda2-8a2de16062d5/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/klokkismann/clip/LazySteamyPterodactylAliens-UUxaD3KX5wabAW-u" },
      { slug: "ElatedAmorphousMousePartyTime-OsSkS3_mRzhJ9W0h", title: "Alt faller sammen", viewCount: 1014, duration: 19, createdAt: "2024-11-28T16:49:39Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/bdbcb4c6-bb4b-44fc-8c45-8bd5fe9587a3/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/klokkismann/clip/ElatedAmorphousMousePartyTime-OsSkS3_mRzhJ9W0h" },
      { slug: "CallousComfortableYakinikuDuDudu-uW6M-YRd6ve7QVIv", title: "Toreinar gir alt i dansematte!", viewCount: 849, duration: 60, createdAt: "2021-08-08T13:15:46Z", game: "StepMania", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/570d8275-f18a-47b5-838d-6decdbf93c22/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/klokkismann/clip/CallousComfortableYakinikuDuDudu-uW6M-YRd6ve7QVIv" },
      { slug: "ProductiveExquisiteBibimbapCoolCat-Rxtb4d_2e3ddxjEr", title: "Rick Roll 2x", viewCount: 754, duration: 9, createdAt: "2024-05-27T14:58:41Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/4398f34e-9e42-4247-91bb-0919e94e46b9/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/klokkismann/clip/ProductiveExquisiteBibimbapCoolCat-Rxtb4d_2e3ddxjEr" },
      { slug: "FaithfulRenownedStarlingTBTacoLeft-s0fr9IrT_KZQrm8A", title: "\"Jeg er veldig glad i gult jeg...\"", viewCount: 725, duration: 20, createdAt: "2021-10-01T13:56:53Z", game: "New World: Aeternum", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/942304f9-d649-43c5-862e-661bbd2261e9/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/klokkismann/clip/FaithfulRenownedStarlingTBTacoLeft-s0fr9IrT_KZQrm8A" },
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
    twitchStats: { followers: 59091, partner: true, createdAt: "2015-07-08T18:00:40.585173Z", lastGame: "MECCHA CHAMELEON" },
    trackerStats: { avgViewers: 209, peakViewers: 285, hoursStreamed: 9 },
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
    twitchClips: [
      { slug: "SwissSpotlessPangolinAsianGlow-LfjwCtN8jgtxIhPb", title: "melvind crasher", viewCount: 9160, duration: 11, createdAt: "2024-07-22T19:32:22Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/08b3db17-8821-4dda-aa84-300dcba8b28c/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/dennisvareide/clip/SwissSpotlessPangolinAsianGlow-LfjwCtN8jgtxIhPb" },
      { slug: "ZealousManlyOctopusKreygasm-jc9oxUpcqlZQHsXN", title: "INGVILD! <3", viewCount: 9122, duration: 37, createdAt: "2024-07-31T16:10:18Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/4b7c2751-548b-48fc-87b1-0ae5a683fa7f/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/dennisvareide/clip/ZealousManlyOctopusKreygasm-jc9oxUpcqlZQHsXN" },
      { slug: "ShinyUglyDolphinDxAbomb-tC8W5SVTJZ7_-KAp", title: "Som jeg sier til deg, jeg skuffer deg aldri!", viewCount: 7188, duration: 20, createdAt: "2024-07-29T17:20:45Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/a6a51eb8-315c-4932-a0ba-306d8885634d/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/dennisvareide/clip/ShinyUglyDolphinDxAbomb-tC8W5SVTJZ7_-KAp" },
      { slug: "VivaciousBlushingKathyPRChase-0c3o2_KPQic2AfVv", title: "DoTheRoar på nynorsk", viewCount: 5145, duration: 18, createdAt: "2024-04-28T17:47:38Z", game: "Supermarket Simulator", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/b1fd37de-7f35-4858-be63-693225dde992/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/dennisvareide/clip/VivaciousBlushingKathyPRChase-0c3o2_KPQic2AfVv" },
      { slug: "PeacefulHomelyMeerkatPastaThat-SK02g7RiSsFYAP6U", title: "SNØRRTRYNET RIP", viewCount: 4673, duration: 28, createdAt: "2024-03-29T20:38:43Z", game: "Minecraft", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/37d1139e-f2af-49db-b6c6-b55e2e80eb61/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/dennisvareide/clip/PeacefulHomelyMeerkatPastaThat-SK02g7RiSsFYAP6U" },
      { slug: "BoldWanderingReubenBrokeBack-dqgWxrPPj1w2NOYP", title: "er du fette dum eller??", viewCount: 4364, duration: 16, createdAt: "2024-08-21T17:11:37Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/3259e60c-6ef4-43b0-901b-0cd2a57b21de/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/dennisvareide/clip/BoldWanderingReubenBrokeBack-dqgWxrPPj1w2NOYP" },
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
    twitchStats: { followers: 24339, partner: true, createdAt: "2016-08-09T17:13:42.965102Z", lastGame: "Grand Theft Auto V" },
    trackerStats: { avgViewers: 137, peakViewers: 200, hoursStreamed: 21 },
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
        title: "JonieBoi: Twitch-kanalprofil",
        url: "https://www.twitch.tv/jonieboi",
        source: "Twitch",
        date: "2026",
        summary: "Offisiell Twitch-kanal for Jonieboi, hvor han streamer GTA RP, Just Chatting og varierte gamingformater på norsk. Kanalen er Twitch Partner og rangert blant de mest fulgte norske kanalene innen Just Chatting.",
        ogImage: "/lovable-uploads/news/jonieboi-4.jpg",
        tone: "neutral",
      },
      {
        title: "Jonieboi: Streamer Overview & Stats",
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
    twitchClips: [
      { slug: "GloriousMiniatureHawkHeyGuys-d2G1qL2MyYyDXpy7", title: "jump scare", viewCount: 9617, duration: 20, createdAt: "2023-08-13T18:32:08Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/2ba85fe5-518b-4c54-ace7-19ebf8d13123/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jonieboi/clip/GloriousMiniatureHawkHeyGuys-d2G1qL2MyYyDXpy7" },
      { slug: "WiseTriangularCheddarNomNom-KfMeHCE8DAXcHVuM", title: "abdul tar livet", viewCount: 7717, duration: 28, createdAt: "2024-07-15T22:01:15Z", game: "Grand Theft Auto", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/6dfbd026-afd5-4291-9e0d-301aa7b2f89c/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jonieboi/clip/WiseTriangularCheddarNomNom-KfMeHCE8DAXcHVuM" },
      { slug: "OilyDeterminedSquirrelPicoMause-d4LKtslAsAGdl2ik", title: "Olis død", viewCount: 7386, duration: 21, createdAt: "2024-07-24T00:27:55Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/1eb0cfa9-d933-4697-afd7-46cb654f2add/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/jonieboi/clip/OilyDeterminedSquirrelPicoMause-d4LKtslAsAGdl2ik" },
      { slug: "HelplessGenerousPangolinPeteZarollTie-vu7LeblgpMgttW_R", title: "RIP Kent Ronny Hardskaft", viewCount: 4915, duration: 59, createdAt: "2024-08-11T20:23:43Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/fdd23b33-0aa8-44ba-a36f-2b6b18c5b42f/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jonieboi/clip/HelplessGenerousPangolinPeteZarollTie-vu7LeblgpMgttW_R" },
      { slug: "InquisitiveLachrymoseKimchiDatSheffy-YO5jbOkCOruPnAMb", title: "alle dør", viewCount: 4869, duration: 41, createdAt: "2024-07-15T22:22:20Z", game: "Grand Theft Auto", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/da5f96f1-832e-4057-9131-9635445f865f/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jonieboi/clip/InquisitiveLachrymoseKimchiDatSheffy-YO5jbOkCOruPnAMb" },
      { slug: "SpookyFrigidSardinePlanking-UW2ocvoBOIsKprgu", title: "wang wang", viewCount: 3812, duration: 15, createdAt: "2024-07-15T16:51:24Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/d4d40223-5769-43ab-ad46-6aad3ecfb2a7/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jonieboi/clip/SpookyFrigidSardinePlanking-UW2ocvoBOIsKprgu" },
    ],
    tiktokHandle: "jonieboi",
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
    twitchStats: { followers: 44354, partner: true, createdAt: "2015-04-24T21:42:36.88602Z", lastGame: "Just Chatting" },
    trackerStats: { avgViewers: 105, peakViewers: 238, hoursStreamed: 162 },
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
    twitchClips: [
      { slug: "InexpensiveWildAxeHassaanChop-s7EPNRFowy5RfB5W", title: "WTF Yaklama", viewCount: 6588, duration: 29, createdAt: "2023-09-22T21:43:00Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/69575f23-55ff-470e-aea6-9fbf23ac662a/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/danniz/clip/InexpensiveWildAxeHassaanChop-s7EPNRFowy5RfB5W" },
      { slug: "CloudyConcernedSalmonTBTacoRight-7SzDZ_ofTH38iBWq", title: "Hanne liker ikke at Dan sover!", viewCount: 5831, duration: 30, createdAt: "2022-09-14T10:08:58Z", game: "I'm Only Sleeping", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/1e997a81-3933-4a25-8f00-72e8ce425b3b/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/danniz/clip/CloudyConcernedSalmonTBTacoRight-7SzDZ_ofTH38iBWq" },
      { slug: "SuperPlausibleOtterNomNom-bqVit1b8OoS5MX6o", title: "dauer av frank", viewCount: 5030, duration: 23, createdAt: "2022-06-17T00:55:58Z", game: "Minecraft", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/a358b1d1-07b1-4154-84bc-48c3957caabc/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/danniz/clip/SuperPlausibleOtterNomNom-bqVit1b8OoS5MX6o" },
      { slug: "StrongCreativeNigiriJonCarnage-UidDsHobXrKdNrUt", title: "Kasta ut av trosterud", viewCount: 4343, duration: 19, createdAt: "2024-08-17T15:24:42Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/14c1f874-de48-4db2-90ba-5bf2d10cbdbf/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/danniz/clip/StrongCreativeNigiriJonCarnage-UidDsHobXrKdNrUt" },
      { slug: "FamousAverageKumquatDoubleRainbow-B-OZgNIVHuwgj3CP", title: "HAMZA!", viewCount: 4075, duration: 39, createdAt: "2024-06-02T20:39:09Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/9150266d-b9fc-49e0-9d13-ce7c292d552b/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/danniz/clip/FamousAverageKumquatDoubleRainbow-B-OZgNIVHuwgj3CP" },
      { slug: "UninterestedLachrymoseEggKippa-N01oy_L25czaOS_Q", title: "zame feit", viewCount: 3309, duration: 28, createdAt: "2021-12-11T05:12:28Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/fe143eb8-effe-4b51-b2ec-c60dbe05c9bd/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/danniz/clip/UninterestedLachrymoseEggKippa-N01oy_L25czaOS_Q" },
    ],
    youtubeChannelHandle: "dasdas494",
    youtubeVideos: [
      { id: "3maqVfBlf2Y", title: "Danniz gir opp og går for fiskegrateng!", published: "2026-06-03T16:00:01+00:00" },
      { id: "X4TQFvQa8j4", title: "Danniz har FULL kontroll i Minecraft!", published: "2026-05-09T13:07:28+00:00" },
      { id: "tOoj7xjqL9o", title: "EN LENGENDE ANKOMMER BYEN?", published: "2026-05-09T06:08:57+00:00" },
      { id: "GBs1BfxEge8", title: "Danniz reagerer på Domen!", published: "2026-05-09T00:25:19+00:00" },
      { id: "9mgfupPZ0Wg", title: "Danniz blir totalt sjokkert i GTA V!", published: "2026-05-08T03:29:18+00:00" },
      { id: "WTujCWCsjJg", title: "Danniz sin syke clutch på B-site!", published: "2026-05-06T01:08:21+00:00" },
    ],
  },
  {
    handle: "mystixx",
    twitchStats: { followers: 36271, partner: true, createdAt: "2013-12-04T17:24:24.66983Z", lastGame: "IRL" },
    trackerStats: { avgViewers: 133, peakViewers: 267, hoursStreamed: 130 },
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
        title: "Mystixx: Streamer Overview & Stats",
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
        title: "Mystixx: Twitch Stats, Analytics and Channel Overview",
        url: "https://streamscharts.com/channels/mystixx",
        source: "Streams Charts",
        date: "ukjent",
        summary: "Analytics-oversikt som viser Mystixx blant Norges mest viste Twitch-strømmere, med jevn vekst innen Minecraft og IRL-kategorier.",
        ogImage: null,
        tone: "neutral",
      },
      {
        title: "Mystixx: Streamer & Innholdsskaper",
        url: "https://mystixx.no/",
        source: "mystixx.no",
        date: "ukjent",
        summary: "Offisiell hub-side som samler Mystixx sine plattformer (Twitch, YouTube, Instagram, TikTok, Discord), merch-butikk, Spotify-podkast og Vipps-støtte.",
        ogImage: null,
        tone: "positive",
      },
    ],
    twitchClips: [
      { slug: "HomelyTastyCoyoteYouDontSay-OM6bZ8KZS09Rj-vy", title: "trua med kniv...", viewCount: 209081, duration: 37, createdAt: "2023-09-28T16:56:52Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/a319d368-5dde-4c73-922a-6c3e672b1e9f/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mystixx/clip/HomelyTastyCoyoteYouDontSay-OM6bZ8KZS09Rj-vy" },
      { slug: "NeighborlyDifferentFiddleheadsCurseLit-RSfLSvGK059Wa6Yc", title: "JAVELL?!?!", viewCount: 10937, duration: 60, createdAt: "2023-09-28T16:57:33Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/e84747a5-0ba6-48d9-a4ac-b851645d4d91/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mystixx/clip/NeighborlyDifferentFiddleheadsCurseLit-RSfLSvGK059Wa6Yc" },
      { slug: "FunPerfectMeatloafYouDontSay-A4H6DHLoR_VNyjyS", title: "Jævelig tracksuit", viewCount: 7942, duration: 46, createdAt: "2023-09-28T16:56:05Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/4e9bd597-c9d7-4c3a-9c65-eff9ac48fea7/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mystixx/clip/FunPerfectMeatloafYouDontSay-A4H6DHLoR_VNyjyS" },
      { slug: "TacitHealthyMinkAsianGlow-Oz7gw-DgtLoD1vte", title: "B00BA", viewCount: 6002, duration: 11, createdAt: "2021-06-18T15:45:11Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/71b7a45b-3425-4a4e-bf87-89f542d2e757/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/mystixx/clip/TacitHealthyMinkAsianGlow-Oz7gw-DgtLoD1vte" },
      { slug: "WildExquisiteLocustJebaited-s2zGTzTlHxcriO0C", title: "Igjen kommer gamle folk", viewCount: 4814, duration: 50, createdAt: "2024-09-05T14:24:45Z", game: "IRL", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/55f8e32e-b6bf-4e33-ba46-41642d649589/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mystixx/clip/WildExquisiteLocustJebaited-s2zGTzTlHxcriO0C" },
      { slug: "JazzyApatheticAniseDatBoi-N0K1j0beljx4wb_0", title: "🔴🔴🔴 SUBATHON! 🔴🔴🔴 !youtube !p+ !hvorlenge", viewCount: 4721, duration: 26, createdAt: "2023-09-28T16:57:20Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/082a799e-010b-4c89-b03b-d94ec2f8c3ec/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mystixx/clip/JazzyApatheticAniseDatBoi-N0K1j0beljx4wb_0" },
    ],
    youtubeChannelHandle: "UC8kVc7nb33z0BHuMEypdzZg",
    youtubeVideos: [
      { id: "KFDX37sce4w", title: "Vi rodde subwayen helt til Time Square! #norway #worldcup", published: "2026-06-22T12:31:30+00:00" },
      { id: "jbkySIWBbcg", title: "Glem SK26! #humor", published: "2026-06-18T15:59:43+00:00" },
      { id: "dZcCK5hB-tw", title: "Litt bakgrunn støy er vel helt greit?", published: "2026-04-29T14:22:08+00:00" },
      { id: "s86GB1XzQtE", title: "EN LITEN HEADSUP NÅR DET GJELDER RIP N SHIPS! #pokemon", published: "2026-01-12T16:37:46+00:00" },
      { id: "_xQ1NCxxvgw", title: "GIR RÅD TIL DEN YNGRE GENERASJON!", published: "2025-12-09T17:01:27+00:00" },
      { id: "1l168zBzp4Q", title: "FINNER NOE GREIER I KJØLESKAPET!", published: "2025-12-02T14:54:36+00:00" },
    ],
    tiktokHandle: "mystixxtwitch",
  },
];

export function getCreatorByHandle(handle: string): CreatorProfile | undefined {
  return CREATORS.find((c) => c.handle === handle.toLowerCase());
}
