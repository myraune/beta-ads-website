import React from "react";

interface LiveStreamPreviewProps {
  id?: string;
}

export const LiveStreamPreview: React.FC<LiveStreamPreviewProps> = ({ id }) => {
  return (
    <section id={id} className="py-16 md:py-24 px-4 bg-transparent">
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

        {/* Stream Preview Container */}
        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/10 bg-[#18181b]">
          
          {/* Title Bar with !glorious command */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#18181b] border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-500 text-xs font-bold uppercase">Live</span>
              </div>
              <span className="text-white/60 text-xs">12.4K viewers</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                <span className="text-white text-sm font-medium">EmmelieNova</span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <span className="text-primary font-semibold text-sm">!glorious</span>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex">
            {/* Stream + Banner */}
            <div className="flex-1">
              {/* Rich Media Stream Background */}
              <div className="relative aspect-video bg-[#0e0e10]">
                <img
                  src="/lovable-uploads/richMediaDemo1.png"
                  alt="Rich media ad overlay on stream"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Snipe Banner */}
              <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] px-4 py-3 flex items-center justify-between border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">G</span>
                  </div>
                  <div>
                    <span className="text-white text-sm font-semibold block">Sponsored by Glorious</span>
                    <span className="text-white/60 text-xs">Get 20% off gaming gear</span>
                  </div>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Chat Section */}
            <div className="w-64 bg-[#0e0e10] border-l border-white/5 flex flex-col">
              <div className="px-3 py-2 border-b border-white/5">
                <span className="text-white/80 text-xs font-semibold uppercase tracking-wide">Stream Chat</span>
              </div>
              
              <div className="flex-1 p-3 space-y-2 text-sm overflow-hidden">
                {/* Normal chat messages */}
                <div className="flex gap-2">
                  <span className="text-purple-400 font-medium shrink-0">xNinja:</span>
                  <span className="text-white/80">gg nice play</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-400 font-medium shrink-0">StreamFan:</span>
                  <span className="text-white/80">let's gooo</span>
                </div>
                
                {/* CTA Ad Message */}
                <div className="bg-primary/20 border border-primary/30 rounded-lg p-2 my-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-primary text-[10px] font-bold uppercase">Sponsored</span>
                  </div>
                  <p className="text-white text-xs font-medium">
                    Use code EMMELIE for 20% off at glorious.com!
                  </p>
                </div>
                
                {/* More normal chat */}
                <div className="flex gap-2">
                  <span className="text-orange-400 font-medium shrink-0">ProGamer:</span>
                  <span className="text-white/80">!glorious</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-cyan-400 font-medium shrink-0">ChillVibes:</span>
                  <span className="text-white/80">love this keyboard</span>
                </div>
              </div>
              
              {/* Chat input */}
              <div className="p-2 border-t border-white/5">
                <div className="bg-white/5 rounded px-3 py-2 text-white/30 text-xs">
                  Send a message
                </div>
              </div>
            </div>
          </div>

          {/* Format Labels */}
          <div className="flex items-center justify-center gap-8 py-4 bg-[#0e0e10] border-t border-white/5">
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs">Rich Media Overlay</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs">Snipe Banner</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs">Chat CTA</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs">Title Command</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamPreview;
