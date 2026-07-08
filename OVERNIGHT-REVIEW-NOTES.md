# Overnight session — review notes (2026-06-24)

All work is committed **locally on `main`**, nothing pushed. Review with:

```
git log origin/main..HEAD --oneline
git diff origin/main..HEAD            # full diff
```

Push selectively (e.g. up to a chosen commit): `git push origin <sha>:main`, or
`git push` to send everything once you're happy.

---

## Flagged — NOT changed autonomously (need your judgment)

These are deliberate omissions. Each is a content/SEO/marketing-claim decision I
shouldn't make unattended.

### A. Legal pages: index vs noindex  (audit #3)
`/terms` and `/privacy` — decide whether they should be `noindex`. Currently
indexable. Common practice is to keep them indexable (trust signal) OR noindex
(thin content). Either is defensible; it's a call, not a bug. File:
`src/pages/Terms.tsx`, `src/pages/Privacy.tsx` (pass `noindex` to `<SEO>` if you
want them out of the index).

### B. Streamer-count claims  (audit #8)
The network total is split as Twitch 28,000+ / YouTube 8,200+ / Kick 2,800+ =
**~39,000 total** (confirmed in `KickAdvertising.tsx`). I already corrected
`/twitch-advertising` (39,000 -> 28,000) because it framed the cross-platform
total as Twitch-only.

Still using "39,000+" in a Twitch-framed context — your call whether each is
"total network" (fine) or should be scoped down:
- `src/pages/Norge.tsx` — meta description: "...på **39 000+** norske streamere"
  inside a "Twitch-annonsering" page. Is 39k the Norwegian Twitch reach, the
  Norwegian total-network reach, or the whole-Nordic number? Pick one and make
  the copy say it.
- `src/components/sections/SPFeatures.tsx` — "Browse **39,000+** recently active
  streamers" + stat "**39,445** streamers in our database". This one reads as the
  full multi-platform database, which is accurate — likely fine as-is.
- Blog copy elsewhere references "500+ verified streamers" and SPStats.tsx has a
  dead-code "340+" — reconcile the family of numbers (39k database / 28k Twitch /
  500 curated / 340 ?) so they tell one consistent story.

### C. Blog code-split  (audit #6) — LEFT FOR MORNING (do with full build verify)
`BlogPost-*.js` is **1.31 MB** (422 KB gzip) because `BlogPost.tsx` statically
imports the full `src/data/blogPosts.ts` (**11,588 lines, ~102 posts**).

Why I didn't do it overnight: it's a large data-layer refactor across ~100 posts
(bodies full of markdown/backticks/embedded components). A passing build would
NOT prove every post still renders correctly, and I can't visually review 100
posts unattended. `BlogPost` is already route-lazy, so this 1.3 MB never loads on
the homepage or any conversion page — only on `/blog/:slug`, where the content is
already prerendered to static HTML. High effort + real content-integrity risk,
low core-vitals impact.

Suggested safe approach when you do it (verifiable on your machine):
1. Move each post's heavy `content` body into `src/data/posts/<slug>.ts`
   (keep light metadata — title/slug/date/excerpt/image/tags — in the existing
   `blogPostsMeta.ts`, which `Blog.tsx` already uses).
2. In `BlogPost.tsx`, load metadata synchronously and the body via
   `import.meta.glob('../data/posts/*.ts')` keyed on the `:slug` param (Suspense
   fallback while the body chunk loads).
3. `prerender.mjs` `getBlogSlugs()` regex-reads `blogPosts.ts` for `slug:` lines —
   point it at `blogPostsMeta.ts` (or the new posts dir) so slug discovery still
   finds all routes.
4. Run the FULL `npm run build` (it runs Puppeteer prerender over all ~100 blog
   routes) and spot-check a sample of rendered `dist/blog/<slug>/index.html` files
   for intact bodies before pushing.

---

## Round-2 audit flags (deeper pass — case studies, blog, forms, SEO pipeline)

A second multi-agent audit ran after the fixes above. 11 mechanical fixes were
verified and committed (see "What WAS done"). The items below are REAL but were
deliberately NOT changed — they need your judgment.

### D. Dead code — substantial unused-component surface
There's a meaningful amount of unreferenced code. Confirmed-dead (imported
nowhere, unreachable from routes):
- `src/components/sections/NewsletterPopup.tsx` — full bilingual popup, never
  mounted. (I made its a11y fixes anyway, latent.) Wire up or delete.
