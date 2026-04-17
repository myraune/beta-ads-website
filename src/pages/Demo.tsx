import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, ExternalLink, Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SPFooter } from '@/components/sections/SPFooter';

interface DemoProps {
  t?: any;
  language?: string;
}

const defaults = {
  requestDemo: "REQUEST A DEMO",
  seeInAction: "See it in action",
  demoFormDescription: "Fill out the form and we'll get back to you within 24 hours with a personalized walkthrough of the platform.",
  preferTalkDirectly: "Prefer to talk directly? Book a 15-minute call and I'll show you how it works.",
  bookCallDirect: "Book a call directly",
  name: "Name",
  namePlaceholder: "Your name",
  email: "Email",
  emailPlaceholder: "you@company.com",
  companyOptional: "Company (optional)",
  companyPlaceholder: "Your company",
  message: "Message",
  messagePlaceholder: "Tell us about your campaign goals...",
  sendMessage: "Send message",
  sending: "Sending...",
  messageSent: "Message sent!",
  wellGetBack: "We'll get back to you within 24 hours.",
  somethingWentWrong: "Something went wrong. Please try again.",
};

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email").max(255),
  company: z.string().max(100).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type FormData = z.infer<typeof formSchema>;

const Demo: React.FC<DemoProps> = ({ t: tProp }) => {
  const t = { ...defaults, ...tProp };
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('notify-demo-request', {
        body: data,
      });
      if (error) throw error;
      toast({
        title: t.messageSent,
        description: t.wellGetBack,
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: t.somethingWentWrong,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Request a Demo | Beta Ads"
        description="Book a demo with Beta Ads and see how native overlay advertising works on Twitch, YouTube and Kick livestreams. Reach Gen Z audiences across the Nordics."
        canonical="/demo"
        ogType="website"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Request a Demo - Beta Ads",
          "description": "Book a demo with Beta Ads and see how native overlay advertising works on Twitch, YouTube and Kick livestreams. Reach Gen Z audiences across the Nordics.",
          "url": "https://beta-ads.no/demo",
          "isPartOf": { "@id": "https://beta-ads.no/#website" }
        }}
      />
      {/* Accessibility fix: Layout.tsx already provides <main> — nested <main> is invalid HTML (WCAG 1.3.6) */}
      <div>
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary mb-6">{t.requestDemo}</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight mb-8 leading-tight">
                {t.seeInAction.split(' ').slice(0, 2).join(' ')}
                <br />
                <span className="text-primary">{t.seeInAction.split(' ').slice(2).join(' ')}</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-md">
                {t.demoFormDescription}
              </p>

              <div className="p-6 bg-card/50 rounded-xl border border-border/30 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/20 shrink-0">
                    <img
                      src="/lovable-uploads/founder-andreas.jpg"
                      alt="Andreas Myraune"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-light text-foreground">Andreas Myraune</p>
                    <p className="text-sm text-muted-foreground">Head of Agency</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {t.preferTalkDirectly}
                </p>
                <a 
                  href="https://calendar.app.google/coW5NLQJtLxfRer19" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    {t.bookCallDirect}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="bg-card/30 rounded-2xl border border-border/30 p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{t.name}</FormLabel>
                      <FormControl><Input placeholder={t.namePlaceholder} className="bg-background/50 border-border/50" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{t.email}</FormLabel>
                      <FormControl><Input type="email" placeholder={t.emailPlaceholder} className="bg-background/50 border-border/50" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="company" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{t.companyOptional}</FormLabel>
                      <FormControl><Input placeholder={t.companyPlaceholder} className="bg-background/50 border-border/50" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{t.message}</FormLabel>
                      <FormControl><Textarea placeholder={t.messagePlaceholder} className="bg-background/50 border-border/50 min-h-[120px] resize-none" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12">
                    {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.sending}</>) : (<>{t.sendMessage}<ArrowRight className="ml-2 h-4 w-4" /></>)}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      <SPFooter />
      </div>
    </div>
  );
};

export default Demo;
