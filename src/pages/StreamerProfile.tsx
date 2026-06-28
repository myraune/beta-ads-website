import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SPFooter } from "@/components/sections/SPFooter";
import { getCreatorByHandle, CREATORS } from "@/data/norskeStreamere";

/**
 * Per-streamer profilside, rutet på /streamere/<handle>.
 *
 * Lengre bio enn roundup-kortet, høydepunkter, sosiale lenker og eksterne
 * kilder for videre lesning. Lenker tilbake til roundup-saken.
 */

const LANG_LABEL: Record<"no" | "en" | "mixed", string> = {
  no: "Streamer på norsk",
  en: "Streamer på engelsk",
  mixed: "Innhold på norsk og engelsk",
};

const StreamerProfile: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const c = handle ? getCreatorByHandle(handle) : undefined;
  if (!c) return <Navigate to="/blog/norske-twitch-streamere-2026" replace />;

  // Forrige/neste streamer i listen, for navigering mellom profilene.
  const idx = CREATORS.findIndex((x) => x.handle === c.handle);
  const prev = idx > 0 ? CREATORS[idx - 1] : undefined;
  const next = idx < CREATORS.length - 1 ? CREATORS[idx + 1] : undefined;

  const langLabel =
    c.language === "no" ? "Norsk" : c.language === "en" ? "Engelsk" : "Norsk / Engelsk";

  return (
    <>
      <SEO
        title={`${c.name}${c.realName ? ` (${c.realName})` : ""} | Norske streamere | Beta Ads`}
        description={`Bakgrunn, kanaler og kilder for ${c.name} - ${c.meta}. ${c.blurb}`}
        canonical={`/streamere/${c.handle}`}
        locale="no"
        ogImage={c.image}
        ogImageAlt={c.realName ? `${c.realName} (${c.name})` : c.name}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: c.realName || c.name,
            alternateName: c.name,
            url: `https://beta-ads.no/streamere/${c.handle}`,
            image: c.image.startsWith("http") ? c.image : `https://beta-ads.no${c.image}`,
            sameAs: [...c.socials.map((s) => s.url), ...c.references.map((r) => r.url)],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://beta-ads.no/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://beta-ads.no/blog" },
              {
                "@type": "ListItem",
                position: 3,
                name: "Norske streamere",
                item: "https://beta-ads.no/blog/norske-twitch-streamere-2026",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: c.name,
                item: `https://beta-ads.no/streamere/${c.handle}`,
              },
            ],
          },
        ]}
      />

      <div className="pt-24 pb-12 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Brødsmuler / tilbake */}
        <Link
          to="/blog/norske-twitch-streamere-2026"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Tilbake til norske streamere
        </Link>

        {/* Hero */}
        <header className="grid md:grid-cols-12 gap-8 md:gap-10 items-start mb-12">
          <figure className="md:col-span-5 m-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted ring-1 ring-border">
              <img
                src={c.image}
                alt={c.realName ? `${c.realName} (${c.name})` : c.name}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span
                className={`absolute top-3 right-3 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-widest uppercase shadow-sm ${
                  c.language === "no"
                    ? "bg-white/95 text-black"
                    : c.language === "en"
                      ? "bg-primary text-white"
                      : "bg-black/55 text-white backdrop-blur-sm"
                }`}
                title={LANG_LABEL[c.language]}
              >
                {langLabel}
              </span>
            </div>
            <figcaption className="mt-2 text-[11px] text-muted-foreground">
              Foto:{" "}
              <a
                href={c.attributionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline-offset-2 hover:underline"
              >
                {c.attribution}
              </a>
            </figcaption>
          </figure>

          <div className="md:col-span-7">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Norsk streaming
            </span>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground leading-[1.08] mb-2">
              {c.name}
            </h1>
            <p className="text-sm text-muted-foreground mb-1">
              {c.realName ? `${c.realName} · ` : ""}
              {c.meta}
            </p>
            <p className="text-sm text-muted-foreground mb-6">{LANG_LABEL[c.language]}</p>
            <p className="text-base md:text-lg font-light text-foreground/85 leading-relaxed">
              {c.bio}
            </p>

            {/* Sosiale lenker */}
            <div className="mt-7 flex flex-wrap gap-2">
              {c.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-full border border-border/70 text-foreground/85 hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  {s.label}
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              ))}
            </div>
          </div>
        </header>

        {/* Høydepunkter */}
        {c.highlights.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              Høydepunkter
            </h2>
            <ul className="space-y-2.5 max-w-3xl">
              {c.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-foreground/85 leading-relaxed">
                  <span className="mt-2.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Kilder / les mer */}
        {c.references.length > 0 && (
          <section className="mb-14 max-w-3xl">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              Bakgrunn og kilder
            </h2>
            <ul className="space-y-1">
              {c.references.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                  >
                    <span className="text-[10px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {refTypeLabel(r.type)}
                    </span>
                    <span className="underline-offset-2 group-hover:underline">{r.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-muted-foreground/70 mt-6">
              Faktagrunnlag hentet fra sjekkbare offentlige kilder. Tall fra
              trackere (følgere, gjennomsnittsseere) er øyeblikksbilder og
              varierer over tid.
            </p>
          </section>
        )}

        {/* Prev/next streamer */}
        <nav className="border-t border-border pt-6 mt-10 flex items-center justify-between gap-4 text-sm">
          {prev ? (
            <Link
              to={`/streamere/${prev.handle}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-w-0"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span className="truncate">
                <span className="hidden sm:inline">Forrige · </span>
                {prev.name}
              </span>
            </Link>
          ) : <span />}
          <Link
            to="/blog/norske-twitch-streamere-2026"
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            Alle 10
          </Link>
          {next ? (
            <Link
              to={`/streamere/${next.handle}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-w-0 justify-end"
            >
              <span className="truncate text-right">
                <span className="hidden sm:inline">Neste · </span>
                {next.name}
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          ) : <span />}
        </nav>
      </div>

      <SPFooter />
    </>
  );
};

function refTypeLabel(t: string): string {
  switch (t) {
    case "official-site": return "Offisiell side";
    case "press":         return "Presse";
    case "wikipedia":     return "Wikipedia";
    case "news":          return "Nyhet";
    case "tracker":       return "Statistikk";
    case "agency":        return "Byrå";
    case "platform":      return "Plattform";
    default:              return t;
  }
}

export default StreamerProfile;
