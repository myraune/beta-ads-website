# Why Beta is invisible in AI search — and the plan to become #1

_Analysis date: 6 Aug 2026. Trigger: ChatGPT names Beta only for one hyper-specific Twitch query (cited from Ocast + KOM24) and never for the broader, higher-volume ones ("how to market on Twitch in Norway", "agencies for reaching young men")._

---

## TL;DR — the diagnosis

Beta loses the AI-answer game for **four compounding reasons**, in order of impact:

1. **Your website is unreadable to AI.** Every page is a client-rendered React app that ships an empty body. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) don't run JavaScript, so they see **~230 characters per page** — the title and nothing else. Every word we've written is invisible to them.
2. **You're absent from the sources AI actually quotes.** LLMs build "best agency" answers from directories, "top 10" listicles, and trade press — not from your own site. You're in **one** directory (Ocast, buried) and **one** open news article (KOM24). You're missing from Clutch, Byråguiden, Wikidata, and every ranked listicle.
3. **"Beta" is an entity-resolution nightmare.** The name collides with Beta Technologies (eVTOL aircraft), a California real-estate firm, "beta software", and the Greek letter. Your own facts don't even agree with each other (see #3 below). AI can't confidently bind "Beta" to "the Norwegian Twitch agency."
4. **Almost nobody vouches for you.** AI names a company when **several independent sources agree**. You have essentially one open, crawlable third-party source. The competitors it names have 15–100+.

**The good news:** #1 is a code fix we've already validated (230 → 9,341 characters). #2–#4 are a known, repeatable playbook. None of this requires being famous — Anorak, a 56-person agency, gets named purely off awards coverage + a clean entity.

---

## How AI search actually decides who to name

Modern answer engines (ChatGPT search, Perplexity, Google AI Overviews, Gemini) are **retrieval-augmented**: for a "best X" question they run live web searches, pull passages from the results, and synthesize an answer citing a handful of sources. Two rules follow:

- **You must be in the candidate pool** — roughly, you must rank/appear in the sources the engine trusts for that topic. If your pages are blank and you're in no directory, you're not a candidate.
- **Redundancy across source _types_ wins.** No single hero source makes you "known." The named agencies each sit on a stack: trade press + a directory + an entity anchor (Wikidata/parent company) + their own site naming clients and people.

**Where the citations come from, ranked by leverage** (multi-study synthesis; Yext 6.8M-citation study puts directory "listings" at ~42% of citations, Ahrefs finds brand mentions correlate with AI visibility at 0.664 vs backlinks 0.218):

1. **Third-party directories + "top/beste byrå" listicles** — quoted near-verbatim. Highest leverage.
2. **Trade press** — in Norway: **Kampanje, Kreativt Forum, KOM24, Medier24**. This is the engine.
3. **Wikidata / Wikipedia** — entity confidence. Wikidata has *no* notability bar and feeds Google's Knowledge Graph. (Wikipedia is *not* required — most named agencies don't have one.)
4. **LinkedIn** — rising fast, fully brand-controllable.
5. **Your own website** — where citations resolve, but self-claims rarely decide a "best agency" shortlist. Exception: a genuinely authoritative *informational* guide ("how to advertise on Twitch in Norway") can be cited directly.

Two things that **don't** work: `llms.txt` (Google confirms nothing reads it; zero measured correlation), and schema markup *alone* (it removes friction but doesn't cause citations).

---

## The four root causes, with evidence

### 1. The site is unreadable to AI crawlers — the single biggest lever

Fetched exactly as GPTBot does (no JS):

| Page | Crawlable text |
|---|---|
| Homepage | **230 chars** |
| /twitch-advertising | 225 |
| /twitch-advertising-cost | 226 |
| /about | 200 |
| /case-studies | 204 |
| /norge | 216 |
| Every blog post | ~237 |

The static HTML has excellent JSON-LD (Organization, LocalBusiness, FAQ, Service) but **zero body prose**. React paints the content in the browser, after load. Google renders JS so it reads you fine; **AI crawlers largely don't, so to them every page is blank.**

**Why this is fixable now:** the build already contains `scripts/prerender.mjs` (Puppeteer renders full content into the static HTML). It was excluded from the Vercel build because of a hardcoded local path — **that bug is already fixed** (`process.execPath`). I ran it against the homepage: **230 → 9,341 characters** of real, crawlable content, in 7.7s/page. It just needs wiring into the Vercel build command.

