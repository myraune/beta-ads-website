import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, ScanLine, MessageSquare } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// ── Inline stat ───────────────────────────────────────────────────────────
function InlineStat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <p className="text-base font-bold text-foreground tracking-tight leading-none">
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ── Static dashboard preview ──────────────────────────────────────────────
function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/40 shadow-2xl shadow-black/10">
      <img
        src="/lovable-uploads/clip-analytics-preview-clean.jpg"
        alt="Clip Analytics dashboard - ad detection, brand safety and brand mention metrics"
        className="w-full h-auto block"
        loading="lazy"
      />
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export function SPClipAnalyticsPreview() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: text */}
          <div
            ref={ref}
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Platform
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
              Every impression verified.
              <br />
              <span
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="italic font-normal"
              >
                Automatically.
              </span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
              Clip Analytics processes every stream clip in real time, checking
              whether your ad showed up, whether the content was brand-safe,
              and whether streamers mentioned you by name. No screenshots. No
              manual reviews.
            </p>

            <div className="flex flex-col gap-4 mb-9">
              <InlineStat
                icon={ScanLine}
                value="98.0%"
                label="Ad detection accuracy across all processed clips"
              />
              <InlineStat
                icon={ShieldCheck}
                value="80.0%"
                label="Clips classified as brand-safe, with full risk breakdown"
              />
              <InlineStat
                icon={MessageSquare}
                value="34.5%"
                label="Streamer brand mention rate on sponsored streams"
              />
            </div>

            <Link
              to="/blog/clip-analytics-ad-verification-nordic-streaming"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Explore Clip Analytics <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: scaled live dashboard preview */}
          <div
            className={`transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
