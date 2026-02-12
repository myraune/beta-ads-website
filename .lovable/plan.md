
# English Only, System Theme, and Nordic Easter Eggs

## 1. English Only -- Remove Language Selector

**Navbar** (`src/components/Navbar.tsx`):
- Remove the language dropdown (Globe icon, flag selector) from both desktop and mobile nav
- Remove `language` and `setLanguage` props entirely
- Clean up the `languages` array and related imports

**App.tsx** (`src/App.tsx`):
- Remove `useState` for language -- hardcode `language = "en"`
- Remove the NO, SV, FI translation objects (lines ~136-450) to reduce bundle size
- Remove `setLanguage` prop passed to all pages/components

**Footer** (`src/components/sections/Footer.tsx`):
- Remove `language` and `setLanguage` props
- Remove the "LANGUAGE" section if it exists

**All page components** that receive `language`/`setLanguage` props:
- Simplify prop interfaces (Index, CaseStudies, HowItWorks, Streamers, AboutUs, Blog, BlogPost, Contact, Demo, Press, Layout)

## 2. Theme Follows System

**App.tsx**: Change ThemeProvider from:
```
defaultTheme="dark" enableSystem={false}
```
to:
```
defaultTheme="system" enableSystem={true}
```

The existing theme toggle button in the Navbar stays, so users can still override manually. But the default will match their OS preference.

## 3. Nordic Easter Eggs on the Homepage

Subtle, tasteful Nordic greetings that reinforce the "we are Nordic" identity without cluttering the design. Ideas:

**Option A -- Rotating greeting in the Hero subtitle area**
A small line above or below the hero headline that cycles through Nordic greetings with a fade animation:
- "Hei" (Norwegian)
- "Hej" (Swedish)
- "Moi" (Finnish)
- "Hei verden" (Norwegian for "Hello world")

This would be a subtle, auto-rotating text element -- one word at a time, fading in/out every 3 seconds.

**Option B -- Footer sign-off**
Replace the generic footer copyright area with a Nordic touch:
- "Made with kaffe in Oslo, Stockholm and Helsinki"
- Or rotate between "Laget i Norden" / "Gjort i Norden" / "Tehty Pohjoismaissa"

**Option C -- Cursor/hover micro-interactions on the Markets section**
When hovering over Norway/Sweden/Finland on the map, show the local greeting ("Hei" / "Hej" / "Moi") instead of just the country name.

**Recommendation: All three.** They are small, non-intrusive, and reinforce the Nordic brand identity throughout the page.

## Technical Details

### Files to modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Remove language state, remove NO/SV/FI translations, change ThemeProvider to `defaultTheme="system" enableSystem={true}` |
| `src/components/Navbar.tsx` | Remove language selector UI, remove language/setLanguage props |
| `src/components/sections/Footer.tsx` | Remove language props, add "Made with kaffe in Oslo" line |
| `src/components/sections/Hero.tsx` | Add rotating Nordic greeting element ("Hei" / "Hej" / "Moi") |
| `src/components/sections/MarketsSection.tsx` | Show "Hei"/"Hej"/"Moi" on country hover instead of country name |
| `src/components/Layout.tsx` | Remove language/setLanguage props passed to Navbar |
| `src/pages/Index.tsx` | Simplify props |
| `src/pages/CaseStudies.tsx` | Simplify props |
| `src/pages/Streamers.tsx` | Simplify props |
| All other page files | Remove unused language/setLanguage props |

### Rotating greeting component (Hero)
A small React component using `useState` + `useEffect` with a 3-second interval, cycling through `["Hei", "Hej", "Moi"]` with a CSS fade transition. Positioned as a small, muted text element near the hero -- subtle, not distracting.
