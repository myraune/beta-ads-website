import React, { useEffect, useState, useRef, useMemo } from 'react';

interface Particle {
  id: number;
  duration: number;
  delay: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  color: string;
  transparentStop: number;
}

interface ParticleAnimationProps {
  containerSize?: string;
  particleCount?: number;
  colors?: string[];
  animationDuration?: [number, number];
  perspective?: string;
  particleWidth?: string;
  particleHeight?: string;
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const ParticleAnimation: React.FC<ParticleAnimationProps> = ({
  containerSize = '100vmin',
  particleCount = 500,
  colors = ['#e94f37', '#ff6b4a', '#f8f3d4', '#5adbb5'],
  animationDuration = [1, 2],
  perspective = '10vmin',
  particleWidth = '40%',
  particleHeight = '1px',
}) => {
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
    const randomRotation = () => random(-180, 180);

    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      duration: random(animationDuration[0], animationDuration[1]),
      delay: -random(0.1, 2),
      rotateX: randomRotation(),
      rotateY: randomRotation(),
      rotateZ: randomRotation(),
      color: randomColor(),
      transparentStop: random(50, 100),
    }));
    setParticles(newParticles);
  }, [particleCount]);

  // Build all keyframes in one style block
  const keyframesCSS = useMemo(() => {
    return particles
      .map(
        (p) => `
      @keyframes pa-move-${p.id} {
        0% {
          transform: translateX(50%) rotateX(${p.rotateX}deg) rotateY(${p.rotateY}deg) rotateZ(${p.rotateZ}deg) scale(2);
          opacity: 0;
        }
        20% { opacity: 1; }
        100% {
          transform: translateX(50%) rotateX(${p.rotateX}deg) rotateY(${p.rotateY}deg) rotateZ(${p.rotateZ}deg) scale(0);
          opacity: 1;
        }
      }`
      )
      .join('\n');
  }, [particles]);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective }}
    >
      <div
        className="relative grid place-items-center"
        style={{
          width: containerSize,
          height: containerSize,
          gridTemplateColumns: '1fr',
        }}
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute"
            style={{
              width: particleWidth,
              height: particleHeight,
              willChange: 'transform, opacity',
              transformStyle: 'preserve-3d',
              background: `linear-gradient(to left, ${particle.color}, transparent ${particle.transparentStop}%)`,
              animation: `pa-move-${particle.id} ${particle.duration}s linear infinite`,
              animationDelay: `${particle.delay}s`,
              transformOrigin: '0 center',
            }}
          />
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: keyframesCSS }} />
    </div>
  );
};

export { ParticleAnimation };
