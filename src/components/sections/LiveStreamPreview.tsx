import React, { useState, useEffect } from "react";

type AdFormat = 'sidebar' | 'snipe' | 'cta' | null;

interface LiveStreamPreviewProps {
  id?: string;
}

const formatLabels: Record<string, string> = {
  sidebar: 'Side Bar',
  snipe: 'Snipe',
  cta: 'CTA Button',
};

export const LiveStreamPreview: React.FC<LiveStreamPreviewProps> = ({ id }) => {
  const [activeFormat, setActiveFormat] = useState<AdFormat>(null);
  const [formatIndex, setFormatIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const formats: AdFormat[] = ['sidebar', 'snipe', 'cta'];

  useEffect(() => {
    if (isHovered) return;

    const showFormat = () => {
      setActiveFormat(formats[formatIndex]);
    };

    const hideFormat = () => {
      setActiveFormat(null);
    };

    showFormat();

    const hideTimeout = setTimeout(hideFormat, 5000);
    const nextTimeout = setTimeout(() => {
      setFormatIndex((prev) => (prev + 1) % formats.length);
    }, 6500);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(nextTimeout);
    };
  }, [formatIndex, isHovered]);

  return (
    <section 
      id={id} 
      className="py-16 md:py-24 px-4 bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Native ads inside live streams
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Ads appear as part of the stream, not interruptions
          </p>
        </div>

        {/* Clean Stream Preview */}
        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/10 bg-[#18181b]/80 backdrop-blur-sm">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#18181b] border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-500 text-xs font-bold uppercase">Live</span>
              </div>
              <span className="text-white/60 text-xs">12.4K viewers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
              <span className="text-white text-sm font-medium">EmmelieNova</span>
            </div>
          </div>

          {/* Stream Content - Clean GIF background */}
          <div className="relative aspect-video bg-[#0e0e10] overflow-hidden">
            <img
              src="/lovable-uploads/streamer-emmelie.gif"
              alt="Live stream"
              className="w-full h-full object-cover"
            />

            {/* Sidebar Overlay */}
            <div
              className={`absolute top-4 left-4 transition-all duration-700 ease-out ${
                activeFormat === 'sidebar'
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-full opacity-0'
              }`}
            >
              <div className="w-32 md:w-40 bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 shadow-xl">
                <div className="aspect-[9/16] bg-gradient-to-br from-primary to-primary/60 flex flex-col items-center justify-center p-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AD</span>
                  </div>
                  <span className="text-white text-xs font-medium text-center">Surfshark VPN</span>
                  <span className="text-white/60 text-[10px] mt-1">Save 80% today</span>
                </div>
              </div>
            </div>

            {/* Snipe Banner */}
            <div
              className={`absolute bottom-0 left-0 right-0 transition-all duration-700 ease-out ${
                activeFormat === 'snipe'
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-full opacity-0'
              }`}
            >
              <div className="bg-gradient-to-r from-primary/90 to-primary/70 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">⚡</span>
                  </div>
                  <div>
                    <span className="text-white text-sm font-semibold block">Sponsored by Saily</span>
                    <span className="text-white/70 text-xs">Travel smarter with eSIM</span>
                  </div>
                </div>
                <button className="bg-white text-primary px-4 py-1.5 rounded-lg text-sm font-medium">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* CTA Below Stream */}
          <div className="relative px-4 py-3 bg-[#18181b] border-t border-white/5 min-h-[52px]">
            <div
              className={`transition-all duration-700 ease-out ${
                activeFormat === 'cta'
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
            >
              <div className="flex items-center gap-3">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                  Get NordVPN 70% Off
                </button>
                <span className="text-white/40 text-xs">Sponsored</span>
              </div>
            </div>
          </div>

          {/* Format Indicator */}
          <div className="flex items-center justify-center gap-6 py-4 bg-[#0e0e10] border-t border-white/5">
            {formats.map((format, i) => (
              <button
                key={format}
                onClick={() => setFormatIndex(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  formatIndex === i 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                }`}
              >
                <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  formatIndex === i ? 'bg-primary' : 'bg-white/30'
                }`} />
                <span className="text-sm font-medium">{formatLabels[format]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamPreview;