
# Plan: Simplify About Page and Add Footer Link

## Current Problem

The About page is 561 lines of content including:
- 7-milestone timeline (1990s to present)
- Founder story with "focus mode" overlay
- Stats with animated counters
- "On Stream" features (6 items)
- "Off Stream" items (4 items)
- Differentiators section (3 items)
- Brand Safety breakdown
- Scroll progress indicator

This is content overload. For a company website, the About page should be short and credible, not a scrollytelling magazine piece.

---

## Design Approach

Strip it down to the essentials:

| Keep | Remove |
|------|--------|
| Company intro (1 paragraph) | Full timeline |
| What we do (1 sentence) | Founder story essay |
| Founder name + role | Focus mode overlay |
| Contact/CTA | Stats with counters |
| | On/Off stream features |
| | Brand safety breakdown |
| | Scroll progress indicator |

---

## New About Page Structure

```text
+------------------------------------------+
|                                          |
|  About Beta Ads                          |
|                                          |
|  [Short paragraph: who we are]           |
|                                          |
|  [What we do: 1-2 sentences]             |
|                                          |
|  [Founder section: name, role, photo]    |
|                                          |
|  [CTA: Book a call]                      |
|                                          |
+------------------------------------------+
```

### Content Draft

**Heading**: About Beta Ads

**Intro**: Native advertising on Twitch. We work with brands and streamers to create ads that feel like content, not interruption.

**What we do**: We place sponsored overlays inside live streams across the Nordics. Brands get reach. Streamers get paid. Viewers get content that respects their attention.

**Founder**: Andreas Myraune, Founder. (simple, no biography essay)

**CTA**: Single button to book a call.

---

## Footer Change

Add "About" link in the Connect column, linking to `/about`.

Current Connect column:
- LinkedIn
- Discord
- Blog

New Connect column:
- LinkedIn
- Discord
- Blog
- About

---

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/AboutUs.tsx` | Complete rewrite - reduce from 561 lines to ~100 lines |
| `src/components/sections/Footer.tsx` | Add "About" link in Connect column |

---

## Technical Notes

- Remove all scroll animation hooks (7+ currently)
- Remove timeline progress tracking
- Remove focus mode state and overlay
- Remove stats counters
- Keep simple fade-in animation for consistency with other pages
- Match existing page typography (font-extralight headings, tracking-tight)
