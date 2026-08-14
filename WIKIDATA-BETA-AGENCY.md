# Wikidata entity for Beta Agency AS — ready to run

**Why this matters:** Wikidata has no notability bar, feeds Google's Knowledge Graph, and is a top source for ChatGPT. It's the single highest-leverage off-site move, and it's what finally disambiguates "Beta" from Beta Technologies (eVTOL), Beta Agency (California realty), and "beta software".

**What I did:** verified every ID against Wikidata's live API, and confirmed **no Beta Ads / Beta Agency item exists yet** (no duplicate risk).

**What you do:** log in and paste one block. ~60 seconds.

> **I can't publish this for you** — it needs a logged-in Wikidata account, and this is your public company record to own. Everything below is prepared so you just paste and click.

---

## Fastest path: QuickStatements (recommended, ~60 seconds)

1. Go to **https://www.wikidata.org** and log in (create a free account if you don't have one — takes a minute, no email required).
2. Open **https://quickstatements.toolforge.org/#/batch**
3. Click **"Authorize"** the first time (it links QuickStatements to your Wikidata login).
4. Paste the block below into the big text box.
5. Click **Import V1 commands** → then **Run**.

```
CREATE
LAST|Len|"Beta Agency"
LAST|Lnb|"Beta Agency"
LAST|Lnn|"Beta Agency"
LAST|Den|"Norwegian livestream advertising agency"
LAST|Dnb|"norsk livestream-annonsebyrå"
LAST|Aen|"Beta Ads"
LAST|Anb|"Beta Ads"
LAST|Aen|"Beta Agency AS"
LAST|P31|Q216931|S854|"https://www.kom24.no/andreas-myraune-beta-influensere/ny-kanal-for-mediekjop-beta-er-norges-nye-twitch-byra/730424"
LAST|P452|Q37038
LAST|P17|Q20
LAST|P159|Q585
LAST|P1454|Q15042660
LAST|P2333|"933303136"|S854|"https://www.brreg.no/"
LAST|P856|"https://beta-ads.no"
LAST|P571|+2024-03-15T00:00:00Z/11|S854|"https://www.brreg.no/"
LAST|P1448|nb:"Beta Agency AS"
```

That's it. QuickStatements creates the item and fills every statement. Copy the new **Q-number** it gives you and paste it back to me — I'll add it to the site's schema (`sameAs`), which links your website and the Wikidata entity together in both directions. That two-way link is what makes the entity resolve properly.

---

## What each line does (so you can sanity-check it)

| Statement | Value | Meaning |
|---|---|---|
| Label (en/nb/nn) | Beta Agency | The item's name |
| Description | Norwegian livestream advertising agency | How it's told apart from other "Beta"s |
| Also known as | Beta Ads, Beta Agency AS | **Ties your brand name to the legal name** |
| P31 instance of | Q216931 (advertising agency) | What it is |
| P452 industry | Q37038 (advertising) | Sector |
| P17 country | Q20 (Norway) | Country |
| P159 headquarters | Q585 (Oslo) | HQ |
| P1454 legal form | Q15042660 (aksjeselskap) | Norwegian AS |
| P2333 org. number | 933303136 | **Ties it to the official Brønnøysund record** |
| P856 official website | https://beta-ads.no | Links to your site |
| P571 inception | 2024-03-15 | Registration date |
| P1448 official name | Beta Agency AS | Legal name |

**On the founding date:** I used **2024-03-15**, the date in the public Brønnøysund registry. Wikidata is a factual database, so contradicting the official registry there would weaken the entity rather than help it. If you consider 2023 the real founding year, keep using "since 2023" in marketing copy — just leave the registry date in the official record. If you'd rather I change it, say so and I'll adjust the batch.

---

## Manual fallback (if QuickStatements gives you trouble)

1. Go to **https://www.wikidata.org/wiki/Special:NewItem**
2. Fill in: **Label** `Beta Agency` · **Description** `Norwegian livestream advertising agency` · **Also known as** `Beta Ads`
3. Click **Create**, then **add statement** for each row of the table above. Type the property name (e.g. "instance of") — it autocompletes — then the value.
4. On at least one statement, click **add reference** → **reference URL** → paste the KOM24 link.

---

## After it's live (do these two)

1. **Send me the Q-number** → I add `sameAs` to your site schema, closing the loop between site and entity.
2. **Add the same Wikidata link** to your Ocast, AdForum and LinkedIn profiles where a field allows it. Every place the entity is cross-referenced strengthens it.
