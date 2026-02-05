import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import founderImage from '@/assets/founder-andreas.jpeg';

interface AboutUsProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ t, language, setLanguage }) => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen text-foreground">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden text-foreground">
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-16">
          
          <div className="grid lg:grid-cols-[38%_62%] gap-6 lg:gap-0 items-center">
            
            {/* Left: Text Content */}
            <div 
              ref={contentRef}
              className={`max-w-md lg:pr-8 transition-all duration-1000 ease-out ${
                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight text-foreground mb-6">
                About <span className="font-extralight italic text-primary">Beta</span> Ads
              </h1>

              <div className="space-y-4 mb-8">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Native advertising on Twitch. We work with brands and streamers to create ads that feel like content, not interruption.
                </p>
                
                <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed">
                  We place sponsored overlays inside live streams across the Nordics. Brands get reach. Streamers get paid. Viewers get content that respects their attention.
                </p>
              </div>

              <a 
                href="https://calendar.app.google/coW5NLQJtLxfRer19" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-light tracking-wide h-auto border-0 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105"
                >
                  Book a call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            {/* Right: Founder Image */}
            <div 
              className={`relative lg:-mr-8 xl:-mr-12 transition-all duration-1000 delay-300 ${
                contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="bg-card/5 rounded-xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img 
                    src={founderImage} 
                    alt="Andreas Myraune, Founder of Beta Ads"
                    className="w-full h-full object-cover object-[center_30%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs uppercase tracking-widest text-primary mb-1">Founder</p>
                    <p className="text-lg font-light text-white">Andreas Myraune</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default AboutUs;
