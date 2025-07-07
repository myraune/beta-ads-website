import React, { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ExamplesProps {
  t: any;
  caseVideos: any[];
}

export const Examples: React.FC<ExamplesProps> = ({ t, caseVideos }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section id="examples" className="py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extralight text-gray-900 dark:text-gray-100 mb-8 tracking-tighter">
            {t.trustedByTitle}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
            {t.trustedByDescription}
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <Carousel 
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4 md:-ml-8">
              {caseVideos.map((video, index) => (
                <CarouselItem key={video.id} className="pl-4 md:pl-8 basis-full md:basis-5/6">
                  <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 group">
                    <div className="aspect-video rounded-2xl overflow-hidden bg-black">
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
                    <div className="text-center mt-6 space-y-2">
                      <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 tracking-wide group-hover:text-red-400 transition-colors duration-300">{video.brand}</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-extralight tracking-wide text-lg">{video.title}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 -left-4 md:-left-8 h-14 w-14 transition-all duration-300" />
            <CarouselNext className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 -right-4 md:-right-8 h-14 w-14 transition-all duration-300" />
          </Carousel>

          {/* Dot indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            {caseVideos.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-red-400 shadow-lg scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 hover:scale-110'
                }`}
                onClick={() => {
                  setCurrentSlide(index);
                }}
              />
            ))}
          </div>

          {/* Helper text */}
          <div className="text-center mt-8">
            <p className="text-gray-500 dark:text-gray-400 font-light text-lg">
              Swipe or use arrows to see more campaign examples
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};