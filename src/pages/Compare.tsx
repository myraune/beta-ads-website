import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { track } from "@vercel/analytics";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import {
  BETA_PROFILE, BETA_SCORE, CAPS, competitors, competitorRoute,
  type Competitor, type Mark,
} from "@/data/competitors";
import "@/components/home-final/home-final.css";

/* One comparison page per alternative (data in src/data/competitors.ts).
 * Layout follows the comparison pages that win competitor searches (Lefty,
 * Creator.co): dark hero with the lead form beside the headline, client logos,
 * a scorecard you can read in five seconds, then "with them / with us" per topic.
 * Every competitor claim links to a dated source at the bottom. */

const BOOKING_URL = "https://calendar.app.google/coW5NLQJtLxfRer19";
const W = "max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10";

const CLIENT_LOGOS: [string, string, number][] = [
  ["samsung", "Samsung", 15], ["logitech", "Logitech", 26], ["komplett", "Komplett", 20], ["steelseries", "SteelSeries", 17],
  ["shure", "Shure", 18], ["glorious", "Glorious", 18], ["foodora", "foodora", 19], ["saily", "Saily", 24],
];

const yt = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
const CASES = [
  { to: "/case-study/samsung", img: yt("Uw7IIecicB4"), b: "Samsung", t: "800,185 completed views across the Galaxy S25 and Z Fold7 campaigns." },
  { to: "/case-study/komplett", img: yt("ufNq-A4d7iA"), b: "Komplett", t: "Månedens Gaming Deal, linked straight from chat with !komplett." },
  { to: "/case-study/shure", img: yt("IZOx_VMdJJg"), b: "Shure", t: "A custom overlay for the MV6 creator launch." },
];

