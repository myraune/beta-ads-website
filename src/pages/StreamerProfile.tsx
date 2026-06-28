import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SPFooter } from "@/components/sections/SPFooter";
import { getCreatorByHandle, getMarketOfHandle, MARKET_CREATORS, MARKET_ROUNDUP, profileLabels, isNativeLanguage, languageLabel, languageTooltip } from "@/data/streamers";
import { SocialIcon } from "@/components/blog/SocialIcon";
import { NewsCard } from "@/components/blog/NewsCard";
import { StreamerMedia } from "@/components/blog/StreamerMedia";

/**
 * Per-streamer profilside, rutet på /streamere/<handle>.
 *
 * Lengre bio enn roundup-kortet, høydepunkter, sosiale lenker og eksterne
 * kilder for videre lesning. Lenker tilbake til roundup-saken.
 */

/** 4638403 -> "4,6M", 85915 -> "86K" (norsk tallformat). */
function fmtFollowers(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".", ",").replace(",0", "") + "M";
  if (n >= 1_000) return Math.round(n / 1_000) + "K";
  return String(n);
}

const StreamerProfile: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const c = handle ? getCreatorByHandle(handle) : undefined;
  if (!c) return <Navigate to="/blog/norske-twitch-streamere-2026" replace />;

  // Forrige/neste streamer innenfor samme marked, for navigering mellom profilene.
  const market = getMarketOfHandle(c.handle) ?? "no";
  const list = MARKET_CREATORS[market] ?? [];
  const idx = list.findIndex((x) => x.handle === c.handle);
  const prev = idx > 0 ? list[idx - 1] : undefined;
  const next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : undefined;
  const roundup = MARKET_ROUNDUP[market];
  const roundupPath = `/blog/${roundup.slug}`;
  const L = profileLabels(market);

  const langLabel = languageLabel(c.language, market);
  const langTip = languageTooltip(c.language, market);
  const langNative = isNativeLanguage(c.language);

  return (
    <>
      <SEO
        title={`${c.name}${c.realName ? ` (${c.realName})` : ""} | ${roundup.noun} | Beta Ads`}
        description={`Bakgrunn, kanaler og kilder for ${c.name} - ${c.meta}. ${c.blurb}`}
        canonical={`/streamere/${c.handle}`}
        locale={roundup.seoLocale}
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
                name: roundup.noun,
                item: `https://beta-ads.no${roundupPath}`,
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
          to={roundupPath}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> {roundup.back}
        </Link>

        {/* Cinematisk hero - bredt klipp-banner med navn overlagt (magasin-stil),
            portrett som rundet innfelling. */}
        <header className="mb-12">
          <div className="relative overflow-hidden rounded-3xl bg-muted ring-1 ring-border">
            <div className="relative aspect-[16/10] sm:aspect-[5/2]">
              <img
                src={c.bannerImage ?? c.twitchClips?.[0]?.thumbnailURL ?? c.image}
                alt={`${c.name} streamer`}
                loading="eager"
                decoding="async"
                // @ts-expect-error - React 18 typer ikke fetchpriority ennå
                fetchpriority="high"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (!t.dataset.fb) { t.dataset.fb = "1"; t.src = c.image; }
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

              {/* Språk-tag */}
              <span
                className={`absolute top-4 right-4 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-widest uppercase shadow-sm ${
                  langNative
                    ? "bg-white/95 text-black"
                    : c.language === "en"
                      ? "bg-primary text-white"
                      : "bg-black/55 text-white backdrop-blur-sm"
                }`}
                title={langTip}
              >
                {langLabel}
              </span>

              {/* Overlagt navn + portrett nederst */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 flex items-end gap-4 sm:gap-5">
                <img
                  src={c.image}
                  alt={c.realName ? `${c.realName} (${c.name})` : c.name}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (!t.dataset.r) { t.dataset.r = "1"; t.src = `https://unavatar.io/twitch/${c.handle}`; }
                  }}
                  className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-white/85 shadow-xl shrink-0 bg-muted"
                />
                <div className="min-w-0 pb-0.5">
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-white/70 mb-1 block">
                    {L.eyebrow}
                  </span>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.0]">
                    {c.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-white/80 mt-1.5 truncate">
                    {c.realName ? `${c.realName} · ` : ""}
                    {c.meta}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Foto-kreditt (banneret er et Twitch-klipp med mindre vi har en
              eksplisitt bannerImage-override - da er det samme kilde som portrettet) */}
          <p className="mt-2 text-[11px] text-muted-foreground/80">
            Foto:{" "}
            <a
              href={c.attributionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline-offset-2 hover:underline"
            >
              {c.attribution}
            </a>
            {!c.bannerImage && " · Banner: Twitch-klipp"}
          </p>

          {/* Bio + sosiale lenker */}
          <div className="grid lg:grid-cols-3 gap-x-10 gap-y-6 mt-9">
            <p className="lg:col-span-2 text-lg md:text-xl font-light text-foreground/85 leading-relaxed">
              {c.bio}
            </p>
            <div className="lg:pt-1">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">
                {L.follow} {c.name}
              </span>
              <div className="flex flex-wrap gap-2">
                {c.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${c.name} på ${s.label}`}
                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-border/70 text-foreground/85 hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <SocialIcon label={s.label} url={s.url} className="w-4 h-4" />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Twitch-statistikk - live tall fra Twitch */}
        {c.twitchStats && (
          <section className="border-t border-border/60 pt-12 mb-14">
            <div className="flex items-center gap-2 mb-5">
              <SocialIcon label="Twitch" className="w-4 h-4 text-primary" />
              <h2 className="text-xs font-semibold tracking-widest uppercase text-primary">
                {L.twitchStats}
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-x-12 gap-y-8">
              <div>
                <div className="text-3xl md:text-4xl font-light tracking-tight text-foreground tabular-nums">
                  {fmtFollowers(c.twitchStats.followers)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{L.followers}</div>
              </div>
              {/* Tracker-tall: snitt-seere er det viktigste rekkevidde-tallet for merkevarer */}
              {c.trackerStats && (
                <>
                  <div>
                    <div className="text-3xl md:text-4xl font-light tracking-tight text-primary tabular-nums">
                      {c.trackerStats.avgViewers.toLocaleString("nb-NO")}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{L.avgViewers}</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-light tracking-tight text-foreground tabular-nums">
                      {c.trackerStats.peakViewers.toLocaleString("nb-NO")}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{L.peakViewers}</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-light tracking-tight text-foreground tabular-nums">
                      {c.trackerStats.hoursStreamed}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{L.hoursStreamed}</div>
                  </div>
                </>
              )}
              <div>
                <div className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                  {c.twitchStats.partner ? L.partner : L.affiliate}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{L.statusLabel}</div>
              </div>
              {c.twitchStats.createdAt && (
                <div>
                  <div className="text-3xl md:text-4xl font-light tracking-tight text-foreground tabular-nums">
                    {c.twitchStats.createdAt.slice(0, 4)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{L.since}</div>
                </div>
              )}
              {c.twitchStats.lastGame && (
                <div className="min-w-0">
                  <div className="text-2xl md:text-3xl font-light tracking-tight text-foreground truncate">
                    {c.twitchStats.lastGame}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{L.category}</div>
                </div>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground/70 mt-5">
              {L.statsNote}
              {c.trackerStats ? " " + L.trackerNote : ""}
            </p>
          </section>
        )}

        {/* Høydepunkter */}
        {c.highlights.length > 0 && (
          <section className="border-t border-border/60 pt-12 mb-14">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              {L.highlights}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
              {c.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-foreground/85 leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Medieseksjon - Twitch-klipp, YouTube, TikTok i faner */}
        <StreamerMedia
          name={c.name}
          market={market}
          twitchHandle={c.handle}
          twitchClips={c.twitchClips}
          youtubeVideos={c.youtubeVideos}
          youtubeChannelHandle={c.youtubeChannelHandle}
          tiktokVideos={c.tiktokVideos}
          tiktokHandle={c.tiktokHandle}
        />

        {/* Nyhetsoppslag - ekte presse + portretter */}
        {c.news && c.news.length > 0 && (
          <section className="border-t border-border/60 pt-12 mb-14">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-5">
              {L.inPress}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.news.map((a) => (
                <NewsCard key={a.url} article={a} />
              ))}
            </div>
          </section>
        )}

        {/* Kilder / les mer */}
        {c.references.length > 0 && (
          <section className="border-t border-border/60 pt-12 mb-14 max-w-3xl">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              {L.sources}
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
            <p className="text-[11px] text-muted-foreground/70 mt-6">{L.sourcesNote}</p>
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
            to={roundupPath}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            {roundup.all} {list.length}
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
