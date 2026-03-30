import React from "react";
import { SpiralAnimation } from "@/components/ui/spiral-animation";

export const PageLoader: React.FC = () => (
  <div
    style={{
      animation: "loaderFadeOut 0.4s ease 0.85s forwards",
    }}
  >
    <style>{`
      @keyframes loaderFadeOut {
        from { opacity: 1; }
        to   { opacity: 0; }
      }
    `}</style>
    <SpiralAnimation
      totalDots={800}
      dotColor="#e94f37"
      backgroundColor="#000"
      duration={2}
    />
  </div>
);

export default PageLoader;
