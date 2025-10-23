
import React, { useState, useCallback, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

interface ExamplesProps {
  t: any;
  caseVideos: any[];
}

export const Examples: React.FC<ExamplesProps> = ({ t, caseVideos }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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
    <section id="examples" className="py-32 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extralight text-foreground mb-8 tracking-tighter">
            {t.trustedByTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
            {t.trustedByDescription}
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <Carousel 
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {caseVideos.map((video, index) => (
                <CarouselItem key={video.id} className="pl-2 md:pl-4 basis-full">
                   <div className="relative bg-card rounded-2xl p-3 md:p-4 border border-border transition-colors duration-300">
                     <div className="aspect-video rounded-xl overflow-hidden bg-black">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                     <div className="text-center mt-3 space-y-1">
                       <h3 className="text-xl font-light text-card-foreground tracking-wide">{video.brand}</h3>
                       <p className="text-muted-foreground font-extralight tracking-wide text-base">{video.title}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="text-muted-foreground border-border hover:bg-secondary hover:border-muted -left-2 md:-left-4 h-12 w-12 transition-all duration-300 hover:scale-110 hover:shadow-lg" />
            <CarouselNext className="text-muted-foreground border-border hover:bg-secondary hover:border-muted -right-2 md:-right-4 h-12 w-12 transition-all duration-300 hover:scale-110 hover:shadow-lg" />
          </Carousel>

          {/* Dot indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {caseVideos.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
          <div className="text-center mt-6">
            <p className="text-muted-foreground font-light text-base">
              {t.swipeHelper}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
