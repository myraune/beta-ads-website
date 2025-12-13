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

    // Show format
    showFormat();

    // Hide after 2.5s
    const hideTimeout = setTimeout(hideFormat, 2500);

    // Move to next format after 3.5s (2.5s visible + 1s pause)
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
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">
            Live Preview
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3">
            See It In Action
          </h2>
        </div>

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
                  <span className="text-white/60 text-xs">12.4K viewers</span>
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

                {/* Animation Overlay */}
                <div
                  className={`absolute top-1/4 left-4 transition-all duration-500 ease-out ${
                    activeFormat === 'animation'
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-full opacity-0'
                  }`}
                >
                  <div className="relative">
                    <div className="absolute -top-6 left-0 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-primary text-xs font-semibold uppercase tracking-wide">Animation</span>
                    </div>
                    <div className="w-24 md:w-32 lg:w-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-2 shadow-lg shadow-orange-500/30">
                      <div className="aspect-[9/16] bg-black/20 rounded flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-lg md:text-2xl font-bold">📱</div>
                          <div className="text-[10px] md:text-xs mt-1 opacity-80">Saily VPN</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Banner */}
                <div
                  className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out ${
                    activeFormat === 'banner'
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-full opacity-0'
                  }`}
                >
                  <div className="relative">
                    <div className="absolute -top-6 left-4 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-primary text-xs font-semibold uppercase tracking-wide">Banner</span>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 px-4 py-2 flex items-center justify-center gap-3">
                      <span className="text-black font-bold text-sm md:text-base">⚡ USE CODE "STREAM" FOR 20% OFF</span>
                      <span className="text-black/60 text-xs md:text-sm">saily.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Below Stream */}
              <div className="relative px-4 py-3 bg-[#18181b] border-t border-white/5 min-h-[52px]">
                <div
                  className={`transition-all duration-500 ease-out ${
                    activeFormat === 'cta'
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-0'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-primary text-xs font-semibold uppercase tracking-wide">CTA</span>
                    </div>
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded text-sm font-medium transition-colors">
                      !SAILY - Get Your Discount
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Column */}
            <div className="w-full lg:w-72 bg-[#18181b] border-t lg:border-t-0 lg:border-l border-white/5">
              {/* Chat Header */}
              <div className="px-3 py-2 border-b border-white/5">
                <span className="text-white/60 text-sm font-medium">Stream Chat</span>
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
                    className={`transition-all duration-500 ease-out ${
                      activeFormat === 'chat'
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-4 opacity-0'
                    }`}
                  >
                    <div className="relative bg-primary/20 rounded px-2 py-1.5 border-l-2 border-primary">
                      <div className="absolute -left-16 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        <span className="text-primary text-xs font-semibold uppercase tracking-wide">Chat</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      <div className="text-sm">
                        <span className="text-primary font-semibold">BetaBot</span>
                        <span className="text-white/40">: </span>
                        <span className="text-white">🎁 Click here for 20% off!</span>
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
          <div className="flex items-center justify-center gap-2 py-4 bg-[#18181b] border-t border-white/5">
            {formats.map((format, i) => (
              <button
                key={format}
                onClick={() => setFormatIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  formatIndex === i ? 'bg-primary scale-125' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Format Legend */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8">
          {[
            { key: 'animation', label: 'Animation' },
            { key: 'banner', label: 'Banner' },
            { key: 'chat', label: 'Chat' },
            { key: 'cta', label: 'CTA' },
          ].map((item) => (
            <div
              key={item.key}
              className={`flex items-center gap-2 transition-all duration-300 ${
                activeFormat === item.key ? 'text-primary scale-105' : 'text-white/50'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  activeFormat === item.key ? 'bg-primary' : 'bg-white/30'
                }`}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveStreamPreview;
