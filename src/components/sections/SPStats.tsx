import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Users, BarChart3, Zap } from "lucide-react";

export const SPStats: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 md:py-32" aria-label="Get started">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            Let's Talk
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to reach Gen Z on their favorite streams?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Every campaign is tailored to your brand. We handle everything from streamer selection to overlay design and performance reporting. Book a call and we'll build a plan that fits your goals.
          </p>
        </div>

        {/* Value props */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {[
            { icon: Monitor, title: "Native Overlays", desc: "Ads that blend into streams — bypass adblock, feel organic to viewers" },
            { icon: Users, title: "340+ Nordic Streamers", desc: "Access our curated network across Twitch, YouTube, and Kick" },
            { icon: BarChart3, title: "Full Transparency", desc: "Real-time dashboard with views, clicks, CTR, and spend tracking" },
            { icon: Zap, title: "Managed Service", desc: "From creative to deployment — we handle the entire campaign" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all duration-300 delay-${index * 50} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="inline-flex flex-col sm:flex-row gap-3">
            <Link to="/demo">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-12 px-8 text-sm font-semibold transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-8 text-sm font-semibold transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5"
              >
                View Case Studies
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            No commitment required. We'll discuss your goals and show you what's possible.
          </p>
        </div>
      </div>
    </section>
  );
};
