import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, TrendingUp, Users, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
}

const translations = {
  en: {
    title: "Get Nordic Twitch",
    subtitle: "Market Insights",
    description: "Interested in getting first-hand info about the Nordic Twitch market?",
    marketingProfessionals: "500+ Marketing Professionals",
    exclusiveCaseStudies: "Exclusive Case Studies",
    marketTrends: "Market Trends",
    placeholder: "Enter your work email",
    getInsights: "Get Exclusive Market Insights",
    subscribing: "Subscribing...",
    privacyNote: "We respect your privacy. Unsubscribe at any time.",
    successTitle: "Success!",
    successDescription: "You've been subscribed to Nordic Twitch market insights.",
    errorTitle: "Error",
    errorDescription: "Something went wrong. Please try again.",
  },
  no: {
    title: "Få Nordiske Twitch",
    subtitle: "Markedsinnsikter",
    description: "Interessert i førstehåndsinformasjon om det nordiske Twitch-markedet?",
    marketingProfessionals: "500+ Markedsførere",
    exclusiveCaseStudies: "Eksklusive Case-studier",
    marketTrends: "Markedstrender",
    placeholder: "Skriv inn jobb-e-posten din",
    getInsights: "Få Eksklusive Markedsinnsikter",
    subscribing: "Registrerer...",
    privacyNote: "Vi respekterer ditt personvern. Avslutt abonnement når som helst.",
    successTitle: "Suksess!",
    successDescription: "Du er nå abonnent på nordiske Twitch-markedsinnsikter.",
    errorTitle: "Feil",
    errorDescription: "Noe gikk galt. Vennligst prøv igjen.",
  },
  sv: {
    title: "Få Nordiska Twitch",
    subtitle: "Marknadsinsikter",
    description: "Intresserad av förstahandsinformation om den nordiska Twitch-marknaden?",
    marketingProfessionals: "500+ Marknadsförare",
    exclusiveCaseStudies: "Exklusiva Fallstudier",
    marketTrends: "Marknadstrender",
    placeholder: "Ange din jobbmail",
    getInsights: "Få Exklusiva Marknadsinsikter",
    subscribing: "Registrerar...",
    privacyNote: "Vi respekterar din integritet. Avsluta prenumeration när som helst.",
    successTitle: "Framgång!",
    successDescription: "Du prenumererar nu på nordiska Twitch-marknadsinsikter.",
    errorTitle: "Fel",
    errorDescription: "Något gick fel. Försök igen.",
  },
  fi: {
    title: "Saa Pohjoismaisia Twitch",
    subtitle: "Markkinanäkemyksiä",
    description: "Kiinnostaako ensikäden tieto pohjoismaisesta Twitch-markkinasta?",
    marketingProfessionals: "500+ Markkinointiammattilaista",
    exclusiveCaseStudies: "Eksklusiiviset Tapaustutkimukset",
    marketTrends: "Markkinatrendit",
    placeholder: "Syötä työsähköpostisi",
    getInsights: "Saa Eksklusiivisia Markkinanäkemyksiä",
    subscribing: "Tilataan...",
    privacyNote: "Kunnioitamme yksityisyyttäsi. Peruuta tilaus milloin tahansa.",
    successTitle: "Onnistui!",
    successDescription: "Olet nyt tilannut pohjoismaiset Twitch-markkinanäkemykset.",
    errorTitle: "Virhe",
    errorDescription: "Jotain meni pieleen. Yritä uudelleen.",
  },
};

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ isOpen, onClose, language = "en" }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('notify-newsletter-signup', {
        body: { email }
      });

      if (error) {
        console.error('Error sending notification:', error);
        toast({
          title: t.errorTitle,
          description: t.errorDescription,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: t.successTitle,
        description: t.successDescription,
      });
      setEmail("");
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: t.errorTitle,
        description: t.errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl border-0 bg-gradient-to-br from-red-950 via-red-900 to-black text-gray-100 shadow-2xl backdrop-blur-md">
        <div className="p-8 pt-12">
          {/* Header section */}
          <div className="text-center space-y-6 mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-light text-white leading-tight">
                {t.title}
                <span className="block font-extralight italic text-gray-300">
                  {t.subtitle}
                </span>
              </h2>
              <p className="text-gray-300 text-lg font-extralight leading-relaxed max-w-sm mx-auto">
                {t.description}
              </p>
            </div>
          </div>

          {/* Features/Benefits */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10">
                <Users className="h-5 w-5 text-gray-300" />
              </div>
              <p className="text-xs text-gray-400 font-light">{t.marketingProfessionals}</p>
            </div>
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10">
                <Zap className="h-5 w-5 text-gray-300" />
              </div>
              <p className="text-xs text-gray-400 font-light">{t.exclusiveCaseStudies}</p>
            </div>
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10">
                <TrendingUp className="h-5 w-5 text-gray-300" />
              </div>
              <p className="text-xs text-gray-400 font-light">{t.marketTrends}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder={t.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-black/30 border border-white/20 rounded-xl text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-2 focus:ring-white/20 backdrop-blur-sm text-base"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-white text-black hover:bg-gray-100 py-4 text-base font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:hover:scale-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
                  <span>{t.subscribing}</span>
                </div>
              ) : (
                t.getInsights
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500 font-light">
              {t.privacyNote}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
