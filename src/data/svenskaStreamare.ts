import type { CreatorProfile } from "@/data/norskeStreamere";

/**
 * Sweden streamer-datasett. Twitch-stats + klipp hentet fra Twitchs
 * offentlige GQL; bios/høydepunkter fra websearch-research. Bilder = Twitch-
 * profilbilde (unavatar). YouTube/presse legges til i neste fase.
 */
export const CREATORS: CreatorProfile[] = [
  {
    handle: "perra",
    name: "perra",
    realName: "Hannes Hedlund",
    meta: "Twitch · variety · Just Chatting & CS2",
    blurb: "En av Sveriges mest sedda Twitch-streamers, känd för avslappnade Just Chatting-sändningar och Counter-Strike. Tävlingsorganisationen EYEBALLERS-profil med en stark svensk community.",
    bio: "Hannes Hedlund, mer känd som perra (tidigare perrababy), kommer från Kungsbacka och har vuxit fram som en av de absolut största svenska streamarna på Twitch. Innehållet bygger på tre pelare: personliga Just Chatting-sändningar, Counter-Strike och egna återkommande koncept som hans community känner igen. Under de senaste åren har han toppat listorna över mest sedda svenska kanaler. Han är knuten till organisationen EYEBALLERS och har byggt en lojal svensk publik som följer honom dagligen.",
    highlights: [
      "Återkommande etta på listorna över mest sedda svenska Twitch-streamers",
      "Över 180 000 följare på Twitch",
      "Profil och content creator för EYEBALLERS",
      "Bygger innehåll kring Just Chatting, Counter-Strike och egna koncept",
      "Stark och lojal svensk community"
    ],
    image: "https://unavatar.io/twitch/perra",
    attribution: "Twitch / @perra",
    attributionUrl: "https://www.twitch.tv/perra",
    language: "sv",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/perra" }
    ],
    references: [
      { label: "TwitchTracker - perra", url: "https://twitchtracker.com/perra", type: "tracker" },
      { label: "EYEBALLERS - Perrababy joins EYEBALLERS", url: "https://www.eyeballers.net/post/perrababy-joins-eyeballers", type: "official-site" },
      { label: "Streams Charts - perra", url: "https://streamscharts.com/channels/perra", type: "tracker" }
    ],
    twitchStats: { followers: 185174, partner: true, createdAt: "2021-09-26T13:22:25.490742Z", lastGame: "Just Chatting" },
    betaStats: { avgViewers: 1400, airTimeHours: 157.8, watchTimeHours: 228400, audienceInterests: ["Counter-Strike 2", "CS Skins & Trading", "Pro-Esports Scene", "Snus & Swedish Tobacco", "PC Building", "Football (Soccer)"], streamerInterests: ["Food", "Music", "Sports", "Technology"] },
    trackerStats: { avgViewers: 1580, peakViewers: 2305, hoursStreamed: 174 },
    youtubeChannelHandle: "perrababy",
    youtubeVideos: [
      { id: "1_zQL3sIZdQ", title: "Ska blod lyssna?✌️😭 (Twitch - Perra)", published: "2026-06-28T15:38:15+00:00" },
      { id: "KqiSnyHfS_0", title: "PERRA MOMENTS 35", published: "2026-06-25T05:30:24+00:00" },
      { id: "A7II1YyODdQ", title: "”Jag tänker inte förlora”..🤣 (Twitch - Perra)", published: "2026-06-22T12:55:37+00:00" },
      { id: "0jLbLpHeOOE", title: "Hur kan det gå så fort✌️🫩 (Twitch - Perra)", published: "2026-06-18T20:07:47+00:00" },
      { id: "gMNVpd4leTQ", title: "90gq at 3am..✌️🫩 (Twitch - Perra)", published: "2026-06-13T16:01:20+00:00" },
      { id: "I2D7GsFdo2w", title: "NEHÄÄÄÄ😠 (Twitch - Perra)", published: "2026-06-13T13:24:00+00:00" },
    ],
    twitchClips: [
      { slug: "IntelligentSucculentEggplantTinyFace-RS-rLoRF10Nc4_kK", title: "BAKHÅLL SKOTTLOSSNING", viewCount: 22472, duration: 26, createdAt: "2023-07-18T18:56:10Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/cfe61393-4cb7-4413-bca2-6d753f815674/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/perra/clip/IntelligentSucculentEggplantTinyFace-RS-rLoRF10Nc4_kK" },
      { slug: "VastShyOtterKappaRoss-GEoMUKxJoABaJRBq", title: "DÅLIGT KORTMINNE", viewCount: 20070, duration: 14, createdAt: "2024-04-09T14:47:28Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/b518f0f8-96b3-4108-966e-c9e13f84b4d4/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/perra/clip/VastShyOtterKappaRoss-GEoMUKxJoABaJRBq" },
      { slug: "FurtiveBrightKoalaTheRinger-qmiHAFF89kWhRyFm", title: "BOMB!!!!!!", viewCount: 16295, duration: 39, createdAt: "2024-05-24T15:24:41Z", game: "IRL", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/81dafc9d-28f0-4246-9c3e-2d3492d9659f/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/perra/clip/FurtiveBrightKoalaTheRinger-qmiHAFF89kWhRyFm" },
      { slug: "UglyCalmTitanKippa-hLgJ57FtIHOWK0TD", title: "zorro kukad.", viewCount: 14555, duration: 58, createdAt: "2023-12-10T09:50:04Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/29334213-a04a-40c3-87a2-4683e50b75ef/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/perra/clip/UglyCalmTitanKippa-hLgJ57FtIHOWK0TD" },
      { slug: "SmoothMuddyWombatDerp-zjv3ELjznYXKS9gY", title: "Gpunkt och perra robot?", viewCount: 12501, duration: 4, createdAt: "2024-02-24T22:05:40Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/207fe5db-2bf2-496e-b4b6-bc7f3012a697/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/perra/clip/SmoothMuddyWombatDerp-zjv3ELjznYXKS9gY" },
      { slug: "IcyShinyAsparagusBabyRage-HtGnUFFXtA5---fo", title: "usvängen MEDANS bärsen flödar", viewCount: 12014, duration: 28, createdAt: "2023-05-26T19:11:31Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/e1f7d409-af3a-40cc-9dba-a28e2d4d5585/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/perra/clip/IcyShinyAsparagusBabyRage-HtGnUFFXtA5---fo" },
    ],
  },
  {
    handle: "anomaly",
    name: "Anomaly",
    realName: "Ludwig Lagerstedt",
    meta: "Twitch · YouTube · Counter-Strike & variety",
    blurb: "Svensk-finsk gaming-profil och en av Nordens största creators inom Counter-Strike. Känd för humoristiskt och viralt innehåll på både Twitch och YouTube med en internationell publik.",
    bio: "Ludwig Amadeus Lagerstedt, känd online som Anomaly, är en svensk-finsk gaming-YouTuber och Twitch-streamer född 1994 i Sollentuna. Han slog igenom med humoristiskt och viralt Counter-Strike-innehåll, framför allt kopplat till case-öppningar och skins, och har sedan dess blivit ett av de största namnen i den nordiska gamingvärlden. Hans kanal startade redan 2007 och utvecklades från LEGO-stop-motion till gaming. I dag når han en stor internationell publik och sänder huvudsakligen på engelska. Han räknas till de mest följda svenska creators på både Twitch och YouTube.",
    highlights: [
      "Cirka 2,6 miljoner följare på Twitch",
      "Omkring 2,9 miljoner prenumeranter på YouTube",
      "En av Nordens största creators inom Counter-Strike",
      "Internationellt känd för viralt och humoristiskt gaminginnehåll",
      "Aktiv content creator sedan 2007"
    ],
    image: "https://unavatar.io/twitch/anomaly",
    attribution: "Twitch / @anomaly",
    attributionUrl: "https://www.twitch.tv/anomaly",
    language: "en",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/anomaly" },
      { label: "YouTube", url: "https://www.youtube.com/anomaly" },
      { label: "Instagram", url: "https://www.instagram.com/anomalyautism" },
      { label: "X", url: "https://twitter.com/anomalyxd" }
    ],
    references: [
      { label: "TwitchTracker - Anomaly", url: "https://twitchtracker.com/anomaly", type: "tracker" },
      { label: "Esports Charts - Anomaly", url: "https://escharts.com/players/anomaly", type: "tracker" }
    ],
    twitchStats: { followers: 2848890, partner: true, createdAt: "2014-12-04T03:13:38.94747Z", lastGame: "Counter-Strike" },
    trackerStats: { avgViewers: 1200, peakViewers: 2324, hoursStreamed: 60 },
    youtubeChannelHandle: "UCqck1kDsBbrlKWHGRsk7dbQ",
    youtubeVideos: [
      { id: "esDst18ZwLs", title: "ANOMALY AND PAPA MAKE TRADITIONAL BAKLAVA", published: "2023-06-05T13:57:27+00:00" },
      { id: "n4zNQvyAJOo", title: "ANOMALY GOES ON A DIET (CHALLENGE)", published: "2023-05-26T16:00:52+00:00" },
      { id: "vZLrJG1a10I", title: "PAPANOMALY OPENING FAN MAIL XI", published: "2023-05-09T13:15:43+00:00" },
      { id: "c0xWhBtJnnE", title: "ROASTING VIEWER COUNTRIES AND CITIES", published: "2023-05-01T13:00:21+00:00" },
      { id: "MwqFF8LDkMU", title: "REVIEWING MY REDDIT 3 (HORRID MEMES)", published: "2023-04-23T14:39:05+00:00" },
      { id: "1JlLYBENbeM", title: "PAPA PLAYS COUNTER-STRIKE 2", published: "2023-04-15T12:58:30+00:00" },
    ],
    twitchClips: [
      { slug: "ResilientBrightPheasantDoggo-qOwmdDNt8fQ95o1B", title: "furi wtf?", viewCount: 123737, duration: 5, createdAt: "2024-07-30T22:05:19Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/3ac70b37-4448-4f84-951d-942e148a55f6/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/anomaly/clip/ResilientBrightPheasantDoggo-qOwmdDNt8fQ95o1B" },
      { slug: "AltruisticLightDadRuleFive-DcvYOJkCajCnoNRZ", title: "india speedrun", viewCount: 99460, duration: 38, createdAt: "2024-09-02T12:56:16Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/aab36e0c-56da-42da-b1bb-f3782456ba07/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/anomaly/clip/AltruisticLightDadRuleFive-DcvYOJkCajCnoNRZ" },
      { slug: "CrowdedBlatantAntelopeFrankerZ-1Bt0dwN3foAXjhlu", title: "KNIFE!!!!", viewCount: 74087, duration: 14, createdAt: "2021-06-26T17:41:27Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/06d72b1c-e828-4cf7-a9e9-e2c28ab8677d/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/anomaly/clip/CrowdedBlatantAntelopeFrankerZ-1Bt0dwN3foAXjhlu" },
      { slug: "EndearingSmallTomatoMau5-PPpmPiYCX6PpPhSm", title: "ANOMALY RUBY", viewCount: 45418, duration: 27, createdAt: "2021-06-26T23:41:45Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/39ac4be2-ba5d-48d9-b714-479fa35385a8/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/anomaly/clip/EndearingSmallTomatoMau5-PPpmPiYCX6PpPhSm" },
      { slug: "OilyOutstandingMooseItsBoshyTime-22ydqCTJqO5Bpz0-", title: "ANOMALY I GOT U", viewCount: 38991, duration: 26, createdAt: "2023-08-28T20:51:24Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/474f53a3-f425-4336-8c44-33a49221f1d7/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/anomaly/clip/OilyOutstandingMooseItsBoshyTime-22ydqCTJqO5Bpz0-" },
      { slug: "StrangeFlirtyPoultryCoolStoryBob-ZkRaNCH_cIp-pOtQ", title: "coldludde", viewCount: 25730, duration: 23, createdAt: "2021-03-21T14:48:32Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/45cecb79-1664-4c39-aea0-f22f42063f78/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/anomaly/clip/StrangeFlirtyPoultryCoolStoryBob-ZkRaNCH_cIp-pOtQ" },
    ],
  },
  {
    handle: "loeya",
    name: "Loeya",
    realName: "Olivia",
    meta: "Twitch · Fortnite & variety",
    blurb: "En av världens största kvinnliga Fortnite-streamers och en pionjär bland svenska gaming-creators. Tidigare Twitch-partner med exklusivt avtal och en stor internationell publik.",
    bio: "Loeya, med förnamnet Olivia, är en svensk streamer som slog igenom internationellt med Fortnite. Hon började streama 2017 efter studenten och blev snabbt en av de mest framstående kvinnliga creators på Twitch globalt. Hon har tävlat i officiella Fortnite-sammanhang som Summer Skirmish och tecknade 2020 ett uppmärksammat exklusivt tvåårsavtal med Twitch. Med över en miljon följare och en bred internationell publik räknas hon som en av Sveriges mest inflytelserika gaming-profiler, och hon varierar mellan Fortnite och annat innehåll.",
    highlights: [
      "Över 1,3 miljoner följare på Twitch",
      "En av världens största kvinnliga Fortnite-streamers",
      "Tecknade ett exklusivt tvåårsavtal med Twitch 2020",
      "Tävlade i Fortnite Summer Skirmish",
      "Streamar sedan 2017 och har en bred internationell publik"
    ],
    image: "https://unavatar.io/twitch/loeya",
    attribution: "Twitch / @loeya",
    attributionUrl: "https://www.twitch.tv/loeya",
    language: "mixed",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/loeya" }
    ],
    references: [
      { label: "Tubefilter - Twitch Signs Loeya", url: "https://www.tubefilter.com/2020/12/23/twitch-signs-loeya-to-two-year-deal/", type: "press" },
      { label: "Streams Charts - Loeya", url: "https://streamscharts.com/channels/loeya", type: "tracker" }
    ],
    twitchStats: { followers: 1663840, partner: true, createdAt: "2017-07-23T10:25:32.275523Z", lastGame: "Fortnite" },
    trackerStats: { avgViewers: 1729, peakViewers: 3610, hoursStreamed: 182 },
    youtubeChannelHandle: "loeya",
    youtubeVideos: [
      { id: "_MeivxoNfgQ", title: "I love the sprites 🥹🥹🥹 #gaming #fortnite #fortniteclips #fortnitememes", published: "2026-06-26T11:00:07+00:00" },
      { id: "OOTYj-I30vA", title: "What ritual got you the best sprite so far?🤔 #gaming #fortniteclips #fortnite #Loeya #fail", published: "2026-06-25T11:00:23+00:00" },
      { id: "7liicXVW1h4", title: "#AD THIS IS WHY I CAN'T PLAY SCARY GAMES #scarygame #coopgaming #playwithfriends #loeya #jumpscare", published: "2026-06-09T12:00:17+00:00" },
      { id: "hPeST2-P1nY", title: "#AD You CAN'T trust your friends! #scarygame #coopgaming #playwithfriends #loeya #jumpscare", published: "2026-06-08T12:00:32+00:00" },
      { id: "g3lYGBkV3k0", title: "GETTING UNWASHED 👵  #fortnite #gaming #fortniteclips #gamergirl", published: "2026-05-31T12:00:22+00:00" },
      { id: "RJ4jEmVWkrw", title: "NO GLOVES NEEDED TO SEND EM FLYINGGG😫 #gaming #fail #Loeya #fortniteclips #viral #funnytiktok", published: "2026-05-30T12:00:13+00:00" },
    ],
    twitchClips: [
      { slug: "BillowingAbnegateFungusTheThing-lRxw5m5G2R33OC1N", title: "Loeya kissing a woman live on stream", viewCount: 31688, duration: 26, createdAt: "2023-09-17T09:07:08Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/203b8f9c-ca51-4547-b146-f2a242bf5414/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/loeya/clip/BillowingAbnegateFungusTheThing-lRxw5m5G2R33OC1N" },
      { slug: "ArbitraryAmericanAsteriskBlargNaut-3l0N1VgrZpS9Rgvw", title: "Loeya dancing griddy irl", viewCount: 22818, duration: 20, createdAt: "2024-06-22T09:08:31Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/dd277d5c-383e-4bd1-9bcb-50b47b9c896e/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/loeya/clip/ArbitraryAmericanAsteriskBlargNaut-3l0N1VgrZpS9Rgvw" },
      { slug: "CreativeScarySharkPicoMause-KfyP5AVsg9NuAokf", title: "Loeya gamba", viewCount: 19894, duration: 36, createdAt: "2022-06-17T09:59:28Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/906bd2ea-3a2c-4c68-b69f-586fd571a268/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/loeya/clip/CreativeScarySharkPicoMause-KfyP5AVsg9NuAokf" },
      { slug: "CoweringCuteGarbageDBstyle-j2ZMN2814qqQBT6A", title: "WAAAT ", viewCount: 15050, duration: 29, createdAt: "2023-08-25T16:49:51Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/31bfe51c-2a3e-403a-87b6-e140265399b7/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/loeya/clip/CoweringCuteGarbageDBstyle-j2ZMN2814qqQBT6A" },
      { slug: "FlaccidAssiduousCarabeefPupper-XElYQgAbbZgHcU5j", title: "\"I'm scared to grab the balls too hard\"", viewCount: 14801, duration: 15, createdAt: "2023-12-03T16:28:02Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/18003d6d-67f8-4270-8204-5232de7bfeee/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/loeya/clip/FlaccidAssiduousCarabeefPupper-XElYQgAbbZgHcU5j" },
      { slug: "ArborealAthleticLorisBrainSlug-3WcvgSY1XOZSDVFM", title: "cleannnnn", viewCount: 12496, duration: 5, createdAt: "2023-08-29T16:36:29Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/b076da88-9a2a-4a77-bf4d-9af156c46405/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/loeya/clip/ArborealAthleticLorisBrainSlug-3WcvgSY1XOZSDVFM" },
    ],
  },
  {
    handle: "tejbz",
    name: "Tejbz",
    realName: "Tobias Öjerfalk",
    meta: "Twitch · YouTube · gaming & variety",
    blurb: "Svensk veteran inom gaming-content med över ett decennium på YouTube och Twitch. Känd för bred spelvariation och en av de mest etablerade svenska creators i branschen.",
    bio: "Tobias Öjerfalk, känd som Tejbz, är en svensk gaming-creator född 1988 i Boden. Han har varit aktiv på YouTube sedan 2010 och hör till de mest erfarna svenska profilerna inom spelinnehåll. Han har en examen i digital kommunikation och media från Luleå tekniska universitet och gick 2016 med i TV4:s talangnätverk ENT. Tejbz har också varit öppen med sin Crohns sjukdom, som tidigt förde honom in i gamingvärlden. Med hundratusentals prenumeranter och en lång karriär bakom sig är han ett välkänt namn för svenska gamingtittare.",
    highlights: [
      "Över 530 000 prenumeranter på YouTube med fler än 100 miljoner visningar",
      "Aktiv gaming-creator sedan 2010",
      "Del av TV4:s talangnätverk ENT sedan 2016",
      "Examen i digital kommunikation och media från Luleå tekniska universitet",
      "Över 150 000 följare på Twitch"
    ],
    image: "https://unavatar.io/twitch/tejbz",
    attribution: "Twitch / @tejbz",
    attributionUrl: "https://www.twitch.tv/tejbz",
    language: "sv",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/tejbz" },
      { label: "YouTube", url: "https://www.youtube.com/@Tejbz" },
      { label: "X", url: "https://x.com/tejbz" },
      { label: "Webbplats", url: "https://tejbz.com" }
    ],
    references: [
      { label: "Wikipedia - Tejbz", url: "https://en.wikipedia.org/wiki/Tejbz", type: "wikipedia" },
      { label: "TwitchTracker - tejbz", url: "https://twitchtracker.com/tejbz", type: "tracker" }
    ],
    twitchStats: { followers: 156053, partner: true, createdAt: "2011-10-22T13:28:31.413034Z", lastGame: "Overwatch" },
    trackerStats: { avgViewers: 26, peakViewers: 57, hoursStreamed: 12 },
    youtubeChannelHandle: "Tejbz",
    youtubeVideos: [
      { id: "vZaZE7AyoLA", title: "Logitech G512X! #logitechG", published: "2026-06-08T10:31:58+00:00" },
      { id: "SlsJGbdeyaM", title: "Wave XLR Pro - First Impressions #elgato", published: "2026-06-03T13:00:17+00:00" },
      { id: "ZK-h2BAdbto", title: "MW4 Announced! #mw4 #callofduty", published: "2026-05-29T10:50:31+00:00" },
      { id: "s1OXf_g-cS8", title: "Gotham Citizens are built different #legobatman", published: "2026-05-28T08:03:50+00:00" },
      { id: "B49ynNl6D_A", title: "Unboxing the new 007 First Light Limited Edition Controller! #007 #007firstlight", published: "2026-05-28T08:03:48+00:00" },
      { id: "OH6M3YpHJp8", title: "#forzahorizon6 dirt racing sucks", published: "2026-05-26T10:40:52+00:00" },
    ],
    twitchClips: [
      { slug: "GlamorousSuaveAubergineOhMyDog", title: "Finished 11th in the turney! Now chill Dubs!", viewCount: 10599, duration: 32, createdAt: "2016-12-15T16:03:15Z", game: "Z1: Battle Royale", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/4b687b3d-1317-4582-83a1-019a2771e770/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/tejbz/clip/GlamorousSuaveAubergineOhMyDog" },
      { slug: "ResoluteSweetApeVoteNay", title: "\"So I heard that car's are kinda like a deathtrap\"", viewCount: 8649, duration: 32, createdAt: "2017-03-24T13:46:25Z", game: "PUBG: BATTLEGROUNDS", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/c4556f0a-53c4-4d68-8e84-b928d6dba6cc/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/tejbz/clip/ResoluteSweetApeVoteNay" },
      { slug: "EmpathicHardCucumberDBstyle", title: "Early bird gets the worms! Subgames! !subgoal ", viewCount: 5835, duration: 32, createdAt: "2016-12-11T11:01:11Z", game: "Z1: Battle Royale", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/b0e65619-8e48-4391-8d67-1482ba97b333/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/tejbz/clip/EmpathicHardCucumberDBstyle" },
      { slug: "ResoluteSilkyMarjoramTTours", title: "STOP IT, PC", viewCount: 4126, duration: 60, createdAt: "2017-12-13T15:08:03Z", game: "PUBG: BATTLEGROUNDS", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/c896ccc7-6d43-4853-8b65-dec7f6a88468/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/tejbz/clip/ResoluteSilkyMarjoramTTours" },
      { slug: "ModernPunchySangPogChamp", title: "TEJBZ ON PKA", viewCount: 1926, duration: 12, createdAt: "2019-04-08T17:46:47Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/91e419f5-a580-42af-bc8f-837efe289fc9/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/tejbz/clip/ModernPunchySangPogChamp" },
      { slug: "PricklyStormyWaterHassaanChop", title: "I like videogames and stuff! Follow @tejbz ", viewCount: 1770, duration: 32, createdAt: "2016-12-22T14:45:39Z", game: "Z1: Battle Royale", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/72169d4d-aa00-4e85-9515-dedad54c8b5e/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/tejbz/clip/PricklyStormyWaterHassaanChop" },
    ],
  },
  {
    handle: "cyrustwo",
    name: "CyrusTWO",
    realName: "Tim Sellbrand",
    meta: "Twitch · variety · GTA V & Just Chatting",
    blurb: "Svensk variety-streamer och Twitch-partner, en av de mest sedda svenska kanalerna. Känd framför allt för GTA V men varierar mellan flera spel och innehållsformat.",
    bio: "Tim Sellbrand, känd som CyrusTWO, är en svensk variety-streamer och Twitch-partner baserad i Sverige. Han hör återkommande till de mest sedda svenska kanalerna och har byggt en stor och aktiv publik. Innehållet domineras av GTA V men han varierar med titlar som Overwatch 2 och Counter-Strike samt annat varierat innehåll. Med sin breda spelrepertoar och regelbundna sändningar är han ett etablerat namn i den svenska streaming-scenen.",
    highlights: [
      "Återkommande topp-tre bland mest sedda svenska Twitch-streamers",
      "Över 130 000 följare på Twitch",
      "Twitch-partner",
      "Variety-streamer med GTA V som huvudfokus",
      "Stor och aktiv svensk publik"
    ],
    image: "https://unavatar.io/twitch/cyrustwo",
    attribution: "Twitch / @cyrustwo",
    attributionUrl: "https://www.twitch.tv/cyrustwo",
    language: "sv",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/cyrustwo" }
    ],
    references: [
      { label: "Streams Charts - CyrusTWO", url: "https://streamscharts.com/channels/cyrustwo", type: "tracker" },
      { label: "Social Blade - CyrusTWO", url: "https://socialblade.com/twitch/user/cyrustwo", type: "tracker" }
    ],
    twitchStats: { followers: 134143, partner: true, createdAt: "2013-03-08T12:41:58.971298Z", lastGame: "Grand Theft Auto V" },
    trackerStats: { avgViewers: 1502, peakViewers: 2822, hoursStreamed: 125 },
    youtubeChannelHandle: "CyrusTWO",
    youtubeVideos: [
      { id: "ABDK-xyASro", title: "ROGUE MC TAR BAITEN - &quot;VAD FOTAR DU DITT FREAK?!&quot;", published: "2026-06-14T10:00:02+00:00" },
      { id: "W3MBwcRr7T8", title: "JAKE RISKERAR YRKET... IGEN?! – &quot;TACK FÖR DIN TID I KÅREN&quot;", published: "2026-06-09T07:35:25+00:00" },
      { id: "bzF1_GT1tlw", title: "CyrusTWO | Viewer Oddshots #383", published: "2026-06-04T09:09:20+00:00" },
      { id: "iqdJKRXa3TA", title: "K-M FÅR NYANSTÄLLD ATT SÄGA UPP SIG – &quot;HELLO JAMES?!&quot;", published: "2026-05-30T10:00:16+00:00" },
      { id: "GCnBEBIBjyk", title: "SNORLOSKOR PÅ WIGWAM – &quot;DET ÄR FÖRTAL!!&quot;", published: "2026-05-25T09:04:46+00:00" },
      { id: "Po-RQeM580s", title: "CyrusTWO | Viewer Oddshots #382", published: "2026-05-20T08:56:23+00:00" },
    ],
    twitchClips: [
      { slug: "WimpyBusyVultureAliens", title: "skön geppe", viewCount: 24713, duration: 5, createdAt: "2020-08-19T13:36:17Z", game: "FIFA 20", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/b9395367-9691-4efd-8fb5-bbd9d4d23821/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/cyrustwo/clip/WimpyBusyVultureAliens" },
      { slug: "ImpossibleGiantMelonDxCat-fkFb7xbY1pRT1ffr", title: "MAX WINNNNNNNN", viewCount: 15512, duration: 36, createdAt: "2025-11-09T15:24:19Z", game: "Slots", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/99727f74-d6a6-496e-bcf1-5b6dddb7f5c6/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/cyrustwo/clip/ImpossibleGiantMelonDxCat-fkFb7xbY1pRT1ffr" },
      { slug: "WonderfulEnjoyableHerbsDatSheffy-gBUl6fYucGxakoaL", title: "DAY OFF, MEN INGET LIV SÅ JAG SPELAR :-)", viewCount: 14488, duration: 26, createdAt: "2022-09-03T14:25:54Z", game: null, thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/0d038cff-d012-43ab-b02f-18c6b0f3b1bc/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/cyrustwo/clip/WonderfulEnjoyableHerbsDatSheffy-gBUl6fYucGxakoaL" },
      { slug: "AntediluvianTangentialDaikonAMPEnergyCherry", title: "UZI GANG FIGHT (EPISKT)", viewCount: 13695, duration: 41, createdAt: "2020-07-15T17:30:06Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/28187e35-6a29-48d9-9407-573e9be44c44/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/cyrustwo/clip/AntediluvianTangentialDaikonAMPEnergyCherry" },
      { slug: "LongEntertainingWeaselGrammarKing", title: "Mallis chevvan KEKW", viewCount: 12382, duration: 17, createdAt: "2020-08-26T16:45:53Z", game: null, thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/3dd0c63f-7c0c-45bf-be5c-9ccbe3a865de/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/cyrustwo/clip/LongEntertainingWeaselGrammarKing" },
      { slug: "SpicyModernShrewCclamChamp-7dFamZwlpHCmweRF", title: "Honken rtd2 skrik", viewCount: 11690, duration: 5, createdAt: "2022-05-03T13:43:28Z", game: "Heave Ho", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/da472bb9-6fb5-4144-9678-8185dd6e9b28/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/cyrustwo/clip/SpicyModernShrewCclamChamp-7dFamZwlpHCmweRF" },
    ],
  },
  {
    handle: "swebliss",
    name: "Swebliss",
    meta: "Twitch · variety · gaming & creative",
    blurb: "En av de mest följda svenska kanalerna på Twitch och en erfaren profil inom gaming och kreativt innehåll. Känd för bredd inom spel, digital konst och teknik.",
    bio: "Swebliss är en svensk Twitch-partner med över ett decennium i streaming-branschen, vilket gör henne till en av de mest etablerade svenska creators. Hon beskriver sig själv som gamer, digital konstnär och teknikintresserad och blandar gaming med kreativt innehåll. Med en av de högsta följarsiffrorna bland svenskspråkiga kanaler hör hon till toppskiktet av svenska streamers och har byggt en lojal community över många år.",
    highlights: [
      "En av de mest följda svenskspråkiga kanalerna med över 230 000 följare",
      "Twitch-partner med över tio års erfarenhet",
      "Blandar gaming med digital konst och teknik",
      "Etablerad profil i den svenska streaming-scenen",
      "Lojal och långvarig community"
    ],
    image: "https://unavatar.io/twitch/swebliss",
    attribution: "Twitch / @swebliss",
    attributionUrl: "https://www.twitch.tv/swebliss",
    language: "mixed",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/swebliss" },
      { label: "Instagram", url: "https://www.instagram.com/swebliss/" }
    ],
    references: [
      { label: "Streams Charts - Swebliss", url: "https://streamscharts.com/channels/swebliss", type: "tracker" },
      { label: "TwitchTracker - mest följda svenska", url: "https://twitchtracker.com/channels/most-followers/swedish", type: "tracker" }
    ],
    twitchStats: { followers: 231479, partner: true, createdAt: "2013-10-26T15:34:16.185159Z", lastGame: "Just Chatting" },
    trackerStats: { avgViewers: 182, peakViewers: 317, hoursStreamed: 12 },
    youtubeChannelHandle: "UCsHrlv3Pm7UNSX9N7PkRpWg",
    youtubeVideos: [
      { id: "w_Uy_goEWH0", title: "&quot;OH NO&quot; Moment live on stream", published: "2023-08-14T14:31:37+00:00" },
      { id: "IDVXD5kTe2I", title: "NY KANAL TILLSAMMANS MED KONRAD!", published: "2016-10-26T15:59:32+00:00" },
      { id: "1s4yNeVUDEM", title: "LYX SVIT OCH HOOTERS | USA VLOGG #1", published: "2016-09-15T09:09:13+00:00" },
      { id: "YZ4UEF_GX60", title: "THE BOYFRIEND TAG | Hur var första kyssen?", published: "2016-09-08T12:05:55+00:00" },
      { id: "CEWKlvf3_Js", title: "JAG TÄVLAR I OVERWATCH ALLSTARS! | VLOGG", published: "2016-06-07T09:04:41+00:00" },
      { id: "DNqnam9Z-jw", title: "HITTAR EN FÅGELUNGE | VLOGG", published: "2016-05-20T10:04:46+00:00" },
    ],
    twitchClips: [
      { slug: "PlumpTangibleAardvarkOptimizePrime", title: "Got your balls ready? I do! Let's celebrate DOUBLE Christmas 24h!!\n!instagram [Swe/eng]", viewCount: 24752, duration: 30, createdAt: "2020-12-24T20:20:53Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/87aea871-c4a0-48ae-86c4-534cd067a9c1/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/swebliss/clip/PlumpTangibleAardvarkOptimizePrime" },
      { slug: "ObliviousIntelligentMilkNinjaGrumpy-hZt5VVCqZMGaKlAb", title: "Let's Hang out! Morning chat :)", viewCount: 17301, duration: 29, createdAt: "2021-05-04T08:08:24Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/f6d355ed-1612-4f3d-9bb1-2c99903570eb/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/swebliss/clip/ObliviousIntelligentMilkNinjaGrumpy-hZt5VVCqZMGaKlAb" },
      { slug: "OilyBoringConsoleHassaanChop-OJFUhnFiCUsWtgd0", title: "prft", viewCount: 14118, duration: 28, createdAt: "2022-10-22T21:15:48Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/c53805a0-663e-4580-92c8-960e56a7e2ac/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/swebliss/clip/OilyBoringConsoleHassaanChop-OJFUhnFiCUsWtgd0" },
      { slug: "AstuteFlaccidRadicchioTebowing-T4thrykL9sI5Ui1K", title: "Box DISASTER. Hilarious hahaha!", viewCount: 12486, duration: 17, createdAt: "2024-07-26T19:25:05Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/fd40bdff-ac3e-4660-85ef-8c92d384f374/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/swebliss/clip/AstuteFlaccidRadicchioTebowing-T4thrykL9sI5Ui1K" },
      { slug: "GiantBoldPastaKappaClaus", title: "SURPRISE STREAM JOIN NOW!  MISS YOU! ~Click NOW [Swe/eng]", viewCount: 10823, duration: 26, createdAt: "2021-01-07T19:48:02Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/6eb1f4c8-cbf4-4082-8fb3-72d89009c34a/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/swebliss/clip/GiantBoldPastaKappaClaus" },
      { slug: "RockyGiantFlamingoItsBoshyTime-bVZTNBk4rYe9NoS_", title: "685484", viewCount: 10408, duration: 28, createdAt: "2022-03-10T22:36:37Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/130596d1-fcd4-484f-9a98-42098b63c20c/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/swebliss/clip/RockyGiantFlamingoItsBoshyTime-bVZTNBk4rYe9NoS_" },
    ],
  },
  {
    handle: "emiliahult",
    name: "EmiliaHult",
    realName: "Emilia Hult",
    meta: "Twitch · Counter-Strike & variety",
    blurb: "Svensk gaming-profil känd för Counter-Strike och en av de mest följda kvinnliga streamarna i Sverige. Bygger en stor publik kring tävlingsinriktat och varierat innehåll.",
    bio: "Emilia Hult, känd som EmiliaHult, är en svensk streamer från Nacka som främst gjort sig känd för sina färdigheter i Counter-Strike. Hon hör till de mest följda svenska kanalerna på Twitch och har byggt en stor publik kring tävlingsinriktat spel kompletterat med varierat innehåll. Med över 200 000 följare räknas hon som en av Sveriges ledande kvinnliga gaming-creators och är en återkommande profil i den svenska streaming-scenen.",
    highlights: [
      "Över 200 000 följare på Twitch",
      "En av de mest följda svenska kvinnliga streamarna",
      "Känd för sina färdigheter i Counter-Strike",
      "Kommer från Nacka i Sverige",
      "Etablerad profil i den svenska gaming-scenen"
    ],
    image: "https://unavatar.io/twitch/emiliahult",
    attribution: "Twitch / @emiliahult",
    attributionUrl: "https://www.twitch.tv/emiliahult",
    language: "sv",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/emiliahult" }
    ],
    references: [
      { label: "TwitchTracker - EmiliaHult", url: "https://twitchtracker.com/emiliahult", type: "tracker" },
      { label: "Streams Charts - EmiliaHult", url: "https://streamscharts.com/channels/emiliahult", type: "tracker" }
    ],
    twitchStats: { followers: 205334, partner: true, createdAt: "2015-06-24T19:18:11.083219Z", lastGame: "Counter-Strike" },
    trackerStats: { avgViewers: 138, peakViewers: 335, hoursStreamed: 30 },
    youtubeChannelHandle: "EmiliaHult",
    youtubeVideos: [
      { id: "8BYeLnOh8no", title: "#strangerthings", published: "2026-01-08T15:37:54+00:00" },
      { id: "-n135qttbbI", title: "#music #danse #fun", published: "2025-12-04T14:15:58+00:00" },
      { id: "nbRk5KixPao", title: "#liseberg #music #danse #love", published: "2025-10-12T17:15:55+00:00" },
      { id: "USCAjUr4w9w", title: "#dance #music #goodvibes #dancer #viraltrend #fashion", published: "2025-09-19T18:30:30+00:00" },
      { id: "i8UZBEsvaP8", title: "#goodvibes #music #curlyhair #transiton", published: "2025-09-19T14:19:06+00:00" },
      { id: "uIg2zCf4XLE", title: "#transtion#music", published: "2025-09-19T13:30:14+00:00" },
    ],
    twitchClips: [
      { slug: "DifficultManlyVelociraptorTF2John--A_xOjL8LfC14XRP", title: "Time to eat - !helwit", viewCount: 12490, duration: 28, createdAt: "2022-07-26T13:33:59Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/0735579b-e344-4562-a311-7bee27d94c43/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/emiliahult/clip/DifficultManlyVelociraptorTF2John--A_xOjL8LfC14XRP" },
      { slug: "ProtectiveFlirtyAubergineYouDontSay--wxrTH309E8Qorwc", title: "FRIDAY AGAIN", viewCount: 10042, duration: 29, createdAt: "2022-01-02T19:27:20Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/dc35274a-9d10-42ba-8d13-2caa67b3435c/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/emiliahult/clip/ProtectiveFlirtyAubergineYouDontSay--wxrTH309E8Qorwc" },
      { slug: "LovelyMuddyYamPraiseIt-jK7X4s2MXZIBOsR5", title: "Sista timmarna i Göteborg !helwit", viewCount: 9198, duration: 30, createdAt: "2022-07-30T10:42:27Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/1e28eca7-97e2-4ad2-b48b-b94453d574e9/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/emiliahult/clip/LovelyMuddyYamPraiseIt-jK7X4s2MXZIBOsR5" },
      { slug: "UgliestAgileDuckKeepo-aofU_wJq5BVuBKYx", title: "Baking stream with Amina! ", viewCount: 7238, duration: 30, createdAt: "2021-11-07T16:06:51Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/e041d7b4-1b22-4946-ab6c-6c0da12bfa44/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/emiliahult/clip/UgliestAgileDuckKeepo-aofU_wJq5BVuBKYx" },
      { slug: "RichTenaciousSandstormThunBeast-uA1z9H3Qtw_2572B", title: "She’s back! Amiiiiinaaaaa", viewCount: 5520, duration: 27, createdAt: "2021-12-18T16:47:35Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/f24693de-e769-431d-8596-1ad15506e951/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/emiliahult/clip/RichTenaciousSandstormThunBeast-uA1z9H3Qtw_2572B" },
      { slug: "ProtectiveEndearingMagpieOpieOP-ILg70POV0FKo2dLA", title: "haha", viewCount: 5197, duration: 28, createdAt: "2023-05-05T15:48:42Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/5a5339aa-063d-4428-b96b-b358cc63ed04/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/emiliahult/clip/ProtectiveEndearingMagpieOpieOP-ILg70POV0FKo2dLA" },
    ],
  },
  {
    handle: "yacine",
    name: "Yacine",
    realName: "Yacine Laghmari",
    meta: "Twitch · Counter-Strike & variety",
    blurb: "Tidigare svensk professionell Counter-Strike-spelare som blivit en av de mest följda svenska streamarna. Känd för högklassigt CS-spel och underhållande sändningar.",
    bio: "Yacine Laghmari, känd online som Yacine (tidigare yzn), är en svensk före detta professionell Counter-Strike-spelare född 1996 som gått över till en framgångsrik karriär som Twitch-streamer. Han sänder framför allt Counter-Strike och har tagit med sig sin tävlingsbakgrund in i underhållande och skickligt spel inför en stor svensk publik. Med över 180 000 följare hör han till de mest följda svenska kanalerna och är ett välkänt namn i den nordiska CS-communityn.",
    highlights: [
      "Över 180 000 följare på Twitch",
      "Tidigare professionell Counter-Strike-spelare",
      "En av de mest följda svenska kanalerna",
      "Känd för högklassigt och underhållande CS-spel",
      "Etablerad profil i den nordiska CS-communityn"
    ],
    image: "https://unavatar.io/twitch/yacine",
    attribution: "Twitch / @yacine",
    attributionUrl: "https://www.twitch.tv/yacine",
    language: "sv",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/yacine" },
      { label: "YouTube", url: "https://www.youtube.com/channel/UCiUsmJnv-ja6ceESvqinoGg" }
    ],
    references: [
      { label: "Liquipedia - Yzn", url: "https://liquipedia.net/counterstrike/Yzn", type: "wikipedia" },
      { label: "TwitchTracker - Yacine", url: "https://twitchtracker.com/yacine", type: "tracker" }
    ],
    twitchStats: { followers: 188971, partner: true, createdAt: "2012-06-23T23:25:13.170732Z", lastGame: "League of Legends" },
    youtubeChannelHandle: "UCiUsmJnv-ja6ceESvqinoGg",
    youtubeVideos: [
      { id: "kYi2BMjg_RY", title: "Yacines bidrag till streamerduellen med SJ! (Tack till Karjas för edit!)", published: "2023-11-28T15:34:36+00:00" },
      { id: "WpoP33Um6j0", title: "YZN | GTA V RP - Life as Lion: Episode #5 - Bankkuppen Del 2", published: "2018-01-19T21:35:34+00:00" },
      { id: "Q0CNoTDNrtg", title: "YZN | GTA V RP - Life as Lion: Episode #4 - Bankkuppen Del 1", published: "2018-01-14T17:56:13+00:00" },
      { id: "zu21pjyL6qc", title: "YZN | GTA V RP - Life as Lion: Episode #3 - Rånarligan", published: "2018-01-09T14:33:32+00:00" },
      { id: "e6vckg-y_jg", title: "YZN | GTA V RP - Life as Lion: Episode #2 - Snabba Cash", published: "2018-01-05T15:57:45+00:00" },
      { id: "fNXiu7MkvXk", title: "YZN | GTA V RP - Life as Lion: Episode #1 - Maffian", published: "2018-01-02T13:54:20+00:00" },
    ],
    twitchClips: [
      { slug: "HandsomeSoftKiwiResidentSleeper-8fwCLiQyCJErEjOm", title: "ajaj", viewCount: 12393, duration: 26, createdAt: "2023-06-06T15:23:02Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/7b16c2cf-d059-4b95-a3f5-375c616b9837/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/yacine/clip/HandsomeSoftKiwiResidentSleeper-8fwCLiQyCJErEjOm" },
      { slug: "RelievedRefinedBeanNotATK-4YJ5n9kF2_NBBmZW", title: "Windows moment", viewCount: 11007, duration: 17, createdAt: "2023-09-15T14:34:14Z", game: null, thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/71421212-76bf-42f1-afd5-987d89a6f9ad/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/yacine/clip/RelievedRefinedBeanNotATK-4YJ5n9kF2_NBBmZW" },
      { slug: "TameStylishCroquetteTF2John", title: "ACE ", viewCount: 6089, duration: 47, createdAt: "2020-09-01T12:10:35Z", game: "VALORANT", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/7d0501df-887e-4985-874a-bb62920d0d6f/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/yacine/clip/TameStylishCroquetteTF2John" },
      { slug: "FlaccidRoughHyenaKeepo-tu14SupaJRljZyCS", title: "Självkontroll.", viewCount: 5778, duration: 12, createdAt: "2023-08-31T17:35:34Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/3e0f3f5d-623c-4a14-bff6-6ca4ca3d4a07/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/yacine/clip/FlaccidRoughHyenaKeepo-tu14SupaJRljZyCS" },
      { slug: "SeductiveCuriousReubenKippa-gW-DxcATfcpcE77j", title: "Patricia <3 ", viewCount: 4151, duration: 17, createdAt: "2023-09-04T13:53:54Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/799933fb-a920-4dc0-89c3-2b6c0ad8443c/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/yacine/clip/SeductiveCuriousReubenKippa-gW-DxcATfcpcE77j" },
      { slug: "CarelessYummyCasetteSaltBae", title: "hög iq", viewCount: 4021, duration: 21, createdAt: "2019-10-19T16:37:30Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/c5f95051-5714-4361-84c8-216eb92056b4/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/yacine/clip/CarelessYummyCasetteSaltBae" },
    ],
  },
  {
    handle: "sampev2",
    name: "SampeV2",
    realName: "Samuel",
    meta: "Twitch · YouTube · gaming & variety",
    blurb: "Svensk gaming-creator och en av de mest följda svenska kanalerna på Twitch. Populär bland en ung svensk publik med varierat spelinnehåll.",
    bio: "SampeV2, med förnamnet Samuel, är en svensk gaming-creator som hör till de mest följda svenskspråkiga kanalerna på Twitch. Han har byggt en stor publik kring varierat spelinnehåll och är särskilt populär bland yngre svenska tittare. Med nära 200 000 följare och en aktiv närvaro på både Twitch och YouTube är han ett etablerat namn i den svenska streaming-scenen.",
    highlights: [
      "Nära 200 000 följare på Twitch",
      "En av de mest följda svenskspråkiga kanalerna",
      "Populär bland en ung svensk publik",
      "Aktiv på både Twitch och YouTube",
      "Varierat gaminginnehåll"
    ],
    image: "https://unavatar.io/twitch/sampev2",
    attribution: "Twitch / @sampev2",
    attributionUrl: "https://www.twitch.tv/sampev2",
    language: "sv",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/sampev2" }
    ],
    references: [
      { label: "Streams Charts - SampeV2", url: "https://streamscharts.com/channels/sampev2", type: "tracker" },
      { label: "TwitchTracker - mest följda svenska", url: "https://twitchtracker.com/channels/most-followers/swedish", type: "tracker" }
    ],
    twitchStats: { followers: 202551, partner: true, createdAt: "2013-06-15T14:11:21.594018Z", lastGame: "Pokémon Trading Card Game" },
    twitchClips: [
      { slug: "PiercingAdorableShrimpANELE", title: "DYRASTE I HELA SPELET hahahaha", viewCount: 8197, duration: 30, createdAt: "2017-12-09T17:33:12Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/2eb3d8b6-ee98-4c15-bb09-18e7091f0f75/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/sampev2/clip/PiercingAdorableShrimpANELE" },
      { slug: "EntertainingArtsyPizzaMikeHogu", title: "sjuk 3k", viewCount: 3721, duration: 30, createdAt: "2017-10-27T21:15:22Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/2476b1d0-494a-4c66-9413-643009d0e103/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/sampev2/clip/EntertainingArtsyPizzaMikeHogu" },
      { slug: "InnocentOriginalLapwingKAPOW", title: "JAG HAR ALDRIG FÅTT KNIV.....", viewCount: 2642, duration: 30, createdAt: "2017-12-05T20:14:28Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/f85cbb23-52dd-4bce-96de-76311c8caf22/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/sampev2/clip/InnocentOriginalLapwingKAPOW" },
      { slug: "LivelyPlausibleWafflePJSalt-p2sEq55NURYXzmux", title: "Svar på tal ", viewCount: 2150, duration: 59, createdAt: "2024-04-07T17:45:26Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/ce161597-48c7-46d7-ac36-29b563f73b31/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/sampev2/clip/LivelyPlausibleWafflePJSalt-p2sEq55NURYXzmux" },
      { slug: "AlluringAlertLettuceStoneLightning-yMnL0m9eJLqT2oWe", title: "Roidsv2 besegrad av Yacine", viewCount: 1502, duration: 31, createdAt: "2024-04-07T17:31:14Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/6a49a396-2c7c-4f6b-833f-71780666cff8/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/sampev2/clip/AlluringAlertLettuceStoneLightning-yMnL0m9eJLqT2oWe" },
      { slug: "PlayfulObservantBillSSSsss", title: "when you try your best but you don't succed..", viewCount: 1316, duration: 30, createdAt: "2017-10-29T20:46:08Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/d59a3f07-46cb-4036-8c74-87d4dfc22fc2/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/sampev2/clip/PlayfulObservantBillSSSsss" },
    ],
  },
  {
    handle: "nooor",
    name: "Nooor",
    meta: "Twitch · variety · VALORANT & Just Chatting",
    blurb: "Svensk variety-streamer som hör till de mest sedda svenska kanalerna. Känd för VALORANT och varierat innehåll med en aktiv community.",
    bio: "Nooor är en svensk variety-streamer som under senare tid hört till de mest sedda svenska kanalerna på Twitch. Innehållet kretsar kring VALORANT och varierat spel kombinerat med Just Chatting, och hon har byggt en aktiv och engagerad svensk community. Med en stark närvaro i topplistorna över svenska streamers är hon en av de mer framträdande nya profilerna i den svenska scenen.",
    highlights: [
      "Återkommande topp-tre bland mest sedda svenska Twitch-streamers senaste tiden",
      "Variety-streamer med VALORANT som huvudfokus",
      "Aktiv och engagerad svensk community",
      "Framträdande ny profil i den svenska streaming-scenen"
    ],
    image: "https://unavatar.io/twitch/nooor",
    attribution: "Twitch / @nooor",
    attributionUrl: "https://www.twitch.tv/nooor",
    language: "sv",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/nooor" }
    ],
    references: [
      { label: "Streams Charts - mest sedda svenska", url: "https://streamscharts.com/channels?lang=sv", type: "tracker" },
      { label: "Twitch - Nooor", url: "https://www.twitch.tv/nooor", type: "platform" }
    ],
    twitchStats: { followers: 44527, partner: true, createdAt: "2020-03-12T20:13:11.356946Z", lastGame: "Grand Theft Auto V" },
    trackerStats: { avgViewers: 1008, peakViewers: 1774, hoursStreamed: 178 },
    twitchClips: [
      { slug: "RoughCooperativeBulgogiDancingBaby-lGyNQHP9JHlEZYMo", title: "Chase x Margareta jajamensan, där e vi", viewCount: 9794, duration: 13, createdAt: "2025-03-22T21:51:39Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/7def5703-67ae-41d8-9076-d571afe46385/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/nooor/clip/RoughCooperativeBulgogiDancingBaby-lGyNQHP9JHlEZYMo" },
      { slug: "TangentialManlyKaleTBCheesePull", title: "boom", viewCount: 8294, duration: 26, createdAt: "2020-05-30T20:22:32Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/d94f5297-7e45-4471-805a-96a0a855c478/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/nooor/clip/TangentialManlyKaleTBCheesePull" },
      { slug: "BillowingPopularMinkGrammarKing-7IpV0vlFGRHQYTXX", title: "omg wtf", viewCount: 7230, duration: 22, createdAt: "2023-04-25T20:00:59Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/2809a370-06c8-4218-9ec1-11e5684271f9/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/nooor/clip/BillowingPopularMinkGrammarKing-7IpV0vlFGRHQYTXX" },
      { slug: "RelievedTsundereHorseStrawBeary-vbSzP9P4QJIaPT15", title: "Språket...", viewCount: 5726, duration: 6, createdAt: "2025-03-16T18:28:10Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/e254b68e-1c65-4c97-95bb-5801b9f114cb/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/nooor/clip/RelievedTsundereHorseStrawBeary-vbSzP9P4QJIaPT15" },
      { slug: "SpineyTardyReubenCharlieBitMe-r1Z3Dcwkf2ANwp9N", title: "Nicklas Nullar", viewCount: 5683, duration: 12, createdAt: "2025-05-23T20:09:12Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/b1ee061f-0517-4e04-aa79-ca2be6fdb4d0/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/nooor/clip/SpineyTardyReubenCharlieBitMe-r1Z3Dcwkf2ANwp9N" },
      { slug: "SucculentInexpensiveOxBibleThump-eozQ3cc1h88_skfa", title: "Dealer säger \"Din pappa\" till Noor..", viewCount: 5166, duration: 27, createdAt: "2023-03-12T23:20:00Z", game: "Slots", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/bf2c0da3-9fef-4e40-b228-bdeabd87f7be/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/nooor/clip/SucculentInexpensiveOxBibleThump-eozQ3cc1h88_skfa" },
    ],
  },
];
