
import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ExamplesProps {
  t: any;
  caseVideos: any[];
}

export const Examples: React.FC<ExamplesProps> = ({ t, caseVideos }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="examples" className="py-20 bg-background text-foreground">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
            {t.trustedByTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            {t.trustedByDescription}
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto relative">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-1 md:-ml-2">
              {caseVideos.map((video) => (
                <CarouselItem key={video.id} className="pl-1 md:pl-2 basis-full">
                  <motion.div
                    className="relative rounded-xl overflow-hidden bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setActiveVideoId(video.id)}
                  >
                    <div className="aspect-video rounded-lg overflow-hidden bg-black relative">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <motion.div
                          className="w-16 h-16 rounded-full bg-[#11111198] backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Play className="w-6 h-6 text-white ml-1" />
                        </motion.div>
                      </div>
                      {/* Bottom control bar hint */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 p-3 mx-3 mb-3 bg-[#11111198] backdrop-blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="flex items-center gap-2">
                          <Play className="w-3.5 h-3.5 text-white" />
                          <div className="relative flex-1 h-1 bg-white/20 rounded-full">
                            <div className="absolute top-0 left-0 h-full w-0 bg-white rounded-full" />
                          </div>
                          <span className="text-white/60 text-xs">Click to play</span>
                        </div>
                      </motion.div>
                    </div>
                    <div className="text-center py-3 px-4">
                      <h3 className="text-lg font-medium text-white">{video.brand}</h3>
                      <p className="text-white/60 font-light text-sm">{video.title}</p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="text-muted-foreground border-border hover:bg-secondary hover:border-muted -left-1 md:-left-3 h-10 w-10 transition-[transform,box-shadow] duration-300 hover:scale-110 hover:shadow-lg" />
            <CarouselNext className="text-muted-foreground border-border hover:bg-secondary hover:border-muted -right-1 md:-right-3 h-10 w-10 transition-[transform,box-shadow] duration-300 hover:scale-110 hover:shadow-lg" />
          </Carousel>

          {/* Dot indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {caseVideos.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'bg-primary shadow-lg scale-125'
                    : 'bg-muted hover:bg-muted-foreground hover:scale-110'
                }`}
                onClick={() => {
                  api?.scrollTo(index);
                }}
              />
            ))}
          </div>

          {/* Helper text */}
          <div className="text-center mt-4">
            <p className="text-muted-foreground font-light text-sm">
              {t.swipeHelper}
            </p>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!activeVideoId} onOpenChange={(open) => !open && setActiveVideoId(null)}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-transparent border-none overflow-hidden shadow-none">
          <DialogTitle className="sr-only">Case Study Video</DialogTitle>
          <DialogDescription className="sr-only">Watch the full campaign video</DialogDescription>
          <AnimatePresence>
            {activeVideoId && (
              <motion.div
                className="relative w-full rounded-xl overflow-hidden bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <div className="aspect-video w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                    title="Case Study Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-xl"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
};
