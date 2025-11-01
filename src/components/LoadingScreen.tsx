import React, { useEffect, useState } from "react";
import logoGlitch from "@/assets/logo-glitch.png";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [glitchIntensity, setGlitchIntensity] = useState(0);

  useEffect(() => {
    // Random glitch intensity changes (less frequent)
    const glitchInterval = setInterval(() => {
      setGlitchIntensity(Math.random());
    }, 180);

    // Complete loading after 5 seconds
    const loadTimer = setTimeout(() => {
      onLoadComplete();
    }, 5000);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(loadTimer);
    };
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      {/* Clean logo with subtle glitch */}
      <div className="relative flex items-center justify-center">
        <img
          src={logoGlitch}
          alt="Beta Logo"
          className="w-40 h-40 object-contain"
          style={{
            opacity: glitchIntensity > 0.85 ? 0.85 + Math.random() * 0.15 : 1,
            transform: glitchIntensity > 0.85 
              ? `translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 4}px)` 
              : 'translate(0, 0)',
            transition: 'none',
          }}
        />
      </div>
    </div>
  );
};
