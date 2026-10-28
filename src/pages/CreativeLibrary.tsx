import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BOOKING_URL, W, kicker, h2, PrimaryBtn } from "@/components/working/shared";
import { INDUSTRIES, KIND_LABEL, type Creative, type CreativeKind } from "@/data/creatives";
import { UnlockForm, readToken } from "@/components/LeadUnlock";

/* Creative library: animated overlays Beta Ads has built, filterable by industry
   and type. The FREE_IDS previews play for anyone; the rest are not even sent
   to the browser until a visitor leaves name, work email and company (POST /api/creatives returns a signed token, kept in localStorage,
   sent back as x-creative-token). The API returns the items in library order.
   Items come from the Blob manifest, added through /creative-library/admin. */

const TITLE = "Creative Library: Livestream Overlay Ideas by Industry | Beta Ads";
const DESCRIPTION =
  "Animated overlays for brands on Twitch, YouTube and Kick, sorted by industry: campaigns we ran, concepts made for pitches and partner-network examples.";
type Kind = "all" | CreativeKind;


/** Plays the preview from the start while hovered or focused (muted, mounted only
    then, so the grid loads posters and nothing else). */
const Card: React.FC<{ c: Creative; unlocked: boolean; onOpen: () => void; onStale: (url?: string) => void }> = ({ c, unlocked, onOpen, onStale }) => {
  const [hover, setHover] = useState(false);
  const on = () => setHover(true);
  const off = () => setHover(false);
  return (
  <button type="button" onClick={onOpen} onMouseEnter={on} onMouseLeave={off} onFocus={on} onBlur={off} className="group text-left flex flex-col">
    <span className="relative block aspect-video overflow-hidden rounded-[14px] bg-muted">
      <img src={c.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
      {hover && c.video && <video src={c.video} poster={c.poster} autoPlay muted loop playsInline aria-hidden="true" onError={() => onStale(c.video)} className="absolute inset-0 h-full w-full object-cover" />}
      <span className="absolute left-3 top-3 flex gap-1.5">
        {c.kind !== "client" && <span className="h-6 px-2.5 inline-flex items-center rounded-full bg-black/70 text-white text-[11px] font-semibold">{KIND_LABEL[c.kind]}</span>}
        {c.free && !unlocked && <span className="h-6 px-2.5 inline-flex items-center rounded-full bg-primary text-primary-foreground text-[11px] font-semibold">Free preview</span>}
      </span>
      <span className="absolute right-3 bottom-3 h-7 px-3 inline-flex items-center rounded-full bg-white/90 text-[#0F1012] text-xs font-semibold">
        Play
      </span>
    </span>
    <span className="mt-3 block text-[13px] text-muted-foreground">{c.brand} · {c.industry}</span>
    <span className="mt-0.5 block text-[17px] font-semibold tracking-tight">{c.title}</span>
    {c.description && <span className="mt-1 block text-[14.5px] leading-relaxed text-muted-foreground line-clamp-2">{c.description}</span>}
  </button>
  );
};

/** What a visitor without access sees under the free previews: blurred stand-in
    cards fading into the page, then the sign-up. The locked creatives themselves
    are never sent to the browser, so there is nothing behind the blur to dig out. */
const Gate: React.FC<{ count: number; industry: string; blur: string[]; requested: boolean; onUnlocked: (token: string) => void }> = ({ count, industry, blur, requested, onUnlocked }) => (
  <div className="relative mt-10">
    <div aria-hidden="true" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 pointer-events-none select-none">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className={i >= 4 ? "hidden sm:block" : ""}>
          <div className="aspect-video overflow-hidden rounded-[14px] bg-muted">
            {blur.length > 0 && <img src={blur[(i + 1) % blur.length]} alt="" className={`h-full w-full object-cover blur-2xl scale-125 opacity-70 ${i % 2 ? "-scale-x-125" : ""}`} />}
          </div>
          <div className="mt-3 h-3 w-32 rounded-full bg-muted" />
          <div className="mt-2.5 h-4 w-48 rounded-full bg-muted" />
        </div>
      ))}
    </div>
    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/70 to-background" />
    <div className="absolute inset-x-0 top-[16%] sm:top-[22%] px-0 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-[18px] bg-card border border-border p-6 md:p-8 text-center shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]">
        <div className={`${kicker} mb-3`}>{count} more {industry === "All" ? "ideas" : `in ${industry}`}</div>
        {requested ? (
          <>
            <h2 className="m-0 text-2xl md:text-[1.7rem] font-semibold tracking-tight">Thanks, your request is in.</h2>
            <p className="mt-2 mb-0 text-[15px] text-muted-foreground leading-relaxed">
              We review every request by hand. You'll get an email from us when your access is approved, and the whole library then opens on
              this page.
            </p>
          </>
        ) : (
          <>
            <h2 className="m-0 text-2xl md:text-[1.7rem] font-semibold tracking-tight">Request access to the rest of the creative ideas.</h2>
            <p className="mt-2 mb-6 text-[15px] text-muted-foreground leading-relaxed">
              Leave your name, work email and company. We review every request by hand and email you when the library is open for you. We use
              your details to follow up about Beta Ads, and you can opt out at any time.
            </p>
            <UnlockForm id="cl-gate" source="creative-library" cta="Request access" onUnlocked={onUnlocked} />
          </>
        )}
      </div>
    </div>
  </div>
);

