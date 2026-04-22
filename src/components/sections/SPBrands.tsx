import React, { useEffect, useState, useCallback } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "@/components/ui/video-player";

/* ── Two rows of logos, scrolling in opposite directions (ColdIQ-style) ── */

type BadgeType = "case-study" | "review" | "video";

interface ReportMetric {
  label: string;
  value: string;
}

interface ReportStreamer {
  name: string;
  avatar?: string;
}

interface CampaignReport {
  brandName: string;
  brandLogo: string;
  dateRange: string;
  metrics: ReportMetric[];
  topStreamers?: { byView: ReportStreamer[]; byEngagement: ReportStreamer[] };
  topCategories?: { byView: string[]; byEngagement: string[] };
  chatKeywords?: string[];
  chatStats?: { uniqueStreamers: number; uniqueChatters: number; brandMentions: number };
}

interface LogoData {
  src: string;
  alt: string;
  badge?: BadgeType;
  /** Video file path (e.g. /videos/logitech.mp4) or external URL */
  videoSrc?: string;
  /** Quote shown in the hover popup */
  quote?: string;
  /** Name of the person giving the quote */
  quoteName?: string;
  /** Title/role of the person */
  quoteTitle?: string;
  /** Avatar image URL */
  quoteAvatar?: string;
  /** Link to case study page (e.g. /case-study/glorious) */
  caseStudyLink?: string;
  /** Campaign report data for popup */
  reportData?: CampaignReport;
}

const badgeLabels: Record<BadgeType, string> = {
  "case-study": "Case study",
  "review": "Review",
  "video": "Video",
};

const row1: LogoData[] = [
  { src: "/lovable-uploads/logo-client-1.png", alt: "Samsung", badge: "case-study", caseStudyLink: "/case-study/samsung" },
  { src: "/lovable-uploads/wpp-media-logo.png", alt: "WPP Media" },
  {
    src: "/lovable-uploads/logo-foodora.png", alt: "Foodora",
    badge: "video",
    videoSrc: "/lovable-uploads/foodora-campaign-video.mp4",
  },
  {
    src: "/lovable-uploads/logo-shure.png", alt: "Shure",
    badge: "video",
    videoSrc: "/lovable-uploads/shure-campaign-video.mp4",
  },
  {
    src: "/lovable-uploads/logo-saily.png", alt: "Saily",
    badge: "video",
    videoSrc: "/lovable-uploads/saily-campaign-video.mp4",
  },
  {
    src: "/lovable-uploads/logo-glorious.png", alt: "Glorious",
    badge: "case-study",
    caseStudyLink: "/case-study/glorious",
    quote: "The overlay ads felt completely native to the stream — our audience loved it.",
    quoteName: "Brand Manager",
    quoteTitle: "Glorious",
  },
  { src: "/lovable-uploads/logo-client-8.png", alt: "Publicis" },
];

const row2: LogoData[] = [
  {
    src: "/lovable-uploads/logo-logitech.png", alt: "Logitech",
    badge: "video",
    videoSrc: "/videos/logitech-case-study.mp4",
  },
  {
    src: "/lovable-uploads/logo-gokstad.webp", alt: "Gokstad Akademiet",
    badge: "case-study",
    caseStudyLink: "/case-study/gokstad",
    quote: "22 creators, 49 categories, 1.22% CTR — native stream ads recruited the next generation of IT students.",
    quoteName: "Recruitment Team",
    quoteTitle: "Gokstad Akademiet",
  },
  { src: "/lovable-uploads/logo-komplett.png", alt: "Komplett" },
  { src: "/lovable-uploads/logo-dentsu.png", alt: "Dentsu" },
  { src: "/lovable-uploads/logo-carat.png", alt: "Carat" },
  {
    src: "/lovable-uploads/logo-steelseries.png", alt: "SteelSeries",
    badge: "review",
    quote: "Working with Beta Ads was seamless. The platform handles everything from streamer selection to reporting.",
    quoteName: "Partnerships",
    quoteTitle: "SteelSeries",
  },
  {
    src: "/lovable-uploads/logo-surfshark.png", alt: "Surfshark",
    badge: "video",
    videoSrc: "/lovable-uploads/surfshark-campaign-video.mp4",
  },
  { src: "/lovable-uploads/wal-logo.png", alt: "WAL" },
];

