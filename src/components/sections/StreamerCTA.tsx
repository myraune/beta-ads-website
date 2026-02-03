import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const StreamerCTA: React.FC = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to start earning?
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Join hundreds of Nordic streamers earning from brand sponsorships.
            No follower minimums. No contracts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-10 py-7 text-base font-medium rounded-xl" 
              onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
            >
              Apply now
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <button 
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors py-4"
              onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
            >
              Already a member? Sign in
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
