import React from "react";

interface TeamProps {
  t: any;
}

export const Team: React.FC<TeamProps> = ({ t }) => (
  <section 
    className="py-32" 
    data-colors="#9f1c26,#3a0a0f,#0a0a0f"
    style={{ "--bg-strength": 0.6 } as React.CSSProperties}
  >
    <div className="max-w-7xl mx-auto px-8 lg:px-12">
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-7xl font-extralight text-foreground mb-12 tracking-tighter">
          {t.meetTeamTitle}
        </h2>
        <p className="text-2xl text-muted-foreground max-w-4xl mx-auto font-extralight leading-relaxed tracking-wide">
          {t.meetTeamDescription}
        </p>
      </div>

      <div className="flex justify-center max-w-4xl mx-auto">
        <div className="text-center group hover:transform hover:scale-105 transition-all duration-500 cursor-pointer">
          <div className="w-40 h-40 rounded-full mx-auto mb-8 overflow-hidden group-hover:shadow-2xl transition-all duration-500 ring-2 ring-border group-hover:ring-primary/50">
            <img
              src="/lovable-uploads/e6d9646d-bf5f-471c-a2d8-1f06c274f570.png"
              alt="Andreas Myraune"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            />
          </div>
          <h3 className="text-2xl font-light text-foreground mb-3 tracking-wide transition-all duration-300 group-hover:text-primary">Andreas Myraune</h3>
          <p className="text-foreground font-extralight mb-2 text-lg tracking-wide transition-all duration-300 group-hover:text-foreground/80">Head of Agency</p>
          <p className="text-muted-foreground font-extralight tracking-wide transition-all duration-300 group-hover:text-muted-foreground/80">andreas@beta-ads.no</p>
        </div>
      </div>
    </div>
  </section>
);