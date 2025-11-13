import React from "react";

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
      <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] animate-[pulse_12s_ease-in-out_infinite_4s]" />
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-[float_8s_ease-in-out_infinite_2s]" />
      <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-primary/20 rounded-full animate-[float_7s_ease-in-out_infinite_1s]" />
      <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-primary/20 rounded-full animate-[float_9s_ease-in-out_infinite_3s]" />
      <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-primary/20 rounded-full animate-[float_10s_ease-in-out_infinite_4s]" />
    </div>
  );
};
