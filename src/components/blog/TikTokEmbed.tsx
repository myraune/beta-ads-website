import React, { useEffect, useRef, useState } from "react";
import { SocialIcon } from "@/components/blog/SocialIcon";

interface Props {
  handle: string; // TikTok-handle uten @
  name: string;
}

/**
 * Offisiell TikTok creator-embed. TikToks eget embed.js rendrer en widget med
 * creatorens siste videoer (laster klientside, alltid oppdatert). Dette er den
 * eneste pålitelige måten å vise en vilkårlig creators siste TikToks uten API-
 * nøkkel eller scraping.
 */
export const TikTokEmbed: React.FC<Props> = ({ handle, name }) => {
  const ref = useRef<HTMLQuoteElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Last embed.js én gang globalt, og be TikTok re-skanne for nye blockquotes.
    const SRC = "https://www.tiktok.com/embed.js";
    const reload = () => {
      // TikTok eksponerer window.tiktokEmbed.lib.render() når scriptet er lastet.
      const w = window as unknown as { tiktokEmbed?: { lib?: { render?: (el?: Element | null) => void } } };
      if (w.tiktokEmbed?.lib?.render) {
        w.tiktokEmbed.lib.render(ref.current);
        setLoaded(true);
      }
    };

    const existing = document.querySelector(`script[src="${SRC}"]`) as HTMLScriptElement | null;
    if (existing) {
      // Scriptet finnes - tving en re-render av denne blockquoten.
      reload();
      // Gi det et øyeblikk i tilfelle lib ikke er klar ennå.
      const t = setTimeout(reload, 800);
      return () => clearTimeout(t);
    }

    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    s.onload = reload;
    document.body.appendChild(s);
    const t = setTimeout(() => setLoaded(true), 2500);
    return () => clearTimeout(t);
  }, [handle]);

  return (
    <div className="relative">
      <blockquote
        ref={ref}
        className="tiktok-embed"
        cite={`https://www.tiktok.com/@${handle}`}
        data-unique-id={handle}
        data-embed-type="creator"
        style={{ maxWidth: "100%", minWidth: "288px", margin: 0 }}
      >
        <section>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.tiktok.com/@${handle}?refer=creator_embed`}
          >
            @{handle}
          </a>
        </section>
      </blockquote>

      {/* Fallback-lenke mens widgeten laster (eller hvis bruker blokkerer TikTok-script) */}
      {!loaded && (
        <a
          href={`https://www.tiktok.com/@${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-border/70 text-foreground/85 hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
        >
          <SocialIcon label="TikTok" className="w-4 h-4" />
          Se {name} på TikTok
        </a>
      )}
    </div>
  );
};

export default TikTokEmbed;
