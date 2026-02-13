import React, { useState } from "react";
import { Footer } from "@/components/sections/Footer";
import { ExternalLink, ChevronLeft, ChevronRight, ArrowRight, BarChart3, Filter, Play } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

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

const adFormats = [
  { id: "video", name: "Video", dimensions: "640 × 360 px", description: "Native in-stream video ads that feel organic to the broadcast. Supports sound-on playback with viewer-friendly skip options.", bestFor: "Storytelling", image: "/lovable-uploads/videoDemo1.png" },
  { id: "snipe", name: "Snipe Banner", dimensions: "1920 × 250 px", description: "Horizontal banner overlay with high visibility. Appears at the top or bottom of the stream for maximum exposure without disrupting the viewing experience.", bestFor: "Awareness", image: "/lovable-uploads/snipeDemo1.png" },
  { id: "sidebar", name: "Side Bar", dimensions: "300 × 1080 px", description: "Persistent vertical placement alongside the stream. Maintains brand presence throughout the viewing session without interruption.", bestFor: "Presence", image: "/lovable-uploads/sideBarDemo1.png" },
  { id: "richmedia", name: "Rich Media", dimensions: "1920 × 1080 px", description: "Full-screen takeover with premium experience. Perfect for major announcements, product launches, or brand moments that demand attention.", bestFor: "Engagement", image: "/lovable-uploads/richMediaDemo1.png" },
  { id: "poll", name: "Poll", dimensions: "Dynamic", description: "Interactive poll that lets viewers participate in real-time. Great for audience insights, product preferences, or engagement campaigns.", bestFor: "Insights", image: "/lovable-uploads/pollDemo1.png" },
  { id: "interactive", name: "Interactive", dimensions: "1920 × 1080 px", description: "Rich media with clickable elements and interactive features. Includes CTAs, hotspots, and trackable engagement metrics.", bestFor: "Brand Moments", image: "/lovable-uploads/interactiveDemo1.png" },
];

const pressArticles = [
  { title: "Andreas (22) startet byrå ved siden av studiene", subtitle: "Nå utvider han til Sverige og Finland", publication: "Kampanje", url: "https://kampanje.com/premium/mai-2025/innsikt/andreas-22-startet-byra-ved-siden-av-studiene--na-utvider-han-til-sverige-og-finland/", image: "/lovable-uploads/press-kampanje-expansion-new.png" },
  { title: "Andreas (21) satser på eget Twitch-byrå", subtitle: "Nå får han polske tech-krefter i ryggen", publication: "Kampanje", url: "https://kampanje.com/premium/september-2024/innsikt/andreas-21-satser-pa-eget-twtich-byra--na-far-han-polske-tech-krefter-i-ryggen---har-lagt-grunnlaget-na/", image: "/lovable-uploads/press-kampanje-startup.png" },
  { title: "Ny kanal for mediekjøp", subtitle: "Beta er Norges nye Twitch-byrå", publication: "Kom24", url: "https://www.kom24.no/andreas-myraune-beta-influensere/ny-kanal-for-mediekjop-beta-er-norges-nye-twitch-byra/730424", image: "/lovable-uploads/press-kom24-twitch.png" },
  { title: "Instreamly og Beta inngår partnerskap", subtitle: "Strategisk samarbeid i Norge", publication: "Kom24", url: "https://www.kom24.no/andreas-myraune-beta-instreamly/instreamly-og-beta-inngar-partnerskap-i-norge/749907", image: "/lovable-uploads/press-kampanje-expansion.png" },
];

const VideoModal: React.FC<{ videoId: string | null; onClose: () => void }> = ({ videoId, onClose }) => (
  <Dialog open={!!videoId} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="max-w-6xl w-[95vw] p-0 bg-black border-border/20 overflow-hidden">
      <DialogTitle className="sr-only">Case Study Video</DialogTitle>
      <DialogDescription className="sr-only">Watch the full campaign breakdown</DialogDescription>
      <div className="aspect-video w-full">
        {videoId && (
          <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} title="Case Study Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
        )}
      </div>
    </DialogContent>
  </Dialog>
);

