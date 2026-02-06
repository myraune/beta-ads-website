import React, { useState } from 'react';

const serifFont = { fontFamily: "'Instrument Serif', serif" };

const COUNTRIES = {
  norway: {
    name: 'Norway',
    active: true,
    path: 'M95,20 L100,25 L98,35 L102,45 L97,55 L100,65 L96,80 L100,95 L97,110 L100,125 L95,140 L98,155 L94,170 L97,185 L92,200 L95,215 L90,230 L93,240 L88,250 L85,255 L80,258 L78,250 L82,240 L78,230 L82,220 L79,210 L83,200 L80,190 L84,180 L81,170 L85,160 L82,150 L86,140 L83,130 L87,120 L84,110 L88,100 L85,90 L89,80 L86,70 L90,60 L87,50 L91,40 L88,30 L92,25 Z',
  },
  sweden: {
    name: 'Sweden',
    active: true,
    path: 'M100,60 L108,55 L115,60 L120,70 L118,85 L122,100 L119,115 L123,130 L120,145 L125,160 L122,175 L128,190 L130,200 L135,210 L140,220 L142,230 L138,240 L130,245 L122,248 L115,250 L108,248 L102,245 L98,240 L95,235 L93,240 L88,250 L85,255 L90,230 L93,220 L90,210 L94,200 L91,190 L95,180 L92,170 L96,160 L93,150 L97,140 L100,125 L97,110 L100,95 L97,80 L100,65 Z',
  },
  finland: {
    name: 'Finland',
    active: true,
    path: 'M145,30 L155,25 L165,30 L170,40 L168,55 L172,70 L169,85 L173,100 L170,115 L174,130 L171,145 L168,160 L165,175 L160,190 L155,200 L148,210 L142,215 L135,210 L130,200 L128,190 L130,175 L125,160 L128,145 L125,130 L128,115 L125,100 L128,85 L125,70 L130,60 L135,50 L140,40 Z',
  },
  denmark: {
    name: 'Denmark',
    active: false,
    path: 'M95,255 L100,252 L108,248 L115,250 L112,258 L105,262 L98,265 L92,262 L88,258 Z',
  },
};

interface MarketsSectionProps {
  marketsRef: React.RefObject<HTMLDivElement>;
  marketsVisible: boolean;
}

const MarketsSection: React.FC<MarketsSectionProps> = ({ marketsRef, marketsVisible }) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <section className="relative">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="border-t border-foreground/[0.06]" />
      </div>

      <div
        ref={marketsRef}
        className={`max-w-[1200px] mx-auto px-6 lg:px-12 py-32 lg:py-40 transition-all duration-1000 ease-out ${
          marketsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4 font-light">
              Our Markets
            </p>
            <h2
              className="text-3xl lg:text-4xl tracking-tight text-foreground mb-6"
              style={serifFont}
            >
              Active across the Nordics
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-[520px] mb-12">
              We connect brands with live audiences in Norway, Sweden, and Finland — the most engaged streaming markets in Europe.
            </p>

            <div className="flex gap-10 lg:gap-16">
              {['Norway', 'Sweden', 'Finland'].map((country) => (
                <div
                  key={country}
                  className="flex items-center gap-2.5 cursor-pointer"
                  onMouseEnter={() => setHoveredCountry(country.toLowerCase())}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  <div
                    className={`w-2 h-2 rounded-full bg-primary transition-all duration-200 ${
                      hoveredCountry === country.toLowerCase() ? 'scale-150' : ''
                    }`}
                    style={{ boxShadow: hoveredCountry === country.toLowerCase() ? '0 0 10px hsl(var(--primary) / 0.6)' : '0 0 8px hsl(var(--primary) / 0.4)' }}
                  />
                  <span className={`text-sm font-light tracking-wide transition-colors duration-200 ${
                    hoveredCountry === country.toLowerCase() ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {country}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Nordic SVG map (desktop only) */}
          <div className="hidden lg:flex justify-center relative h-[320px]">
            <svg
              viewBox="60 10 130 270"
              className="h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {Object.entries(COUNTRIES).map(([key, country]) => (
                <path
                  key={key}
                  d={country.path}
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    fill: country.active ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                    opacity: country.active
                      ? hoveredCountry === key ? 0.9 : 0.5
                      : 0.2,
                    stroke: country.active
                      ? hoveredCountry === key ? 'hsl(0, 80%, 60%)' : 'hsl(0, 60%, 40%)'
                      : 'hsl(var(--muted-foreground))',
                    strokeWidth: hoveredCountry === key ? 1.5 : 0.5,
                    filter: hoveredCountry === key ? 'drop-shadow(0 0 12px hsl(0, 80%, 50%, 0.5))' : 'none',
                  }}
                  onMouseEnter={() => country.active && setHoveredCountry(key)}
                  onMouseLeave={() => setHoveredCountry(null)}
                />
              ))}

              {hoveredCountry && COUNTRIES[hoveredCountry as keyof typeof COUNTRIES]?.active && (
                <text
                  x="130"
                  y="278"
                  textAnchor="middle"
                  className="fill-foreground text-[10px] font-light uppercase"
                  style={{ letterSpacing: '0.15em' }}
                >
                  {COUNTRIES[hoveredCountry as keyof typeof COUNTRIES].name}
                </text>
              )}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketsSection;
