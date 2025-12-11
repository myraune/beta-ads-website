import React from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BarChart3, Settings, Gamepad2, Mail, ArrowRight } from "lucide-react";

interface NavCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  cta: string;
  delay: number;
  isVisible: boolean;
}

const NavCard: React.FC<NavCardProps> = ({ 
  icon, 
  title, 
  description, 
  link, 
  cta, 
  delay, 
  isVisible 
}) => (
  <Link 
    to={link}
    className={`
      group relative p-6 rounded-xl
      bg-gradient-to-br from-card/60 to-card/30
      backdrop-blur-md border border-border/20
      transition-all duration-500 ease-out
      hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5
      hover:-translate-y-1
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
    `}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {/* Icon */}
    <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
      {icon}
    </div>

    {/* Title */}
    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
      {title}
    </h3>

    {/* Description */}
    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
      {description}
    </p>

    {/* CTA */}
    <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
      <span>{cta}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </div>

    {/* Hover glow effect */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
  </Link>
);

interface NavigationCardsProps {
  t: any;
}

export const NavigationCards: React.FC<NavigationCardsProps> = ({ t }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const cards = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Case Studies",
      description: "See how leading brands achieved remarkable results with our platform.",
      link: "/case-studies",
      cta: "View Cases",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "How It Works",
      description: "Discover our unique mechanisms and learn how we connect brands with streamers.",
      link: "/how-it-works",
      cta: "Learn More",
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "For Streamers",
      description: "Join our network of streamers and start earning from your content.",
      link: "/streamers",
      cta: "Apply Now",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Contact",
      description: "Get in touch with our team to discuss your campaign needs.",
      link: "/contact",
      cta: "Contact Us",
    },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div 
          className={`
            text-center mb-12
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Explore Our Platform
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to launch successful streaming campaigns
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card, index) => (
            <NavCard
              key={card.title}
              {...card}
              delay={150 + index * 100}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
