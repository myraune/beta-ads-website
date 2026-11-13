/**
 * Campaign recap films: one watch page per film at /films/<slug>.
 *
 * The watch page is the canonical home of each film (the only page with its
 * VideoObject). The case-study pages keep the film as a player and link here.
 *
 * Every figure below is copied from the matching case-study page:
 *   samsung-fold7     src/pages/CaseStudySamsungFold7.tsx + src/components/blog/SamsungFold7CaseStudy.tsx
 *   glorious          src/components/blog/GloriousCaseStudy.tsx
 *   gokstad           src/components/blog/GokstadCaseStudy.tsx
 *   nki               src/components/blog/NkiCaseStudy.tsx
 *   norstat           src/pages/CaseStudyNorstat.tsx
 *   surfshark-finland src/components/case-surfshark-finland/data.ts (+ SurfsharkFinlandCaseStudy.tsx)
 * Never add a number here that is not on the case page.
 *
 * seconds: read from each mp4's movie header (public/videos/<slug>-recap.mp4).
 * uploadDate: the git commit that first added the mp4
 *   (git log --diff-filter=A --format=%aI -- public/videos/<slug>-recap.mp4 | tail -1).
 *
 * Read by src/pages/Film*.tsx and by scripts/generate-sitemap.mjs (video
 * sitemap), scripts/prerender.mjs and scripts/generate-seo-pages.mjs, so a new
 * film only needs an entry here (plus the mp4 and poster in public/videos).
 */

export interface Film {
  slug: string;
  /** Brand name as shown in lists */
  brand: string;
  /** H1 and VideoObject name */
  title: string;
  /** Page <title> (formatSeoTitle adds " | Beta Ads" when it fits in 60) */
  seoTitle: string;
  /** Meta description and VideoObject description, 120 to 155 chars */
  metaDescription: string;
  /** One line for the /films index */
  line: string;
  /** Market and timing, shown under the H1 */
  context: string;
  /** 2 to 4 sentences: brand, market, when, what the campaign was */
  description: string;
  /** Key results, copied from the case page */
  results: [string, string][];
  /** "What you see in the film", based on the case page */
  inFilm: string;
  /** Viewer or streamer quotes that exist in the repo for this film */
  quotes?: { text: string; note: string }[];
  caseUrl: string;
  seconds: number;
  uploadDate: string;
}

