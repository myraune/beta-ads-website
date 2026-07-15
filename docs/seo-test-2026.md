# The honest SEO test — does organic search produce leads for Beta Ads?

**Started:** 2026-07-13 (the day 46 commits finally shipped)
**Review date:** 2026-09-07 (8 weeks)
**Decision it settles:** keep investing in blog/SEO, or kill it and put the effort into outbound.

---

## Why this test exists

The blog has traffic but has never produced a lead, and we couldn't tell *why* because
nothing was measurable. Rather than keep polishing on instinct, we ship and let the data
decide. If it fails, we kill the channel with evidence instead of a hunch.

## Baseline (2026-07-13, before any of this was live)

Search Console, last 7 days:

| Metric | Value |
|---|---|
| Clicks | 25 |
| Impressions | 14,300 |
| CTR | 0.2% |
| Avg position | 7 |

What was actually driving it:

| Query | Impressions | Clicks |
|---|---|---|
| kick annual revenue 2025 estimate | 162 | 0 |
| kick annual revenue 2025 | 158 | 0 |
| kick annual revenue estimate 2025 | 66 | 0 |
| **beta ads** (brand) | 11 | 2 |

Read: ~390 impressions/week are people researching **Kick's revenue** — analysts,
students, journalists. Not buyers. Brand demand is ~11 impressions/week. The earlier
quarterly export showed **~14 buyer-intent clicks per quarter**.

Conversions at baseline: **unknown — zero tracking existed.**

## What shipped 2026-07-13

- `/twitch-advertising-cost` + `/kick-advertising-cost` — the only genuine buyer-intent
  assets on the site (real 200-300 kr blended CPM, sourced direct-buy comparison).
- Funnel: those pages linked from the 3 highest-traffic posts (all 5 languages),
  both platform pages, and the site-wide footer.
- Blog quality pass: 8 new B2B posts, branded heroes everywhere, in-article visuals.
- **Conversion tracking** (`src/components/ConversionTracker.tsx`) — the thing that makes
  this test answerable at all.

## What we measure (NOT impressions)

Impressions are the vanity metric that got us here. Track only:

1. **Vercel Analytics custom events** — `book_demo_click`, `email_click`, with the `path`
   they fired from. This is the conversion.
2. **Search Console** — clicks (not impressions) on the buyer-intent queries below, plus
   impressions/position for the two cost pages (are they even indexed?).
3. **The join** — did any `book_demo_click` originate from `/twitch-advertising-cost`,
   `/kick-advertising-cost`, or a blog post? That is organic actually converting.

### Buyer-intent queries to watch
```
twitch advertising cost / price / pricing
twitch advertising agency
kick advertising cost
livestream advertising agency
streamer sponsorship cost
twitch annonsering pris / kostnad
twitch reklam sverige pris
twitch mainonta hinta
```
Everything with "kick annual revenue / market share / viewership" is **noise** — exclude
it from the read. It will never buy.

## Success criteria @ 2026-09-07

| Outcome | Condition | Action |
|---|---|---|
| **PASS** | ≥2 qualified inbound inquiries attributable to organic search | Keep investing; double down on buyer-intent pages |
| **WEAK** | 1 inquiry, or ≥3 booking clicks from organic pages but no inquiry | Extend 8 weeks, fix conversion not traffic |
| **KILL** | 0 inquiries AND <3 booking clicks from organic landing pages | Stop SEO investment. Blog becomes credibility material only; effort moves to outbound |

### Leading indicator @ 4 weeks (2026-08-10)
Are the two cost pages **indexed and ranking at all** for any buyer-intent query? If they
are not even in the index by week 4, the test is already failing — no amount of content
polish fixes that.

## The honest prior

Beta Ads' real clients (Samsung, Surfshark, Shure, Komplett, NKI) came from pitching, not
search. The Nordic pool of people who could commission livestream advertising is small and
probably doesn't google for it. This test is likely to fail — and that is a useful result,
because it stops the bleeding of effort into a channel that cannot pay it back.
