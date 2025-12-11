import React from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BarChart3, Settings, Gamepad2, Mail, ArrowRight } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  delay: number;
  isVisible: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  title, 
  description, 
  link, 
  delay, 
  isVisible 
}) => (
  <Link 
    to={link}
    className={`
      group relative py-6 px-4
      transition-all duration-500 ease-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
    `}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {/* Subtle glow on hover */}
    <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />
    
    {/* Content wrapper with floating effect */}
    <div className="relative transition-transform duration-300 group-hover:-translate-y-1">
      {/* Icon with color shift */}
      <div className="mb-3 inline-flex text-muted-foreground group-hover:text-primary transition-colors duration-300">
        {icon}
      </div>

      {/* Title with gradient text on hover */}
      <h3 className="text-lg font-semibold mb-1.5 gradient-text-hover">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        {description}
      </p>

      {/* Arrow CTA */}
      <div className="flex items-center gap-1.5 text-sm font-medium text-primary/70 group-hover:text-primary transition-colors">
        <span>Explore</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      </div>
    </div>

    {/* Bottom border that animates on hover */}
    <div className="absolute bottom-0 left-4 right-4 h-px bg-border/20 group-hover:bg-primary/30 transition-colors duration-300" />
  </Link>
);

interface NavigationCardsProps {
  t: any;
}

export const NavigationCards: React.FC<NavigationCardsProps> = ({ t }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const items = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Case Studies",
      description: "See how leading brands achieved remarkable results",
      link: "/case-studies",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "How It Works",
      description: "Discover our unique approach to streaming campaigns",
      link: "/how-it-works",
    },
    {
      icon: <Gamepad2 className="w-5 h-5" />,
      title: "For Streamers",
      description: "Join our network and start earning from your content",
      link: "/streamers",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Contact",
      description: "Get in touch to discuss your campaign needs",
      link: "/contact",
    },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
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
          <p className="text-muted-foreground max-w-md mx-auto">
            Everything you need to launch successful streaming campaigns
          </p>
        </div>

        {/* Navigation Items - 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          {items.map((item, index) => (
            <NavItem
              key={item.title}
              {...item}
              delay={150 + index * 100}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
