

# Fix Supademo Script URL

One-line change: swap the script source in `index.html`.

**File:** `index.html` (line 890)

| Before | After |
|--------|-------|
| `<script async src="https://supademo.com/demo.js"></script>` | `<script src="https://script.supademo.com/supademo.js"></script>` |

That is the only change needed. The button in `CaseStudies.tsx` already calls `Supademo.open()` correctly.

