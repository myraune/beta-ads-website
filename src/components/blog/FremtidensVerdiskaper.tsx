import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { YouTubeFacade } from "@/components/blog/YouTubeFacade";

/**
 * Framtidsfredag 2026: the Beta Ads pitch in the Fremtidens Verdiskaper
 * semifinal at InnoCamp Steinkjer, 26 June 2026.
 *
 * Video first, then the day, then what we said on stage and why, then the
 * result. We did not win; LGR Technologies did, unanimously. The post says
 * so in plain words. Photos are Andreas's own from the day; the slide
 * photos show what the room saw, so the copy quotes the slides rather than
 * paraphrasing them.
 *
 * Facts are sourced at the bottom: T:lab's write-up of the semifinal,
 * Næringsforeninga on the prize structure, and Framtidsfredag's own site.
 */

const serif = { fontFamily: "'Instrument Serif', serif" };
const P = "/lovable-uploads/fremtidsfredag";

const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}>
      {children}
    </div>
  );
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">{children}</span>
);

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">{children}</h2>
);

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[17px] leading-relaxed text-muted-foreground mb-5 max-w-[38rem]">{children}</p>
);

const FACTS = [
  { k: "26. juni 2026", v: "Framtidsfredag, Origo på InnoCamp Steinkjer" },
  { k: "5 selskaper", v: "evver, AI Robotics, Delulu, LGR Technologies og Beta Agency" },
  { k: "4 minutter", v: "pitch på scenen, deretter spørsmål fra juryen" },
  { k: "200 000 kr", v: "til delfinalevinneren, pluss plass i finalen" },
  { k: "1 000 000 kr", v: "til vinneren av finalen, Næringsdriv i Trondheim 5. november" },
];

const JURY = [
  { name: "Arne Tørris Haug", org: "SpareBank 1 SMN, juryleder" },
  { name: "Monica Rolfsen", org: "NTNU" },
  { name: "Lill Beate Håpnes", org: "Nord universitet" },
  { name: "Mads Martinussen", org: "Inventas" },
];

const SLIDES = [
  {
    src: `${P}/slide-blokkere.webp`,
    w: 1800,
    h: 1350,
    alt: "Andreas Myraune foran en mørk slide med teksten Vi leverer reklamen de ikke kan blokkere",
    title: "Vi leverer reklamen de ikke kan blokkere.",
    text: "Åpningen. Over 50 prosent av Gen Z blokkerer alt annet. Vi legger annonsene rett inn i direktesendinger på Twitch, YouTube og Kick, og der finnes det ingen adblocker.",
  },
  {
    src: `${P}/slide-marked.webp`,
    w: 1800,
    h: 1350,
    alt: "Slide med overskriften Annonsemarkedet i Norge er 26,6 milliarder i året, og en liste over mediebyråer",
    title: "Annonsemarkedet i Norge er 26,6 milliarder i året.",
    text: "Mediebyråene vi jobber mot står for nær 10 av de milliardene: Mindshare/WPP, Dentsu, Publicis, OMD/PHD, TRY, WAL. Merkevarene betaler per kampanje, streamerne får sin del, vi tar margin på formidlingen.",
  },
  {
    src: `${P}/slide-automatisk.webp`,
    w: 1350,
    h: 1800,
    alt: "Slide med tre punkter: Finn riktig streamer automatisk, Følger chatten i sanntid, Brief til idé til live på få dager",
    title: "Automatisk, ikke hundrevis av e-poster.",
    text: "Datadrevet utvalg fra Streamer Explorer i stedet for e-poster til talentbyråer. Chatten følges i sanntid, én kunde fikk 4 321 omtaler registrert automatisk. Brief til live på få dager.",
  },
];

