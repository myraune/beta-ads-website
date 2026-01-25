import React from "react";
import { Press } from "@/components/sections/Press";
import { Footer } from "@/components/sections/Footer";

interface ContactProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const Contact: React.FC<ContactProps> = ({ t, language, setLanguage }) => {
  return (
    <div className="pt-24 lg:pt-32">
      {/* CTA Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-5xl mx-auto text-center px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-foreground mb-12 tracking-tighter">
            {t.ctaTitle}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto font-extralight leading-relaxed">
            {t.ctaDescription}
          </p>
          
          <div className="flex items-center justify-center mb-16 transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div className="w-20 h-20 rounded-full overflow-hidden mr-6 shadow-lg shadow-primary/20 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/30">
              <img
                src="/lovable-uploads/e6d9646d-bf5f-471c-a2d8-1f06c274f570.png"
                alt="Andreas Myraune"
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
              />
            </div>
            <div className="text-left">
              <p className="text-xl font-light text-foreground tracking-wide">Andreas Myraune</p>
              <p className="text-muted-foreground font-extralight tracking-wide">Head of Agency</p>
            </div>
          </div>

        </div>
      </section>

      {/* Press Section */}
      <Press t={t} />

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default Contact;
