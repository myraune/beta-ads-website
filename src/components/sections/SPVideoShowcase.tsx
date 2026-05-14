import React, { useRef, useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

/* ── Live Stream + Overlay Demo ── */

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
  ]);

  // Auto-play when scrolled into view, pause when scrolled out
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Sync both to start together
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
          // Pause when out of view
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

  // Simulate live viewer count fluctuation — only tick while playing
  // (IntersectionObserver above sets `playing` true when in view). No point
  // burning main-thread work simulating a stream nobody is watching.
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setViewerCount((v) => v + Math.floor(Math.random() * 11) - 4);
    }, 3000);
    return () => clearInterval(interval);
  }, [playing]);

  // Simulate new chat messages — same visibility gate
  useEffect(() => {
    if (!playing) return;
    const messages = [
      { user: "streamerlife", msg: "need this phone!!", color: "text-blue-400" },
      { user: "nordicgamer", msg: "samsung > apple", color: "text-yellow-400" },
      { user: "traingeek06", msg: "nice overlay!", color: "text-red-400" },
      { user: "zeon_tv", msg: "where to buy?", color: "text-cyan-400" },
      { user: "spajKK", msg: "LET'S GO", color: "text-rose-400" },
      { user: "fjolsenfn", msg: "samsung gang", color: "text-emerald-400" },
    ];
    let i = 0;
    const interval = setInterval(() => {
      setChatMessages((prev) => [...prev.slice(-3), messages[i % messages.length]]);
      i++;
    }, 3500);
    return () => clearInterval(interval);
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
    <div ref={containerRef} className="rounded-xl overflow-hidden shadow-2xl border border-[#2f2f35]">
      {/* ── Video player area ── */}
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

        {/* Samsung overlay — bottom-left, synced with stream */}
        <div className="absolute bottom-10 left-3 w-[35%] max-w-[260px] pointer-events-none z-10">
          <video
            ref={overlayRef}
            src="/lovable-uploads/samsung-zfold7-overlay.webm"
            loop muted playsInline
            preload="metadata"
            className="w-full h-auto rounded shadow-xl"
          />
        </div>

        {/* LIVE badge + viewers — Twitch style */}
        <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
          <div className="flex items-center gap-1 bg-[#eb0400] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[3px] uppercase tracking-wide whitespace-nowrap">
            Live
          </div>
          <div className="flex items-center gap-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded-[3px] whitespace-nowrap">
            {viewerCount.toLocaleString()} viewers
          </div>
        </div>

        {/* Play overlay */}
        <div className={`absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity duration-200 ${
          playing ? "opacity-0 hover:opacity-100" : "opacity-100"
        }`}>
          <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
            {playing ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-0.5" />
            )}
          </div>
        </div>

        {/* Bottom controls bar — Twitch style */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-3 pb-2 pt-8 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                aria-label={muted ? "Unmute stream" : "Mute stream"}
                onClick={(e) => {
                  e.stopPropagation();
                  setMuted(!muted);
                  if (streamRef.current) streamRef.current.muted = !muted;
                }}
                className="w-11 h-11 -ml-2 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Channel info bar — like Twitch ── */}
      <div className="bg-[#0e0e10] px-4 py-3">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-[#9146ff]">
            <img src="/lovable-uploads/rubengks-profile.png" alt="RubenGKS" className="w-full h-full object-cover" />
          </div>
          {/* Channel info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-semibold">RubenGKS</span>
              <svg className="w-3.5 h-3.5 text-[#9146ff]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-1.75-1.75 3 3 0 01-5.304 0 3 3 0 00-1.75 1.75 3 3 0 010 5.304 3 3 0 001.75 1.75 3 3 0 015.304 0 3 3 0 001.75-1.75zm-7.403-2.652a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" /></svg>
            </div>
            <div className="text-[12px] text-[#adadb8] truncate">Playing Fortnite for 2.8K viewers</div>
          </div>
          {/* Sponsored badge */}
          <div className="shrink-0">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-primary/20 text-primary">
              Sponsored
            </span>
          </div>
        </div>
        {/* Tags */}
        <div className="flex items-center gap-1.5 mt-2 ml-[52px]">
          {["English", "Fortnite", "Sponsored"].map((tag) => (
            <span
              key={tag}
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                tag === "Sponsored" ? "bg-primary/20 text-primary" : "bg-[#2f2f35] text-[#adadb8]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Chat ── */}
      <div className="bg-[#18181b] px-4 py-2.5 border-t border-[#2f2f35]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-[#adadb8] font-semibold uppercase tracking-wide">Stream Chat</span>
          <span className="text-[10px] text-[#adadb8]">{viewerCount.toLocaleString()} chatters</span>
        </div>

        {/* Pinned CTA message — the auto-sent sponsored message */}
        <div className="mb-2 px-3 py-2 rounded-md bg-[#1f1f23] border-l-2 border-[#9146ff]">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-4 h-4 rounded-full bg-[#9146ff] flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">β</span>
            </div>
            <span className="text-[11px] font-semibold text-[#9146ff]">BetaAdsBot</span>
            <span className="text-[9px] text-[#adadb8] bg-[#2f2f35] px-1 rounded">BOT</span>
          </div>
          <div className="text-[11px] text-[#efeff1] leading-relaxed">
            📱 Check out the NEW Samsung Galaxy S25 Ultra → <span className="text-[#9146ff] underline cursor-pointer">samsung.com/s25ultra</span> #ad
          </div>
        </div>

        <div className="space-y-0.5">
          {chatMessages.slice(-4).map((msg, i) => (
            <div key={`${msg.user}-${i}`} className="text-[12px] leading-relaxed">
              <span className={`font-semibold ${msg.color}`}>{msg.user}</span>
              <span className="text-[#efeff1]">: {msg.msg}</span>
            </div>
          ))}
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
    <section ref={ref} className="py-16 md:py-24 border-t border-border" aria-label="See it in action">
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
            Real Samsung overlay running on a real Twitch stream.
            No mockups — this is what viewers actually see.
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
          className={`flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-3 py-6 transition-all duration-700 delay-200 ${
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
              <div className="text-lg md:text-xl font-bold text-foreground tabular-nums">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
