import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  t: any;
}

export const CTA: React.FC<CTAProps> = ({ t }) => (
  <section className="pt-16 pb-32 relative overflow-hidden">
    <div className="relative max-w-5xl mx-auto text-center px-8 lg:px-12">
      <h2 className="text-5xl md:text-7xl font-extralight mb-12 tracking-tighter text-foreground">
        {t.ctaTitle}
      </h2>
      <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
        {t.ctaDescription}
      </p>
      
      <div className="flex items-center justify-center mb-12 transition-all duration-300 hover:scale-105 cursor-pointer group">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-border/50 transition-all duration-300 group-hover:ring-primary/40 group-hover:shadow-lg">
          <img
            src="/lovable-uploads/e6d9646d-bf5f-471c-a2d8-1f06c274f570.png"
            alt="Andreas Myraune"
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
          />
        </div>
        <div className="text-left">
          <p className="text-lg font-light text-foreground tracking-wide transition-all duration-300 group-hover:text-foreground/90">Andreas Myraune</p>
          <p className="text-sm text-muted-foreground font-extralight tracking-wide transition-all duration-300 group-hover:text-muted-foreground/80">Head of Agency</p>
        </div>
      </div>

      <Link to="/contact">
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-16 py-8 text-xl font-light tracking-wide h-auto shadow-2xl shadow-primary/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
        >
          {t.ctaButton || "Get in Touch"}
          <ArrowRight className="ml-4 h-6 w-6" />
        </Button>
      </Link>
    </div>
  </section>
);