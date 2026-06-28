import React from "react";
import { StreamerRoundup, type RoundupCopy } from "@/components/blog/StreamerRoundup";
import { CREATORS } from "@/data/svenskaStreamare";

/** Svensk flaggskip-roundup. Tynn wrapper rundt StreamerRoundup. */
const COPY: RoundupCopy = {
  eyebrow: "Svensk streaming",
  titleLead: "Svenska Twitch-streamers du bör känna till",
  titleAccent: "2026",
  intro:
    "Ett urval av streamers och innehållsskapare som sätter prägel på den svenska streamingscenen - från Counter-Strike-proffs och Fortnite-stjärnor till IRL-profiler. Ingen rankning, en översikt.",
  statTotalLabel: "streamers",
  statNativeLabel: "svenskspråkiga",
  statIntlLabel: "internationella",
  whyHeading: "Därför är det här kartan varumärken behöver",
  whyBody:
    "De här kanalerna är också översikten över var svensk Gen Z faktiskt lägger sin uppmärksamhet - en publik som hoppar över pre-rolls och kör adblock. Beta Ads bygger native overlay-annonser rakt in i sändningarna, så ditt varumärke blir en del av innehållet i stället för ett avbrott.",
  ctaHeading: "Vill du nå svensk Gen Z där de faktiskt är?",
  ctaBody: "Hör av dig, så visar vi hur ditt varumärke kan leva inne i streamen.",
  ctaButton: "Prata med Beta Ads",
  readMore: "Läs mer",
};

const SvenskaStreamare2026: React.FC = () => (
  <StreamerRoundup creators={CREATORS} market="se" copy={COPY} />
);

export default SvenskaStreamare2026;