- `src/components/dashboard/` — the whole 8-file folder (DashboardSidebar/Layout/
  Chart/DataTable/CampaignCard/MetricCard/TopPerformerRow/DashboardHeader) is
  unused. Its `/dashboard` NavLink isn't even a real route. Delete or build out.

Likely-dead legacy section components (a naive "no importer" scan flagged ~20,
e.g. `SPStats.tsx` (the round-1 "340+" dead stat), `Examples.tsx`, `Mechanisms.tsx`,
`HowItWorksSection.tsx`, `ProblemSolution.tsx`, `TrustedBy.tsx`, `ClosingCTA.tsx`,
`AdFormats.tsx`, `SPStreamers.tsx`, `StatCounters.tsx`, `SPGlobalNetwork.tsx`…) —
look like superseded earlier-iteration sections. DON'T bulk-delete on my word: the
scan has false positives (dynamic refs) and the `ui/*` shadcn primitives it also
flagged are intentional scaffolding. Run a real tool before removing:
`npx knip` or `npx ts-prune` gives an accurate unused-export list.

### D2. Verified CLEAN this pass (no action needed)
- **Internal-link integrity**: cross-checked every static + in-content markdown
  link against the route table + all 102 blog slugs. After the 2 dead-link repairs
  above, ZERO dead navigational links remain.
- **Blog image references**: all `/lovable-uploads/*` images embedded in post
  markdown resolve to real files (0 missing).

### E. Data-accuracy claims — need source/client confirmation (do NOT guess)
Each is a real internal contradiction; the *correct* number needs the campaign
data, so I left them. **Surfshark is flagged sensitive in my memory — do not
touch its published numbers without source.**
- **Shure** MV6 vs MV7+ — page title/JSON-LD say MV6, body H1 says MV7+, index
  entries disagree (`CaseStudyShure.tsx`, `ShureCaseStudy.tsx`, `CaseStudies.tsx`,
  and it ripples to footer/features/Norge/blog). Pick the real product.
- **Surfshark** "Verified CTR 1.39%" vs its own 552/90,473 = 0.61%
  (`SurfsharkCaseStudy.tsx`). Which figure is authoritative?
- **Saily** "Verified CTR 1.08%" vs its own 518/102,794 = 0.50% (`SailyCaseStudy.tsx`).
- **Komplett** screen time shown as both "1,261 h" and "19h 40m" on one page
  (`KomplettCaseStudy.tsx`).
- **Samsung S25** "Best day CTR 2.68%" is lower than the page's own 3.34% / 4.20%
  days (`SamsungCaseStudy.tsx`) — likely "best day" = most views, not highest CTR;
  relabel or surface the true peak.

### F. Cross-page consistency — positioning/business decisions
- **Org address**: home + about say Oslo/NO; contact JSON-LD says Chicago/US
  (`Contact.tsx`). Google reads these together — pick the canonical address.
- **Platform count**: homepage/navbar say "4 platforms", About says "3"
  (`AboutUs.tsx`). Depends whether Trovo (slug "#", no page) counts. Also ties
  into the 39k/28k streamer-number question in section B.
- **Call length**: Demo meta says "20-minute demo", body says "15-minute call",
  blog CTAs say "20-minute consultation". Pick one wording across Demo/Contact/
  FAQ/blog CTAs.

### G. Structural bugs — real, but broad blast radius (test before shipping)
- **Dashboard TOC dead anchors** (still open): `TableOfContents.tsx`
  `dashboardTocItems` — verified it's a MIX, not all-dead. Some ids ARE rendered
  (`overview`, `why-analytics`, `peak-viewership`); others are dead
  (`key-metrics`, `top-categories`, `ad-detection-distribution`). Three dashboards
  render ZERO matching ids so their whole "On this page" TOC is dead:
  `TopGamesDashboard.tsx`, `ClipAnalyticsDashboard.tsx`,
  `NorwegianStreamersDashboard.tsx`. Fix = add `id=` to each section, matched to
  its TOC title. Left for you because it needs per-section judgment across ~11
  components + XL-viewport click-through verification (real mis-anchoring risk).
  Note: it's desktop-XL-only (`hidden xl:block`), so low severity.
- **"Case Studies" blog filter tab** — FIXED this session (removed; it matched 0
  posts). See commit "remove dead 'Case Studies' blog filter tab".
- **Duplicate TOC ids**: a post with repeated H3s
  (`affiliate-sponsored-brand-deal-twitch-content-differences-2026`, duplicate
  "### How It Works" / "### For Brands" at blogPosts.ts:5245/5251/5263/5269)
  generates duplicate anchor ids; robust fix = dedupe in `extractTocFromMarkdown`
  + the heading renderers (shared logic, affects every auto-TOC post). React
  also logs a duplicate-key warning, and the 2nd occurrence's TOC link scrolls to
  the wrong section.
