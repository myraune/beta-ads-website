import React, { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const campaigns = [
  {
    id: "Uw7IIecicB4",
    brand: "Samsung",
    campaign: "S25 Ultra Awareness Norway",
    impressions: "500,000+",
    ctr: "2.93%",
    streamers: "43",
    description:
      "Premium awareness campaign for Samsung's flagship smartphone launch across Nordic Twitch streamers.",
  },
  {
    id: "IZOx_VMdJJg",
    brand: "Shure",
    campaign: "MV7+ Microphone Launch",
    impressions: "50,000+",
    ctr: "2.75%",
    streamers: "3",
    description:
      "Creator-focused campaign showcasing premium audio equipment with the highest unique CTR of any campaign.",
  },
  {
    id: "ufNq-A4d7iA",
    brand: "Komplett",
    campaign: "Monthly Gaming Deals",
    impressions: "150,000+",
    ctr: "3.24%",
    streamers: "16",
    description:
      "Recurring promotion driving traffic to gaming hardware deals across Norwegian streamers.",
  },
  {
    id: "DMz-NV1W_Is",
    brand: "Saily",
    campaign: "E-SIM Campaign Norway",
    impressions: "102,000+",
    ctr: "2.95%",
    streamers: "22",
    description:
      "Travel-focused campaign targeting young, mobile-first audiences across Nordic streams.",
  },
  {
    id: "U6i5uvhk2Sw",
    brand: "Surfshark",
    campaign: "VPN Awareness Nordic",
    impressions: "91,000+",
    ctr: "4.73%",
    streamers: "26",
    description:
      "Privacy and security messaging tailored for gaming communities — highest unverified CTR.",
  },
  {
    id: "GwE4dagRm_k",
    brand: "Kristiania",
    campaign: "University Recruitment",
    impressions: "140,000+",
    ctr: "2.62%",
    streamers: "30",
    description:
      "Student recruitment campaign reaching Gen Z through their favorite Twitch streamers.",
  },
  {
    id: "aE0-S8GC1Iw",
    brand: "M3panel",
    campaign: "Research Panel Signup",
    impressions: "180,000+",
    ctr: "3.45%",
    streamers: "13",
    description:
      "Direct response campaign driving panel signups with incentive offers.",
  },
  {
    id: "swu_ye12IHs",
    brand: "Norstat",
    campaign: "Survey Participation Drive",
    impressions: "210,000+",
    ctr: "2.92%",
    streamers: "15",
    description:
      "Engagement campaign encouraging survey participation among young demographics.",
  },
];

export const SPHowItWorks: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [index, setIndex] = useState(0);
  const [videoId, setVideoId] = useState<string | null>(null);

  const current = campaigns[index];
  // Look up the campaign for the open video so modal title/description are specific (accessibility)
  const activeCampaign = videoId ? campaigns.find((c) => c.id === videoId) : null;

  const navigate = (dir: "prev" | "next") => {
    if (dir === "prev")
      setIndex((i) => (i === 0 ? campaigns.length - 1 : i - 1));
    else setIndex((i) => (i === campaigns.length - 1 ? 0 : i + 1));
  };

  return (
    <section
      ref={ref}
      id="case-studies"
      className="py-20 md:py-28"
      aria-label="Campaign highlights"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
            Campaign Highlights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
            Real campaigns.{" "}
            <span className="text-primary">Real results.</span>
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Watch recap videos from campaigns we've run with Samsung, Shure,
            Surfshark, and more — all running natively on Nordic Twitch streams.
          </p>
        </div>

        {/* Campaign card */}
        <div
          className={`rounded-2xl overflow-hidden border border-border shadow-lg transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Video thumbnail — accessible button for keyboard and screen reader users */}
            <div
              className="lg:w-[55%] relative aspect-video lg:aspect-auto cursor-pointer group"
              role="button"
              tabIndex={0}
              aria-label={`Play campaign video: ${current.campaign}`}
              onClick={() => setVideoId(current.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setVideoId(current.id); } }}
            >
              <img
                src={`https://img.youtube.com/vi/${current.id}/maxresdefault.jpg`}
                alt={current.campaign}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white ml-1" aria-hidden="true" />
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
                <div className="flex gap-6 mb-6">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                      Completed views
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
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                      Streamers
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {current.streamers}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation — prev/next with brand name */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <button
                  onClick={() => navigate("prev")}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>
                    {
                      campaigns[
                        index === 0 ? campaigns.length - 1 : index - 1
                      ].brand
                    }
                  </span>
                </button>
                <span className="text-[11px] text-muted-foreground tabular-nums">
                  {index + 1} / {campaigns.length}
                </span>
                <button
                  onClick={() => navigate("next")}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>
                    {
                      campaigns[
                        index === campaigns.length - 1 ? 0 : index + 1
                      ].brand
                    }
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video modal */}
      <Dialog
        open={!!videoId}
        onOpenChange={(open) => !open && setVideoId(null)}
      >
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-transparent border-none overflow-hidden shadow-none">
          {/* sr-only title/description include campaign name so screen readers announce which video is playing */}
          <DialogTitle className="sr-only">
            {activeCampaign ? `${activeCampaign.brand} — ${activeCampaign.campaign}` : "Campaign Video"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {activeCampaign ? `Watch the recap for the ${activeCampaign.campaign} campaign by ${activeCampaign.brand}` : "Watch the campaign recap"}
          </DialogDescription>
          {videoId && (
            <div className="relative w-full rounded-xl overflow-hidden bg-black/90 backdrop-blur-sm shadow-2xl">
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title={activeCampaign ? `${activeCampaign.brand} — ${activeCampaign.campaign}` : "Campaign Video"}
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