/* ── Video Modal ── */
const VideoModal: React.FC<{
  videoSrc: string;
  brandName: string;
  onClose: () => void;
}> = ({ videoSrc, brandName, onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in-0 duration-200" />

      {/* Modal content */}
      <div
        className="relative w-full max-w-4xl animate-in fade-in-0 zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1.5"
        >
          <span>Close</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Brand label */}
        <div className="absolute -top-10 left-0 text-white/50 text-sm font-medium">
          {brandName}
        </div>

        {/* Video player */}
        <VideoPlayer src={videoSrc} className="shadow-2xl" />
      </div>
    </div>
  );
};

/* ── Campaign Report Modal ── */
const CampaignReportModal: React.FC<{
  report: CampaignReport;
  onClose: () => void;
  onViewCaseStudy?: () => void;
}> = ({ report, onClose, onViewCaseStudy }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in-0 duration-200" />

      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300 rounded-2xl bg-background border border-border/50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={report.brandLogo} alt={report.brandName} className="h-8 w-auto object-contain" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">{report.brandName}</h3>
              <p className="text-[11px] text-muted-foreground">{report.dateRange}</p>
            </div>
          </div>
          {/* aria-label added: icon-only button needs accessible label for screen readers */}
          <button
            onClick={onClose}
            aria-label="Close report"
            className="p-1.5 rounded-full hover:bg-foreground/5 transition-colors text-muted-foreground hover:text-foreground"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-6">
          {/* Key Metrics Grid */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Key Metrics</h4>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {report.metrics.map((m) => (
                <div key={m.label} className="bg-foreground/[0.03] border border-border/30 rounded-xl px-3 py-2.5">
                  <p className="text-[10px] text-primary font-medium uppercase tracking-wide">{m.label}</p>
                  <p className="text-lg font-bold text-foreground mt-0.5">{m.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Streamers & Categories */}
          {(report.topStreamers || report.topCategories) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.topStreamers && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Top Streamers</h4>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div>
                      <p className="text-[10px] text-primary font-medium mb-1">by View</p>
                      {report.topStreamers.byView.map((s) => (
                        <p key={s.name} className="text-xs text-foreground py-0.5">{s.name}</p>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] text-primary font-medium mb-1">by Engagement</p>
                      {report.topStreamers.byEngagement.map((s) => (
                        <p key={s.name} className="text-xs text-foreground py-0.5">{s.name}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {report.topCategories && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Top Categories</h4>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div>
                      <p className="text-[10px] text-primary font-medium mb-1">by View</p>
                      {report.topCategories.byView.map((c) => (
                        <p key={c} className="text-xs text-foreground py-0.5">{c}</p>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] text-primary font-medium mb-1">by Engagement</p>
                      {report.topCategories.byEngagement.map((c) => (
                        <p key={c} className="text-xs text-foreground py-0.5">{c}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chat Engagement */}
          {report.chatStats && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Chat Engagement</h4>
              <div className="flex gap-4 mb-3">
                <div className="bg-foreground/[0.03] border border-border/30 rounded-xl px-3 py-2">
                  <p className="text-[10px] text-primary font-medium">Unique Streamers</p>
                  <p className="text-lg font-bold text-foreground">{report.chatStats.uniqueStreamers}</p>
                </div>
                <div className="bg-foreground/[0.03] border border-border/30 rounded-xl px-3 py-2">
                  <p className="text-[10px] text-primary font-medium">Unique Chatters</p>
                  <p className="text-lg font-bold text-foreground">{report.chatStats.uniqueChatters}</p>
                </div>
                <div className="bg-foreground/[0.03] border border-border/30 rounded-xl px-3 py-2">
                  <p className="text-[10px] text-primary font-medium">Brand Mentions</p>
                  <p className="text-lg font-bold text-foreground">{report.chatStats.brandMentions.toLocaleString()}</p>
                </div>
              </div>
              {report.chatKeywords && (
                <div className="flex flex-wrap gap-1.5">
                  {report.chatKeywords.map((kw) => (
                    <span key={kw} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          {onViewCaseStudy && (
            <button
              onClick={onViewCaseStudy}
              className="w-full py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              View Full Case Study
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Logo with badge + hover tooltip ── */
const LogoWithBadge: React.FC<{
  logo: LogoData;
  logoFilter: string;
  onOpenVideo: (logo: LogoData) => void;
  onOpenReport: (logo: LogoData) => void;
}> = ({ logo, logoFilter, onOpenVideo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (logo.videoSrc) {
      onOpenVideo(logo);
    } else if (logo.caseStudyLink) {
      navigate(logo.caseStudyLink);
    }
  };

  const hasAction = !!(logo.videoSrc || logo.caseStudyLink);

  return (
    <div
      className={`flex-shrink-0 flex flex-col items-center justify-center h-14 w-28 relative ${hasAction ? "cursor-pointer" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={hasAction ? handleClick : undefined}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        decoding="async"
        className={`max-h-7 max-w-[100px] w-auto h-auto object-contain transition-[opacity,transform] duration-300 ${
          isHovered && logo.badge ? "opacity-80 scale-110" : "opacity-35"
        }`}
        style={{ filter: logoFilter }}
      />
      {logo.badge && (
        <button
          onClick={hasAction ? handleClick : undefined}
          className="mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wide transition-[transform,opacity,background-color] duration-200 hover:scale-105 bg-primary text-white border-none cursor-pointer"
        >
          {badgeLabels[logo.badge]}
        </button>
      )}

      {/* Hover tooltip — shows quote + CTA for case studies */}
      {isHovered && logo.quote && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 rounded-xl bg-card border border-border shadow-xl z-50 pointer-events-none animate-fade-in">
          <p className="text-[11px] text-muted-foreground leading-relaxed italic mb-2">
            "{logo.quote}"
          </p>
          {logo.quoteName && (
            <p className="text-[10px] text-foreground font-medium">
              — {logo.quoteName}, {logo.quoteTitle}
            </p>
          )}
          {logo.caseStudyLink && (
            <p className="text-[10px] text-primary font-semibold mt-2">
              Read case study →
            </p>
          )}
          {logo.videoSrc && (
            <p className="text-[10px] text-primary font-semibold mt-2">
              Watch video →
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const MarqueeRow: React.FC<{
  logos: LogoData[];
  reverse?: boolean;
  logoFilter: string;
  onOpenVideo: (logo: LogoData) => void;
  onOpenReport: (logo: LogoData) => void;
}> = ({ logos, reverse = false, logoFilter, onOpenVideo, onOpenReport }) => {
  const tripled = [...logos, ...logos, ...logos];

  return (
    <div className="group relative overflow-hidden py-5">
      <div
        className={`flex items-center gap-16 w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
      >
        {tripled.map((logo, i) => (
          <LogoWithBadge
            key={`${logo.alt}-${i}`}
            logo={logo}
            logoFilter={logoFilter}
            onOpenVideo={onOpenVideo}
            onOpenReport={onOpenReport}
          />
        ))}
      </div>
    </div>
  );
};

export const SPBrands: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [activeVideo, setActiveVideo] = useState<LogoData | null>(null);
  const [activeReport, setActiveReport] = useState<LogoData | null>(null);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const logoFilter = isDark ? "brightness(0) invert(1)" : "brightness(0)";

  const handleOpenVideo = useCallback((logo: LogoData) => {
    setActiveVideo(logo);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setActiveVideo(null);
  }, []);

  const handleOpenReport = useCallback((logo: LogoData) => {
    setActiveReport(logo);
  }, []);

  const handleCloseReport = useCallback(() => {
    setActiveReport(null);
  }, []);

  return (
    <>
      <section
        ref={ref}
        className="py-8 md:py-12 overflow-hidden"
        aria-label="Trusted brands"
      >
        <div
          className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {/* SEO fix: h2 instead of p for proper heading hierarchy — visually unchanged */}
          <h2 className="text-center text-xs font-medium text-muted-foreground mb-4 tracking-widest uppercase">
            Trusted by 50+ brands & agencies
          </h2>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <MarqueeRow logos={row1} logoFilter={logoFilter} onOpenVideo={handleOpenVideo} onOpenReport={handleOpenReport} />
            <MarqueeRow logos={row2} reverse logoFilter={logoFilter} onOpenVideo={handleOpenVideo} onOpenReport={handleOpenReport} />
          </div>
        </div>
      </section>

      {/* Video modal */}
      {activeVideo?.videoSrc && (
        <VideoModal
          videoSrc={activeVideo.videoSrc}
          brandName={activeVideo.alt}
          onClose={handleCloseVideo}
        />
      )}

      {/* Campaign report modal */}
      {activeReport?.reportData && (
        <CampaignReportModal
          report={activeReport.reportData}
          onClose={handleCloseReport}
          onViewCaseStudy={
            activeReport.caseStudyLink
              ? () => {
                  handleCloseReport();
                  navigate(activeReport.caseStudyLink!);
                }
              : undefined
          }
        />
      )}
    </>
  );
};