- **SPFeatures iframe theme race** (`SPFeatures.tsx` ~599-604): the theme
  postMessage fires immediately when the iframe reports readyState "complete",
  but a freshly-mounted iframe can report "complete" for its initial about:blank
  before the dashboard loads, so the first theme post can miss. Plausible but
  browser-timing-dependent (couldn't repro headlessly). Low-risk fix: also attach
  a load listener and best-effort re-send.
- **Typewriter timer churn** (`typewriter.tsx`): Hero passes an inline array
  literal `text={[...]}` (new identity each render) and the typing effect lists
  it in deps, so Hero's periodic greeting re-render clears/reschedules the
  per-char timer — minor cadence jitter, not a break. Fix = hoist the literal to
  a module const in Hero or memoize. Cosmetic + placement judgment.
- **Dead-code bug (no live impact):** `Examples.tsx` (unused, see section D)
  registers an Embla "select" listener with no cleanup — real defect but the
  component never renders, so it's moot until/unless it's wired up or deleted.
- **Prod vs local prerender mismatch** (SEO): `package.json` build runs the full
  Puppeteer body-prerender (`prerender.mjs`), but **Vercel's `vercel.json`
  buildCommand does NOT** — it runs `generate-seo-pages.mjs` (head/meta injection
  only). So production serves correct per-page meta tags but SPA-shell bodies;
  crawlable body text relies on Google executing the JS. `prerender.mjs`'s own
  comment says it was excluded from Vercel due to a hardcoded NVM path that is
  **now fixed** (uses `process.execPath`), so re-enabling it on Vercel may now be
  viable. Architecture/deploy call — decide the canonical prerender strategy.

### H. Asset bloat — ~42MB of unused files in public/lovable-uploads/
A size sweep found large assets that are **not referenced anywhere** in src,
public, or index.html. They don't slow page loads (never requested) but bloat the
repo + every Vercel deploy. I did NOT delete them (your uploads — the GIFs may be
staged for a future animated-avatar feature). All are git-tracked, so removal is
reversible. If you agree they're dead:

```
git rm public/lovable-uploads/streamer-pernataia.gif \
       public/lovable-uploads/streamer-aienia.gif \
       public/lovable-uploads/streamer-emmelie.gif \
       public/lovable-uploads/press-kampanje-startup.png \
       public/lovable-uploads/press-kom24-twitch.png \
       public/lovable-uploads/press-kom24-partnership.png \
       public/lovable-uploads/twitch-ad-example.png \
       public/lovable-uploads/logo-whop.svg \
       public/lovable-uploads/blog-f1-streaming-crossover-3.jpg \
       public/lovable-uploads/hero-bg-aurora.jpg \
       public/lovable-uploads/streamer-aienia.jpg
```
Notes: the 3 `streamer-*.gif` are 17MB+11MB+5.4MB (the avatars in use are the
`.jpg` versions). `press-kampanje-startup.png` (2.6MB) and `press-kom24-twitch.png`
(1.6MB) are dead duplicates — the shipped refs use the smaller `.jpg`.
`logo-whop.svg` is a 1.5MB HTML page mis-saved as .svg (the code uses
`logo-whop.png`). `twitch-ad-example.png` is also on the screenshot blocklist.
**Verify each is truly unwanted before running** — confirm by re-grepping the
filename across src.

SHIPPED-image WebP conversions — mostly DONE this session (lossless, so
pixel-identical — no quality risk, verified decoding on their live pages):
- DONE: `press-kampanje-expansion` + `-new` on /press (~837KB saved); the 5
  `beta-ads-2-*` platform screenshots on the beta-ads-2-0-platform-launch post
  (~1.24MB saved). Their `.png`/`.jpg` originals are now orphaned (only the dead
  `sections/Press.tsx` still refs the press PNGs) — add these to the `git rm` in
  the cleanup block above:
  `press-kampanje-expansion.png`, `press-kampanje-expansion-new.png`,
  `beta-ads-2-streamer-explorer.png`, `beta-ads-2-dashboard.png`,
  `beta-ads-2-category-explorer.png`, `beta-ads-2-new-campaign.png`,
  `beta-ads-2-streamer-lists.png`.
- LEFT: `campaign-report-preview.jpg` (537KB, homepage SPFeatures) — it's already
  a lossy JPG, so lossless WebP would likely grow it and lossy→lossy WebP risks
  re-compression artifacts I can't eyeball here. Convert with a visual check, or
  leave it.

### I. i18n / SEO / legal / security-hygiene — flagged (need your decision)
From the security/i18n audit. The CTA-language leak (above) was the one safe
auto-fix; these need copy, data-model, SEO, or legal/git decisions.
- **English UI chrome on non-EN posts**: "Back to Blog" (`BlogPost.tsx:194`) and
  "Related Articles" (`BlogPost.tsx:404`) are hardcoded English above/below the
  nb/sv/fi post bodies. Needs no/sv/fi translation strings (copy decision).
- **English date + "min read" on non-EN posts**: `post.date` ("Apr 23, 2026") and
  `post.readTime` ("9 min read") are stored as English display strings
  (`blogPostsMeta.ts`) and rendered verbatim (`BlogPost.tsx:203-204`). Fix =
  localize the copy or move to `dateISO` + numeric minutes formatted via Intl per
  locale. Touches the post data model.
- **Non-EN posts don't cross-link translations (hreflang)**: BlogPost's `<SEO>`
  passes `locale` but no `alternates`, so each Swedish/Finnish/Norwegian guide
  declares itself x-default and the mutually-translated guides never reference each
  other. Real SEO issue; needs the correct alternates cluster mapping (judgment;
  `relatedSlugs` could seed it).
- **SPBrands modals don't trap/restore focus**: now role=dialog+aria-modal (done),
  but focus isn't moved into the modal on open, not trapped, and not restored to
  the trigger on close (only Escape + scroll-lock exist). Needs a focus-trap+
  restore hook (judgment about edge cases). The Case Studies Radix modal already
  does this correctly.
- **`.env` is committed and not gitignored** (`.gitignore` ignores only `*.local`).
  It holds the Supabase anon/publishable key, which is public-by-design + RLS-gated
  (hygiene, not an active leak), but should be remediated: add `.env` to
  `.gitignore`, `git rm --cached .env`, set the value in Vercel env, and confirm
  RLS is enforced. Touches git history → left for you.
- **Privacy policy references a cookie-consent banner that doesn't exist**
  (`Privacy.tsx:227,231-233` say marketing cookies are set "only with your consent"
  via "our cookie consent banner"). No consent-banner component exists in the repo.
  Either build a real banner or amend the published GDPR copy — legal decision.

### J. Performance — flagged (need ratio/layout judgment)
The hero LCP preload + dashboard Chart.js move (above) were the safe auto-fixes.
These need a human call:
- **CLS from ad-overlay videos** — FIXED (next cycle). I probed the creatives with
  the local ffmpeg: both overlay .webm are exactly 450x450 (1:1), and the four
  Samsung banner images were probed with sips (320x320, 850x500, 1600x750,
  1000x1000). Set aspect-square on the videos and intrinsic width/height on the
  banners - verified rendering at true ratios. See the two "perf: ...CLS" commits.
- **VideoPlayer raw-file `<video className="w-full">`** (video-player.tsx ~169)
  shifts modal content on metadata load; the Drive branch already reserves
  aspect-video. Same unknown-ratio caveat; low impact (only inside an opened
  modal).
- **Main index.html Google Fonts stylesheet is render-blocking** (line ~33 now,
  after the preload I added). The right fix (rel=preload as=style + onload swap +
  <noscript> fallback) uses an inline onload handler + JS-disabled path - a
  judgment call, and lower urgency since display=swap already prevents FOIT.
- SKIPPED as negligible: converting the dashboard iframe's font `@import` to a
  `<link>` (render-blocking either way; display=swap already present; lazy
  below-fold iframe). Trivial if you want it.

---

## What WAS done (committed locally, in order — newest first)

Run `git log origin/main..HEAD` for the live list. Highlights this session:

- **perf:** brand-strip logos PNG->WebP (~499 KB saved); RubenGKS homepage avatar
  PNG->96px WebP (~94 KB saved, blog keeps full-res PNG).
- **a11y:** keyboard-operable analytics-dashboard tabs + Clips sidebar (verified
  Enter switches view); file-tree Platform nav keyboard-operable; global
  `prefers-reduced-motion` via `MotionConfig`; FAQ eyebrow contrast fix.
- **correctness:** wrong-domain legal/GDPR email + portal URL (missing hyphen);
  `/twitch-advertising` streamer count scoped to Twitch (28,000+); Analytics
  dashboard iframe theme desync.
- **polish:** input 44px touch target; responsive case-study stat grid; stable
  SEO hreflang effect deps; Norwegian og:image:alt on `/norge`; mobile nav scrolls
  instead of clipping on short viewports; stream-video poster + guarded play().

Round-2 fixes (newest commits):
- **a11y:** labeled the homepage video-modal play/mute buttons; made the
  case-study campaign-video thumbnail keyboard-operable (verified Enter opens the
  modal); Demo form autocomplete; hardened the (unmounted) NewsletterPopup.
- **correctness:** repaired two dead in-article blog links (were redirecting
  readers to /blog); fixed the Fold7 "Top 5 by Completed Views" sort order; one
  post's `readTime` normalized to "N min read"; three blog CTAs switched from
  hardcoded absolute `target=_blank` links to SPA `<Link>`.
- **consistency:** blog OG image + JSON-LD image + related-post cards now honor
  the screenshot blocklist (brand photo instead of suppressed screenshot), like
  the hero already did.

Round-3 work (continuous pass):
- **fix:** removed the dead "Case Studies" blog filter tab (matched 0 posts).
- **perf:** lossless WebP for the 2 /press campaign images (~837KB) and the 5
  Beta Ads 2.0 platform screenshots on beta-ads-2-0-platform-launch (~1.24MB).
  All pixel-identical (lossless), verified decoding on their live pages.
- **verified clean (no fix needed):** internal-link integrity (0 dead nav links,
  0 missing in-content images), no user-facing em dashes, blog category data,
  runtime console (no errors across homepage/case-studies/blog/press).

Round-4 work (code-correctness bug hunt + incidental finds):
- **fix:** VideoPlayer play/pause desync — the homepage video modal had no
  onPlay/onPause/onEnded, so a clip that ended left the button stuck on "Pause"
  (needed two clicks to restart). Element events now drive isPlaying. Verified
  the modal still mounts.
- **fix:** VideoPlayer Google-Drive early-return moved below its 9 hooks (Rules
  of Hooks; latent today but a real ordering footgun).
- **fix:** navbar scroll state now syncs on mount — on a hard reload while
  already scrolled, the nav had been rendering in its transparent hero state
  (white text on light content) until the first scroll.
- **fix:** blog markdown images no longer render a <figure> inside <p> (invalid
  DOM nesting that React flagged via validateDOMNesting and that risks hydration
  mismatches against the prerendered HTML). Found incidentally while console-
  checking. Verified on a fresh dev server: a clean image-heavy post load now
  emits ZERO console errors (the warning is gone).
- **a11y:** the two custom SPBrands modals (homepage campaign-video + campaign-
  report) now expose role="dialog" + aria-modal + aria-label (they already had
  Escape + scroll-lock; the Case Studies modal already had this via Radix).
  Verified on the live homepage modal.
- **verified clean:** console-swept /demo, /case-studies, /blog and a blog post -
  no React warnings beyond the expected dev-only reduced-motion notice; both
  video-modal systems handle Escape + scroll-lock correctly.

Round-5 work (security/i18n/keyboard audit):
- **i18n fix:** blog post CTAs were hardcoded `language="en"`, so the fully
  translated Norwegian/Swedish/Finnish guide posts showed English CTA copy. Now
  use the post's detected locale (StickyCTA already had no/sv/fi translations +
  en fallback). Verified on a Norwegian post: CTA now Norwegian, 0 English markers.
