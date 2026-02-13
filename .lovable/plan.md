

# Beta Ads Website Enhancement Plan

This plan focuses on the genuine gaps between the current site and B2B conversion best practices. Many items from the uploaded analysis are already implemented (case studies, blog, client logos, multi-page architecture, structured data). This plan targets what is actually missing and high-impact.

---

## Phase 1: Navbar and Header CTAs

**Problem:** The navbar has no conversion button. Visitors must scroll to find a CTA.

**Changes to `src/components/Navbar.tsx`:**
- Add a "Book a Demo" primary button (links to `/demo`) on the right side of the desktop nav pill
- Add a "Book a Call" secondary ghost button (links to the Google Calendar URL)
- On mobile, add both CTAs below the nav links in the hamburger menu
- Keep the theme toggle but move it before the CTA buttons

---

## Phase 2: Hero Headline with Animated Word Rotation

**Problem:** The current hero headline is static. An animated word rotation communicates multiple pain points simultaneously.

**Changes to `src/components/sections/Hero.tsx`:**
- Replace the static headline with a rotating word pattern:
  "Your ads shouldn't be [skipped / blocked / ignored / invisible]"
  followed by "They should be part of the stream."
- Implement a fade/slide animation cycling through the words every 2.5 seconds
- Keep the existing Nordic greeting as a subtle element above the headline
- Keep the existing LiveDashboard preview on the right side

---

## Phase 3: Problem-Solution Narrative Section (New Component)

**Problem:** The homepage jumps from hero to client logos without explaining WHY overlay ads matter.

**New file: `src/components/sections/ProblemSolution.tsx`**
- Two-column layout: left side with the problem, right side with the solution
- Problem: "Traditional digital ads don't reach Gen Z. They use adblock. They skip pre-rolls. They ignore banners."
- Solution: "But they spend 4+ hours daily watching livestreams -- and they can't block what's built into the stream."
- Include a mid-section CTA: "See it in action" linking to `/case-studies`

**Update `src/pages/Index.tsx`:**
- Insert ProblemSolution between TrustedBy and HowItWorksSection

---

## Phase 4: Stat Counters Section (New Component)

**Problem:** Key credibility numbers (40+ streamers, millions of impressions) are buried or absent from the homepage.

**New file: `src/components/sections/StatCounters.tsx`**
- Horizontal row of 4 animated counters using the existing `useCountUp` hook:
  - "40+" Nordic streamers
  - "2.5M+" Monthly impressions
  - "2.8%" Average CTR
  - "8" Brand campaigns delivered
- Minimal design: large numbers, small labels, subtle count-up animation on scroll

**Update `src/pages/Index.tsx`:**
- Insert StatCounters after ProblemSolution, before HowItWorksSection

---

## Phase 5: FAQ Accordion on Homepage (New Component)

**Problem:** Common objections go unanswered, forcing visitors to book a call just to get basic answers.

**New file: `src/components/sections/HomepageFAQ.tsx`**
- Uses existing Radix accordion component
- 6 questions addressing top objections:
  1. "How is this different from Twitch's own ads?"
  2. "What's the minimum campaign budget?"
  3. "How do you ensure brand safety?"
  4. "What metrics and reporting do I get?"
  5. "Can I target specific games or audiences?"
  6. "How quickly can a campaign go live?"
- Includes a CTA below: "Still have questions? Book a 15-minute call."

**Update `src/pages/Index.tsx`:**
- Insert HomepageFAQ between CaseStudiesSection and Press

---

## Phase 6: Announcement Marquee Bar (New Component)

**Problem:** No way to highlight time-sensitive news or achievements at the top of the site.

**New file: `src/components/sections/AnnouncementBar.tsx`**
- Thin bar above the navbar with scrolling text
- Default message: "New: Samsung S25 campaign delivered 500K+ impressions with 2.93% CTR"
- Dismissible with an X button (stores preference in sessionStorage)
- Dark background with accent-colored text

**Update `src/components/Layout.tsx`:**
- Add AnnouncementBar above the Navbar

---

## Phase 7: Pricing Page (New Page)

**Problem:** No pricing information anywhere on the site. Visitors have no idea what engagement looks like.

**New file: `src/pages/Pricing.tsx`**
- Two-tier layout:
  - **Managed Service**: "Custom campaigns run by our team" -- feature list + "Book a Demo" CTA (no price shown, "Contact for pricing")
  - **Self-Service** (coming soon): "Launch campaigns yourself" -- feature list + "Join Waitlist" CTA
- Feature comparison table below the cards
- FAQ specific to pricing at the bottom

**Update `src/App.tsx`:**
- Add route: `/pricing` pointing to Pricing page

**Update `src/components/Navbar.tsx`:**
- Add "Pricing" to the navLinks array

---

## Phase 8: Footer Expansion

**Problem:** The current 3-column footer is sparse compared to the depth of the site.

**Update `src/components/sections/Footer.tsx`:**
- Expand to 4 columns:
  - Column 1: Logo + short description + social links (LinkedIn, Discord)
  - Column 2: Product (How It Works, Ad Formats, Pricing, For Streamers)
  - Column 3: Resources (Case Studies, Blog, Press)
  - Column 4: Company (About, Contact, Demo)
- Bottom bar: legal line with org number (already exists), add Privacy Policy and Terms links
- Keep the "Made with kaffe" Nordic touch

---

## Phase 9: SEO Cleanup in index.html

**Problem:** Outdated hreflang tags reference removed languages. Meta description still says "agency."

**Update `index.html`:**
- Remove hreflang tags for no/sv/da/fi (site is English-only now)
- Keep only `hreflang="en"` and `hreflang="x-default"`
- Update meta description: "Native livestream advertising platform" instead of "agency"
- Change `<html lang="no">` to `<html lang="en">`
- Clean up duplicate preconnect tags
- Update structured data: "Organization" description to say "platform" not "agency"

---

## Updated Homepage Section Flow

```text
1. Announcement Bar (dismissible)
2. Navbar (with "Book a Demo" CTA button)
3. Hero (animated word rotation + LiveDashboard preview)
4. TrustedBy (client logo carousel - already exists)
5. Problem-Solution Narrative (NEW)
6. Stat Counters (NEW)
7. How It Works (already exists)
8. Ad Formats Carousel (already exists)
9. Case Studies (already exists)
10. FAQ Accordion (NEW)
11. Press (already exists)
12. Footer (expanded)
```

---

## Technical Details

| File | Action |
|------|--------|
| `src/components/Navbar.tsx` | Add CTA buttons + Pricing nav link |
| `src/components/sections/Hero.tsx` | Add animated word rotation to headline |
| `src/components/sections/ProblemSolution.tsx` | New component |
| `src/components/sections/StatCounters.tsx` | New component |
| `src/components/sections/HomepageFAQ.tsx` | New component |
| `src/components/sections/AnnouncementBar.tsx` | New component |
| `src/components/sections/Footer.tsx` | Expand to 4 columns |
| `src/components/Layout.tsx` | Add AnnouncementBar |
| `src/pages/Index.tsx` | Add new sections to flow |
| `src/pages/Pricing.tsx` | New page |
| `src/App.tsx` | Add /pricing route |
| `index.html` | SEO cleanup: lang, hreflang, meta description, structured data |

All new components follow the existing design system: dark theme tokens, editorial typography with Instrument Serif headings, asymmetric layouts, and scoped hover transitions.

