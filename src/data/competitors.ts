/* Comparison pages (/compare/:slug). One entry per alternative a buyer weighs
 * against Beta Ads. Read by src/pages/Compare.tsx and by the build scripts
 * (sitemap, prerender, SEO shells), so a new competitor is one entry here.
 *
 * Rules, because AI assistants and buyers read these pages as evidence:
 *   - every claim about a competitor carries a public source with a date;
 *   - say where the competitor is the better choice, not only where we are;
 *   - our own column only states confirmed Beta Ads facts (see reference_betaads_trust_facts). */

/** Scorecard: one mark per capability, plus a short note. "unknown" = not published. */
export type Mark = "yes" | "partial" | "no" | "unknown";
export const CAPS = [
  ["inStream", "Ad runs inside the stream"],
  ["custom", "Creative designed for your brand"],
  ["platforms", "Twitch, YouTube and Kick"],
  ["nordic", "Nordic streamers (NO, SE, DK, FI)"],
  ["price", "Published pricing"],
  ["refund", "Refund if views are not delivered"],
  ["dashboard", "Your own live dashboard"],
  ["chatCmd", "Chat command that gives viewers your link"],
  ["poll", "In-stream poll"],
  ["clips", "AI clip of every ad play"],
  ["chatTracking", "Chat tracking: every brand mention"],
  ["managed", "Campaign run for you"],
  ["selfServe", "Self-serve option"],
] as const;
export type Cap = (typeof CAPS)[number][0];

export type Source = { label: string; url: string; date: string };

export type Competitor = {
  slug: string;
  name: string;
  /** Wordmark under public/compare/logos, drawn as a one-colour mask (no tile). logoAspect = width / height. */
  logo?: string;
  logoAspect?: number;
  /** The logo file is an icon only: show the name next to it. */
  logoLabel?: boolean;
  /** Who they are: where they are based, since when, and which markets they go after. */
  hq: string;
  founded: string;
  focus: string;
  score: Record<Cap, [Mark, string?]>;
  /** What it is, in a few words, for the hub list and the intro. */
  kind: string;
  /** SEO title and description for the page. */
  title: string;
  description: string;
  /** Hero line under "Beta Ads vs X": the honest one-sentence difference. */
  summary: string;
  /** Table rows: [topic, Beta Ads, competitor]. */
  rows: [string, string, string][];
  /** Where Beta Ads differs (title, body). */
  differs: [string, string][];
  /** Where the competitor is the better choice (title, body). */
  theyFit: [string, string][];
  faqs: { q: string; a: string }[];
  sources: Source[];
  /** Date the facts were last checked, YYYY-MM-DD. */
  checked: string;
};

/** Beta Ads facts shared by every page (confirmed by Andreas, 2026-10-07). */
export const BETA_SCORE: Record<Cap, [Mark, string?]> = {
  inStream: ["yes", "Rendered in the streamer's broadcast, stays in the VOD"],
  custom: ["yes", "Animated from scratch for every brand"],
  platforms: ["yes"],
  nordic: ["yes", "Norwegian, Swedish, Danish and Finnish streamers"],
  price: ["yes", "Per 1,000 played views, from 100,000 NOK"],
  refund: ["yes", "Undelivered views refunded"],
  dashboard: ["yes", "Views, clicks and CTR per streamer"],
  chatCmd: ["yes", "Viewers type !brand and get your link"],
  poll: ["yes", "Optional poll in the streamer's chat"],
  clips: ["yes", "Every ad play is clipped automatically"],
  chatTracking: ["yes", "Every mention, translated and scored"],
  managed: ["yes", "Brief to report"],
  selfServe: ["yes", "Login for agencies and partners"],
};

export const BETA_PROFILE = {
  hq: "Oslo, Norway (registered in Frosta)",
  founded: "2024",
  focus: "Nordic brands and agencies: Norway, Sweden, Denmark and Finland",
};

export const BETA = {
  format: "Custom animated overlay designed for your brand, rendered inside the stream in OBS",
  platforms: "Twitch, YouTube and Kick",
  pricing: "Per 1,000 fully played animation views. Campaigns from 100,000 NOK",
  guarantee: "Undelivered views are refunded",
  service: "Managed: we run it from brief to report. Self-serve login for agencies",
  reporting: "Your own dashboard login during the campaign, every ad play recorded as a clip, end report",
  markets: "Norway, Sweden, Denmark and Finland, based in Oslo",
  cta: "Chat command (!brand) answered with your link, optional in-stream poll",
};