const fmtDate = (d: string) =>
  new Date(d + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** A company wordmark in one colour (the current text colour), no tile. The logo file
 * is used as a mask, so it reads white in the dark hero and ink on the page, in both
 * themes. Height is balanced by aspect ratio so wide and compact marks look the same size.
 * Without a logo file the name is set in type. */
export const LogoTile: React.FC<{ c?: Pick<Competitor, "logo" | "logoAspect" | "logoLabel" | "name">; size?: "sm" | "lg"; className?: string }> = ({ c, size = "lg", className = "" }) => {
  const src = c ? c.logo : "/compare/logos/beta.svg";
  const aspect = c ? c.logoAspect ?? 4 : 4.1;
  const base = size === "lg" ? 34 : 24;
  const h = Math.round(Math.min(base * 1.4, Math.max(base * 0.55, (base * 2) / Math.sqrt(aspect))));
  if (!src) {
    const label = c ? c.name.charAt(0).toUpperCase() + c.name.slice(1) : "Beta Ads";
    return <span className={`inline-block font-bold tracking-tight shrink-0 ${size === "lg" ? "text-xl" : "text-base"} ${className}`}>{label}</span>;
  }
  const mark = (
    <span
      role="img"
      aria-label={c ? `${c.name} logo` : "Beta Ads logo"}
      className={`inline-block shrink-0 bg-current ${c?.logoLabel ? "" : className}`}
      style={{
        height: h, width: Math.round(h * aspect),
        WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`,
        WebkitMaskSize: "contain", maskSize: "contain",
        WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
        WebkitMaskPosition: "left center", maskPosition: "left center",
      }}
    />
  );
  if (!c?.logoLabel) return mark;
  return (
    <span className={`inline-flex items-center gap-2 shrink-0 font-bold tracking-tight ${size === "lg" ? "text-xl" : "text-base"} ${className}`}>
      {mark}{c.name}
    </span>
  );
};

/** Scorecard mark: filled = yes, half = partial, ring with dash = no, text = not published. */
const MarkIcon: React.FC<{ m: Mark }> = ({ m }) => {
  if (m === "unknown") return <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Not published</span>;
  const label = { yes: "Yes", partial: "Partly", no: "No" }[m];
  return (
    <span className="inline-flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden className="shrink-0">
        {m === "yes" && (<><circle cx="11" cy="11" r="11" className="fill-foreground" /><path d="M6.5 11.3l3 3 6-6.3" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="stroke-background" /></>)}
        {m === "partial" && (<><circle cx="11" cy="11" r="10" fill="none" strokeWidth="2" className="stroke-foreground" /><path d="M11 1a10 10 0 0 1 0 20z" className="fill-foreground" /></>)}
        {m === "no" && (<><circle cx="11" cy="11" r="10" fill="none" strokeWidth="1.5" className="stroke-muted-foreground/60" /><path d="M7 11h8" strokeWidth="2" strokeLinecap="round" className="stroke-muted-foreground" /></>)}
      </svg>
      <span className="text-sm font-semibold">{label}</span>
    </span>
  );
};

const BUDGETS = ["Under 100,000 NOK", "100,000 to 200,000 NOK", "200,000 to 400,000 NOK", "Over 400,000 NOK", "Not sure yet"];

/** Lead form in the hero. Same delivery as /demo (notify-demo-request), tagged with the comparison. */
const LeadForm: React.FC<{ vs: string }> = ({ vs }) => {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || "");
    const company = String(f.get("company") || "");
    const type = String(f.get("type") || "");
    const budget = String(f.get("budget") || "");
    setState("sending");
    try {
      const { error } = await supabase.functions.invoke("notify-demo-request", {
        body: { name: company || email, email, company, message: `Comparison page: Beta Ads vs ${vs}. Type: ${type}. Budget: ${budget}.` },
      });
      if (error) throw error;
      const payload = { path: "/compare", vs, type, budget };
      track("compare_form_submit", payload);
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", "compare_form_submit", payload);
      setState("sent");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="rounded-[24px] bg-white text-[#0F1012] p-7 md:p-9">
        <p className="text-2xl font-bold tracking-tight m-0">Thanks. Andreas will reply within one working day.</p>
        <p className="mt-3 mb-6 text-[15px] text-[#4B5059]">Want to talk sooner? Pick a time that suits you.</p>
        <a href={BOOKING_URL} data-cta="book" target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-11 px-6 rounded-full bg-[#0F1012] text-white text-sm font-semibold">Book a call</a>
      </div>
    );
  }

  const field = "mt-1.5 w-full h-12 rounded-[10px] bg-[#F2F2F1] px-4 text-[15px] text-[#0F1012] placeholder:text-[#868B94] outline-none focus:ring-2 focus:ring-[#0F1012]/20";
  return (
    <form onSubmit={onSubmit} className="rounded-[24px] bg-white text-[#0F1012] p-7 md:p-9 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
      <p className="text-[1.7rem] leading-tight font-bold tracking-tight m-0">Get a free campaign plan</p>
      <p className="mt-2 mb-6 text-[15px] text-[#4B5059]">Streamers, views and price for your market, in one working day.</p>
      <label className="block text-sm font-medium">Work email *
        <input name="email" type="email" required placeholder="you@company.com" className={field} />
      </label>
      <label className="block mt-4 text-sm font-medium">Company
        <input name="company" type="text" placeholder="Company name" className={field} />
      </label>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="block text-sm font-medium">You are *
          <select name="type" required defaultValue="" className={field}>
            <option value="" disabled>Choose</option>
            <option>Brand</option><option>Media agency</option><option>Other</option>
          </select>
        </label>
        <label className="block text-sm font-medium">Budget
          <select name="budget" defaultValue="" className={field}>
            <option value="" disabled>Choose</option>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </label>
      </div>
      <button type="submit" disabled={state === "sending"} className="mt-6 inline-flex items-center h-12 px-7 rounded-full bg-[#0F1012] text-white text-[15px] font-semibold disabled:opacity-60">
        {state === "sending" ? "Sending..." : "Get my plan"}
      </button>
      {state === "error" && <p className="mt-3 mb-0 text-sm text-[#E23A3C]">Something went wrong. Email sales@beta-ads.no instead.</p>}
    </form>
  );
};

const Compare: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const c = competitors.find((x) => x.slug === slug);
  if (!c) return <Navigate to="/compare" replace />;

  const route = competitorRoute(c.slug);
  const others = competitors.filter((x) => x.slug !== c.slug);
  const Name = c.name.charAt(0).toUpperCase() + c.name.slice(1);
  const yesCount = (sc: Competitor["score"]) => Object.values(sc).filter(([m]) => m === "yes").length;

  return (
    <>
      <SEO
        title={c.title}
        description={c.description}
        canonical={route}
        jsonLd={[
          { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
          { "@context": "https://schema.org", "@type": "WebPage", name: `Beta Ads vs ${c.name}`, url: `https://beta-ads.no${route}`, dateModified: c.checked, about: { "@id": "https://beta-ads.no/#organization" }, isPartOf: { "@id": "https://beta-ads.no/#website" } },
        ]}
      />

      <div className="min-h-screen bg-background text-foreground pt-20 md:pt-24">
        {/* Hero: headline left, form right (Lefty pattern) */}
        <div className="px-3 sm:px-4">
          <section className="max-w-[1400px] mx-auto rounded-[28px] bg-[#0B0B0C] text-white dark:ring-1 dark:ring-white/10 overflow-hidden">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center px-6 sm:px-10 lg:px-16 py-14 md:py-20">
              <div>
                <div className="flex items-center gap-3 mb-8" aria-hidden>
                  <LogoTile size="sm" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">vs</span>
                  <LogoTile c={c} size="sm" />
                </div>
                <h1 className="text-[2.7rem] leading-[1.02] sm:text-6xl lg:text-[4.6rem] font-bold tracking-[-0.035em] m-0">
                  Beta Ads <span className="font-light text-white/55">vs {c.name}</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{c.summary}</p>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
                  <span>Undelivered views refunded</span>
                  <span>From 100,000 NOK</span>
                  <span>Nordic streamers</span>
                </div>
              </div>
              <LeadForm vs={c.name} />
            </div>
          </section>
        </div>

        {/* Client logos */}
        <section className={`${W} py-12 md:py-14`}>
          <p className="text-sm text-muted-foreground m-0">Brands that run campaigns with Beta Ads</p>
          <ul className="mt-6 m-0 p-0 list-none flex flex-wrap items-center gap-x-12 gap-y-6">
            {CLIENT_LOGOS.map(([f, alt, h]) => (
              <li key={f}><img src={`/lovable-uploads/logo-${f}.png`} alt={alt} style={{ height: h }} className="w-auto brightness-0 opacity-70 dark:invert" loading="lazy" /></li>
            ))}
          </ul>
        </section>

        {/* Scorecard (Creator.co pattern) */}
        <section id="scorecard" className="scroll-mt-24 border-t border-border py-16 md:py-20">
          <div className={W}>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-3xl md:text-[2.6rem] leading-[1.08] font-bold tracking-tight m-0 max-w-2xl">
                The comparison <span className="hl">at a glance</span>
              </h2>
              <p className="m-0 text-sm text-muted-foreground">Checked {fmtDate(c.checked)}. Sources at the bottom.</p>
            </div>

            {/* Phones: topic on its own line, then the two answers side by side; the
                logo row sticks under the nav so you always know which column is which. */}
            <div className="mt-10 rounded-[22px] border border-border bg-card md:overflow-hidden">
              <div className="sticky top-[58px] z-10 md:static grid grid-cols-2 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-4 px-4 sm:px-7 py-4 md:py-5 border-b border-border bg-card md:bg-muted/40 rounded-t-[22px]">
                <span className="hidden md:block text-sm font-medium text-muted-foreground">What you get</span>
                <span className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <LogoTile size="sm" />
                  <span className="text-xs text-muted-foreground">{yesCount(BETA_SCORE)} of {CAPS.length}</span>
                </span>
                <span className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <LogoTile c={c} size="sm" />
                  <span className="text-xs text-muted-foreground">{yesCount(c.score)} of {CAPS.length}</span>
                </span>
              </div>
              {CAPS.map(([key, label]) => {
                const [bm, bn] = BETA_SCORE[key];
                const [tm, tn] = c.score[key];
                return (
                  <div key={key} className="grid grid-cols-2 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-4 gap-y-3 px-4 sm:px-7 py-4 border-b border-border last:border-b-0 items-start">
                    <span className="col-span-2 md:col-span-1 text-[15px] font-semibold md:font-medium md:pt-0.5">{label}</span>
                    <span>
                      <MarkIcon m={bm} />
                      {bn && <span className="block mt-1 text-[13px] leading-snug text-muted-foreground">{bn}</span>}
                    </span>
                    <span>
                      <MarkIcon m={tm} />
                      {tn && <span className="block mt-1 text-[13px] leading-snug text-muted-foreground">{tn}</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* With them / with us, per topic (Lefty "upgrade" pattern) */}
        <section className="border-t border-border py-16 md:py-20">
          <div className={W}>
            <h2 className="text-3xl md:text-[2.6rem] leading-[1.08] font-bold tracking-tight m-0 max-w-3xl">
              What changes <span className="hl">when you switch</span>
            </h2>
            <div className="mt-10 grid gap-3">
              {c.rows.map(([topic, beta, them]) => (
                <div key={topic} className="grid md:grid-cols-[13rem_minmax(0,1fr)_minmax(0,1fr)] rounded-[18px] border border-border overflow-hidden">
                  <div className="px-5 md:px-6 pt-5 md:py-6 text-[15px] font-semibold">{topic}</div>
                  <div className="px-5 md:px-6 py-3 md:py-6 md:border-l border-border">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">With {c.name}</div>
                    <p className="mt-2 mb-0 text-[15px] leading-relaxed text-muted-foreground">{them}</p>
                  </div>
                  <div className="px-5 md:px-6 pb-5 pt-4 md:py-6 bg-[#0B0B0C] text-white">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">With Beta Ads</div>
                    <p className="mt-2 mb-0 text-[15px] leading-relaxed">{beta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Honest part + who they are */}
        <section className="border-t border-border py-16 md:py-20">
          <div className={`${W} grid lg:grid-cols-2 gap-12 lg:gap-16`}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight m-0">When {c.name} <span className="hl">is the better fit</span></h2>
              <p className="mt-3 mb-0 text-muted-foreground">We would rather tell you now than after a campaign.</p>
              <div className="mt-6 border-t border-border">
                {c.theyFit.map(([t, d]) => (
                  <div key={t} className="border-b border-border py-5">
                    <h3 className="m-0 text-lg font-semibold tracking-tight">{t}</h3>
                    <p className="mt-1.5 mb-0 text-[15px] leading-relaxed text-muted-foreground">{d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 content-start">
              {[
                { label: "Beta Ads", tile: <LogoTile size="sm" />, p: BETA_PROFILE },
                { label: Name, tile: <LogoTile c={c} size="sm" />, p: { hq: c.hq, founded: c.founded, focus: c.focus } },
              ].map((x) => (
                <div key={x.label} className="rounded-[18px] border border-border bg-card p-5">
                  {x.tile}
                  <div className="mt-4 text-lg font-bold tracking-tight">{x.label}</div>
                  <dl className="mt-3 m-0 space-y-3 text-[14px]">
                    {([["Based in", x.p.hq], ["Founded", x.p.founded], ["Market focus", x.p.focus]] as [string, string][]).map(([k, v]) => (
                      <div key={k}><dt className="text-muted-foreground">{k}</dt><dd className="m-0">{v}</dd></div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cases */}
        <section className="border-t border-border py-16 md:py-20">
          <div className={W}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl md:text-[2.6rem] leading-[1.08] font-bold tracking-tight m-0">Campaigns <span className="hl">we have run</span></h2>
              <Link to="/case-studies" className="text-sm font-semibold hover:underline underline-offset-4">All case studies</Link>
            </div>
            <div className="mt-10 grid md:grid-cols-3 gap-4">
              {CASES.map((k) => (
                <Link key={k.to} to={k.to} className="group rounded-[18px] border border-border overflow-hidden bg-card">
                  <div className="aspect-video overflow-hidden bg-muted"><img src={k.img} alt={`${k.b} campaign`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" loading="lazy" /></div>
                  <div className="p-5">
                    <div className="text-lg font-bold tracking-tight">{k.b}</div>
                    <p className="mt-1 mb-0 text-[15px] text-muted-foreground leading-relaxed">{k.t}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border py-16 md:py-20">
          <div className={`${W} grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16`}>
            <h2 className="text-3xl md:text-[2.4rem] leading-[1.1] font-bold tracking-tight m-0">Questions <span className="hl">buyers ask</span></h2>
            <div className="border-t border-border">
              {c.faqs.map((f) => (
                <details key={f.q} className="group border-b border-border py-5">
                  <summary className="cursor-pointer list-none flex justify-between gap-6 text-[17px] font-semibold tracking-tight">
                    {f.q}
                    <span className="text-muted-foreground group-open:rotate-45 transition-transform" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 mb-0 text-[15px] leading-relaxed text-muted-foreground max-w-2xl">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="px-3 sm:px-4 pb-6">
          <section className="max-w-[1400px] mx-auto rounded-[28px] bg-[#0B0B0C] text-white dark:ring-1 dark:ring-white/10 px-6 sm:px-10 lg:px-16 py-14 md:py-16 grid md:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <p className="text-3xl md:text-5xl font-bold tracking-[-0.03em] m-0 max-w-2xl">Weighing {c.name} against us? <span className="font-light text-white/55">Ask us anything.</span></p>
              <p className="mt-4 mb-0 text-white/70 max-w-xl">A 30 minute call with Andreas. Bring your budget and market, and we will tell you straight if {c.name} fits you better.</p>
            </div>
            <a href={BOOKING_URL} data-cta="book" target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-12 px-7 rounded-full bg-white text-[#0B0B0C] text-[15px] font-semibold">Book a call</a>
          </section>
        </div>

        {/* Sources + other comparisons */}
        <section className="py-14 md:py-16">
          <div className={`${W} grid lg:grid-cols-2 gap-12 lg:gap-16`}>
            <div>
              <h2 className="text-lg font-semibold tracking-tight m-0">Sources</h2>
              <ol className="mt-4 m-0 pl-5 text-sm text-muted-foreground space-y-2">
                {c.sources.map((s) => (
                  <li key={s.url}><a href={s.url} rel="nofollow noopener" target="_blank" className="underline underline-offset-4 hover:text-foreground">{s.label}</a>, {s.date}</li>
                ))}
              </ol>
              <p className="mt-4 text-xs text-muted-foreground">Something out of date about {c.name}? Email <a href="mailto:sales@beta-ads.no" className="underline underline-offset-4">sales@beta-ads.no</a> and we will correct it.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight m-0">Other comparisons</h2>
              <ul className="mt-4 m-0 p-0 list-none grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[15px]">
                {others.map((o) => (
                  <li key={o.slug}><Link to={competitorRoute(o.slug)} className="inline-flex items-center gap-3 hover:underline underline-offset-4"><LogoTile c={o} size="sm" />vs {o.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Compare;
