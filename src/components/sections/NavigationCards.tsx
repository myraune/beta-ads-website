import React from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface NavItemProps {
  title: string;
  link: string;
  delay: number;
  isVisible: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ 
  title, 
  link, 
  delay, 
  isVisible 
}) => (
  <Link 
    to={link}
    className={`
      group relative py-6 px-6
      text-center
      transition-all duration-500 ease-out
      hover:bg-secondary/20
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
      {title}
    </span>
  </Link>
);

interface NavigationCardsProps {
  t: any;
}

export const NavigationCards: React.FC<NavigationCardsProps> = ({ t }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const items = [
    { title: "Case Studies", link: "/case-studies" },
    { title: "How It Works", link: "/how-it-works" },
    { title: "For Streamers", link: "/streamers" },
    { title: "Contact", link: "/contact" },
  ];

  return (
    <section ref={ref} className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div 
          className={`
            grid grid-cols-2 md:grid-cols-4
            rounded-lg shadow-lg shadow-black/10
            bg-secondary/5
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          {items.map((item, index) => (
            <NavItem
              key={item.title}
              {...item}
              delay={100 + index * 75}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
