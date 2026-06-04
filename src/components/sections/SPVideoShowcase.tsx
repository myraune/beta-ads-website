import React, { useRef, useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Play, Pause, Volume2, VolumeX, Settings, Maximize2 } from "lucide-react";

/* ── See It Live: a focused Twitch player demo ──
 *
 * Just the essentials - player + chat sidebar + channel info row, like
 * any live twitch.tv tab. Per CLAUDE.md "restraint is the skill" - no
 * fake Om/About/bio/panels chrome. The marketing point is to show
 * what the Samsung banner LOOKS LIKE in-stream; everything else is
 * decoration.
 *
 *  ┌──────────────────────────────────┬─────────────┐
 *  │ Stream player (16:9)             │ Chat        │
 *  │   + sponsored banner overlay     │  sidebar    │
 *  ├──────────────────────────────────┤             │
 *  │ Channel info row                 │             │
 *  │ (name · title · tags · Follow)   │             │
 *  └──────────────────────────────────┴─────────────┘
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
    { user: string; msg: string; color: string; badge: "sub" | "mod" | "vip" | null }[]
  >([
    { user: "spacegamer98", msg: "Beste streameren!", color: "text-purple-400", badge: "sub" },
    { user: "techviking", msg: "!shure", color: "text-green-400", badge: null },
    { user: "melissahitreskog", msg: "good stream!", color: "text-pink-400", badge: "vip" },
    { user: "nordicgamer", msg: "samsung > apple Kappa", color: "text-yellow-400", badge: null },
    { user: "traingeek06", msg: "nice overlay!", color: "text-red-400", badge: "sub" },
    { user: "darkwolf__", msg: "hva er priseen?", color: "text-orange-400", badge: null },
    { user: "haakon_no", msg: "skikkelig fin design", color: "text-cyan-400", badge: "sub" },
    { user: "kjellxx", msg: "PogChamp", color: "text-lime-400", badge: null },
    { user: "noobgamer22", msg: "@RubenGKS hvilken farge?", color: "text-rose-400", badge: null },
    { user: "skadewolf", msg: "tar den ASAP", color: "text-violet-400", badge: "mod" },
    { user: "lasanias_", msg: "samsung delivery er fast", color: "text-indigo-400", badge: null },
    { user: "mariekek", msg: "kjøpte fold7 i forrige uke 🔥", color: "text-fuchsia-400", badge: "sub" },
    { user: "andrxxx", msg: "Ruben hva tenker du om kameraet?", color: "text-amber-400", badge: null },
    { user: "elinkr", msg: "z fold7 er sjef", color: "text-sky-400", badge: "sub" },
    { user: "jonask_no", msg: "DET ER AMOLED 2X DAMN", color: "text-emerald-400", badge: null },
    { user: "petter12", msg: "kjøpte allerede en til mamma 😂", color: "text-teal-400", badge: "vip" },
    { user: "sondre__", msg: "Galaxy AI features ftw", color: "text-purple-400", badge: null },
    { user: "kasperh", msg: "samsung er bedre enn apple", color: "text-orange-400", badge: "sub" },
    { user: "minionhead", msg: "snart payday 💰", color: "text-rose-400", badge: null },
    { user: "vegard_n", msg: "har du fri shipping?", color: "text-cyan-400", badge: null },
    { user: "trondhjem", msg: "elsker stream'en din", color: "text-fuchsia-400", badge: "sub" },
    { user: "linndg", msg: "best stream of the day", color: "text-yellow-400", badge: "sub" },
    { user: "torkilhg", msg: "kjøpte fold7 forrige måned, sykt bra", color: "text-lime-400", badge: null },
    { user: "even_b", msg: "@noobgamer22 sølvgrå er best", color: "text-pink-400", badge: null },
    { user: "rubenh92", msg: "hva sier du om batteriet?", color: "text-violet-400", badge: "sub" },
    { user: "filiph", msg: "samsung pen er sjef", color: "text-amber-400", badge: null },
    { user: "marius__", msg: "lavest pris noen vet?", color: "text-blue-400", badge: null },
    { user: "anniken_", msg: "fold7 hvor mye gir batteriet?", color: "text-fuchsia-400", badge: "sub" },
    { user: "trondz", msg: "tror jeg bytter til samsung", color: "text-emerald-400", badge: "vip" },
    { user: "petter_n", msg: "kameraet er konge", color: "text-rose-400", badge: null },
    { user: "kjellrun", msg: "stream'en er fire", color: "text-cyan-400", badge: "sub" },
    { user: "henrikz", msg: "ruben spill litt rocket league?", color: "text-yellow-400", badge: null },
    { user: "thorehg", msg: "har Ultra og det er gud", color: "text-sky-400", badge: "sub" },
    { user: "amalieee", msg: "ER DEN VANNTETT?", color: "text-pink-400", badge: null },
    { user: "andersbb", msg: "@amalieee yes IP68 ratet", color: "text-purple-400", badge: "mod" },
    { user: "synnoeve", msg: "venter på 2026 modellen 😅", color: "text-teal-400", badge: null },
    { user: "olav_hg", msg: "samsung overlay ftw", color: "text-orange-400", badge: null },
    { user: "ingeborg__", msg: "ruben hvilken telefon har du", color: "text-violet-400", badge: "sub" },
    { user: "kristoffer", msg: "tar fold7 i sommer", color: "text-indigo-400", badge: null },
    { user: "didriksen", msg: "@kristoffer den ER sykt bra", color: "text-emerald-400", badge: "sub" },
    { user: "anniken_", msg: "ok kjøpte akkurat 🔥", color: "text-fuchsia-400", badge: "sub" },
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

  // Viewer count + chat ticker - only while playing
  useEffect(() => {
    if (!playing) return;
    const v = setInterval(
      () => setViewerCount((x) => x + Math.floor(Math.random() * 11) - 4),
      3000
    );
    const messages: { user: string; msg: string; color: string; badge: "sub" | "mod" | "vip" | null }[] = [
      { user: "streamerlife", msg: "need this phone!!", color: "text-blue-400", badge: "sub" },
      { user: "zeon_tv", msg: "where to buy?", color: "text-cyan-400", badge: null },
      { user: "spajKK", msg: "LET'S GO", color: "text-rose-400", badge: null },
      { user: "fjolsenfn", msg: "samsung gang PogChamp", color: "text-emerald-400", badge: "sub" },
      { user: "elias_no", msg: "z fold ser sykt ut", color: "text-orange-400", badge: null },
      { user: "ole_kjeldsen", msg: "@RubenGKS link?", color: "text-violet-400", badge: null },
      { user: "ingrid_", msg: "har fold7 selv 🔥", color: "text-fuchsia-400", badge: "sub" },
      { user: "vikingmaster", msg: "hvor mye?", color: "text-amber-400", badge: null },
      { user: "tommy_no", msg: "samsung > apple alltid", color: "text-teal-400", badge: "vip" },
      { user: "frkdani", msg: "kameraet er kongen", color: "text-purple-400", badge: null },
      { user: "morten12", msg: "byttet fra iphone, ANGRER IKKE", color: "text-pink-400", badge: "sub" },
      { user: "asbjorn_no", msg: "PRAHA tur?", color: "text-yellow-400", badge: null },
    ];
    let i = 0;
    const c = setInterval(() => {
      setChatMessages((prev) => [...prev.slice(-44), messages[i % messages.length]]);
      i++;
    }, 1800);
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
      className="rounded-xl overflow-hidden shadow-2xl border border-[#2f2f35] bg-[#0e0e10]"
    >
      {/* ─── TOP ROW: stream player on left, chat sidebar on right.
                     Fixed grid height locks both columns: player gets
                     stretched to fill (cropping the video via object-cover
                     to keep the look), chat gets capped so its messages
                     can't push the layout out of bounds. ─── */}
      <div className="grid lg:grid-cols-[1fr_340px] lg:h-[560px] overflow-hidden">
        {/* Player */}
        <div className="relative cursor-pointer bg-black h-full aspect-video lg:aspect-auto" onClick={togglePlay}>
          <video
            ref={streamRef}
            src="/lovable-uploads/rubengks-stream.mp4"
            muted={muted}
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            aria-label="RubenGKS Fortnite stream demo with a Samsung Galaxy Z Fold7 sponsored overlay"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {/* In-stream sponsored banner - animated webm at its natural aspect
              so the whole creative is visible (no cropping). w-[34%] on
              desktop, narrower on mobile so it doesn't dominate the player. */}
          <div className="absolute bottom-12 right-3 w-[26%] sm:w-[34%] max-w-[300px] pointer-events-none z-10 rounded-md overflow-hidden shadow-2xl ring-1 ring-white/15">
            <video
              ref={overlayRef}
              src={BANNER_WEBM}
              poster={BANNER_IMG}
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-auto block"
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

          {/* Player controls bar - primary controls (play/mute) bumped to 44×44 on
              mobile per WCAG 2.5.5 AA; sm:w-9 keeps the desktop player chrome compact. */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-3 pb-2 pt-8 pointer-events-none flex items-center justify-between">
            <div className="flex items-center gap-1 pointer-events-auto">
              <button
                aria-label={playing ? "Pause stream" : "Play stream"}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center text-white/85 hover:text-white"
              >
                {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                aria-label={muted ? "Unmute stream" : "Mute stream"}
                onClick={(e) => {
                  e.stopPropagation();
                  setMuted(!muted);
                  if (streamRef.current) streamRef.current.muted = !muted;
                }}
                className="w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center text-white/85 hover:text-white"
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center gap-1 pointer-events-auto">
              <button aria-label="Stream settings" className="w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center text-white/85 hover:text-white">
                <Settings className="w-4 h-4" />
              </button>
              <button aria-label="Fullscreen" className="w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center text-white/85 hover:text-white">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── Chat sidebar - INSIDE the grid so its height is locked to the
                player's aspect-video height. No empty space, no overflow. ─── */}
        <div className="bg-[#18181b] border-t lg:border-t-0 lg:border-l border-[#2f2f35] flex flex-col min-h-0 max-h-full">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#2f2f35] shrink-0">
            <span className="text-[13px] font-semibold text-white">Stream Chat</span>
            <span className="text-[11px] text-[#adadb8]">
              {viewerCount.toLocaleString()} chatters
            </span>
          </div>

          {/* Messages - flex-1 between header and pinned/input, overflow-hidden
              + justify-end keeps the latest at the bottom and trims the top
              like real Twitch chat. Show last 22 so the messages area is
              dense at 560px chat height without exceeding it. */}
          <div className="flex-1 flex flex-col justify-end px-3 py-2 overflow-hidden min-h-0">
            <div className="space-y-[3px]">
              {chatMessages.slice(-22).map((msg, i) => (
                <div key={`${msg.user}-${i}`} className="text-[12.5px] leading-snug">
                  {msg.badge === "sub" && (
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 mr-1 align-[-2px] rounded-[2px] bg-[#9146ff] text-white text-[8px] font-bold">
                      S
                    </span>
                  )}
                  {msg.badge === "mod" && (
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 mr-1 align-[-2px] rounded-[2px] bg-[#00ad03] text-white text-[8px] font-bold">
                      M
                    </span>
                  )}
                  {msg.badge === "vip" && (
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 mr-1 align-[-2px] rounded-[2px] bg-[#e005b9] text-white text-[8px] font-bold">
                      V
                    </span>
                  )}
                  <span className={`font-semibold ${msg.color}`}>{msg.user}</span>
                  <span className="text-[#efeff1]">: {msg.msg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pinned message from broadcaster (not a bot) */}
          <div className="mx-3 mb-2 px-3 py-2 rounded bg-[#1f1f23] shrink-0">
            <div className="text-[10px] text-[#adadb8] mb-1 flex items-center gap-1">
              <svg className="w-3 h-3 fill-[#adadb8]" viewBox="0 0 20 20">
                <path d="M3 5l4-2 4 2 4-2 4 2v10l-4 2-4-2-4 2-4-2V5z" />
              </svg>
              Pinned by RubenGKS
            </div>
            <div className="text-[12.5px] leading-snug">
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 mr-1 align-[-2px] rounded-[2px] bg-[#e9113e] text-white text-[8px] font-bold">
                ⚔
              </span>
              <span className="font-semibold text-[#9146ff]">RubenGKS</span>
              <span className="text-[#efeff1]">
                :{" "}
                Tusen takk Samsung 🔥{" "}
                <span className="text-[#bf94ff] underline cursor-pointer">samsung.com/s25ultra</span>
              </span>
            </div>
          </div>

          {/* Chat input */}
          <div className="px-3 pb-3 shrink-0">
            <div className="px-3 py-2 rounded-md bg-[#2f2f35] text-[12px] text-[#adadb8]">
              Send a message
            </div>
          </div>
        </div>
      </div>
      {/* /grid */}

      {/* ─── Channel info row - BELOW the grid, full width ─── */}
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
          <div className="text-[13px] text-white truncate">Samsung Galaxy S25 Ultra Launch - Fortnite</div>
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

      {/* ─── About section - BELOW the channel info, full width ─── */}
      <div className="bg-[#0e0e10] px-5 py-5 border-t border-[#2f2f35]">
        <div className="flex items-baseline gap-2 mb-2">
          <h3 className="text-white text-[15px] font-semibold">Om RubenGKS</h3>
          <span className="text-[12px] text-[#adadb8]">
            17.5K følgere · <span className="text-primary">Goon House</span>
          </span>
        </div>
        <p className="text-[12.5px] text-[#dedee3] leading-relaxed mb-4 max-w-2xl">
          Hei, jeg er RubenGKS - daglige Fortnite-streams fra Oslo. Sponset av Samsung
          Galaxy S25 Ultra denne måneden, og du finner alle mine socials i panelene under.
        </p>

        {/* Sponsored panel - same Samsung creative as the in-stream banner.
            max-w-sm to match a real Twitch sponsorship panel proportions. */}
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="group block rounded-md overflow-hidden bg-black ring-1 ring-[#2f2f35] hover:ring-[#4f4f55] transition-colors max-w-sm"
          aria-label="Samsung Galaxy S25 Ultra sponsored panel"
        >
          <div className="relative">
            <img
              src={BANNER_IMG}
              alt="Samsung Galaxy S25 Ultra"
              className="w-full h-auto block"
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
              <div className="text-[11px] text-[#adadb8] mt-0.5 truncate">samsung.com/s25ultra</div>
            </div>
            <span className="text-[11px] font-semibold text-primary group-hover:underline shrink-0 ml-3">
              Sjekk ut →
            </span>
          </div>
        </a>
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
          className={`max-w-2xl mb-8 md:mb-14 transition-all duration-700 ${
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
            A Samsung banner running in-stream on a real Norwegian Twitch channel -
            no mockups, no pre-rolls, no adblock interference.
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

        {/* Samsung campaign stats - from live data */}
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
