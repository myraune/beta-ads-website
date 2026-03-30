import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { SPFooter } from '@/components/sections/SPFooter';
import { Play, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { DraggableRope } from "@/components/ui/gsap-draggable-rope";

interface CaseStudiesProps {
  t: any;
}

const caseStudies = [
  { id: "Uw7IIecicB4", brand: "Samsung", campaign: "S25 Ultra Awareness Norway", impressions: "500,000+", impressionsNum: 500000, ctr: "2.93%", ctrNum: 2.93, description: "Premium awareness campaign for Samsung's flagship smartphone launch across Nordic Twitch streamers." },
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
    brand: "Glorious",
    title: "How Glorious Empowered the Nordic Gaming Community",
    description: "Glorious used Beta's Rich Media Overlays to connect with audiences across Finland, Norway, and Sweden with localized creative assets.",
    stats: [
      { label: "Views", value: "137K+" },
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
    description: "The campaign successfully introduced the academy to potential students through 22 creators across 49 categories.",
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
            className="relative w-full rounded-xl overflow-hidden bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, type: "spring" }}
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
    <div className="min-h-screen relative">
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
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div ref={heroRef} className={`max-w-3xl transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">Case Studies</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-6">
              Real Results from Real Campaigns
            </h1>
            <p className={`text-xl font-light text-muted-foreground max-w-xl transition-all duration-1000 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              See how brands like Samsung, Glorious, and Gokstad Akademiet reached millions of viewers through native Twitch advertising.
            </p>
          </div>
        </div>
      </section>

      {/* Video Case Studies Carousel */}
      <section ref={videosRef} className={`py-16 lg:py-24 transition-all duration-700 ${videosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Campaign Highlights</h2>
            <p className="text-lg text-muted-foreground">Watch real campaigns in action — native overlays running live on Twitch streams.</p>
          </div>
          <div className="relative">
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl shadow-black/10">
              <div className="grid lg:grid-cols-[55%_45%]">
                <div className="relative aspect-video lg:aspect-auto cursor-pointer group" onClick={() => setModalVideoId(caseStudies[caseStudyIndex].id)}>
                  <img src={`https://img.youtube.com/vi/${caseStudies[caseStudyIndex].id}/maxresdefault.jpg`} alt={caseStudies[caseStudyIndex].campaign} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-[#11111198] backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="w-6 h-6 text-white ml-1" />
                    </motion.div>
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-3 mx-3 mb-3 bg-[#11111198] backdrop-blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <Play className="w-3.5 h-3.5 text-white" />
                      <div className="relative flex-1 h-1 bg-white/20 rounded-full">
                        <div className="absolute top-0 left-0 h-full w-0 bg-white rounded-full" />
                      </div>
                      <span className="text-white/60 text-xs">Watch case study</span>
                    </div>
                  </motion.div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <p className="text-primary text-sm font-medium mb-2">{caseStudies[caseStudyIndex].brand}</p>
                    <h3 className="text-2xl lg:text-3xl font-light text-foreground mb-4 line-clamp-2">{caseStudies[caseStudyIndex].campaign}</h3>
                    <p className="text-muted-foreground mb-8">{caseStudies[caseStudyIndex].description}</p>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Impressions</p><p className="text-2xl font-light text-foreground">{caseStudies[caseStudyIndex].impressions}</p></div>
                      <div><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">CTR</p><p className="text-2xl font-light text-primary">{caseStudies[caseStudyIndex].ctr}</p></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <button onClick={() => navigateCaseStudy('prev')} aria-label="Previous case study" className="w-10 h-10 rounded-full bg-muted/20 hover:bg-muted/30 flex items-center justify-center transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                      <button onClick={() => navigateCaseStudy('next')} aria-label="Next case study" className="w-10 h-10 rounded-full bg-muted/20 hover:bg-muted/30 flex items-center justify-center transition-colors"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                    <span className="text-sm text-muted-foreground">{caseStudyIndex + 1} / {caseStudies.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Case Studies */}
      <section ref={detailedRef} className={`py-16 lg:py-24 transition-all duration-700 ${detailedVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">In-Depth Case Studies</h2>
            <p className="text-lg text-muted-foreground">Deep dives into campaign strategy, execution, and results.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {detailedCaseStudies.map((cs) => (
              <Link
                key={cs.brand}
                to={cs.link}
                className="group bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-card/40 transition-all duration-500 shadow-xl shadow-black/10"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={cs.image}
                    alt={cs.brand}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <p className="text-primary text-sm font-medium mb-2">{cs.brand}</p>
                  <h3 className="text-xl lg:text-2xl font-light text-foreground mb-3 group-hover:text-primary transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">{cs.description}</p>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {cs.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                        <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300">
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
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl lg:text-4xl font-light mb-4">Want results like these?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            Book a demo and we'll show you how your brand can reach millions through native Twitch advertising.
          </p>
          <a
            href="https://calendar.app.google/coW5NLQJtLxfRer19"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Book a Demo
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <SPFooter />
    </div>
  );
};

export default CaseStudies;
