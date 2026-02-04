import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AboutUsProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ t, language, setLanguage }) => {
  const heroAnimation = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Hero Section */}
      <section 
        ref={heroAnimation.ref}
        className="min-h-[80vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-20"
      >
        <div className={`max-w-4xl transition-all duration-1000 ${heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tighter leading-[0.9] mb-12">
            About <span className="text-primary">Beta</span> Ads
          </h1>
          
          <div className="max-w-2xl space-y-8 mb-16">
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              Native advertising on Twitch. We work with brands and streamers to create ads that feel like content, not interruption.
            </p>
            
            <p className="text-lg text-muted-foreground/80 leading-relaxed">
              We place sponsored overlays inside live streams across the Nordics. Brands get reach. Streamers get paid. Viewers get content that respects their attention.
            </p>
          </div>

          {/* Founder */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-widest text-primary mb-4">Founder</p>
            <p className="text-2xl font-light">Andreas Myraune</p>
          </div>

          {/* CTA */}
          <Button asChild size="lg" className="group">
            <a 
              href="https://calendar.app.google/coW5NLQJtLxfRer19" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Book a call
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default AboutUs;
