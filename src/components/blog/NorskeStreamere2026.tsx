import React from "react";
import { StreamerRoundup, type RoundupCopy } from "@/components/blog/StreamerRoundup";
import { CREATORS } from "@/data/norskeStreamere";

/**
 * Norsk flaggskip-roundup. Tynn wrapper rundt den generiske StreamerRoundup med
 * norsk copy + det norske datasettet.
 */
const COPY: RoundupCopy = {
  eyebrow: "Norsk streaming",
  titleLead: "Norske Twitch-streamere du bør kjenne til i",
  titleAccent: "2026",
  intro:
    "Et utvalg av streamere og innholdsskapere som setter preg på det norske streamingmiljøet - fra Fortnite-proffer til IRL-profiler og YouTube-veteraner. Ikke en rangering, en oversikt.",
  statTotalLabel: "streamere",
  statNativeLabel: "norskspråklige",
  statIntlLabel: "internasjonale",
  whyHeading: "Hvorfor dette er kartet merkevarer trenger",
  whyBody:
    "Disse kanalene er også oversikten over hvor norsk Gen Z faktisk bruker oppmerksomheten sin - et publikum som hopper over pre-rolls og kjører adblock. Beta Ads bygger native overlay-annonser rett inn i sendingene deres, så merkevaren din blir en del av innholdet i stedet for en avbrytelse.",
  ctaHeading: "Vil du nå norsk Gen Z der de faktisk er?",
  ctaBody: "Ta en prat med oss, så viser vi hvordan merkevaren din kan leve inni streamen.",
  ctaButton: "Snakk med Beta Ads",
  readMore: "Les mer",
};

const NorskeStreamere2026: React.FC = () => (
  <StreamerRoundup creators={CREATORS} market="no" copy={COPY} />
);

export default NorskeStreamere2026;
