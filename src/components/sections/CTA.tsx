import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  t: any;
}

export const CTA: React.FC<CTAProps> = ({ t }) => (
  <section className="py-24 relative overflow-hidden">
    <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
      
      {/* Asymmetric Grid Layout */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left: Visual Element */}
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/20 shadow-xl shadow-black/15">
            {/* Stream preview placeholder with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
            
            {/* Featured person image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl shadow-black/30">
                  <img
                    src="/lovable-uploads/founder-andreas.jpg"
                    alt="Andreas Myraune"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Status indicator */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md shadow-black/10">
                  <p className="text-sm font-light text-foreground whitespace-nowrap">Andreas Myraune</p>
                  <p className="text-xs text-muted-foreground text-center">Head of Agency</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-primary animate-pulse" />
            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/50 font-mono">LIVE</div>
          </div>
        </div>

        {/* Right: CTA Content - Left Aligned */}
        <div className="order-1 lg:order-2">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-8 tracking-tight text-foreground leading-tight">
            {t.ctaTitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg font-light leading-relaxed">
            {t.ctaDescription}
          </p>

          <a 
            href="https://calendar.app.google/coW5NLQJtLxfRer19" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-sm font-light tracking-wide h-auto shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105"
            >
              {t.ctaButton || "Get in Touch"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  </section>
);
