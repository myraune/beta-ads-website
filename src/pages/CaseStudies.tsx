import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Footer } from "@/components/sections/Footer";

interface CaseStudiesProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const caseVideos = [
  { id: "Uw7IIecicB4", title: "Samsung Campaign Case Study", brand: "Samsung" },
  { id: "IZOx_VMdJJg", title: "Shure Campaign Case Study", brand: "Shure" },
  { id: "ufNq-A4d7iA", title: "Komplett Campaign Case Study", brand: "Komplett" },
  { id: "DMz-NV1W_Is", title: "Saily E-sim Campaign in Norway", brand: "Saily" },
  { id: "U6i5uvhk2Sw", title: "Surfshark Campaign Case Study", brand: "Surfshark" },
  { id: "GwE4dagRm_k", title: "Kristiania University Campaign Case Study", brand: "Kristiania University" },
  { id: "aE0-S8GC1Iw", title: "M3panel Campaign Case Study", brand: "M3panel" },
  { id: "swu_ye12IHs", title: "Norstat Campaign Case Study", brand: "Norstat" },
];

const CaseStudies: React.FC<CaseStudiesProps> = ({ t, language, setLanguage }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-foreground mb-8 tracking-tighter">
            Our Work
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-extralight leading-relaxed">
            {t.trustedByDescription}
          </p>
        </div>
      </section>

      {/* Video Carousel */}
      <section className="pb-20 lg:pb-32">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
          <Carousel 
            setApi={setApi}
            className="w-full"
            opts={{ align: "center", loop: true }}
          >
            <CarouselContent className="-ml-1 md:-ml-2">
              {caseVideos.map((video) => (
                <CarouselItem key={video.id} className="pl-1 md:pl-2 basis-full">
                  <div className="glass-card rounded-2xl p-3 transition-all duration-500 hover:scale-[1.02]">
                    <div className="aspect-video rounded-xl overflow-hidden bg-black/50">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                    <div className="text-center mt-4 space-y-1">
                      <h3 className="text-xl font-light text-foreground">{video.brand}</h3>
                      <p className="text-muted-foreground font-extralight text-sm">{video.title}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="text-muted-foreground border-border/50 hover:bg-muted/30 -left-2 md:-left-4 h-12 w-12 transition-all duration-300 hover:scale-110" />
            <CarouselNext className="text-muted-foreground border-border/50 hover:bg-muted/30 -right-2 md:-right-4 h-12 w-12 transition-all duration-300 hover:scale-110" />
          </Carousel>

          {/* Dot indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {caseVideos.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === current 
                    ? 'bg-primary shadow-lg shadow-primary/50 scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-110'
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>

          <div className="text-center mt-6">
            <p className="text-muted-foreground font-extralight text-sm">{t.swipeHelper}</p>
          </div>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default CaseStudies;
