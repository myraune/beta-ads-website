import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Mic, Users } from "lucide-react";

interface MechanismsProps {
  t: any;
}

export const Mechanisms: React.FC<MechanismsProps> = ({ t }) => {
  const mechanisms = [
    {
      icon: <Mic className="h-8 w-8" />,
      title: t.vrmTitle,
      description: t.vrmDescription,
      howItWorks: t.vrmHowItWorks,
      whyWorthIt: t.vrmWhyWorthIt,
      videoId: "UDSDYhOpci8",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t.votingTitle,
      description: t.votingDescription,
      howItWorks: t.votingHowItWorks,
      whyWorthIt: t.votingWhyWorthIt,
      videoId: "M_c4IcLzy04",
    },
  ];

  return (
    <section id="mechanisms" className="relative py-24 bg-background">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 px-6 py-2 text-sm font-light">
            {t.mechanismsSubtitle}
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground mb-6 tracking-tight">
            {t.mechanismsTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            {t.mechanismsDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {mechanisms.map((mechanism, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:border-primary/20"
            >
              {/* Video Section */}
              <div className="mb-8">
                <div className="aspect-video rounded-2xl overflow-hidden border border-border/50 bg-black/5">
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
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    {mechanism.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-foreground mb-2">
                      {mechanism.title}
                    </h3>
                    <p className="text-muted-foreground font-light">
                      {mechanism.description}
                    </p>
                  </div>
                </div>

                {/* How it works */}
                <div className="bg-muted/30 rounded-2xl p-6">
                  <h4 className="text-lg font-medium text-foreground mb-4 flex items-center">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary" />
                    {t.howItWorksTitle}
                  </h4>
                  <div className="space-y-2">
                    {mechanism.howItWorks.map((step: string, stepIndex: number) => (
                      <div key={stepIndex} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                          {stepIndex + 1}
                        </span>
                        <p className="text-muted-foreground font-light text-sm leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why it's worth it */}
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">
                    {t.whyWorthItTitle}
                  </h4>
                  <ul className="space-y-2">
                    {mechanism.whyWorthIt.map((benefit: string, benefitIndex: number) => (
                      <li key={benefitIndex} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
                        <p className="text-muted-foreground font-light text-sm leading-relaxed">
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