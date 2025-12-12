import React from "react";
import { Sparkles, Monitor, MessageSquare, Bot, Users, Clock, Check } from "lucide-react";

interface AdFormatsPreviewProps {
  t: any;
}

export const AdFormatsPreview: React.FC<AdFormatsPreviewProps> = ({ t }) => {
  const chatMessages = [
    { username: "Flash", color: "text-rose-400", message: "Hei" },
    { username: "Erraa", color: "text-emerald-400", message: "Yooo" },
    { username: "lafter", color: "text-orange-400", message: "Råått!" },
    { username: "Effects25", color: "text-blue-400", message: "Hey" },
    { username: "Myraune", color: "text-purple-400", message: "Se DM!" },
    { username: "Yaklama", color: "text-cyan-400", message: "Gud å stilig" },
    { username: "Kva3w", color: "text-yellow-400", message: "Jeg liker pannekaker" },
    { username: "Magnus", color: "text-pink-400", message: "!saily" },
  ];

  const adFormats = [
    {
      icon: Sparkles,
      title: "Animated Overlay",
      description: "Eye-catching animated graphics that appear on stream without disrupting the content",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      hoverGlow: "hover:shadow-purple-500/30",
    },
    {
      icon: Monitor,
      title: "Banner Under Stream",
      description: "Branded banner displayed below the stream with clickable commands",
      color: "text-amber-400",
      bgColor: "bg-amber-500/20",
      hoverGlow: "hover:shadow-amber-500/30",
    },
    {
      icon: MessageSquare,
      title: "CTA in Title",
      description: "Interactive commands in stream info that viewers can use in chat",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      hoverGlow: "hover:shadow-green-500/30",
    },
    {
      icon: Bot,
      title: "Chatbot",
      description: "Automated bot that responds to viewers and promotes brand engagement",
      color: "text-primary",
      bgColor: "bg-primary/20",
      hoverGlow: "hover:shadow-primary/30",
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

        {/* Mock Stream Preview - Twitch Style */}
        <div className="bg-[#18181b] rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-16">
          <div className="flex flex-col lg:flex-row">
            {/* Stream Area */}
            <div className="flex-1">
              {/* Stream Video Area with Gaming Background */}
              <div className="relative aspect-video bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] overflow-hidden">
                {/* Gaming atmosphere background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

                {/* Animated Phone Overlay - Saily Style */}
                <div className="absolute left-6 md:left-12 bottom-8 md:bottom-12 z-10">
                  <div className="relative animate-[float_3s_ease-in-out_infinite]">
                    {/* Phone Frame */}
                    <div className="w-20 h-36 md:w-28 md:h-52 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl md:rounded-3xl p-1 shadow-2xl shadow-black/50 border border-white/10">
                      <div className="w-full h-full bg-gradient-to-b from-amber-400 via-amber-500 to-orange-500 rounded-xl md:rounded-2xl flex flex-col items-center justify-center overflow-hidden">
                        {/* Phone Screen Content */}
                        <div className="text-center p-2">
                          <div className="text-white font-bold text-xs md:text-lg tracking-wide">Saily</div>
                          <div className="text-white/80 text-[8px] md:text-xs mt-1">eSIM</div>
                          <div className="mt-2 md:mt-4 w-8 h-8 md:w-12 md:h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 md:w-6 md:h-6 bg-white rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Animation Label */}
                    <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 px-2 py-1 bg-purple-500 text-[8px] md:text-[10px] text-white font-bold rounded uppercase shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-purple-500/50 hover:shadow-xl hover:bg-purple-400">
                      Animation
                    </div>
                  </div>
                </div>

                {/* Stream Stats Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-red-600 rounded text-white text-xs font-medium">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-black/60 rounded text-white text-xs">
                    <Users className="w-3 h-3" />
                    281
                  </div>
                </div>

                {/* Stream Duration */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/60 rounded text-white text-xs">
                  <Clock className="w-3 h-3" />
                  00:05:24
                </div>
              </div>

              {/* Streamer Info Bar */}
              <div className="relative px-4 py-3 bg-[#0e0e10] border-t border-white/5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar with LIVE indicator */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center overflow-hidden">
                        <span className="text-white font-bold text-lg">J</span>
                      </div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1 py-0.5 bg-red-600 text-[8px] text-white font-bold rounded">
                        LIVE
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-semibold">Jonieboi</span>
                        <Check className="w-4 h-4 text-purple-400" />
                        <img 
                          src="/lovable-uploads/logo-white.png" 
                          alt="betaads" 
                          className="h-4 opacity-80"
                        />
                        {/* CTA Command */}
                        <span className="relative px-2 py-0.5 bg-amber-500 text-black text-xs font-bold rounded cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-amber-500/50 hover:shadow-lg hover:bg-amber-400">
                          !SAILY
                          <span className="absolute -top-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-green-500 text-[8px] text-white font-bold rounded uppercase whitespace-nowrap">
                            CTA
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white/50 text-sm mt-0.5">
                        <span>Just Chatting</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <button className="px-4 py-1.5 bg-[#9147ff] hover:bg-[#772ce8] text-white text-sm font-medium rounded transition-colors">
                      Follow
                    </button>
                    <button className="px-4 py-1.5 bg-[#9147ff] hover:bg-[#772ce8] text-white text-sm font-medium rounded transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

              {/* Yellow Branded Banner Under Stream */}
              <div className="relative bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 px-4 py-3">
                {/* Banner Label */}
                <div className="absolute -top-3 left-4 px-2 py-1 bg-amber-600 text-[8px] md:text-[10px] text-white font-bold rounded uppercase shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-amber-500/50 hover:shadow-xl hover:bg-amber-500">
                  Banner
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src="/lovable-uploads/logo-red-white.png" 
                      alt="betaads" 
                      className="h-6 md:h-8"
                    />
                    <span className="text-black font-medium text-sm md:text-base">is an e-SIM service</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-black/10 rounded text-black font-bold text-sm md:text-base">
                      Saily
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col bg-[#0e0e10]">
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-white/10">
                <span className="text-white font-medium text-sm">Stream Chat</span>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-2.5 min-h-[200px] lg:min-h-0 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="flex items-start gap-1.5">
                    <span className={`${msg.color} text-xs font-semibold`}>{msg.username}:</span>
                    <span className="text-white/90 text-xs">{msg.message}</span>
                  </div>
                ))}
              </div>

              {/* Chatbot CTA */}
              <div className="relative p-4 border-t border-white/10 bg-[#18181b]">
                {/* Chatbot Label */}
                <div className="absolute -top-3 right-4 px-2 py-1 bg-primary text-[8px] md:text-[10px] text-white font-bold rounded uppercase shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-primary/50 hover:shadow-xl hover:bg-primary/80">
                  Chatbot
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <img 
                    src="/lovable-uploads/logo-white.png" 
                    alt="betaads" 
                    className="h-5 opacity-90"
                  />
                </div>
                <button className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg">
                  sjekk ut saily.com
                </button>
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Send a message"
                    className="flex-1 px-3 py-2 bg-[#0e0e10] border border-white/10 rounded text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-purple-500"
                    disabled
                  />
                  <button className="px-4 py-2 bg-[#9147ff] hover:bg-[#772ce8] text-white text-xs font-medium rounded transition-colors">
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
              className={`bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group cursor-pointer hover:shadow-lg ${format.hoverGlow}`}
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
