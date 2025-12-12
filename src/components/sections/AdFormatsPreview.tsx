import React from "react";
import { Sparkles, Monitor, MessageSquare, Bot } from "lucide-react";

interface AdFormatsPreviewProps {
  t: any;
}

export const AdFormatsPreview: React.FC<AdFormatsPreviewProps> = ({ t }) => {
  const adFormats = [
    {
      icon: Sparkles,
      title: "Animated Overlay",
      description: "Eye-catching animated graphics that appear on stream without disrupting the content",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
    {
      icon: Monitor,
      title: "Banner Under Stream",
      description: "Branded banner displayed below the stream with clickable commands",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
    },
    {
      icon: MessageSquare,
      title: "CTA in Title",
      description: "Interactive commands in stream info that viewers can use in chat",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
    {
      icon: Bot,
      title: "Chatbot",
      description: "Automated bot that responds to viewers and promotes brand engagement",
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
    },
  ];

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm tracking-widest uppercase mb-4 font-light">
            Our Ad Formats
          </p>
          <h2 className="text-4xl md:text-5xl font-extralight text-foreground mb-6 tracking-tight">
            Four Ways to Engage
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light">
            Each format is designed to seamlessly integrate with the streaming experience
          </p>
        </div>

        {/* Mock Stream Preview */}
        <div className="bg-[#18181b] rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-16">
          <div className="flex flex-col lg:flex-row">
            {/* Stream Area */}
            <div className="flex-1">
              {/* Stream Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-white/70 text-sm font-medium">LIVE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/50 text-xs">1,234 viewers</span>
                </div>
              </div>

              {/* Stream Video Area */}
              <div className="relative aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                {/* Animated Overlay Indicator */}
                <div className="absolute left-4 bottom-4 flex items-center gap-2">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg animate-pulse flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary text-[10px] text-white font-bold rounded uppercase">
                      Animation
                    </div>
                  </div>
                </div>

                {/* Stream Content Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/30">
                    <Monitor className="w-16 h-16 mx-auto mb-2" />
                    <span className="text-sm">Stream Content</span>
                  </div>
                </div>
              </div>

              {/* Banner Under Stream */}
              <div className="relative px-4 py-3 bg-[#0e0e10] border-t border-white/10">
                <div className="absolute -top-3 left-4 px-2 py-0.5 bg-blue-500 text-[10px] text-white font-bold rounded uppercase">
                  Banner
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/50 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">BA</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-sm">StreamerName</span>
                        <span className="text-purple-400 text-xs">Partner</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/50 text-xs">
                        <span>Just Chatting</span>
                        <span>•</span>
                        <span className="text-green-400 font-medium relative">
                          !surfshark
                          <span className="absolute -top-4 left-0 px-1.5 py-0.5 bg-green-500 text-[8px] text-white font-bold rounded uppercase whitespace-nowrap">
                            CTA
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-white text-xs font-medium rounded transition-colors">
                      Follow
                    </button>
                    <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col">
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-white/10">
                <span className="text-white font-medium text-sm">Stream Chat</span>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-3 min-h-[200px] lg:min-h-0">
                <div className="flex items-start gap-2">
                  <span className="text-purple-400 text-xs font-medium">viewer123:</span>
                  <span className="text-white/80 text-xs">Great stream! 🎮</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 text-xs font-medium">gamer_pro:</span>
                  <span className="text-white/80 text-xs">!surfshark</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-400 text-xs font-medium flex items-center gap-1">
                    <Bot className="w-3 h-3" />
                    BetaBot:
                  </span>
                  <span className="text-white/80 text-xs">🎉 Click here for 83% off Surfshark VPN!</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 text-xs font-medium">new_viewer:</span>
                  <span className="text-white/80 text-xs">Thanks for the link!</span>
                </div>
              </div>

              {/* Chatbot CTA */}
              <div className="relative p-4 border-t border-white/10 bg-[#0e0e10]">
                <div className="absolute -top-3 right-4 px-2 py-0.5 bg-orange-500 text-[10px] text-white font-bold rounded uppercase">
                  Chatbot
                </div>
                <button className="w-full py-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2">
                  <Bot className="w-4 h-4" />
                  Get 83% off Surfshark VPN
                </button>
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Send a message"
                    className="flex-1 px-3 py-2 bg-[#18181b] border border-white/10 rounded text-white text-xs placeholder:text-white/30"
                    disabled
                  />
                  <button className="px-3 py-2 bg-white/10 text-white/50 text-xs rounded">
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Format Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {adFormats.map((format, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 ${format.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <format.icon className={`w-6 h-6 ${format.color}`} />
              </div>
              <h3 className="text-foreground font-medium mb-2">{format.title}</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">
                {format.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
