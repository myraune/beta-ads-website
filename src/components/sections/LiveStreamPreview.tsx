import React, { useState, useEffect } from "react";

type AdFormat = 'animation' | 'banner' | 'chat' | 'cta' | null;

interface LiveStreamPreviewProps {
  id?: string;
}

const chatMessages = [
  { user: "xQcFan123", color: "#9b59b6", message: "POG" },
  { user: "StreamViewer", color: "#3498db", message: "lets gooo" },
  { user: "GamerGirl99", color: "#e91e63", message: "so good!" },
  { user: "TwitchUser", color: "#2ecc71", message: "Kappa" },
  { user: "ProPlayer", color: "#f39c12", message: "nice one" },
  { user: "ChatLurker", color: "#1abc9c", message: "haha" },
  { user: "Mod_Steve", color: "#e74c3c", message: "calm chat" },
  { user: "NewViewer01", color: "#9b59b6", message: "first time here" },
];

export const LiveStreamPreview: React.FC<LiveStreamPreviewProps> = ({ id }) => {
  const [activeFormat, setActiveFormat] = useState<AdFormat>(null);
  const [formatIndex, setFormatIndex] = useState(0);

  const formats: AdFormat[] = ['animation', 'banner', 'chat', 'cta'];

  useEffect(() => {
    const showFormat = () => {
      setActiveFormat(formats[formatIndex]);
    };

    const hideFormat = () => {
      setActiveFormat(null);
    };

    showFormat();

    const hideTimeout = setTimeout(hideFormat, 2500);
    const nextTimeout = setTimeout(() => {
      setFormatIndex((prev) => (prev + 1) % formats.length);
    }, 3500);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(nextTimeout);
    };
  }, [formatIndex]);

  return (
    <section id={id} className="py-16 md:py-24 px-4 bg-[#0e0e10]">
      <div className="max-w-6xl mx-auto">
        {/* Twitch-like Container */}
        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/10">
          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row">
            {/* Stream Window */}
            <div className="flex-1 relative bg-[#18181b]">
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
                {/* Streamer Video */}
                <img
                  src="/lovable-uploads/streamer-emmelie.gif"
                  alt="Live stream"
                  className="w-full h-full object-cover"
                />

                {/* Animation Overlay - Product slide-in */}
                <div
                  className={`absolute top-1/4 left-4 transition-all duration-700 ease-in-out ${
                    activeFormat === 'animation'
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-full opacity-0'
                  }`}
                >
                  <div className="w-24 md:w-32 lg:w-36 bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-white/10 shadow-lg shadow-black/40">
                    <div className="aspect-[9/16] bg-gradient-to-br from-orange-500/80 to-yellow-500/80 rounded flex items-center justify-center">
                      <span className="text-white/90 text-xs font-medium">Ad</span>
                    </div>
                  </div>
                </div>

                {/* Banner - Subtle snipe */}
                <div
                  className={`absolute bottom-0 left-0 right-0 transition-all duration-700 ease-in-out ${
                    activeFormat === 'banner'
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-full opacity-0'
                  }`}
                >
                  <div className="bg-black/70 backdrop-blur-sm px-4 py-2.5 flex items-center justify-between border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-primary/60" />
                      <span className="text-white/90 text-sm font-medium">Sponsored</span>
                    </div>
                    <span className="text-white/50 text-xs">saily.com</span>
                  </div>
                </div>
              </div>

              {/* CTA Below Stream */}
              <div className="relative px-4 py-3 bg-[#18181b] border-t border-white/5 min-h-[52px]">
                <div
                  className={`transition-all duration-700 ease-in-out ${
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
            <div className="w-full lg:w-72 bg-[#18181b] border-t lg:border-t-0 lg:border-l border-white/5">
              {/* Chat Header */}
              <div className="px-3 py-2 border-b border-white/5">
                <span className="text-white/60 text-sm font-medium">Chat</span>
              </div>

              {/* Chat Messages */}
              <div className="h-48 lg:h-80 overflow-hidden relative">
                <div className="absolute inset-0 flex flex-col justify-end p-3 space-y-1.5">
                  {chatMessages.slice(0, 5).map((msg, i) => (
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
                    className={`transition-all duration-700 ease-in-out ${
                      activeFormat === 'chat'
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-4 opacity-0'
                    }`}
                  >
                    <div className="bg-primary/15 rounded px-2 py-1.5 border-l-2 border-primary/60">
                      <div className="text-sm">
                        <span className="text-primary/80 font-semibold">Sponsor</span>
                        <span className="text-white/40">: </span>
                        <span className="text-white/70">Check this out</span>
                      </div>
                    </div>
                  </div>

                  {chatMessages.slice(5).map((msg, i) => (
                    <div key={i + 5} className="text-sm">
                      <span style={{ color: msg.color }} className="font-semibold">
                        {msg.user}
                      </span>
                      <span className="text-white/40">: </span>
                      <span className="text-white/80">{msg.message}</span>
                    </div>
                  ))}
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

          {/* Format Indicator Dots */}
          <div className="flex items-center justify-center gap-2 py-3 bg-[#18181b] border-t border-white/5">
            {formats.map((format, i) => (
              <button
                key={format}
                onClick={() => setFormatIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  formatIndex === i ? 'bg-primary w-4' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamPreview;
