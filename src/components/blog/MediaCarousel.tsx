import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  children: React.ReactNode;
  /** aria-label for the scroll region. */
  label?: string;
}

/**
 * Horisontal karusell med ekte pil-navigasjon (scroller en "side" om gangen),
 * snap-points og kant-deteksjon (piler skjules/disables ved start/slutt).
 * Tar vilkårlige kort som children.
 */
export const MediaCarousel: React.FC<Props> = ({ children, label }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [overflows, setOverflows] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setOverflows(max > 8);
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft >= max - 8);
  }, []);

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Scroll ~85% of the visible width so a card or two stays for continuity.
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      {/* Venstre pil */}
      {overflows && (
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          aria-label="Bla tilbake"
          className={`hidden md:flex absolute left-0 top-[38%] -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-background border border-border shadow-md text-foreground transition-all ${
            atStart ? "opacity-0 pointer-events-none" : "opacity-0 group-hover/carousel:opacity-100 hover:bg-primary hover:text-white hover:border-primary"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Høyre pil */}
      {overflows && (
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          aria-label="Bla framover"
          className={`hidden md:flex absolute right-0 top-[38%] -translate-y-1/2 translate-x-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-background border border-border shadow-md text-foreground transition-all ${
            atEnd ? "opacity-0 pointer-events-none" : "opacity-0 group-hover/carousel:opacity-100 hover:bg-primary hover:text-white hover:border-primary"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <div
        ref={scrollerRef}
        role="region"
        aria-label={label}
        className="-mx-6 lg:-mx-8 px-6 lg:px-8 overflow-x-auto scrollbar-none scroll-smooth"
      >
        <ul className="flex gap-4 snap-x snap-mandatory pb-2">{children}</ul>
      </div>
    </div>
  );
};

export default MediaCarousel;
