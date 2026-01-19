import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mail, TrendingUp, Users, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      // Send notification email
      const { error } = await supabase.functions.invoke('notify-newsletter-signup', {
        body: { email }
      });

      if (error) {
        console.error('Error sending notification:', error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success!",
        description: "You've been subscribed to Nordic Twitch market insights.",
      });
      setEmail("");
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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
                Get Nordic Twitch 
                <span className="block font-extralight italic text-gray-300">
                  Market Insights
                </span>
              </h2>
              <p className="text-gray-300 text-lg font-extralight leading-relaxed max-w-sm mx-auto">
                Interested in getting first-hand info about the Nordic Twitch market?
              </p>
            </div>
          </div>

          {/* Features/Benefits */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10">
                <Users className="h-5 w-5 text-gray-300" />
              </div>
              <p className="text-xs text-gray-400 font-light">500+ Marketing Professionals</p>
            </div>
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10">
                <Zap className="h-5 w-5 text-gray-300" />
              </div>
              <p className="text-xs text-gray-400 font-light">Exclusive Case Studies</p>
            </div>
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10">
                <TrendingUp className="h-5 w-5 text-gray-300" />
              </div>
              <p className="text-xs text-gray-400 font-light">Market Trends</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your work email"
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
                  <span>Subscribing...</span>
                </div>
              ) : (
                "Get Exclusive Market Insights"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500 font-light">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;