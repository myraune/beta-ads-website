import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import NeuralBackground from "@/components/ui/flow-field-background";

export const AnimatedBackground: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background" />
    );
  }

  // Light mode: warm rose gradient + visible particles
  if (resolvedTheme === "light") {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Stronger warm gradient — visible even in bright sunlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(8 70% 93% / 0.8) 0%, hsl(8 50% 95% / 0.5) 20%, hsl(8 30% 97% / 0.2) 40%, transparent 60%)",
          }}
        />
        <NeuralBackground
          color="#b07070"
          particleCount={300}
          speed={0.35}
          trailLength={8}
        />
      </div>
    );
  }

  // Dark mode: Three.js shader aurora
  return <AnimatedShaderBackground />;
};
