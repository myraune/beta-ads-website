import React from "react";
import { useParallax } from "@/hooks/useParallax";

export const AnimatedBackground: React.FC = () => {
  const { scrollY } = useParallax();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[hsl(222,20%,4%)] via-[hsl(0,30%,8%)] to-[hsl(222,20%,4%)]">
      {/* Aurora Layer 1 - Base glow (slowest, largest) */}
      <div 
        className="absolute -top-1/2 -left-1/4 w-[150%] h-[100%] opacity-40 animate-aurora-drift-1"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, hsl(0, 90%, 55%) 0%, hsl(330, 80%, 45%) 30%, transparent 70%)',
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />
      
      {/* Aurora Layer 2 - Primary wave */}
      <div 
        className="absolute top-0 -right-1/4 w-[120%] h-[80%] opacity-35 animate-aurora-drift-2"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 60% 30%, hsl(0, 80%, 55%) 0%, hsl(280, 70%, 40%) 40%, transparent 70%)',
          filter: 'blur(100px)',
          mixBlendMode: 'screen',
          transform: `translateY(${scrollY * 0.08}px)`,
        }}
      />
      
      {/* Aurora Layer 3 - Accent wave */}
      <div 
        className="absolute top-1/3 left-0 w-[100%] h-[60%] opacity-30 animate-aurora-drift-3"
        style={{
          background: 'radial-gradient(ellipse 70% 35% at 40% 50%, hsl(350, 85%, 60%) 0%, hsl(320, 70%, 45%) 35%, transparent 65%)',
          filter: 'blur(120px)',
          mixBlendMode: 'screen',
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Aurora Layer 4 - Secondary accent */}
      <div 
        className="absolute bottom-0 right-0 w-[80%] h-[50%] opacity-25 animate-aurora-drift-4"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 70% 70%, hsl(0, 70%, 50%) 0%, hsl(290, 60%, 35%) 40%, transparent 70%)',
          filter: 'blur(90px)',
          mixBlendMode: 'screen',
          transform: `translateY(${scrollY * 0.03}px)`,
        }}
      />

      {/* NEW Aurora Layer 5 - Teal/Cyan horizontal sweep */}
      <div 
        className="absolute top-1/4 -left-1/2 w-[200%] h-[40%] opacity-20 animate-aurora-sweep"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(180, 60%, 40%) 30%, hsl(200, 70%, 50%) 50%, hsl(220, 60%, 45%) 70%, transparent 100%)',
          filter: 'blur(100px)',
          mixBlendMode: 'screen',
          transform: `translateY(${scrollY * 0.06}px)`,
        }}
      />

      {/* NEW Aurora Layer 6 - Central pulsing glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] animate-aurora-pulse"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, hsl(0, 85%, 50%) 0%, hsl(340, 75%, 40%) 30%, transparent 60%)',
          filter: 'blur(150px)',
          mixBlendMode: 'screen',
          transform: `translateY(${scrollY * 0.04}px)`,
        }}
      />

      {/* Shimmer particles - Enhanced */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/50 rounded-full animate-shimmer-1" style={{ filter: 'blur(1px)', transform: `translateY(${scrollY * -0.02}px)` }} />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-primary/40 rounded-full animate-shimmer-2" style={{ filter: 'blur(1px)', transform: `translateY(${scrollY * -0.03}px)` }} />
      <div className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 bg-primary/45 rounded-full animate-shimmer-3" style={{ filter: 'blur(1px)', transform: `translateY(${scrollY * -0.02}px)` }} />
      <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-primary/35 rounded-full animate-shimmer-4" style={{ filter: 'blur(1px)', transform: `translateY(${scrollY * -0.04}px)` }} />
      <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-primary/40 rounded-full animate-shimmer-5" style={{ filter: 'blur(1px)', transform: `translateY(${scrollY * -0.02}px)` }} />
      {/* Additional shimmer particles */}
      <div className="absolute top-1/5 right-1/4 w-1 h-1 bg-cyan-400/30 rounded-full animate-shimmer-6" style={{ filter: 'blur(1px)', transform: `translateY(${scrollY * -0.05}px)` }} />
      <div className="absolute top-3/4 left-1/5 w-2 h-2 bg-primary/35 rounded-full animate-shimmer-7" style={{ filter: 'blur(1px)', transform: `translateY(${scrollY * -0.03}px)` }} />
      <div className="absolute bottom-1/5 right-1/2 w-1.5 h-1.5 bg-pink-400/25 rounded-full animate-shimmer-8" style={{ filter: 'blur(1px)', transform: `translateY(${scrollY * -0.04}px)` }} />
      <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-primary/30 rounded-full animate-shimmer-9" style={{ filter: 'blur(1px)', transform: `translateY(${scrollY * -0.02}px)` }} />
      <div className="absolute bottom-2/5 right-1/6 w-2 h-2 bg-cyan-500/20 rounded-full animate-shimmer-10" style={{ filter: 'blur(1px)', transform: `translateY(${scrollY * -0.03}px)` }} />
      
      {/* Subtle grain overlay for texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, hsl(222, 20%, 4%) 100%)',
        }}
      />
    </div>
  );
};
