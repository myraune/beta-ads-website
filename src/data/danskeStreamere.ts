import type { CreatorProfile } from "@/data/norskeStreamere";

/**
 * Denmark streamer-datasett. Twitch-stats + klipp hentet fra Twitchs
 * offentlige GQL; bios/høydepunkter fra websearch-research. Bilder = Twitch-
 * profilbilde (unavatar). YouTube/presse legges til i neste fase.
 */
export const CREATORS: CreatorProfile[] = [
  {
    handle: "jaxstyle",
    name: "Jaxstyle",
    realName: "Jacob Krull",
    meta: "Twitch · YouTube · varieret gaming, IRL og musik",
    blurb: "En af Danmarks allerstoerste Twitch-skabere med reaktioner, gaming og IRL-indhold, samt en parallel karriere som DJ og musikproducer.",
    bio: "Jaxstyle, der i virkeligheden hedder Jacob Krull, er en af Danmarks mest fulgte Twitch-streamere og blev allerede i 2016 den yngste danske Twitch-partner nogensinde. Hans kanal bygger paa et bredt indhold med reaktioner, gameplay og IRL-streams, der appellerer til et stort ungt publikum. Ved siden af streaming har han skabt sig et navn paa den danske elektroniske musikscene som DJ og producer. Han kombinerer underholdning og musik paa en maade, der goer ham til en genkendelig figur i dansk online-kultur.",
    highlights: [
      "Cirka 300.000 foelgere paa Twitch",
      "Blev den yngste danske Twitch-partner nogensinde i 2016",
      "Aktiv DJ og musikproducer paa den danske elektroniske scene",
      "Stort folge paa tvaers af Twitch, YouTube og Instagram"
    ],
    image: "https://unavatar.io/twitch/jaxstyle",
    attribution: "Twitch / @jaxstyle",
    attributionUrl: "https://www.twitch.tv/jaxstyle",
    language: "da",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/jaxstyle" },
      { label: "Instagram", url: "https://www.instagram.com/jaxstyle1337/" }
    ],
    references: [
      { label: "Twitch-profil", url: "https://www.twitch.tv/jaxstyle", type: "platform" },
      { label: "TwitchTracker statistik", url: "https://twitchtracker.com/jaxstyle", type: "tracker" }
    ],
    twitchStats: { followers: 304349, partner: true, createdAt: "2014-07-03T18:04:34.241191Z", lastGame: "IRL" },
    trackerStats: { avgViewers: 637, peakViewers: 1487, hoursStreamed: 83 },
    youtubeChannelHandle: "JaxstyleProductions",
    youtubeVideos: [
      { id: "VsxVCcZMYPg", title: "Minecraft med Caroline!", published: "2023-05-04T13:00:31+00:00" },
      { id: "Tt0LN_aL9iI", title: "Hvad vi ved om det nye Counter Strike... (Source 2)", published: "2023-03-09T14:00:22+00:00" },
      { id: "6Q57zWUqf0o", title: "Andreas Hauge og Agge lærer mig Fornite!", published: "2023-02-28T15:00:03+00:00" },
      { id: "mki2s3tuUzQ", title: "DET MEST INTENSE CSGO GAME!", published: "2023-02-26T11:02:01+00:00" },
      { id: "nOy6I4Gv9Ro", title: "JAXSTYLE SPILER HUMAN FALL FLAT!", published: "2023-02-02T14:00:25+00:00" },
      { id: "GwoKgkmEz5w", title: "JAXSTYLE SPILLER ZERO BUILD FORTNITE!", published: "2023-02-01T14:00:07+00:00" },
    ],
    twitchClips: [
      { slug: "JazzyElegantVelociraptorEleGiggle-4-S1rqu-tnXyiSkg", title: "crazy behaviour", viewCount: 34368, duration: 59, createdAt: "2023-12-27T23:31:50Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/03d32789-5454-4ff6-8ec6-f1804cb3a161/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jaxstyle/clip/JazzyElegantVelociraptorEleGiggle-4-S1rqu-tnXyiSkg" },
      { slug: "TriangularFastCaribouPipeHype-yj5Bj-ovtBgocXr8", title: ":)", viewCount: 28786, duration: 28, createdAt: "2022-12-21T22:35:12Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/5f3cedc7-56cd-4d92-91eb-dd6f1fffda58/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jaxstyle/clip/TriangularFastCaribouPipeHype-yj5Bj-ovtBgocXr8" },
      { slug: "AdorableAssiduousMilkEleGiggle-o5GcSZjQH-jAfjo8", title: "benja slår kisoan i balls", viewCount: 18537, duration: 5, createdAt: "2022-06-22T18:24:44Z", game: "Music", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/70a7cafe-2151-4691-96b4-0e6220a6e563/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jaxstyle/clip/AdorableAssiduousMilkEleGiggle-o5GcSZjQH-jAfjo8" },
      { slug: "DirtyWildLyrebirdPhilosoraptor-x8jXPbuP3_j8_kZ_", title: "Klamydia", viewCount: 18445, duration: 48, createdAt: "2022-01-11T12:34:43Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/fc5aa8b0-9fe4-4525-86ba-3a89976d1f6b/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jaxstyle/clip/DirtyWildLyrebirdPhilosoraptor-x8jXPbuP3_j8_kZ_" },
      { slug: "ColorfulMiniatureEchidnaVoteYea-9MJn1CqbUTlI7TRa", title: "NARKO MOVES!!!!", viewCount: 13876, duration: 30, createdAt: "2022-08-26T19:36:53Z", game: "Music", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/412f23d3-8a55-49d6-9f8b-a3044accd1ac/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jaxstyle/clip/ColorfulMiniatureEchidnaVoteYea-9MJn1CqbUTlI7TRa" },
      { slug: "BoredRelatedDogChocolateRain-NPc1ynPg70cVv79j", title: "Var det Ayas fødder?", viewCount: 13213, duration: 4, createdAt: "2021-12-31T21:32:17Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/40931d23-cb9b-456e-9a88-f46542bb6dd0/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jaxstyle/clip/BoredRelatedDogChocolateRain-NPc1ynPg70cVv79j" },
    ],
  },
  {
    handle: "sondergaardlol",
    name: "SondergaardLol",
    realName: "Rasmus Soendergaard",
    meta: "Twitch · League of Legends · highelo solo queue",
    blurb: "Et kendt navn paa dansk Twitch og en af Europas staerkeste League of Legends solo queue-spillere med konstant hoeje seertal.",
    bio: "Rasmus Soendergaard, kendt som SondergaardLol, er en af de mest sete danske Twitch-streamere og en fast del af den danske League of Legends-scene. Han regnes blandt Europas bedste solo queue-spillere og tiltraekker et stort, loyalt publikum, der foelger med i hans hoejt rangerede gameplay. Hans kanal har gentagne gange ligget i toppen af de mest sete danske kanaler maalt paa samlede seertimer. Med sin kombination af elite-niveau og underholdning er han en central figur i dansk competitive gaming.",
    highlights: [
      "Over 270.000 foelgere paa Twitch",
      "Jaevnligt den mest sete danske streamer maalt paa seertimer",
      "Regnes blandt Europas bedste League of Legends solo queue-spillere",
      "Profileret som atlet hos Red Bull"
    ],
    image: "https://unavatar.io/twitch/sondergaardlol",
    attribution: "Twitch / @sondergaardlol",
    attributionUrl: "https://www.twitch.tv/sondergaardlol",
    language: "da",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/sondergaardlol" }
    ],
    references: [
      { label: "Red Bull atletprofil", url: "https://www.redbull.com/us-en/athlete/rasmus-sondergaard", type: "official-site" },
      { label: "TwitchTracker statistik", url: "https://twitchtracker.com/sondergaardlol", type: "tracker" }
    ],
    twitchStats: { followers: 271977, partner: true, createdAt: "2017-01-25T19:18:59.234925Z", lastGame: "IRL" },
    trackerStats: { avgViewers: 2425, peakViewers: 7543, hoursStreamed: 69 },
    youtubeChannelHandle: "UCbJlVPh9pZWtaOTAfp1Owmg",
    youtubeVideos: [
      { id: "81VyTrEr6nc", title: "SKAL JEG MAIN JUNGLE FREMOVER?", published: "2025-08-22T14:21:49+00:00" },
      { id: "KrULBQEv4A0", title: "DET MÆRKELIGSTE GAME I ÅR", published: "2025-08-19T13:42:41+00:00" },
      { id: "LBIpK4AC6XA", title: "JEG FIK JUNGLE AUTOFILL...", published: "2025-08-11T15:07:36+00:00" },
      { id: "KaEo0oOiTak", title: "DE VAR 3 SEKUNDER FRA AT VINDE", published: "2025-07-24T13:00:37+00:00" },
      { id: "mgH0bIk-bKg", title: "WENDEL OG JEG SPILLER MED BOTS", published: "2025-07-18T15:35:35+00:00" },
      { id: "FsudQgJ7RXk", title: "KAN MIN LISSANDRA RAMME CHAL?", published: "2025-07-14T14:51:49+00:00" },
    ],
    twitchClips: [
      { slug: "BeautifulEndearingLadiesDeIlluminati-zYxIR7Ixu-AjojZS", title: "Gilli kommer? WTF", viewCount: 50712, duration: 11, createdAt: "2025-10-17T19:57:33Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/03659ec2-b404-45f9-9570-5bb270de1169/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/sondergaardlol/clip/BeautifulEndearingLadiesDeIlluminati-zYxIR7Ixu-AjojZS" },
      { slug: "HeartlessBetterGoldfishPogChamp-jyvKhygMVJ4DdTD2", title: "rip belos hånd", viewCount: 45258, duration: 17, createdAt: "2025-10-15T03:47:57Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/8d7b1422-a310-48dd-9c87-3b06dc3f0d9b/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/sondergaardlol/clip/HeartlessBetterGoldfishPogChamp-jyvKhygMVJ4DdTD2" },
      { slug: "StrongAlertAsteriskOMGScoots-KV2f0yUosuP4FDuc", title: "Wendel møder Lars Løkke", viewCount: 42124, duration: 59, createdAt: "2025-10-15T15:21:58Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/5371ae46-a007-4b77-82ed-d4e3ea78a05f/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/sondergaardlol/clip/StrongAlertAsteriskOMGScoots-KV2f0yUosuP4FDuc" },
      { slug: "SillyBitterNostrilSaltBae-oYUrI83Mk6Oc0vIF", title: "hvad fanden sker der", viewCount: 38510, duration: 17, createdAt: "2025-10-19T22:43:09Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/79fb6ab0-f6ff-4d23-b250-4effba3cb596/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/sondergaardlol/clip/SillyBitterNostrilSaltBae-oYUrI83Mk6Oc0vIF" },
      { slug: "HilariousTangibleCookieWOOP-k_GNORR9cjBzHpo6", title: "HVAD KIGGER LOKE PÅ?", viewCount: 27006, duration: 10, createdAt: "2025-10-15T19:31:14Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/2e45aba7-0b85-41a0-955d-8ff3bdd0f1a3/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/sondergaardlol/clip/HilariousTangibleCookieWOOP-k_GNORR9cjBzHpo6" },
      { slug: "VastColdHorseradishCoolStoryBob-FYTu8ku_c019QIVx", title: "øv", viewCount: 25088, duration: 57, createdAt: "2023-06-18T15:05:51Z", game: "Only Up!", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/82a44c1b-c522-4979-81ae-fb89a9692403/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/sondergaardlol/clip/VastColdHorseradishCoolStoryBob-FYTu8ku_c019QIVx" },
    ],
  },
  {
    handle: "marckozhd",
    name: "MarckozHD",
    meta: "Twitch · YouTube · EA Sports FC og fodboldgaming",
    blurb: "En af Danmarks stoerste gaming-skabere med fokus paa EA Sports FC og fodboldspil, med et bredt foelge paa tvaers af platforme.",
    bio: "MarckozHD er en af de mest fulgte danske gaming-skabere og har bygget en stor kanal op omkring fodboldspil som EA Sports FC. Han er kendt for sit energiske indhold og sin store raekkevidde blandt unge danske gamere. Ud over Twitch har han et betydeligt publikum paa YouTube, hvor han deler gameplay og underholdning. Han hoerer til den haandfuld danske skabere, der konsekvent ligger i toppen maalt paa foelgere.",
    highlights: [
      "Cirka 290.000 foelgere paa Twitch",
      "En af Danmarks stoerste skabere inden for fodboldgaming",
      "Stort publikum paa tvaers af Twitch og YouTube"
    ],
    image: "https://unavatar.io/twitch/marckozhd",
    attribution: "Twitch / @marckozhd",
    attributionUrl: "https://www.twitch.tv/marckozhd",
    language: "da",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/marckozhd" }
    ],
    references: [
      { label: "Twitch-profil", url: "https://www.twitch.tv/marckozhd", type: "platform" },
      { label: "TwitchTracker statistik", url: "https://twitchtracker.com/marckozhd", type: "tracker" }
    ],
    twitchStats: { followers: 285645, partner: true, createdAt: "2012-08-10T22:15:31.119936Z", lastGame: "Just Chatting" },
  },
  {
    handle: "mariuscow",
    name: "MariusCOW",
    realName: "Marius Wendt",
    meta: "Twitch · Fortnite · esport og competitive gaming",
    blurb: "Dansk Fortnite-talent og competitive spiller, der kombinerer turneringsspil paa hoejt niveau med underholdende streams.",
    bio: "Marius Wendt, kendt som MariusCOW, er en ung dansk Fortnite-spiller og streamer, der har gjort sig bemaerket paa den competitive scene. Han har repraesenteret esport-organisationer og kombinerer turneringsspil med live-streaming for sit publikum. Med over 150.000 foelgere er han en af de mest fulgte danske Fortnite-skabere. Hans kanal henvender sig til et ungt publikum, der foelger baade hans gameplay og hans turneringspraestationer.",
    highlights: [
      "Over 150.000 foelgere paa Twitch",
      "Competitive Fortnite-spiller med organisationstilknytning",
      "En af Danmarks mest fulgte Fortnite-skabere",
      "Profil paa Esports Charts og Liquipedia"
    ],
    image: "https://unavatar.io/twitch/mariuscow",
    attribution: "Twitch / @mariuscow",
    attributionUrl: "https://www.twitch.tv/mariuscow",
    language: "da",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/mariuscow" }
    ],
    references: [
      { label: "Esports Charts spillerprofil", url: "https://escharts.com/players/mariuscow", type: "tracker" },
      { label: "Liquipedia Fortnite", url: "https://liquipedia.net/fortnite/MariusCOW", type: "wikipedia" }
    ],
    twitchStats: { followers: 157198, partner: true, createdAt: "2017-12-09T21:40:31.441407Z", lastGame: "Fortnite" },
    trackerStats: { avgViewers: 110, peakViewers: 222, hoursStreamed: 9 },
    youtubeChannelHandle: "MariusCOW",
    youtubeVideos: [
      { id: "EG2crXPqRog", title: "MariusCOW | Highlights #59", published: "2026-06-26T10:13:55+00:00" },
      { id: "gT_LK1dLzHU", title: "5th Place FNCS Division 1 Finals ($1,500) w/IDrop 🏆", published: "2026-05-25T12:53:25+00:00" },
      { id: "3AfR5l7_5-0", title: "1st Place FNCS Heats (Qualified Grands) w/IDrop 🏆", published: "2026-04-18T14:01:59+00:00" },
      { id: "CkP4xvXD0X0", title: "MariusCOW | Highlights #58 (ft. Pollo & Shxrk)", published: "2026-04-03T13:12:50+00:00" },
      { id: "GT86qlJokgU", title: "1st Place Evaluation Opens (Most Kills) w/IDrop 🏆", published: "2026-03-24T14:24:28+00:00" },
      { id: "lsD_KQSZ1Gc", title: "1st Place Evaluation Finals ($800) w/IDrop 🏆", published: "2026-03-15T14:03:58+00:00" },
    ],
    twitchClips: [
      { slug: "CovertPopularLardRuleFive-XT2yybpEZPz5lf3s", title: "nvidia settings 28.02.24", viewCount: 27824, duration: 14, createdAt: "2024-02-28T20:39:22Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/c7035e99-a7ab-4b66-9ef6-ed89e329a616/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mariuscow/clip/CovertPopularLardRuleFive-XT2yybpEZPz5lf3s" },
      { slug: "EnergeticHelpfulCiderFUNgineer-vNWeyNBBEBP7mOpW", title: "settings", viewCount: 27437, duration: 32, createdAt: "2024-03-01T15:55:58Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/f67a49c4-dc71-4244-b97d-34e633db09f6/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mariuscow/clip/EnergeticHelpfulCiderFUNgineer-vNWeyNBBEBP7mOpW" },
      { slug: "CheerfulGoodPeppermintOSsloth-LD6Snas7DUwBaAOl", title: "updated settings 20/06/25", viewCount: 20215, duration: 40, createdAt: "2025-06-20T18:08:19Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/52cf79ae-28e0-406a-a7ae-ca0768a53de6/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mariuscow/clip/CheerfulGoodPeppermintOSsloth-LD6Snas7DUwBaAOl" },
      { slug: "BoxyAbrasiveSkunkDogFace-_BLelZwjh7oZ30mJ", title: "nvidia settings 15.7.2024", viewCount: 16038, duration: 9, createdAt: "2024-07-15T19:53:12Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/6332bb32-d7d5-4f9a-8bf4-6c1fab3f93b6/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mariuscow/clip/BoxyAbrasiveSkunkDogFace-_BLelZwjh7oZ30mJ" },
      { slug: "AdventurousManlyHareKippa-QzcGyd8HmmRPuR9u", title: "nvidia settings 20/06/25", viewCount: 15561, duration: 4, createdAt: "2025-06-20T18:09:43Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/6371a4fa-a292-4048-a53f-a0ec5bf33418/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mariuscow/clip/AdventurousManlyHareKippa-QzcGyd8HmmRPuR9u" },
      { slug: "IronicBlightedMinkGOWSkull-P4dUXxjcYAb16gKR", title: "marius settings", viewCount: 8701, duration: 13, createdAt: "2023-08-26T18:31:00Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/8df3554c-6ea7-4e0c-a6ca-739b7dc98bb1/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mariuscow/clip/IronicBlightedMinkGOWSkull-P4dUXxjcYAb16gKR" },
    ],
  },
  {
    handle: "markus_jimbo",
    name: "markus_jimbo",
    realName: "Markus",
    meta: "Twitch · varieret gaming · ung dansk skaber",
    blurb: "Ung dansk streamer med et stort foelge, der laver variereret gaming-indhold paa dansk for et trofast publikum.",
    bio: "markus_jimbo er en ung dansk Twitch-streamer, der har samlet et stort publikum omkring sit varierede gaming-indhold. Han streamer paa dansk og inviterer sine seere med paa rejsen, som han selv beskriver det i sin profil. Med naesten 150.000 foelgere hoerer han til de mest fulgte danske kanaler. Hans indhold appellerer saerligt til et ungt dansk gaming-publikum.",
    highlights: [
      "Naesten 150.000 foelgere paa Twitch",
      "En af de mest fulgte danske gaming-kanaler",
      "Streamer konsekvent paa dansk for et ungt publikum"
    ],
    image: "https://unavatar.io/twitch/markus_jimbo",
    attribution: "Twitch / @markus_jimbo",
    attributionUrl: "https://www.twitch.tv/markus_jimbo",
    language: "da",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/markus_jimbo" }
    ],
    references: [
      { label: "Twitch-profil", url: "https://www.twitch.tv/markus_jimbo", type: "platform" },
      { label: "TwitchTracker statistik", url: "https://twitchtracker.com/markus_jimbo", type: "tracker" }
    ],
    twitchStats: { followers: 7837, partner: false, createdAt: "2017-07-08T23:03:31.179259Z", lastGame: "Counter-Strike" },
    twitchClips: [
      { slug: "DarkPlacidDolphinDansGame-iFY-Efcz84gSNxOh", title: "hun lovede ham s*x", viewCount: 333, duration: 60, createdAt: "2024-04-20T22:35:59Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/fa46e922-0464-4f4f-9948-5001e972bdd3/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/markus_jimbo/clip/DarkPlacidDolphinDansGame-iFY-Efcz84gSNxOh" },
      { slug: "InspiringRepleteMosquitoPanicBasket-aG9zjoMi4fSjReqz", title: "hvad sker der ", viewCount: 224, duration: 9, createdAt: "2022-06-18T02:52:10Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/4a2f102c-7bf6-4ca4-8a92-7ad701b9114c/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/markus_jimbo/clip/InspiringRepleteMosquitoPanicBasket-aG9zjoMi4fSjReqz" },
      { slug: "HomelyFlirtyOilCmonBruh-lDkcp8WUklO0xoY6", title: "dør", viewCount: 144, duration: 11, createdAt: "2022-06-18T03:08:16Z", game: "Golf With Your Friends", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/14561ce5-3184-437c-96e4-741dc047f0fd/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/markus_jimbo/clip/HomelyFlirtyOilCmonBruh-lDkcp8WUklO0xoY6" },
      { slug: "BlushingBusyHamsterOSfrog-dj7o5jjA0NhX_huA", title: "headshot noscope", viewCount: 114, duration: 60, createdAt: "2024-02-07T20:32:27Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/15e0164a-40c6-4ab9-a707-17cdcdfd0112/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/markus_jimbo/clip/BlushingBusyHamsterOSfrog-dj7o5jjA0NhX_huA" },
      { slug: "TolerantElatedPelicanCclamChamp-gvOGiKxgFTGA6wAy", title: "Hejjj:D !discord !rank", viewCount: 87, duration: 28, createdAt: "2022-06-15T20:24:39Z", game: "Business Tour", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/29b16efe-1894-4c4f-a12d-3a8a38d18d2c/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/markus_jimbo/clip/TolerantElatedPelicanCclamChamp-gvOGiKxgFTGA6wAy" },
      { slug: "NimbleCrypticAxeTebowing-ku-DcIJMkquAWsj2", title: "DAUS INCOMING!", viewCount: 85, duration: 5, createdAt: "2022-08-04T17:50:12Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/a21ec6d8-3997-40fe-9a53-4db1500c58e2/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/markus_jimbo/clip/NimbleCrypticAxeTebowing-ku-DcIJMkquAWsj2" },
    ],
  },
  {
    handle: "jkfifa",
    name: "JKFIFA",
    realName: "Jakob Kristensen",
    meta: "Twitch · YouTube · TikTok · EA Sports FC og fodbold",
    blurb: "Danmarks FIFA-konge og en af de stoerste gaming-skabere for unge maend med fokus paa fodboldspil og fodboldkultur.",
    bio: "Jakob Kristensen, bedre kendt som JKFIFA, er en af Danmarks stoerste gaming-skabere og kaldes ofte landets FIFA-konge. Hans indhold paa Twitch, YouTube og TikTok kredser om hans passion for FIFA og EA Sports FC samt fodbold generelt. Han henvender sig til et stort ungt mandligt publikum og er repraesenteret af Bark Agency. Med over 120.000 Twitch-foelgere og et samlet folge paa flere hundrede tusinde er han et af de stoerste navne inden for dansk fodboldgaming.",
    highlights: [
      "Over 120.000 foelgere paa Twitch",
      "Over 300.000 foelgere paa tvaers af platforme",
      "Omtales som Danmarks FIFA-konge",
      "Repraesenteret af Bark Agency"
    ],
    image: "https://unavatar.io/twitch/jkfifa",
    attribution: "Twitch / @jkfifa",
    attributionUrl: "https://www.twitch.tv/jkfifa",
    language: "da",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/jkfifa" },
      { label: "YouTube", url: "https://www.youtube.com/channel/UCp4Xer5gEK8yc-loStaAqyg" },
      { label: "Facebook", url: "https://www.facebook.com/JKFIFA/" }
    ],
    references: [
      { label: "Bark Agency talentprofil", url: "https://barkagency.dk/JK/", type: "agency" },
      { label: "TwitchTracker statistik", url: "https://twitchtracker.com/jkfifa", type: "tracker" }
    ],
    twitchStats: { followers: 122707, partner: true, createdAt: "2014-11-03T16:03:39.260488Z", lastGame: "Just Chatting" },
    trackerStats: { avgViewers: 352, peakViewers: 740, hoursStreamed: 15 },
    youtubeChannelHandle: "UCp4Xer5gEK8yc-loStaAqyg",
    youtubeVideos: [
      { id: "OZOXvJlSoOU", title: "11 VM kort bestemmer mit FC26 hold!", published: "2026-06-25T13:39:08+00:00" },
      { id: "5DTAsvY5rQs", title: "En 127 (128) rated Draft Challenge med spænding helt til sidst!", published: "2026-06-20T12:00:11+00:00" },
      { id: "N82MXz3YEvM", title: "96 Maradona og Froholdt DOMINERER alt! - DRAFT TIL GLORY #37", published: "2026-06-18T15:08:59+00:00" },
      { id: "W-WuBBbZY9U", title: "Jeg prøvede det helt nye VM gamemode i FC26!", published: "2026-06-17T14:00:23+00:00" },
      { id: "f8bJL1-J9GM", title: "Draft men jeg må kun tage VM 2026 spillere!", published: "2026-06-15T14:58:06+00:00" },
      { id: "qW4rnnx_LhQ", title: "96 Bradley Barcola er alt for god!- DRAFT TIL GLORY #36", published: "2026-06-11T14:45:15+00:00" },
    ],
    twitchClips: [
      { slug: "CaringCourageousBillWoofer-HOHVd9YtSN2nIMCN", title: "1234567890", viewCount: 2065, duration: 59, createdAt: "2022-05-20T18:19:36Z", game: "FIFA 22", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/df18c431-a2f5-4013-b091-b4245df26c3f/landscape/thumb/thumb-0000000000-1600x900.jpg", url: "https://www.twitch.tv/jkfifa/clip/CaringCourageousBillWoofer-HOHVd9YtSN2nIMCN" },
      { slug: "GiantMotionlessLyrebirdJonCarnage-ThcGTzB91ZDcTNLf", title: "Walkout Bernardo", viewCount: 1357, duration: 14, createdAt: "2024-09-18T18:25:17Z", game: "EA Sports FC 25", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/f55f89e3-4321-4a5e-8358-a9fac9cbe34f/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jkfifa/clip/GiantMotionlessLyrebirdJonCarnage-ThcGTzB91ZDcTNLf" },
      { slug: "ResoluteUninterestedPlumberAMPTropPunch-vv1xalJYvunCPSTL", title: "🔥FIFA 23 100.000 FIFA POINTS PACKOPENING🔥!sub !merch #Reklame", viewCount: 1121, duration: 26, createdAt: "2022-09-24T17:19:42Z", game: "FIFA 23", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/28f3e36f-c37d-4ac6-935b-740158c8d136/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jkfifa/clip/ResoluteUninterestedPlumberAMPTropPunch-vv1xalJYvunCPSTL" },
      { slug: "ImpartialDeliciousAdminYouDontSay-gYrMIfG-HmpoYYu9", title: "Jk packer R9", viewCount: 1077, duration: 26, createdAt: "2022-01-16T19:04:35Z", game: "FIFA 22", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/a2c7710d-9e36-4c3b-a433-3354701642b4/landscape/thumb/thumb-0000000000-1600x900.jpg", url: "https://www.twitch.tv/jkfifa/clip/ImpartialDeliciousAdminYouDontSay-gYrMIfG-HmpoYYu9" },
      { slug: "BumblingHelplessTigerSpicyBoy-2Uer7HVxsuD9KUhv", title: "JK packer Bellingham", viewCount: 869, duration: 26, createdAt: "2024-05-17T17:32:46Z", game: "EA Sports FC 24", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/e478576d-f72e-4420-9cff-7358979320db/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jkfifa/clip/BumblingHelplessTigerSpicyBoy-2Uer7HVxsuD9KUhv" },
      { slug: "ElegantMuddyLobsterDerp-DgWczsWBamOJBffK", title: "TOTY LUCY BRONZE!!!!", viewCount: 825, duration: 60, createdAt: "2025-01-25T20:20:43Z", game: "EA Sports FC 25", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/e00a54f5-ab3f-4286-97e3-8704994c3ba8/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jkfifa/clip/ElegantMuddyLobsterDerp-DgWczsWBamOJBffK" },
    ],
  },
  {
    handle: "mariewatson",
    name: "MarieWatson",
    realName: "Marie Watson",
    meta: "Twitch · gaming · mental sundhed og community",
    blurb: "En af Danmarks mest fulgte kvindelige streamere, kendt for gaming kombineret med aabenhed om mental sundhed og ADHD.",
    bio: "Marie Watson er en af Danmarks mest fulgte kvindelige Twitch-streamere og en markant stemme i det danske gaming-community. Ud over gaming er hun kendt for sin aabenhed om mental sundhed og ADHD, hvilket har gjort hende til en relaterbar figur for mange seere. Hun har desuden skrevet boger og deltaget i dansk tv-underholdning. Med over 120.000 foelgere kombinerer hun underholdning med et tydeligt fokus paa community og trivsel.",
    highlights: [
      "Over 120.000 foelgere paa Twitch",
      "En af Danmarks stoerste kvindelige streamere",
      "Forfatter og deltager i dansk tv-underholdning",
      "Kendt for fokus paa mental sundhed og ADHD"
    ],
    image: "https://unavatar.io/twitch/mariewatson",
    attribution: "Twitch / @mariewatson",
    attributionUrl: "https://www.twitch.tv/mariewatson",
    language: "da",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/mariewatson" },
      { label: "Instagram", url: "https://www.instagram.com/mariewatsondk/" }
    ],
    references: [
      { label: "Instagram", url: "https://www.instagram.com/mariewatsondk/", type: "platform" },
      { label: "TwitchTracker statistik", url: "https://twitchtracker.com/mariewatson", type: "tracker" }
    ],
    twitchStats: { followers: 122001, partner: true, createdAt: "2013-06-16T00:43:25.182709Z", lastGame: "Just Chatting" },
    trackerStats: { avgViewers: 102, peakViewers: 170, hoursStreamed: 61 },
    youtubeChannelHandle: "MarieWatson",
    youtubeVideos: [
      { id: "z4PjN6sgd-k", title: "En opdatering på mine gigt undersøgelser 👉🏻👈🏻 #dansk #gigt", published: "2026-06-16T12:36:29+00:00" },
      { id: "C9xXV1bxvzA", title: "UNBOXER EN MINECRAFT HOODIE! 🐝🥹 #dansk #minecraft #gaming", published: "2026-06-12T12:58:33+00:00" },
      { id: "RAxg1jFF7p0", title: "Hvem skal have bank i Fortnite Monopoly? 💪🏼 #dansk #twitchdanmark #fortnite", published: "2026-06-02T12:32:57+00:00" },
      { id: "2Bm9xqsH2k0", title: "Reklame for DIF | Hvorfor tror du der ikke er mange kvinder i gaming? 🤔 #dansk #gaming", published: "2026-05-27T12:43:07+00:00" },
      { id: "ACglk3cZkQU", title: "Jeg er blevet mærket!? 😳 #dansk #twitchdanmark", published: "2026-05-22T12:34:26+00:00" },
      { id: "Fw2f4H5F74M", title: "Har du en fobi? 😳❤️ #dansk #sygdom #børnegigt", published: "2026-05-21T12:26:48+00:00" },
    ],
    twitchClips: [
      { slug: "SecretiveAbrasiveTrollBloodTrail", title: "Marie bliver våd på stream 18+", viewCount: 18731, duration: 17, createdAt: "2020-09-24T17:06:56Z", game: "Among Us", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/d8c65c56-f234-4831-91ba-609a39812e54/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mariewatson/clip/SecretiveAbrasiveTrollBloodTrail" },
      { slug: "SucculentLittleSowKevinTurtle-IdYljdXLdOhMISUh", title: "røv Marie ", viewCount: 17925, duration: 5, createdAt: "2021-08-26T16:41:04Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/10bf8e80-da25-4a86-a352-d67c1e7714c2/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mariewatson/clip/SucculentLittleSowKevinTurtle-IdYljdXLdOhMISUh" },
      { slug: "CleverAdorableStinkbugCoolStoryBob--ubKAQuX1-rLJhkI", title: "sygeste a## klip dont miss it 18+", viewCount: 14397, duration: 26, createdAt: "2022-04-12T13:15:09Z", game: "Marbles on Stream", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/eec5e249-7567-4635-8fb5-1959cb8f3f88/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mariewatson/clip/CleverAdorableStinkbugCoolStoryBob--ubKAQuX1-rLJhkI" },
      { slug: "MoralAntsyPigeonCoolStoryBob", title: "VILDESTE 18+ MOMENT! BAN?", viewCount: 11972, duration: 4, createdAt: "2020-11-26T19:01:22Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/935887bf-e044-4ccd-a8b9-e703b7b51cf0/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mariewatson/clip/MoralAntsyPigeonCoolStoryBob" },
      { slug: "RenownedDoubtfulSmoothieBudBlast-RLbMkRSeVgHy2i60", title: "Albina får noget \"hvidt\" ansigtet .. se i 0,5x", viewCount: 11247, duration: 17, createdAt: "2023-07-06T20:18:44Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/a7e99931-e234-4ad8-8892-1353a45a70a4/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mariewatson/clip/RenownedDoubtfulSmoothieBudBlast-RLbMkRSeVgHy2i60" },
      { slug: "HeartlessResourcefulCamelDancingBaby-xkhYDNOi5K52CYyM", title: "Marie Assss (18+) Aben fanget i 4k", viewCount: 10667, duration: 7, createdAt: "2021-12-28T14:40:28Z", game: "Fortnite", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/83e0989e-9f2e-4bac-8e12-6cd706d91570/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/mariewatson/clip/HeartlessResourcefulCamelDancingBaby-xkhYDNOi5K52CYyM" },
    ],
  },
  {
    handle: "ellahdk",
    name: "ellahdk",
    meta: "Twitch · varieret gaming · Just Chatting",
    blurb: "Veletableret dansk streamer med et trofast community omkring varieret gaming og Just Chatting siden 2014.",
    bio: "ellahdk er en af de mere veletablerede danske Twitch-streamere med en kanal, der har eksisteret siden 2014. Hun er kendt for sit varierede gaming-indhold og Just Chatting-streams, hvor hun dyrker en taet relation til sit community. Med over 110.000 foelgere hoerer hun til de stoerste kvindelige danske skabere paa platformen. Hendes lange tilstedevaerelse har givet hende et loyalt og engageret publikum.",
    highlights: [
      "Over 110.000 foelgere paa Twitch",
      "Aktiv kanal siden 2014",
      "En af de stoerste kvindelige danske streamere",
      "Trofast community omkring variereret gaming og Just Chatting"
    ],
    image: "https://unavatar.io/twitch/ellahdk",
    attribution: "Twitch / @ellahdk",
    attributionUrl: "https://www.twitch.tv/ellahdk",
    language: "da",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/ellahdk" }
    ],
    references: [
      { label: "Twitch-profil", url: "https://www.twitch.tv/ellahdk", type: "platform" },
      { label: "TwitchTracker statistik", url: "https://twitchtracker.com/ellahdk", type: "tracker" }
    ],
    twitchStats: { followers: 117512, partner: true, createdAt: "2014-09-06T17:02:09.352356Z", lastGame: "Just Chatting" },
    youtubeChannelHandle: "UCpuUBrQfLB3HNtq987AJ4Qw",
    youtubeVideos: [
      { id: "CEpfNBLS8tE", title: "10 år på Twitch – Reaktionsvideo på surprise fra min chat ❤️", published: "2025-08-01T13:09:00+00:00" },
      { id: "AIjhEyQFq0E", title: "Fra Twitch til Major? Vores første kamp som CS-hold!", published: "2025-05-03T11:00:18+00:00" },
      { id: "ofpSMgEvYTc", title: "ELLAHDK REWIND 2024", published: "2025-05-01T17:07:11+00:00" },
      { id: "T15v3vX9m1k", title: "Ny vinder klar til finalen i event 2! (Hunger Games Event)", published: "2025-02-26T11:00:46+00:00" },
      { id: "SXt8TGusQ24", title: "Gaming VOD: SchoolBoy RunAway med ellahdk", published: "2025-02-09T11:32:02+00:00" },
      { id: "__stQ1VJMd8", title: "Ellah Du Er En Baby (Minecraft sang af AndersB2000)", published: "2024-09-13T19:36:51+00:00" },
    ],
    twitchClips: [
      { slug: "DreamyProudArmadilloArgieB8", title: "fritid padcam", viewCount: 6788, duration: 21, createdAt: "2017-05-27T15:10:07Z", game: "IRL", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/6a694113-79d3-4597-a2df-5f5b7cc191ce/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/ellahdk/clip/DreamyProudArmadilloArgieB8" },
      { slug: "IronicConfidentAlpacaPJSugar", title: "Dealer med ondt i ryggen xD", viewCount: 5144, duration: 59, createdAt: "2018-01-15T12:50:35Z", game: "Z1: Battle Royale", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/206fbe9d-9015-4a5f-9c31-32724672cbce/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/ellahdk/clip/IronicConfidentAlpacaPJSugar" },
      { slug: "GrossMiniatureRavenShadyLulu-XnRoCEDMzQC_3yPL", title: "Vinder BB$55 109.000 danske kroner ong", viewCount: 4978, duration: 59, createdAt: "2023-11-04T00:44:03Z", game: "Poker", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/162ac62d-560c-4a26-98c5-74e34564ee01/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/ellahdk/clip/GrossMiniatureRavenShadyLulu-XnRoCEDMzQC_3yPL" },
      { slug: "ConsiderateTrustworthyChoughShadyLulu", title: "Det stive svin", viewCount: 3012, duration: 60, createdAt: "2017-10-07T22:39:04Z", game: "IRL", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/22047bb7-eb5f-492f-bcda-67b58b3907c1/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/ellahdk/clip/ConsiderateTrustworthyChoughShadyLulu" },
      { slug: "AdventurousShakingWatercressPoooound", title: "Ellah laver ASMR", viewCount: 2726, duration: 60, createdAt: "2019-10-01T18:59:56Z", game: "ASMR", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/9488a280-8c8e-453b-8189-1ec86c4c0d48/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/ellahdk/clip/AdventurousShakingWatercressPoooound" },
      { slug: "CreativeFaithfulBaboonCeilingCat-nsjwoJ0m8obPDLWg", title: "Paul del1", viewCount: 2711, duration: 13, createdAt: "2024-04-04T12:19:02Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/2c9e3cf2-4228-40b6-8a1f-52d755d18e22/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/ellahdk/clip/CreativeFaithfulBaboonCeilingCat-nsjwoJ0m8obPDLWg" },
    ],
  },
  {
    handle: "connieheinz",
    name: "ConnieHeinz",
    realName: "Johan",
    meta: "Twitch · GTA · IRL og Just Chatting",
    blurb: "Ung dansk variety-streamer fra Nordjylland med stort engagement omkring GTA, IRL og Just Chatting.",
    bio: "ConnieHeinz, der hedder Johan, er en ung dansk variety-streamer baseret i Nordjylland. Hans kanal byder paa et bredt indhold med blandt andet GTA, Among Us, IRL-streams og Just Chatting, og han er en af de mest sete danske kanaler maalt paa seertimer. Ved siden af streaming studerer han innovation og digitalisering paa Aalborg Universitet. Han har bygget et staerkt engageret community op omkring sit afslappede og personlige indhold.",
    highlights: [
      "Jaevnligt blandt de mest sete danske streamere maalt paa seertimer",
      "Twitch-partner og top-10 dansk kanal",
      "Baseret i Nordjylland og studerer ved Aalborg Universitet",
      "Bredt variety-indhold med GTA, IRL og Just Chatting"
    ],
    image: "https://unavatar.io/twitch/connieheinz",
    attribution: "Twitch / @connieheinz",
    attributionUrl: "https://www.twitch.tv/connieheinz",
    language: "da",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/connieheinz" },
      { label: "TikTok", url: "https://www.tiktok.com/@connieheinz" }
    ],
    references: [
      { label: "Officiel hjemmeside", url: "https://connieheinz.dk/", type: "official-site" },
      { label: "TwitchTracker statistik", url: "https://twitchtracker.com/connieheinz", type: "tracker" }
    ],
    tiktokHandle: "connieheinz",
    twitchStats: { followers: 49788, partner: true, createdAt: "2018-08-07T16:27:08.108022Z", lastGame: "Grand Theft Auto V" },
    trackerStats: { avgViewers: 381, peakViewers: 536, hoursStreamed: 72 },
    youtubeChannelHandle: "UCYe7JU5mFGI6mAHA6aw4pEQ",
    youtubeVideos: [
      { id: "aFmd1AIm5P8", title: "[LIVESTREAM] 😈 AFPRESNING AF BETJENT 😈 OG VAR DE 500.000 KR NOK?! 😈", published: "2026-06-25T22:40:47+00:00" },
      { id: "j4_KMoHrlf8", title: "[LIVESTREAM] 👀 FLEECA BANK HEIST I AFTEN MÅSKE?! 👀 CONNIE HEINZ PÅ SOCIAL RP! 👀", published: "2026-06-24T22:56:01+00:00" },
      { id: "ZLYQBFhugP0", title: "[LIVESTREAM] ❌ FLEECA BANK HEIST I AFTEN? ❌ BYENS MEST SINDSYGE KVINDE ❌ SOCIAL RP ❌", published: "2026-06-22T23:35:59+00:00" },
      { id: "iq5AchqOyFE", title: "[LIVESTREAM] ❌ FLEECA BANK HEIST I AFTEN? ❌ BYENS MEST SINDSYGE KVINDE ❌ SOCIAL RP ❌", published: "2026-06-22T18:13:32+00:00" },
      { id: "H1sFTB8Eqw8", title: "[LIVESTREAM] ☀️ SOL OG VARME ☀️ AFTALER MED MEKANIKERNE ☀️ VIL FOLK ARBEJDE FOR LTH?! ☀️", published: "2026-06-21T21:17:20+00:00" },
      { id: "Qzz0jzALzec", title: "[LIVESTREAM] ❌ OPERATION “OPLYSNINGER” ❌ LTH SHINER LIGE NU ❌", published: "2026-06-18T22:37:31+00:00" },
    ],
    twitchClips: [
      { slug: "RealSecretiveDiamondDendiFace-OlmgTvnMkkqu_BP6", title: "1 mand nede", viewCount: 9020, duration: 14, createdAt: "2022-08-04T23:01:44Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/82993b97-234f-4a6a-93de-5bfd5aa70eb2/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/connieheinz/clip/RealSecretiveDiamondDendiFace-OlmgTvnMkkqu_BP6" },
      { slug: "ThankfulHappyWrenchNerfBlueBlaster-V5yQKxEemjNKmw7B", title: "CONNIE SMADER TRASHERS!!!", viewCount: 5667, duration: 59, createdAt: "2022-11-06T15:06:34Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/ad4c70e4-1539-463b-836b-f9165da5b6ff/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/connieheinz/clip/ThankfulHappyWrenchNerfBlueBlaster-V5yQKxEemjNKmw7B" },
      { slug: "GrossSpinelessOtterPRChase-HZCTk3XXqVE9X5YK", title: "BAN", viewCount: 4317, duration: 59, createdAt: "2025-06-29T19:25:25Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/e3ca51d3-fec9-45d4-9c0c-915b1c9591f8/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/connieheinz/clip/GrossSpinelessOtterPRChase-HZCTk3XXqVE9X5YK" },
      { slug: "FriendlyClearSardineRalpherZ", title: "Bakken !", viewCount: 3643, duration: 59, createdAt: "2021-01-16T22:23:46Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/0e35a15f-26ed-448e-a9c3-fffd0f829af4/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/connieheinz/clip/FriendlyClearSardineRalpherZ" },
      { slug: "HeadstrongEnergeticFriesAllenHuhu-OnuelySdHgWGugcl", title: "AHAHAHAHA", viewCount: 3138, duration: 25, createdAt: "2024-01-04T10:29:51Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/a6a2f652-d98e-4e6e-b864-e51a5c7bfcd4/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/connieheinz/clip/HeadstrongEnergeticFriesAllenHuhu-OnuelySdHgWGugcl" },
      { slug: "SpotlessImpossibleGazelleNotATK-00IxcMij49GkfXBM", title: "shiet en ninja xd", viewCount: 3105, duration: 50, createdAt: "2025-08-11T21:45:52Z", game: "Grand Theft Auto V", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/51c0a051-a7d0-4110-99f6-b4802fd39f94/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/connieheinz/clip/SpotlessImpossibleGazelleNotATK-00IxcMij49GkfXBM" },
    ],
  },
  {
    handle: "lykkeograsmus",
    name: "LykkeOgRasmus",
    realName: "Lykke og Rasmus",
    meta: "Twitch · YouTube · TikTok · IRL og rejseindhold",
    blurb: "Dansk par der streamer IRL og rejseindhold paa fuld tid og jaevnligt topper listerne over de mest sete danske kanaler.",
    bio: "Lykke og Rasmus er et dansk par, der laver indhold paa fuld tid mens de rejser verden rundt. Deres Twitch-kanal er kendt for IRL-streams, der har gjort dem til en af de mest sete danske kanaler maalt paa toppeertal. Ud over Twitch har de et stort foelge paa YouTube, Instagram og TikTok, hvor de deler deres rejser og hverdag. Deres autentiske og personlige stil har skabt et engageret community paa tvaers af platforme.",
    highlights: [
      "Jaevnligt blandt de mest sete danske kanaler maalt paa toppeertal",
      "Fuldtids content creators der rejser verden rundt",
      "Stort foelge paa tvaers af Twitch, YouTube, Instagram og TikTok",
      "Kendt for autentisk IRL- og rejseindhold"
    ],
    image: "https://unavatar.io/twitch/lykkeograsmus",
    attribution: "Twitch / @lykkeograsmus",
    attributionUrl: "https://www.twitch.tv/lykkeograsmus",
    language: "da",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/lykkeograsmus" },
      { label: "YouTube", url: "https://www.youtube.com/@LykkeogRasmus" },
      { label: "Instagram", url: "https://www.instagram.com/lykkeograsmus/" },
      { label: "TikTok", url: "https://www.tiktok.com/@lykkeograsmus" }
    ],
    references: [
      { label: "Twitch-profil", url: "https://www.twitch.tv/lykkeograsmus", type: "platform" },
      { label: "Linktree", url: "https://linktr.ee/LykkeOgRasm", type: "official-site" }
    ],
    tiktokHandle: "lykkeograsmus",
    twitchStats: { followers: 5965, partner: false, createdAt: "2024-05-18T03:52:33.408425Z", lastGame: "IRL" },
    trackerStats: { avgViewers: 54, peakViewers: 112, hoursStreamed: 60 },
    youtubeChannelHandle: "LykkeogRasmus",
    youtubeVideos: [
      { id: "iMO6KwJ0u7c", title: "Vi rejser hver til sit..", published: "2026-06-28T14:00:12+00:00" },
      { id: "hAzWWfdBpOo", title: "Spiser KUN MÆLKESNITTER en HEL DAG!", published: "2026-06-24T14:00:23+00:00" },
      { id: "pgTxygPiyPY", title: "TASTETEST | Tyskland McDonald's", published: "2026-06-21T14:00:36+00:00" },
      { id: "tuMlfvhcPCA", title: "NY TASTETEST UDE NU!", published: "2026-06-21T14:00:00+00:00" },
      { id: "vDu636ADTCk", title: "Lykke Vs Rasmus MINIGAMES EDITION!", published: "2026-06-17T14:00:11+00:00" },
      { id: "aSQ0AtqHz9U", title: "Udforsker Berlins historie..", published: "2026-06-14T14:00:10+00:00" },
    ],
    twitchClips: [
      { slug: "AltruisticGlutenFreeDragonflyMrDestructoid-p_X5CJR2PT3nPSHx", title: "Lykke er våd", viewCount: 2773, duration: 11, createdAt: "2025-02-14T07:22:19Z", game: "IRL", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/a81738bd-f0f4-4bd8-b3a6-9896a78937bb/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/lykkeograsmus/clip/AltruisticGlutenFreeDragonflyMrDestructoid-p_X5CJR2PT3nPSHx" },
      { slug: "TenaciousFaithfulFungusBibleThump-7gwNAUIOyQ1Om3UZ", title: "AHAHAHAHAA", viewCount: 1931, duration: 28, createdAt: "2025-02-16T12:35:51Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/27f76f64-be68-4fa4-95f4-861d506470ad/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/lykkeograsmus/clip/TenaciousFaithfulFungusBibleThump-7gwNAUIOyQ1Om3UZ" },
      { slug: "BreakableClearBasenjiHeyGuys-DHbrrQEm4RqNsXq8", title: "Lille svepser!", viewCount: 1636, duration: 12, createdAt: "2025-03-11T15:40:15Z", game: "IRL", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/5069541d-f0ef-4abe-9708-9f191bd99821/landscape/thumb/thumb-0000000000-1208x784.jpg", url: "https://www.twitch.tv/lykkeograsmus/clip/BreakableClearBasenjiHeyGuys-DHbrrQEm4RqNsXq8" },
      { slug: "CrowdedPlainHummingbirdPanicBasket-seRRfi19zX_Mlje9", title: "hopper ned til hajerne", viewCount: 1439, duration: 29, createdAt: "2025-05-01T15:13:54Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/47170dbb-30ae-4a2c-9f4d-b469d7fd131b/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/lykkeograsmus/clip/CrowdedPlainHummingbirdPanicBasket-seRRfi19zX_Mlje9" },
      { slug: "CarefulFreezingDinosaurMau5-kBatiM2EWzAWN89n", title: "PATT MAND", viewCount: 1375, duration: 13, createdAt: "2025-03-07T15:46:10Z", game: "I'm Only Sleeping", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/d711d442-65a0-47d5-8fbe-6bed7ea24d60/landscape/thumb/thumb-0000000000-1208x784.jpg", url: "https://www.twitch.tv/lykkeograsmus/clip/CarefulFreezingDinosaurMau5-kBatiM2EWzAWN89n" },
      { slug: "RelievedPluckyDuckDAESuppy-Z3tOkBXQMbl4oQqE", title: "KÆMPE PRUT", viewCount: 1156, duration: 24, createdAt: "2025-03-09T15:12:46Z", game: "I'm Only Sleeping", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/78072e33-d0b2-45e0-86bf-7e0bcfa2a674/landscape/thumb/thumb-0000000000-1208x784.jpg", url: "https://www.twitch.tv/lykkeograsmus/clip/RelievedPluckyDuckDAESuppy-Z3tOkBXQMbl4oQqE" },
    ],
  },
];
