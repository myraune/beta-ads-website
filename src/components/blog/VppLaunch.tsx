import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * News post: virtual product placement is live for Nordic brands (November 2026).
 * Claims come from the launch posts on LinkedIn (the Beta Ads page and Andreas,
 * November 2026). Footage is LIVAD's demo reel; the brands in it are examples,
 * not Beta Ads clients, and every caption says so. No prices or results.
 */

type Lang = "en" | "no";
const V = "/lovable-uploads/vpp";

const T = {
  en: {
    kicker: "New format · November 2026",
    h1a: "Virtual product placement",
    h1b: "is live in the Nordics.",
    lead: "Your product can now appear inside the game scene of a live stream, as a 3D object lit like everything around it. No ad break and nothing to skip.",
    demo: "Demo footage from LIVAD, our technology partner. Brands shown are examples, not Beta Ads clients.",
    whyK: "Why we built it in",
    whyH: "Most ads lose because they interrupt.",
    whyP: [
      "Pre-rolls and mid-roll breaks stop the thing people came to watch. Viewers skip them, block them or leave, and the brand pays for the irritation.",
      "Our overlay format already avoids the break by sitting in the corner of the stream. Virtual product placement goes one step further: the product becomes part of the scene itself.",
    ],
    howH: "From one photo to a product in the scene.",
    how: [
      { t: "The scene is mapped", d: "The platform reads the 3D space of the game: floors, walls, surfaces, where an object could stand." },
      { t: "A 3D model from one image", d: "You send a normal 2D product image. No 3D file, no shoot." },
      { t: "The product is placed", d: "It goes where it fits, at the angle that makes sense in that scene." },
      { t: "Light and shadow match", d: "The product is lit like the game around it, so it looks like it was there all along." },
    ],
    clipsH: "Live, and in every clip after.",
    clipsP: "The same placement works beyond the broadcast. Products can be added to the most relevant moments across thousands of stream clips, and those clips travel on to TikTok, Instagram and YouTube. Streamers can earn from their clip catalogue even when they are offline.",
    scenes: ["Counter-Strike", "GTA roleplay", "League of Legends", "Fortnite", "GTA", "Valorant"],
    whoH: "Built by LIVAD, run by Beta Ads in the Nordics.",
    whoP: "The technology comes from LIVAD, the platform our campaigns already run on. We plan and run it for brands and agencies in Norway, Sweden, Denmark and Finland, alongside the overlay format.",
    ctaH: "Want to see your product in a stream?",
    ctaP: "Send us one product image, and we show you what a placement could look like for your brand.",
    cta1: "How it works",
    cta2: "Contact us",
  },
  no: {
    kicker: "Nytt format · november 2026",
    h1a: "Virtuelle produktplasseringer",
    h1b: "er live i Norden.",
    lead: "Produktet ditt kan nå dukke opp inne i selve spillscenen i en livestream, som et 3D-objekt med samme lys som alt rundt. Ingen reklamepause, ingenting å hoppe over.",
    demo: "Demoopptak fra LIVAD, teknologipartneren vår. Merkene i videoen er eksempler, ikke kunder av Beta Ads.",
    whyK: "Hvorfor",
    whyH: "De fleste annonser taper fordi de avbryter.",
    whyP: [
      "Pre-roll og reklamepauser stopper det folk kom for å se. Seerne hopper over, blokkerer eller går, og merket betaler for irritasjonen.",
      "Overlay-formatet vårt slipper allerede pausen ved å ligge i hjørnet av streamen. Virtuelle produktplasseringer går ett steg videre: produktet blir en del av selve scenen.",
    ],
    howH: "Fra ett bilde til et produkt i scenen.",
    how: [
      { t: "Scenen kartlegges", d: "Plattformen leser 3D-rommet i spillet: gulv, vegger, flater, hvor et objekt kan stå." },
      { t: "En 3D-modell fra ett bilde", d: "Du sender et vanlig 2D-bilde av produktet. Ingen 3D-fil, ingen fotografering." },
      { t: "Produktet plasseres", d: "Det havner der det passer, i en vinkel som gir mening i scenen." },
      { t: "Lys og skygge matches", d: "Produktet får samme lys som spillet rundt, så det ser ut som det alltid har vært der." },
    ],
    clipsH: "Live, og i hvert klipp etterpå.",
    clipsP: "Plasseringen fungerer også etter sendingen. Produkter kan legges inn i de mest relevante øyeblikkene i tusenvis av klipp, og klippene sprer seg videre til TikTok, Instagram og YouTube. Streamerne kan tjene på klippene sine også når de ikke er live.",
    scenes: ["Counter-Strike", "GTA roleplay", "League of Legends", "Fortnite", "GTA", "Valorant"],
    whoH: "Bygget av LIVAD, levert av Beta Ads i Norden.",
    whoP: "Teknologien kommer fra LIVAD, plattformen kampanjene våre allerede kjører på. Vi planlegger og kjører det for merker og byråer i Norge, Sverige, Danmark og Finland, ved siden av overlay-formatet.",
    ctaH: "Vil du se produktet ditt i en stream?",
    ctaP: "Send oss ett produktbilde, så viser vi hvordan en plassering kan se ut for ditt merke.",
    cta1: "Slik fungerer det",
    cta2: "Kontakt oss",
  },
} as const;

