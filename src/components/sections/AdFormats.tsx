import React from "react";

interface AdFormat {
  name: string;
  dimensions: string;
  description: string;
  image: string;
}

const adFormats: AdFormat[] = [
  {
    name: "Video Format",
    dimensions: "640 × 360 px",
    description: "In-stream video ads that blend natively into the broadcast.",
    image: "/lovable-uploads/videoDemo1.png",
  },
  {
    name: "Side Bar",
    dimensions: "300 × 1080 px",
    description: "Vertical ad placement alongside the stream. Native to the interface.",
    image: "/lovable-uploads/sideBarDemo1.png",
  },
  {
    name: "Snipe",
    dimensions: "1920 × 250 px",
    description: "Horizontal banner overlay. Time-based, high visibility.",
    image: "/lovable-uploads/snipeDemo1.png",
  },
  {
    name: "Rich Media",
    dimensions: "1920 × 1080 px",
    description: "Full-screen takeover. Premium, immersive experience.",
    image: "/lovable-uploads/richMediaDemo1.png",
  },
  {
    name: "Poll",
    dimensions: "Dynamic",
    description: "Interactive poll overlay. Viewers engage directly with the brand.",
    image: "/lovable-uploads/pollDemo1.png",
  },
  {
    name: "Interactive",
    dimensions: "Dynamic",
    description: "Rich media with clickable elements. Fully engaging.",
    image: "/lovable-uploads/interactiveDemo1.png",
  },
];

export const AdFormats: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-[#0e0e10]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-4xl font-medium text-white mb-4">
            Ad Formats
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Native advertising formats designed for live streaming
          </p>
        </div>

        {/* Format Blocks */}
        <div className="space-y-16 lg:space-y-24">
          {adFormats.map((format, index) => (
            <div
              key={format.name}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Image Preview */}
              <div
                className={`relative rounded-xl overflow-hidden border border-white/10 bg-black/40 
                  transition-all duration-300 ease-out cursor-pointer
                  hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_0_40px_rgba(234,56,76,0.15)] ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <img
                  src={format.image}
                  alt={`${format.name} preview`}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>

              {/* Description */}
              <div className="space-y-5">
                <h3 className="text-2xl lg:text-3xl font-medium text-white">
                  {format.name}
                </h3>
                <p className="text-white/60 text-base lg:text-lg leading-relaxed max-w-md">
                  {format.description}
                </p>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white/40 text-sm">Dimensions</span>
                  <span className="text-white font-mono text-sm">
                    {format.dimensions}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
