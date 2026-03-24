import React, { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const caseStudies = [
  { id: "Uw7IIecicB4", brand: "Samsung", campaign: "S25 Ultra Awareness Norway", impressions: "500,000+", ctr: "2.93%", description: "Premium awareness campaign for Samsung's flagship smartphone launch across Nordic Twitch streamers." },
  { id: "IZOx_VMdJJg", brand: "Shure", campaign: "MV7+ Microphone Launch", impressions: "320,000+", ctr: "2.45%", description: "Creator-focused campaign showcasing premium audio equipment to streaming audiences." },
  { id: "ufNq-A4d7iA", brand: "Komplett", campaign: "Monthly Gaming Deals", impressions: "150,000+", ctr: "3.24%", description: "Recurring promotion campaign driving traffic to gaming hardware deals." },
  { id: "DMz-NV1W_Is", brand: "Saily", campaign: "E-SIM Campaign Norway", impressions: "280,000+", ctr: "2.67%", description: "Travel-focused campaign targeting young, mobile-first audiences." },
  { id: "U6i5uvhk2Sw", brand: "Surfshark", campaign: "VPN Awareness Nordic", impressions: "420,000+", ctr: "2.81%", description: "Privacy and security messaging tailored for gaming communities." },
  { id: "GwE4dagRm_k", brand: "Kristiania", campaign: "University Recruitment", impressions: "600,000+", ctr: "2.00%", description: "Student recruitment campaign reaching Gen Z through their favorite streamers." },
  { id: "aE0-S8GC1Iw", brand: "M3panel", campaign: "Research Panel Signup", impressions: "180,000+", ctr: "3.45%", description: "Direct response campaign driving panel signups with incentive offers." },
  { id: "swu_ye12IHs", brand: "Norstat", campaign: "Survey Participation Drive", impressions: "210,000+", ctr: "2.92%", description: "Engagement campaign encouraging survey participation among young demographics." },
];

export const SPHowItWorks: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [index, setIndex] = useState(0);
  const [videoId, setVideoId] = useState<string | null>(null);

  const current = caseStudies[index];

  const navigate = (dir: "prev" | "next") => {
    if (dir === "prev") setIndex((i) => (i === 0 ? caseStudies.length - 1 : i - 1));
    else setIndex((i) => (i === caseStudies.length - 1 ? 0 : i + 1));
  };

  return (
    <section
      ref={ref}
      className="py-20 md:py-28"
      aria-label="Case studies"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            Case Studies
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
            Real campaigns.{" "}
            <span className="text-primary">Real results.</span>
          </h2>
          <p className="text-muted-foreground max-w-lg">
            See how brands like Samsung, Shure, and Surfshark reached millions
            of viewers through native stream advertising.
          </p>
        </div>

        {/* Case study card */}
        <div
          className={`rounded-2xl overflow-hidden border border-border bg-card shadow-lg transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Video thumbnail */}
            <div
              className="lg:w-[55%] relative aspect-video lg:aspect-auto cursor-pointer group"
              onClick={() => setVideoId(current.id)}
            >
              <img
                src={`https://img.youtube.com/vi/${current.id}/maxresdefault.jpg`}
                alt={current.campaign}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
              {/* Bottom bar on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 mx-3 mb-3 bg-black/60 backdrop-blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-white" />
                  <div className="relative flex-1 h-1 bg-white/20 rounded-full">
                    <div className="absolute top-0 left-0 h-full w-0 bg-white rounded-full" />
                  </div>
                  <span className="text-white/60 text-xs">Watch case study</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="lg:w-[45%] p-6 lg:p-10 flex flex-col justify-between">
              <div>
                <p className="text-primary text-sm font-semibold mb-2">
                  {current.brand}
                </p>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                  {current.campaign}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {current.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                      Impressions
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {current.impressions}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                      CTR
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {current.ctr}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate("prev")}
                    className="w-9 h-9 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate("next")}
                    className="w-9 h-9 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-muted-foreground">
                  {index + 1} / {caseStudies.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand pills — quick jump */}
        <div
          className={`flex flex-wrap justify-center gap-2 mt-6 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {caseStudies.map((cs, i) => (
            <button
              key={cs.brand}
              onClick={() => setIndex(i)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                i === index
                  ? "bg-primary text-white"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cs.brand}
            </button>
          ))}
        </div>
      </div>

      {/* Video modal */}
      <Dialog open={!!videoId} onOpenChange={(open) => !open && setVideoId(null)}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-transparent border-none overflow-hidden shadow-none">
          <DialogTitle className="sr-only">Case Study Video</DialogTitle>
          <DialogDescription className="sr-only">
            Watch the full campaign breakdown
          </DialogDescription>
          {videoId && (
            <div className="relative w-full rounded-xl overflow-hidden bg-black/90 backdrop-blur-sm shadow-2xl">
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