const STILLS = ["counter-strike", "gta-rp", "league", "fortnite", "gta-garage", "valorant"];
const HOW_IMG = ["counter-strike", "valorant", "gta-garage", "league"];

export const VppLaunch: React.FC<{ lang?: Lang }> = ({ lang = "en" }) => {
  const t = T[lang];
  return (
    <div className="-mx-6 lg:-mx-12">
      <section className="max-w-6xl mx-auto px-6 lg:px-12 pt-4 pb-16">
        <span className="text-sm font-medium text-muted-foreground mb-4 block">{t.kicker}</span>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.04] tracking-tight mb-5 max-w-4xl">
          {t.h1a} <span className="font-light text-muted-foreground">{t.h1b}</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">{t.lead}</p>
        <figure className="m-0">
          <div className="rounded-2xl overflow-hidden bg-black">
            <video className="block w-full h-auto" src="/videos/virtual-product-placement.mp4" poster="/videos/virtual-product-placement-poster.webp" autoPlay muted loop playsInline preload="metadata" />
          </div>
          <figcaption className="text-xs text-muted-foreground mt-3">{t.demo}</figcaption>
        </figure>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">{t.whyH}</h2>
            {t.whyP.map((p) => <p key={p} className="text-[17px] leading-relaxed text-muted-foreground mb-5 max-w-[38rem]">{p}</p>)}
          </div>
          <img src={`${V}/gta-rp.webp`} alt="" width={1280} height={720} loading="lazy" className="w-full h-auto rounded-2xl" />
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12 max-w-2xl">{t.howH}</h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-14">
            {t.how.map((h, i) => (
              <div key={h.t}>
                <img src={`${V}/${HOW_IMG[i]}.webp`} alt="" width={1280} height={720} loading="lazy" className="w-full h-auto rounded-xl mb-5" />
                <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">{h.t}</h3>
                <p className="text-[16px] leading-relaxed text-muted-foreground m-0">{h.d}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-8">{t.demo}</p>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24 bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{t.clipsH}</h2>
            <p className="text-[17px] leading-relaxed text-background/70">{t.clipsP}</p>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {STILLS.map((s, i) => (
              <figure key={s} className="m-0">
                <img src={`${V}/${s}.webp`} alt={`${t.scenes[i]}`} width={1280} height={720} loading="lazy" className="w-full h-auto rounded-lg" />
                <figcaption className="text-xs text-background/60 mt-2">{t.scenes[i]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">{t.whoH}</h2>
            <p className="text-[17px] leading-relaxed text-muted-foreground">{t.whoP}</p>
          </div>
          <div className="rounded-3xl bg-foreground text-background p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{t.ctaH}</h2>
              <p className="text-background/60">{t.ctaP}</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                <Link to="/virtual-product-placement">{t.cta1} <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-background hover:bg-background/10 rounded-full px-8 border border-background/20">
                <Link to="/contact">{t.cta2}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VppLaunch;
