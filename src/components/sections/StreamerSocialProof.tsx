import React from "react";
import { motion } from "framer-motion";

const streamers = [
  { 
    name: "Aienia", 
    platform: "Twitch",
    avatar: "/lovable-uploads/streamer-aienia.gif",
    quote: "Finally a way to earn without selling out my stream."
  },
  { 
    name: "EmmelieNova", 
    platform: "Twitch",
    avatar: "/lovable-uploads/streamer-emmelie.gif",
    quote: "The offers are actually relevant to my audience."
  },
  { 
    name: "Pernataia", 
    platform: "Twitch",
    avatar: "/lovable-uploads/streamer-pernataia.gif",
    quote: "Monthly payouts with zero hassle. Love it."
  },
];

const stats = [
  { value: "500+", label: "Active streamers" },
  { value: "€2M+", label: "Paid out" },
  { value: "50+", label: "Brand partners" },
];

export const StreamerSocialProof: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-12 lg:gap-24 mb-20 lg:mb-28"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-xl text-muted-foreground text-center mb-12">
            Streamers we work with
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {streamers.map((streamer, index) => (
            <motion.div
              key={streamer.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-card/5 rounded-xl p-6 lg:p-8 relative group hover:bg-card/10 transition-colors"
            >
              {/* Quote */}
              <p className="text-foreground text-lg leading-relaxed mb-8">
                "{streamer.quote}"
              </p>

              {/* Streamer info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted/30">
                  <img 
                    src={streamer.avatar} 
                    alt={streamer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-foreground font-medium">{streamer.name}</p>
                  <p className="text-muted-foreground text-sm">{streamer.platform}</p>
                </div>
              </div>

              {/* Subtle accent */}
              <div className="absolute top-6 right-6 text-primary/20 text-5xl font-serif">
                "
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
