

# Plan: Redesign "For Streamers" Page - From Generic to Compelling

## Current Problems

| Issue | Current State | Impact |
|-------|--------------|--------|
| Static hero image | Single dashboard screenshot | Doesn't show the product in action |
| Generic layout | Standard text-left, image-right | Looks like every other SaaS landing page |
| Weak differentiation | No unique visual elements | Nothing memorable, fails to capture attention |
| Missing social proof | Only brand logos | No real streamer testimonials or success stories |
| No product demo | Static screenshots | Doesn't show what streamers actually experience |

## Design Vision

Transform the page into an immersive, product-led experience that shows streamers exactly what they get - with real previews, animated interactions, and a visual journey that mirrors the actual streamer experience.

---

## Section 1: Hero Redesign

**Current**: Generic 40/60 split with static dashboard image  
**New**: Full-width immersive hero with live-style preview

### Changes
- Replace static dashboard screenshot with an animated "streamer dashboard preview" component
- Show the actual Beta Ads widget/overlay appearing on a mock stream
- Add subtle animation showing the flow: stream → ad appears → earnings tick up
- Use the existing GIF assets (`streamer-aienia.gif`, etc.) as background texture

### Visual Concept
```text
+--------------------------------------------------+
|                                                  |
|   "Get sponsored while you stream"               |
|                                                  |
|   [Animated preview: stream with Beta Ads       |
|    widget fading in, showing brand offer,       |
|    earnings counter incrementing]               |
|                                                  |
|   [Easy Apply Button]                            |
|                                                  |
+--------------------------------------------------+
```

---

## Section 2: New "See It In Action" Section

**Replace**: Generic "How it works" numbered cards  
**With**: Interactive visual demo showing the streamer experience

### Elements
1. Mock Twitch stream preview (using existing `LiveStreamPreview` component style)
2. Animated sequence:
   - Stream is live
   - Brand offer appears in dashboard
   - Streamer accepts
   - Ad appears on stream
   - Earnings update

### Technical Approach
- Create a `StreamerExperience` component
- Use Framer Motion for step-by-step animation
- Reuse visual language from `LiveStreamPreview.tsx`

---

## Section 3: Earnings Calculator Improvements

**Current**: Good, but isolated  
**Enhancement**: Add context with streamer success stories

### Changes
- Add 2-3 micro-testimonials next to calculator
- Show example earnings from different streamer tiers
- Add visual comparison: "Streamers like you earn..."

---

## Section 4: New "Your Dashboard" Section

**Purpose**: Show streamers what they actually get access to

### Visual
- Interactive preview of the streamer dashboard
- Tabs: "Your Offers" / "Your Earnings" / "Your Stats"
- Hover states reveal details
- Use existing `streamer-brands-grid.png` and `streamer-dashboard-sponsors.png` assets

---

## Section 5: Trust & Social Proof

**Current**: Only brand logos  
**New**: Streamer-focused social proof

### Elements
- "Streamers we work with" with real streamer avatars/names
- Quick stats: "X streamers active" / "€Y paid out"
- Testimonial quotes (2-3 short ones)

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/sections/StreamerSection.tsx` | Complete redesign |
| `src/components/sections/StreamerHero.tsx` | New - animated hero |
| `src/components/sections/StreamerExperience.tsx` | New - interactive demo |
| `src/components/sections/StreamerDashboardPreview.tsx` | New - dashboard preview |
| `src/components/sections/StreamerSocialProof.tsx` | New - testimonials/stats |

---

## Visual Style Guidelines

- Follow the site's dark, minimal aesthetic
- Use motion purposefully (show product, not decoration)
- Keep text minimal - let visuals explain
- Use existing assets and component patterns
- Maintain the borderless iOS-inspired card system

---

## Technical Summary

```text
New Page Structure:
1. StreamerHero - Full-width animated hero with product preview
2. StreamerExperience - Interactive "how it works" demo
3. EarningsCalculator - Existing + testimonials
4. StreamerDashboardPreview - Dashboard preview with tabs
5. StreamerSocialProof - Streamer testimonials + stats
6. CTA - Keep existing final CTA section
```

### Key Dependencies
- Framer Motion (already installed)
- Existing GIF assets
- Existing LiveDashboard component patterns

