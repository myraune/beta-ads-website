import React, { useEffect, useState } from "react";
import logoGlitch from "@/assets/logo-glitch.png";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [glitchIntensity, setGlitchIntensity] = useState(0);

  useEffect(() => {
    // Random glitch intensity changes
    const glitchInterval = setInterval(() => {
      setGlitchIntensity(Math.random());
    }, 100);

    // Complete loading after 3 seconds
    const loadTimer = setTimeout(() => {
      onLoadComplete();
    }, 3000);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(loadTimer);
    };
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      {/* Static noise overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none animate-pulse"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Glitching logo container */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Main logo with multiple glitch layers */}
        <img
          src={logoGlitch}
          alt="Beta Logo"
          className="absolute w-48 h-48 object-contain animate-glitch-main"
          style={{
            filter: `brightness(${0.8 + glitchIntensity * 0.4})`,
            transform: `translate(${glitchIntensity > 0.7 ? (Math.random() - 0.5) * 10 : 0}px, ${glitchIntensity > 0.7 ? (Math.random() - 0.5) * 10 : 0}px)`,
          }}
        />
        
        {/* Red channel glitch */}
        <img
          src={logoGlitch}
          alt=""
          className="absolute w-48 h-48 object-contain opacity-70 mix-blend-screen animate-glitch-red"
          style={{
            filter: 'sepia(1) saturate(10) hue-rotate(-50deg)',
            opacity: glitchIntensity > 0.6 ? 0.8 : 0,
            transform: `translate(${glitchIntensity > 0.6 ? -5 : 0}px, 0px)`,
          }}
        />
        
        {/* Blue channel glitch */}
        <img
          src={logoGlitch}
          alt=""
          className="absolute w-48 h-48 object-contain opacity-70 mix-blend-screen animate-glitch-blue"
          style={{
            filter: 'sepia(1) saturate(10) hue-rotate(180deg)',
            opacity: glitchIntensity > 0.6 ? 0.7 : 0,
            transform: `translate(${glitchIntensity > 0.6 ? 5 : 0}px, 0px)`,
          }}
        />

        {/* Scan lines effect */}
        <div 
          className="absolute inset-0 pointer-events-none animate-scan"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
        />
      </div>

      {/* Horizontal glitch bars */}
      {glitchIntensity > 0.8 && (
        <>
          <div 
            className="absolute left-0 right-0 h-1 bg-white opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px rgba(255,255,255,0.5)',
            }}
          />
          <div 
            className="absolute left-0 right-0 h-0.5 bg-primary opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
            }}
          />
        </>
      )}
    </div>
  );
};
