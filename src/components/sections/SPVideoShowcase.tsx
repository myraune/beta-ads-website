import React, { useRef, useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Eye,
  MousePointerClick,
  MessageSquare,
} from "lucide-react";

/* ── Video Card with play/mute controls ── */

const VideoCard: React.FC<{
  src: string;
  poster?: string;
  title: string;
  description: string;
  badge: string;
}> = ({ src, poster, title, description, badge }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-lg group hover:shadow-xl transition-shadow duration-500">
      <div
        className="relative aspect-video bg-muted cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={muted}
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${
            playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            {playing ? (
              <Pause className="w-6 h-6 text-gray-900" />
            ) : (
              <Play className="w-6 h-6 text-gray-900 ml-0.5" />
            )}
          </div>
        </div>
        {playing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMuted(!muted);
              if (videoRef.current) videoRef.current.muted = !muted;
            }}
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        )}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
            {badge}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

/* ── Live Stream + Overlay Demo ── */

const LiveStreamDemo: React.FC = () => {
  const streamRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [viewerCount, setViewerCount] = useState(2847);
  const [chatMessages, setChatMessages] = useState<
    { user: string; msg: string; color: string }[]
  >([
    { user: "spacegamer98", msg: "Beste streameren!", color: "text-purple-400" },
    { user: "techviking", msg: "!shure", color: "text-green-400" },
    { user: "melissahitreskog", msg: "good stream!", color: "text-pink-400" },
  ]);

  // Simulate live viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((v) => v + Math.floor(Math.random() * 11) - 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulate new chat messages
  useEffect(() => {
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
  }, []);

  const togglePlay = () => {
    if (!streamRef.current) return;
    if (playing) {
      streamRef.current.pause();
    } else {
      streamRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.4) 50%, hsl(var(--primary)) 100%)",
        padding: "1.5px",
      }}
    >
      <div className="rounded-2xl overflow-hidden bg-gray-950">
        {/* Stream viewport */}
        <div className="relative aspect-video cursor-pointer" onClick={togglePlay}>
          {/* Base stream video */}
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

          {/* Samsung overlay — pops up in bottom-left corner of stream */}
          <div
            className={`absolute bottom-12 left-3 w-[40%] max-w-[280px] pointer-events-none z-10 transition-all duration-500 ${
              showOverlay
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95"
            }`}
          >
            <div
              className="relative"
              style={{
                filter: showOverlay ? "drop-shadow(0 0 20px hsl(var(--primary)/0.4)) drop-shadow(0 0 40px hsl(var(--primary)/0.15))" : "none",
                transition: "filter 0.5s ease",
              }}
            >
              <video
                src="/lovable-uploads/samsung-zfold7-overlay.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Twitch-style UI chrome */}
          <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
            <div className="flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </div>
            <div className="flex items-center gap-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
              <Eye className="w-3 h-3" />
              {viewerCount.toLocaleString()}
            </div>
          </div>

          {/* Play button */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              playing ? "opacity-0 hover:opacity-100" : "opacity-100"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              {playing ? (
                <Pause className="w-7 h-7 text-gray-900" />
              ) : (
                <Play className="w-7 h-7 text-gray-900 ml-1" />
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex items-end justify-between pointer-events-none">
            <div className="text-white text-xs">
              <span className="font-semibold">RubenGKS</span>
              <span className="text-white/60 ml-2">Playing: Fortnite</span>
            </div>
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMuted(!muted);
                  if (streamRef.current) streamRef.current.muted = !muted;
                }}
                className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                {muted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Controls bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-t border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-white text-sm font-semibold">
              Samsung Galaxy Z Fold7
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded font-medium transition-all duration-300 ${
                showOverlay
                  ? "bg-primary/20 text-primary"
                  : "bg-white/10 text-white/40"
              }`}
            >
              {showOverlay ? "Overlay Active" : "Overlay Inactive"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Polished toggle button */}
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className="relative flex items-center h-8 rounded-full transition-all duration-300 overflow-hidden"
              style={{
                width: "110px",
                background: showOverlay
                  ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/0.8))"
                  : "rgba(255,255,255,0.1)",
              }}
            >
              {/* Sliding knob */}
              <div
                className="absolute w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ease-out"
                style={{
                  left: showOverlay ? "calc(100% - 28px)" : "2px",
                  boxShadow: showOverlay ? "0 0 8px hsl(var(--primary)/0.5)" : "0 1px 3px rgba(0,0,0,0.3)",
                }}
              />
              {/* Label text */}
              <span
                className={`absolute text-[11px] font-medium transition-all duration-300 ${
                  showOverlay
                    ? "left-3 text-white"
                    : "right-3 text-white/50"
                }`}
              >
                {showOverlay ? "ON" : "OFF"}
              </span>
            </button>
          </div>
        </div>

        {/* Live chat simulation */}
        <div className="px-4 py-3 bg-gray-900/80 border-t border-white/5 max-h-28 overflow-hidden">
          <div className="flex items-center gap-1.5 mb-2">
            <MessageSquare className="w-3 h-3 text-white/40" />
            <span className="text-[10px] text-white/40 font-medium">
              Stream Chat
            </span>
          </div>
          <div className="space-y-1">
            {chatMessages.slice(-4).map((msg, i) => (
              <div
                key={`${msg.user}-${i}`}
                className="text-[11px] animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className={`font-semibold ${msg.color}`}>
                  {msg.user}
                </span>
                <span className="text-white/70">: {msg.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Animated counter that counts up on scroll ── */

const AnimCounter: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 });
  const [display, setDisplay] = useState("0");
  const numericPart = value.replace(/[^0-9.]/g, "");
  const suffix = value.replace(/[0-9.]/g, "");

  useEffect(() => {
    if (!isVisible) return;
    const target = parseFloat(numericPart);
    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = target * eased;

      if (target >= 100) {
        setDisplay(Math.floor(current).toLocaleString());
      } else {
        setDisplay(current.toFixed(target % 1 !== 0 ? 1 : 0));
      }

      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isVisible, numericPart]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="text-2xl font-bold text-foreground tabular-nums">
        {display}
        {suffix}
      </div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
};

/* ── Hover-reveal stat card ── */

const InteractiveStat: React.FC<{
  icon: React.ElementType;
  value: string;
  label: string;
  detail: string;
}> = ({ icon: Icon, value, label, detail }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-5 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-default group overflow-hidden"
      style={{
        background: hovered
          ? "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--primary)/0.05) 100%)"
          : "hsl(var(--card))",
      }}
    >
      {/* Subtle top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary)/0.5), transparent)",
          opacity: hovered ? 1 : 0,
        }}
      />
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered
              ? "linear-gradient(135deg, hsl(var(--primary)/0.2), hsl(var(--primary)/0.1))"
              : "hsl(var(--primary)/0.1)",
          }}
        >
          <Icon className="w-4.5 h-4.5 text-primary" />
        </div>
        <div>
          <div className="text-xl font-bold text-foreground">{value}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</div>
        </div>
      </div>
      <div
        className={`mt-3 text-xs text-muted-foreground leading-relaxed transition-all duration-300 overflow-hidden ${
          hovered ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {detail}
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
    <section ref={ref} className="py-20 md:py-32" aria-label="See it in action">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            See It Live
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            This is what it looks like
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Real overlay running on a real stream. Toggle the overlay on and off
            to see the difference. Click play to watch.
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

        {/* Interactive stats row */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <InteractiveStat
            icon={Eye}
            value="842K"
            label="Impressions"
            detail="Delivered across 48 Nordic streamers in the first 3 months of the Samsung campaign."
          />
          <InteractiveStat
            icon={MousePointerClick}
            value="4.8%"
            label="Avg CTR"
            detail="3-5x higher than traditional display ads. Overlays feel native to viewers."
          />
          <InteractiveStat
            icon={MessageSquare}
            value="5,219"
            label="Chat Mentions"
            detail="Organic brand mentions in Twitch chat during sponsored streams."
          />
          <InteractiveStat
            icon={Sparkles}
            value="0%"
            label="Adblock Rate"
            detail="Overlays render inside the stream itself — adblock can't touch them."
          />
        </div>

        {/* AI Clip + smaller video */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <VideoCard
            src="/lovable-uploads/ai-clip.mp4"
            title="AI-Powered Brand Mention Clipping"
            description="Our AI detects when creators say your brand name and automatically generates timestamped clips — delivered to your dashboard."
            badge="AI Feature"
          />

          {/* AI clipping detail card */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Every brand mention. Clipped automatically.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Our AI monitors every sponsored stream in real-time, detects
                when the creator says your brand name, and generates a
                timestamped clip — delivered to your dashboard within minutes.
              </p>
            </div>

            {/* Example clip quote */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 border border-border">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <img
                    src="/lovable-uploads/rubengks-profile.png"
                    alt="RubenGKS"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-foreground">
                    RubenGKS
                  </span>
                  <p className="text-[11px] text-muted-foreground italic truncate">
                    "...the Samsung S26 camera is insane for streaming..."
                  </p>
                </div>
                <span className="text-[10px] text-primary font-semibold whitespace-nowrap px-2 py-0.5 bg-primary/10 rounded-full">
                  Auto-clipped
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 border border-border opacity-60">
                <div className="w-8 h-8 rounded-full bg-muted shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-foreground">
                    DannizTV
                  </span>
                  <p className="text-[11px] text-muted-foreground italic truncate">
                    "...shout out to Shure for the MV6 mic, sounds amazing..."
                  </p>
                </div>
                <span className="text-[10px] text-primary font-semibold whitespace-nowrap px-2 py-0.5 bg-primary/10 rounded-full">
                  Auto-clipped
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
