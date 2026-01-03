import React, { useState, useEffect } from "react";

type AdFormat = 'sidebar' | 'snipe' | 'chat' | 'cta' | null;

interface LiveStreamPreviewProps {
  id?: string;
}

const formatLabels: Record<string, string> = {
  sidebar: 'Side Bar',
  snipe: 'Snipe',
  chat: 'Chat Message',
  cta: 'CTA Button',
};

const chatMessages = [
  { user: "StreamViewer", color: "#3498db", message: "lets gooo" },
  { user: "GamerGirl99", color: "#e91e63", message: "so good!" },
  { user: "ProPlayer", color: "#f39c12", message: "nice one" },
];

export const LiveStreamPreview: React.FC<LiveStreamPreviewProps> = ({ id }) => {
  const [activeFormat, setActiveFormat] = useState<AdFormat>(null);
  const [formatIndex, setFormatIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const formats: AdFormat[] = ['sidebar', 'snipe', 'chat', 'cta'];

  useEffect(() => {
    if (isHovered) return;

    const showFormat = () => {
      setActiveFormat(formats[formatIndex]);
    };

    const hideFormat = () => {
      setActiveFormat(null);
    };

    showFormat();

    const hideTimeout = setTimeout(hideFormat, 4500);
    const nextTimeout = setTimeout(() => {
      setFormatIndex((prev) => (prev + 1) % formats.length);
    }, 6000);

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
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Native ads inside live streams
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Ads appear as part of the stream, not interruptions
          </p>
        </div>

        {/* Twitch-like Container */}
        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/10 bg-[#18181b]/80 backdrop-blur-sm">
          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row">
            {/* Stream Window */}
            <div className="flex-1 relative">
              {/* Top Bar */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#18181b] border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-500 text-xs font-bold uppercase">Live</span>
                  </div>
                  <span className="text-white/60 text-xs">12.4K</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                  <span className="text-white text-sm font-medium">EmmelieNova</span>
                </div>
              </div>

              {/* Stream Content */}
              <div className="relative aspect-video bg-[#0e0e10] overflow-hidden">
                {/* Streamer Video - Static image instead of GIF */}
                <img
                  src="/lovable-uploads/twitch-ad-example.png"
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
                  <div className="w-28 md:w-36 bg-black/70 backdrop-blur-sm rounded-lg p-2 border border-white/10 shadow-lg">
                    <div className="aspect-[9/16] bg-gradient-to-br from-primary/80 to-primary/40 rounded flex items-center justify-center">
                      <span className="text-white/90 text-xs font-medium">Side Bar</span>
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
                  <div className="bg-black/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">AD</span>
                      </div>
                      <div>
                        <span className="text-white text-sm font-medium block">Sponsored Message</span>
                        <span className="text-white/50 text-xs">saily.com</span>
                      </div>
                    </div>
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
                  <button className="bg-primary/90 hover:bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm font-medium transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Column */}
            <div className="w-full lg:w-64 bg-[#18181b] border-t lg:border-t-0 lg:border-l border-white/5">
              {/* Chat Header */}
              <div className="px-3 py-2 border-b border-white/5">
                <span className="text-white/60 text-sm font-medium">Chat</span>
              </div>

              {/* Chat Messages */}
              <div className="h-40 lg:h-72 overflow-hidden relative">
                <div className="absolute inset-0 flex flex-col justify-end p-3 space-y-2">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className="text-sm">
                      <span style={{ color: msg.color }} className="font-semibold">
                        {msg.user}
                      </span>
                      <span className="text-white/40">: </span>
                      <span className="text-white/80">{msg.message}</span>
                    </div>
                  ))}

                  {/* Branded Chat Message */}
                  <div
                    className={`transition-all duration-700 ease-out ${
                      activeFormat === 'chat'
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-8 opacity-0'
                    }`}
                  >
                    <div className="bg-primary/15 rounded px-2 py-1.5 border-l-2 border-primary/60">
                      <div className="text-sm">
                        <span className="text-primary font-semibold">Sponsor</span>
                        <span className="text-white/40">: </span>
                        <span className="text-white/70">Check out our latest offer!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="px-3 py-2 border-t border-white/5">
                <div className="bg-[#0e0e10] rounded px-3 py-2 text-white/30 text-sm">
                  Send a message
                </div>
              </div>
            </div>
          </div>

          {/* Format Indicator with Labels */}
          <div className="flex items-center justify-center gap-4 py-4 bg-[#18181b] border-t border-white/5">
            {formats.map((format, i) => (
              <button
                key={format}
                onClick={() => setFormatIndex(i)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                  formatIndex === i 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  formatIndex === i ? 'bg-primary' : 'bg-white/30'
                }`} />
                <span className="text-xs font-medium">{formatLabels[format]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamPreview;
