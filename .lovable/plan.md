
# Plan: Forbedre Header-Animasjon og Navnekonflikt

## Del 1: Header-Animasjon Forbedringer

### Identifiserte Problemer

| Problem | Nåværende | Årsak |
|---------|-----------|-------|
| Feil timing | Terskel: 80px | Overgangen starter for tidlig/brått |
| For brå overgang | Alle egenskaper animeres samtidig | Mangler "staggered" effekt |
| Feil proporsjoner | 1280px → 720px | For dramatisk breddeendring |

### Løsning: Smooth Two-Phase Animation

#### Fase 1: Subtil bakgrunns-fade (først)
Når brukeren begynner å scrolle, fade inn bakgrunnen gradvis uten å endre bredde ennå.

#### Fase 2: Bredde-kontraksjon (etter mer scroll)
Etter mer scrolling, animer bredden og border-radius.

### Tekniske Endringer

```text
Fil: src/components/Navbar.tsx

Endringer:
1. Øk terskel fra 80px til 120px for hovedovergangen
2. Legg til en mellomtilstand (80px) for bakgrunns-fade
3. Øk pille-bredden fra 720px til 800px
4. Bruk separate transition-delays for ulike egenskaper
5. Legg til en subtil bakgrunn også i "non-scrolled" state
```

### Ny Animasjonslogikk

```text
0-80px scroll:    Full bredde, transparent bakgrunn
80-120px scroll:  Full bredde, bakgrunn fader inn (bg-background/50)
120px+ scroll:    Pill-form (800px), full bakgrunn (bg-background/80)
```

### CSS Transition Strategy

```text
- Bakgrunn + blur: transition-[background,backdrop-filter] duration-400
- Bredde + padding: transition-[max-width,padding] duration-600 delay-100
- Border-radius: transition-[border-radius] duration-500
- Shadow: transition-shadow duration-500 delay-200
```

Dette gir en "kaskadering" der:
1. Bakgrunnen fader inn først
2. Deretter kontraherer bredden
3. Til slutt kommer skyggen

---

## Del 2: Fiks Navnekonflikt (Valgfritt)

### Nåværende Situasjon
- `src/pages/Press.tsx` - Presseside (default export som `Press`)
- `src/components/sections/Press.tsx` - Press-seksjon (named export som `Press`)

### Anbefaling
Gi pressesiden et tydeligere navn for å unngå forvirring:

```text
Alternativ A: Behold som det er (fungerer teknisk)
Alternativ B: Rename page til PressPage.tsx
```

Jeg anbefaler Alternativ A siden de bruker forskjellige import-paths og export-typer.

---

## Oppsummering av Endringer

| Fil | Endring |
|-----|---------|
| `src/components/Navbar.tsx` | Ny to-fase animasjonslogikk med bedre timing, proporsjoner og smooth transitions |

### Forventet Resultat
- Header føles mer naturlig og "smooth"
- Overgangen er ikke lenger brå
- Proporsjonene er bedre balansert
- Bakgrunnen fader inn før bredden endres
