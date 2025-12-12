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
    <div className="pt-16 lg:pt-20">
      {/* Streamer Content - Preview First */}
      <StreamerSection t={t} language={language} />

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default Streamers;
