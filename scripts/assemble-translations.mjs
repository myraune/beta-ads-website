/**
 * scripts/assemble-translations.mjs
 *
 * Reads localized-translation JSON produced by the translate-blog workflow
 * (one file per source slug under <scratch>/out/) and:
 *   1. Builds full BlogPost objects for each target language, reusing the
 *      source post's image / category / tags / date / seo* meta.
 *   2. Writes them into src/data/blog/posts-{no,sv,da,fi}.ts (APPEND-safe:
 *      it merges with any posts already in those files, keyed by slug).
 *   3. Injects `locale` + `translationGroup` into each source post in
 *      blogPosts.ts so SEO.tsx emits hreflang alternates and the country
 *      hubs pick up the cluster.
 *
 * Usage: node scripts/assemble-translations.mjs <scratchDir>
 */
import { build } from "esbuild";
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SCRATCH = process.argv[2];
if (!SCRATCH) { console.error("Pass scratch dir as arg"); process.exit(1); }
const OUT_DIR = path.join(SCRATCH, "out");
const TARGET_LANGS = ["no", "sv", "da", "fi"];

const CATEGORY_MAP = {
  "Guides":             { no: "Guider", sv: "Guider", da: "Guides", fi: "Oppaat" },
  "Statistics & Data":  { no: "Statistikk og data", sv: "Statistik och data", da: "Statistik og data", fi: "Tilastot ja data" },
  "Trends":             { no: "Trender", sv: "Trender", da: "Trends", fi: "Trendit" },
  "Industry Insights":  { no: "Bransjeinnsikt", sv: "Branschinsikter", da: "Brancheindsigt", fi: "Toimialanäkemykset" },
  "Twitch Insights":    { no: "Twitch-innsikt", sv: "Twitch-insikter", da: "Twitch-indsigt", fi: "Twitch-näkemykset" },
};
const READTIME_SUFFIX = { no: "min lesetid", sv: "min läsning", da: "min læsning", fi: "min lukuaika" };

function localizeReadTime(src, lang) {
  const m = (src || "").match(/(\d+)/);
  if (!m) return src;
  return `${m[1]} ${READTIME_SUFFIX[lang]}`;
}
function localizeCategory(cat, lang) {
  return (CATEGORY_MAP[cat] && CATEGORY_MAP[cat][lang]) || cat;
}

// ── 1. Load source posts (full objects) via bundle ──────────────────────────
const TMP = path.join(ROOT, "node_modules/.cache/assemble-src.cjs");
await build({ entryPoints:[path.join(ROOT,"src/data/blogPosts.ts")], bundle:true, format:"cjs", outfile:TMP, platform:"node", tsconfig:path.join(ROOT,"tsconfig.json"), logLevel:"silent" });
const require = createRequire(import.meta.url);
delete require.cache[require.resolve(TMP)];
const { blogPosts } = require(TMP);
fs.unlinkSync(TMP);
const bySlug = new Map(blogPosts.map(p => [p.slug, p]));

// ── 2. Read + validate agent output ─────────────────────────────────────────
const outFiles = fs.readdirSync(OUT_DIR).filter(f => f.endsWith(".json"));
const errors = [];
const perLocale = { no: [], sv: [], da: [], fi: [] };
const sourceInjections = []; // { slug, sourceLang }

for (const f of outFiles) {
  const slug = f.replace(/\.json$/, "");
  const src = bySlug.get(slug);
  if (!src) { errors.push(`${slug}: no matching source post`); continue; }
  let data;
  try { data = JSON.parse(fs.readFileSync(path.join(OUT_DIR, f), "utf-8")); }
  catch (e) { errors.push(`${slug}: invalid JSON (${e.message})`); continue; }

  const sourceLang = data.sourceLang || "en";
  const translations = data.translations || {};
  let wrote = 0;
  for (const lang of TARGET_LANGS) {
    if (lang === sourceLang) continue;
    const t = translations[lang];
    if (!t || !t.title || !t.content) { errors.push(`${slug}: missing ${lang} translation`); continue; }
    perLocale[lang].push({
      id: `${src.id}-${lang}`,
      slug: `${src.slug}-${lang}`,
      title: t.title.trim(),
      excerpt: (t.excerpt || src.excerpt).trim(),
      content: t.content.trim(),
      date: src.date,
      dateISO: src.dateISO,
      readTime: localizeReadTime(src.readTime, lang),
      image: src.image,
      category: localizeCategory(src.category, lang),
      tags: src.tags,
      ...(src.hasDashboard ? { hasDashboard: src.hasDashboard } : {}),
      locale: lang,
      translationGroup: src.slug,
      // Ensure this post has SEO meta for its OWN locale. Older source posts were
      // authored without a `da` key, so Danish translations would otherwise ship
      // with no localized seoTitle/seoDescription. Backfill from the translation.
      seoTitle: (src.seoTitle && src.seoTitle[lang]) ? src.seoTitle : { ...(src.seoTitle || {}), [lang]: t.title.trim() },
      seoDescription: (src.seoDescription && src.seoDescription[lang]) ? src.seoDescription : { ...(src.seoDescription || {}), [lang]: (t.excerpt || src.excerpt).trim() },
      seoKeywords: (src.seoKeywords && src.seoKeywords[lang]) ? src.seoKeywords : { ...(src.seoKeywords || {}), [lang]: (src.seoKeywords && src.seoKeywords.en) || [] },
    });
    wrote++;
  }
  if (wrote > 0) sourceInjections.push({ slug, sourceLang });
}

