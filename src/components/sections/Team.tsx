import React from "react";

interface TeamProps {
  t: any;
}

export const Team: React.FC<TeamProps> = ({ t }) => (
  <section className="py-32 bg-gradient-subtle">
    <div className="max-w-7xl mx-auto px-8 lg:px-12">
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-7xl font-extralight text-foreground mb-12 tracking-tighter">
          {t.meetTeamTitle}
        </h2>
        <p className="text-2xl text-muted-foreground max-w-4xl mx-auto font-extralight leading-relaxed tracking-wide">
          {t.meetTeamDescription}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
        <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-40 h-40 rounded-full mx-auto mb-8 overflow-hidden group-hover:shadow-2xl transition-all duration-300">
            <img
              src="/lovable-uploads/e6d9646d-bf5f-471c-a2d8-1f06c274f570.png"
              alt="Andreas Myraune"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-light text-foreground mb-3 tracking-wide">Andreas Myraune</h3>
          <p className="text-foreground font-extralight mb-2 text-lg tracking-wide">Head of Agency</p>
          <p className="text-muted-foreground font-extralight tracking-wide">andreas@beta-ads.no</p>
        </div>

        <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-40 h-40 rounded-full mx-auto mb-8 overflow-hidden group-hover:shadow-2xl transition-all duration-300">
            <img
              src="/lovable-uploads/6f888d5f-8917-41fc-8808-f528b2aac891.png"
              alt="Toms Znatnajs"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-light text-foreground mb-3 tracking-wide">Toms Znatnajs</h3>
          <p className="text-foreground font-extralight mb-2 text-lg tracking-wide">Head of Talent</p>
          <p className="text-muted-foreground font-extralight tracking-wide">toms@beta-ads.no</p>
        </div>
      </div>
    </div>
  </section>
);