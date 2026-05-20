import React, { useRef, useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Play, Pause, Volume2, VolumeX, Settings, Maximize2 } from "lucide-react";

/* ── Live Stream + Overlay Demo — true Twitch desktop layout ── */

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
    const v = setInterval(() => setViewerCount((x) => x + Math.floor(Math.random() * 11) - 4), 3000);
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
    return () => { clearInterval(v); clearInterval(c); };
  }, [playing]);

  const togglePlay = () => {
    if (!streamRef.current) return;
    if (playing) { streamRef.current.pause(); overlayRef.current?.pause(); }
    else { streamRef.current.play(); overlayRef.current?.play(); }
    setPlaying(!playing);
  };

  return (
    <div
      ref={containerRef}
      className="rounded-xl overflow-hidden shadow-2xl border border-[#2f2f35] bg-[#0e0e10] grid lg:grid-cols-[1fr_340px]"
    >
      {/* ─── LEFT: Stream player + channel info ─── */}
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

          {/* LIVE badge + viewers — Twitch style top-left */}
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
              {playing ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-0.5" />}
            </div>
          </div>

          {/* Twitch-style player controls bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-3 pb-2 pt-8 pointer-events-none flex items-center justify-between">
            <div className="flex items-center gap-1 pointer-events-auto">
              <button
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
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

        {/* Channel info bar */}
        <div className="bg-[#0e0e10] px-4 py-3 border-t border-[#2f2f35]">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-[#9146ff]">
              <img src="/lovable-uploads/rubengks-profile.png" alt="RubenGKS" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-white text-base font-semibold">RubenGKS</span>
                <svg className="w-3.5 h-3.5 text-[#9146ff]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-1.75-1.75 3 3 0 01-5.304 0 3 3 0 00-1.75 1.75 3 3 0 010 5.304 3 3 0 001.75 1.75 3 3 0 015.304 0 3 3 0 001.75-1.75zm-7.403-2.652a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-[13px] text-white font-medium mt-0.5">Samsung Galaxy S25 Ultra Launch — Fortnite gameplay</div>
              <div className="text-[12px] text-[#adadb8] mt-1">Playing Fortnite for {viewerCount.toLocaleString()} viewers</div>
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
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
            <div className="shrink-0 flex flex-col items-end gap-1">
              <button className="text-[11px] font-semibold px-3 py-1 rounded bg-[#9146ff] text-white hover:bg-[#a970ff] transition-colors">
                Follow
              </button>
              <button className="text-[11px] font-semibold px-3 py-1 rounded bg-[#2f2f35] text-white hover:bg-[#3f3f45] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ─── About / Panels section — Samsung banner lives HERE like a real Twitch panel ─── */}
        <div className="bg-[#0e0e10] px-4 py-5 border-t border-[#2f2f35]">
          {/* About header */}
          <div className="flex items-center gap-1.5 mb-3">
            <h3 className="text-white text-sm font-semibold">Om RubenGKS</h3>
            <svg className="w-3.5 h-3.5 text-[#9146ff]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-1.75-1.75 3 3 0 01-5.304 0 3 3 0 00-1.75 1.75 3 3 0 010 5.304 3 3 0 001.75 1.75 3 3 0 015.304 0 3 3 0 001.75-1.75zm-7.403-2.652a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-[11px] text-[#adadb8] mb-3">
            <span className="text-white font-semibold">17.5K følgere</span> · <span className="text-primary">Sponsored by Samsung</span>
          </div>
          <p className="text-[12px] text-[#adadb8] leading-relaxed mb-4 max-w-xl">
            Norsk Twitch-streamer fra Oslo. Spiller Fortnite, Valorant og Just Chatting.
            Følg meg for daglige streams og samarbeid med merker som Samsung.
          </p>

          {/* Sponsored panel — the animated Samsung banner */}
          <div className="rounded-md overflow-hidden ring-1 ring-[#2f2f35] bg-[#18181b] max-w-md">
            <video
              ref={overlayRef}
              src="/lovable-uploads/samsung-zfold7-overlay.webm"
              loop
              muted
              playsInline
              preload="auto"
              poster="/lovable-uploads/samsung-fold7-banner.jpg"
              className="w-full h-auto block"
              aria-label="Samsung Galaxy S25 Ultra animated banner"
            />
            <div className="flex items-center justify-between px-3 py-2 border-t border-[#2f2f35]">
              <span className="text-[10px] font-semibold text-white">Galaxy S25 Ultra</span>
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-primary/20 text-primary uppercase tracking-wide">
                Sponsored
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT: Chat sidebar (desktop only — stacks below on mobile) ─── */}
      <div className="bg-[#18181b] border-t lg:border-t-0 lg:border-l border-[#2f2f35] flex flex-col min-h-0">
        {/* Chat header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2f2f35]">
          <span className="text-[13px] font-semibold text-white">Stream Chat</span>
          <span className="text-[11px] text-[#adadb8]">{viewerCount.toLocaleString()} chatters</span>
        </div>

        {/* Chat messages */}
        <div className="flex-1 px-3 py-2 space-y-1 overflow-hidden">
          {chatMessages.slice(-8).map((msg, i) => (
            <div key={`${msg.user}-${i}`} className="text-[12.5px] leading-relaxed">
              <span className={`font-semibold ${msg.color}`}>{msg.user}</span>
              <span className="text-[#efeff1]">: {msg.msg}</span>
            </div>
          ))}
        </div>

        {/* Pinned sponsored message — at bottom, pinned above the input */}
        <div className="mx-3 mb-3 px-3 py-2.5 rounded-md bg-[#1f1f23] border-l-2 border-primary">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
              <span className="text-[9px] text-white font-bold">β</span>
            </div>
            <span className="text-[11px] font-semibold text-primary">BetaAdsBot</span>
            <span className="text-[9px] text-[#adadb8] bg-[#2f2f35] px-1 rounded">PINNED</span>
          </div>
          <div className="text-[12px] text-[#efeff1] leading-relaxed">
            Check out the new Samsung Galaxy S25 Ultra →{" "}
            <span className="text-primary underline cursor-pointer">samsung.com/s25ultra</span>
          </div>
        </div>

        {/* Chat input mock */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#2f2f35] text-[12px] text-[#adadb8]">
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
            A Samsung snipe banner running on a real Norwegian Twitch stream.
            No mockups — this is what 2,800+ viewers see.
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
              <div className="text-lg md:text-xl font-bold text-foreground tabular-nums">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
