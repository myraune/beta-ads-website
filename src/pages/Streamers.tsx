import React from "react";
import { StreamerSection } from "@/components/sections/StreamerSection";
import { Footer } from "@/components/sections/Footer";

interface StreamersProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const Streamers: React.FC<StreamersProps> = ({ t, language, setLanguage }) => {
  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-primary text-sm md:text-base tracking-widest uppercase mb-6 font-light">
            {t.streamerSectionTitle}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-foreground mb-8 tracking-tighter">
            {t.streamerSectionSubtitle}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-extralight leading-relaxed">
            {t.streamerSectionDescription}
          </p>
        </div>
      </section>

      {/* Streamer Content */}
      <StreamerSection t={t} language={language} />

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default Streamers;