- **a11y fix:** the navbar Product/About dropdown panels stayed keyboard-focusable
  (13 inner links) while visually closed (pointer-events:none doesn't remove from
  tab order). Now `inert` when closed. Verified both panels carry inert.
- **security fix:** BlogPost share `window.open` now uses noopener,noreferrer
  (was leaving a window.opener back-reference - reverse tabnabbing).

Round-6 work (Core Web Vitals / performance audit):
- **perf fix (LCP):** preload the homepage hero background (hero-bg-oslo.jpg) in
  index.html. It's the LCP element but only rendered in the lazy Index chunk, so
  the preload scanner couldn't see it; now it downloads in parallel with the JS
  bundle. Verified in the built HTML.
- **perf fix:** moved render-blocking Chart.js out of the clip-analytics dashboard
  iframe's <head> to end-of-body (order preserved; verified all 9 charts still
  build). Scoped to the lazy below-fold preview, so minor, but a clean fix.
  Iframe ?v bumped to 20.
- **perf fix (CLS):** the Samsung case-study ad-overlay videos (450x450, probed
  with ffmpeg) now use aspect-square; the four banner images (probed with sips)
  got intrinsic width/height. Both reserve correct space up front instead of
  collapsing-then-jumping. Verified rendering at true ratios.

(Delete this file once you've reviewed — it's untracked scratch, not committed.)
