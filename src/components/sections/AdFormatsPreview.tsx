import React from "react";

interface AdFormatsPreviewProps {
  id?: string;
}

export const AdFormatsPreview: React.FC<AdFormatsPreviewProps> = ({ id }) => {
  return (
    <section id={id} className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">
            Our Ad Formats
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3">
            Four Ways to Engage
          </h2>
        </div>

        {/* Screenshot with overlay labels */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
          {/* The actual screenshot */}
          <img 
            src="/lovable-uploads/twitch-ad-example.png" 
            alt="Twitch stream with betaads ad formats" 
            className="w-full h-auto"
          />

          {/* Overlay Labels */}
          
          {/* ANIMATION label - pointing to phone overlay on left */}
          <div className="absolute top-[22%] left-[3%] group cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/40 group-hover:shadow-xl">
                Animation
              </div>
              <div className="w-8 h-0.5 bg-primary/60 group-hover:bg-primary transition-colors" />
              <div className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
            </div>
          </div>

          {/* CTA label - pointing to !SAILY command */}
          <div className="absolute top-[62%] left-[35%] group cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/40 group-hover:shadow-xl">
                CTA
              </div>
              <div className="w-6 h-0.5 bg-primary/60 group-hover:bg-primary transition-colors" />
              <div className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
            </div>
          </div>

          {/* BANNER label - pointing to yellow banner */}
          <div className="absolute bottom-[18%] left-[3%] group cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/40 group-hover:shadow-xl">
                Banner
              </div>
              <div className="w-12 h-0.5 bg-primary/60 group-hover:bg-primary transition-colors" />
              <div className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
            </div>
          </div>

          {/* CHATBOT label - pointing to chatbot CTA in chat */}
          <div className="absolute top-[58%] right-[3%] group cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
              <div className="w-6 h-0.5 bg-primary/60 group-hover:bg-primary transition-colors" />
              <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/40 group-hover:shadow-xl">
                Chatbot
              </div>
            </div>
          </div>
        </div>

        {/* Simple legend below */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            { name: 'Animation', desc: 'Animated overlays on stream' },
            { name: 'Banner', desc: 'Branded banner under stream' },
            { name: 'CTA', desc: 'Command in streamer title' },
            { name: 'Chatbot', desc: 'Interactive chat button' },
          ].map((item) => (
            <div key={item.name} className="text-center group cursor-pointer">
              <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.name}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdFormatsPreview;