const CreativeLibrary: React.FC = () => {
  const [items, setItems] = useState<Creative[] | null>(null);
  const [locked, setLocked] = useState<Pick<Creative, "industry" | "kind">[]>([]);
  const [token, setToken] = useState(readToken);
  const [unlocked, setUnlocked] = useState(false);
  const [requested, setRequested] = useState(false);
  const [industry, setIndustry] = useState<string>("All");
  const [kind, setKind] = useState<Kind>("all");
  const [open, setOpen] = useState<Creative | null>(null);

  // A video swapped in the admin gets a new URL and the old file is deleted, so a
  // page left open can hold a dead link: on a load error, fetch the list again.
  // Once per URL, so a file that is broken for real cannot loop.
  const [fetched, setFetched] = useState(0);
  const retried = useRef(new Set<string>());
  const refetch = (url?: string) => {
    if (!url || retried.current.has(url)) return;
    retried.current.add(url);
    setFetched((n) => n + 1);
  };

  useEffect(() => {
    let live = true;
    fetch("/api/creatives", { headers: token ? { "x-creative-token": token } : {} })
      .then((r) => r.json())
      .then((d) => { if (live) { setItems(d.items || []); setLocked(d.locked || []); setUnlocked(Boolean(d.unlocked)); setRequested(Boolean(d.requested)); } })
      .catch(() => live && setItems([]));
    return () => { live = false; };
  }, [token, fetched]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    [...(items || []), ...locked].forEach((c) => m.set(c.industry, (m.get(c.industry) || 0) + 1));
    return m;
  }, [items, locked]);

  const match = (c: Pick<Creative, "industry" | "kind">) => (industry === "All" || c.industry === industry) && (kind === "all" || c.kind === kind);
  const shown = (items || []).filter(match);
  const hidden = locked.filter(match).length;
  const current = open && items?.find((c) => c.id === open.id);

  return (
    <>
      <SEO title={TITLE} description={DESCRIPTION} canonical="/creative-library" />
      <div className="min-h-screen bg-background text-foreground">
        <header className={`${W} pt-28 md:pt-36 pb-10 md:pb-14`}>
          <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-muted-foreground">
            <ol className="m-0 p-0 list-none flex items-center gap-2">
              <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">Creative library</li>
            </ol>
          </nav>
          <div className={`${kicker} mb-5`}>Creative library</div>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end">
            <div>
              <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem] font-bold tracking-[-0.03em] max-w-4xl m-0">
                Overlay ideas, sorted by industry.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Animated overlays for brands on Twitch, YouTube and Kick: campaigns we ran, concepts we made for a pitch, and examples from our partner network.
                Pick your industry and see what an ad inside a live stream can look like.
              </p>
            </div>
            <div className="lg:pb-2"><PrimaryBtn href={BOOKING_URL} cta="book">Book a demo</PrimaryBtn></div>
          </div>
        </header>

        <section className={`${W} pb-20 md:pb-28`} aria-label="Creatives">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-5">
            <div role="tablist" aria-label="Industry" className="flex flex-wrap gap-2">
              {["All", ...INDUSTRIES.filter((i) => counts.has(i))].map((i) => (
                <button key={i} type="button" role="tab" aria-selected={industry === i} onClick={() => setIndustry(i)}
                  className={`h-9 px-4 rounded-full border text-sm font-medium transition-colors ${industry === i ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
                  {i}{i !== "All" && <span className="ml-1.5 opacity-60">{counts.get(i)}</span>}
                </button>
              ))}
            </div>
            <div role="radiogroup" aria-label="Type" className="inline-flex self-start p-1 rounded-full border border-border bg-card text-sm font-semibold">
              {([["all", "All"], ["client", "Campaigns"], ["concept", "Concepts"], ["network", "Partners"]] as [Kind, string][]).filter(([v]) => v === "all" || [...(items || []), ...locked].some((c) => c.kind === v)).map(([v, l]) => (
                <button key={v} type="button" role="radio" aria-checked={kind === v} onClick={() => setKind(v)}
                  className={`h-8 px-3.5 sm:px-4 rounded-full whitespace-nowrap transition-colors ${kind === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{l}</button>
              ))}
            </div>
          </div>

          {items === null ? (
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10" aria-hidden="true">
              {Array.from({ length: 6 }, (_, i) => <div key={i} className="aspect-video rounded-[14px] bg-muted animate-pulse" />)}
            </div>
          ) : shown.length === 0 && !hidden ? (
            <div className="mt-10 rounded-[18px] bg-card border border-border p-8 md:p-10">
              <h2 className={`${h2} !text-2xl`}>{items.length ? "Nothing here for that filter yet." : "The library is being filled right now."}</h2>
              <p className="mt-3 mb-6 text-muted-foreground max-w-xl">In a 30 minute demo we show the overlays we would build for your brand and your market.</p>
              <PrimaryBtn href={BOOKING_URL} cta="book">Book a demo</PrimaryBtn>
            </div>
          ) : (
            <>
              {shown.length > 0 && (
                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                  {shown.map((c) => (
                    <Card key={c.id} c={c} unlocked={unlocked} onOpen={() => setOpen(c)} onStale={refetch} />
                  ))}
                </div>
              )}
              {hidden > 0 && <Gate count={hidden} industry={industry} blur={items.map((c) => c.poster)} requested={requested} onUnlocked={setToken} />}
            </>
          )}
          <p className="mt-10 mb-0 text-xs text-muted-foreground">
            Concepts are spec work made for a pitch, not campaigns the brand ran. Partner network examples ran on the platform we use, in other
            markets, and were made by our partner, not by Beta Ads. Brand names and logos belong to their owners.
          </p>
        </section>
      </div>

      <Dialog open={Boolean(open)} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden gap-0 focus:outline-none focus-visible:outline-none">
          {current && (
            <>
              <div className="aspect-video bg-black">
                {current.video ? (
                  <video key={current.video} src={current.video} poster={current.poster} autoPlay muted loop playsInline controls onError={() => refetch(current.video)} className="h-full w-full object-contain" />
                ) : (
                  <img src={current.poster} alt="" className="h-full w-full object-cover opacity-60" />
                )}
              </div>
              <div className="p-6 md:p-7">
                <div className="text-[13px] text-muted-foreground">
                  {current.brand} · {current.industry}{` · ${KIND_LABEL[current.kind]}`}{current.format ? ` · ${current.format}` : ""}
                </div>
                <DialogTitle className="mt-1 text-2xl font-semibold tracking-tight">{current.title}</DialogTitle>
                <DialogDescription className="mt-2 text-[15px] leading-relaxed">
                  {current.description || "An animated overlay that plays inside the stream, in one corner."}
                </DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreativeLibrary;
