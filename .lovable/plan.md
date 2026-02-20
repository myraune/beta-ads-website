
# Remove "Book a Call" Button from Navbar

## Change

Remove the "Book a Call" ghost button from both desktop and mobile navigation in `src/components/Navbar.tsx`, keeping only the "Book a Demo" primary button.

## Details

**Desktop (lines 88-101):** Remove the entire `<a>` wrapper containing the "Book a Call" button and its `ExternalLink` icon.

**Mobile (lines 159-174):** Remove the `<a>` wrapper containing the mobile "Book a Call" outline button.

**Imports (line 3):** Remove `ExternalLink` from the lucide-react import since it will no longer be used.

No other files need changes.
