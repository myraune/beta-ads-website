import React from "react";
import { StreamerRoundup, type RoundupCopy } from "@/components/blog/StreamerRoundup";
import { CREATORS } from "@/data/danskeStreamere";

/** Dansk flaggskip-roundup. Tynn wrapper rundt StreamerRoundup. */
const COPY: RoundupCopy = {
  eyebrow: "Dansk streaming",
  titleLead: "Danske Twitch-streamere du bør kende i",
  titleAccent: "2026",
  intro:
    "Et udvalg af streamere og indholdsskabere, der sætter præg på det danske streamingmiljø - fra FIFA- og GTA-profiler til IRL-streamere og YouTube-veteraner. Ikke en rangering, men et overblik.",
  statTotalLabel: "streamere",
  statNativeLabel: "dansksprogede",
  statIntlLabel: "internationale",
  whyHeading: "Derfor er det her kortet, brands har brug for",
  whyBody:
    "De her kanaler er også overblikket over, hvor dansk Gen Z faktisk bruger deres opmærksomhed - et publikum, der springer pre-rolls over og kører adblock. Beta Ads bygger native overlay-annoncer direkte ind i udsendelserne, så dit brand bliver en del af indholdet i stedet for en afbrydelse.",
  ctaHeading: "Vil du nå dansk Gen Z der, hvor de faktisk er?",
  ctaBody: "Tag en snak med os, så viser vi, hvordan dit brand kan leve inde i streamen.",
  ctaButton: "Tal med Beta Ads",
  readMore: "Læs mere",
};

const DanskeStreamere2026: React.FC = () => (
  <StreamerRoundup creators={CREATORS} market="da" copy={COPY} />
);

export default DanskeStreamere2026;