const CaseStudies: React.FC<CaseStudiesProps> = ({ t }) => {
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);
  const [activeFormat, setActiveFormat] = useState(adFormats[0].id);
  const [caseStudyIndex, setCaseStudyIndex] = useState(0);
  
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: platformRef, isVisible: platformVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const { ref: caseStudiesRef, isVisible: caseStudiesVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const { ref: formatsRef, isVisible: formatsVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const { ref: pressRef, isVisible: pressVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const selectedFormat = adFormats.find(f => f.id === activeFormat) || adFormats[0];

  const navigateCaseStudy = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCaseStudyIndex(prev => prev === 0 ? caseStudies.length - 1 : prev - 1);
    } else {
      setCaseStudyIndex(prev => prev === caseStudies.length - 1 ? 0 : prev + 1);
    }
  };

  return (
    <div className="min-h-screen relative">
      <VideoModal videoId={modalVideoId} onClose={() => setModalVideoId(null)} />

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center relative">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div ref={heroRef} className={`flex flex-col justify-center transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-6">For Brands</h1>
              <p className={`text-xl lg:text-2xl font-light text-muted-foreground max-w-lg transition-all duration-1000 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Reach Gen Z where they live. Native advertising inside live Twitch streams.
              </p>
            </div>
            <div className={`transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/20 bg-card/20">
                <iframe
                  src="https://app.supademo.com/embed/cmlk4c3zt00uz5yi3au9mqr61?embed_v=2"
                  loading="lazy"
                  title="Beta Ads Platform Tour"
                  allow="clipboard-write"
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Platform Teaser */}
      <section ref={platformRef} className={`py-24 lg:py-32 relative transition-all duration-700 ${platformVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">The Platform</h2>
            <p className="text-lg text-muted-foreground">Everything you need to plan, launch, and measure Twitch campaigns.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="group relative bg-card/30 backdrop-blur-sm rounded-2xl p-8 hover:bg-card/40 transition-all duration-500 overflow-hidden shadow-xl shadow-black/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-8 aspect-[16/10] bg-background/50 rounded-lg overflow-hidden shadow-inner shadow-black/5">
                  <div className="p-4 h-full flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-primary/60" /></div>
                      <div className="flex-1 h-3 bg-muted/30 rounded" /><div className="w-20 h-6 bg-muted/20 rounded" />
                    </div>
                    <div className="flex gap-3">
                      {[{v:"2.6M",l:"Impressions"},{v:"3.2%",l:"Avg CTR"},{v:"48",l:"Campaigns"}].map(s=>(
                        <div key={s.l} className="flex-1 h-16 bg-muted/20 rounded-lg flex flex-col items-center justify-center">
                          <div className="text-sm font-medium text-muted-foreground/70">{s.v}</div>
                          <div className="text-[10px] text-muted-foreground/40">{s.l}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 bg-muted/10 rounded-lg flex items-end p-3 gap-1">
                      {[40,65,45,80,55,70,60,85,50,75,90,65].map((h,i)=>(
                        <div key={i} className="flex-1 bg-primary/30 rounded-t transition-all duration-300 group-hover:bg-primary/40" style={{height:`${h}%`}} />
                      ))}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-medium mb-3">Agency Portal</h3>
                <p className="text-muted-foreground mb-6">Real-time campaign analytics, performance tracking, and multi-brand management in one dashboard.</p>
                <ul className="space-y-2 mb-8 text-sm text-muted-foreground">
                  {["Live impression & CTR tracking","Campaign performance reports","Multi-brand account switching"].map(f=>(
                    <li key={f} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/60" />{f}</li>
                  ))}
                </ul>
                <a href="/demo" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300">Book a demo<ArrowRight className="w-4 h-4" /></a>
              </div>
            </div>

            <div className="group relative bg-card/30 backdrop-blur-sm rounded-2xl p-8 hover:bg-card/40 transition-all duration-500 overflow-hidden shadow-xl shadow-black/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-8 aspect-[16/10] bg-background/50 rounded-lg overflow-hidden shadow-inner shadow-black/5">
                  <div className="p-4 h-full flex gap-3">
                    <div className="w-1/4 space-y-2">
                      <div className="flex items-center gap-1.5 mb-3"><Filter className="w-3 h-3 text-muted-foreground/50" /><div className="h-2 bg-muted/30 rounded flex-1" /></div>
                      <div className="h-6 bg-muted/20 rounded" /><div className="h-6 bg-muted/20 rounded" /><div className="h-6 bg-primary/20 rounded" />
                      <div className="h-2 bg-muted/30 rounded w-3/4 mt-4" /><div className="h-6 bg-muted/20 rounded" />
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      {[...Array(9)].map((_,i)=>(
                        <div key={i} className="bg-muted/20 rounded-lg flex flex-col items-center justify-center p-2 transition-all duration-300 group-hover:bg-muted/25">
                          <div className="w-6 h-6 rounded-full bg-muted/40 mb-1" /><div className="w-full h-1.5 bg-muted/30 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-medium mb-3">Streamer Explorer</h3>
                <p className="text-muted-foreground mb-6">Browse and filter 400+ Nordic streamers. Find the perfect match for your brand.</p>
                <ul className="space-y-2 mb-8 text-sm text-muted-foreground">
                  {["Filter by game, language, audience size","Audience demographics & overlap","Direct booking & campaign planning"].map(f=>(
                    <li key={f} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/60" />{f}</li>
                  ))}
                </ul>
                <a href="/demo" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300">Explore streamers<ArrowRight className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section ref={caseStudiesRef} className={`py-24 lg:py-32 transition-all duration-700 ${caseStudiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Case Studies</h2>
            <p className="text-lg text-muted-foreground">{t.discoverHow}</p>
          </div>
          <div className="relative">
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl shadow-black/10">
              <div className="grid lg:grid-cols-[55%_45%]">
                <div className="relative aspect-video lg:aspect-auto cursor-pointer group" onClick={() => setModalVideoId(caseStudies[caseStudyIndex].id)}>
                  <img src={`https://img.youtube.com/vi/${caseStudies[caseStudyIndex].id}/maxresdefault.jpg`} alt={caseStudies[caseStudyIndex].campaign} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform"><Play className="w-6 h-6 text-white ml-1" /></div>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <p className="text-primary text-sm font-medium mb-2">{caseStudies[caseStudyIndex].brand}</p>
                    <h3 className="text-2xl lg:text-3xl font-light text-foreground mb-4">{caseStudies[caseStudyIndex].campaign}</h3>
                    <p className="text-muted-foreground mb-8">{caseStudies[caseStudyIndex].description}</p>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Impressions</p><p className="text-2xl font-light text-foreground">{caseStudies[caseStudyIndex].impressions}</p></div>
                      <div><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">CTR</p><p className="text-2xl font-light text-primary">{caseStudies[caseStudyIndex].ctr}</p></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <button onClick={() => navigateCaseStudy('prev')} className="w-10 h-10 rounded-full bg-muted/20 hover:bg-muted/30 flex items-center justify-center transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                      <button onClick={() => navigateCaseStudy('next')} className="w-10 h-10 rounded-full bg-muted/20 hover:bg-muted/30 flex items-center justify-center transition-colors"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                    <span className="text-sm text-muted-foreground">{caseStudyIndex + 1} / {caseStudies.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Formats */}
      <section ref={formatsRef} className={`py-24 lg:py-32 transition-all duration-700 ${formatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Ad Formats</h2>
            <p className="text-lg text-muted-foreground">Native advertising designed for live streaming.</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-12">
            {adFormats.map(format => (
              <button key={format.id} onClick={() => setActiveFormat(format.id)} className={cn("px-4 py-2 rounded-full text-sm transition-all duration-300", activeFormat === format.id ? "bg-primary text-primary-foreground" : "bg-card/30 text-muted-foreground hover:text-foreground hover:bg-card/50")}>
                {format.name}
              </button>
            ))}
          </div>
          <div className="grid lg:grid-cols-[60%_40%] gap-8 items-center">
            <div className="aspect-video rounded-xl overflow-hidden bg-card/20 shadow-xl shadow-black/10">
              <img src={selectedFormat.image} alt={selectedFormat.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-6">
              <div><h3 className="text-3xl font-light text-foreground mb-2">{selectedFormat.name}</h3><p className="text-sm text-muted-foreground">{selectedFormat.dimensions}</p></div>
              <p className="text-muted-foreground leading-relaxed">{selectedFormat.description}</p>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm">Best for: {selectedFormat.bestFor}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Press */}
      <section ref={pressRef} className={`py-24 lg:py-32 transition-all duration-700 ${pressVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Press</h2>
            <p className="text-lg text-muted-foreground">Featured in leading Nordic media.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pressArticles.map((article, i) => (
              <a key={i} href={article.url} target="_blank" rel="noopener noreferrer" className="group bg-card/30 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-card/40 transition-all duration-500 shadow-lg shadow-black/10">
                <div className="aspect-[16/10] overflow-hidden"><img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
                <div className="p-5">
                  <p className="text-primary text-xs font-medium mb-2">{article.publication}</p>
                  <h3 className="text-foreground font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-1">{article.subtitle}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">Read article<ExternalLink className="w-3 h-3" /></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer t={t} />
    </div>
  );
};

export default CaseStudies;
