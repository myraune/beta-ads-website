import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/* Cinematic player for the Beta Ads film. Opened from the hero; the mp4 is
 * only requested when the modal mounts, so the page itself stays light. */

export const FILM_SRC = "/videos/beta-ads-film.mp4";
export const FILM_POSTER = "/videos/beta-ads-film-poster.webp";

export const FilmModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    videoRef.current?.play().catch(() => {});
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.("event", "film_play", { film: "beta-ads-film", placement: "hero" });
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Beta Ads film"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-300"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close film"
        className="absolute right-4 top-4 sm:right-6 sm:top-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-6xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-black shadow-2xl ring-1 ring-white/10 animate-in zoom-in-95 duration-300">
          <video ref={videoRef} src={FILM_SRC} poster={FILM_POSTER} controls autoPlay playsInline className="absolute inset-0 h-full w-full" />
        </div>
      </div>
    </div>,
    document.body,
  );
};
