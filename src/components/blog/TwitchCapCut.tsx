import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Twitch x CapCut, forklart for nordiske merkevarer.
 *
 * Kilden er e-posten Twitch sendte 10. september 2026 pluss CapCuts egen
 * produktside. Begge er tynne på detaljer, så alt som står her er enten hentet
 * derfra eller fra publiserte kilder om modellene, og ingenting er gjettet.
 *
 * En detalj verdt å ha med: den norske e-posten fra Twitch nevner Seedance 2.5,
 * mens verktøyet på skjermbildet kjører Seedream 5.0. Det er to forskjellige
 * ByteDance-modeller, én for video og én for bilde, og CapCuts egen side lister
 * begge. Det er ikke en feil i e-posten, men det forvirrer hvis man leser fort.
 *
 * Bildene er Twitch og CapCut sitt eget markedsmateriell, brukt redaksjonelt
 * for å illustrere omtale. Beta Agency AS har ingen relasjon til noen av dem.
 */

const serif = { fontFamily: "'Instrument Serif', serif" };

const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
};

/** Det CapCut selv lister på produktsiden, ikke det vi antar at det gjør. */
const FEATURES: { label: string; body: string }[] = [
  {
    label: "Bannere og kanalgrafikk",
    body: "Kanalbanner, avatar og skjermer for «starting soon» og «stream outro», laget fra en tekstbeskrivelse i stedet for i Photoshop.",
  },
  {
    label: "Klipp ut av sendingen",
    body: "Verktøyet henter ut korte klipp fra en hel sending automatisk og legger på teksting. Det er den delen som betyr noe for rekkevidde.",
  },
  {
    label: "Ferdige videomaler",
    body: "Gaming Channel Intro, Live Highlights, Stream Highlights, Channel Intro, Starting Soon og Stream Outro er malene CapCut navngir.",
  },
  {
    label: "Gratis, på tre flater",
    body: "Nettleser, skrivebord og mobil. CapCut skriver «no credit card needed» på siden, uten at det er sagt noe om hvor lenge.",
  },
];

/** De to modellene, som er lette å blande sammen. */
const MODELS: { name: string; kind: string; body: string }[] = [
  {
    name: "Seedream 5.0",
    kind: "Bilde",
    body: "Den som lager bannere og kanalgrafikk. Den er det du ser i verktøyet på skjermbildet over. Kom på CapCut i februar 2026, og Pro-versjonen 8. juli. Gir 2K direkte og 4K etter oppskalering.",
  },
  {
    name: "Seedance 2.5",
    kind: "Video",
    body: "Den som lager video, og den e-posten fra Twitch faktisk navngir. Seedance kom i juni 2025, versjon 2.0 i februar 2026, og 2.5 klarer 30 sekunder sammenhengende video i én omgang.",
  },
];

const MEANS: { title: string; body: string }[] = [
  {
    title: "Sponsede øyeblikk får lengre levetid",
    body: "En overlay som ligger i sendingen forsvinner når sendingen er over, med mindre noen klipper den ut. Nå gjør skaperen det på minutter i stedet for i en kveldsøkt med redigering. Det er den samme mekanismen vi måler som Replay reach: sendingen fortsetter å levere lenge etter at den er slutt.",
  },
  {
    title: "Terskelen for kanalgrafikk faller til null",
    body: "Mindre skapere som aldri har hatt råd til en designer får plutselig en kanal som ser proff ut. For en merkevare betyr det at «ser kanalen seriøs ut» slutter å være et brukbart signal når man plukker skapere. Tallene betyr mer, utseendet betyr mindre.",
  },
  {
    title: "Mer innhold, ikke nødvendigvis bedre",
    body: "Gratis verktøy som senker terskelen gir alltid mer volum. Det som skiller et klipp som blir sett fra et som ikke blir det er fortsatt øyeblikket i seg selv, og det kan ingen mal lage.",
  },
];

