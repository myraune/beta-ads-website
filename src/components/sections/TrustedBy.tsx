import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Shield, TrendingUp, Target, MousePointerClick } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: <TrendingUp className="w-4 h-4" />,
    value: "50,000+",
    label: "monthly engaged viewers",
  },
  {
    icon: <Target className="w-4 h-4" />,
    value: "3-5x",
    label: "higher engagement than traditional video ads",
  },
  {
    icon: <MousePointerClick className="w-4 h-4" />,
    value: "2.2%",
    label: "avg CTR (vs 0.8% industry standard)",
  },
  {
    icon: <Shield className="w-4 h-4" />,
    value: "100%",
    label: "adblock-proof by design",
  },
];

export const TrustedBy: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="trusted-by" className="py-8 overflow-hidden relative">
      
      <div 
        ref={ref}
        className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Logo Carousel */}
        <div className="relative mb-16 lg:mb-20">
          <div 
            className="flex overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
          >
            <div className="flex animate-scroll">
              {/* Light theme logos */}
              <div className="flex items-center space-x-24 whitespace-nowrap dark:hidden">
                <div className="h-10 w-28 flex items-center justify-center">
                  <img src="/lovable-uploads/711bde8c-3d71-40eb-8c93-2f8bf7350a57.png" alt="Samsung" loading="lazy" decoding="async" className="max-h-10 max-w-28 opacity-50 object-contain mix-blend-multiply transition-all duration-300 hover:scale-110 hover:opacity-80" />
                </div>
                <div className="h-10 w-28 flex items-center justify-center">
                  <img src="/lovable-uploads/bf505fdb-dc9b-4a82-93b6-f604c840737f.png" alt="Surfshark" loading="lazy" decoding="async" className="max-h-10 max-w-28 opacity-50 object-contain transition-all duration-300 hover:scale-110 hover:opacity-80" />
                </div>
                <div className="h-10 w-28 flex items-center justify-center">
                  <img src="/lovable-uploads/1e56f4d8-0545-4132-8d6f-8738cdb1ae4f.png" alt="Komplett" loading="lazy" decoding="async" className="max-h-10 max-w-28 opacity-50 object-contain transition-all duration-300 hover:scale-110 hover:opacity-80" />
                </div>
                <div className="h-10 w-28 flex items-center justify-center">
                  <img src="/lovable-uploads/5b2346c1-8226-4f68-9806-5b03cba8e17c.png" alt="Shure" loading="lazy" decoding="async" className="max-h-10 max-w-28 opacity-50 object-contain transition-all duration-300 hover:scale-110 hover:opacity-80" />
                </div>
                <div className="h-10 w-28 flex items-center justify-center">
                  <img src="/lovable-uploads/59160e7a-4d18-4413-9f1b-f681271f8dde.png" alt="Foodora" loading="lazy" decoding="async" className="max-h-10 max-w-28 opacity-50 object-contain transition-all duration-300 hover:scale-110 hover:opacity-80" />
                </div>
                <div className="h-14 w-40 flex items-center justify-center">
                  <img src="/lovable-uploads/wpp-media-logo.png" alt="WPP Media" loading="lazy" decoding="async" className="max-h-14 max-w-40 opacity-50 object-contain transition-all duration-300 hover:scale-110 hover:opacity-80 invert" />
                </div>
                <div className="h-10 w-28 flex items-center justify-center">
                  <img src="/lovable-uploads/cda69e31-7632-469a-b206-367ba4350480.png" alt="Logitech G" loading="lazy" decoding="async" className="max-h-10 max-w-28 opacity-50 object-contain transition-all duration-300 hover:scale-110 hover:opacity-80" />
                </div>
                <div className="h-10 w-28 flex items-center justify-center">
                  <img src="/lovable-uploads/1fc4788c-f973-403f-9b01-4f3b4fa2ba20.png" alt="SteelSeries" loading="lazy" decoding="async" className="max-h-10 max-w-28 opacity-50 object-contain transition-all duration-300 hover:scale-110 hover:opacity-80" />
                </div>
              </div>
              <div className="flex items-center space-x-24 whitespace-nowrap dark:hidden">
                <div className="h-10 w-28 flex items-center justify-center">
                  <img src="/lovable-uploads/711bde8c-3d71-40eb-8c93-2f8bf7350a57.png" alt="Samsung" loading="lazy" decoding="async" className="max-h-10 max-w-28 opacity-50 object-contain mix-blend-multiply transition-all duration-300 hover:scale-110 hover:opacity-80" />
                </div>
                <div className="h-10 w-28 flex items-center justify-center">
                  <img src="/lovable-uploads/bf505fdb-dc9b-4a82-93b6-f604c840737f.png" alt="Surfshark" loading="lazy" decoding="async" className="max-h-10 max-w-28 opacity-50 object-contain transition-all duration-300 hover:scale-110 hover:opacity-80" />
                </div>
                <div className="h-10 w-28 flex items-center justify-center">
                  <img src="/lovable-uploads/1e56f4d8-0545-4132-8d6f-8738cdb1ae4f.png" alt="Komplett" loading="lazy" decoding="async" className="max-h-10 max-w-28 opacity-50 object-contain transition-all duration-300 hover:scale-110 hover:opacity-80" />
                </div>
                <div className="h-10 w-28 flex items-center justify-center">
                  <img src="/lovable-uploads/5b2346c1-8226-4f68-9806-5b03cba8e17c.png" alt="Shure" loading="lazy" decoding="async" className="max-h-10 max-w-28 opacity-50 object-contain transition-all duration-300 hover:scale-110 hover:opacity-80" />
                </div>
                <div className="h-10 w-28 flex items-center justify-center">
                  <img src="/lovable-uploads/59160e7a-4d18-4413-9f1b-f681271f8dde.png" alt="Foodora" loading="lazy" decoding="async" className="max-h-10 max-w-28 opacity-50 object-contain transition-all duration-300 hover:scale-110 hover:opacity-80" />
                </div>
                <div className="h-14 w-40 flex items-center justify-center">
                  <img src="/lovable-uploads/wpp-media-logo.png" alt="WPP Media" loading="lazy" decoding="async" className="max-h-14 max-w-40 opacity-50 object-contain transition-all duration-300 hover:scale-110 hover:opacity-80 invert" />
                </div>
                <div className="h-10 w-28 flex items-center justify-center">
                  <img src="/lovable-uploads/cda69e31-7632-469a-b206-367ba4350480.png" alt="Logitech G" loading="lazy" decoding="async" className="max-h-10 max-w-28 opacity-50 object-contain transition-all duration-300 hover:scale-110 hover:opacity-80" />
                </div>
                <div className="h-10 w-28 flex items-center justify-center">
                  <img src="/lovable-uploads/1fc4788c-f973-403f-9b01-4f3b4fa2ba20.png" alt="SteelSeries" loading="lazy" decoding="async" className="max-h-10 max-w-28 opacity-50 object-contain transition-all duration-300 hover:scale-110 hover:opacity-80" />
                </div>
              </div>
              
              {/* Dark theme logos */}
              <div className="hidden dark:flex items-center space-x-16 whitespace-nowrap">
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/4d784a07-41cb-46c9-9bfc-b33f83db6f0c.png" alt="Samsung" loading="lazy" decoding="async" className="h-10 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/e18a5eac-737e-480f-8556-08251ac73021.png" alt="Surfshark" loading="lazy" decoding="async" className="h-10 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/2c535017-d05f-4886-9c58-9ca401e9b44f.png" alt="Komplett" loading="lazy" decoding="async" className="h-10 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/958b1a7f-a00c-46bc-acdb-bbefda64b9da.png" alt="Shure" loading="lazy" decoding="async" className="h-10 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/a716bb91-525c-4779-a530-ceb1daad954f.png" alt="Foodora" loading="lazy" decoding="async" className="h-10 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
                <div className="h-16 w-44 flex items-center justify-center">
                  <img src="/lovable-uploads/wpp-media-logo.png" alt="WPP Media" loading="lazy" decoding="async" className="h-16 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/770b37b2-e4fc-4e77-86f5-7fc95755ab72.png" alt="Logitech G" loading="lazy" decoding="async" className="h-10 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/9fee36e6-a901-40bb-961b-b20b878b80de.png" alt="SteelSeries" loading="lazy" decoding="async" className="h-10 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
              </div>
              <div className="hidden dark:flex items-center space-x-16 whitespace-nowrap">
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/4d784a07-41cb-46c9-9bfc-b33f83db6f0c.png" alt="Samsung" loading="lazy" decoding="async" className="h-10 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/e18a5eac-737e-480f-8556-08251ac73021.png" alt="Surfshark" loading="lazy" decoding="async" className="h-10 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/2c535017-d05f-4886-9c58-9ca401e9b44f.png" alt="Komplett" loading="lazy" decoding="async" className="h-10 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/958b1a7f-a00c-46bc-acdb-bbefda64b9da.png" alt="Shure" loading="lazy" decoding="async" className="h-10 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/a716bb91-525c-4779-a530-ceb1daad954f.png" alt="Foodora" loading="lazy" decoding="async" className="h-10 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
                <div className="h-16 w-44 flex items-center justify-center">
                  <img src="/lovable-uploads/wpp-media-logo.png" alt="WPP Media" loading="lazy" decoding="async" className="h-16 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/770b37b2-e4fc-4e77-86f5-7fc95755ab72.png" alt="Logitech G" loading="lazy" decoding="async" className="h-10 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/9fee36e6-a901-40bb-961b-b20b878b80de.png" alt="SteelSeries" loading="lazy" decoding="async" className="h-10 w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`text-center transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-primary">{stat.icon}</span>
                  <span className="text-2xl lg:text-3xl font-light text-foreground">
                    {stat.value}
                  </span>
                </div>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
