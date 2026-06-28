import React from "react";
import { StreamerRoundup, type RoundupCopy } from "@/components/blog/StreamerRoundup";
import { CREATORS } from "@/data/suomalaisetStriimaajat";

/** Finsk flaggskip-roundup. Tynn wrapper rundt StreamerRoundup. */
const COPY: RoundupCopy = {
  eyebrow: "Suomalainen striimaus",
  titleLead: "Suomalaiset Twitch-striimaajat jotka kannattaa tuntea",
  titleAccent: "2026",
  intro:
    "Valikoima striimaajia ja sisällöntuottajia, jotka muokkaavat suomalaista striimausskeneä - kilpapelaajista IRL-persooniin ja YouTube-veteraaneihin. Ei paremmuusjärjestys, vaan yleiskatsaus.",
  statTotalLabel: "striimaajaa",
  statNativeLabel: "suomenkielistä",
  statIntlLabel: "kansainvälistä",
  whyHeading: "Tästä syystä tämä on kartta, jonka brändit tarvitsevat",
  whyBody:
    "Nämä kanavat ovat myös yleiskatsaus siihen, missä suomalainen Gen Z todella käyttää huomionsa - yleisö, joka ohittaa pre-rollit ja käyttää mainostenestoa. Beta Ads rakentaa natiivit overlay-mainokset suoraan lähetyksiin, jolloin brändistäsi tulee osa sisältöä keskeytyksen sijaan.",
  ctaHeading: "Haluatko tavoittaa suomalaisen Gen Z:n siellä missä he todella ovat?",
  ctaBody: "Ota yhteyttä, niin näytämme miten brändisi voi elää striimin sisällä.",
  ctaButton: "Keskustele Beta Adsin kanssa",
  readMore: "Lue lisää",
};

const SuomalaisetStriimaajat2026: React.FC = () => (
  <StreamerRoundup creators={CREATORS} market="fi" copy={COPY} />
);

export default SuomalaisetStriimaajat2026;