const CAVEATS: { title: string; body: string }[] = [
  {
    title: "AI-generert grafikk rundt betalt innhold",
    body: "Hvis en kanal bruker AI-genererte bannere i samme sending som en betalt kampanje, står merket ved siden av bilder ingen har godkjent. Det er verdt en linje i avtalen, ikke en krise.",
  },
  {
    title: "Automatisk klipping velger ikke for deg",
    body: "Verktøyet finner øyeblikk, ikke de riktige øyeblikkene. Et klipp der overlayet så vidt er i bildet teller ikke som leveranse. Vi går fortsatt gjennom klipp manuelt før de rapporteres.",
  },
  {
    title: "Ingenting av dette er annonsering",
    body: "Dette er produksjon og kanalgrafikk. Det endrer ikke hvordan annonser kjøpes eller vises på Twitch, og det gir ikke merkevarer noen ny flate. Det gjør bare at det som allerede skjedde når lenger.",
  },
];

const SOURCES = [
  {
    publisher: "Twitch",
    title: "E-post til strømmere: «CapCut for Twitch-strømmere», 10. september 2026",
    href: null as string | null,
  },
  {
    publisher: "CapCut",
    title: "CapCut for Twitch, produktsiden med maler og modellnavn",
    href: "https://www.capcut.com/create/twitch-capcut",
  },
  {
    publisher: "GlobeNewswire",
    title: "CapCut Design Studio Levels Up: Seedream 5.0 Pro Model, 14. august 2026",
    href: "https://www.globenewswire.com/news-release/2026/08/14/3345553/0/en/capcut-design-studio-levels-up-new-skills-ecosystem-and-seedream-5-0-pro-model-bring-pro-grade-ai-design-to-everyone.html",
  },
];

