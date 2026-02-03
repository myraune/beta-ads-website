

# Plan: Fiks Header og Legg til Presseside

## Del 1: Fiks Header-Problemer

### Problemer Identifisert
1. **Feil timing**: Overgangen trigges ved 20px scroll, som er for tidlig
2. **For brå overgang**: Animasjonen mangler en mykere easing og mellomsteg
3. **Feil proporsjoner**: Pillen på 600px kan føles for smal sammenlignet med innholdet

### Løsning

#### Timing
- Øk scroll-terskelen fra 20px til 60-80px slik at overgangen skjer mer naturlig
- Brukeren får mer tid til å se den fulle headeren før den transformeres

#### Overgang
- Bruk en todelt tilnærming:
  - Først: Fade inn bakgrunn og blur (raskere, 400ms)
  - Deretter: Animer bredde og border-radius (litt tregere, 600ms)
- Legg til en subtil bakgrunn i "non-scrolled" state for å unngå hopp fra ingenting til noe

#### Proporsjoner
- Øk pille-bredden fra 600px til 700px for bedre balanse
- Juster padding for å gi mer pusterom rundt elementene

### Tekniske Endringer

**Fil: `src/components/Navbar.tsx`**

```text
Endringer:
1. Endre scroll-terskel fra 20 til 80
2. Øk max-width fra 600px til 700px
3. Legg til subtil bg-background/5 i initial state
4. Juster padding for bedre proporsjoner
```

---

## Del 2: Ny Presseside (/press)

### Formål
En dedikert side for journalister, redaksjoner og samarbeidspartnere med:
- Nedlastbare pressebilder (logoer i ulike formater)
- Produktbilder fra kampanjer
- Kontaktinformasjon til daglig leder Andreas Myraune
- Kort om selskapet

### Sidestruktur

```text
/press
├── Hero: "Press Kit" overskrift
├── Kontaktseksjon: Andreas Myraune med bilde, tittel, e-post, telefon
├── Om Beta Ads: Kort boilerplate-tekst om selskapet
├── Pressebilder: 
│   ├── Logoer (hvit, svart, farge)
│   └── Produkt/kampanjebilder
├── Pressedekning: Lenker til eksisterende artikler
└── Footer
```

### Design
- Følger borderless UI-system med subtle bakgrunner
- Fokus på funksjonalitet - journalister skal enkelt finne det de trenger
- Nedlastbare bilder vises i et grid med "Last ned" knapper

### Filer som Opprettes/Endres

| Fil | Handling |
|-----|----------|
| `src/pages/Press.tsx` | Ny fil - Presseside |
| `src/App.tsx` | Legg til /press route og oversettelser |
| `src/components/Navbar.tsx` | Fiks header + legg til Press-lenke |

### Innhold på Pressesiden

**Kontaktinfo:**
- Andreas Myraune
- Daglig leder / CEO
- andreas@beta-ads.no
- +47 46195548

**Om Beta Ads (boilerplate):**
"Beta Ads er en nordisk annonseringsplattform spesialisert på native reklame i live Twitch-strømmer. Selskapet har hovedkontor i Oslo og opererer i Norge, Sverige, Finland og Danmark."

**Tilgjengelige pressebilder:**
- Logo hvit (`logo-white.png`)
- Logo svart (`logo-black.png`)
- Logo farge (`logo-color.png`)
- Favicon/ikon (`favicon.png`)

---

## Oppsummering

| Oppgave | Prioritet |
|---------|-----------|
| Fiks header-timing og proporsjoner | Høy |
| Opprett /press side | Høy |
| Legg til Press i navigasjon | Medium |

