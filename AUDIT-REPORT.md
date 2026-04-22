# Beta Ads UI/UX Audit Report
**Date:** 2026-04-15 (re-verified same day)  
**Auditor:** Automated weekly UI audit  
**Pages covered:** Samsung case study, Glorious case study, CaseStudies index, Contact, TwitchAdvertising, YouTubeAdvertising, KickAdvertising, Homepage (SPFeatures, SPVideoShowcase, SPUseCases)
**Status:** All issues below confirmed still present — no fixes applied since initial report.

---

## Summary

The overall site is in strong shape. Core design system is consistently applied: `AnimatedShaderBackground` appears in all hero sections, `body::before`/`::after` ambient gradients are defined and running in CSS, scroll animations (`useScrollAnimation`) are in use across all pages, and stat count-up animations are present on the highest-visibility pages. The SPFeatures / SPVideoShowcase / SPUseCases homepage sections are highly interactive and anti-AI-slop.

Two critical issues require immediate attention — both are on `/twitch-advertising` and involve fabricated data and placeholder images that would directly undermine advertiser trust.

---

## Critical Issues

### 1. `TwitchAdvertising.tsx` — Unsplash placeholder images in case study cards
**Severity: CRITICAL**  
**File:** `src/pages/TwitchAdvertising.tsx:273` and `:310`

Two Unsplash stock photos are used as case study card thumbnails in the "Results" section of `/twitch-advertising`:

```tsx
// Line 273 — Samsung card
src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80"

// Line 310 — Glorious card
src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&q=80"
```

These are generic stock photos, not actual campaign footage. This directly violates the `feedback_real_images_mandatory.md` rule: *never deploy proposals with placeholder images*.

**Fix:** Replace with real assets:
- Samsung: Use `https://img.youtube.com/vi/Uw7IIecicB4/maxresdefault.jpg` (already used in CaseStudies index)
- Glorious: Use `https://storage.googleapis.com/livad-blog/3292/3669942.gif` (real campaign GIF)

---

### 2. `TwitchAdvertising.tsx` — Fabricated campaign stats in case study cards
**Severity: CRITICAL**  
**File:** `src/pages/TwitchAdvertising.tsx:287-298` and `:322-334`

The Samsung case study card shows stats that contradict the actual campaign data:

| Field | Card shows | Actual (SamsungCaseStudy.tsx) |
|---|---|---|
| Total views | 412K | 500,131 |
| CTR | 1.41% | 2.93% |
| Chat mentions | 4,291 | Not a primary metric |

The Glorious card also uses wrong numbers:

| Field | Card shows | Actual (GloriousCaseStudy.tsx) |
|---|---|---|
| Total views | 287K | 137K+ |
| CTR | 2.3% | Not reported |
| Streamers | 34 | 25 |

A prospective client clicking from `/twitch-advertising` to the Samsung case study will see inconsistent numbers — credibility damage.

**Fix:** Update both cards to use real data:
```tsx
// Samsung card — replace stats grid (lines 287–298)
<div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
  <div><p className="text-2xl font-bold text-foreground tracking-tight">500K+</p><p className="text-xs text-muted-foreground">Completed views</p></div>
  <div><p className="text-2xl font-bold text-foreground tracking-tight">2.93%</p><p className="text-xs text-muted-foreground">Average CTR</p></div>
  <div><p className="text-2xl font-bold text-foreground tracking-tight">0%</p><p className="text-xs text-muted-foreground">Adblock impact</p></div>
</div>

// Glorious card — replace stats grid (lines 322–334)
<div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
  <div><p className="text-2xl font-bold text-foreground tracking-tight">137K+</p><p className="text-xs text-muted-foreground">Total views</p></div>
  <div><p className="text-2xl font-bold text-foreground tracking-tight">25</p><p className="text-xs text-muted-foreground">Creators</p></div>
  <div><p className="text-2xl font-bold text-foreground tracking-tight">3</p><p className="text-xs text-muted-foreground">Countries</p></div>
</div>
```

---

## Medium Issues

### 3. `CaseStudies.tsx` — Hero has no animated background or glow
**Severity: MEDIUM**  
**File:** `src/pages/CaseStudies.tsx:139`