const TwitchCapCut: React.FC = () => (
  <article>
    {/* ── Hero ── */}
    <section className="relative overflow-hidden rounded-3xl bg-[hsl(263_60%_46%)]">
      <img
        src="/lovable-uploads/capcut/twitch-capcut-banner.webp"
        alt="Twitch og CapCut sitt felles banner"
        width={600}
        height={300}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, hsl(263 60% 20% / 0.96) 0%, hsl(263 60% 22% / 0.9) 46%, hsl(263 60% 30% / 0.5) 100%)",
        }}
      />
      <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-14 lg:py-20 max-w-2xl">
        <span className="text-xs font-semibold tracking-widest uppercase text-white/70 mb-4 block">
          Plattformnytt · 10. september 2026
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.06] tracking-tight mb-6">
          Twitch har fått en{" "}
          <span style={serif} className="italic font-normal">
            klippemaskin
          </span>
          <br />
          innebygd
        </h1>
        <p className="text-base text-white/75 leading-relaxed">
          Twitch og CapCut samarbeider nå om bannere, maler og automatisk klipping, gratis
          for alle strømmere. Det er ikke et annonseprodukt, og det betyr likevel noe for
          merkevarer som kjøper sendinger.
        </p>
      </div>
    </section>

    {/* ── Hva det er ── */}
    <section className="py-14 md:py-16 border-t border-border mt-14">
      <Reveal>
        <div className="max-w-[38rem] mb-10">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
            Hva det faktisk er
          </h2>
          <p className="text-[17px] text-muted-foreground leading-relaxed">
            Twitch sendte e-posten 10. september. Den er kort og sier lite, så dette er
            hentet fra CapCuts egen produktside, som navngir funksjonene.
          </p>
        </div>
      </Reveal>
      <dl className="max-w-3xl">
        {FEATURES.map((f) => (
          <Reveal key={f.label}>
            <div className="grid sm:grid-cols-[210px_1fr] gap-x-8 gap-y-1 py-6 border-t border-border">
              <dt className="text-sm font-semibold text-foreground pt-0.5">{f.label}</dt>
              <dd className="m-0 text-[15px] text-muted-foreground leading-relaxed">
                {f.body}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>

    {/* ── Verktøyet ── */}
    <section className="py-14 md:py-16 border-t border-border">
      <Reveal>
        <div className="max-w-[38rem] mb-10">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
            To modeller, og det er lett å blande dem
          </h2>
          <p className="text-[17px] text-muted-foreground leading-relaxed">
            Den norske e-posten fra Twitch nevner Seedance 2.5. Verktøyet på bildet under
            kjører Seedream 5.0. Begge er ByteDance-modeller, og CapCut bruker begge, men
            til hver sin ting.
          </p>
        </div>
      </Reveal>
      <Reveal>
        <figure className="m-0 max-w-3xl mb-12">
          <div className="rounded-xl overflow-hidden bg-muted ring-1 ring-border">
            <img
              src="/lovable-uploads/capcut/capcut-banner-tool.webp"
              alt="CapCut sitt bannerverktøy for Twitch, med Seedream 5.0 valgt som modell"
              loading="lazy"
              width={1400}
              height={1120}
              className="w-full h-auto block"
            />
          </div>
          <figcaption className="text-xs text-muted-foreground mt-3">
            CapCuts eget produktbilde. Modellvelgeren nederst til høyre står på Seedream 5.0.
          </figcaption>
        </figure>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 max-w-4xl">
        {MODELS.map((m) => (
          <Reveal key={m.name}>
            <div className="border-t border-border pt-5">
              <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
                {m.kind}
              </div>
              <div className="text-lg font-semibold text-foreground tracking-tight mb-2">
                {m.name}
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{m.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* ── Hva det betyr ── */}
    <section className="py-14 md:py-16 border-t border-border">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-10 max-w-[38rem]">
          Hvorfor en redigeringsapp angår en medieplan
        </h2>
      </Reveal>
      <div className="max-w-3xl divide-y divide-border border-y border-border">
        {MEANS.map((m) => (
          <Reveal key={m.title}>
            <div className="py-6">
              <h3 className="text-base font-semibold text-foreground mb-2">{m.title}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{m.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <Link
          to="/replay-reach"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground mt-7 hover:text-primary transition-colors"
        >
          Se hvordan vi måler Replay reach
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </section>

    {/* ── Forbehold ── */}
    <section className="py-14 md:py-16 border-t border-border">
      <Reveal>
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-12 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-8">
              Tre ting vi ville sagt fra om
            </h2>
            <div className="divide-y divide-border border-y border-border">
              {CAVEATS.map((c) => (
                <div key={c.title} className="py-6">
                  <h3 className="text-base font-semibold text-foreground mb-2">{c.title}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
          <figure className="m-0">
            <div className="rounded-xl overflow-hidden bg-muted ring-1 ring-border">
              <img
                src="/lovable-uploads/capcut/capcut-live-highlights.webp"
                alt="CapCut sin Live Highlights-mal for Twitch"
                loading="lazy"
                width={1100}
                height={823}
                className="w-full h-auto block"
              />
            </div>
            <figcaption className="text-xs text-muted-foreground mt-3">
              Live Highlights, én av malene CapCut navngir på produktsiden.
            </figcaption>
          </figure>
        </div>
      </Reveal>
    </section>

    {/* ── CTA ── */}
    <section className="py-14 md:py-16 border-t border-border">
      <Reveal>
        <div className="rounded-3xl border border-border p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
              Skal kampanjen deres leve videre etter sendingen?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Vi klipper, sjekker og rapporterer det som faktisk ble levert, i stedet for å
              telle alt en maskin fant.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12"
              >
                Book en demo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/twitch-annonsering-pris">
              <Button size="lg" variant="ghost" className="rounded-full px-8 h-12 border border-border">
                Se hva det koster
              </Button>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>

    {/* ── Kilder ── */}
    <section className="py-10 border-t border-border">
      <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5">
        Kilder
      </h2>
      <ul className="space-y-2.5 max-w-3xl">
        {SOURCES.map((s) => (
          <li key={s.title} className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground/80">{s.publisher}</span>{" "}
            {s.href ? (
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-1 hover:text-primary transition-colors"
              >
                {s.title}
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-50 group-hover:opacity-100" />
              </a>
            ) : (
              s.title
            )}
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground mt-6 max-w-3xl leading-relaxed">
        Bannere og produktbilder tilhører Twitch og CapCut, og er vist her for å illustrere
        omtale av lanseringen. Beta Agency AS er ikke tilknyttet Twitch, CapCut eller
        ByteDance.
      </p>
    </section>
  </article>
);

export default TwitchCapCut;
