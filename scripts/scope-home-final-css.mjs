// Scope the 31-final-platform style.css under .bf for the React site.
// Usage: node scope-css.mjs <in.css> <out.css>
import fs from "fs";
const [, , inFile, outFile] = process.argv;
let css = fs.readFileSync(inFile, "utf8");
css = css.replace(/\/\*[\s\S]*?\*\//g, "");

const R = ".bf";
const mapSel = (s) => {
  s = s.trim();
  if (!s) return s;
  if (s === ":root") return R;
  if (s === "html" || s === "body") return R;
  if (s === "*") return `${R},${R} *`;
  if (s.startsWith(':root:not([data-theme="dark"])')) return `html:not(.dark) ${R}` + s.slice(':root:not([data-theme="dark"])'.length);
  if (s === '[data-theme="dark"]') return `.dark ${R}`;
  if (s.startsWith('[data-theme="dark"]')) return `.dark ${R}` + s.slice('[data-theme="dark"]'.length);
  if (s === "html.theming") return `html.theming ${R}`;
  if (s.startsWith("html.theming")) return `html.theming ${R}` + s.slice("html.theming".length);
  if (s.startsWith(".js ")) return `${R}.js ` + s.slice(4);
  return `${R} ${s}`;
};

const out = [];
let i = 0;
const parseBlock = (depth) => {
  const res = [];
  while (i < css.length) {
    // skip whitespace
    while (i < css.length && /\s/.test(css[i])) i++;
    if (i >= css.length) break;
    if (css[i] === "}") { i++; return res; }
    const start = i;
    while (i < css.length && css[i] !== "{" && css[i] !== "}") i++;
    const head = css.slice(start, i).trim();
    if (css[i] === "}") { i++; return res; }
    i++; // {
    if (head.startsWith("@media")) {
      const inner = parseBlock(depth + 1);
      res.push(`${head}{\n${inner.join("\n")}\n}`);
    } else if (head.startsWith("@keyframes")) {
      const s2 = i; let d = 1;
      while (d > 0) { if (css[i] === "{") d++; else if (css[i] === "}") d--; i++; }
      const body = css.slice(s2, i - 1);
      res.push(head.replace(/@keyframes\s+(\w+)/, "@keyframes bf-$1") + "{" + body + "}");
    } else {
      const s2 = i;
      while (css[i] !== "}") i++;
      let body = css.slice(s2, i).trim();
      i++;
      if (!body) continue;
      body = body.replace(/animation:(ping|pop)\b/g, "animation:bf-$1");
      body = body.replace(/url\(\.\.\/assets\/overlays\/adgif-3637484-poster\.webp\)/g, "url(/home/build-stream-bg.webp)");
      const sels = head.split(",").map(mapSel).join(",");
      if (sels === R && /overflow-x:hidden/.test(body)) body = body.replace("overflow-x:hidden", "overflow-x:clip");
      res.push(`${sels}{${body}}`);
    }
  }
  return res;
};
const rules = parseBlock(0);
const header = `/* Generated from ~/dev/beta-ads-home-v3/31-final-platform/style.css, scoped under .bf
   (light tokens on .bf, dark tokens on .dark .bf for next-themes attribute="class").
   Regenerate with: node scripts/scope-home-final-css.mjs <style.css> src/components/home-final/home-final.css
   Site integration fixes (Tailwind preflight, global index.css) are added right after the reset. */\n`;
const fixes = `
/* ---- site integration fixes (Tailwind preflight + global index.css) ---- */
.bf h1,.bf h2,.bf h3,.bf h4{font-weight:bold;text-wrap:wrap}
.bf p{text-wrap:wrap}
.bf *::before,.bf *::after{box-sizing:content-box}
`;
// fixes must sit before the design rules so design selectors (higher specificity anyway) win
const idx = rules.findIndex((r) => r.startsWith(`${R},${R} *{`));
rules.splice(idx + 1, 0, fixes.trim());
fs.writeFileSync(outFile, header + rules.join("\n") + "\n");
console.log("rules", rules.length);
