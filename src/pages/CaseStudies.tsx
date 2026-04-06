import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { SPFooter } from '@/components/sections/SPFooter';
import { Play, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { DraggableRope } from "@/components/ui/gsap-draggable-rope";
import { Button } from "@/components/ui/button";

interface CaseStudiesProps {
  t: any;
}

// Samsung is first — most prominent campaign
const caseStudies = [
  { id: "Uw7IIecicB4", brand: "Samsung", campaign: "S25 Ultra Awareness Norway", impressions: "500,131", impressionsNum: 500131, ctr: "2.93%", ctrNum: 2.93, description: "Premium awareness campaign for Samsung's flagship smartphone launch across Norwegian Twitch streamers. Zero adblock impact." },
  { id: "IZOx_VMdJJg", brand: "Shure", campaign: "MV7+ Microphone Launch", impressions: "320,000+", impressionsNum: 320000, ctr: "2.45%", ctrNum: 2.45, description: "Creator-focused campaign showcasing premium audio equipment to streaming audiences." },
  { id: "ufNq-A4d7iA", brand: "Komplett", campaign: "Monthly Gaming Deals", impressions: "150,000+", impressionsNum: 150000, ctr: "3.24%", ctrNum: 3.24, description: "Recurring promotion campaign driving traffic to gaming hardware deals." },
  { id: "DMz-NV1W_Is", brand: "Saily", campaign: "E-SIM Campaign Norway", impressions: "280,000+", impressionsNum: 280000, ctr: "2.67%", ctrNum: 2.67, description: "Travel-focused campaign targeting young, mobile-first audiences." },
  { id: "U6i5uvhk2Sw", brand: "Surfshark", campaign: "VPN Awareness Nordic", impressions: "420,000+", impressionsNum: 420000, ctr: "2.81%", ctrNum: 2.81, description: "Privacy and security messaging tailored for gaming communities." },
  { id: "GwE4dagRm_k", brand: "Kristiania", campaign: "University Recruitment", impressions: "600,000+", impressionsNum: 600000, ctr: "2.00%", ctrNum: 2.0, description: "Student recruitment campaign reaching Gen Z through their favorite streamers." },
  { id: "aE0-S8GC1Iw", brand: "M3panel", campaign: "Research Panel Signup", impressions: "180,000+", impressionsNum: 180000, ctr: "3.45%", ctrNum: 3.45, description: "Direct response campaign driving panel signups with incentive offers." },
  { id: "swu_ye12IHs", brand: "Norstat", campaign: "Survey Participation Drive", impressions: "210,000+", impressionsNum: 210000, ctr: "2.92%", ctrNum: 2.92, description: "Engagement campaign encouraging survey participation among young demographics." },
];

const detailedCaseStudies = [
  {
    brand: "Samsung",
    title: "Galaxy S25 Ultra & Z Fold7 — Norwegian Twitch",
    description: "Two smartphone launches in 2025. Rich media overlays across 43 + 28 Norwegian streamer slots, 800K live + 558K+ VOD views, zero adblock impact on both campaigns.",
    stats: [
      { label: "Combined views", value: "~1.35M" },
      { label: "CTR range", value: "2.34–2.93%" },
      { label: "Streamer slots", value: "43+28" },
      { label: "Adblock %", value: "0%" },
    ],
    image: "https://img.youtube.com/vi/Uw7IIecicB4/maxresdefault.jpg",
    link: "/case-study/samsung",
  },
  {
    brand: "Glorious",
    title: "How Glorious Reached the Nordic Gaming Community",
    description: "Glorious used Beta's Rich Media Overlays to connect with audiences across Finland, Norway, and Sweden with localised creative assets in 3 languages.",
    stats: [
      { label: "Total views", value: "137K+" },
      { label: "Creators", value: "25" },
      { label: "Categories", value: "112" },
      { label: "Countries", value: "3" },
    ],
    image: "https://storage.googleapis.com/livad-blog/3292/3669942.gif",
    link: "/case-study/glorious",
  },
  {
    brand: "Gokstad Akademiet",
    title: "Introducing the Academy to Future IT Professionals",
    description: "The campaign successfully introduced the academy to potential students through 22 creators across 49 live stream categories.",
    stats: [
      { label: "Views", value: "100K+" },
      { label: "CTR", value: "1.22%" },
      { label: "Creators", value: "22" },
      { label: "Categories", value: "49" },
    ],
    image: "https://storage.googleapis.com/ad-gifs/3790920.gif",
    link: "/case-study/gokstad",
  },
];

const VideoModal: React.FC<{ videoId: string | null; onClose: () => void }> = ({ videoId, onClose }) => (
  <Dialog open={!!videoId} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="max-w-5xl w-[95vw] p-0 bg-transparent border-none overflow-hidden shadow-none">
      <DialogTitle className="sr-only">Case Study Video</DialogTitle>
      <DialogDescription className="sr-only">Watch the full campaign breakdown</DialogDescription>
      <AnimatePresence>
        {videoId && (
          <motion.div
            className="relative w-full rounded-2xl overflow-hidden bg-black shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="Case Study Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DialogContent>
  </Dialog>
);

const CaseStudies: React.FC<CaseStudiesProps> = ({ t }) => {
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);
  const [caseStudyIndex, setCaseStudyIndex] = useState(0);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: videosRef, isVisible: videosVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const { ref: detailedRef, isVisible: detailedVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const navigateCaseStudy = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCaseStudyIndex(prev => prev === 0 ? caseStudies.length - 1 : prev - 1);
    } else {
      setCaseStudyIndex(prev => prev === caseStudies.length - 1 ? 0 : prev + 1);
    }
  };

  return (
    <div className="min-h-screen">
      <DraggableRope ropeHeight={200} iconSize={80} />
      <SEO
        title="Case Studies | Beta Ads"
        description="See real campaign results from Samsung, Shure, Surfshark, Glorious, Gokstad Akademiet and more. Native Twitch overlay advertising case studies with impressions, CTR and ROI data."
        canonical="/case-studies"
        ogType="website"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Case Studies - Beta Ads",
          "description": "See real campaign results from Samsung, Shure, Surfshark and more. Native Twitch overlay advertising case studies.",
          "url": "https://beta-ads.no/case-studies",
          "isPartOf": { "@id": "https://beta-ads.no/#website" }
        }}
      />
      <VideoModal videoId={modalVideoId} onClose={() => setModalVideoId(null)} />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={heroRef} className={`max-w-2xl transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Case Studies</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              Real results,<br />
              <span style={{ fontFamily: "'Instrument Serif', serif" }} className="italic font-normal">real campaigns</span>
            </h1>
            <p className="text-lg font-light text-muted-foreground leading-relaxed">
              How Samsung, Glorious, Surfshark, and others reached millions of viewers through native Twitch advertising — with zero adblock impact.
            </p>
          </div>
        </div>
      </section>

      {/* Campaign Highlights carousel */}
      <section ref={videosRef} className={`relative overflow-hidden py-16 lg:py-24 border-t border-border transition-all duration-700 ${videosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden style={{ background: "radial-gradient(ellipse 70% 50% at 75% 30%, rgba(233,79,55,0.05) 0%, transparent 55%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Campaign Highlights</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Watch it live on stream</h2>
          </div>

          <div className="grid lg:grid-cols-[55%_45%] border border-border rounded-2xl overflow-hidden">
            {/* Thumbnail + play */}
            <div className="relative aspect-video lg:aspect-auto cursor-pointer group" onClick={() => setModalVideoId(caseStudies[caseStudyIndex].id)}>
              <img
                src={`https://img.youtube.com/vi/${caseStudies[caseStudyIndex].id}/maxresdefault.jpg`}
                alt={caseStudies[caseStudyIndex].campaign}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play className="w-6 h-6 text-white ml-1" />
                </motion.div>
              </div>
            </div>

            {/* Info panel */}
            <div className="p-8 lg:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">{caseStudies[caseStudyIndex].brand}</p>
                <h3 className="text-2xl lg:text-3xl font-light text-foreground mb-4 leading-tight">{caseStudies[caseStudyIndex].campaign}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">{caseStudies[caseStudyIndex].description}</p>
                <div className="grid grid-cols-2">
                  <div className="pr-6 border-r border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Impressions</p>
                    <p className="text-2xl font-light text-foreground">{caseStudies[caseStudyIndex].impressions}</p>
                  </div>
                  <div className="pl-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">CTR</p>
                    <p className="text-2xl font-light text-primary">{caseStudies[caseStudyIndex].ctr}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <div className="flex gap-2">
                  <button
                    onClick={() => navigateCaseStudy('prev')}
                    aria-label="Previous case study"
                    className="w-9 h-9 rounded-full border border-border hover:border-foreground/40 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateCaseStudy('next')}
                    aria-label="Next case study"
                    className="w-9 h-9 rounded-full border border-border hover:border-foreground/40 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">{caseStudyIndex + 1} / {caseStudies.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-depth case studies */}
      <section ref={detailedRef} className={`relative overflow-hidden py-16 lg:py-24 border-t border-border transition-all duration-700 ${detailedVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden style={{ background: "radial-gradient(ellipse 60% 45% at 25% 60%, rgba(233,79,55,0.04) 0%, transparent 55%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">In-Depth</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Full campaign breakdowns</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailedCaseStudies.map((cs, i) => (
              <Link
                key={cs.brand}
                to={cs.link}
                className={`group rounded-2xl border border-border overflow-hidden hover:border-foreground/20 transition-all duration-300 ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={cs.image}
                    alt={cs.brand}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">{cs.brand}</p>
                  <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{cs.description}</p>
                  <div className="grid grid-cols-4 gap-3 mb-5 pt-4 border-t border-border">
                    {cs.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-base font-bold text-foreground">{stat.value}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300">
                    Read full case study
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Get Started</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">Want results like these?</h2>
              <p className="text-muted-foreground mt-3 max-w-md">
                Book a demo and we'll show you how your brand can reach millions through native Twitch advertising.
              </p>
            </div>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 shrink-0">
              <a href="https://calendar.app.google/coW5NLQJtLxfRer19" target="_blank" rel="noopener noreferrer">
                Book a Demo <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <SPFooter />
    </div>
  );
};

export default CaseStudies;