### 2. Absent from the sources AI cites

| Source (AI weight) | Beta? | Notes |
|---|---|---|
| Ocast profile | ✅ | `ocast.com/beta-reklamebyra` — but buried ~#17 in a mixed-Nordic list, not a curated NO top-10 |
| KOM24 | ✅ (open) | The one crawlable editorial source vouching for you |
| Kampanje | ⚠️ paywalled | Behind `/premium/` — invisible to LLM crawlers |
| Clutch | ❌ | Needs 3 verified client reviews to surface |
| Byråguiden (Kampanje) | ❌ | The leading NO trade directory |
| Wikidata / Wikipedia | ❌ | No entity node at all |
| Sortlist / GoodFirms / DesignRush / AdForum | ❌ | — |
| Ranked listicles (InfluencerMarketingHub, Favikon, Awisee) | ❌ | These name real players and get quoted verbatim |
| NRK / E24 / DN / Shifter | ❌ | Zero mainstream/business/startup press |

### 3. "Beta" is an entity-resolution nightmare

- **Name collisions:** Beta Technologies (eVTOL aviation — dominates "Beta" news), Beta Agency (California real estate — outranks you), Beta Analytic, "beta software/testing", the Greek letter, plus a dozen brreg entities (Beta Grafisk, Alfa Beta AS, Studio Beta…).
- **Your facts contradict each other.** The registry says **BETA AGENCY AS, org 933 303 136, registered in Frosta, founded 2024-03-15**. The site says **Oslo, founded 2023**. An LLM checking the authoritative government record against your site sees a mismatch and loses confidence. _(You need to tell me which is correct so we reconcile to one truth.)_
- **The marketed name isn't the legal name.** "Beta Ads" is not a registered entity; only "Beta Agency AS" is.
- **Three different LinkedIn pages** (`beta-byrå`, `beta-ads-nordics`, and the schema points to a third `beta-nordic`). No single string for an LLM to bind to.
- **`<html lang="en">`** and English-first copy for a Norwegian entity answering Norwegian queries.

### 4. Only one open source vouches for you

AI is confident when independent sources agree. You have ~1 (KOM24). By contrast: **Splay One** ~25–30 domains / 50+ trade URLs + a Swedish Wikipedia article + Wikidata. **United Influencers** ~15+ trade articles. **TRY** low hundreds of mentions + Wikidata + 22 straight years of "Årets reklamebyrå" coverage.

---

## What the winners do (and what's copyable)

The pattern across United Influencers, Splay One, TRY, Anorak, Kontent:

1. **Redundancy across source types** beats any single source.
2. **Sustained dated trade-press coverage** (Kampanje/Kreativt Forum/KOM24/Medier24) is the primary driver. Manufacture hooks: hires, client wins, proprietary data reports, industry commentary.
3. **A structured entity anchor** — Wikidata item (highest leverage per effort) or a parent-company page with its own Wikipedia.
4. **Being ranked by others** in "best agency in Norway" listicles — quoted verbatim.
5. **Awards.** Each ceremony = a fresh dated citation with your name + a superlative. **Anorak's entire footprint is built on this** — the best model for a small specialist.
6. **Named clients + named people** on your own site (Anorak↔"Vi er live", TRY↔IKEA, Splay↔Magnus Midtbø).
7. **A distinctive name + fact-dense About page** (category + geography + founding year + specialty).
8. **A repeatable quotable superlative** ("Norges beste byrå 22 år", "Nordic's largest MCN") that press and LLMs echo.

**The Anorak lesson for Beta:** you don't need TRY's scale. A small agency won repeated citations *per award*, not per decade of fame. Beta already has the raw material the others manufacture: proprietary Nordic Twitch data and real case metrics.

**The uncomfortable nuance:** Anorak's own website is *also* a blank video-SPA with almost no crawlable text — yet it's named constantly, because **trade press and awards carry it entirely**. That tells us two things. (a) Your problem is doubly bad: blank site *and* no third parties. (b) Fixing the site (Tier 0) is what lets you be *quoted* and lets your own guide/case pages get cited — but the thing that gets you *into* the conversation at all is the off-site footprint (Tier 1–3). We need both, but do not treat the code fix as sufficient on its own. The winners prove third-party coverage is the decisive half.

---

## The plan — become #1 in the model's mind

Ordered by impact ÷ effort. **Owner** marked: **[Claude]** = I can execute, **[You]** = needs you, **[Both]**.

