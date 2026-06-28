import React from "react";
import { Twitch, Instagram, Facebook, Globe, Link as LinkIcon } from "lucide-react";

/**
 * Brand-ikoner for sosiale medier brukt på streamer-profil/kort.
 * Lucide har Twitch/Instagram/Facebook/Globe; YouTube/TikTok/X/Snapchat
 * legges som lokal SVG (paths fra Simple Icons, MIT/CC0).
 */

interface Props {
  /** Plattform-label (vi sjekker mot URL hvis label er ukjent). */
  label: string;
  url?: string;
  className?: string;
}

type Platform =
  | "twitch" | "youtube" | "instagram" | "tiktok" | "x"
  | "facebook" | "snapchat" | "discord" | "kick" | "site";

function detect(label: string, url?: string): Platform {
  const s = (label + " " + (url || "")).toLowerCase();
  if (s.includes("twitch")) return "twitch";
  if (s.includes("youtube") || s.includes("youtu.be")) return "youtube";
  if (s.includes("instagram")) return "instagram";
  if (s.includes("tiktok")) return "tiktok";
  if (/\bx\.com\b|\btwitter\b|^x$/.test(s)) return "x";
  if (s.includes("facebook")) return "facebook";
  if (s.includes("snapchat")) return "snapchat";
  if (s.includes("discord")) return "discord";
  if (s.includes("kick.com") || s.includes("kick")) return "kick";
  return "site";
}

const cls = "w-4 h-4";

export const SocialIcon: React.FC<Props> = ({ label, url, className }) => {
  const p = detect(label, url);
  const c = className ?? cls;
  switch (p) {
    case "twitch":    return <Twitch className={c} aria-hidden />;
    case "instagram": return <Instagram className={c} aria-hidden />;
    case "facebook":  return <Facebook className={c} aria-hidden />;
    case "youtube":   return (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.498 6.186a3.02 3.02 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.02 3.02 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.02 3.02 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.02 3.02 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.546 15.568V8.432L15.818 12l-6.272 3.568z"/>
      </svg>
    );
    case "tiktok": return (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.43a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.86z"/>
      </svg>
    );
    case "x": return (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
    case "snapchat": return (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.046.21-.09.42-.166.65-.075.224-.24.339-.45.339h-.029c-.106 0-.211-.022-.347-.054-.176-.039-.4-.09-.737-.09-.197 0-.4.18-.629.38-.405.404-.985.97-2.111.97-.057 0-.114-.013-.171-.013h-.105c-.987 0-1.785-.314-2.512-.687-.706-.353-1.349-.673-2.005-.673-.434 0-.835.106-1.18.218-.418.137-.838.286-1.21.286-.286 0-.465-.149-.524-.479-.029-.15-.06-.299-.105-.434l-.06-.18c-.04-.123-.075-.24-.108-.349-1.799-.165-2.84-.6-3.083-1.122a.84.84 0 0 1-.045-.225c-.015-.225.165-.42.42-.494 3.219-.51 4.687-3.835 4.747-3.97l.015-.015c.18-.345.215-.643.12-.868-.18-.435-.87-.66-1.33-.81-.135-.044-.255-.09-.345-.119-1.013-.405-1.243-.819-1.213-1.108.029-.345.36-.629.81-.823a.99.99 0 0 1 .42-.09c.18 0 .345.045.504.123.39.18.74.286 1.05.286.225 0 .405-.045.494-.09l-.029-.553c-.105-1.621-.225-3.654.3-4.847C7.875 1.054 11.245.78 12.206.78"/>
      </svg>
    );
    case "kick": return (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M3 3h6.5v4.5H14V3h6.5v6.5H16v4.5h4.5V21H14v-4.5H9.5V21H3z"/>
      </svg>
    );
    case "discord": return (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.893.077.077 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    );
    case "site": return <Globe className={c} aria-hidden />;
    default:     return <LinkIcon className={c} aria-hidden />;
  }
};

/** Brand-farge per plattform - bruk på hover på en pill om ønsket. */
export function platformBrandColor(label: string, url?: string): string {
  const p = detect(label, url);
  return {
    twitch:    "#9146FF",
    youtube:   "#FF0000",
    instagram: "#E4405F",
    tiktok:    "#000000",
    x:         "#000000",
    facebook:  "#1877F2",
    snapchat:  "#FFFC00",
    discord:   "#5865F2",
    kick:      "#53FC18",
    site:      "currentColor",
  }[p];
}

export default SocialIcon;
