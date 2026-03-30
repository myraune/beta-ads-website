import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface NeuralBackgroundProps {
  className?: string;
  color?: string;
  particleCount?: number;
  speed?: number;
  /** How many past positions to keep for trails (0 = no trails) */
  trailLength?: number;
}

export default function NeuralBackground({
  className,
  color = "#e8e0e0",
  particleCount = 400,
  speed = 0.6,
  trailLength = 8,
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      age: number;
      life: number;
      trail: { x: number; y: number }[];

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100;
        this.trail = [];
      }

      update() {
        // Store trail position
        if (trailLength > 0) {
          this.trail.push({ x: this.x, y: this.y });
          if (this.trail.length > trailLength) {
            this.trail.shift();
          }
        }

        const angle =
          (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;

        this.vx += Math.cos(angle) * 0.2 * speed;
        this.vy += Math.sin(angle) * 0.2 * speed;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 150;

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          this.vx -= dx * force * 0.05;
          this.vy -= dy * force * 0.05;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;

        this.age++;
        if (this.age > this.life) {
          this.reset();
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100;
        this.trail = [];
      }

      draw(context: CanvasRenderingContext2D) {
        // Life-based fade
        const lifeAlpha = 1 - Math.abs(this.age / this.life - 0.5) * 2;

        // Draw trail
        if (trailLength > 0 && this.trail.length > 1) {
          for (let i = 0; i < this.trail.length; i++) {
            const t = this.trail[i];
            const trailAlpha = (i / this.trail.length) * lifeAlpha * 0.6;
            context.globalAlpha = trailAlpha;
            context.fillStyle = color;
            const size = 1 + (i / this.trail.length) * 0.5;
            context.fillRect(t.x, t.y, size, size);
          }
        }

        // Draw particle head
        context.globalAlpha = lifeAlpha * 0.9;
        context.fillStyle = color;
        context.fillRect(this.x, this.y, 2, 2);
      }
    }

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Fully clear canvas each frame — no accumulation, pure transparent
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    init();
    animate();

    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, particleCount, speed, trailLength]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden",
        className
      )}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
