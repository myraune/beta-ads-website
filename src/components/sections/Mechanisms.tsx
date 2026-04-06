import React from "react";
import { ArrowRight, Mic, Users } from "lucide-react";

const mechanisms = [
  {
    icon: <Mic className="h-8 w-8" />,
    title: "Voice Recognition Monitoring",
    description:
      "AI-powered speech detection that listens to every sponsored stream and automatically clips brand mentions in real-time.",
    howItWorks: [
      "Our AI monitors the audio feed of every sponsored stream",
      "When a creator says your brand name, a timestamped clip is generated",
      "Clips are delivered to your dashboard within minutes",
    ],
    whyWorthIt: [
      "Prove organic brand mentions to clients with hard evidence",
      "Track sentiment and context around every mention",
      "Automatically build a clip library for social content",
    ],
    videoId: "UDSDYhOpci8",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Interactive Polls & Voting",
    description:
      "Real-time polls rendered directly in the stream that drive viewer engagement and deliver instant audience feedback.",
    howItWorks: [
      "Brands configure poll questions and options in the dashboard",
      "Polls appear as native overlays during the live stream",
      "Viewers vote in real-time and results update live on screen",
    ],
    whyWorthIt: [
      "67% average participation rate across campaigns",
      "Direct viewer interaction creates memorable brand moments",
      "Collect first-party audience insights in real-time",
    ],
    videoId: "M_c4IcLzy04",
  },
];

export const Mechanisms: React.FC<{ t?: any }> = () => {
  return (
    <section id="mechanisms" className="relative py-12 md:py-24">
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
            AI Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Smart features that work for you
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16">
          {mechanisms.map((mechanism, index) => (
            <div
              key={index}
              className="group glass-card-hover rounded-2xl md:rounded-3xl p-4 md:p-8"
            >
              {/* Video Section */}
              <div className="mb-4 md:mb-8">
                <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-border/50 bg-black/5">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${mechanism.videoId}`}
                    title={mechanism.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-4 md:space-y-6">
                {/* Header */}
                <div className="flex items-start md:items-center space-x-3 md:space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    <div className="scale-75 md:scale-100">
                      {mechanism.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-2xl font-bold text-foreground mb-1 md:mb-2 leading-tight">
                      {mechanism.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-snug">
                      {mechanism.description}
                    </p>
                  </div>
                </div>

                {/* How it works */}
                <div className="bg-secondary/30 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <h4 className="text-base md:text-lg font-medium text-foreground mb-3 md:mb-4 flex items-center">
                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary flex-shrink-0" />
                    <span className="text-sm md:text-base">How it works</span>
                  </h4>
                  <div className="space-y-2 md:space-y-3">
                    {mechanism.howItWorks.map((step, stepIndex) => (
                      <div
                        key={stepIndex}
                        className="flex items-start space-x-2 md:space-x-3"
                      >
                        <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs md:text-sm font-medium mt-0.5">
                          {stepIndex + 1}
                        </span>
                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why it's worth it */}
                <div>
                  <h4 className="text-base md:text-lg font-medium text-foreground mb-2 md:mb-3">
                    Why it's worth it
                  </h4>
                  <ul className="space-y-1.5 md:space-y-2">
                    {mechanism.whyWorthIt.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-start space-x-2 md:space-x-3"
                      >
                        <span className="flex-shrink-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mt-1.5 md:mt-2" />
                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                          {benefit}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
