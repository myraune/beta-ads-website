/**
 * Surfshark VPN Finland, 1 Aug to 1 Sep 2026, 14 Finnish Twitch creators.
 *
 * Every figure in this file traces to one of three sources:
 *  [R] surfshark-finland-report.pdf (LIVAD delivery, poll and click logs, 4 pages)
 *  [C] linkedin-newsletter/case-surfshark.md (LIVAD clip, chat and campaign analytics,
 *      Twitch VOD and clip counts, snapshot 1 Sep 2026)
 *  [Q] linkedin-newsletter/img/surf2.html (per-channel VOD views, chat tone counts,
 *      translated chat quotes)
 * Nothing is estimated. Derived values are marked "derived" and are plain arithmetic
 * on sourced figures.
 */

export const IMG = "/lovable-uploads/case-surfshark-finland";

/** [R] page 1 headline */
export const headline = {
  viewsDelivered: 119041,
  clicks: 1281,
  ctr: "1.08%",
  polls: 790,
  votes: 2833,
  chatMessagesDuringAds: 22604, // [R] page 2
  chatPeopleDuringAds: 2141, // [R] page 2
};

/** [C] delivery */
export const delivery = {
  bought: 100000,
  live: 119041,
  // No VOD or clip view counts: a Twitch VOD's view count includes the live
  // audience, so it is not replay reach and must not be added to live views.
};

/** [C] verification */
export const verification = {
  adPlays: 759,
  streams: 202,
  clipVerified: 98.7,
  displayedCorrectly: 89.9,
  brandSaid: 31.5,
  hoursWatched: 964,
};

/** [R] page 2, Finnish answer text as shown in the creators' chat */
export const poll = {
  questionFi: "Hei, käytätkö VPN-yhteyttä nykyään?",
  questionEn: "Hey, do you use a VPN these days?",
  options: [
    { fi: "En", en: "No", pct: 69.3, votes: 1964, reading: "Needs to learn what a VPN is for" },
    { fi: "Käytän toista VPN-palvelua", en: "I use another VPN", pct: 16.3, votes: 461, reading: "Needs a reason to switch" },
    { fi: "Harkitsen sitä", en: "I'm considering it", pct: 9.7, votes: 275, reading: "Needs a reason to start" },
    { fi: "Kyllä, käytän Surfsharkia", en: "Yes, I use Surfshark", pct: 4.7, votes: 133, reading: "Already customers" },
  ],
};

/** [C] + [Q] chat keyword tracking (surfshark, vpn, surf), deduplicated, bots removed */
export const chat = {
  messages: 188,
  viewers: 130,
  chats: 13,
  selfTypedCommands: 13,
  dashboardKeywordHits: 1130, // [Q] source note: LIVAD dashboard count before dedup
  tone: [
    { label: "Positive", pct: 36, count: 67 },
    { label: "Neutral", pct: 30, count: 57 },
    { label: "Question", pct: 19, count: 35 },
    { label: "Negative", pct: 15, count: 29 },
  ],
  whatIsAVpnQuestions: 11,
  buyingQuestions: 7,
  buyingTopics: [
    "What it costs",
    "Whether the offer is for new customers only",
    "How many devices it covers",
    "Whether it unlocks US Netflix",
    "Whether it keeps logs",
  ],
};

/**
 * [Q] Viewer messages, translated from Finnish, usernames left out.
 * One quote from the source set is left out on purpose because it quotes a price.
 */
export const quotes = [
  {
    tone: "Positive",
    en: "This many ads is actually making me consider buying Surfshark, even though I wasn't going to get a VPN anyway",
    fi: "Tää mainosten määrä saa mut enemmä surfsharkin ostamista castaa vaikken ollu muutenkaa hommaamas vpn:ää",
  },
  {
    tone: "Positive",
    en: "So annoying that I always miss the Surfshark poll, when for once I would get to press YES!",
    fi: "Iha tyhmää et mä missaan aina ton surfsark kyselyn, ku kerranki saisin painaa JOO!",
  },
  {
    tone: "Positive",
    en: "well it is actually almost half the price of NordVPN",
    fi: "No on toi itse asias melkein puolet nordvpn:ää halvempi",
  },
  {
    tone: "Question",
    en: "can you watch, say, US Netflix with that Surfshark?",
    fi: "voiko tuolla surfsharkilla katsoa esim jenkkien netfilxiä?",
  },
  {
    tone: "Negative",
    en: "The constant VPN poll is starting to grate on me, so my tactic now is to change my answer every time",
    fi: "Mua rupee kyrsii jatkuva vpn kysely ni minäpä otin taktiikaks vaihtaa vastausvalintaa",
  },
];

