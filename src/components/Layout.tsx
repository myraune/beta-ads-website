import React, { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { AnimatedBackground } from "./AnimatedBackground";
import { CursorGlow } from "./CursorGlow";
import { useKonamiCode } from "@/hooks/useEasterEggs";

export const Layout: React.FC = () => {
  const [partyMode, setPartyMode] = useState(false);

  const activateParty = useCallback(() => {
    setPartyMode(true);
    // Auto-disable after 5 seconds
    setTimeout(() => setPartyMode(false), 5000);
  }, []);

  useKonamiCode(activateParty);

  return (
    <div className="min-h-screen bg-background relative" style={{ overflowX: 'clip' }}>
      <CursorGlow />
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>

      {/* Konami code easter egg — party mode overlay */}
      {partyMode && (
        <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
          {/* Confetti-like particles */}
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                backgroundColor: [
                  "#E05159",
                  "#5adbb5",
                  "#FFD700",
                  "#7B61FF",
                  "#FF6B6B",
                  "#4ECDC4",
                ][i % 6],
                animationDuration: `${1 + Math.random() * 2}s`,
                animationDelay: `${Math.random() * 0.5}s`,
                opacity: 0.8,
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-white drop-shadow-lg animate-bounce" style={{ textShadow: '0 0 40px rgba(224,81,89,0.8)' }}>
              GG! 🎮
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
