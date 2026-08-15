/**
 * SAMPLE data for the campaign-verification product pages
 * (/campaign-compliance and /replay-reach).
 *
 * Everything here is INVENTED for illustration. No real campaign, no real
 * client, no real creator. Both pages label it as sample data on screen.
 *
 * Two hard rules baked into the shape of this file:
 *
 * 1. NO PRICING. The live internal tool derives an effective CPM from contracted
 *    spend. That rate is confidential, so there is deliberately no spend, cost,
 *    CPM or currency field here at all. Replay reach is expressed as a
 *    multiplier, which makes the same argument without exposing the rate.
 *
 * 2. NO CREATOR NAMES. Channels are anonymised to two characters plus **, the
 *    same convention the chat data uses, so nothing ties a named creator to a
 *    setup failure or a performance figure.
 */

export type SetupStatus = "ok" | "missing" | "warn";

export type ChannelSetup = {
  /** Anonymised channel, first two characters + ** */
  ch: string;
  market: "FI" | "NO" | "SE";
  /** Sponsor banner present in the channel's About section */
  banner: SetupStatus;
  /** Chat command configured */
  command: SetupStatus;
  /** Has actually gone live during the campaign window */
  streamed: SetupStatus;
  /** Which attribution link the banner points at */
  link: "Tracked link" | "Landing page" | "Untracked" | "None";
  /** Short note shown when something needs attention */
  note?: string;
};

export const CHANNEL_SETUP: ChannelSetup[] = [
  { ch: "tu**", market: "FI", banner: "ok", command: "ok", streamed: "ok", link: "Tracked link" },
  { ch: "sn**", market: "FI", banner: "ok", command: "ok", streamed: "ok", link: "Tracked link" },
  { ch: "ke**", market: "NO", banner: "ok", command: "ok", streamed: "ok", link: "Tracked link" },
  { ch: "mi**", market: "SE", banner: "ok", command: "ok", streamed: "ok", link: "Tracked link" },
  { ch: "da**", market: "NO", banner: "ok", command: "ok", streamed: "ok", link: "Tracked link" },
  { ch: "es**", market: "SE", banner: "ok", command: "ok", streamed: "ok", link: "Tracked link" },
  { ch: "ap**", market: "FI", banner: "ok", command: "ok", streamed: "ok", link: "Landing page",
    note: "Banner points at the plain landing page, so clicks are not attributed" },
  { ch: "he**", market: "NO", banner: "ok", command: "warn", streamed: "ok", link: "Tracked link",
    note: "Command present but misspelled in the stream title" },
  { ch: "th**", market: "SE", banner: "ok", command: "missing", streamed: "ok", link: "Tracked link",
    note: "No command in the title on any stream so far" },
  { ch: "ra**", market: "FI", banner: "missing", command: "ok", streamed: "ok", link: "None",
    note: "No sponsor banner in the About section" },
  { ch: "jo**", market: "NO", banner: "missing", command: "missing", streamed: "ok", link: "None",
    note: "Nothing set up, but streaming against the campaign" },
  { ch: "vi**", market: "SE", banner: "ok", command: "ok", streamed: "missing", link: "Tracked link",
    note: "Set up correctly but has not gone live yet" },
];

/**
 * Replay reach per channel. Deliberately views only: no spend, no rate.
 * The argument is the multiplier, not the money.
 */
export type ChannelReach = {
  ch: string;
  market: "FI" | "NO" | "SE";
  live: number;
  vod: number;
  clip: number;
};

export const CHANNEL_REACH: ChannelReach[] = [
  { ch: "tu**", market: "FI", live: 6400, vod: 54200, clip: 1480 },
  { ch: "sn**", market: "FI", live: 5100, vod: 47600, clip: 2210 },
  { ch: "ke**", market: "NO", live: 4800, vod: 41300, clip: 980 },
  { ch: "mi**", market: "SE", live: 4350, vod: 38900, clip: 1120 },
  { ch: "da**", market: "NO", live: 3900, vod: 33500, clip: 760 },
  { ch: "es**", market: "SE", live: 3600, vod: 29800, clip: 1340 },
  { ch: "ap**", market: "FI", live: 3200, vod: 26400, clip: 640 },
  { ch: "he**", market: "NO", live: 2850, vod: 24100, clip: 520 },
  { ch: "th**", market: "SE", live: 2600, vod: 21700, clip: 410 },
  { ch: "ra**", market: "FI", live: 2400, vod: 19200, clip: 380 },
  { ch: "jo**", market: "NO", live: 2100, vod: 16800, clip: 290 },
  { ch: "vi**", market: "SE", live: 1890, vod: 14600, clip: 240 },
];
