import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface CaseStudiesSectionProps {
  t: any;
}

interface CaseStudy {
  brand: string;
  campaign: string;
  impressions: string;
  ctr: string;
  duration: string;
}

const caseStudies: CaseStudy[] = [
  {
    brand: "Samsung",
    campaign: "S25 Ultra awareness Norway",
    impressions: "500,000+",
    ctr: "2.93%",
    duration: "Awareness campaign",
  },
  {
    brand: "Kristiania University",
    campaign: "University awareness campaign",
    impressions: "600,000+",
    ctr: "2.0%",
    duration: "Education campaign",
  },
  {
    brand: "Komplett",
    campaign: "Monthly gaming deals campaign",
    impressions: "150,000+",
    ctr: "3.24%",
    duration: "Ongoing campaign",
  },
];

const CaseStudyCard: React.FC<{ study: CaseStudy; index: number; isVisible: boolean; t: any }> = ({ 
  study, 
  index, 
  isVisible,
  t
}) => (
  <div
    className={`group relative p-6 lg:p-8 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-card/50 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
    style={{ transitionDelay: `${index * 150}ms` }}
  >
    {/* Brand & Campaign */}
    <div className="mb-6">
      <h3 className="text-xl lg:text-2xl font-medium text-foreground mb-1">
        {study.brand}
      </h3>
      <p className="text-muted-foreground text-sm">
        {study.campaign}
      </p>
    </div>

    {/* Metrics Grid */}
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <p className="text-2xl lg:text-3xl font-light text-foreground">
          {study.impressions}
        </p>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {t.impressions || "Impressions"}
        </p>
      </div>
      <div>
        <p className="text-2xl lg:text-3xl font-light text-primary">
          {study.ctr}
        </p>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {t.ctr || "CTR"}
        </p>
      </div>
      <div className="col-span-2">
        <p className="text-sm text-muted-foreground">
          {study.duration}
        </p>
      </div>
    </div>
  </div>
);

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ t }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      ref={ref}
      className={`py-16 lg:py-24 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-2xl lg:text-3xl font-light text-foreground mb-3">
              {t.ourWork || "Our Work"}
            </h2>
            <p className="text-muted-foreground text-base max-w-md">
              {t.realCampaigns || "Real campaigns. Real results."}
            </p>
          </div>
          <Link 
            to="/case-studies"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.viewAllCases || "View all case studies"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {caseStudies.map((study, index) => (
            <CaseStudyCard 
              key={study.brand} 
              study={study} 
              index={index}
              isVisible={isVisible}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
