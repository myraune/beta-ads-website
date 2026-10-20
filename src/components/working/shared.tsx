import React, { useEffect } from "react";
import { Link } from "react-router-dom";

/* Shared building blocks for the /working-with-us subpages (/managed-campaigns,
   /self-serve). Same canvas, type and buttons as src/pages/WorkingWithUs.tsx. */

export const BOOKING_URL = "https://calendar.app.google/coW5NLQJtLxfRer19";
export const SALES_MAIL = "mailto:sales@beta-ads.no";
export const PARTNER_MAIL = "mailto:sales@beta-ads.no?subject=Self-serve%20partner%20access";

export const W = "max-w-[1392px] mx-auto px-4 md:px-6"; // matches the header (.nav__in)
export const kicker = "text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground";
export const h2 = "text-3xl md:text-[2.6rem] leading-[1.08] font-bold tracking-tight m-0";

type Cta = "book" | "email";
const ctaAttrs = (cta: Cta) =>
  cta === "book" ? { "data-cta": cta, target: "_blank", rel: "noopener noreferrer" } : { "data-cta": cta };

export const PrimaryBtn: React.FC<{ href: string; children: React.ReactNode; cta: Cta }> = ({ href, children, cta }) => (
  <a href={href} {...ctaAttrs(cta)}
    className="inline-flex items-center h-11 px-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
    {children}
  </a>
);

export const GhostBtn: React.FC<{ href: string; children: React.ReactNode; cta: Cta }> = ({ href, children, cta }) => (
  <a href={href} {...ctaAttrs(cta)}
    className="inline-flex items-center h-11 px-6 rounded-full border border-border text-foreground text-sm font-semibold hover:border-foreground/40 transition-colors">
    {children}
  </a>
);

export const GhostLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to}
    className="inline-flex items-center h-11 px-6 rounded-full border border-border text-foreground text-sm font-semibold hover:border-foreground/40 transition-colors">
    {children}
  </Link>
);

/** Visible breadcrumb, mirrors the BreadcrumbList JSON-LD. */
export const Crumbs: React.FC<{ current: string }> = ({ current }) => (
  <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-muted-foreground">
    <ol className="m-0 p-0 list-none flex flex-wrap items-center gap-x-2 gap-y-1">
      <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
      <li aria-hidden="true">/</li>
      <li><Link to="/working-with-us" className="hover:text-foreground transition-colors">Working with us</Link></li>
      <li aria-hidden="true">/</li>
      <li aria-current="page" className="text-foreground">{current}</li>
    </ol>
  </nav>
);

export const breadcrumbLd = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://beta-ads.no/" },
    { "@type": "ListItem", position: 2, name: "Working with us", item: "https://beta-ads.no/working-with-us" },
    { "@type": "ListItem", position: 3, name, item: `https://beta-ads.no${path}` },
  ],
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

/** Product panel videos: play only on screen, keep the poster under reduced motion,
    trim the wall clip before its end card (same rules as WorkingWithUs.tsx). */
export function usePanelVideos(rootRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !navigator.webdriver;
    const cleanups: (() => void)[] = [];
    root.querySelectorAll<HTMLVideoElement>(".wwu-panel video").forEach((v) => {
      const end = Number(v.dataset.end);
      if (end) {
        const guard = () => { if (v.currentTime >= end) v.currentTime = 0; };
        v.addEventListener("timeupdate", guard);
        cleanups.push(() => v.removeEventListener("timeupdate", guard));
      }
      if (!motion) { v.pause(); return; }
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { v.preload = "auto"; v.muted = true; v.play().catch(() => {}); } else v.pause();
      }, { rootMargin: "120px" });
      io.observe(v);
      cleanups.push(() => io.disconnect());
    });
    return () => cleanups.forEach((f) => f());
  }, [rootRef]);
}

export const Faq: React.FC<{ title: React.ReactNode; faqs: { q: string; a: string }[] }> = ({ title, faqs }) => (
  <section id="faq" className="scroll-mt-24 border-t border-border py-16 md:py-24">
    <div className={`${W} grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16`}>
      <h2 className="text-3xl md:text-[2.4rem] leading-[1.1] font-bold tracking-tight m-0">{title}</h2>
      <div className="border-t border-border">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-border py-5">
            <summary className="cursor-pointer list-none flex justify-between gap-6 text-[17px] font-semibold tracking-tight">
              {f.q}
              <span className="text-muted-foreground group-open:rotate-45 motion-reduce:transition-none transition-transform" aria-hidden>+</span>
            </summary>
            <p className="mt-3 mb-0 text-[15px] leading-relaxed text-muted-foreground max-w-2xl">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

/** Two-column "what you do / what we do" split. */
export const Split: React.FC<{ you: string[]; us: string[]; youLabel?: string; usLabel?: string }> = ({ you, us, youLabel = "You", usLabel = "Beta Ads" }) => (
  <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-4 md:gap-5">
    <div className="rounded-[8px] border border-border p-7 md:p-8">
      <div className="flex items-baseline justify-between">
        <span className="text-lg font-semibold tracking-tight">{youLabel}</span>
        <span className="text-sm tabular-nums text-muted-foreground">{you.length} things</span>
      </div>
      <ul className="mt-5 m-0 p-0 list-none">
        {you.map((t) => (
          <li key={t} className="border-t border-border py-3 text-[15px] leading-relaxed">{t}</li>
        ))}
      </ul>
    </div>
    <div className="rounded-[20px] bg-foreground text-background p-7 md:p-8 dark:bg-white/[0.05] dark:text-foreground dark:ring-1 dark:ring-white/10">
      <div className="flex items-baseline justify-between">
        <span className="text-lg font-semibold tracking-tight">{usLabel}</span>
        <span className="text-sm tabular-nums opacity-60">{us.length} things</span>
      </div>
      <ul className={`mt-5 m-0 p-0 list-none ${us.length > 6 ? "sm:columns-2 sm:gap-10" : ""}`}>
        {us.map((t) => (
          <li key={t} className="break-inside-avoid border-t py-3 text-[15px] leading-relaxed" style={{ borderColor: "color-mix(in srgb, currentColor 16%, transparent)" }}>{t}</li>
        ))}
      </ul>
    </div>
  </div>
);
