import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  targetId?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ targetId = 'trusted-by' }) => {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group cursor-pointer"
      aria-label="Scroll down"
    >
      <span className="text-sm font-light tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
        Scroll
      </span>
      <div className="relative">
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </div>
    </button>
  );
};
