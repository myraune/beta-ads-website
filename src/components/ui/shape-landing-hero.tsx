"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ElegantShape — animated floating pill/ellipse.
 * Place inside a relative container with overflow-hidden.
 */
export function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute pointer-events-none", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-white/[0.08]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.04)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * GeometricBackground — drop this inside a `relative overflow-hidden`
 * wrapper. It renders floating shapes tuned to Beta Ads brand colors.
 * Entirely decorative — pointer-events: none on all children.
 */
export function GeometricBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* ── Row 1: 0–18% ── */}
      <ElegantShape delay={0.2}  width={380} height={88}  rotate={12}  gradient="from-primary/[0.26]"                    className="left-[-6%]  top-[2%]"  />
      <ElegantShape delay={0.55} width={200} height={50}  rotate={24}  gradient="from-primary/[0.20]"                    className="right-[14%] top-[4%]"  />
      <ElegantShape delay={0.8}  width={140} height={36}  rotate={-30} gradient="from-[hsl(170_50%_50%_/_0.12)]"         className="left-[34%]  top-[1%]"  />

      {/* ── Row 2: 18–38% ── */}
      <ElegantShape delay={0.35} width={320} height={76}  rotate={-14} gradient="from-primary/[0.22]"                    className="right-[-4%] top-[20%]" />
      <ElegantShape delay={0.6}  width={240} height={60}  rotate={8}   gradient="from-primary/[0.18]"                    className="left-[18%]  top-[28%]" />

      {/* ── Row 3: 38–58% ── */}
      <ElegantShape delay={0.42} width={300} height={72}  rotate={-7}  gradient="from-primary/[0.22]"                    className="left-[3%]   top-[42%]" />
      <ElegantShape delay={0.7}  width={200} height={50}  rotate={18}  gradient="from-[hsl(170_50%_50%_/_0.12)]"         className="right-[20%] top-[50%]" />

      {/* ── Row 4: 58–78% ── */}
      <ElegantShape delay={0.5}  width={340} height={80}  rotate={-18} gradient="from-primary/[0.20]"                    className="right-[-3%] top-[62%]" />
      <ElegantShape delay={0.65} width={220} height={56}  rotate={10}  gradient="from-primary/[0.16]"                    className="left-[22%]  top-[70%]" />

      {/* ── Row 5: 78–100% ── */}
      <ElegantShape delay={0.75} width={260} height={64}  rotate={-9}  gradient="from-primary/[0.20]"                    className="left-[5%]   bottom-[5%]" />
      <ElegantShape delay={0.9}  width={180} height={46}  rotate={16}  gradient="from-[hsl(170_50%_50%_/_0.10)]"         className="right-[12%] bottom-[8%]" />
    </div>
  );
}
