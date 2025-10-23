
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
              {caseVideos.map((video, index) => (
                <CarouselItem key={video.id} className="pl-1 md:pl-2 basis-full">
                   <div className="relative bg-card rounded-xl p-2 border border-border transition-colors duration-300">
                      <div className="aspect-video rounded-lg overflow-hidden bg-black">
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
                      <div className="text-center mt-2 space-y-0.5">
                        <h3 className="text-lg font-medium text-card-foreground">{video.brand}</h3>
                        <p className="text-muted-foreground font-light text-sm">{video.title}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="text-muted-foreground border-border hover:bg-secondary hover:border-muted -left-1 md:-left-3 h-10 w-10 transition-all duration-300 hover:scale-110 hover:shadow-lg" />
            <CarouselNext className="text-muted-foreground border-border hover:bg-secondary hover:border-muted -right-1 md:-right-3 h-10 w-10 transition-all duration-300 hover:scale-110 hover:shadow-lg" />
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
    </section>
  );
};
