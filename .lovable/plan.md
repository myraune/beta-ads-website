

# Embed Supademo as an Inline Preview

## What changes
Replace the "Try the tour" popup button with an embedded Supademo iframe directly on the For Brands page. The interactive tour will be visible as a product preview, not hidden behind a click.

## Where it goes
The embed will replace the right-side empty space in the hero section (currently just a small muted text on desktop). This keeps the hero visually driven -- text on the left, live product tour on the right.

On mobile, the embed will appear below the headline text.

## Implementation

### File: `src/pages/CaseStudies.tsx`

1. **Remove** the "Try the tour" button (lines 87-93).
2. **Replace** the right-side `<div>` (line 95-97, currently showing small muted text) with a Supademo `<iframe>` embed:

```tsx
<div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/20 bg-card/20">
  <iframe
    src="https://app.supademo.com/embed/cmlk4c3zt00uz5yi3au9mqr61?embed_v=2"
    loading="lazy"
    title="Beta Ads Platform Tour"
    allow="clipboard-write"
    frameBorder="0"
    allowFullScreen
    className="w-full h-full"
  />
</div>
```

3. **Remove** the `hidden lg:flex` class so the embed shows on all screen sizes.
4. **Remove** the Supademo script from `index.html` (no longer needed since we use an iframe embed instead of the JS SDK popup).

### File: `index.html`

Remove the `<script defer src="https://script.supademo.com/supademo.js"></script>` line since the iframe embed does not require the SDK.

## Technical details

| File | Change |
|------|--------|
| `src/pages/CaseStudies.tsx` | Remove button, replace right-side hero content with Supademo iframe embed |
| `index.html` | Remove Supademo SDK script tag |
| `src/pages/CaseStudies.tsx` | Remove `Play` from lucide imports if no longer used elsewhere |

