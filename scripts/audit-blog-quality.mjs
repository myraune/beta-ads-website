#!/usr/bin/env node
/**
 * Audit every blog post in src/data/blogPosts.ts against the quality signals
 * from the reference post (`clipping-economy-brand-marketing-guide-2026`):
 *
 *   - Word count
 *   - H2 / H3 count
 *   - External link count
 *   - Named-company / bold-number count (specificity proxy)
 *   - Image count
 *   - Table count
 *   - Has a "Sources" footer
 *   - Has "how to apply / evaluate" actionable section
 *   - Related posts count
 *
 * Scores each against the reference and outputs a ranked list of the weakest
 * posts — those are the rewrite targets.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src/data/blogPosts.ts");

const REFERENCE_SLUG = "clipping-economy-brand-marketing-guide-2026";

function parsePosts() {
  const src = fs.readFileSync(SRC, "utf-8");
  const body = src.match(/export const blogPosts: BlogPost\[\] = \[([\s\S]*?)\n\];/)?.[1];
  if (!body) return [];

  const chunks = [];
  let depth = 0,
    start = -1;
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (c === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (c === "}") {
      depth--;
      if (depth === 0 && start >= 0) {
        chunks.push(body.slice(start, i + 1));
        start = -1;
      }
    }
  }

  return chunks.flatMap((chunk) => {
    const slug = chunk.match(/slug:\s*["']([^"']+)["']/)?.[1];
    if (!slug) return [];
    const title = chunk.match(/^\s*title:\s*["']([^"']+)["']/m)?.[1] || "";
    const category = chunk.match(/category:\s*["']([^"']+)["']/)?.[1] || "";
    const contentMatch = chunk.match(/content:\s*`([\s\S]*?)`,\s*\n/);
    const content = contentMatch?.[1] || "";
    const relatedMatch = chunk.match(/relatedSlugs:\s*\[([\s\S]*?)\]/);
    const relatedCount = relatedMatch
      ? (relatedMatch[1].match(/["']/g) || []).length / 2
      : 0;
    return [{ slug, title, category, content, relatedCount }];
  });
}

function score(post) {
  const c = post.content;
  const words = c.split(/\s+/).filter((w) => w.length > 0).length;
  const h2 = (c.match(/^## [^#]/gm) || []).length;
  const h3 = (c.match(/^### [^#]/gm) || []).length;
  const externalLinks = (c.match(/\]\(https?:\/\/[^)]+\)/g) || []).length;
  const images = (c.match(/!\[/g) || []).length;
  const tables = (c.match(/^\s*\|[^|]+\|/gm) || []).length;
  const tableCount = tables > 0 ? 1 : 0; // count distinct tables roughly
  const bold = (c.match(/\*\*[^*]+\*\*/g) || []).length;
  const hasSources = /^\*?Sources?[:\s]/mi.test(c) || /---\s*\n\s*\*?Sources/mi.test(c);
  const hasActionable =
    /(How to|When to|What to do|Checklist|Playbook|Action items|What brands should do)/i.test(c);
  const hasBetaTieIn = /Beta Ads/.test(c);

  // simple weighted quality score for ranking
  const qualityScore =
    Math.min(words / 100, 25) + // up to 25 points for length
    h2 * 3 + // up to ~24 for structure
    h3 * 1 +
    externalLinks * 2 + // up to ~20 for citations
    images * 2 + // visual variety
    tableCount * 3 +
    Math.min(bold, 15) * 0.5 + // pull-outs, cap at 7.5
    (hasSources ? 8 : 0) +
    (hasActionable ? 6 : 0) +
    (hasBetaTieIn ? 4 : 0) +
    post.relatedCount * 1;

  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    words,
    h2,
    h3,
    externalLinks,
    images,
    tableCount,
    bold,
    hasSources,
    hasActionable,
    hasBetaTieIn,
    relatedCount: post.relatedCount,
    score: Math.round(qualityScore * 10) / 10,
  };
}

function main() {
  const posts = parsePosts();
  const scored = posts.map(score).sort((a, b) => b.score - a.score);

  const refPost = scored.find((p) => p.slug === REFERENCE_SLUG);
  const refScore = refPost?.score || 90;

  console.log(`\n=== Quality audit: 101 blog posts vs reference ===\n`);
  console.log(
    `Reference: "${refPost?.title?.slice(0, 80)}"`,
  );
  console.log(
    `  words: ${refPost?.words}  h2: ${refPost?.h2}  h3: ${refPost?.h3}  links: ${refPost?.externalLinks}  bold: ${refPost?.bold}  sources: ${refPost?.hasSources}  actionable: ${refPost?.hasActionable}  → score: ${refPost?.score}\n`,
  );

  // Bucket posts
  const strong = scored.filter((p) => p.score >= refScore * 0.85);
  const medium = scored.filter((p) => p.score >= refScore * 0.55 && p.score < refScore * 0.85);
  const weak = scored.filter((p) => p.score < refScore * 0.55);

  console.log(`Strong  (≥85% of ref score): ${strong.length} posts`);
  console.log(`Medium (55-85%):             ${medium.length} posts`);
  console.log(`Weak   (<55%):                ${weak.length} posts`);

  console.log(`\n--- WEAKEST 20 (top rewrite candidates) ---\n`);
  const weakest = scored.slice(-20).reverse();
  for (const p of weakest) {
    const flags = [
      p.words < 800 ? "short" : null,
      p.externalLinks < 3 ? "thin-citations" : null,
      p.h2 < 3 ? "flat-structure" : null,
      !p.hasSources ? "no-sources" : null,
      !p.hasActionable ? "no-action-section" : null,
      !p.hasBetaTieIn ? "no-beta-tie-in" : null,
    ].filter(Boolean);
    console.log(
      `  ${p.score.toFixed(1).padStart(5)}  ${p.slug.slice(0, 55).padEnd(56)}  [${p.category}]`,
    );
    console.log(`         ${p.words}w · h2:${p.h2} · links:${p.externalLinks} · flags: ${flags.join(", ") || "none"}`);
  }

  console.log(`\n--- TOP-10 strongest (to see quality ceiling) ---\n`);
  for (const p of scored.slice(0, 10)) {
    console.log(
      `  ${p.score.toFixed(1).padStart(5)}  ${p.slug.slice(0, 55).padEnd(56)}  [${p.category}]`,
    );
  }

  // Write full JSON for programmatic use
  const out = path.join(ROOT, ".tmp-blog-audit.json");
  fs.writeFileSync(out, JSON.stringify(scored, null, 2));
  console.log(`\n→ full audit written to ${path.relative(ROOT, out)}`);
}

main();
