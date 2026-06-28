import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SocialIcon } from "@/components/blog/SocialIcon";
import {
  type CreatorProfile,
  type MarketCode,
  isNativeLanguage,
  languageLabel,
  languageTooltip,
  languageLegendPrefix,
} from "@/data/streamers";

/** 4638403 -> "4,6M", 85915 -> "86K". */
function fmtFollowers(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".", ",").replace(",0", "") + "M";
  if (n >= 1_000) return Math.round(n / 1_000) + "K";
  return String(n);
}

export interface RoundupCopy {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  intro: string;
  statNativeLabel: string; // "norskspråklige" / "svenskspråkiga" / ...
  statIntlLabel: string; // "internasjonale" / "internationella" / ...
  statTotalLabel: string; // "streamere" / "streamare" / ...
  whyHeading: string;
  whyBody: string;
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
  readMore: string;
}

interface Props {
  creators: CreatorProfile[];
  market: MarketCode;
  copy: RoundupCopy;
}

/**
 * Generisk, markeds-agnostisk streamer-roundup (redaksjonelt kort-grid).
 * Brukt av de markeds-spesifikke flaggskip-postene (NO/SE/DK/FI) via en tynn
 * wrapper som sender inn creators + lokalisert copy.
 */
export const StreamerRoundup: React.FC<Props> = ({ creators, market, copy }) => {
  const total = creators.length;
  const nativeCount = creators.filter((c) => isNativeLanguage(c.language)).length;
  const intlCount = total - nativeCount;
  const stats = [
    { value: String(total), label: copy.statTotalLabel },
    { value: String(nativeCount), label: copy.statNativeLabel },
    { value: String(intlCount), label: copy.statIntlLabel },
  ];

  return (
    <div className="pb-4">
      {/* Editorial header */}
      <header className="max-w-3xl mb-8">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
          {copy.eyebrow}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground leading-[1.1] mb-4">
          {copy.titleLead}{" "}
          <span style={{ fontFamily: "'Instrument Serif', serif" }} className="italic font-normal">
            {copy.titleAccent}
          </span>
        </h1>
        <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed">
          {copy.intro}
        </p>

        {/* Redaksjonell stat-stripe */}
        <div className="mt-7 flex items-stretch gap-8 sm:gap-12">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-light tracking-tight text-foreground tabular-nums">
                {s.value}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Språk-legend (lokalisert per marked) */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-muted-foreground mr-1">{languageLegendPrefix(market)}</span>
          <span className="inline-flex items-center rounded-full bg-foreground text-background px-2 py-0.5 font-semibold tracking-widest uppercase">
            {languageLabel("no", market)}
          </span>
          <span className="inline-flex items-center rounded-full bg-primary text-white px-2 py-0.5 font-semibold tracking-widest uppercase">
            {languageLabel("en", market)}
          </span>
          <span className="inline-flex items-center rounded-full bg-muted text-foreground px-2 py-0.5 font-semibold tracking-widest uppercase">
            {languageLabel("mixed", market)}
          </span>
        </div>
      </header>

      {/* Kort-grid */}
      <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
        {creators.map((c, i) => (
          <li
            key={c.handle}
            className="group relative flex flex-col rounded-2xl border border-border/60 bg-card/40 overflow-hidden hover:border-primary/40 hover:bg-card/70 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
          >
            <Link
              to={`/streamere/${c.handle}`}
              aria-label={`Les mer om ${c.name}`}
              className="absolute inset-0 z-10"
            />

            {/* Banner: mest sette Twitch-klipp */}
            <div className="relative block aspect-[16/9] overflow-hidden bg-muted">
              <img
                src={c.bannerImage ?? c.twitchClips?.[0]?.thumbnailURL ?? c.image}
                alt={`${c.name} streamer`}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (!t.dataset.fb) { t.dataset.fb = "1"; t.src = c.image; }
                }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
              {c.twitchStats && (
                <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-white">
                  <SocialIcon label="Twitch" className="w-3.5 h-3.5" />
                  {fmtFollowers(c.twitchStats.followers)}
                  <span className="font-normal text-white/75">følgere</span>
                </span>
              )}
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold tabular-nums tracking-widest text-white">
                {String(i + 1).padStart(2, "0")} / {total}
              </span>
              <span
                className={`absolute top-3 right-3 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase shadow-sm ${
                  isNativeLanguage(c.language)
                    ? "bg-white/95 text-black"
                    : c.language === "en"
                      ? "bg-primary text-white"
                      : "bg-black/55 text-white backdrop-blur-sm"
                }`}
                title={languageTooltip(c.language, market)}
              >
                {languageLabel(c.language, market)}
              </span>
            </div>

            {/* Innhold */}
            <div className="relative p-5 pt-3 flex flex-col flex-1">
              <img
                src={c.image}
                alt={c.realName ? `${c.realName} (${c.name})` : c.name}
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (!t.dataset.r) { t.dataset.r = "1"; t.src = `https://unavatar.io/twitch/${c.handle}`; }
                }}
                className="absolute -top-7 right-5 w-14 h-14 rounded-xl object-cover ring-2 ring-background bg-muted shadow-md"
              />

              <div className="pr-16">
                <h2 className="text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                  {c.name}
                </h2>
                <span className="text-xs font-medium text-primary">@{c.handle}</span>
              </div>

              <p className="text-[11px] text-muted-foreground mt-1">
                {c.realName ? `${c.realName} · ` : ""}
                {c.meta}
              </p>

              <p className="text-sm text-foreground/80 leading-relaxed mt-3 line-clamp-3">
                {c.blurb}
              </p>

              <div className="mt-auto pt-5 flex items-center justify-between gap-2">
                <div className="relative z-20 flex flex-wrap gap-1.5">
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
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary shrink-0 group-hover:gap-2 transition-all">
                  {copy.readMore}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Why it matters + CTA */}
      <section className="mt-14 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
          {copy.whyHeading}
        </h2>
        <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-8">
          {copy.whyBody}
        </p>
        <div className="rounded-3xl bg-foreground text-background p-8 md:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-light tracking-tight mb-1">{copy.ctaHeading}</h3>
            <p className="text-background/60 text-sm max-w-md">{copy.ctaBody}</p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 shrink-0 rounded-full bg-primary hover:bg-primary/90 text-white px-7 h-12 text-sm font-medium transition-colors"
          >
            {copy.ctaButton} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StreamerRoundup;
