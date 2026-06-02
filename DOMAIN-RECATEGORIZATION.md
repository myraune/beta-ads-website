# beta-ads.no — URL-filter re-kategorisering ("grayware")

## Bakgrunn / diagnose

`beta-ads.no` ble rapportert "nede" på kontornettverket, men fungerte på mobildata.

**Konklusjon:** Siden er teknisk frisk. Den blokkeres av et URL-filter (Palo Alto-type)
som feilklassifiserer domenet som **"grayware"**.

Bevis:
- Vercel: siste produksjons-deploy = `READY`. Alt grønt.
- Samme app via Vercel-URL (`*.vercel.app`) → HTTP 200, ekte forside. Kun **domenenavnet**
  `beta-ads.no` blir stoppet, ikke serverne.
- Block-side: *"Web Page Blocked … Category: grayware"* (Palo Alto PAN-DB).
- Siden laster **ingen** ad-script, tracking-pixler eller adware (kun Google Fonts,
  sosiale lenker, Chart.js via CDN). → falsk positiv.

**Sannsynlig årsak:** "ads" i domenenavnet + ungt domene uten opparbeidet omdømme.

**Fiks:** Send re-kategoriserings-forespørsel til de store filter-leverandørene
kundene/byråene sitter bak.

---

## Sjekkliste — send i denne rekkefølgen

> Test **både** `beta-ads.no` **og** `app.beta-ads.no` i hvert skjema (plattformen kan
> være kategorisert separat). Behandlingstid: typisk 1–10 dager per leverandør.

| Status | Leverandør | Send her | Be om kategori |
|--------|-----------|----------|----------------|
| [ ] | **Palo Alto (PAN-DB)** ← bekreftet skyldig | https://urlfiltering.paloaltonetworks.com/ → "Test A Site" → Request Change | Business and Economy |
| [ ] | **Symantec / Blue Coat** (Broadcom) | https://sitereview.bluecoat.com/ | Business/Economy |
| [ ] | **Cisco Talos** | https://talosintelligence.com/reputation_center | Business |
| [ ] | **Fortinet FortiGuard** | https://www.fortiguard.com/webfilter | Business |
| [ ] | **Zscaler** | https://csi.zscaler.com/ | Professional Services |
| [ ] | **Forcepoint** | https://csi.forcepoint.com/ | Business and Economy |
| [ ] | **McAfee / Trellix** | https://trustedsource.org/ | Business |

### Mål bredden (gjør først)
- [ ] Test på mobildata — bekreftet: **fungerer** (= kontornett-filter, ikke siden).
- [ ] Be 2–3 kontakter sjekke fra *deres* kontornett.
- [ ] Slå opp kategorien i skjemaene over (Palo Alto "Test A Site", Talos, FortiGuard)
      for å se om det er global PAN-DB (bredt) eller lokal policy (smalt).

---

## Tekst til å lime inn (samme på alle skjema)

```
Domain: beta-ads.no (and app.beta-ads.no)

Current category: Grayware — this is incorrect.

Requested category: Business and Economy / Professional Services

beta-ads.no is the official corporate website of Beta Agency AS (Norwegian
organization number: 933 303 136), a registered advertising and media agency
founded in 2023 and registered in the Norwegian Business Register
(Brønnøysundregistrene). It is a static B2B marketing website hosted on Vercel.
It does NOT serve advertisements, run any ad-serving technology, tracking pixels,
adware, or any executable content. It contains only company information, case
studies, and a blog. The "grayware" classification is a false positive, likely
triggered by the string "ads" in the domain name. Please reclassify to Business
and Economy. Thank you.
```

---

## Notater
- Kontakt-epost for skjemaene: andreas@beta-ads.no
- De fleste skjema krever e-post + CAPTCHA → må sendes manuelt.
- Hvis blokkeringen viser seg å være bred (global PAN-DB) og vedvarer etter dispute:
  vurder å bygge domene-omdømme over tid, og bruk Vercel-URL / PDF-deck i kundemøter
  som midlertidig løsning.