export const FILMS: Film[] = [
  {
    slug: "samsung-fold7",
    brand: "Samsung",
    title: "Samsung Galaxy Z Fold7 campaign recap",
    seoTitle: "Samsung Galaxy Z Fold7 campaign recap",
    metaDescription:
      "Watch the recap of Samsung's Galaxy Z Fold7 launch on Norwegian Twitch: 28 streamers, 300,054 completed views and 141,930 unique viewers in 31 days.",
    line: "The Galaxy Z Fold7 launch on 28 Norwegian Twitch streams.",
    context: "Norway · Twitch · September 22 to October 22, 2025",
    description:
      "Samsung launched the Galaxy Z Fold7 to Norway's gaming community through native Twitch overlay ads and live streamer integrations. The campaign ran on 28 Norwegian Twitch streamers from September 22 to October 22, 2025, in two formats: a rich media overlay inside the stream and a chatbot CTA that sent viewers to the Fold7 product page.",
    results: [
      ["Completed views", "300,054"],
      ["Unique viewers", "141,930"],
      ["Artwork watch time", "2,000h 22m"],
      ["Norwegian streamers", "28"],
      ["Audience in Norway", "93.05%"],
      ["Adblock impact", "0%"],
    ],
    inFilm:
      "Real clips from the streams where the Fold7 overlay ran, with streamers explaining the phone in their own words and pointing their viewers to the link in chat. The film closes on the numbers from the final campaign report.",
    caseUrl: "/case-study/samsung-fold7",
    seconds: 44.967,
    uploadDate: "2026-11-02T12:45:08-06:00",
  },
  {
    slug: "glorious",
    brand: "Glorious",
    title: "Glorious Model O3 campaign recap",
    seoTitle: "Glorious Model O3 campaign recap",
    metaDescription:
      "Watch the recap of Glorious on Twitch in Finland, Norway and Sweden: rich media overlays on 25 creators across 112 categories, with 137K+ total views.",
    line: "One mouse, 25 creators, three Nordic markets.",
    context: "Finland, Norway and Sweden · Twitch",
    description:
      "Glorious promoted its new gaming mouse to tech-savvy gamers in Finland, Norway and Sweden with rich media overlays on 25 Nordic Twitch creators. The creative was localised in Finnish, Norwegian and English, appeared during live broadcasts, and sent viewers to the product through a link in the streamer's banner.",
    results: [
      ["Total views", "137K+"],
      ["Creators", "25"],
      ["Live stream categories", "112"],
      ["Countries", "3 (FI, NO, SE)"],
    ],
    inFilm:
      "Real clips from creators in Norway, Sweden and Finland with the Glorious overlay on their streams and the Model O3 on camera, cut together with the campaign's results across the three markets.",
    caseUrl: "/case-study/glorious",
    seconds: 29.682,
    uploadDate: "2026-11-03T02:31:01-06:00",
  },
  {
    slug: "gokstad",
    brand: "Gokstad Akademiet",
    title: "Gokstad Akademiet campaign recap",
    seoTitle: "Gokstad Akademiet student recruitment recap",
    metaDescription:
      "Watch the recap of Gokstad Akademiet's student recruitment on Norwegian Twitch: 22 creators, 49 categories, 100K+ completed views and a 1.22% CTR.",
    line: "Recruiting IT and design students on 22 Norwegian streams.",
    context: "Norway · Twitch · Autumn 2026 intake",
    description:
      "Gokstad Akademiet, an IT and design academy in Sandefjord, used Twitch to reach the next generation of IT and design students with an offer of free study places for the Autumn 2026 intake. A live stream overlay ran on 22 creators across 49 categories while the streamers explained how a passion for gaming can lead to studying IT or design. A link in chat took viewers straight to the course catalog.",
    results: [
      ["Completed views", "100K+"],
      ["Click-through rate", "1.22%"],
      ["Creators", "22"],
      ["Categories", "49"],
    ],
    inFilm:
      "Real clips of streamers talking about Gokstad Akademiet live while the overlay is on screen and the course link sits in chat, followed by the results from the campaign report.",
    caseUrl: "/case-study/gokstad",
    seconds: 28.6,
    uploadDate: "2026-11-03T02:31:01-06:00",
  },
  {
    slug: "nki",
    brand: "NKI",
    title: "NKI student quiz campaign recap",
    seoTitle: "NKI student quiz campaign recap",
    metaDescription:
      "Watch the recap of NKI's student quiz on Norwegian Twitch: 19 streamers, 220,003 completed views, 90,356 unique viewers and 1,595 verified clicks.",
    line: "A \"what type of student are you?\" quiz on 19 Norwegian streams.",
    context: "Norway · Twitch · October 24 to November 21, 2025",
    description:
      "NKI, Norway's largest distance-learning university, ran an interactive quiz campaign on Norwegian Twitch from October 24 to November 21, 2025. The overlay asked \"Hva slags type student er du?\" (what type of student are you?) and invited viewers to take a 30-second personality quiz. 19 streamers across 45 categories carried the campaign.",
    results: [
      ["Completed views", "220,003"],
      ["Unique viewers", "90,356"],
      ["Verified clicks", "1,595"],
      ["Verified CTR", "0.72%"],
      ["Peak-day CTR", "1.90%"],
      ["Screen time", "1,528 h"],
      ["Streamers", "19"],
    ],
    inFilm:
      "Real clips of streamers asking their chat what type of student they are while the NKI quiz overlay plays on stream, cut together with the reach and delivery numbers from the campaign report.",
    caseUrl: "/case-study/nki",
    seconds: 32.8,
    uploadDate: "2026-11-03T02:31:01-06:00",
  },
  {
    slug: "norstat",
    brand: "Norstat",
    title: "Norstat panel recruitment campaign recap",
    seoTitle: "Norstat panel recruitment campaign recap",
    metaDescription:
      "Watch the recap of Norstat's panel campaign on Norwegian Twitch: 20 streamers, 70,083 completed views, 24,065 unique viewers and a 100% male audience.",
    line: "A survey panel offer in front of young Norwegian men.",
    context: "Norway · Twitch · June 2024",
    description:
      "Norstat runs a survey panel where members answer short surveys and collect points they can swap for gift cards, and it wanted more young men in the panel. In June 2024 the panel offer ran as an overlay on 20 Norwegian Twitch streams, showing the Norstat app and gift cards from PlayStation, Steam and Power. Viewers typed !norstat in chat to get the sign-up link.",
    results: [
      ["Completed views", "70,083"],
      ["Times the ad was displayed", "1,012"],
      ["Unique viewers", "24,065"],
      ["Male audience", "100%"],
      ["Aged 18 to 24", "76%"],
      ["Viewers in Norway", "92.6%"],
      ["Norwegian streamers", "20"],
    ],
    inFilm:
      "Real clips of streamers explaining the panel offer in their own words while the overlay is on screen, followed by the report's numbers on delivery and on who watched.",
    caseUrl: "/case-study/norstat",
    seconds: 32.4,
    uploadDate: "2026-11-03T02:31:01-06:00",
  },
  {
    slug: "surfshark-finland",
    brand: "Surfshark",
    title: "Surfshark VPN Finland campaign recap",
    seoTitle: "Surfshark VPN Finland campaign recap",
    metaDescription:
      "Watch the recap of Surfshark VPN on Finnish Twitch: 14 creators, a live poll in chat with 2,833 votes, 119,041 completed views and 1,281 clicks.",
    line: "A live VPN poll in 14 Finnish chats.",
    context: "Finland · Twitch · 1 August to 1 September 2026",
    description:
      "Surfshark VPN ran for a month on Finnish Twitch, from 1 August to 1 September 2026, with 14 creators. Every ad moment opened a poll in the creator's own chat asking viewers whether they use a VPN. Surfshark bought 100,000 views and the campaign delivered 119,041.",
    results: [
      ["Completed views", "119,041"],
      ["Views bought", "100,000"],
      ["Clicks", "1,281"],
      ["Click-through rate", "1.08%"],
      ["Poll votes", "2,833"],
      ["Polls run in chat", "790"],
      ["Finnish creators", "14"],
    ],
    inFilm:
      "Real clips from the Finnish streams, the live poll (\"Hei, käytätkö VPN-yhteyttä nykyään?\", or \"Hey, do you use a VPN these days?\") filling up with answers, the chat reacting to the ads, and the final report numbers.",
    quotes: [
      {
        text: "This many ads is actually making me consider buying Surfshark, even though I wasn't going to get a VPN anyway",
        note: "A viewer in chat, translated from Finnish",
      },
    ],
    caseUrl: "/case-study/surfshark-finland",
    seconds: 38.471,
    uploadDate: "2026-11-03T02:31:01-06:00",
  },
];

export const getFilm = (slug: string | undefined) => FILMS.find((f) => f.slug === slug);

export const filmUrl = (slug: string) => `/films/${slug}`;

/** 44.967 -> "0:45" */
export const formatDuration = (seconds: number) => {
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
