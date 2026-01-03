import React from "react";
import { Footer } from "@/components/sections/Footer";
import { Play } from "lucide-react";

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
  { id: "GwE4dagRm_k", title: "Kristiania University Campaign Case Study", brand: "Kristiania" },
  { id: "aE0-S8GC1Iw", title: "M3panel Campaign Case Study", brand: "M3panel" },
  { id: "swu_ye12IHs", title: "Norstat Campaign Case Study", brand: "Norstat" },
];

const CaseStudies: React.FC<CaseStudiesProps> = ({ t, language, setLanguage }) => {
  const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null);

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-foreground mb-6 tracking-tighter">
            Our Work
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-extralight leading-relaxed">
            Discover how we've helped brands connect with streaming audiences through authentic partnerships.
          </p>
        </div>
      </section>

      {/* Video Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseVideos.map((video) => (
              <div 
                key={video.id} 
                className="group relative bg-card/50 rounded-2xl overflow-hidden border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-muted/20">
                  {selectedVideo === video.id ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                        }}
                      />
                      {/* Play Overlay */}
                      <div 
                        className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        onClick={() => setSelectedVideo(video.id)}
                      >
                        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-110">
                          <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-light text-foreground mb-1">{video.brand}</h3>
                  <p className="text-sm text-muted-foreground font-extralight line-clamp-2">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default CaseStudies;
