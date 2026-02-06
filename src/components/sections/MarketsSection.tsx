import React, { useState } from 'react';

const serifFont = { fontFamily: "'Instrument Serif', serif" };

const COUNTRIES = {
  norway: {
    name: 'Norway',
    active: true,
    paths: [
      'M460.567,327.409l1.747-1.279l-0.157-1.435l-1.106-0.641l0.157-1.754h0.95v-0.96l-4.123-1.114l-6.181,0.64l-0.631,2.714l-1.428-0.477l-0.951-1.599l-3.017,0.155l-0.32,3.033l-1.426,0.641l-0.795-1.6l-6.345,5.109l1.271,1.436l-2.378,1.115l-5.393,10.701l-1.901,1.279l0.155,0.959l1.9,0.959l-0.475,2.074l-3.173-0.164l-0.952-1.115l-2.057,2.395l-1.271,0.959l-0.32,2.24l-1.105,0.64l-2.854,0.64l-1.426,4.479l0.951,7.348l1.106,3.354l1.271,1.279l2.853-0.156l4.124-3.994l1.581-2.713l0.478,3.992l2.697-4.789l0.154-13.424l2.195-1.383l0.657-7.408l6.655-9.586l3.173-1.115l1.427-1.755l4.754,1.115l2.377,1.435l0.796-3.992l3.968-2.396Z',
      'M437.056,285.762l-1.426-1.435l-3.164,1.539h-5.809l-0.917,3.389l3.26,2.878l1.425-0.208l2.04-3.491l1.729,1.235l-1.229,2.464l-0.614,3.596l1.427,2.256l3.06-5.135l3.979-4.832l-1.531-1.33Z',
      'M438.784,279.6l-2.55,2.359l1.529,2.359h2.749l1.124,1.539l3.363,1.746l3.871-2.256l2.654-2.256l-0.916-1.85l-2.654-1.539l-1.938,1.746l-1.321-1.644l-1.021,0.104l-1.322,2.878l-1.936-1.954l-0.208-1.331Z',
      'M444.593,290.179l-2.04,1.851l-1.729,1.332l0.812,1.435l1.636,0.511l2.652-1.236l1.229-1.539l-1.124-1.85Z',
    ],
  },
  sweden: {
    name: 'Sweden',
    active: true,
    paths: [
      'M445.232,329.52l1.693,1.563h3.173l1.746,3.354l0.477,5.748l-4.278,3.035v3.033l-3.017,4.158l-1.746,0.154l-2.378,3.994l0.155,3.838l4.124,3.035l-0.319,1.754l-1.582,2.396l-2.377,2.074l0.155,6.872l-3.647,1.279l-1.271,2.713h-1.747l-0.949-4.789l-3.969-6.084l3.26-5.455l0.225-13.477l2.248-1.236l0.545-7.709l6.405-9.172Z',
      'M445.898,368.927l-1.824,1.443l0.917,2.118l1.616-1.573Z',
    ],
  },
  finland: {
    name: 'Finland',
    active: true,
    paths: [
      'M453.072,340.202l1.79,0.786l1.104,2.074l-1.104,1.436l-5.55,6.068l-0.952,3.199l1.271,4.633l4.278,3.199l5.706-2.715l4.598-0.64l4.279-6.872l-3.173-7.512l-3.018-7.192l0.477-4.633l-1.901-0.32l-0.492-3.38l-2.559-4.175l-2.836,1.962l-1.114,4.556l-3.008-1.807l-4.185-1.021l-0.934,1.09l1.607,1.453l2.931-0.053l2.359,3.812Z',
    ],
  },
  denmark: {
    name: 'Denmark',
    active: false,
    paths: [
      'M427.123,370.076l-3.586,3.968l-0.13,2.584l1.635,4.263l2.559-0.484l-0.319-3.483l1.764-1.971l-0.034-1.548l-1.245-3.223Z',
      'M428.979,377.354l-1.062,0.229v1.583l1.128,0.875l0.997-0.25l-0.243-1.503Z',
      'M432.306,375.848l-0.949,0.23l-1.056,0.968l0.448,1.954l1.292,0.507l-1.334,0.535l-0.255,0.685h2.005l0.602-1.099l-0.768-0.378l0.25-0.962l0.916-1.205l-0.25-1.042Z',
    ],
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
              viewBox="415 275 55 110"
              className="h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {Object.entries(COUNTRIES).map(([key, country]) => (
                <g key={key}>
                  {country.paths.map((pathD, i) => (
                    <path
                      key={`${key}-${i}`}
                      d={pathD}
                      className="transition-all duration-200 cursor-pointer"
                      style={{
                        fill: country.active ? 'hsl(var(--primary))' : 'rgba(255, 255, 255, 0.04)',
                        opacity: country.active
                          ? hoveredCountry === key ? 1 : 0.5
                          : 0.08,
                        stroke: country.active
                          ? hoveredCountry === key ? '#e64646' : '#993333'
                          : 'rgba(255, 255, 255, 0.1)',
                        strokeWidth: hoveredCountry === key ? 0.8 : 0.3,
                      }}
                      onMouseEnter={() => country.active && setHoveredCountry(key)}
                      onMouseLeave={() => setHoveredCountry(null)}
                    />
                  ))}
                </g>
              ))}

              {hoveredCountry && COUNTRIES[hoveredCountry as keyof typeof COUNTRIES]?.active && (
                <text
                  x="442"
                  y="388"
                  textAnchor="middle"
                  className="fill-foreground font-light uppercase"
                  style={{ fontSize: '3px', letterSpacing: '0.15em' }}
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
