# Blog Post Rewrite Brief — For Background Agents

You are rewriting weak blog posts in `src/data/blogPosts.ts` to match the quality bar set by `clipping-economy-brand-marketing-guide-2026` in the same file.

## The reference post

Read `src/data/blogPosts.ts` and find the entry with `slug: "clipping-economy-brand-marketing-guide-2026"`. Study its `content` field. Note:

- **1,582 words**, **8 H2 sections**, **4 H3 sub-sections**
- **26 external citation links** (Variety, Forbes, Business Insider, Digiday, named platforms)
- **Specific named examples** with numbers: Netflix's 41.3M-view campaign at $0.65 CPM, MrBeast's $10K Salesforce Vyro campaign, bbno$'s 190M views on $9K budget, Cluely's 700 clippers, etc.
- **A comparison table** (Key Clipping Platforms)
- **Bold pull-out numbers** for key stats
- **Direct quotes with attribution** (Brett Malinowski, Nikita Bier)
- **A natural Beta Ads tie-in paragraph** (not a hard sell) — "Why This Connects to the Broader Streaming Ad Story"
- **An actionable closing section** — "How to Evaluate Clipping for Your Brand"
- **A Sources footer** with cited links

## What each rewritten post must have

| Requirement | Minimum threshold |
|---|---|
| Word count | 1,000+ words (aim for 1,200–1,600) |
| H2 sections | 6+ |
| External citation links | 8+ unique domains linked |
| Specific named examples | 3+ named companies/streamers/campaigns with real numbers |
| Tables | 1+ comparison or reference table where useful |
| Beta Ads tie-in paragraph | 1 paragraph connecting the topic to Beta Ads' platform, without pricing claims |
| Actionable closing | "How to evaluate / When to use / Checklist" block |
| Sources footer | Separator `---` then `*Sources: [Name](URL) · [Name](URL) · ...*` |
| Opening | Specific hook/claim, not definition or throat-clearing |

## Hard constraints — DO NOT VIOLATE

1. **NO Beta Ads-specific pricing.** No €, $ or NOK figures attached to Beta Ads campaigns. No CPM bands presented as Beta Ads rates. No "typical campaign size" figures. Industry data with source citations is fine; Beta Ads pricing is not.
2. **NO claims about streamer earnings** of a specific magnitude ("you can earn €X/month").
3. **NO unsourced statistics.** Every "X % of Y" claim must link to a real source (Medietilsynet, SSB, AudienceProject, IAB, GWI, Nielsen, Streams Charts, TwitchTracker, Newzoo, Statista, etc.).
4. **NO emojis in body content** (per CLAUDE.md).
5. **NO hallucinated sources.** Only link to real organisations and real URLs. If unsure, don't cite — remove the claim instead.
6. **PRESERVE the locale of the post.** Norwegian posts stay Norwegian (detected via category: Guider / Innsikt / Strategi). Finnish posts stay Finnish (Oppaat). Swedish posts stay Swedish (slug contains sverige/reklam-sverige).
7. **PRESERVE slug, id, image, hasDashboard field, and the dateISO (UNLESS the slug has a stale year — then update both slug and dateISO and add a 301 redirect in vercel.json).**

## Case studies you can cite (these are REAL Beta Ads deliveries with verified numbers)

- Samsung Galaxy S25 Ultra: 500K+ views, 2.93% CTR, 43 streamers — `/case-study/samsung`
- Samsung Galaxy Z Fold7: 300K+ views, 2.34% CTR, 28 streamers — `/case-study/samsung` (same page)
- Shure MV6: 182,554 views, 1.31% CTR (9.12% peak day), detoo-led, 2 streamers — `/case-study/shure`
- Surfshark VPN: 90,473 views, 1.39% CTR, 552 clicks, 25 streamers — `/case-study/surfshark`
- Saily eSIM: 102,794 views, 1.08% CTR, 518 clicks, 22 streamers — `/case-study/saily`
- Glorious O3 Mouse: 137K+ views across 25 streamers in FI+NO+SE — `/case-study/glorious`
- Gokstad Akademiet: 100K+ views, 1.22% CTR, 22 creators — `/case-study/gokstad`
- Komplett retail: 151,278 views, 1.17% CTR (4.48% peak), 34 streamers (Twitch + Kick) — `/case-study/komplett`
- Høyskolen Kristiania (2 campaigns): 599,252 views combined, 5,997 clicks — `/case-study/kristiania`
- NKI Nettstudier: 220,003 views, 1,595 clicks, 19 streamers — `/case-study/nki`

