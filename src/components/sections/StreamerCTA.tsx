import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const StreamerCTA: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`py-16 lg:py-24 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-3">
              Ready to start earning?
            </h2>
            <p className="text-muted-foreground text-base">
              Apply in 2 minutes. Start receiving offers as soon as you're approved.
            </p>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-3">
            <a 
              href="https://beta.streamer.livad.stream/login" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 h-12"
              >
                Apply now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            
            <a 
              href="https://beta.streamer.livad.stream/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Already a member? Sign in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
