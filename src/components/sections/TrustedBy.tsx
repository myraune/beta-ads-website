import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Client logo data - static array for maintainability
const clientLogos = [
  { name: "Samsung", light: "/lovable-uploads/a1b004cc-077e-4fec-8947-bc6f1644b763.png", dark: "/lovable-uploads/28870ef0-e3e7-4ea6-b706-1b3a3cd3e1a4.png" },
  { name: "Vipps", light: "/lovable-uploads/d8828941-198c-4e8f-b80d-b2d2755d18cc.png", dark: "/lovable-uploads/4d94632b-4d42-48bb-bff0-40434286122a.png" },
  { name: "Komplett", light: "/lovable-uploads/e6d9646d-bf5f-471c-a2d8-1f06c274f570.png", dark: "/lovable-uploads/d3f9fcbc-48d7-4015-82cd-721f68f85de3.png" },
  { name: "Schibsted", light: "/lovable-uploads/71765092-972e-4792-a241-0f155a62af68.png", dark: "/lovable-uploads/711bde8c-3d71-40eb-8c93-2f8bf7350a57.png" },
  { name: "Gjensidige", light: "/lovable-uploads/4d935c76-5555-4f40-a9be-05ff945480d4.png", dark: "/lovable-uploads/bf505fdb-dc9b-4a82-93b6-f604c840737f.png" },
  { name: "OBOS", light: "/lovable-uploads/a716bb91-525c-4779-a530-ceb1daad954f.png", dark: "/lovable-uploads/1e56f4d8-0545-4132-8d6f-8738cdb1ae4f.png" },
  { name: "Statkraft", light: "/lovable-uploads/1fc4788c-f973-403f-9b01-4f3b4fa2ba20.png", dark: "/lovable-uploads/2d3c1437-7ed1-4a6a-b3dc-44752c80104d.png" },
  { name: "Circle K", light: "/lovable-uploads/cda69e31-7632-469a-b206-367ba4350480.png", dark: "/lovable-uploads/9fee36e6-a901-40bb-961b-b20b878b80de.png" },
];

// Duplicate logos for seamless infinite scroll
const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

export const TrustedBy: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      ref={ref}
      className={`py-12 lg:py-16 overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Logo Carousel */}
      <div className="relative">
        <div 
          className="flex overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          {/* Light theme logos */}
          <div 
            className="flex gap-12 lg:gap-16 animate-scroll dark:hidden"
            style={{
              animation: 'scroll 40s linear infinite',
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`light-${logo.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-8 lg:h-10"
              >
                <img
                  src={logo.light}
                  alt={logo.name}
                  className="h-full w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          
          {/* Dark theme logos */}
          <div 
            className="hidden dark:flex gap-12 lg:gap-16"
            style={{
              animation: 'scroll 40s linear infinite',
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`dark-${logo.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-8 lg:h-10"
              >
                <img
                  src={logo.dark}
                  alt={logo.name}
                  className="h-full w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
};