export const competitors: Competitor[] = [
  {
    slug: "twitch-ads",
    name: "Twitch Ads",
    logo: "/compare/logos/twitch-icon.svg",
    logoAspect: 1,
    logoLabel: true,
    hq: "San Francisco, USA (Twitch, owned by Amazon)",
    founded: "Owned by Amazon since 2014",
    focus: "Global; Twitch Creator Sponsorships in 17 countries, Sweden the only Nordic one",
    score: { inStream: ["partial", "Video takes over the player; skins sit around it; readouts are live"], custom: ["partial", "Your own video; sponsorship skins are templated and static"], platforms: ["partial", "Twitch only"], nordic: ["partial", "Video via Amazon DSP in the Nordics; sponsorships in Sweden only"], price: ["no", "Says minimum spend, no figure"], refund: ["unknown"], dashboard: ["yes", "Amazon DSP reporting"], chatCmd: ["unknown"], poll: ["unknown"], clips: ["unknown"], chatTracking: ["unknown"], managed: ["yes", "Managed through Amazon Ads"], selfServe: ["yes", "Amazon DSP self-service"] },
    kind: "Twitch's own ads, bought through Amazon",
    title: "Beta Ads vs Twitch Ads (Amazon DSP) for Nordic brands",
    description: "Twitch Ads are video, display and sponsorship formats sold by Amazon Ads. Beta Ads puts an animated overlay inside the stream. Formats and prices compared.",
    summary: "Twitch Ads are video, display and sponsorship formats sold through Amazon Ads. Beta Ads puts your brand inside the stream itself, as a custom animated overlay, priced per 1,000 played views.",
    rows: [
      ["What runs", "Custom animated overlay in a corner of the stream, rendered in the streamer's broadcast", "Unskippable video, display units around the player, and Creator Sponsorships with channel skins and readouts"],
      ["How you buy", "Direct with us, or self-serve login for agencies", "Through the Amazon DSP, self-serve or managed"],
      ["Nordic availability", "Built for Norway, Sweden, Denmark and Finland", "Amazon DSP, including Twitch video, launched in Norway, Sweden, Denmark and Finland in 2021; Creator Sponsorships are listed for Sweden only"],
      ["Creative", "Animated from scratch for your brand", "Your own video for media ads; sponsorship skins use a logo and a fixed call to action, with no animation"],
      ["Pricing", BETA.pricing, "Amazon mentions a minimum spend but publishes no figure"],
      ["After the stream", "The overlay is part of the video, so it is in the VOD and clips too", "Video ads are served by the platform around the content"],
    ],
    differs: [
      ["Inside the content, not around it", "The overlay is rendered into the broadcast by the streamer's own software, so it is part of the video viewers watch and part of the recording afterwards."],
      ["Animated, and made for you", "Twitch's sponsorship skins are static and templated. Our overlay is animated from scratch for your brand."],
      ["Priced on delivery", "You pay per 1,000 fully played animation views, and views we do not deliver are refunded."],
    ],
    theyFit: [
      ["You already buy through Amazon", "If your media plan runs in the Amazon DSP, Twitch video sits in the same buying path as Prime Video and display."],
      ["You need Amazon's audiences", "Amazon offers first-party shopping and streaming audiences and its own measurement, which we do not have."],
      ["You want full-screen video reach", "For an unskippable video spot across large audiences, platform video ads are the format built for it."],
    ],
    faqs: [
      { q: "Can I buy Twitch Ads in Norway?", a: "Twitch video can be bought programmatically through the Amazon DSP, which launched self-service in Norway, Sweden, Denmark and Finland in 2021. Twitch Creator Sponsorships were launched in 17 countries, and Sweden is the only Nordic one." },
      { q: "What does Twitch advertising cost?", a: "Amazon's Twitch page says campaigns need a minimum spend but does not publish the figure. Beta Ads campaigns start from 100,000 NOK, priced per 1,000 played views." },
      { q: "Can I run both?", a: "Yes. They do different jobs: platform video ads for reach around the content, a Beta Ads overlay for presence inside the streams your audience is watching." },
    ],
    sources: [
      { label: "Amazon Ads: Twitch", url: "https://advertising.amazon.com/channels/twitch", date: "checked 26 Oct 2026" },
      { label: "Amazon Ads: Twitch ad specs", url: "https://advertising.amazon.com/resources/ad-specs/twitch", date: "checked 26 Oct 2026" },
      { label: "Amazon Ads: Channel Takeover specs", url: "https://advertising.amazon.com/resources/ad-specs/twitch/channel-takeover", date: "checked 26 Oct 2026" },
      { label: "Amazon Ads: Amazon DSP launches in Sweden, Denmark, Finland and Norway (archived)", url: "http://web.archive.org/web/20240526002840/https://advertising.amazon.com/en-gb/resources/whats-new/amazon-dsp-launches-in-sweden", date: "18 Oct 2021" },
      { label: "ChannelX: Amazon Ads launches Twitch Creator Sponsorships", url: "https://channelx.world/2025/05/amazon-ads-launches-twitch-creator-sponsorships/", date: "30 May 2025" },
      { label: "Amazon: Amazon.com to acquire Twitch", url: "https://press.aboutamazon.com/2014/8/amazon-com-to-acquire-twitch", date: "25 Aug 2014" },
    ],
    checked: "2026-10-26",
  },
  {
    slug: "streamelements",
    name: "StreamElements",
    hq: "Tel Aviv, Israel; assets bought by Razer in July 2026",
    founded: "2016 or 2017 (sources differ)",
    focus: "Global, mainly North America; gaming and food delivery brands",
    score: { inStream: ["yes", "Every campaign requires a branded overlay in OBS"], custom: ["yes", "Branded overlay per campaign brief"], platforms: ["partial", "Twitch first; links can be shared on YouTube and Kick"], nordic: ["unknown"], price: ["no", "No published rates; performance-based"], refund: ["unknown"], dashboard: ["unknown"], chatCmd: ["yes", "Chatbot commands are part of campaign tasks"], poll: ["unknown"], clips: ["unknown"], chatTracking: ["unknown"], managed: ["yes", "Sales-led, managed campaigns"], selfServe: ["unknown"] },
    kind: "Sponsorship network for streamers, now owned by Razer",
    title: "Beta Ads vs StreamElements sponsorships for brands | Beta Ads",
    description: "StreamElements runs performance-based sponsorships across a large creator network, with branded overlays and chatbot commands, and was bought by Razer in 2026. Beta Ads runs custom overlay campaigns on Nordic streams. Compared, with sources.",
    summary: "StreamElements runs performance-based sponsorships across a large, mostly North American creator network, and its assets were bought by Razer in July 2026. Beta Ads runs custom overlay campaigns on Nordic streams, priced per 1,000 played views.",
    rows: [
      ["What it is", "Livestream ad platform and managed service for Nordic brands", "Sponsorship network: brand offers delivered to streamers' dashboards"],
      ["Company", "BETA AGENCY AS, Oslo, Norway", "Assets bought by Razer from Live Momentum Ltd. in July 2026; runs as a standalone platform"],
      ["How you pay", BETA.pricing, "Performance-based, e.g. per download or subscription; no published rates"],
      ["Platforms", BETA.platforms, "Twitch first, plus YouTube sponsorships; links can be shared on Kick"],
      ["Streamers", "Norwegian, Swedish, Danish and Finnish streamers", "Matched by language and location; the Twitch tab launched in English, German and French"],
      ["Call to action", BETA.cta, "Branded overlay plus chatbot commands and a campaign link or QR code"],
    ],
    differs: [
      ["Nordic language streams", "We buy Norwegian, Swedish, Danish and Finnish streams, chosen by name and approved by you."],
      ["You pay for views, not outcomes", "Per 1,000 played views from 100,000 NOK, with a refund for anything not delivered, so the cost is known before launch."],
      ["Built for brand campaigns", "One custom animation runs the same on every channel, with a report you can forward."],
    ],
    theyFit: [
      ["You sell an app, game or subscription in English-speaking markets", "StreamElements pays creators on downloads and sign-ups, mainly with North American creators."],
      ["You want to pay only for performance", "Its sponsorships are built around actions like installs and purchases."],
    ],
    faqs: [
      { q: "Is StreamElements still running?", a: "Yes. After reports of a shutdown in May 2026, Razer bought substantially all of its assets on 31 July 2026 and said sponsorships will continue." },
      { q: "Does StreamElements cover Norwegian streamers?", a: "Its eligibility rules match campaigns by language and location, and the Twitch Sponsorships tab launched with English, German and French campaigns. Ask StreamElements about Norwegian campaigns." },
      { q: "How does Beta Ads choose streamers?", a: "We select them from the Streamer Explorer by market, language, category and audience. You can see and approve the list before launch." },
    ],
    sources: [
      { label: "Razer acquires StreamElements assets (Game Developer)", url: "https://www.gamedeveloper.com/press-release/razer-acquires-streamelements-assets-to-expand-content-creator-ecosystem", date: "31 Jul 2026" },
      { label: "StreamElements: acquisition FAQ", url: "https://support.streamelements.com/hc/en-us/articles/37638071435282-Acquisition-FAQ", date: "1 Aug 2026" },
      { label: "StreamElements: sponsorship support articles", url: "https://support.streamelements.com/hc/en-us/categories/10474308538002-Sponsorships", date: "checked 26 Oct 2026" },
      { label: "StreamElements for brands", url: "https://streamelements.com/brands", date: "checked 26 Oct 2026" },
      { label: "Twitch blog: Expanding your sponsorship opportunities", url: "https://blog.twitch.tv/en/2025/02/25/expanding-your-sponsorship-opportunities-on-twitch/", date: "25 Feb 2025" },
      { label: "Globes: StreamElements sold to Razer", url: "https://en.globes.co.il/en/article-1001551482", date: "5 Aug 2026" },
      { label: "GamesBeat: StreamElements shutdown reports", url: "https://gamesbeat.com/?p=323450", date: "21 May 2026" },
    ],
    checked: "2026-10-26",
  },
  {
    slug: "upliftu",
    name: "UpliftU",
    logo: "/compare/logos/upliftu.svg",
    logoAspect: 2.89,
    hq: "Sandefjord, Norway (LØFT OPP AS)",
    founded: "2021; first campaign in May 2022",
    focus: "Twitch, with Norwegian tech and retail clients",
    score: { inStream: ["yes", "Banner in OBS, up to 30 seconds every 10 minutes"], custom: ["yes", "Custom animation and banner"], platforms: ["partial", "Twitch; Kick not mentioned"], nordic: ["partial", "Norwegian clients and campaigns"], price: ["no", "No general rates published"], refund: ["unknown"], dashboard: ["yes", "Real-time brand dashboard"], chatCmd: ["yes", "Chat commands with a chatbot"], poll: ["no", "Not seen in their campaigns"], clips: ["no", "No automatic clips of ad plays"], chatTracking: ["partial", "Counts brand mentions in chat; no translation or scoring"], managed: ["yes", "Full-service"], selfServe: ["partial", "Brand users can trigger activations"] },
    kind: "Twitch sponsorship platform, Norway",
    title: "Beta Ads vs UpliftU: livestream advertising in Norway compared | Beta Ads",
    description: "UpliftU (LØFT OPP AS, Sandefjord) runs Twitch sponsorships with overlays and chat commands for Norwegian brands. Beta Ads runs custom overlays on Twitch, YouTube and Kick with AI clips, chat tracking and a refund for undelivered views. Compared, with sources.",
    summary: "UpliftU is a Norwegian Twitch sponsorship platform with overlays and chat commands, run by LØFT OPP AS in Sandefjord. Beta Ads covers Twitch, YouTube and Kick, clips every ad play automatically, and refunds views it does not deliver.",
    rows: [
      ["Company", "BETA AGENCY AS, org.nr 933 303 136, Oslo", "LØFT OPP AS, org.nr 926 625 845, Sandefjord"],
      ["Platforms", BETA.platforms, "Twitch"],
      ["Format", BETA.format, "Banner in OBS, up to 30 seconds every 10 minutes, max 12% of the screen"],
      ["Proof of delivery", "Every ad play is clipped automatically", "No automatic clips of ad plays"],
      ["Chat", "!brand command, optional poll, every mention translated and scored", "Chat commands and a count of brand mentions"],
      ["Pricing", BETA.pricing, "No general rates published"],
      ["If it under-delivers", BETA.guarantee, "No refund terms published"],
    ],
    differs: [
      ["Three platforms, not one", "We run the same campaign on Twitch, YouTube and Kick, so you follow the streamers where they go."],
      ["Every ad play on video", "Each play is clipped automatically, so delivery is something you can watch, not a number in a report."],
      ["Chat you can read", "Every mention of your brand is collected, translated and scored for tone, and you can run a poll in the streamer's chat."],
    ],
    theyFit: [
      ["You only want Twitch", "UpliftU is built around Twitch, with chat commands and real-time reporting."],
      ["You want a long list of tech retail references", "UpliftU shows AMD, Komplett, Elkjøp, FINN, BI and Nvidia among its clients."],
    ],
    faqs: [
      { q: "Who is behind UpliftU?", a: "UpliftU's terms of service name LØFT OPP AS, org.nr 926 625 845, registered in Sandefjord and founded in 2021." },
      { q: "What is the difference between UpliftU and Beta Ads?", a: "Both run overlays and chat commands inside streams. Beta Ads also covers YouTube and Kick, clips every ad play automatically, translates and scores every brand mention, offers in-stream polls, and refunds undelivered views." },
      { q: "Does UpliftU publish prices?", a: "We could not find general rates on its site. Beta Ads campaigns start from 100,000 NOK, priced per 1,000 played views." },
    ],
    sources: [
      { label: "UpliftU website", url: "https://upliftu.gg/", date: "checked 26 Oct 2026" },
      { label: "UpliftU: about", url: "https://upliftu.gg/about", date: "checked 26 Oct 2026" },
      { label: "UpliftU: terms of service (LØFT OPP AS)", url: "https://upliftu.notion.site/Terms-of-Service-a53cb97a480d45abb25235b69ffc7ea4", date: "updated 8 Aug 2023" },
      { label: "UpliftU help center: FAQ", url: "https://help.upliftu.gg/faq/", date: "checked 26 Oct 2026" },
      { label: "UpliftU help center: campaign types", url: "https://help.upliftu.gg/knowledge-base/choosing-the-right-campaign-type/", date: "checked 26 Oct 2026" },
      { label: "Brønnøysund Register Centre: LØFT OPP AS", url: "https://virksomhet.brreg.no/nb/oppslag/enheter/926625845", date: "checked 26 Oct 2026" },
      { label: "Sandefjord Næringsforening: Skal erobre milliardmarked", url: "https://www.sandefjordnaringsforening.no/nyheter/skal-erobre-milliardmarked/", date: "Jan 2023" },
    ],
    checked: "2026-10-26",
  },
  {
    slug: "instreamly",
    name: "inStreamly",
    logo: "/compare/logos/instreamly.svg",
    logoAspect: 6.0,
    hq: "Warsaw, Poland (inStreamly P.S.A.)",
    founded: "2019, per its founders' story; seed round in 2021",
    focus: "Global, with campaigns across Europe, Latin America and Japan",
    score: { inStream: ["yes", "Artwork shown automatically on stream"], custom: ["yes", "Artwork made by them or the brand"], platforms: ["yes", "Twitch, YouTube and Kick"], nordic: ["partial", "Agency partners in Norway and Denmark"], price: ["no", "CPC or CPV rates set per contract"], refund: ["unknown"], dashboard: ["yes", "Campaign dashboard plus weekly reports"], chatCmd: ["partial", "A chat message with the link is sent with the animation"], poll: ["yes", "Chat voting"], clips: ["unknown"], chatTracking: ["yes", "Chat and voice intelligence with sentiment"], managed: ["yes", "Delivered against the brand's brief"], selfServe: ["unknown"] },
    kind: "Livestream sponsorship platform, Poland",
    title: "inStreamly alternative for Nordic brands: Beta Ads vs inStreamly | Beta Ads",
    description: "inStreamly is a Warsaw-based livestream sponsorship platform with a large global streamer network. Beta Ads, a former inStreamly partner, runs custom overlay campaigns on Nordic streams with a published price and a refund for undelivered views. Compared, with sources.",
    summary: "inStreamly runs livestream sponsorships across a large global streamer network from Warsaw. Beta Ads runs custom overlay campaigns on Nordic streams, with a published price from 100,000 NOK and a refund for undelivered views.",
    rows: [
      ["Company", "BETA AGENCY AS, Oslo, Norway", "inStreamly P.S.A., Warsaw, Poland"],
      ["Network", "39,000+ streamers in the Streamer Explorer, 37,599 recently active", "150k+ streamers, as stated on its site"],
      ["Markets", BETA.markets, "Global, with partner campaigns from Japan to Brazil and agency partners in Norway and Denmark"],
      ["Pricing", BETA.pricing, "CPC or CPV rates set per contract, plus setup and artwork fees"],
      ["If it under-delivers", BETA.guarantee, "No refund clause in its brand terms; advance payments are non-refundable on cancellation"],
      ["Proof of delivery", "Every ad play is clipped automatically", "Dashboard plus weekly and final reports"],
    ],
    differs: [
      ["Built for the Nordics", "Norwegian, Swedish, Danish and Finnish streamers, and one Nordic contact for the whole campaign."],
      ["A published price and a refund", "Per 1,000 fully played views from 100,000 NOK, with a refund for anything not delivered."],
      ["Every ad play on video", "Each play is clipped automatically, so you can watch your delivery stream by stream."],
    ],
    theyFit: [
      ["You want global reach in one campaign", "inStreamly's network and partner campaigns span Europe, Latin America and Japan."],
      ["You want a very large streamer pool", "Its site states 150k+ streamers and campaigns for 549+ brands."],
    ],
    faqs: [
      { q: "Did Beta Ads work with inStreamly?", a: "Yes. In 2024 Beta Ads used inStreamly as a technology partner in Norway, as Kom24 reported at the time. That partnership has ended, and Beta Ads now runs its campaigns on a different platform." },
      { q: "What is a good inStreamly alternative in Norway?", a: "If you want Nordic streamers, custom creative, a published per-view price and a refund for undelivered views, Beta Ads is built for that. If you want one campaign across many countries, inStreamly's global network is the stronger fit." },
      { q: "How does inStreamly charge?", a: "Its brand terms describe CPC or CPV pricing with rates set per contract, plus setup and artwork fees." },
    ],
    sources: [
      { label: "inStreamly: brand terms", url: "https://instreamly.com/terms-of-use-for-brands/", date: "valid from 9 May 2024" },
      { label: "inStreamly: privacy policy (company details)", url: "https://instreamly.com/privacy-policy/", date: "checked 26 Oct 2026" },
      { label: "inStreamly: about", url: "https://instreamly.com/about/", date: "checked 26 Oct 2026" },
      { label: "inStreamly 2.0", url: "https://instreamly.com/posts/instreamly-2-0-the-future-of-gaming-marketing-is-here/", date: "12 Feb 2026" },
      { label: "inStreamly: Q2 2026 wrapped", url: "https://instreamly.com/posts/q2-2026-wrapped-three-cannes-lions-for-firecatchers-new-campaign-formats-and-market-insights/", date: "22 Jul 2026" },
      { label: "inStreamly: chat voting mechanism", url: "https://instreamly.com/posts/which-way-would-you-choose-instreamly-chat-voting-mechanism/", date: "8 Nov 2022" },
      { label: "inStreamly: Bark Agency partnership in Denmark", url: "https://instreamly.com/posts/bark-agency-teams-up-with-instreamly-to-transform-gaming-marketing-in-denmark/", date: "11 Mar 2025" },
      { label: "tech.eu: inStreamly raises €1.1M", url: "https://tech.eu/2021/04/14/warsaw-based-steaming-sponsorships-platform-instreamly-raises-e1-1-million/", date: "14 Apr 2021" },
      { label: "Kom24: Instreamly og Beta inngår partnerskap i Norge", url: "https://www.kom24.no/andreas-myraune-beta-instreamly/instreamly-og-beta-inngar-partnerskap-i-norge/749907", date: "2024" },
    ],
    checked: "2026-10-26",
  },
  {
    slug: "lurkit",
    name: "Lurkit",
    logo: "/compare/logos/lurkit-wordmark.png",
    logoAspect: 5.37,
    hq: "Linköping, Sweden (Lurkit AB)",
    founded: "2015",
    focus: "Game publishers and studios, and brands looking for presence in gaming",
    score: { inStream: ["partial", "Creators make the content from your brief"], custom: ["partial", "Made by each creator, no brand overlay"], platforms: ["partial", "Twitch, YouTube, Shorts and TikTok; Kick not mentioned"], nordic: ["unknown"], price: ["partial", "Plans on request; 20% commission per Quest"], refund: ["unknown"], dashboard: ["yes", "Real-time data per creator"], chatCmd: ["unknown"], poll: ["unknown"], clips: ["unknown"], chatTracking: ["unknown"], managed: ["yes", "Assisted Service with account managers"], selfServe: ["yes", "Campaigns launched in a few clicks"] },
    kind: "Creator marketing platform for games, Sweden",
    title: "Beta Ads vs Lurkit: creator marketing for games vs livestream ads for brands | Beta Ads",
    description: "Lurkit is a Swedish creator marketing platform for game publishers and studios, with paid Quests at a 20% commission. Beta Ads runs custom overlay campaigns inside live streams for brands. Company, model, platforms and pricing compared, with sources.",
    summary: "Lurkit helps game publishers and studios work with creators, from key campaigns to paid Quests where creators make the content. Beta Ads puts one custom overlay inside the streams for your brand, priced per 1,000 played views.",
    rows: [
      ["Built for", "Brands and their media agencies", "Game publishers and studios, plus brands that want presence in gaming"],
      ["Company", "BETA AGENCY AS, Oslo, Norway", "Lurkit AB, org.nr 559033-9973, Linköping, Sweden"],
      ["What you buy", "Overlay views inside live streams", "Creator content: paid Quests, key campaigns and creator programs"],
      ["Platforms", BETA.platforms, "Twitch, YouTube, YouTube Shorts and TikTok"],
      ["Pricing", BETA.pricing, "Plans on request, 20% commission per paid Quest"],
      ["Model", BETA.service, "Self-serve marketplace plus Assisted Service"],
    ],
    differs: [
      ["One creative on every channel", "Your animation plays inside the broadcast on every stream, instead of depending on what each creator makes."],
      ["Made for brands outside gaming", "Samsung, Komplett, Shure and Høyskolen Kristiania have run campaigns with us."],
      ["Priced on delivered views", "Per 1,000 fully played views, with a refund for anything not delivered."],
    ],
    theyFit: [
      ["You are marketing a game", "Game launches are what Lurkit is built for: key distribution, creator programs and game insights. Its clients include Bethesda, THQ Nordic and Funcom."],
      ["You need TikTok and Shorts", "Lurkit covers short-form platforms we do not."],
      ["You want creators to bid", "Paid Quests let creators apply and bid on your brief."],
    ],
    faqs: [
      { q: "Who is Lurkit for?", a: "Lurkit's site describes it as a creator platform for game growth, sold to publishers, studios and brands that want presence in gaming." },
      { q: "How does Lurkit charge?", a: "Its pricing page lists plans on request and a 20% commission per paid Quest." },
      { q: "Can a game studio use Beta Ads?", a: "Yes. An overlay with a chat command works for launches too, but for key distribution and creator programs Lurkit covers more." },
    ],
    sources: [
      { label: "Lurkit: terms of service (Lurkit AB)", url: "https://www.lurkit.gg/terms-of-service", date: "checked 26 Oct 2026" },
      { label: "Allabolag: Lurkit AB", url: "https://www.allabolag.se/5590339973", date: "checked 26 Oct 2026" },
      { label: "Lurkit: paid Quests", url: "https://www.lurkit.gg/solutions/paid-quests", date: "checked 26 Oct 2026" },
      { label: "Lurkit: pricing", url: "https://www.lurkit.gg/pricing", date: "checked 26 Oct 2026" },
      { label: "Lurkit: for brands", url: "https://www.lurkit.gg/brands", date: "checked 26 Oct 2026" },
      { label: "Lurkit: Assisted Service", url: "https://www.lurkit.gg/solutions/assisted-service", date: "checked 26 Oct 2026" },
      { label: "MrWeb: Lurkit raises seed funding", url: "https://www.mrweb.com/drno/news33391.htm", date: "9 Jun 2022" },
    ],
    checked: "2026-10-26",
  },
  {
    slug: "wehype",
    name: "Wehype",
    logo: "/compare/logos/wehype.svg",
    logoAspect: 5.3,
    hq: "Sweden (Wehype Global AB)",
    founded: "2016",
    focus: "Game publishers and studios, worldwide",
    score: { inStream: ["partial", "Creators stream your game from a brief"], custom: ["partial", "Made by each creator, no brand overlay mentioned"], platforms: ["partial", "Twitch; YouTube and Kick not mentioned on its site"], nordic: ["unknown"], price: ["no", "No prices on its site"], refund: ["unknown"], dashboard: ["yes", "Real-time progress tracking per campaign"], chatCmd: ["unknown"], poll: ["unknown"], clips: ["unknown"], chatTracking: ["unknown"], managed: ["yes", "Strategic and operational partner"], selfServe: ["unknown"] },
    kind: "Creator marketing for games, official Twitch partner, Sweden",
    title: "Beta Ads vs Wehype: Twitch creator campaigns for games vs livestream ads for brands | Beta Ads",
    description: "Wehype is a Swedish creator marketing company for game publishers, and since August 2026 its campaigns appear inside Twitch's Sponsorship Dashboard. Beta Ads runs custom overlay campaigns inside live streams for brands. Company, model, platforms and pricing compared, with sources.",
    summary: "Wehype runs creator campaigns for game publishers, and its campaigns are offered to streamers directly inside Twitch's Sponsorship Dashboard. Beta Ads puts one custom overlay inside the streams for your brand, priced per 1,000 played views.",
    rows: [
      ["Built for", "Brands and their media agencies", "Game publishers and studios"],
      ["Company", "BETA AGENCY AS, Oslo, Norway", "Wehype Global AB, org.nr 559068-6936, Sweden, founded 2016"],
      ["What you buy", "Overlay views inside live streams", "Creator campaigns: sponsorships, community rewards and creator codes"],
      ["Platforms", BETA.platforms, "Twitch, with an official integration in Twitch's Sponsorship Dashboard"],
      ["Pricing", BETA.pricing, "Not published"],
      ["Model", BETA.service, "Managed, with its own campaign platform"],
    ],
    differs: [
      ["One creative on every channel", "Your animation plays inside the broadcast on every stream, instead of depending on what each creator makes."],
      ["Made for brands outside gaming", "Samsung, Komplett, Shure and Høyskolen Kristiania have run campaigns with us."],
      ["Twitch, YouTube and Kick", "One campaign runs across all three platforms."],
    ],
    theyFit: [
      ["You are marketing a game", "Wehype is built for game publishers. It names Electronic Arts, Techland, CI Games and Supercell among the companies it has worked with."],
      ["You want Twitch's own sponsorship channel", "Since August 2026 Wehype campaigns show up inside Twitch's Sponsorship Dashboard, where Affiliates and Partners can opt in."],
      ["You need hundreds of creators", "Wehype says its campaigns run with anything from 50 to 500 creators, across a game's whole lifecycle."],
    ],
    faqs: [
      { q: "Who is Wehype for?", a: "Wehype describes itself as a creator marketing platform built for the games industry, connecting publishers and studios with gaming creators." },
      { q: "What is the Wehype and Twitch partnership?", a: "Announced on 21 August 2026: Wehype campaigns appear in Twitch's Sponsorship Dashboard, where eligible creators can opt in and read the brief. The first campaign was EA's Battlefield 6." },
      { q: "Can a game studio use Beta Ads?", a: "Yes. An overlay with a chat command works for launches too, but for large creator programs built around a game Wehype covers more." },
    ],
    sources: [
      { label: "Wehype: website", url: "https://wehype.com", date: "checked 26 Oct 2026" },
      { label: "Games Press: Wehype and Twitch partnership", url: "https://www.gamespress.com/en-US/Wehype-and-Twitch-Partnership-Expands-Sponsorship-Opportunities-for-Tw", date: "21 Aug 2026" },
      { label: "Twitch on X: Affiliates get Creator Sponsorships, partnering with Wehype", url: "https://x.com/Twitch/status/2090486137517142502", date: "Aug 2026" },
      { label: "Syna: Wehype Global AB", url: "https://upplysningar.syna.se/foretag/5590686936/wehype-global-ab", date: "checked 26 Oct 2026" },
    ],
    checked: "2026-10-26",
  },
  {
    slug: "adlab",
    name: "Juno (Adlab)",
    logo: "/compare/logos/juno-wordmark.svg",
    logoAspect: 4.85,
    hq: "Denmark (The Monocular ApS)",
    founded: "Not stated by the company",
    focus: "International creator network, 20+ markets per Juno",
    score: { inStream: ["yes", "Overlay in the stream via a browser source"], custom: ["partial", "A 20-second visual was made for Philips in 2023"], platforms: ["yes", "Twitch, Kick and YouTube Live, plus TikTok"], nordic: ["unknown"], price: ["no", "No rates published"], refund: ["unknown"], dashboard: ["unknown"], chatCmd: ["partial", "A link is posted in chat"], poll: ["unknown"], clips: ["unknown"], chatTracking: ["unknown"], managed: ["yes", "Sales-led campaigns"], selfServe: ["unknown"] },
    kind: "Livestream ad network, Denmark",
    title: "Beta Ads vs Juno (Adlab, formerly Cavea): livestream ads compared | Beta Ads",
    description: "Juno, run by The Monocular ApS in Denmark with the creator app Adlab (formerly Cavea), places overlays inside live streams across a creator network. Beta Ads runs custom overlay campaigns for Nordic brands with a published price and refund. Compared, with sources.",
    summary: "Juno places overlays inside live streams through its creator app Adlab, run by The Monocular ApS in Denmark. Beta Ads designs a custom animation for your brand and publishes how you pay, with a refund for undelivered views.",
    rows: [
      ["Company", "BETA AGENCY AS, Oslo, Norway", "The Monocular ApS, Denmark (Juno for brands, Adlab for creators; cavea.io now redirects to Juno)"],
      ["Platforms", BETA.platforms, "Twitch, Kick, TikTok and YouTube Live"],
      ["Creative", "Custom animation designed for your brand", "Static and pop-up overlays; a 20-second visual in the 2023 Philips campaign"],
      ["Network", "39,000+ streamers in the Streamer Explorer", "10,000+ influencers in 20+ markets, as stated by Juno"],
      ["Pricing", BETA.pricing, "Priced by CPM, CPC, follower, action or channel; no rates published"],
      ["If it under-delivers", BETA.guarantee, "No refund terms published"],
    ],
    differs: [
      ["Designed for your brand", "Every overlay is animated from scratch in your brand, with your product, sized for one corner of the stream."],
      ["Chat command, poll and tracking", "Viewers type !brand for your link, you can run a poll, and every mention is translated and scored."],
      ["Published price and a refund", "Per 1,000 fully played views from 100,000 NOK, undelivered views refunded."],
    ],
    theyFit: [
      ["You need TikTok Live", "Juno lists TikTok among its platforms; we cover Twitch, YouTube and Kick."],
      ["You want an international network", "Juno states a presence in 20+ markets."],
    ],
    faqs: [
      { q: "Are Cavea, Adlab and Juno the same company?", a: "Juno's privacy policy and terms are issued by The Monocular ApS and cover adlab.gg, and cavea.io now redirects to juno-ads.com. Adlab is the creator side, Juno the brand side." },
      { q: "Does Juno publish prices?", a: "No. Its site says campaigns are priced by CPM, CPC, follower, action or channel, without rates." },
      { q: "What did the Philips campaign on Adlab look like?", a: "MediaGuru reported 27 mostly smaller streamers, a 20-second visual running hourly, and streamers pointing viewers to a link in chat. Philips extended it from March to June 2023." },
    ],
    sources: [
      { label: "Juno website", url: "https://juno-ads.com/", date: "checked 26 Oct 2026" },
      { label: "Juno: privacy policy (The Monocular ApS)", url: "https://juno-ads.com/privacy-policy", date: "checked 26 Oct 2026" },
      { label: "Juno: terms of service", url: "https://juno-ads.com/terms-of-service", date: "checked 26 Oct 2026" },
      { label: "Adlab website", url: "https://adlab.gg", date: "checked 26 Oct 2026" },
      { label: "MediaGuru: Philips uspěl na Twitchi díky platformě Adlab", url: "https://www.mediaguru.cz/clanky/2023/03/philips-uspel-na-twitchi-diky-platforme-adlab/", date: "16 Mar 2023" },
    ],
    checked: "2026-10-26",
  },
  {
    slug: "uplify",
    name: "Uplify",
    logo: "/compare/logos/uplify-wordmark.svg",
    logoAspect: 2.47,
    hq: "Moscow, Russia (ООО «АПЛИФАЙ»), plus Uplify Inc. in Delaware, USA",
    founded: "2019",
    focus: "Russia and Brazil, with Spanish and Portuguese markets",
    score: { inStream: ["yes", "Overlays up to 15% or 50% of the screen, via an OBS widget"], custom: ["yes", "Banner, video or animation"], platforms: ["partial", "Twitch, YouTube, VK Video Live and Trovo; Kick not mentioned"], nordic: ["unknown"], price: ["partial", "Bought on CPM, practical start around RUB 1 million; no rate card"], refund: ["partial", "Adds placements until the plan is met"], dashboard: ["yes", "Real-time CPM, CPC and CTR"], chatCmd: ["partial", "A link is posted in chat when the ad shows"], poll: ["unknown"], clips: ["unknown"], chatTracking: ["unknown"], managed: ["yes", "Media plan within one business day"], selfServe: ["partial", "Brand login; the Russian offer is managed"] },
    kind: "Creator sponsorship platform, Russia",
    title: "Beta Ads vs Uplify: livestream overlay ads compared | Beta Ads",
    description: "Uplify is a Moscow-based platform selling overlays inside creator streams on Twitch, YouTube, VK and Trovo, mainly in Russia and Brazil. Beta Ads runs custom overlay campaigns on Nordic streams. Company, markets, formats and pricing compared, with sources.",
    summary: "Uplify is a Moscow-based platform that sells overlays inside creator streams, with its main markets in Russia and Brazil. Beta Ads runs custom overlay campaigns on Nordic streams, priced from 100,000 NOK with a refund for undelivered views.",
    rows: [
      ["What it is", "Livestream ad platform and managed service for Nordic brands", "Platform for buying overlays in creator streams and VODs"],
      ["Company", "BETA AGENCY AS, Oslo, Norway", "ООО «АПЛИФАЙ», Moscow, plus Uplify Inc., Delaware"],
      ["Platforms", BETA.platforms, "Twitch, YouTube, VK Video Live and Trovo"],
      ["Markets", BETA.markets, "Russia and Brazil, with Spanish and Portuguese sites"],
      ["Pricing", BETA.pricing, "CPM, with a practical starting point around RUB 1 million"],
      ["If it under-delivers", BETA.guarantee, "More placements are added until the plan is met"],
      ["Call to action", BETA.cta, "A link is posted in chat automatically when the ad shows"],
    ],
    differs: [
      ["A Nordic company with Nordic streamers", "BETA AGENCY AS is Norwegian, and campaigns run on Norwegian, Swedish, Danish and Finnish streams."],
      ["Refund, not make-good", "If we deliver fewer views than agreed, you get the difference back in money."],
      ["Viewers ask for the link", "Viewers type !brand to get your link, so every click comes from someone who asked for it."],
    ],
    theyFit: [
      ["You target Russia or Brazil", "Uplify's own cases and markets are there, including Ozon, Beeline and Intel Gamer Days Brazil."],
      ["You need VK Video Live", "Uplify covers VK, which we do not."],
    ],
    faqs: [
      { q: "Where is Uplify based?", a: "Uplify's Russian privacy policy names ООО «АПЛИФАЙ», Moscow, as the operator. The international site names Uplify Inc., a Delaware corporation, and its cookie policy covers uplify.app under the Russian company." },
      { q: "Does Uplify refund undelivered views?", a: "Its FAQ says it adds placements until the plan is met. Beta Ads refunds the undelivered share." },
      { q: "Which platforms does Beta Ads cover?", a: "Twitch, YouTube and Kick, with Norwegian, Swedish, Danish and Finnish streamers." },
    ],
    sources: [
      { label: "Uplify (uplify.ru): privacy policy", url: "https://uplify.ru/legal/privacy-policy", date: "updated 15 Sep 2026" },
      { label: "Uplify (uplify.app): privacy policy", url: "https://uplify.app/legal/privacy-policy/", date: "checked 26 Oct 2026" },
      { label: "Uplify (uplify.app): cookie policy", url: "https://uplify.app/legal/cookie-policy/", date: "checked 26 Oct 2026" },
      { label: "Uplify for brands (English)", url: "https://uplify.ru/en", date: "checked 26 Oct 2026" },
      { label: "Uplify FAQ", url: "https://uplify.ru/faq", date: "checked 26 Oct 2026" },
      { label: "Uplify: brands and agencies", url: "https://uplify.app/brands-and-agencies/", date: "checked 26 Oct 2026" },
      { label: "Uplify cases", url: "https://uplify.app/cases/", date: "checked 26 Oct 2026" },
      { label: "Meio & Mensagem: Uplify launches in Brazil", url: "https://www.meioemensagem.com.br/midia/uplify-brasil", date: "20 May 2024" },
    ],
    checked: "2026-10-26",
  },
  {
    slug: "loots",
    name: "Loots",
    hq: "Ahorn, Germany (Loots Media GmbH, registered in Berlin)",
    founded: "2019 (current company)",
    focus: "International self-serve brand deals; now invite-only",
    score: { inStream: ["yes", "Overlay plus chat message (product as of June 2026)"], custom: ["partial", "Your own video or image in a standard unit"], platforms: ["partial", "Twitch; Kick not mentioned"], nordic: ["unknown"], price: ["partial", "Dynamic pricing by demand; no figures"], refund: ["unknown", "Advertiser page and purchase terms contradict each other"], dashboard: ["yes", "Real-time dashboards"], chatCmd: ["partial", "A link is posted in chat on every display"], poll: ["unknown"], clips: ["unknown"], chatTracking: ["unknown"], managed: ["unknown"], selfServe: ["yes", "Now invite-only with a waiting list"] },
    kind: "Self-serve brand deals on streams, Germany",
    title: "Beta Ads vs Loots: livestream brand deals compared | Beta Ads",
    description: "Loots ran a self-serve product where brands bought short overlays and chat messages on streams; its site now shows an invite-only v4. Beta Ads runs managed overlay campaigns for Nordic brands. Compared, with sources and archived pages.",
    summary: "Loots sold short self-serve brand displays on streams, and its site now shows an invite-only product with a waiting list. Beta Ads runs managed overlay campaigns for Nordic brands, open now, with a published price.",
    rows: [
      ["What it is", "Livestream ad platform and managed service", "Self-serve brand deals: a short overlay plus a chat message"],
      ["Company", "BETA AGENCY AS, Oslo, Norway", "Loots Media GmbH, HRB 212229 B, Berlin register, address in Ahorn"],
      ["Available now", "Yes: book a call or email us", "Invite-only v4 with a waiting list"],
      ["Creative", "Custom animation designed for your brand", "Your own video or image, 30 seconds or less, in a standard unit"],
      ["Pricing", BETA.pricing, "Dynamic pricing adjusted by demand; no published figures"],
      ["Model", BETA.service, "Self-serve"],
    ],
    differs: [
      ["Available now", "You can book a call today and launch without a waiting list."],
      ["Managed for you", "We pick the streamers, design the overlay, launch it and report it. You approve and follow along."],
      ["Published price and a refund", "Per 1,000 fully played views from 100,000 NOK, undelivered views refunded."],
    ],
    theyFit: [
      ["You want to buy small amounts yourself", "When it was open, Loots let brands buy displays self-serve without a managed campaign."],
    ],
    faqs: [
      { q: "Is Loots still selling brand deals?", a: "Its homepage now shows loots v4, invite-only, with a waiting list. The self-serve brand product was still live in an archived copy from 6 June 2026." },
      { q: "Does Loots refund unused budget?", a: "Its archived advertiser page says unused amounts can be refunded, while its archived purchaser terms say payments are final and non-refundable." },
      { q: "Is Beta Ads self-serve?", a: "Brands get a managed campaign. Media agencies and partners can get their own self-serve login." },
    ],
    sources: [
      { label: "Loots website (v4, invite-only)", url: "https://loots.com", date: "checked 26 Oct 2026" },
      { label: "Loots imprint", url: "https://loots.com/legal/imprint", date: "checked 26 Oct 2026" },
      { label: "Archived: Loots for brands", url: "https://web.archive.org/web/20260606102056/https://loots.com/is/ai-driven-brand-campaigns-in-live-streaming", date: "6 Jun 2026" },
      { label: "Archived: Loots purchaser terms", url: "https://web.archive.org/web/20260606112754/https://loots.com/l/purchaser-terms-of-service", date: "6 Jun 2026" },
      { label: "North Data: Loots Media GmbH", url: "https://www.northdata.de/Loots+Media+GmbH,+Berlin/Amtsgericht+Charlottenburg+(Berlin)+HRB+212229+B", date: "checked 26 Oct 2026" },
    ],
    checked: "2026-10-26",
  },
  {
    slug: "influencer-agency",
    name: "an influencer agency",
    hq: "Varies",
    founded: "Varies",
    focus: "Usually one country or one niche of creators",
    score: { inStream: ["partial", "Depends on the creator integration"], custom: ["yes", "Each creator's own content"], platforms: ["partial", "Varies"], nordic: ["partial", "Varies"], price: ["no", "Rarely public"], refund: ["partial", "Depends on the contract"], dashboard: ["partial", "Varies by agency"], chatCmd: ["unknown"], poll: ["unknown"], clips: ["unknown"], chatTracking: ["unknown"], managed: ["yes"], selfServe: ["unknown"] },
    kind: "Gaming and influencer agencies",
    title: "Beta Ads vs an influencer marketing agency for Twitch | Beta Ads",
    description: "Influencer and gaming agencies charge project fees, retainers, commission or markup on creator fees. Beta Ads charges per 1,000 played views and refunds undelivered views. How the two compare for livestream campaigns, with sources.",
    summary: "An influencer agency negotiates deals creator by creator and usually charges fees, retainers or commission. Beta Ads charges per 1,000 played views, refunds anything not delivered, and shows every view in your own dashboard.",
    rows: [
      ["What you pay for", "Views delivered: per 1,000 fully played animation views", "Agency time and creator fees: project fees, retainers, commission or markup"],
      ["If it under-delivers", BETA.guarantee, "Depends on the contract"],
      ["Creative", "One custom overlay that runs the same on every channel", "Each creator's own integration, in their voice"],
      ["Scale", "Dozens of streamers in one campaign, launched together", "Usually a handful of negotiated creators"],
      ["Reporting", BETA.reporting, "Varies by agency"],
      ["After the stream", "The overlay is part of the video and stays in the VOD", "Depends on how the integration was delivered"],
    ],
    differs: [
      ["You pay for delivery, not for hours", "The price is tied to views delivered, so you know what you get before you sign."],
      ["Proof you can look at", "A clip is recorded around every ad play, and you follow it live in your own login."],
      ["Many streamers at once", "One campaign runs across dozens of streamers in your market at the same time."],
    ],
    theyFit: [
      ["You want a creator's personal endorsement", "Talk-based integrations and long creator relationships are what agencies do well."],
      ["You need content beyond the stream", "Agencies can bundle videos, social posts and strategy into one retainer."],
    ],
    faqs: [
      { q: "How do influencer agencies charge?", a: "Influencer Marketing Hub describes fee-based, campaign-based, commission-based and retainer models. Prices are rarely public." },
      { q: "Can I use Beta Ads alongside an agency?", a: "Yes. Agencies also buy from us, with their own self-serve login, and sell livestream to their clients as part of the plan." },
    ],
    sources: [
      { label: "Influencer Marketing Hub: influencer marketing agency pricing", url: "https://influencermarketinghub.com/influencer-marketing-agency-pricing/", date: "16 Oct 2024" },
    ],
    checked: "2026-10-14",
  },
];

/** Master switch. While false, the /compare routes, footer link, sitemap entries,
 * prerendered pages and SEO shells are not built at all, even if this branch is
 * merged and deployed. Published on Andreas' word 2026-10-26. */
export const COMPARE_PUBLISHED = true;

/** Routes render when published, or on the local dev server (never in a production build). */
export const COMPARE_VISIBLE =
  COMPARE_PUBLISHED || (typeof import.meta !== "undefined" && (import.meta as { env?: { DEV?: boolean } }).env?.DEV === true);

export const competitorRoute = (slug: string) => `/compare/${slug}`;