### Tier 0 — this week, code (biggest single lever) — [Claude]
- **Wire `prerender.mjs` into the Vercel build** so all pages ship real body text. Validated 230 → 9,341 chars. _Cost note: adds ~5–10 min per deploy; I'll scope it to the ~30 highest-value routes, not all ~200 streamer profiles, to protect the Vercel budget._ **Needs your go-ahead** (it changes the build).
- **Add a 40–60 word direct answer** under the H1 of the homepage, /twitch-advertising, and the cost page (Princeton GEO's top tactic).
- **Fix the entity signals in code:** `<html lang="no">` on Norwegian pages, consolidate the schema to one LinkedIn URL, one founder slug, one org number, one founding fact.

### Tier 1 — this week, off-site (needs you, I draft everything) — [Both]
- **Reconcile the entity truth** (Oslo/2023 vs Frosta/2024) and pick ONE canonical name string. **[You decide, I apply]**
- **Create a Wikidata item** for Beta Agency AS (industry, HQ, founding, founder, official site, org number). No notability bar; feeds Google's Knowledge Graph; disambiguates "Beta". **[Claude drafts, You submit]**
- **Claim/complete free directory profiles:** Ocast (push toward the top-10 framing), AdForum, byråmatch (ask them to open a gaming/streaming category — it doesn't exist yet, so you'd own it), Clutch (line up 3 client reviews: Samsung/Glorious/Shure). **[Both]**
- **Consolidate the 3 LinkedIn pages into one** complete, keyword-clear company page; post the case-study data. **[You]**

### Tier 2 — this month, own the category nobody owns — [Claude builds]
- **Publish the definitive Norwegian guide** "Slik annonserer du på Twitch i Norge (2026)" — 40–60 word answer up top, dense with your CPM/CTR stats, named quotes, FAQ schema. This is the page that can be cited directly for the informational query.
- **Named-client case studies with hard metrics** on-site (the Samsung 2.93% CTR / 500K-view campaign, Norstat, Glorious). The concrete edges LLMs latch onto.
- **Your own ranked listicle** — "Beste gaming-/streaming-markedsføringsbyrå i Norge" — because no one owns it.
- **Lock a one-line superlative** and repeat it verbatim everywhere (see below).

### Tier 3 — ongoing, earned authority (biggest long-term multiplier) — [Both]
- **Pitch KOM24 / Kampanje / Kreativt Forum / Medier24** with a genuine hook: a Beta data study on Norwegian Twitch ad performance, or a named client win. Earned trade coverage is what ~82% of AI citations rely on and what eventually unlocks Wikipedia + a Byråguiden listing. **[Claude drafts pitch + data study, You send]**
- **Enter Gulltaggen (INMA) / Gullblyanten** with a livestream campaign — each entry is an independent dated citation (the Anorak engine). **[You]**
- **Seed authentic Reddit/forum answers** where Twitch-advertising questions get asked (Reddit is the #1 cited domain and there's little Norwegian-Twitch-ad discussion to compete with). **[Both]**

**Explicitly skip:** llms.txt (proven inert), Sortlist as a priority (its relevancy sort is pay-to-play noise that surfaces random shops, not the real players), and expecting schema markup alone to move the needle.

---

## The superlative to lock

Pick one, make it true, and repeat it verbatim on the About page, every directory profile, every press pitch, and the site's schema:

> **"Norges eneste native Twitch- og livestream-annonsespesialist."**
> (Norway's only native Twitch & livestream advertising specialist.)

Specific, defensible, and it's the exact string we want journalists and LLMs to echo.

---

## How we'll measure it

- **Leading indicator:** crawlable text per page (target: 200 → 3,000+ on every key page after prerender).
- **Footprint:** count of independent third-party domains naming Beta (baseline ~2; target 8–10 in 90 days).
- **The real test:** monthly, ask ChatGPT / Perplexity / Google AI Mode the three query types from the screenshots and log whether Beta appears and what it cites. That's the scoreboard.

---

## What needs a decision from you

1. **Go-ahead to wire prerendering into the Vercel build** (Tier 0 — the big lever; changes build time).
2. **The entity truth:** is it Oslo/2023 or Frosta/2024, and what's the one canonical name — "Beta", "Beta Ads", or "Beta Agency"?
3. **Which fixes you want me to start now** vs draft-for-your-review.