The CaseStudies index hero is a plain `pt-32 pb-20` on the default background — no `AnimatedShaderBackground`, no radial gradient glow, no depth. Every other major page (Contact, TwitchAdvertising, YouTubeAdvertising, KickAdvertising, individual case studies) has an animated hero. The index page reads like a blog archive page.

```tsx
// Current — no hero background
<section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div ref={heroRef} ...>
```

**Fix:** Wrap the hero section with a dark background and `AnimatedShaderBackground`:
```tsx
<section className="relative overflow-hidden" style={{ background: 'hsl(240 11% 5%)' }}>
  <AnimatedShaderBackground heightFactor={0.7} />
  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-28">
    <div ref={heroRef} className={`max-w-2xl transition-all duration-700 ...`}>
      {/* existing h1 — change text-foreground to text-white */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-white">
```

---

### 4. `GloriousCaseStudy.tsx` — Results stats grid is static, not count-up animated
**Severity: MEDIUM**  
**File:** `src/components/blog/GloriousCaseStudy.tsx:188`

The Samsung case study uses `AnimStat` with count-up animation for all stat cells. The Glorious results section renders static strings in a plain grid. Clicking between the two case studies makes the quality gap noticeable.

```tsx
// Current — static
<div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden bg-border">
  {results.map((s) => (
    <div key={s.label} className="bg-background px-6 py-5">
      <div className="text-2xl font-bold text-foreground tracking-tight">{s.value}</div>
```