export const FremtidensVerdiskaper: React.FC = () => {
  return (
    <div className="-mx-6 lg:-mx-12">
      {/* Video */}
      <section className="max-w-5xl mx-auto px-6 lg:px-12 pt-4 pb-16">
        <YouTubeFacade
          id="LDBZkZ-v_W8"
          poster="/lovable-uploads/yt-fremtidens-verdiskaper-poster.webp"
          title="Beta Ads-pitchen, Fremtidens Verdiskaper 2026"
          meta="4 minutter på scenen i Steinkjer, 26. juni 2026. På norsk."
          playLabel="Spill av pitchen"
        />
      </section>

      {/* The day */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start">
          <div>
            <Label>Dagen</Label>
            <H2>Fem selskaper, fire minutter hver, full sal.</H2>
            <Body>
              Framtidsfredag er Trøndelags største møteplass for framtidsdialog, en hel dag på InnoCamp i Steinkjer med alt fra Erna Solberg til lokale gründere på programmet. I år lå delfinalen i Fremtidens Verdiskaper midt i programmet: SpareBank 1 SMNs gründerkonkurranse for Midt-Norge, arrangert sammen med NTNU, Pir, Startup TRD, ProtoMore og T:lab.
            </Body>
            <Body>
              Fem selskaper var plukket ut til Steinkjer. Vi var det eneste som selger reklame, og det eneste som lever av at folk ser på andre folk spille dataspill. De andre var blant annet sensorteknologi til forsvar og robotikk. Så salen måtte først forstå hva Twitch er før de kunne forstå hva vi gjør.
            </Body>
            <dl className="mt-8 border-t border-border">
              {FACTS.map((f) => (
                <div key={f.k} className="grid grid-cols-[9rem_1fr] gap-4 py-3 border-b border-border">
                  <dt className="text-sm font-semibold text-foreground tabular-nums">{f.k}</dt>
                  <dd className="text-sm text-muted-foreground m-0">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal>
            <figure className="m-0">
              <img src={`${P}/scene-logo-bred.webp`} alt="Andreas Myraune på scenen på Framtidsfredag foran en storskjerm med Beta Ads-logoen, publikum i forgrunnen" width={1800} height={1350} loading="lazy" className="w-full h-auto rounded-2xl" />
              <figcaption className="text-xs text-muted-foreground mt-3">Origo, InnoCamp Steinkjer. Første slide, før noen vet hva Twitch er.</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* What we said */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <Label>Det vi sa</Label>
            <H2>Tre slides gjorde jobben.</H2>
            <Body>
              Fire minutter er ikke nok til en produktdemo. Vi valgte tre ting salen skulle huske: problemet, størrelsen på markedet, og at dette er programvare, ikke et byrå. Bildene under er tatt fra salen, så teksten står slik den sto på skjermen.
            </Body>
          </div>
          <div className="mt-12 space-y-16">
            {SLIDES.map((s, i) => (
              <Reveal key={s.src} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <figure className="m-0">
                  <img src={s.src} alt={s.alt} width={s.w} height={s.h} loading="lazy" className={`w-full h-auto rounded-2xl ${s.h > s.w ? "max-w-md mx-auto" : ""}`} />
                </figure>
                <div className="max-w-md">
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
                    <span style={serif} className="italic">{s.title}</span>
                  </h3>
                  <p className="text-[17px] leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Result */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-start">
          <Reveal>
            <figure className="m-0">
              <img src={`${P}/samtale-foaje.webp`} alt="Andreas Myraune i samtale med to deltakere i foajeen på InnoCamp etter pitchen" width={1800} height={1350} loading="lazy" className="w-full h-auto rounded-2xl" />
              <figcaption className="text-xs text-muted-foreground mt-3">Pausen etterpå, i foajeen på InnoCamp.</figcaption>
            </figure>
          </Reveal>
          <div>
            <Label>Resultatet</Label>
            <H2>LGR Technologies vant. Enstemmig.</H2>
            <Body>
              Sensorteknologi til forsvar og sikkerhet, fra Gründerbrakka på NTNU. Juryleder Arne Tørris Haug kalte dem en verdig vinner, og daglig leder Stian Landstad sa pengene går uavkortet til teknologiutvikling. Det er vanskelig å krangle med.
            </Body>
            <Body>
              Konkurransen scorer på sju kriterier, bærekraft er ett av dem, og to av fire i juryen kommer fra universitetene. Et reklameselskap med kunder i gaming er ikke favoritt i det oppsettet, og det visste vi. Det vi ville ha ut av dagen var noe annet: én sal med beslutningstakere i Trøndelag som nå vet at det finnes et selskap her som legger reklame inn i direktesendinger, og at Samsung, Komplett og Shure allerede har kjøpt det.
            </Body>
            <Body>
              Det fikk vi. Pluss fire minutter video vi kan sende til alle som spør hva vi egentlig driver med.
            </Body>
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 max-w-md border-t border-border pt-5">
              {JURY.map((j) => (
                <div key={j.name}>
                  <div className="text-sm font-semibold text-foreground">{j.name}</div>
                  <div className="text-xs text-muted-foreground">{j.org}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="rounded-3xl bg-foreground text-background p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3">Fikk du ikke med deg pitchen? Vi tar den på tretti minutter.</h2>
              <p className="text-background/60">Ekte sendinger, ekte rapporter, ingen slides denne gangen.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
                <Link to="/demo">Book en demo <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-background hover:bg-background/10 rounded-full px-8 border border-background/20">
                <Link to="/case-study/samsung-fold7">Samsung-casen</Link>
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-10 max-w-2xl">
            Kilder: T:lab, «LGR Technologies pitchet seg til topps i Fremtidens verdiskaper» (juni 2026); Næringsforeninga i Trondheimsregionen, «Dobler premiepotten i gründerkonkurranse»; framtidsfredag.no. Bildene er våre egne fra dagen.
            {" "}
            <a href="https://tlab.no/aktuelt/lgr-technologies-vant-fremtidens-verdiskaper" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground">T:lab <ArrowUpRight className="w-3 h-3" /></a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default FremtidensVerdiskaper;
