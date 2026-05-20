import React, { useRef, useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Play, Pause, Volume2, VolumeX, Settings, Maximize2 } from "lucide-react";

/* ── See It Live: a Twitch channel page with a sponsored Samsung panel ──
 *
 * Layout philosophy (matches twitch.tv channel pages):
 *  ┌──────────────────────────────────┬─────────────┐
 *  │ Stream player (16:9)             │ Chat        │
 *  │   + sponsored banner overlay     │  sidebar    │
 *  ├──────────────────────────────────┤             │
 *  │ Channel info row                 │             │
 *  │ (name · title · tags · Follow)   │             │
 *  ├──────────────────────────────────┤             │
 *  │ Om RubenGKS                      │             │
 *  │  bio + sponsored panel image     │             │
 *  └──────────────────────────────────┴─────────────┘
 *
 * The Samsung banner (`samsung-fold7-banner.jpg`) is used as ONE single ad
 * creative. It appears twice: as a small in-stream overlay in the bottom-
 * right of the player, and as a full-width panel image in the About area.
 * Both are the same image and the same aspect ratio so the campaign reads
 * as consistent. The animated webm overlays the same image so it morphs
 * into motion while staying visually identical.
 */

const BANNER_IMG = "/lovable-uploads/samsung-fold7-banner.jpg";
const BANNER_WEBM = "/lovable-uploads/samsung-zfold7-overlay.webm";

const LiveStreamDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [viewerCount, setViewerCount] = useState(2847);
  const hasAutoPlayed = useRef(false);
  const [chatMessages, setChatMessages] = useState<
    { user: string; msg: string; color: string }[]
  >([
    { user: "spacegamer98", msg: "Beste streameren!", color: "text-purple-400" },
    { user: "techviking", msg: "!shure", color: "text-green-400" },
    { user: "melissahitreskog", msg: "good stream!", color: "text-pink-400" },
    { user: "nordicgamer", msg: "samsung > apple", color: "text-yellow-400" },
    { user: "traingeek06", msg: "nice overlay!", color: "text-red-400" },
  ]);

  // Auto-play when scrolled into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (streamRef.current) {
            if (!hasAutoPlayed.current) {
              streamRef.current.currentTime = 0;
              if (overlayRef.current) overlayRef.current.currentTime = 0;
              hasAutoPlayed.current = true;
            }
            streamRef.current.play().catch(() => {});
            overlayRef.current?.play().catch(() => {});
            setPlaying(true);
          }
        } else {
          streamRef.current?.pause();
          overlayRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Viewer count + chat ticker — only while playing
  useEffect(() => {
    if (!playing) return;
    const v = setInterval(
      () => setViewerCount((x) => x + Math.floor(Math.random() * 11) - 4),
      3000
    );
    const messages = [
      { user: "streamerlife", msg: "need this phone!!", color: "text-blue-400" },
      { user: "zeon_tv", msg: "where to buy?", color: "text-cyan-400" },
      { user: "spajKK", msg: "LET'S GO", color: "text-rose-400" },
      { user: "fjolsenfn", msg: "samsung gang", color: "text-emerald-400" },
      { user: "elias_no", msg: "z fold ser sykt ut", color: "text-orange-400" },
      { user: "mariekek", msg: "@RubenGKS link?", color: "text-violet-400" },
    ];
    let i = 0;
    const c = setInterval(() => {
      setChatMessages((prev) => [...prev.slice(-6), messages[i % messages.length]]);
      i++;
    }, 3500);
    return () => {
      clearInterval(v);
      clearInterval(c);
    };
  }, [playing]);

  const togglePlay = () => {
    if (!streamRef.current) return;
    if (playing) {
      streamRef.current.pause();
      overlayRef.current?.pause();
    } else {
      streamRef.current.play();
      overlayRef.current?.play();
    }
    setPlaying(!playing);
  };

  return (
    <div
      ref={containerRef}
      className="rounded-xl overflow-hidden shadow-2xl border border-[#2f2f35] bg-[#0e0e10] grid lg:grid-cols-[1fr_340px]"
    >
      {/* ─── LEFT COLUMN: stream player + channel meta + about ─── */}
      <div className="flex flex-col min-w-0">
        {/* Player */}
        <div className="relative aspect-video cursor-pointer bg-black" onClick={togglePlay}>
          <video
            ref={streamRef}
            src="/lovable-uploads/rubengks-stream.mp4"
            muted={muted}
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {/* In-stream sponsored banner — animated webm using the same image
              as its poster so the format is identical to the panel below */}
          <div
            className="absolute bottom-12 right-3 w-[34%] max-w-[300px] pointer-events-none z-10 overflow-hidden rounded-md shadow-2xl ring-1 ring-white/15"
            style={{ aspectRatio: "850 / 500" }}
          >
            <video
              ref={overlayRef}
              src={BANNER_WEBM}
              poster={BANNER_IMG}
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              aria-label="Samsung Galaxy S25 Ultra in-stream banner"
            />
          </div>

          {/* LIVE badge + viewer count */}
          <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
            <div className="flex items-center gap-1 bg-[#eb0400] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[3px] uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
              Live
            </div>
            <div className="bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded-[3px]">
              {viewerCount.toLocaleString()} viewers
            </div>
          </div>

          {/* Play overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity duration-200 ${
              playing ? "opacity-0 hover:opacity-100" : "opacity-100"
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
              {playing ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-0.5" />
              )}
            </div>
          </div>

          {/* Player controls bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-3 pb-2 pt-8 pointer-events-none flex items-center justify-between">
            <div className="flex items-center gap-1 pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-9 h-9 flex items-center justify-center text-white/85 hover:text-white"
              >
                {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMuted(!muted);
                  if (streamRef.current) streamRef.current.muted = !muted;
                }}
                className="w-9 h-9 flex items-center justify-center text-white/85 hover:text-white"
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center gap-1 pointer-events-auto">
              <button className="w-9 h-9 flex items-center justify-center text-white/85 hover:text-white">
                <Settings className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center text-white/85 hover:text-white">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Channel info — compact single row, matches twitch.tv */}
        <div className="bg-[#0e0e10] px-4 py-3 border-t border-[#2f2f35] flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-[#9146ff]">
            <img
              src="/lovable-uploads/rubengks-profile.png"
              alt="RubenGKS"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-white text-[15px] font-semibold">RubenGKS</span>
              <svg className="w-3.5 h-3.5 text-[#9146ff]" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-1.75-1.75 3 3 0 01-5.304 0 3 3 0 00-1.75 1.75 3 3 0 010 5.304 3 3 0 001.75 1.75 3 3 0 015.304 0 3 3 0 001.75-1.75zm-7.403-2.652a1 1 0 112 0 1 1 0 01-2 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-[13px] text-white truncate">Samsung Galaxy S25 Ultra Launch — Fortnite</div>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <span className="text-[10px] text-[#adadb8]">Fortnite</span>
              <span className="text-[10px] text-[#adadb8]">·</span>
              <span className="text-[10px] text-[#adadb8]">Norsk</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-primary/20 text-primary font-medium ml-1">
                Sponsored
              </span>
            </div>
          </div>
          <button className="text-[12px] font-semibold px-3.5 py-1.5 rounded bg-[#9146ff] text-white hover:bg-[#a970ff] transition-colors shrink-0">
            Follow
          </button>
        </div>

        {/* About area — bio + sponsored panel.
            The panel uses the SAME banner image at the SAME aspect ratio
            as the in-stream overlay, so the campaign reads as one
            consistent creative across both placements. */}
        <div className="bg-[#0e0e10] px-4 py-5 border-t border-[#2f2f35]">
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-white text-[15px] font-semibold">Om RubenGKS</h3>
            <span className="text-[12px] text-[#adadb8]">
              17.5K følgere · <span className="text-primary">Goon House</span>
            </span>
          </div>
          <p className="text-[13px] text-[#dedee3] leading-relaxed mb-4 max-w-2xl">
            Hei, jeg er RubenGKS. Følg meg for daglige Fortnite-streams fra Oslo.
            Sponset av Samsung Galaxy S25 Ultra denne måneden.
          </p>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="block group rounded-md overflow-hidden bg-black"
            aria-label="Samsung Galaxy S25 Ultra sponsored panel"
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "850 / 500" }}
            >
              <img
                src={BANNER_IMG}
                alt="Samsung Galaxy S25 Ultra"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded bg-black/70 text-white/95 uppercase tracking-wide backdrop-blur-sm">
                Sponsored
              </span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between bg-[#18181b]">
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-white truncate">
                  Samsung Galaxy S25 Ultra
                </div>
                <div className="text-[11px] text-[#adadb8] mt-0.5 truncate">
                  samsung.com/s25ultra
                </div>
              </div>
              <span className="text-[11px] font-semibold text-primary group-hover:underline shrink-0 ml-3">
                Sjekk ut →
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* ─── RIGHT COLUMN: chat sidebar (Twitch desktop) ─── */}
      <div className="bg-[#18181b] border-t lg:border-t-0 lg:border-l border-[#2f2f35] flex flex-col min-h-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2f2f35]">
          <span className="text-[13px] font-semibold text-white">Stream Chat</span>
          <span className="text-[11px] text-[#adadb8]">
            {viewerCount.toLocaleString()} chatters
          </span>
        </div>

        <div className="flex-1 px-3 py-2 space-y-1 overflow-hidden">
          {chatMessages.slice(-8).map((msg, i) => (
            <div key={`${msg.user}-${i}`} className="text-[12.5px] leading-relaxed">
              <span className={`font-semibold ${msg.color}`}>{msg.user}</span>
              <span className="text-[#efeff1]">: {msg.msg}</span>
            </div>
          ))}
        </div>

        <div className="mx-3 mb-3 px-3 py-2.5 rounded-md bg-[#1f1f23] border-l-2 border-primary">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
              <span className="text-[9px] text-white font-bold">β</span>
            </div>
            <span className="text-[11px] font-semibold text-primary">BetaAdsBot</span>
            <span className="text-[9px] text-[#adadb8] bg-[#2f2f35] px-1 rounded">PINNED</span>
          </div>
          <div className="text-[12px] text-[#efeff1] leading-relaxed">
            Sjekk ut Samsung Galaxy S25 Ultra →{" "}
            <span className="text-primary underline cursor-pointer">samsung.com/s25ultra</span>
          </div>
        </div>

        <div className="px-3 pb-3">
          <div className="px-3 py-2 rounded-md bg-[#2f2f35] text-[12px] text-[#adadb8]">
            Send a message
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===================================================
   VIDEO SHOWCASE SECTION
   =================================================== */

export const SPVideoShowcase: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 border-t border-border"
      aria-label="See it in action"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-8 md:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
            See It Live
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
            This is what it looks like
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A Samsung sponsorship running on a real Norwegian Twitch channel.
            One creative, two placements — in-stream during the broadcast and pinned to the panels area.
          </p>
        </div>

        {/* Main: Live stream + overlay demo */}
        <div
          className={`mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <LiveStreamDemo />
        </div>

        {/* Samsung campaign stats — from live data */}
        <div
          className={`flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-3 py-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {[
            { value: "500K+", label: "completed views" },
            { value: "2.93%", label: "avg CTR" },
            { value: "14,642", label: "link clicks" },
            { value: "43", label: "streamers" },
            { value: "0%", label: "adblock rate" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-lg md:text-xl font-bold text-foreground tabular-nums">
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
