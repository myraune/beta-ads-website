import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CREATORS } from "@/data/norskeStreamere";
import { SocialIcon } from "@/components/blog/SocialIcon";

/**
 * Flagship Norwegian creator roundup - bespoke editorial layout (not the generic
 * markdown article template). Real Twitch avatars via unavatar.io/twitch/<handle>
 * (the same public-avatar source the streamer explorer already uses).
 *
 * Facts are sourced from web research; anything uncertain is intentionally kept
 * qualitative in the copy and listed in the publish-time verify notes.
 */




const NorskeStreamere2026: React.FC = () => {
  return (
    <div className="pb-4">
      {/* Editorial header - tett, så listen kommer over folden */}
      <header className="max-w-3xl mb-8">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
          Norsk streaming
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground leading-[1.1] mb-4">
          Norske Twitch-streamere du bør kjenne til i{" "}
          <span style={{ fontFamily: "'Instrument Serif', serif" }} className="italic font-normal">
            2026
          </span>
        </h1>
        <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed">
          Et utvalg av streamere og innholdsskapere som setter preg på det norske
          streamingmiljøet - fra Fortnite-proffer til IRL-profiler og
          YouTube-veteraner. Ikke en rangering, en oversikt.
        </p>

        {/* Språk-legend - kompakt */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-muted-foreground mr-1">Streamer på:</span>
          <span className="inline-flex items-center rounded-full bg-foreground text-background px-2 py-0.5 font-semibold tracking-widest uppercase">
            Norsk
          </span>
          <span className="inline-flex items-center rounded-full bg-primary text-white px-2 py-0.5 font-semibold tracking-widest uppercase">
            Engelsk
          </span>
          <span className="inline-flex items-center rounded-full bg-muted text-foreground px-2 py-0.5 font-semibold tracking-widest uppercase">
            Norsk / Engelsk
          </span>
        </div>
      </header>

      {/* Kort-grid: 2 per rad på desktop, 1 på mobil. Hvert kort er
          selvstendig med ekte foto, Twitch-avatar overlappende, blurb og
          sosiale lenker. */}
      <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
        {CREATORS.map((c, i) => (
          <li
            key={c.handle}
            className="group relative flex flex-col rounded-2xl border border-border/60 bg-card/40 overflow-hidden hover:border-primary/40 hover:bg-card/70 transition-colors"
          >
            {/* Hele kortet lenker til profilsiden (stretched link). Sosiale
                ikon-knapper og foto-kreditt ligger over med høyere z-index. */}
            <Link
              to={`/streamere/${c.handle}`}
              aria-label={`Les mer om ${c.name}`}
              className="absolute inset-0 z-10"
            />

            {/* Banner-foto */}
            <div className="relative block aspect-[16/9] overflow-hidden bg-muted">
              <img
                src={c.image}
                alt={c.realName ? `${c.realName} (${c.name})` : c.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Mørk gradient i bunn så avatar + tekst leses */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
              {/* Nummer */}
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold tabular-nums tracking-widest text-white">
                {String(i + 1).padStart(2, "0")} / 10
              </span>
              {/* Språk-tag */}
              <span
                className={`absolute top-3 right-3 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase shadow-sm ${
                  c.language === "no"
                    ? "bg-white/95 text-black"
                    : c.language === "en"
                      ? "bg-primary text-white"
                      : "bg-black/55 text-white backdrop-blur-sm"
                }`}
                title={
                  c.language === "no"
                    ? "Streamer på norsk"
                    : c.language === "en"
                      ? "Streamer på engelsk"
                      : "Innhold på norsk og engelsk"
                }
              >
                {c.language === "no" ? "Norsk" : c.language === "en" ? "Engelsk" : "Norsk / Engelsk"}
              </span>
            </div>

            {/* Innhold */}
            <div className="relative p-5 pt-3">
              {/* Twitch-avatar som overlapper banner */}
              <img
                src={`https://unavatar.io/twitch/${c.handle}`}
                alt=""
                aria-hidden="true"
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (!t.dataset.r) { t.dataset.r = "1"; t.src = `https://unavatar.io/twitch/${c.handle}?fallback=false`; }
                }}
                className="absolute -top-7 right-5 w-14 h-14 rounded-xl object-cover ring-2 ring-background bg-muted shadow-md"
              />

              {/* Navn + handle (hele kortet lenker til profilen; Twitch nås via
                  ikon-knappen under) */}
              <div className="pr-16">
                <h2 className="text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                  {c.name}
                </h2>
                <span className="text-xs font-medium text-primary">
                  @{c.handle}
                </span>
              </div>

              <p className="text-[11px] text-muted-foreground mt-1">
                {c.realName ? `${c.realName} · ` : ""}
                {c.meta}
              </p>

              <p className="text-sm text-foreground/85 leading-relaxed mt-3">
                {c.blurb}
              </p>

              {/* Sosiale lenker - ikon-knapper (over stretched-linken så de går
                  til riktig plattform, ikke profilsiden) */}
              <div className="relative z-20 mt-4 flex flex-wrap gap-1.5">
                {c.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${c.name} på ${s.label}`}
                    title={s.label}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border/70 text-foreground/70 hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <SocialIcon label={s.label} url={s.url} className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>

              {/* Les mer-affordans (klikk håndteres av stretched-linken over hele kortet) */}
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary mt-4 group-hover:gap-2 transition-all">
                Les mer om {c.name}
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>

              {/* Foto-attribusjon (over stretched-linken så kilden er klikkbar) */}
              <p className="relative z-20 text-[10px] text-muted-foreground/70 mt-4 pt-3 border-t border-border/40">
                Foto:{" "}
                <a
                  href={c.attributionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground underline-offset-2 hover:underline"
                >
                  {c.attribution}
                </a>
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Why it matters for brands + CTA */}
      <section className="mt-14 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
          Hvorfor dette er kartet merkevarer trenger
        </h2>
        <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-8">
          Disse kanalene er også oversikten over hvor norsk Gen Z faktisk bruker
          oppmerksomheten sin - et publikum som hopper over pre-rolls og kjører
          adblock. Beta Ads bygger native overlay-annonser rett inn i sendingene
          deres, så merkevaren din blir en del av innholdet i stedet for en
          avbrytelse.
        </p>
        <div className="rounded-3xl bg-foreground text-background p-8 md:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-light tracking-tight mb-1">
              Vil du nå norsk Gen Z der de faktisk er?
            </h3>
            <p className="text-background/60 text-sm max-w-md">
              Ta en prat med oss, så viser vi hvordan merkevaren din kan leve
              inni streamen.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 shrink-0 rounded-full bg-primary hover:bg-primary/90 text-white px-7 h-12 text-sm font-medium transition-colors"
          >
            Snakk med Beta Ads <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NorskeStreamere2026;
