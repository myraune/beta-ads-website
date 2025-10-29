import React from "react";

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large animated gradient blobs - more dynamic */}
      <div className="absolute -top-1/2 -left-1/3 w-[800px] h-[800px] bg-primary/8 rounded-full blur-[150px] animate-[blob_20s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 -right-1/3 w-[900px] h-[900px] bg-primary/6 rounded-full blur-[140px] animate-[blob_25s_ease-in-out_infinite_3s]" />
      <div className="absolute -bottom-1/3 left-1/4 w-[700px] h-[700px] bg-primary/7 rounded-full blur-[130px] animate-[blob_22s_ease-in-out_infinite_6s]" />
      <div className="absolute top-2/3 left-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-[blob_18s_ease-in-out_infinite_9s]" />
      
      {/* Medium gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[100px] animate-[drift_15s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-primary/4 rounded-full blur-[90px] animate-[drift_18s_ease-in-out_infinite_4s]" />
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[80px] animate-[drift_20s_ease-in-out_infinite_7s]" />
      
      {/* Floating particles - more of them */}
      <div className="absolute top-[15%] left-[20%] w-3 h-3 bg-primary/20 rounded-full animate-[float_7s_ease-in-out_infinite]" />
      <div className="absolute top-[35%] right-[25%] w-2 h-2 bg-primary/25 rounded-full animate-[float_9s_ease-in-out_infinite_2s]" />
      <div className="absolute bottom-[40%] left-[35%] w-2.5 h-2.5 bg-primary/20 rounded-full animate-[float_8s_ease-in-out_infinite_1s]" />
      <div className="absolute bottom-[25%] right-[30%] w-2 h-2 bg-primary/25 rounded-full animate-[float_10s_ease-in-out_infinite_3s]" />
      <div className="absolute top-[60%] left-[65%] w-3 h-3 bg-primary/20 rounded-full animate-[float_11s_ease-in-out_infinite_4s]" />
      <div className="absolute top-[45%] left-[15%] w-1.5 h-1.5 bg-primary/30 rounded-full animate-[float_6s_ease-in-out_infinite_2.5s]" />
      <div className="absolute bottom-[55%] right-[40%] w-2 h-2 bg-primary/25 rounded-full animate-[float_8.5s_ease-in-out_infinite_5s]" />
      <div className="absolute top-[70%] right-[15%] w-2.5 h-2.5 bg-primary/20 rounded-full animate-[float_9.5s_ease-in-out_infinite_1.5s]" />
      
      {/* Subtle mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-primary/5 opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-transparent to-background opacity-20" />
      
      {/* Animated flowing lines/waves */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-[slideRight_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/8 to-transparent animate-[slideLeft_10s_ease-in-out_infinite_3s]" />
      <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/8 to-transparent animate-[slideRight_12s_ease-in-out_infinite_6s]" />
    </div>
  );
};