**Fix:** Add a `useCountUp` hook and `AnimatedStat` component (see code suggestion #3 below), then replace the static map with animated cells.

---

### 5. `YouTubeAdvertising.tsx` — 2×2 stat grid uses card containers (anti-pattern)
**Severity: MEDIUM**  
**File:** `src/pages/YouTubeAdvertising.tsx:154-165`

The "What it looks like" section displays four audience stats in individual `rounded-xl border border-border bg-card` containers — the exact pattern CLAUDE.md flags as "every stat wrapped in a colored card":

```tsx
{[...].map((stat) => (
  <div key={stat.label} className="p-4 rounded-xl border border-border bg-card">
```

**Fix:** Replace with the borderless stat strip pattern:
```tsx
<div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden border border-border">
  {[...].map((stat) => (
    <div key={stat.label} className="bg-background px-5 py-4">
      <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
    </div>
  ))}
</div>
```

---

### 6. `SPVideoShowcase.tsx` — Stats strip lacks count-up animation
**Severity: MEDIUM**  
**File:** `src/components/sections/SPVideoShowcase.tsx:420-436`

The `AnimCounter` component exists in SPVideoShowcase.tsx (lines 336–377) with count-up logic, but the stats strip below the LiveStreamDemo (lines 420–436) renders inline static text — `{s.value}` without animation. The `AnimCounter` component is defined but unused in the exported section.

**Fix:** Replace static stats strip with `AnimCounter`:
```tsx
// Replace lines 420–436 with:
<div className={`flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10 gap-y-3 mb-12 py-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
  {[
    { value: "500K+", label: "completed views" },
    { value: "2.93%", label: "avg CTR" },
    { value: "14642", label: "link clicks" },
    { value: "43", label: "streamers" },
    { value: "0%", label: "adblock rate" },
  ].map((s) => (
    <AnimCounter key={s.label} value={s.value} label={s.label} />
  ))}
</div>
```

---

## Low Issues

### 7. `Contact.tsx` — Content section missing `border-t border-border`
**Severity: LOW**  
**File:** `src/pages/Contact.tsx:53`

The contact options section directly follows the hero with only `py-20 md:py-28` — no `border-t border-border` separator. CLAUDE.md layout rules require all content sections after the hero to use `border-t border-border`. The page currently has a visual bleed between hero and content.

**Fix:** Add `border-t border-border` to line 53:
```tsx
<section className="py-20 md:py-28 border-t border-border">
```

---

### 8. `Contact.tsx` — Contact cards section has no scroll animation
**Severity: LOW**  
**File:** `src/pages/Contact.tsx:53-122`

The contact option cards section appears immediately without fade-in on scroll. All comparable content sections on other pages use `useScrollAnimation`. Not broken, but inconsistent with the rest of the site's feel.

---

### 9. `GloriousCaseStudy.tsx` — "Campaign Data" section is heading + static image only
**Severity: LOW**  
**File:** `src/components/blog/GloriousCaseStudy.tsx:158-169`

The Campaign Data section is: label → h2 → `<img>`. No scroll animation on the image wrapper, no caption, no annotation callouts pointing to notable data. Reads like a blog screenshot dump next to the more detailed Samsung case study.

**Suggestion:** Add `useScrollAnimation` to the image container and a brief caption calling out the key insight (e.g., "Norway outperformed Finland by 2× in click rate — factored into future market briefs").

---

## Ambient Background & Gradient Audit

| Check | Status |
|---|---|
| `body::before` / `body::after` ambient gradients in `index.css` | PASS — animated with 25s/30s drift, dark mode variant present |
| `AnimatedShaderBackground` on all hero sections | PARTIAL — missing on CaseStudies index hero (issue #3) |
| Per-section radial glow orbs | PASS — CaseStudies Campaign Highlights and In-Depth sections have inline `radial-gradient` glows; SPUseCases has bottom glow |
| No `bg-card / bg-muted / bg-secondary` on section-level wrappers | PASS — all such usage is within card components, not section backgrounds |

---

## Interactive Elements Audit

| Component | Status |
|---|---|
| `useScrollAnimation` hooks | PASS — firing on all content sections |
| Video cards play/pause controls (SPVideoShowcase) | PASS — working with mute/unmute |
| Creator table expand/collapse (SamsungCaseStudy) | PASS |
| Carousel prev/next (CaseStudies, SPUseCases, SPFeatures) | PASS |
| Ad format carousel auto-advance + dots (SPUseCases) | PASS |
| Count-up stat animations | PARTIAL — missing on Glorious results grid and SPVideoShowcase stats strip |
| Streamer filter interactivity (SPFeatures) | PASS — game filter tags toggle with animation |
| Report preview modal with zoom/pan (SPFeatures) | PASS |

---

## Anti-Blog Checklist

| Check | Status |
|---|---|
| No long walls of text without visual break | PASS |
| Stat grids have count-up | PARTIAL — Glorious results and SPVideoShowcase stats strip are static |
| Images/videos are full-width or prominent | PASS |
| Sections alternate text-heavy and visual-heavy | PASS |
| No "heading + paragraph + paragraph" without visual | PARTIAL — Glorious "Campaign Data" section is heading + image only, no annotation |
| Section headers use `font-light tracking-tight` | PASS — consistent across all pages |
| Headings are left-aligned | PASS — SPVideoShowcase uses `text-center` for its header which is acceptable |

---

## Top 3 Most Impactful Improvements (Code Suggestions)

### #1 — Fix TwitchAdvertising case study cards (real images + correct stats)
**Impact:** Directly affects trust of the highest-traffic marketing page. Any advertiser who reads the Samsung case study and then checks `/twitch-advertising` will see inconsistent numbers — credibility damage.

```tsx
// src/pages/TwitchAdvertising.tsx

// ── Samsung card (~line 267) ──
<Link to="/case-study/samsung" className="group rounded-2xl border border-border bg-card overflow-hidden block hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
  <div className="relative aspect-[16/9] overflow-hidden">
    <img
      src="https://img.youtube.com/vi/Uw7IIecicB4/maxresdefault.jpg"
      alt="Samsung Galaxy S25 Ultra Twitch campaign"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    <div className="absolute bottom-4 left-4">
      <span className="text-[10px] font-semibold bg-primary text-white px-2 py-1 rounded-full">Samsung</span>
    </div>
  </div>
  <div className="p-6">
    <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Samsung Galaxy S25 Ultra — Norwegian Launch</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
      Rich media overlays across 43 Norwegian Twitch streamers. 56-day campaign. Zero adblock impact.
    </p>
    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
      <div><p className="text-2xl font-bold text-foreground tracking-tight">500K+</p><p className="text-xs text-muted-foreground">Completed views</p></div>
      <div><p className="text-2xl font-bold text-foreground tracking-tight">2.93%</p><p className="text-xs text-muted-foreground">Average CTR</p></div>
      <div><p className="text-2xl font-bold text-foreground tracking-tight">0%</p><p className="text-xs text-muted-foreground">Adblock impact</p></div>
    </div>
  </div>
</Link>

// ── Glorious card (~line 303) ──
<Link to="/case-study/glorious" className="group rounded-2xl border border-border bg-card overflow-hidden block hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
  <div className="relative aspect-[16/9] overflow-hidden">
    <img
      src="https://storage.googleapis.com/livad-blog/3292/3669942.gif"
      alt="Glorious O3 mouse campaign overlay on Twitch"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    <div className="absolute bottom-4 left-4">
      <span className="text-[10px] font-semibold bg-primary text-white px-2 py-1 rounded-full">Glorious Gaming</span>
    </div>
  </div>
  <div className="p-6">
    <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Glorious O3 Mouse — Nordic Gaming Campaign</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
      Localised overlays across 25 Nordic streamers in Finland, Norway, and Sweden. 112 live stream categories.
    </p>
    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
      <div><p className="text-2xl font-bold text-foreground tracking-tight">137K+</p><p className="text-xs text-muted-foreground">Total views</p></div>
      <div><p className="text-2xl font-bold text-foreground tracking-tight">25</p><p className="text-xs text-muted-foreground">Creators</p></div>
      <div><p className="text-2xl font-bold text-foreground tracking-tight">3</p><p className="text-xs text-muted-foreground">Countries</p></div>
    </div>
  </div>
</Link>
```

---

### #2 — Add AnimatedShaderBackground to CaseStudies hero
**Impact:** The index page is the gateway to all case studies. Currently looks like a blog archive. Adding the dark animated hero immediately signals premium quality.

```tsx
// src/pages/CaseStudies.tsx

// Add import at top:
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";

// Replace hero section (~line 139):
<section className="relative overflow-hidden" style={{ background: 'hsl(240 11% 5%)' }}>
  <AnimatedShaderBackground heightFactor={0.7} />
  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-28">
    <div ref={heroRef} className={`max-w-2xl transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Case Studies</span>
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-white">
        Real results,<br />
        <span style={{ fontFamily: "'Instrument Serif', serif" }} className="italic font-normal">real campaigns</span>
      </h1>
      <p className="text-lg font-light text-white/60 leading-relaxed max-w-lg">
        How Samsung, Glorious, Surfshark, and others reached millions of viewers through native Twitch advertising — with zero adblock impact.
      </p>
    </div>
  </div>
</section>
```

---

### #3 — Add count-up animation to Glorious results grid
**Impact:** When clients read both case studies, the quality gap is immediately visible. Samsung has animated stats; Glorious doesn't. Consistent animation signals professional QA.

```tsx
// src/components/blog/GloriousCaseStudy.tsx — add after imports, before stats array

function useCountUp(target: string, isVisible: boolean) {
  const [display, setDisplay] = React.useState(target);
  React.useEffect(() => {
    if (!isVisible) return;
    const base = target.replace(/\+$/, "");
    const numMatch = base.match(/^([\d,]+)/);
    if (!numMatch) { setDisplay(target); return; }
    const numericTarget = parseInt(numMatch[1].replace(/,/g, ""), 10);
    const suffix = target.includes("+") ? "+" : "";
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(numericTarget * eased);
      setDisplay(current.toLocaleString() + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };
    setDisplay("0" + suffix);
    requestAnimationFrame(tick);
  }, [isVisible, target]);
  return display;
}

const AnimStat: React.FC<{ value: string; label: string; isVisible: boolean }> = ({ value, label, isVisible }) => {
  const display = useCountUp(value, isVisible);
  return (
    <div className="bg-background px-6 py-5">
      <div className="text-2xl font-bold text-foreground tracking-tight tabular-nums">{display}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
};

// Then in the results grid (~line 188), replace the static map:
// Before: <div key={s.label} className="bg-background px-6 py-5"> ...static {s.value}...
// After:
{results.map((s) => (
  <AnimStat key={s.label} value={s.value} label={s.label} isVisible={resultsVisible} />
))}
```

---

*Audit generated: 2026-04-15*
