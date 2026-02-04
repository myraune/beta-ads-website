
# Plan: Animated Platform Showcase for For Brands Page

## Overview

Create an animated platform showcase section at the top of the For Brands page, featuring CSS-based mockups inspired by the 8 software screenshots. Each mockup will have subtle animations to demonstrate the platform's capabilities without using static images.

## Screenshot Analysis

| Screen | Key Elements | Animation Concept |
|--------|--------------|-------------------|
| 1. Dashboard | Metrics, bar chart, pie chart, data table | Count-up numbers, bars animating up, pie chart drawing |
| 2. Streamer Explorer | Grid of streamer cards, filters sidebar | Cards fading in sequentially, filter toggles animating |
| 3. Streamer Profile | Avatar, stats, categories, audience charts | Profile expanding, bars filling, donut chart drawing |
| 4. Campaign Start | Logo, CTA button, blurred side panel | Subtle glow pulse on button |
| 5. Campaign Objective | Step wizard, form fields, objective cards | Step indicator progressing, card selection highlight |
| 6. Target Audience | Targeting toggles, view forecast, CPM list | Toggles flipping on, numbers counting up |
| 7. Campaign Format | Format selector icons, video preview | Icon selection animation, preview fading in |
| 8. Campaign Asset | Asset upload, live preview mockup | Upload area pulse, preview sliding in |

## Proposed Section Structure

A horizontal carousel/snap-scroll of 4 primary animated cards (combining related screens):

1. **Agency Dashboard** (screens 1) - Full analytics view
2. **Streamer Explorer** (screens 2, 3) - Discovery + profile peek
3. **Campaign Builder** (screens 4, 5, 6) - Multi-step wizard flow
4. **Format Selection** (screens 7, 8) - Format picker + preview

## Component Architecture

```text
src/
  components/
    sections/
      PlatformShowcase/
        index.tsx                    # Main showcase section
        AnimatedDashboard.tsx        # Dashboard mockup with charts
        AnimatedExplorer.tsx         # Streamer grid mockup
        AnimatedCampaignBuilder.tsx  # Step wizard mockup
        AnimatedFormatPicker.tsx     # Format selection mockup
```

## Animation Specifications

### 1. AnimatedDashboard

- Metric cards with count-up animation (reuse existing `useCountUp` hook)
- Bar chart bars grow from bottom with staggered delays
- Pie/donut chart segments draw using CSS stroke-dasharray animation
- Table rows fade in sequentially

### 2. AnimatedExplorer

- Filter sidebar toggles animate on
- Streamer cards fade in with staggered grid pattern
- Hover effect: card lifts slightly, shows "LIVE" pulse
- Search bar has blinking cursor animation

### 3. AnimatedCampaignBuilder

- Step indicators progress (1 → 2 → 3 with check marks)
- Form fields type-writer effect for placeholder text
- Toggle switches flip on with spring animation
- "Next" button has subtle pulse glow

### 4. AnimatedFormatPicker

- Format icons appear one by one
- Selected format has ring animation
- Preview area fades in with mock stream frame
- Dimension badge slides in from right

## Layout on For Brands Page

Replace or augment the current "Platform Teaser" section with a full-width showcase:

```text
+----------------------------------------------------------+
|                     For Brands (Hero)                     |
+----------------------------------------------------------+
|                                                           |
|  ◀  [Dashboard]  [Explorer]  [Builder]  [Formats]  ▶     |
|                                                           |
|      Large animated preview of selected mockup            |
|      (auto-rotates every 5 seconds, pauses on hover)     |
|                                                           |
+----------------------------------------------------------+
```

## Technical Implementation

### Animation Techniques

1. **CSS Keyframes** - For continuous looping animations (pulse, shimmer, rotation)
2. **Intersection Observer** - Trigger animations when section enters viewport (existing `useScrollAnimation` hook)
3. **CSS Transitions** - For hover states and tab changes
4. **SVG Stroke Animation** - For chart drawing effects

### Performance Considerations

- Use `will-change: transform, opacity` for animated elements
- CSS animations preferred over JavaScript for performance
- Lazy-load complex mockups when section approaches viewport
- Reduce motion for `prefers-reduced-motion` users

## Files to Create/Modify

### New Files

| File | Purpose |
|------|---------|
| `src/components/sections/PlatformShowcase/index.tsx` | Main container with tabs |
| `src/components/sections/PlatformShowcase/AnimatedDashboard.tsx` | Dashboard mockup |
| `src/components/sections/PlatformShowcase/AnimatedExplorer.tsx` | Streamer explorer mockup |
| `src/components/sections/PlatformShowcase/AnimatedCampaignBuilder.tsx` | Campaign wizard mockup |
| `src/components/sections/PlatformShowcase/AnimatedFormatPicker.tsx` | Format picker mockup |

### Modified Files

| File | Changes |
|------|---------|
| `src/pages/CaseStudies.tsx` | Replace current Platform Teaser section with PlatformShowcase component |
| `src/index.css` | Add any new keyframe animations needed |

## Visual Style

- Match existing site aesthetic: dark glass cards, red accent color
- Use existing CSS utilities (`.glass-card`, animation classes)
- Consistent border-radius: `rounded-xl` or `rounded-2xl`
- Subtle shadows: `shadow-xl shadow-black/10`
- Primary color for active states and accents

## Interaction Design

1. **Auto-rotation** - Showcase cycles through 4 screens every 5 seconds
2. **Manual control** - Click tabs to jump to specific screen
3. **Pause on hover** - Rotation pauses when user hovers
4. **Reduced motion** - Respect system preference, show static mockups

## Summary

This creates an engaging, animated showcase that demonstrates the Beta Ads platform capabilities visually, keeping with the site's "product-led, not text-led" design principle. All animations are CSS-based for performance and built using existing hooks and patterns from the codebase.
