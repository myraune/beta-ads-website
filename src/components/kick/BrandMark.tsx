import React from "react";
import { Tv } from "lucide-react";

/**
 * Platform marks for the Kick pages, drawn inline so they render in the
 * prerendered shell without a network request. Paths are the official
 * marks as published in Simple Icons (CC0). Colours are each platform's
 * own; the bars they sit next to stay neutral.
 */

const PATHS: Record<string, string> = {
  Twitch: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z",
  YouTube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  Kick: "M1.333 0h8v5.333H12V2.667h2.667V0h8v8H20v2.667h-2.667v2.666H20V16h2.667v8h-8v-2.667H12v-2.666H9.333V24h-8Z",
  TikTok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
};

const COLORS: Record<string, string> = {
  Twitch: "#9146FF",
  YouTube: "#FF0000",
  Kick: "#53FC18",
  TikTok: "currentColor",
};

export const BrandMark: React.FC<{ name: string; className?: string }> = ({ name, className = "w-3.5 h-3.5" }) => {
  if (name === "Linear TV" || name === "tv") return <Tv className={`${className} text-muted-foreground`} aria-hidden />;
  const key = name.startsWith("YouTube") ? "YouTube" : name;
  const d = PATHS[key];
  if (!d) return <span className={`${className} inline-block rounded-sm bg-foreground/15`} aria-hidden />;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill={COLORS[key]}>
      <path d={d} />
    </svg>
  );
};

export const FLAGS: Record<string, string> = { fi: "🇫🇮", se: "🇸🇪", no: "🇳🇴", dk: "🇩🇰", is: "🇮🇸", eu: "🇪🇺" };