detoo is Norway's #1 most-watched Twitch streamer per TwitchTracker. He's in the Beta Ads network and was on the Shure campaign.

## Acceptable source domains (non-exhaustive)

**Industry research:** iab.com, newzoo.com, gwi.com, statista.com, nielsen.com, audienceproject.com, globalwebindex.com, sensortower.com, mobygames.com
**Trade press:** variety.com, digiday.com, adweek.com, marketingbrew.com, businessinsider.com, forbes.com, techcrunch.com, bloomberg.com, wsj.com, nyt.com
**Streaming analytics:** twitchtracker.com, streamscharts.com, streamelements.com, sullygnome.com
**Platform announcements:** blog.twitch.tv, youtube-creators.googleblog.com, kick.com/news
**Nordic sources:** medietilsynet.no, ssb.no, scb.se, dst.dk, stat.fi, nrk.no, gamer.no
**Tech journalism:** theverge.com, wired.com, arstechnica.com

## Process — do it exactly like this

1. Open `src/data/blogPosts.ts` and find the post by its slug (from the batch you were assigned).
2. Read the current `content`, `title`, `excerpt`, `category`, `seoTitle`, `seoDescription`, `seoKeywords`.
3. Identify the post's topic and locale.
4. Rewrite the `content` field to meet the requirements above. Write directly in the post's locale (NO/SV/FI/EN).
5. Update `title` only if stale (e.g. "2024" → "2026" when appropriate). If slug changes, update `slug` AND `id`, AND add a 301 redirect to `vercel.json`.
6. Update `excerpt` to reflect the new content (keep it under ~280 chars).
7. Update `seoTitle` and `seoDescription` for the post's locale (and optionally for others if a translation is provided in the content).
8. Bump `date` to today's date and `dateISO` to today's ISO date, but ONLY if the post was significantly restructured. Minor additions preserve original date.
9. Update `relatedSlugs` — always include 3 posts, prioritise posts in the same language when possible.
10. Preserve `readTime` in realistic minutes (content word count / 200, rounded).
11. **DO NOT break the TypeScript syntax.** Every replacement must leave the blogPosts array parseable. Use `content: \`...\`` template literals with escape-free content. If you need a backtick in the content, escape with `\\\``.
12. **RUN the build after your batch:** `npx vite build && node scripts/generate-seo-pages.mjs` — if either fails, you broke something; fix before reporting complete.

## How to make edits

Use Python with `str.replace` or Edit tool with the FULL original block as `old_string`. Do NOT use regex to match across multiple posts — too fragile. Always preview the slug boundaries before editing.

Example Python pattern for precise block replacement:

```python
import re
with open('src/data/blogPosts.ts') as f:
    text = f.read()

# Find the post block by slug, with brace matching
pattern = r'(\{[^{]*?slug: "SLUG_HERE"[\s\S]*?\n  \},?\n)'
match = re.search(pattern, text)
old_block = match.group(1)
new_block = """  {
    id: "...",
    slug: "...",
    title: "...",
    ...
  },
"""
text = text.replace(old_block, new_block)
with open('src/data/blogPosts.ts', 'w') as f:
    f.write(text)
```

## What good looks like

Run `node scripts/audit-blog-quality.mjs` before and after. Your rewrites should score 80+ (the reference is 131).

Your commit message must list:
- Each post you rewrote (slug + before/after word count + before/after citation count)
- Any slug changes with their 301 redirects
- Confirmation that build + generate-seo-pages both pass
