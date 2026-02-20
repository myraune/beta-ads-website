
# Replace "How it works" with "Join Discord" on Streamer Hero

## Change

In `src/components/sections/StreamerHero.tsx`, replace the "How it works" scroll button (lines 69-75) with a "Join Discord" button that links to the Beta Ads Discord server (`https://discord.gg/tSmM6XMEkn`).

## Details

- Remove the `scrollToHowItWorks` function (lines 16-18) since it will no longer be used
- Replace the `<button>` element with an `<a>` tag linking to the Discord invite URL, opening in a new tab
- Keep the same visual style (ghost/text style beside the primary "Apply now" button)
- Update the label to "Join Discord"
- Remove the unused `ExternalLink` import if not needed elsewhere
