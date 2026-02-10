

# Redesign "For Streamers" Page -- Discord Community Focus

## Overview

Shift the primary CTA from "Apply now" (streamer portal) to "Join our Discord" across the entire page. The page should position Discord as the starting point for streamers -- where they connect with the community, learn about opportunities, and get onboarded.

## Changes by component

### 1. StreamerHero.tsx
- Change headline from "Brand sponsorships, simplified." to something community-focused like "Join the streamer community."
- Update description to emphasize the Discord community as the first step
- Replace primary CTA button: "Apply now" becomes **"Join our Discord"** linking to `https://discord.gg/tSmM6XMEkn` (opens in new tab)
- Keep "How it works" as secondary link
- Keep platform logos (Twitch, YouTube, Kick)

### 2. StreamerHowItWorks.tsx
- Update step 01 from "Browse offers" to **"Join Discord"** with description about joining the community first
- Keep steps 02-04 largely the same (Accept, Stream, Get Paid)

### 3. StreamerCTA.tsx
- Replace headline: "Ready to start earning?" becomes **"Ready to get started?"**
- Replace description to reference joining the Discord
- Replace primary button: "Apply now" becomes **"Join our Discord"** linking to `https://discord.gg/tSmM6XMEkn`
- Replace "Already a member? Sign in" link to point to the streamer portal instead (secondary action)

### 4. StreamerSection.tsx
No structural changes -- same section order is kept.

### 5. No changes to
- StreamerBrands.tsx (still relevant)
- StreamerWhatYouGet.tsx (still relevant)
- EarningsCalculator.tsx (still relevant)

## Technical details

- All Discord links point to `https://discord.gg/tSmM6XMEkn`
- Links open in new tab with `target="_blank" rel="noopener noreferrer"`
- The streamer portal link (`https://beta.streamer.livad.stream/login`) moves to a secondary/subtle position
- No new components or dependencies needed