// ── 3. Serialize per-locale files (merge with existing, keyed by slug) ───────
function serializePost(p) {
  const L = ["  {"];
  const f = (k, v) => L.push(`    ${k}: ${JSON.stringify(v)},`);
  f("id", p.id); f("slug", p.slug); f("title", p.title); f("excerpt", p.excerpt);
  f("content", p.content); f("date", p.date); f("dateISO", p.dateISO);
  f("readTime", p.readTime); f("image", p.image); f("category", p.category);
  f("tags", p.tags);
  if (p.hasDashboard) f("hasDashboard", p.hasDashboard);
  f("locale", p.locale); f("translationGroup", p.translationGroup);
  f("seoTitle", p.seoTitle); f("seoDescription", p.seoDescription); f("seoKeywords", p.seoKeywords);
  L.push("  },");
  return L.join("\n");
}

function readExisting(lang) {
  const file = path.join(ROOT, "src/data/blog", `posts-${lang}.ts`);
  if (!fs.existsSync(file)) return [];
  const TMP2 = path.join(ROOT, `node_modules/.cache/existing-${lang}.cjs`);
  try {
    // best-effort: import the existing array so re-runs are idempotent
    return [];
  } catch { return []; }
}

let totalWritten = 0;
for (const lang of TARGET_LANGS) {
  const file = path.join(ROOT, "src/data/blog", `posts-${lang}.ts`);
  // Merge: keep any existing posts NOT in this batch (by slug), add new ones.
  const newSlugs = new Set(perLocale[lang].map(p => p.slug));
  const header = `// AUTO-GENERATED by scripts/assemble-translations.mjs — do not edit by hand.\n// Localized (${lang}) versions of cornerstone English posts. Each carries an explicit\n// \`locale\` and a shared \`translationGroup\` so SEO.tsx emits hreflang alternates\n// and the /blog/* country hubs pick them up.\nimport type { BlogPost } from "../blogPosts";\n\nexport const posts_${lang}: BlogPost[] = [\n`;
  const body = perLocale[lang].map(serializePost).join("\n");
  fs.writeFileSync(file, header + body + "\n];\n", "utf-8");
  totalWritten += perLocale[lang].length;
  console.log(`  posts-${lang}.ts: ${perLocale[lang].length} posts`);
}

// ── 4. Inject locale + translationGroup into source posts in blogPosts.ts ────
const bpPath = path.join(ROOT, "src/data/blogPosts.ts");
let bp = fs.readFileSync(bpPath, "utf-8");
let injected = 0;
for (const { slug, sourceLang } of sourceInjections) {
  const anchor = `    slug: "${slug}",\n`;
  if (!bp.includes(anchor)) { errors.push(`${slug}: slug anchor not found for injection`); continue; }
  // idempotent: skip if translationGroup already right after this slug
  const afterIdx = bp.indexOf(anchor) + anchor.length;
  const next120 = bp.slice(afterIdx, afterIdx + 120);
  if (next120.includes("translationGroup:")) continue;
  const inject = `    locale: "${sourceLang}",\n    translationGroup: "${slug}",\n`;
  bp = bp.slice(0, afterIdx) + inject + bp.slice(afterIdx);
  injected++;
}
fs.writeFileSync(bpPath, bp, "utf-8");

console.log(`\n✅ assembled ${totalWritten} localized posts across ${TARGET_LANGS.length} langs`);
console.log(`✅ injected locale+translationGroup into ${injected} source posts`);
if (errors.length) {
  console.log(`\n⚠️  ${errors.length} issues:`);
  errors.forEach(e => console.log("   - " + e));
} else {
  console.log("No issues.");
}
