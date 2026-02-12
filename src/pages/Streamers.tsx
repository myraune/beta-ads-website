import React from "react";
import { StreamerSection } from "@/components/sections/StreamerSection";
import { Footer } from "@/components/sections/Footer";

interface StreamersProps {
  t: any;
}

const Streamers: React.FC<StreamersProps> = ({ t }) => {
  return (
    <div className="pt-16 lg:pt-20">
      <StreamerSection t={t} language="en" />
      <Footer t={t} />
    </div>
  );
};

export default Streamers;