/** [R] page 3, resolved on 1,327 click-log rows */
export const clickAudience = {
  resolvedOn: 1327,
  device: [
    { label: "Desktop", pct: 87.6, n: 1162 },
    { label: "Mobile", pct: 12.2, n: 162 },
    { label: "Tablet", pct: 0.2, n: 3 },
  ],
  os: [
    { label: "Windows", pct: 81.9, n: 1087 },
    { label: "Android", pct: 9.3, n: 124 },
    { label: "macOS", pct: 3.8, n: 50 },
    { label: "iOS", pct: 3.1, n: 41 },
    { label: "Linux", pct: 1.8, n: 24 },
    { label: "Chrome OS", pct: 0.1, n: 1 },
  ],
  browser: [
    { label: "Chrome", pct: 63.1, n: 837 },
    { label: "Firefox", pct: 20.4, n: 271 },
    { label: "Opera", pct: 6.5, n: 86 },
    { label: "Edge", pct: 4.8, n: 64 },
    { label: "Safari", pct: 4.3, n: 57 },
    { label: "Samsung Internet", pct: 0.9, n: 12 },
  ],
};

/** [R] page 4, IP geolocation; located on 533 clicks, city on 508 */
export const geo = {
  located: 533,
  locatedShare: "40%",
  cityResolved: 508,
  vpnProxyClicks: 4,
  vpnProxyShare: "0.8%",
  countries: [
    { label: "Finland", pct: 98.1, n: 523 },
    { label: "United States", pct: 0.8, n: 4 },
    { label: "Netherlands", pct: 0.4, n: 2 },
    { label: "Germany", pct: 0.4, n: 2 },
    { label: "Czechia", pct: 0.2, n: 1 },
    { label: "Ukraine", pct: 0.2, n: 1 },
  ],
  cities: [
    { label: "Helsinki", pct: 25.6, n: 130 },
    { label: "Oulu", pct: 18.1, n: 92 },
    { label: "Espoo", pct: 5.3, n: 27 },
    { label: "Turku", pct: 4.1, n: 21 },
    { label: "Lahti", pct: 3.9, n: 20 },
    { label: "Tampere", pct: 3.9, n: 20 },
    { label: "Jyväskylä", pct: 3.7, n: 19 },
    { label: "Kuopio", pct: 3.1, n: 16 },
    { label: "Ekenäs", pct: 2.6, n: 13 },
    { label: "Kokkola", pct: 2.4, n: 12 },
  ],
  otherCities: { pct: 27.2, n: 138 },
};

export const gallery = [
  { src: "poll-driving.webp", alt: "IRL stream filmed from the driver's seat, with the Surfshark overlay on the left and the Finnish VPN poll at the bottom showing 29 votes", caption: "IRL from the car. The poll runs at the bottom of the frame while the overlay holds the left edge." },
  { src: "poll-chat-command.webp", alt: "Just Chatting stream with the poll in the top left corner and a chat message advertising the Surfshark offer link", caption: "The poll in the creator's own layout, and the chat command reply with the offer link below it." },
  { src: "poll-gameplay.webp", alt: "Third-person game with the creator's webcam, the Surfshark overlay and a compact poll in the top right corner", caption: "Gameplay stream with the poll tucked into the top right." },
  { src: "poll-car.webp", alt: "Creator talking to camera while driving, with the Surfshark overlay and the VPN poll on screen", caption: "Talking to chat on the road, 13 votes in." },
  { src: "just-chatting.webp", alt: "Creator wearing headphones on a Just Chatting stream with the Surfshark overlay on the left and a busy chat on the right", caption: "Just Chatting with a full chat column next to the overlay." },
  { src: "drums-chat-command.webp", alt: "Music stream with a drummer on screen, the Surfshark overlay and the offer message in chat", caption: "A music stream, with the offer message posted in chat." },
  { src: "poll-studio.webp", alt: "Empty streaming studio between segments, with the Surfshark overlay and the poll showing 15 votes", caption: "Between segments, the overlay and poll keep running." },
  { src: "guitar-stream.webp", alt: "Guitar rhythm game stream with the Surfshark overlay on the left", caption: "Guitar stream with the overlay over the song list." },
  { src: "poll-outdoor.webp", alt: "Outdoor map stream with the creator's webcam, the Surfshark overlay and the poll at the start of a round", caption: "A poll seconds after it opened, first vote in." },
];

export const codePanels = [
  { src: "code-panel-turunpug.webp", name: "TurunPug" },
  { src: "code-panel-henksuliini.webp", name: "Henksuliini" },
  { src: "code-panel-miikaz.webp", name: "miikaz" },
  { src: "code-panel-ketku.webp", name: "KETKU" },
];

export const fmt = (n: number) => n.toLocaleString("en-US");
