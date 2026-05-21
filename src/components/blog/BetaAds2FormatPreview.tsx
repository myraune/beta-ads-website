import { useState } from "react";
import { BarChart2, Layers, Zap, MessageSquare, MousePointer, TrendingUp } from "lucide-react";

const formats = [
  {
    id: "snipe",
    name: "Snipe",
    tag: "Most popular",
    tagColor: "text-emerald-400",
    icon: <Zap className="w-4 h-4" />,
    minBudget: "€3,500",
    ctr: "0.8–1.4%",
    desc: "A corner or bottom banner that appears at a timed moment during gameplay - brand logo, product name, quick CTA. Non-intrusive, impossible to block.",
    overlay: (
      <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 shadow-2xl animate-fade-in">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0 text-white font-bold text-sm">B</div>
        <div>
          <div className="text-white text-xs font-semibold leading-tight">Sponsored by Beta Ads</div>
          <div className="text-white/60 text-[11px]">Get 20% off - code STREAM</div>
        </div>
        <button className="ml-2 bg-primary text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg shrink-0">Shop</button>
      </div>
    ),
  },
  {
    id: "rich-media",
    name: "Rich Media",
    tag: "Highest CTR",
    tagColor: "text-primary",
    icon: <Layers className="w-4 h-4" />,
    minBudget: "€4,243",
    ctr: "1.0–2.8%",
    desc: "Full 1920×1080 animated overlay rendered directly in the stream frame - images, video, interactive elements. The highest-impact format on the platform.",
    overlay: (
      <div className="absolute inset-4 flex items-center justify-center">
        <div className="bg-black/75 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3 shadow-2xl max-w-xs w-full">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-white font-bold text-2xl">B</div>
          <div className="text-center">
            <div className="text-white font-bold text-base leading-tight mb-1">Live Streaming Ads<br/>That Actually Work</div>
            <div className="text-white/60 text-xs">Native overlays · Non-skippable · Verified delivery</div>
          </div>
          <button className="bg-primary text-white font-semibold text-sm px-6 py-2 rounded-full w-full">Book a Demo</button>
          <div className="text-white/30 text-[10px]">SPONSORED · beta-ads.no</div>
        </div>
      </div>
    ),
  },
  {
    id: "poll",
    name: "Poll",
    tag: "Engagement",
    tagColor: "text-blue-400",
    icon: <BarChart2 className="w-4 h-4" />,
    minBudget: "€4,243",
    ctr: "3–8% participation",
    desc: "An interactive poll rendered into the stream. Viewers vote in real-time on branded questions - results show live with vote counts. Drives active participation.",
    overlay: (
      <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-sm border border-white/10 rounded-2xl p-4 w-56 shadow-2xl">
        <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Sponsored Poll</div>
        <div className="text-white text-xs font-semibold mb-3">Which setup do you prefer?</div>
        {[
          { label: "Mechanical keyboard", pct: 64 },
          { label: "Membrane keyboard", pct: 36 },
        ].map((opt) => (
          <div key={opt.label} className="mb-2">
            <div className="flex justify-between text-[11px] text-white/70 mb-1">
              <span>{opt.label}</span><span>{opt.pct}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${opt.pct}%` }} />
            </div>
          </div>
        ))}
        <div className="text-white/30 text-[10px] mt-2 text-right">1,248 votes</div>
      </div>
    ),
  },
  {
    id: "interactive",
    name: "Interactive",
    tag: "Premium",
    tagColor: "text-violet-400",
    icon: <MousePointer className="w-4 h-4" />,
    minBudget: "€10,000",
    ctr: "Up to 4%",
    desc: "Full interactive overlay combining rich media with viewer participation - live chat integration, polls, CTAs, and branded elements all rendered simultaneously.",
    overlay: (
      <div className="absolute inset-0 flex items-end justify-end p-4">
        <div className="bg-black/80 backdrop-blur-md border border-violet-500/30 rounded-2xl p-4 w-64 shadow-2xl">
          <div className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">Interactive Experience</div>
          <div className="text-white text-xs font-semibold mb-3">Win a gaming setup worth €2,000</div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button className="bg-white/10 hover:bg-primary/30 border border-white/10 text-white text-[11px] font-medium rounded-lg py-2 transition-colors">!enter</button>
            <button className="bg-primary text-white text-[11px] font-semibold rounded-lg py-2">Join Now</button>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/50">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            347 participants live
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "chat-cta",
    name: "Chat CTA",
    tag: "Built for trust",
    tagColor: "text-amber-400",
    icon: <MessageSquare className="w-4 h-4" />,
    minBudget: "€3,500",
    ctr: "0.5–1.2%",
    desc: "A sponsored message pinned in stream chat - the streamer reads it aloud as a personal recommendation. Authentic, scripted by the brand, delivered by a creator the audience trusts.",
    overlay: null,
    chatHighlight: true,
  },
];

const streamBg = "/blog-photos/gaming/gaming-003.jpg";

const chatMessages = [
  { user: "xNinja", color: "text-purple-400", msg: "gg nice play" },
  { user: "StreamFan99", color: "text-green-400", msg: "let's gooo 🔥" },
  { user: "ProGamer", color: "text-red-400", msg: "how do you aim that fast" },
  { user: "ChillVibes", color: "text-cyan-400", msg: "POV: watching a god" },
  { user: "nordic_viewer", color: "text-blue-400", msg: "!info" },
];

const sponsoredChat = {
  user: "StreamBot",
  msg: "Use code STREAM for 20% off at beta-ads.no - limited offer for today's stream!",
};

export default function BetaAds2FormatPreview() {
  const [active, setActive] = useState(0);
  const fmt = formats[active];

  return (
    <div className="my-10 not-prose">
      {/* Format tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {formats.map((f, i) => (
          <button
            key={f.id}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              active === i
                ? "bg-primary border-primary text-white shadow-md shadow-primary/25"
                : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {f.icon}
            {f.name}
          </button>
        ))}
      </div>

      {/* Stream mockup */}
      <div className="rounded-2xl overflow-hidden border border-border shadow-xl bg-[#0e0e10]">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#18181b] border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-xs font-bold uppercase">Live</span>
            </div>
            <span className="text-white/40 text-xs">9,412 viewers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
            <span className="text-white/80 text-xs font-medium">EmmelieNova</span>
          </div>
        </div>

        <div className="flex">
          {/* Stream video + overlay */}
          <div className="flex-1 relative">
            <div className="relative aspect-video bg-black overflow-hidden">
              <img
                src={streamBg}
                alt="Stream background"
                className="w-full h-full object-cover opacity-80"
              />
              {/* Dark scan-line texture */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />
              {/* Format overlay */}
              {fmt.overlay}
            </div>

            {/* Format info strip */}
            <div className="bg-[#18181b] border-t border-white/5 px-4 py-3 flex items-center justify-between gap-4">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${fmt.tagColor}`}>{fmt.name}</span>
                <p className="text-white/55 text-xs mt-0.5 max-w-sm leading-relaxed">{fmt.desc}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[10px] text-white/30 uppercase tracking-wide mb-1">CTR range</div>
                <div className="text-white font-semibold text-sm">{fmt.ctr}</div>
                <div className="text-[10px] text-white/30 mt-1">From {fmt.minBudget}</div>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="w-56 bg-[#0e0e10] flex flex-col border-l border-white/5">
            <div className="px-3 py-2 border-b border-white/5">
              <span className="text-white/50 text-[11px] font-semibold uppercase tracking-wide">Stream Chat</span>
            </div>
            <div className="flex-1 p-3 space-y-2 overflow-hidden">
              {chatMessages.map((m, i) => (
                <div key={i} className="flex gap-1.5 text-xs">
                  <span className={`${m.color} font-medium shrink-0`}>{m.user}:</span>
                  <span className="text-white/70">{m.msg}</span>
                </div>
              ))}
              {fmt.chatHighlight && (
                <div className="bg-primary/15 border border-primary/25 rounded-lg p-2 mt-1">
                  <div className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">Sponsored</div>
                  <p className="text-white/80 text-[11px] leading-snug">{sponsoredChat.msg}</p>
                </div>
              )}
            </div>
            <div className="p-2 border-t border-white/5">
              <div className="bg-white/5 rounded px-2 py-1.5 text-white/20 text-[11px]">Send a message</div>
            </div>
          </div>
        </div>
      </div>

      {/* Format comparison strip */}
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
        {formats.map((f, i) => (
          <button
            key={f.id}
            onClick={() => setActive(i)}
            className={`p-3 rounded-xl border text-left transition-all duration-200 ${
              active === i ? "border-primary/40 bg-primary/5" : "border-border bg-card/50 hover:border-border/80"
            }`}
          >
            <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${active === i ? "text-primary" : "text-muted-foreground"}`}>
              {f.name}
            </div>
            <div className="text-xs font-medium text-foreground">{f.ctr}</div>
            <div className="text-[11px] text-muted-foreground">{f.minBudget}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
