/**
 * SAMPLE data for the chat-monitoring product page.
 *
 * Every message here is INVENTED for illustration. It is not a real campaign,
 * not a real client, and carries no real performance figures. The page labels
 * it as sample data in the interface itself, so nothing on it can be read as a
 * claim about results. Keep it that way: if you ever swap in real campaign
 * chat, you need written client permission and a fresh pass on what is
 * confidential.
 *
 * Deliberately small. The point of the page is to show what the monitoring
 * tool does, not to dump volume, and a short list keeps the page light.
 *
 * `orig` is the message in the viewer's own language, `en` is the English
 * translation the tool produces alongside it.
 */

export type ChatTone = "positive" | "question" | "neutral" | "negative";

export type ChatMention = {
  /** Anonymised handle, first two characters + ** (never a real handle) */
  c: string;
  /** Market the message came from */
  market: "FI" | "NO" | "SE";
  /** HH:MM, illustrative */
  t: string;
  /** Message in the viewer's own language */
  orig: string;
  /** English translation */
  en: string;
  tone: ChatTone;
};

export const CHAT_MENTIONS: ChatMention[] = [
  { c: "ja**", market: "FI", t: "20:14", tone: "neutral",
    orig: "ai meil on vpn sponssi", en: "oh we have got a VPN sponsor" },
  { c: "og**", market: "FI", t: "20:14", tone: "question",
    orig: "paljo toi maksaa kuukaudessa", en: "how much is that per month" },
  { c: "he**", market: "FI", t: "20:15", tone: "positive",
    orig: "toi hinta ei oo yhtään paha", en: "that price is honestly not bad at all" },
  { c: "mi**", market: "NO", t: "20:16", tone: "question",
    orig: "funker den koden fortsatt?", en: "does that code still work?" },
  { c: "kr**", market: "NO", t: "20:17", tone: "positive",
    orig: "kjøpte den i fjor, angrer ikke", en: "bought it last year, no regrets" },
  { c: "sv**", market: "SE", t: "20:18", tone: "negative",
    orig: "alla dessa bolag säljer väl din data ändå", en: "all these companies sell your data anyway" },
  { c: "to**", market: "SE", t: "20:18", tone: "neutral",
    orig: "nej inte om dom har no log policy", en: "no they do not if they have a no log policy" },
  { c: "pe**", market: "FI", t: "20:19", tone: "question",
    orig: "toimiiko toi myös puhelimella", en: "does it work on a phone too" },
  { c: "an**", market: "NO", t: "20:21", tone: "positive",
    orig: "faktisk ganske god deal for 2 år", en: "actually a pretty good deal for 2 years" },
  { c: "la**", market: "FI", t: "20:22", tone: "neutral",
    orig: "mul on jo toinen vpn", en: "I already have a different VPN" },
  { c: "em**", market: "SE", t: "20:24", tone: "question",
    orig: "kan man dela kontot med familjen", en: "can you share the account with family" },
  { c: "ru**", market: "NO", t: "20:26", tone: "negative",
    orig: "blir litt mye reklame i dag", en: "getting to be a lot of ads today" },
  { c: "vi**", market: "FI", t: "20:27", tone: "positive",
    orig: "otin ton just äsken, kiitti vinkistä", en: "just picked it up, thanks for the tip" },
  { c: "so**", market: "SE", t: "20:29", tone: "question",
    orig: "funkar det för streaming utomlands", en: "does it work for streaming abroad" },
  { c: "ni**", market: "NO", t: "20:31", tone: "neutral",
    orig: "noen som har testet hastigheten", en: "anyone tested the speed" },
  { c: "ka**", market: "FI", t: "20:33", tone: "positive",
    orig: "nopeus on pysyny ihan hyvänä mullakin", en: "the speed has stayed pretty good for me too" },
];

/**
 * Illustrative rollup for the dashboard preview. Round, obviously
 * demonstrative numbers, not a real campaign readout.
 */
export const SAMPLE_SUMMARY = {
  tracked: 3,
  mentions: 240,
  chatters: 180,
  markets: 3,
  channels: 12,
};
