import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Play, Users, Target, TrendingUp, ExternalLink, Sparkles } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Hero = ({ t, scrollToSection }: { t: any; scrollToSection: (id: string) => void }) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white">
    <div className="container mx-auto px-4 py-32">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-6">{t.hero.title}</h1>
          <p className="text-lg mb-8">{t.hero.subtitle}</p>
          <div className="space-x-4">
            <Button size="lg" onClick={() => scrollToSection('how-it-works')}>
              {t.hero.primaryCTA} <ArrowRight className="ml-2" />
            </Button>
            <Button variant="outline" size="lg">
              {t.hero.secondaryCTA}
            </Button>
          </div>
        </div>
        <div className="relative">
          <img
            src="/hero-image.png"
            alt="Hero Image"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 dark:from-black to-transparent"></div>
  </section>
);

const TrustedBy = () => (
  <section className="py-16 bg-gray-50 dark:bg-gray-800">
    <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl font-semibold mb-12 text-gray-600 dark:text-gray-300">
        Trusted by leading companies worldwide
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
        {[
          "/lovable-uploads/711bde8c-3d71-40eb-8c93-2f8bf7350a57.png",
          "/lovable-uploads/59160e7a-4d18-4413-9f1b-f681271f8dde.png",
          "/lovable-uploads/6f888d5f-8917-41fc-8808-f528b2aac891.png",
          "/lovable-uploads/bf505fdb-dc9b-4a82-93b6-f604c840737f.png",
          "/lovable-uploads/cda69e31-7632-469a-b206-367ba4350480.png",
          "/lovable-uploads/a3645b32-75a2-494d-aa42-f7b96dba1d94.png"
        ].map((src, index) => (
          <div key={index} className="flex justify-center">
            <img src={src} alt={`Trusted company ${index + 1}`} className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300 dark:brightness-0 dark:invert" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = ({ t }: { t: any }) => (
  <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t.howItWorks.title}</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t.howItWorks.subtitle}</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {t.howItWorks.steps.map((step: any, index: number) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-[#fe696e] to-[#fe4d52] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{index + 1}</span>
              </div>
              <CardTitle className="text-xl text-gray-900 dark:text-white">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Features = ({ t }: { t: any }) => (
  <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t.features.title}</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t.features.subtitle}</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {t.features.items.map((feature: any, index: number) => {
          const icons = [Users, Target, TrendingUp, Sparkles, Play, ExternalLink];
          const Icon = icons[index % icons.length];
          
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-[#fe696e] to-[#fe4d52] rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

const Testimonials = ({ t }: { t: any }) => (
  <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t.testimonials.title}</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t.testimonials.subtitle}</p>
      </div>
      
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {t.testimonials.items.map((testimonial: any, index: number) => (
            <CarouselItem key={index}>
              <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
        <CarouselNext className="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
      </Carousel>
    </div>
  </section>
);

const Pricing = ({ t }: { t: any }) => (
  <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t.pricing.title}</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t.pricing.subtitle}</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {t.pricing.plans.map((plan: any, index: number) => (
          <Card key={index} className={`relative hover:shadow-lg transition-shadow ${
            plan.popular 
              ? 'border-[#fe696e] shadow-lg scale-105 bg-white dark:bg-gray-800' 
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
          }`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#fe696e] to-[#fe4d52] text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900 dark:text-white">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-[#fe696e] to-[#fe4d52] hover:from-[#fe4d52] hover:to-[#fe696e] text-white' 
                    : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const CTA = ({ t }: { t: any }) => (
  <section className="py-20 bg-gradient-to-r from-[#fe696e] to-[#fe4d52] text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-8">{t.cta.title}</h2>
      <p className="text-xl mb-12">{t.cta.subtitle}</p>
      <Button size="lg">
        {t.cta.button}
      </Button>
    </div>
  </section>
);

const Footer = ({ t }: { t: any }) => (
  <footer className="bg-gray-900 dark:bg-black text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">EngageFlow</h3>
          <p className="text-gray-400 dark:text-gray-500">{t.footer.description}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">{t.footer.product}</h4>
          <ul className="space-y-2 text-gray-400 dark:text-gray-500">
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">{t.footer.company}</h4>
          <ul className="space-y-2 text-gray-400 dark:text-gray-500">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">{t.footer.support}</h4>
          <ul className="space-y-2 text-gray-400 dark:text-gray-500">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
        <p>&copy; 2024 EngageFlow. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const Index = () => {
  const [activeLanguage, setActiveLanguage] = useState('en');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const translations = {
    en: {
      hero: {
        title: "Boost Your Business with EngageFlow",
        subtitle: "The all-in-one platform to engage your customers and grow your business.",
        primaryCTA: "Get Started",
        secondaryCTA: "Learn More",
      },
      howItWorks: {
        title: "How It Works",
        subtitle: "EngageFlow simplifies customer engagement in three easy steps.",
        steps: [
          {
            title: "Connect",
            description: "Integrate EngageFlow with your existing tools and platforms."
          },
          {
            title: "Engage",
            description: "Create personalized experiences that resonate with your audience."
          },
          {
            title: "Grow",
            description: "Analyze your results and optimize your strategy for maximum impact."
          }
        ]
      },
      features: {
        title: "Key Features",
        subtitle: "Explore the powerful features that make EngageFlow the ultimate engagement platform.",
        items: [
          {
            title: "Audience Segmentation",
            description: "Segment your audience based on behavior, demographics, and more."
          },
          {
            title: "Personalized Messaging",
            description: "Craft personalized messages that resonate with each individual."
          },
          {
            title: "Automated Campaigns",
            description: "Automate your engagement campaigns for maximum efficiency."
          },
          {
            title: "Real-time Analytics",
            description: "Track your results in real-time and optimize your strategy."
          },
          {
            title: "A/B Testing",
            description: "Experiment with different approaches to find what works best."
          },
          {
            title: "Multi-Channel Support",
            description: "Engage your audience across multiple channels, including email, SMS, and more."
          }
        ]
      },
      testimonials: {
        title: "What Our Customers Say",
        subtitle: "Don't just take our word for it. See what our customers are saying about EngageFlow.",
        items: [
          {
            name: "John Smith",
            role: "CEO, Company XYZ",
            quote: "EngageFlow has transformed the way we engage with our customers. We've seen a significant increase in customer satisfaction and retention.",
            avatar: "https://via.placeholder.com/150"
          },
          {
            name: "Jane Doe",
            role: "Marketing Manager, Company ABC",
            quote: "EngageFlow's automated campaigns have saved us countless hours. We're now able to focus on more strategic initiatives.",
            avatar: "https://via.placeholder.com/150"
          },
          {
            name: "Peter Jones",
            role: "Sales Director, Company LMN",
            quote: "EngageFlow's real-time analytics have given us valuable insights into our customer behavior. We're now able to make data-driven decisions that drive results.",
            avatar: "https://via.placeholder.com/150"
          }
        ]
      },
      pricing: {
        title: "Pricing Plans",
        subtitle: "Choose the plan that's right for you. Start engaging your customers today.",
        plans: [
          {
            name: "Basic",
            price: 29,
            description: "For small businesses just getting started.",
            features: [
              "Up to 1,000 contacts",
              "Basic segmentation",
              "Email support"
            ]
          },
          {
            name: "Standard",
            price: 99,
            description: "For growing businesses that need more features.",
            popular: true,
            features: [
              "Up to 10,000 contacts",
              "Advanced segmentation",
              "Automated campaigns",
              "Priority support"
            ]
          },
          {
            name: "Premium",
            price: 299,
            description: "For large businesses that need the ultimate engagement platform.",
            features: [
              "Unlimited contacts",
              "All features included",
              "Dedicated support team"
            ]
          }
        ]
      },
      cta: {
        title: "Ready to Get Started?",
        subtitle: "Join thousands of businesses that are already using EngageFlow to engage their customers and grow their business.",
        button: "Get Started Today"
      },
      footer: {
        description: "EngageFlow is the all-in-one platform to engage your customers and grow your business.",
        product: "Product",
        company: "Company",
        support: "Support"
      }
    }
  };

  const t = translations[activeLanguage];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ThemeToggle />
      <Hero t={t} scrollToSection={scrollToSection} />
      <TrustedBy />
      <HowItWorks t={t} />
      <Features t={t} />
      <Testimonials t={t} />
      <Pricing t={t} />
      <CTA t={t} />
      <Footer t={t} />
    </div>
  );
};

export default Index;
