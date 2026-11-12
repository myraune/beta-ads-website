import React, { useEffect, useRef, useState } from "react";

/**
 * True once the element has come within ~800px of the viewport (always true
 * when disabled). Never true during the prerender capture (scripts/prerender.mjs
 * sets window.__BA_PRERENDER__): media switched on there would be baked into
 * the static HTML and fetched eagerly again.
 */
export function useNearViewport<T extends Element>(ref: React.RefObject<T>, enabled = true): boolean {
  const [near, setNear] = useState(!enabled);
  useEffect(() => {
    const el = ref.current;
    if (!enabled || near || !el) return;
    if ((window as Window & { __BA_PRERENDER__?: boolean }).__BA_PRERENDER__) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, enabled, near]);
  return near;
}

type Props = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "poster"> & {
  poster: string;
  /** Hold the poster back until the video is near the viewport. */
  lazy?: boolean;
};

/**
 * A <video> whose poster is fetched only when it comes near the viewport. A
 * poster attribute cannot be lazy-loaded: the browser fetches it as soon as the
 * HTML is parsed. On the homepage that put ~250 KB of below-the-fold posters on
 * the mobile connection in the same window as the hero poster, which is the LCP
 * element, and Lighthouse's LCP counts every request started before it. Until
 * then the URL sits in data-poster, so the prerendered HTML has no poster for
 * the preload scanner either.
 */
export const PosterVideo: React.FC<Props> = ({ poster, lazy = true, children, ...rest }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const near = useNearViewport(ref, lazy);
  return (
    <video ref={ref} {...rest} poster={near ? poster : undefined} data-poster={near ? undefined : poster}>
      {children}
    </video>
  );
};

/**
 * An <img> that gets its src only near the viewport. loading="lazy" alone is
 * not enough in the lab: on an unthrottled or unknown connection Chrome loads
 * lazy images up to 5000px ahead, so the homepage case cards (~500 KB, ~4000px
 * down on a phone) were fetched before the hero poster had painted and counted
 * against LCP. The box keeps its size from the parent's aspect-ratio.
 */
export const NearImg: React.FC<React.ImgHTMLAttributes<HTMLImageElement> & { src: string }> = ({ src, ...rest }) => {
  const ref = useRef<HTMLImageElement>(null);
  const near = useNearViewport(ref);
  return <img ref={ref} loading="lazy" decoding="async" {...rest} src={near ? src : undefined} data-src={near ? undefined : src} />;
};
