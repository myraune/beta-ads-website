/**
 * Readable brand-coloured text on the theme-following canvas.
 *
 * Mixes a brand colour toward the current ink (--foreground): neon brand colours
 * (Kick green, Saily yellow, Glorious gold) darken on the light canvas, and deep
 * ones (Samsung blue, NKI aubergine) lift on the dark canvas. The ratio comes from
 * --brand-ink-mix in src/index.css.
 *
 *   <span style={{ color: brandInk(BRAND.primary) }}>Norway · Retail</span>
 */
export const brandInk = (color: string): string =>
  `color-mix(in oklab, ${color} var(--brand-ink-mix), hsl(var(--foreground)))`;
