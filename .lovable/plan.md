

# Make Dashboard Preview Look Like an iPad

## Overview
Style the animated Card component to resemble an iPad — rounded corners, a device bezel/frame, and a home indicator bar at the bottom. This gives the dashboard preview a physical device feel.

## Changes

### 1. `src/components/ui/container-scroll-animation.tsx` — Restyle Card as iPad
- Replace the current card styling with an iPad-like frame:
  - Dark bezel border (thicker, ~12-16px padding simulating the device frame)
  - Larger rounded corners (`rounded-[40px]`) to match iPad hardware
  - A subtle home indicator bar at the bottom (small rounded pill shape)
  - Front-facing camera dot at the top center
  - Background of the bezel in a dark gray/black to simulate the device housing
- Keep the inner content area with overflow-hidden and rounded corners for the screen

### 2. No changes needed to Hero.tsx
- The `LiveDashboard compact` child remains as-is inside the card

