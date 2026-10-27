/**
 * SAMPLE data for the campaign-verification product pages
 * (/campaign-compliance).
 *
 * Everything here is INVENTED for illustration. No real campaign, no real
 * client, no real creator. Both pages label it as sample data on screen.
 *
 * Two hard rules baked into the shape of this file:
 *
 * 1. NO PRICING. The live internal tool derives an effective CPM from contracted
 *    spend. That rate is confidential, so there is deliberately no spend, cost,
 *    CPM or currency field here at all.
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
