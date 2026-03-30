import React from "react";

export const AnimatedBackground: React.FC = () => {
  // Clean solid background — hero section has its own Oslo aurora image
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-white dark:bg-[#0c0c0f]" />
  );
};
