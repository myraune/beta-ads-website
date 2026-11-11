import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * News post: Beta Ads is in Atlas Accelerator's fourth cohort (November 2026).
 * Facts: Shifter, "Fem startups tatt opp i Atlas Accelerators fjerde kull",
 * 11 Nov 2026 (5 of 50 applicants, up to NOK 150,000 each, follow-up from
 * founders and the network). Demo day 15 January and our focus until then come
 * from our own LinkedIn posts. Frames are from the Samsung Galaxy Z Fold7 campaign.
 */

type Lang = "en" | "no";
const SHIFTER = "https://www.shifter.no/nyheter/fem-startups-tatt-opp-i-atlas-accelerators-fjerde-kull/482382";
const F = "/lovable-uploads/atlas";

const T = {
  en: {
    kicker: "Company news · November 2026",
    h1a: "Beta Ads is in Atlas Accelerator.",
    h1b: "Fourth cohort.",
    lead: "Atlas Accelerator picked five startups out of 50 applicants for its fourth cohort, and Beta Ads is one of them. Here is what that means and what we will spend the next months on.",
    facts: [
      ["5 of 50", "startups picked for the fourth cohort"],
      ["Up to NOK 150,000", "invested in each company"],
      ["Founders and network", "follow-up from people who have built companies before"],
      ["15 January", "demo day"],
    ],
    cohort: "The cohort: The Open Engine, Forsikra, Norvern, Leira and Beta Ads.",
    whyH: "Why we applied.",
    whyP: [
      "Over the past year we have run Twitch campaigns across the Nordics for brands like Samsung, with agencies in WPP, Publicis Groupe and dentsu. It works, but we have mostly figured things out on our own.",
      "Atlas gives us a group of founders who have done it before. That is exactly what a small company selling a new media channel needs.",
    ],
    nextH: "What we focus on until demo day.",
    next: [
      { t: "Twitch in 2027 media plans", d: "Getting more media agencies to plan livestreaming into their 2027 budgets, not as a one-off test." },
      { t: "A proper sales setup", d: "A sales process that does not depend on the founder being in every meeting." },
      { t: "Conversations with investors", d: "We are talking to investors who see where livestream advertising is heading." },
    ],
    caption: "Samsung Galaxy Z Fold7 on Norwegian Twitch: one campaign, 28 streamers.",
    ctaH: "Buying media and still not tested livestreaming?",
    ctaP: "Now is a good time to talk. Or follow along until demo day on LinkedIn.",
    cta1: "Book a demo",
    cta2: "See the Samsung case",
    src: "Source: Shifter, «Fem startups tatt opp i Atlas Accelerators fjerde kull», 11 November 2026.",
    read: "Read on Shifter",
  },
  no: {
    kicker: "Nyheter · november 2026",
    h1a: "Beta Ads er tatt opp i Atlas Accelerator.",
    h1b: "Fjerde kull.",
    lead: "Atlas Accelerator valgte fem startups blant 50 søkere til sitt fjerde kull, og Beta Ads er en av dem. Her er hva det betyr, og hva vi bruker de neste månedene på.",
    facts: [
      ["5 av 50", "startups tatt opp i fjerde kull"],
      ["Opptil 150 000 kr", "i investering per selskap"],
      ["Gründere og nettverk", "oppfølging fra folk som har bygget selskaper før"],
      ["15. januar", "demo day"],
    ],
    cohort: "Kullet: The Open Engine, Forsikra, Norvern, Leira og Beta Ads.",
    whyH: "Hvorfor vi søkte.",
    whyP: [
      "Det siste året har vi kjørt Twitch-kampanjer i Norden for merker som Samsung, sammen med byråer i WPP, Publicis Groupe og dentsu. Det fungerer, men vi har stort sett funnet ut av ting på egen hånd.",
      "Atlas gir oss en gruppe gründere som har gjort det før. Det er akkurat det et lite selskap som selger en ny mediekanal trenger.",
    ],
    nextH: "Dette jobber vi med fram til demo day.",
    next: [
      { t: "Twitch i mediaplanene for 2027", d: "Flere mediebyråer skal planlegge livestreaming inn i 2027-budsjettene, ikke bare som en engangstest." },
      { t: "Et ordentlig salgsoppsett", d: "En salgsprosess som ikke er avhengig av at gründeren sitter i hvert møte." },
      { t: "Samtaler med investorer", d: "Vi snakker med investorer som ser hvor livestream-annonsering er på vei." },
    ],
    caption: "Samsung Galaxy Z Fold7 på norsk Twitch: én kampanje, 28 streamere.",
    ctaH: "Kjøper du media og har ikke testet livestreaming ennå?",
    ctaP: "Nå er et godt tidspunkt å ta en prat. Eller følg med fram til demo day på LinkedIn.",
    cta1: "Book en demo",
    cta2: "Se Samsung-casen",
    src: "Kilde: Shifter, «Fem startups tatt opp i Atlas Accelerators fjerde kull», 11. november 2026.",
    read: "Les på Shifter",
  },
} as const;

const FRAMES = ["rubengks", "danniz", "namine", "karbo1x", "fjolsen", "vikingduden"];

export const AtlasAccelerator: React.FC<{ lang?: Lang }> = ({ lang = "en" }) => {
  const t = T[lang];
  return (
    <div className="-mx-6 lg:-mx-12">
      <section className="max-w-6xl mx-auto px-6 lg:px-12 pt-4 pb-16">
        <span className="text-sm font-medium text-muted-foreground mb-4 block">{t.kicker}</span>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.04] tracking-tight mb-5 max-w-4xl">
          {t.h1a} <span className="font-light text-muted-foreground">{t.h1b}</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl">{t.lead}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8">
          {t.facts.map(([k, v]) => (
            <div key={k}>
              <div className="text-xl md:text-2xl font-bold tracking-tight text-foreground tabular-nums">{k}</div>
              <div className="text-[15px] text-muted-foreground mt-1">{v}</div>
            </div>
          ))}
        </div>
        <p className="text-[15px] text-muted-foreground mt-10">
          {t.cohort}{" "}
          <a href={SHIFTER} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4 text-foreground">
            {t.read} <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </p>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">{t.whyH}</h2>
            {t.whyP.map((p) => <p key={p} className="text-[17px] leading-relaxed text-muted-foreground mb-5 max-w-[38rem]">{p}</p>)}
          </div>
          <figure className="m-0">
            <div className="grid grid-cols-3 gap-2">
              {FRAMES.map((f) => <img key={f} src={`${F}/${f}.jpg`} alt="" width={640} height={360} loading="lazy" className="w-full h-auto rounded-lg" />)}
            </div>
            <figcaption className="text-xs text-muted-foreground mt-3">{t.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12 max-w-2xl">{t.nextH}</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {t.next.map((n) => (
              <div key={n.t}>
                <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">{n.t}</h3>
                <p className="text-[16px] leading-relaxed text-muted-foreground m-0">{n.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="rounded-3xl bg-foreground text-background p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{t.ctaH}</h2>
              <p className="text-background/60">{t.ctaP}</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                <Link to="/demo">{t.cta1} <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-background hover:bg-background/10 rounded-full px-8 border border-background/20">
                <Link to="/case-study/samsung-fold7">{t.cta2}</Link>
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-10 max-w-2xl">{t.src}</p>
        </div>
      </section>
    </div>
  );
};

export default AtlasAccelerator;
