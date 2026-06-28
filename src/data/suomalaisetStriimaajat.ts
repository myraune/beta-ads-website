import type { CreatorProfile } from "@/data/norskeStreamere";

/**
 * Finland streamer-datasett. Twitch-stats + klipp hentet fra Twitchs
 * offentlige GQL; bios/høydepunkter fra websearch-research. Bilder = Twitch-
 * profilbilde (unavatar). YouTube/presse legges til i neste fase.
 */
export const CREATORS: CreatorProfile[] = [
  {
    handle: "officialandypyro",
    name: "OfficialAndyPyro",
    realName: "Anssi Huovinen",
    meta: "Twitch · YouTube (APGAMING) · monipelistriimaaja",
    blurb: "Anssi \"OfficialAndyPyro\" Huovinen on yksi Suomen seuratuimmista Twitch-striimaajista ja tunnettu monipuolisesta peli- ja juttelusisällöstään.",
    bio: "Anssi Huovinen tunnetaan verkossa nimellä OfficialAndyPyro, ja hän on yksi Suomen suosituimmista monipelistriimaajista. Hän aloitti Twitchissä vuonna 2013 ja siirtyi täysipäiväiseksi sisällöntuottajaksi muutamassa vuodessa. Kanava kerää yli 280 000 seuraajaa, ja sisältö ulottuu kilpailullisesta PlayerUnknown's Battlegroundsista laajaan kirjoon muita pelejä sekä rentoon jutusteluun yleisön kanssa. Hänen YouTube-kanavansa APGAMING on kasvattanut parhaiden hetkien koosteilla miljoonia katselukertoja. Andy on Twitch-partneri ja vakiintunut nimi suomalaisessa striimausyhteisössä.",
    highlights: [
      "Yli 280 000 seuraajaa Twitchissä, Suomen seuratuimpia striimaajia",
      "Twitch-partneri ja täysipäiväinen sisällöntuottaja vuodesta 2016",
      "YouTube-kanava APGAMING on kerännyt miljoonia katselukertoja parhaiden hetkien koosteilla",
      "Kilpaillut PlayerUnknown's Battlegroundsissa muun muassa Method-organisaation riveissä",
      "Monipuolinen sisältö useista pelilajeista ja jutteluformaatista"
    ],
    image: "https://unavatar.io/twitch/officialandypyro",
    attribution: "Twitch / @officialandypyro",
    attributionUrl: "https://www.twitch.tv/officialandypyro",
    language: "fi",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/officialandypyro" },
      { label: "YouTube (APGAMING)", url: "https://www.youtube.com/scandinaviangoodguy" },
      { label: "Linktree", url: "https://linktr.ee/andypyro" }
    ],
    references: [
      { label: "OfficialAndyPyro · TwitchTracker", url: "https://twitchtracker.com/officialandypyro", type: "tracker" },
      { label: "OfficialAndyPyro · StreamsCharts", url: "https://streamscharts.com/channels/officialandypyro", type: "tracker" }
    ],
    twitchStats: { followers: 284642, partner: true, createdAt: "2013-07-13T17:34:12.031499Z", lastGame: "IRL" },
    twitchClips: [
      { slug: "PoisedGiantHippoTheTarFu-nAMKKntldmrYHo0c", title: "Waifu wagon", viewCount: 122102, duration: 31, createdAt: "2022-01-31T13:32:00Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/cf22c667-508d-4435-b8c0-416664b0049d/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/officialandypyro/clip/PoisedGiantHippoTheTarFu-nAMKKntldmrYHo0c" },
      { slug: "FlirtyAuspiciousParrotFUNgineer-MgoLzx3OlCGcGT8D", title: "240K Fire in the hole ", viewCount: 116398, duration: 28, createdAt: "2021-03-17T08:05:36Z", game: "Slots", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/6bcef36b-a923-429e-97cd-92bf96b324a4/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/officialandypyro/clip/FlirtyAuspiciousParrotFUNgineer-MgoLzx3OlCGcGT8D" },
      { slug: "AuspiciousBenevolentTarsierPastaThat-WpOjbFj2Yctk5yoe", title: "Andy finally catches something", viewCount: 68299, duration: 25, createdAt: "2021-05-17T12:53:36Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/c094b90e-01c9-4939-b898-1b30db22c427/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/officialandypyro/clip/AuspiciousBenevolentTarsierPastaThat-WpOjbFj2Yctk5yoe" },
      { slug: "ObliqueFragileCaribouPraiseIt-3rNBWPG9_p_VyGEh", title: "I lost", viewCount: 58383, duration: 15, createdAt: "2021-04-23T15:55:33Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/b0a07662-b4d4-4ee4-9c99-a88e467f4d61/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/officialandypyro/clip/ObliqueFragileCaribouPraiseIt-3rNBWPG9_p_VyGEh" },
      { slug: "HilariousSilkyCheeseCharlieBitMe-y7nuaR-bwV1jUq_q", title: "Suomalainen mies Andy", viewCount: 45619, duration: 59, createdAt: "2021-03-13T17:48:39Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/56f56764-f9b1-4902-9227-fcdc36d8c8c2/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/officialandypyro/clip/HilariousSilkyCheeseCharlieBitMe-y7nuaR-bwV1jUq_q" },
      { slug: "ExquisiteAlertDragonfruitRlyTho-qGeMCA2GgWvZj9Zq", title: "Anssin bemmi", viewCount: 31842, duration: 38, createdAt: "2021-05-11T15:28:37Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/19558777-e848-48bc-91cd-1db301d79289/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/officialandypyro/clip/ExquisiteAlertDragonfruitRlyTho-qGeMCA2GgWvZj9Zq" },
    ],
  },
  {
    handle: "laeppa",
    name: "Laeppa",
    realName: "Justus Jokinen",
    meta: "Twitch · YouTube (LaeppaVika) · varietee ja juttelu",
    blurb: "Justus \"Laeppa\" Jokinen pyörittää suosittua varieteekanavaa, jossa yhdistyvät pelit, juttelu ja viihteellinen talk show -tunnelma.",
    bio: "Justus Jokinen on verkossa tutumpi nimellä Laeppa, ja hän on yksi Suomen seuratuimmista Twitch-striimaajista. Hänen kanavansa toimii viihteellisenä \"talk show -tyyppisenä\" kokonaisuutena, jossa vuorottelevat uudet yksinpelit, kauhupelit, GTA V -sessiot, seurapelit ja rento jutustelu yleisön kanssa. Laeppa on tunnettu myös YouTube-kanavastaan LaeppaVika. Lähetyksissä korostuvat persoonallinen huumori ja vahva yhteys yhteisöön, ja kanava kerää yli 230 000 seuraajaa.",
    highlights: [
      "Yli 230 000 seuraajaa Twitchissä, Suomen kärkikanavia",
      "Suosittu varietee- ja talk show -tyylinen striimiformaatti",
      "YouTube-kanava LaeppaVika täydentää Twitch-sisältöä",
      "Keskimäärin satoja samanaikaisia katsojia ja yli 1 500 katsojan huippuja",
      "Laaja pelivalikoima yksinpeleistä seura- ja kauhupeleihin"
    ],
    image: "https://unavatar.io/twitch/laeppa",
    attribution: "Twitch / @laeppa",
    attributionUrl: "https://www.twitch.tv/laeppa",
    language: "fi",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/laeppa" },
      { label: "YouTube (LaeppaVika)", url: "https://www.youtube.com/laeppavika" },
      { label: "X (Twitter)", url: "https://x.com/LaeppaVika" }
    ],
    references: [
      { label: "Laeppa · TwitchTracker", url: "https://twitchtracker.com/laeppa", type: "tracker" },
      { label: "Laeppa · StreamsCharts", url: "https://streamscharts.com/channels/laeppa", type: "tracker" }
    ],
    twitchStats: { followers: 234641, partner: true, createdAt: "2012-10-16T11:58:39.524606Z", lastGame: "MECCHA CHAMELEON" },
    twitchClips: [
      { slug: "RichAntediluvianJamPrimeMe-5pCZ3ccPRfz-rdBH", title: "Mr. Teapot", viewCount: 220397, duration: 35, createdAt: "2023-04-03T17:12:09Z", game: "The Last of Us Part I", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/c5f541fb-aeb1-4edd-bdd0-5351f54f18d9/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/laeppa/clip/RichAntediluvianJamPrimeMe-5pCZ3ccPRfz-rdBH" },
      { slug: "AbnegateGorgeousDotterelOneHand-OR98b0kLwH5v4qKZ", title: "Average Fin internet", viewCount: 96445, duration: 49, createdAt: "2023-12-07T14:18:31Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/6546e693-a522-45e2-b818-9d593ddbb632/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/laeppa/clip/AbnegateGorgeousDotterelOneHand-OR98b0kLwH5v4qKZ" },
      { slug: "ArtsyComfortableCardKappaRoss-W160qfJDYsC67jRI", title: "Hacking RHYNO!", viewCount: 89394, duration: 29, createdAt: "2024-11-03T15:58:40Z", game: "Liar's Bar", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/06d0f42b-24e3-4a5c-adb1-d8c4eebf5b61/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/laeppa/clip/ArtsyComfortableCardKappaRoss-W160qfJDYsC67jRI" },
      { slug: "SuspiciousImpartialMacaroniJonCarnage-ytD1tERxPQAApgSO", title: "Fairest randomizer seed", viewCount: 79919, duration: 19, createdAt: "2025-01-24T16:17:28Z", game: "DARK SOULS II: Scholar of the First Sin", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/9122a1c5-b6d8-40c4-ba2a-cc12dcc7b232/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/laeppa/clip/SuspiciousImpartialMacaroniJonCarnage-ytD1tERxPQAApgSO" },
      { slug: "ColdSpikyEggWOOP--F-3pmFxiUxQ8Ago", title: "Olkaa hyvä!", viewCount: 44565, duration: 23, createdAt: "2025-09-12T13:30:55Z", game: "The Bleakest Keep", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/9854b127-b3d0-435c-a7b6-4168d7f7e4d8/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/laeppa/clip/ColdSpikyEggWOOP--F-3pmFxiUxQ8Ago" },
      { slug: "ImpossibleDignifiedWolverineEagleEye-ueDRiOPb7qEWwAtR", title: "Fish Jebait", viewCount: 43764, duration: 51, createdAt: "2024-10-04T13:11:49Z", game: "IRL", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/d0d0661c-8146-436a-972a-2ce244f1a4af/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/laeppa/clip/ImpossibleDignifiedWolverineEagleEye-ueDRiOPb7qEWwAtR" },
    ],
  },
  {
    handle: "kirdez",
    name: "kirdez",
    realName: "Kiri Kylmälä",
    meta: "Twitch · Instagram · varietee ja pelit",
    blurb: "Kiri \"kirdez\" Kylmälä on pitkän linjan suomalainen Twitch-partneri ja yksi maan seuratuimmista striimaajista.",
    bio: "Kiri Kylmälä tunnetaan verkossa nimellä kirdez, ja hän on yksi Suomen seuratuimmista Twitch-striimaajista. Kanava perustettiin jo vuonna 2013, ja vuosien aikana se on kasvanut yli 200 000 seuraajan yhteisöksi. Kirdez striimaa pääosin suomeksi, ja sisältö koostuu monipuolisesta peli- ja varieteesisällöstä yhteisöllisellä otteella. Hän on vakiintunut nimi suomalaisessa striimauskentässä ja Twitch-partneri.",
    highlights: [
      "Yli 200 000 seuraajaa Twitchissä",
      "Twitch-partneri ja yksi Suomen pitkäaikaisimmista striimaajista (kanava vuodesta 2013)",
      "Kaikkien aikojen katsojaennätys yli 3 400 samanaikaista katsojaa",
      "Monipuolinen peli- ja varieteesisältö suomeksi"
    ],
    image: "https://unavatar.io/twitch/kirdez",
    attribution: "Twitch / @kirdez",
    attributionUrl: "https://www.twitch.tv/kirdez",
    language: "fi",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/kirdez" },
      { label: "Instagram", url: "https://www.instagram.com/kirdez/" }
    ],
    references: [
      { label: "kirdez · TwitchTracker", url: "https://twitchtracker.com/kirdez", type: "tracker" },
      { label: "kirdez · StreamsCharts", url: "https://streamscharts.com/channels/kirdez", type: "tracker" }
    ],
    twitchStats: { followers: 203040, partner: true, createdAt: "2013-04-25T23:38:06.358993Z", lastGame: "skate." },
    twitchClips: [
      { slug: "CooperativeViscousRhinocerosRitzMitz-fDkJ7FpgHiSiPYzd", title: "Mese enne tunink", viewCount: 21109, duration: 28, createdAt: "2022-06-29T20:59:47Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/21708789-47bf-4cf5-873b-81363c631f1b/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/kirdez/clip/CooperativeViscousRhinocerosRitzMitz-fDkJ7FpgHiSiPYzd" },
      { slug: "PerfectBovineSowBabyRage-lYrX2cBiU3fqmI51", title: "mese tuning jälkeen", viewCount: 15759, duration: 41, createdAt: "2022-08-01T17:41:01Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/e54f042f-fa7f-4010-9634-f2399270ed17/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/kirdez/clip/PerfectBovineSowBabyRage-lYrX2cBiU3fqmI51" },
      { slug: "GracefulSneakyChipmunkHumbleLife-HBLidc3ajeh02aZ_", title: "nui", viewCount: 15351, duration: 16, createdAt: "2025-02-26T19:18:23Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/e59927ec-9b21-4bcc-bf80-eeefbddea438/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/kirdez/clip/GracefulSneakyChipmunkHumbleLife-HBLidc3ajeh02aZ_" },
      { slug: "CoweringDifferentSquirrelTF2John-rXXmEru2Xsw0xqFm", title: "Nokkahuilu snipe", viewCount: 14169, duration: 12, createdAt: "2021-05-16T15:05:13Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/826363f7-1230-4ba7-8d08-73b1412fdbbf/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/kirdez/clip/CoweringDifferentSquirrelTF2John-rXXmEru2Xsw0xqFm" },
      { slug: "InquisitiveUnsightlyMochaDBstyle-uIEurcM2R2iiksI5", title: "se näkee et", viewCount: 12343, duration: 26, createdAt: "2022-06-18T01:34:56Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/c74b3272-0e60-40d8-8289-3e6f232aaee4/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/kirdez/clip/InquisitiveUnsightlyMochaDBstyle-uIEurcM2R2iiksI5" },
      { slug: "KathishInventiveWitchKappa-V4WLacS6b3ARkFSE", title: "nahkarots", viewCount: 11640, duration: 5, createdAt: "2023-02-23T20:43:07Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/5bbb7e63-67b2-4332-bc37-9f2a2d514c4b/landscape/thumb/thumb-0000000000-1664x936.jpg", url: "https://www.twitch.tv/kirdez/clip/KathishInventiveWitchKappa-V4WLacS6b3ARkFSE" },
    ],
  },
  {
    handle: "taimoutv",
    name: "taimoutv",
    realName: "Timo Kettunen",
    meta: "Twitch · entinen Overwatch-ammattilainen (Dallas Fuel) · FPS-pelit",
    blurb: "Timo \"Taimou\" Kettunen on entinen Overwatch-huippuammattilainen, joka tunnetaan nykyään suosittuna FPS-striimaajana.",
    bio: "Timo Kettunen tunnetaan pelinimellä Taimou, ja hän on yksi Suomen tunnetuimmista esports-taustaisista striimaajista. Hän kuului Dallas Fuelin avausjoukkueeseen Overwatch Leaguessa ja oli aikanaan yksi maailman parhaista hitscan-pelaajista, erityisesti Widowmakerillä ja Cassidylla. Kilpauransa jälkeen Taimou on jatkanut striimaajana, ja hänen kanavansa kerää yli 160 000 seuraajaa. Sisältö painottuu kilpailullisiin FPS-peleihin, ja yleisö koostuu sekä suomalaisista että kansainvälisistä katsojista.",
    highlights: [
      "Yli 160 000 seuraajaa Twitchissä",
      "Dallas Fuelin avausjoukkueen jäsen Overwatch Leaguessa",
      "Aikoinaan yksi maailman parhaista hitscan-pelaajista (Widowmaker, Cassidy)",
      "Pitkä kilpaura FPS-peleissä ja vakiintunut striimausura sen jälkeen"
    ],
    image: "https://unavatar.io/twitch/taimoutv",
    attribution: "Twitch / @taimoutv",
    attributionUrl: "https://www.twitch.tv/taimoutv",
    language: "mixed",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/taimoutv" }
    ],
    references: [
      { label: "Taimou · Liquipedia (Overwatch)", url: "https://liquipedia.net/overwatch/Taimou", type: "wikipedia" },
      { label: "Taimou · Esports Earnings", url: "https://www.esportsearnings.com/players/27563-taimou-timo-kettunen", type: "tracker" }
    ],
    twitchStats: { followers: 168641, partner: true, createdAt: "2014-01-07T14:14:59.108523Z", lastGame: "Deadlock" },
    twitchClips: [
      { slug: "ToughSuspiciousBaguettePicoMause", title: "taimou on adderall", viewCount: 201679, duration: 29, createdAt: "2018-11-12T18:45:38Z", game: "Overwatch", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/12010dab-2910-48f8-8b46-fed99a758ad9/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/taimoutv/clip/ToughSuspiciousBaguettePicoMause" },
      { slug: "AbnegateRudeDogWow", title: "[NSFW] taimou good aim flick 👌", viewCount: 67689, duration: 8, createdAt: "2017-09-08T16:13:19Z", game: "Overwatch", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/68deb4f8-2fcd-408d-93e9-8aa5e69b9ad8/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/taimoutv/clip/AbnegateRudeDogWow" },
      { slug: "ConfidentAgileCaterpillarShadyLulu", title: "Birdring's Movement", viewCount: 61651, duration: 15, createdAt: "2017-12-08T22:53:38Z", game: "Overwatch", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/52567c9d-f622-449b-aa88-1e909f74b21f/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/taimoutv/clip/ConfidentAgileCaterpillarShadyLulu" },
      { slug: "SuaveHappyLyrebirdKAPOW", title: "Taimou tells the story of xQc trying to move", viewCount: 53894, duration: 60, createdAt: "2018-04-24T19:39:21Z", game: "Overwatch", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/feed684d-8772-4c6b-a5cf-a7d3985e0494/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/taimoutv/clip/SuaveHappyLyrebirdKAPOW" },
      { slug: "LazyColorfulLouseNinjaGrumpy", title: "Taimou Jukes a Winston", viewCount: 49025, duration: 30, createdAt: "2017-06-30T12:15:57Z", game: "Overwatch", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/3052f78d-2069-45c8-b388-119bb67cd0b9/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/taimoutv/clip/LazyColorfulLouseNinjaGrumpy" },
      { slug: "SnappyHorribleGoshawkDAESuppy", title: "Taimou- 'If you got to Top 500 by using Mercy... you're still shit at the game. You do -not- deserve", viewCount: 48852, duration: 15, createdAt: "2017-04-08T22:14:24Z", game: "Overwatch", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/46043e43-5911-4db2-aa99-a8d9b8014d53/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/taimoutv/clip/SnappyHorribleGoshawkDAESuppy" },
    ],
  },
  {
    handle: "eeddspeaks",
    name: "eeddspeaks",
    realName: "Eetu Pesonen",
    meta: "Twitch · YouTube · IRL ja juttelu",
    blurb: "Eetu \"eeddspeaks\" Pesonen on suomalaisen verkkosisällön pioneeri, joka tuo YouTube-tähteytensä mukana myös Twitchiin.",
    bio: "Eetu Pesonen tunnetaan verkossa nimellä eeddspeaks, ja hän on yksi suomalaisen verkkosisällön pioneereista. Hän aloitti YouTubessa jo vuonna 2012, ja hänen vlog-kanavansa on kerännyt satojatuhansia tilaajia arjen seikkailuilla, ruoanlaitolla, matkailulla ja haasteilla. Vuonna 2014 hän juonsi Suomen ensimmäistä YouTube-sarjaa Tapaa X ja palkittiin Tube Awards -gaalassa. Twitchissä eeddspeaks tuottaa rentoa juttelu- ja IRL-sisältöä, ja hänen kanavansa kuuluu Suomen seuratuimpiin yli 140 000 seuraajalla.",
    highlights: [
      "Yli 140 000 seuraajaa Twitchissä",
      "Yli 340 000 tilaajaa YouTubessa, suomalaisen sisällöntuoton pioneeri",
      "Juonsi Suomen ensimmäistä YouTube-sarjaa Tapaa X (2014)",
      "Palkittu Tube Awards -gaalassa vaikuttavuudestaan",
      "Laaja monikanavainen läsnäolo YouTubessa, Instagramissa ja Twitchissä"
    ],
    image: "https://unavatar.io/twitch/eeddspeaks",
    attribution: "Twitch / @eeddspeaks",
    attributionUrl: "https://www.twitch.tv/eeddspeaks",
    language: "fi",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/eeddspeaks" },
      { label: "YouTube", url: "https://www.youtube.com/user/eeddspeaks" },
      { label: "Instagram", url: "https://www.instagram.com/eeddspeaks/" }
    ],
    references: [
      { label: "eeddspeaks · TwitchTracker", url: "https://twitchtracker.com/eeddspeaks", type: "tracker" },
      { label: "eeddspeaks · Speakersfactory", url: "https://speakersfactory.fi/esiintyjat-ja-ohjelma/eeddspeaks-eetu/", type: "agency" }
    ],
    twitchStats: { followers: 139873, partner: true, createdAt: "2012-09-08T21:17:51.779989Z", lastGame: "Just Chatting" },
    twitchClips: [
      { slug: "BitterVastBottlePogChamp-hgmo0_1kmLbn_n5H", title: "Leo Pessi", viewCount: 9495, duration: 30, createdAt: "2023-07-09T02:19:12Z", game: "SongTrivia 2: Guess the song", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/aca72bc5-0d9d-4e3c-a933-53c937bcebb6/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/eeddspeaks/clip/BitterVastBottlePogChamp-hgmo0_1kmLbn_n5H" },
      { slug: "BoldMistyLampRaccAttack-ZZI4x0EFBIlrOO61", title: "Nappi pohjaa Jeesus ohjaa", viewCount: 8200, duration: 30, createdAt: "2023-06-06T17:34:09Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/286eaeeb-8f86-4cc0-bba2-0cbd11911f7e/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/eeddspeaks/clip/BoldMistyLampRaccAttack-ZZI4x0EFBIlrOO61" },
      { slug: "GorgeousGoldenStrawberryBrokeBack", title: "Kuka löi jouluna?", viewCount: 8060, duration: 16, createdAt: "2019-06-02T15:28:39Z", game: "Minecraft", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/004308d9-47bb-4f27-aa13-80eaf349d620/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/eeddspeaks/clip/GorgeousGoldenStrawberryBrokeBack" },
      { slug: "ViscousIgnorantLeopardDxAbomb-9MtNFuqfNcaxHxSS", title: "onko ees pelottava peli?", viewCount: 6768, duration: 36, createdAt: "2024-07-20T07:06:03Z", game: "SILENT BREATH", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/a48d6ac6-f1be-49a2-8189-968dcf5a182e/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/eeddspeaks/clip/ViscousIgnorantLeopardDxAbomb-9MtNFuqfNcaxHxSS" },
      { slug: "CrackyThankfulPigPRChase-jsSjx9zNleajjJ-s", title: "AK-47 perintökalleus unboxattu uudesta casesta", viewCount: 4762, duration: 30, createdAt: "2024-02-07T12:10:16Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/dfbc94fb-677e-4218-a838-87835bf9512c/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/eeddspeaks/clip/CrackyThankfulPigPRChase-jsSjx9zNleajjJ-s" },
      { slug: "MoralProtectivePterodactylCurseLit-Bgz9dLyn_orG4E6C", title: "Mora!!!", viewCount: 4608, duration: 55, createdAt: "2025-06-28T12:59:24Z", game: null, thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/314b9b17-6f42-4a99-990b-5d285b607913/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/eeddspeaks/clip/MoralProtectivePterodactylCurseLit-Bgz9dLyn_orG4E6C" },
    ],
  },
  {
    handle: "lakkoilija",
    name: "Lakkoilija",
    meta: "Twitch · YouTube · pelit ja juttelu",
    blurb: "Lakkoilija on yksi Suomen seuratuimmista striimaajista, joka tunnetaan persoonallisesta peli- ja juttelusisällöstään.",
    bio: "Lakkoilija on yksi Suomen seuratuimmista ja vakiintuneimmista Twitch-striimaajista. Hän striimaa suomeksi ja on kasvattanut yli 120 000 seuraajan yhteisön persoonallisella otteella, joka yhdistää pelaamista ja rentoa juttelua. Lakkoilija on noussut toistuvasti Suomen seuratuimpien striimaajien kärkikolmikkoon, ja hänen sisältönsä on kotimaisen striimausyhteisön tunnistettava nimi.",
    highlights: [
      "Yli 120 000 seuraajaa Twitchissä",
      "Toistuvasti Suomen seuratuimpien striimaajien kärkikolmikossa",
      "Vakiintunut nimi suomalaisessa striimausyhteisössä",
      "Persoonallinen peli- ja juttelusisältö suomeksi"
    ],
    image: "https://unavatar.io/twitch/lakkoilija",
    attribution: "Twitch / @lakkoilija",
    attributionUrl: "https://www.twitch.tv/lakkoilija",
    language: "fi",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/lakkoilija" }
    ],
    references: [
      { label: "Lakkoilija · Twitch", url: "https://www.twitch.tv/lakkoilija", type: "platform" },
      { label: "Suomen seuratuimmat Twitch-striimaajat 2024 · Statista", url: "https://www.statista.com/statistics/1326189/most-popular-twitch-streamers-in-finland/", type: "news" }
    ],
    twitchStats: { followers: 125675, partner: true, createdAt: "2014-03-31T13:52:54.992515Z", lastGame: "Black Myth: Wukong" },
    twitchClips: [
      { slug: "DaintyTardyCamelTebowing", title: "LAKKOSTREAM", viewCount: 3531, duration: 16, createdAt: "2016-11-17T23:39:28Z", game: null, thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/a681b2de-ece7-4a4e-9ee5-8d1565313365/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/lakkoilija/clip/DaintyTardyCamelTebowing" },
      { slug: "PeacefulAggressivePigeonPlanking", title: "LAKKOSTREAM", viewCount: 2414, duration: 29, createdAt: "2019-10-07T10:47:42Z", game: null, thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/ba9a1911-84c3-43b6-9bc1-35cad1cd4b87/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/lakkoilija/clip/PeacefulAggressivePigeonPlanking" },
      { slug: "BlightedAntsyElephantBloodTrail-MZt94DDEoY8gPsWX", title: "scripted", viewCount: 1860, duration: 17, createdAt: "2021-04-23T15:44:03Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/8633dd4d-f95b-4794-901d-585a3bd5780b/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/lakkoilija/clip/BlightedAntsyElephantBloodTrail-MZt94DDEoY8gPsWX" },
      { slug: "SilkyTubularWrenchPicoMause-f7VGvQWCOyVAYRvB", title: "play of the game", viewCount: 1493, duration: 4, createdAt: "2021-04-29T14:26:05Z", game: "Call of Duty: Black Ops Cold War", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/d8bb8508-d3fc-4284-8c3b-cc8b21c0f6fb/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/lakkoilija/clip/SilkyTubularWrenchPicoMause-f7VGvQWCOyVAYRvB" },
      { slug: "ImpartialAnnoyingBeeHoneyBadger-arTvZ7gZz8HSSuKG", title: "Botit yrittää", viewCount: 1298, duration: 29, createdAt: "2022-02-09T16:55:31Z", game: "Apex Legends", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/e5744194-610a-4204-a056-b8ae52213c74/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/lakkoilija/clip/ImpartialAnnoyingBeeHoneyBadger-arTvZ7gZz8HSSuKG" },
      { slug: "DistinctPiercingBibimbapTooSpicy-_xsUbh0SRL8ROXo9", title: "Sauvan valitseminen", viewCount: 1154, duration: 59, createdAt: "2023-02-10T17:24:23Z", game: "Hogwarts Legacy", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/8298b512-5abc-4c1f-a5ad-90e0dff0b0d0/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/lakkoilija/clip/DistinctPiercingBibimbapTooSpicy-_xsUbh0SRL8ROXo9" },
    ],
  },
  {
    handle: "pelaajatcom",
    name: "pelaajatcom",
    meta: "Twitch · esports-lähetykset · Counter-Strike 2",
    blurb: "Pelaajat.com on käytännössä suomalainen esports-tv-kanava Twitchissä, ja se on Suomen katsotuin striimikanava.",
    bio: "Pelaajat.com on suomalainen esports-mediabrändi, jonka Twitch-kanava toimii käytännössä omana esports-tv-kanavanaan. Kanava lähettää studiolaatuisia esports-lähetyksiä, joiden pääpeli on Counter-Strike 2, ja se on jatkuvasti Suomen katsotuin striimikanava. Tyypillisessä kuukaudessa kanava kerää satojatuhansia katselutunteja, ja keskimääräinen samanaikainen katsojaluku ylittää selvästi 3 000. Korkea tuotantotaso ja ammattimainen studio erottavat Pelaajat.comin yksittäisten striimaajien kanavista.",
    highlights: [
      "Suomen katsotuin Twitch-kanava katselutunneilla mitattuna",
      "Yli 400 000 katselutuntia kuukaudessa, ajoittain yli 560 000",
      "Keskimäärin yli 3 300 samanaikaista katsojaa loppuvuonna 2025",
      "Studiolaatuiset esports-lähetykset, pääpelinä Counter-Strike 2",
      "Yli 110 000 seuraajaa Twitchissä"
    ],
    image: "https://unavatar.io/twitch/pelaajatcom",
    attribution: "Twitch / @pelaajatcom",
    attributionUrl: "https://www.twitch.tv/pelaajatcom",
    language: "fi",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/pelaajatcom" },
      { label: "X (Twitter)", url: "https://twitter.com/PelaajatCom" }
    ],
    references: [
      { label: "pelaajatcom · TwitchTracker", url: "https://twitchtracker.com/pelaajatcom", type: "tracker" },
      { label: "pelaajatcom · StreamsCharts", url: "https://streamscharts.com/channels/pelaajatcom", type: "tracker" }
    ],
    twitchStats: { followers: 118365, partner: true, createdAt: "2018-09-17T15:40:54.959147Z", lastGame: "Counter-Strike" },
    twitchClips: [
      { slug: "NaiveCulturedPigeonPeteZarollTie", title: "The Finnish speaking English is the best", viewCount: 115114, duration: 24, createdAt: "2019-08-28T15:52:28Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/a004b699-ea6b-432c-9671-6bd8fbfaa523/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/pelaajatcom/clip/NaiveCulturedPigeonPeteZarollTie" },
      { slug: "VictoriousVivaciousCodThisIsSparta", title: "Barbie girl", viewCount: 95462, duration: 59, createdAt: "2019-08-31T12:08:56Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/ddcab3e0-0770-4bf4-85a0-1dd38059cd95/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/pelaajatcom/clip/VictoriousVivaciousCodThisIsSparta" },
      { slug: "DullRoughDugongPoooound", title: "new meta", viewCount: 52044, duration: 30, createdAt: "2020-02-15T22:16:01Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/8e4e0ce3-19a5-4a3f-92d4-2eef9d48b0a1/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/pelaajatcom/clip/DullRoughDugongPoooound" },
      { slug: "AuspiciousMiniatureClintGivePLZ", title: "Retake", viewCount: 48264, duration: 34, createdAt: "2020-02-16T11:12:04Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/ad100917-3899-4e1f-b533-d54dac328cd2/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/pelaajatcom/clip/AuspiciousMiniatureClintGivePLZ" },
      { slug: "PrettiestKindBadgerSuperVinlin", title: "Lihis repeää nauruun", viewCount: 47684, duration: 59, createdAt: "2019-12-21T18:32:22Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/d413423f-9747-494c-96a1-2d4156f48858/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/pelaajatcom/clip/PrettiestKindBadgerSuperVinlin" },
      { slug: "ArbitraryIcyLEDSuperVinlin-mY0SaFyH9LDUqOM3", title: "Olvari ja kissavideot", viewCount: 46237, duration: 44, createdAt: "2022-03-13T19:20:27Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/c3ea4f34-09a1-49fb-918f-fcf72a405922/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/pelaajatcom/clip/ArbitraryIcyLEDSuperVinlin-mY0SaFyH9LDUqOM3" },
    ],
  },
  {
    handle: "henksuliini",
    name: "Henksuliini",
    meta: "Twitch · Just Chatting · varietee ja juttelu",
    blurb: "Henksuliini on yksi Suomen kovimmista varietee- ja persoonastriimaajista, joka tunnetaan erityisesti Just Chatting -sisällöstään.",
    bio: "Henksuliini on yksi Suomen näkyvimmistä varietee- ja persoonastriimaajista. Hän aloitti Twitchissä vuonna 2019, ja kanava painottuu Just Chatting -tyyppiseen juttelusisältöön sekä monipuoliseen pelaamiseen. Henksuliini on noussut ajoittain Suomen katsotuimmaksi striimaajaksi katselutunneilla mitattuna, ja esimerkiksi tammikuussa 2025 hänen kanavansa keräsi noin 465 000 katselutuntia. Hänen vahvuutensa on vahva yhteys yleisöön ja viihdyttävä jutteluformaatti.",
    highlights: [
      "Noussut ajoittain Suomen katsotuimmaksi striimaajaksi katselutunneilla",
      "Tammikuussa 2025 noin 465 000 katselutuntia",
      "Yksi Suomen kolmesta katsotuimmasta Just Chatting -kanavasta",
      "Vahva varietee- ja juttelusisältö suomeksi vuodesta 2019"
    ],
    image: "https://unavatar.io/twitch/henksuliini",
    attribution: "Twitch / @henksuliini",
    attributionUrl: "https://www.twitch.tv/henksuliini",
    language: "fi",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/henksuliini" }
    ],
    references: [
      { label: "Henksuliini · TwitchTracker", url: "https://twitchtracker.com/henksuliini", type: "tracker" },
      { label: "Henksuliini · StreamsCharts", url: "https://streamscharts.com/channels/henksuliini", type: "tracker" }
    ],
    twitchStats: { followers: 113711, partner: true, createdAt: "2019-03-15T20:28:56.470532Z", lastGame: "Just Chatting" },
    twitchClips: [
      { slug: "GiftedAmericanRadishDxCat-x2wjKfG-UEuLdFuR", title: "jysähti", viewCount: 45093, duration: 17, createdAt: "2021-08-04T20:11:13Z", game: "Pools, Hot Tubs, and Beaches", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/0cc10b11-d1c4-4ec5-a692-184c982322ec/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/henksuliini/clip/GiftedAmericanRadishDxCat-x2wjKfG-UEuLdFuR" },
      { slug: "CarelessThirstySmoothieBudBlast-CjQheqXuit1-TtDt", title: "Oon selvinpäin", viewCount: 33159, duration: 29, createdAt: "2021-08-07T21:04:21Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/d5600aed-eb19-4b48-b40a-f312a6e371e3/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/henksuliini/clip/CarelessThirstySmoothieBudBlast-CjQheqXuit1-TtDt" },
      { slug: "EnergeticKawaiiKuduDancingBaby-E6JYTptHcQ2YRJIT", title: "gyat", viewCount: 21771, duration: 18, createdAt: "2025-01-18T19:57:40Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/5a64e932-67c1-4030-9a43-f1593e491fa3/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/henksuliini/clip/EnergeticKawaiiKuduDancingBaby-E6JYTptHcQ2YRJIT" },
      { slug: "VivaciousStylishBadgerGingerPower", title: "Röpöttää niin birusti", viewCount: 21535, duration: 10, createdAt: "2020-07-01T19:12:02Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/9b42268c-d45a-46c7-b09a-9d0165a24945/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/henksuliini/clip/VivaciousStylishBadgerGingerPower" },
      { slug: "StrangeGlutenFreeDragonStrawBeary-8kicBvzPzr1T1boe", title: "Olvarille terveiset!", viewCount: 20361, duration: 30, createdAt: "2025-10-12T13:00:56Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/92746076-b676-46b3-ae6b-61f1214a8e26/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/henksuliini/clip/StrangeGlutenFreeDragonStrawBeary-8kicBvzPzr1T1boe" },
      { slug: "DoubtfulWonderfulLasagnaBigBrother-nbb9fkhJYHA7ZZCg", title: "cuddling :3", viewCount: 18901, duration: 7, createdAt: "2025-01-21T10:36:10Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/4707fbb3-0c7b-4e91-9abb-74601088ee9f/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/henksuliini/clip/DoubtfulWonderfulLasagnaBigBrother-nbb9fkhJYHA7ZZCg" },
    ],
  },
  {
    handle: "jennijanina",
    name: "jennijanina",
    meta: "Twitch · TikTok · Instagram · IRL ja Just Chatting",
    blurb: "Jennijanina on suomalainen sisällöntuottaja ja muusikko, joka striimaa rentoa IRL- ja juttelusisältöä Twitchissä.",
    bio: "Jennijanina on suomalainen sosiaalisen median vaikuttaja, muusikko ja livesisällöntuottaja, joka tunnetaan myös artistinimellä JENESIS. Hän on Twitch-partneri ja striimaa pääosin Just Chatting -tyyppistä sisältöä, jossa hän jakaa arjen hetkiä, remonttiprojekteja, matkavlogeja ja rentoa juttelua. Jennijaninalla on vahva monikanavainen läsnäolo: hänen TikTok-videonsa ovat keränneet yli 1,3 miljoonaa tykkäystä ja Instagram-yleisö on kymmeniätuhansia seuraajia. Hän on yksi Suomen näkyvimmistä naispuolisista striimaajista.",
    highlights: [
      "Twitch-partneri ja yksi Suomen näkyvimmistä naispuolisista striimaajista",
      "Yli 1,3 miljoonaa tykkäystä TikTok-videoilla",
      "Kymmeniätuhansia seuraajia Instagramissa",
      "Tuottaa musiikkia artistinimellä JENESIS",
      "Monipuolinen IRL- ja juttelusisältö Twitchissä"
    ],
    image: "https://unavatar.io/twitch/jennijanina",
    attribution: "Twitch / @jennijanina",
    attributionUrl: "https://www.twitch.tv/jennijanina",
    language: "fi",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/jennijanina" },
      { label: "Instagram", url: "https://www.instagram.com/jennijanina/" },
      { label: "Linktree", url: "https://linktr.ee/jennijjanina" }
    ],
    references: [
      { label: "jennijanina · TwitchTracker", url: "https://twitchtracker.com/jennijanina", type: "tracker" },
      { label: "jennijanina · StreamsCharts", url: "https://streamscharts.com/channels/jennijanina", type: "tracker" }
    ],
    twitchStats: { followers: 16189, partner: true, createdAt: "2021-10-11T12:06:02.595336Z", lastGame: "Just Chatting" },
    twitchClips: [
      { slug: "PlacidBenevolentStorkEagleEye-nNZ06l1J_h15fKbw", title: "hetkinen", viewCount: 16972, duration: 4, createdAt: "2021-12-05T00:53:36Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/805d2369-df4a-45f5-8322-2492412d09be/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/jennijanina/clip/PlacidBenevolentStorkEagleEye-nNZ06l1J_h15fKbw" },
      { slug: "OnerousDaintyPlumberHeyGirl--D1zxgsRL3dd7ADA", title: "Uus sänky pog ilmapatja helvettii", viewCount: 13857, duration: 29, createdAt: "2022-02-09T11:05:42Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/7c9b10ed-5c90-431a-b07f-09be961efd27/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/jennijanina/clip/OnerousDaintyPlumberHeyGirl--D1zxgsRL3dd7ADA" },
      { slug: "VibrantSteamyHamsterYouDontSay-EeOrKB6HN3jFTRo2", title: "helppo", viewCount: 9890, duration: 27, createdAt: "2023-04-21T21:23:39Z", game: "Pools, Hot Tubs, and Beaches", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/642b6088-0172-4d10-9765-ed666c5a4958/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/jennijanina/clip/VibrantSteamyHamsterYouDontSay-EeOrKB6HN3jFTRo2" },
      { slug: "InquisitivePoorSpaghettiDendiFace-3qwMmb2zmMOM3g1P", title: "tiktok tonnikalasushipalloja ja taulun maalausta :3 ps ollu ikävä <3 !MyProtein", viewCount: 8560, duration: 28, createdAt: "2022-04-10T15:11:37Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/c410616f-0575-4d69-af05-62d67226fb5c/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/jennijanina/clip/InquisitivePoorSpaghettiDendiFace-3qwMmb2zmMOM3g1P" },
      { slug: "LuckyLaconicHummingbirdKAPOW-GUd4Gsp1fkKYAgYu", title: "HeilahTI", viewCount: 7849, duration: 20, createdAt: "2021-12-27T13:51:48Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/b8d4bb49-370f-442c-8baa-42dd63bf7414/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/jennijanina/clip/LuckyLaconicHummingbirdKAPOW-GUd4Gsp1fkKYAgYu" },
      { slug: "PrettiestWimpyOysterTinyFace-SiwiUMQ_MOYPAbpH", title: "rip lamppu", viewCount: 7153, duration: 11, createdAt: "2021-12-27T14:45:57Z", game: "Just Chatting", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/6bc6a78f-08c9-47d1-a694-57bc1b51fa63/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/jennijanina/clip/PrettiestWimpyOysterTinyFace-SiwiUMQ_MOYPAbpH" },
    ],
  },
  {
    handle: "aleeksi",
    name: "Aleeksi",
    realName: "Aleksi Virolainen",
    meta: "Twitch · Counter-Strike · FPS-pelit",
    blurb: "Aleksi \"Aleeksi\" Virolainen on pitkän linjan suomalainen Counter-Strike-striimaaja ja Twitch-partneri.",
    bio: "Aleksi Virolainen tunnetaan verkossa nimellä Aleeksi, ja hän on yksi Suomen vakiintuneimmista Counter-Strike-striimaajista. Hänen Twitch-kanavansa perustettiin jo vuonna 2013, ja se on kasvanut yli 110 000 seuraajan yhteisöksi. Aleeksi striimaa pääosin suomeksi ja keskittyy kilpailulliseen Counter-Strikeen. Hän on Twitch-partneri ja tunnettu nimi suomalaisessa FPS-yhteisössä.",
    highlights: [
      "Yli 110 000 seuraajaa Twitchissä",
      "Twitch-partneri ja yksi Suomen pitkäaikaisimmista striimaajista (kanava vuodesta 2013)",
      "Erikoistunut kilpailulliseen Counter-Strikeen",
      "Tunnettu nimi suomalaisessa FPS-striimausyhteisössä"
    ],
    image: "https://unavatar.io/twitch/aleeksi",
    attribution: "Twitch / @aleeksi",
    attributionUrl: "https://www.twitch.tv/aleeksi",
    language: "fi",
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/aleeksi" }
    ],
    references: [
      { label: "Aleeksi · TwitchTracker", url: "https://twitchtracker.com/aleeksi", type: "tracker" },
      { label: "Aleeksi · StreamsCharts", url: "https://streamscharts.com/channels/aleeksi", type: "tracker" }
    ],
    twitchStats: { followers: 120138, partner: false, createdAt: "2013-04-26T19:04:18.074087Z", lastGame: "Counter-Strike" },
    twitchClips: [
      { slug: "ColdStylishGoldfishOSfrog", title: "Aleksib gets a kill with a flash", viewCount: 81721, duration: 16, createdAt: "2019-08-01T13:41:49Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/8f19024f-35aa-48e7-af79-e9ad418201d1/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/aleeksi/clip/ColdStylishGoldfishOSfrog" },
      { slug: "CrackyCogentPigDoubleRainbow", title: "200iq", viewCount: 62063, duration: 60, createdAt: "2020-07-16T12:45:15Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/f1285845-9b5d-4233-9883-cc9770c323c2/landscape/thumb/thumb-0000000000-1920x1080.jpg", url: "https://www.twitch.tv/aleeksi/clip/CrackyCogentPigDoubleRainbow" },
      { slug: "GrotesqueAssiduousJaguarCharlietheUnicorn", title: "yes", viewCount: 56257, duration: 25, createdAt: "2020-01-13T19:53:45Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/93ac7b24-046e-48d8-adfc-42399334df27/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/aleeksi/clip/GrotesqueAssiduousJaguarCharlietheUnicorn" },
      { slug: "ZanyGrotesqueDonkeyHotPokket", title: "Aleksib kz", viewCount: 45822, duration: 59, createdAt: "2020-01-12T15:31:18Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/af4a10fb-4dac-422a-8f4e-38160c4184cf/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/aleeksi/clip/ZanyGrotesqueDonkeyHotPokket" },
      { slug: "SmilingStrongSwordVoteYea", title: "Aleksib playing with his prey", viewCount: 42263, duration: 21, createdAt: "2019-09-12T12:46:00Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/da9c00e3-b308-40a0-a758-54ce64061d4e/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/aleeksi/clip/SmilingStrongSwordVoteYea" },
      { slug: "OriginalKindCrowLitty", title: "Aleksib inhuman juan deag flick", viewCount: 26923, duration: 18, createdAt: "2019-04-10T12:19:58Z", game: "Counter-Strike", thumbnailURL: "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/3ed1e981-492a-4eda-affc-6eb9d494cde6/landscape/thumb/thumb-0000000000-1280x720.jpg", url: "https://www.twitch.tv/aleeksi/clip/OriginalKindCrowLitty" },
    ],
  },
];
