import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, Copy, Loader2, Mail } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { track } from "@vercel/analytics";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BookingCalendar, BOOKING_SHORT_LINK } from "@/components/BookingCalendar";
import { W, kicker, h2 } from "@/components/working/shared";

interface DemoProps {
  t?: any;
  language?: string;
}

const SALES_EMAIL = "sales@beta-ads.no";

const defaults = {
  name: "Name",
  namePlaceholder: "Your name",
  email: "Email",
  emailPlaceholder: "you@company.com",
  companyOptional: "Company (optional)",
  companyPlaceholder: "Your company",
  message: "Message",
  messagePlaceholder: "Market, product and rough budget, if you have one.",
  sendMessage: "Send message",
  sending: "Sending...",
  messageSent: "Message sent!",
  wellGetBack: "We'll get back to you within one business day.",
  somethingWentWrong: "Something went wrong. Please try again.",
};

/* What the 30 minutes cover. Same promise as the homepage close section. */
const AGENDA = [
  { t: "Your market", d: "We shortlist streamers for your market and audience from the 39,000+ in Streamer Explorer." },
  { t: "Your creative", d: "We show the animated overlay running inside a live stream, with your brand on it." },
  { t: "Your budget", d: "We estimate delivery for your budget. Campaigns start at 100,000 NOK, priced per 1,000 views that played." },
];

const PROMISES = [
  "A real reply from a person within one business day",
  "We say so if your budget is better spent elsewhere",
  "Nothing is signed on the call",
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email").max(255),
  company: z.string().max(100).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type FormData = z.infer<typeof formSchema>;

const field = "bg-foreground/[0.03] border-foreground/15 placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-foreground/30";

const Demo: React.FC<DemoProps> = ({ t: tProp }) => {
  const t = { ...defaults, ...tProp };
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", company: "", message: "" },
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SALES_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${SALES_EMAIL}`;
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("notify-demo-request", { body: data });
      if (error) throw error;
      // Highest-intent conversion on the site. It is a form submit, not a link
      // click, so ConversionTracker's delegated listener never sees it - track
      // it explicitly so the SEO-test scoreboard counts real demo requests.
      const payload = { path: "/demo", company: data.company?.slice(0, 60) || "" };
      track("demo_form_submit", payload);
      (window as any).gtag?.("event", "demo_form_submit", payload);
      toast({ title: t.messageSent, description: t.wellGetBack });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({ title: "Error", description: t.somethingWentWrong, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Book a Demo | Beta Ads Livestream Advertising"
        description="See exactly how native overlay ads work on Twitch, YouTube and Kick. Book a 30-minute demo with our Nordic advertising team - free, no commitment."
        canonical="/demo"
        ogType="website"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Request a Demo - Beta Ads",
            "description": "Book a demo with Beta Ads and see how native overlay advertising works on Twitch, YouTube and Kick livestreams. Reach Gen Z audiences across the Nordics.",
            "url": "https://beta-ads.no/demo",
            "isPartOf": { "@id": "https://beta-ads.no/#website" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://beta-ads.no/" },
              { "@type": "ListItem", "position": 2, "name": "Book a Demo", "item": "https://beta-ads.no/demo" },
            ],
          },
        ]}
      />
      {/* Layout.tsx already provides <main>; no nested <main> here. */}

      {/* ── HERO ── */}
      <header className={`${W} pt-28 md:pt-36 pb-10 md:pb-14`}>
        <div className={`${kicker} mb-5`}>Book a demo</div>
        <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem] font-bold tracking-[-0.03em] max-w-4xl m-0">
          Thirty minutes. <span className="text-muted-foreground">No deck.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Pick a time with Andreas, write to us, or email sales directly. We look at your market,
          show the overlay with your brand and estimate what your budget delivers.
        </p>

        {/* Three ways in */}
        <div className="mt-10 grid sm:grid-cols-3 rounded-2xl border border-border overflow-hidden">
          <div className="p-5 md:p-6 border-b sm:border-b-0 sm:border-r border-border">
            <div className={`${kicker} mb-2`}>Email sales</div>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${SALES_EMAIL}`}
                data-cta="email"
                className="text-lg md:text-xl font-semibold tracking-tight hover:underline underline-offset-4 break-all"
              >
                {SALES_EMAIL}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? "Email copied" : "Copy email address"}
                className="shrink-0 w-8 h-8 grid place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="mt-1.5 mb-0 text-sm text-muted-foreground">The fastest way to reach us.</p>
          </div>
          <a href="#calendar" className="group p-5 md:p-6 border-b sm:border-b-0 sm:border-r border-border hover:bg-foreground/[0.03] transition-colors">
            <div className={`${kicker} mb-2`}>Book a call</div>
            <div className="text-lg md:text-xl font-semibold tracking-tight">
              Pick a time <span aria-hidden="true" className="text-muted-foreground group-hover:text-foreground transition-colors">&darr;</span>
            </div>
            <p className="mt-1.5 mb-0 text-sm text-muted-foreground">30 minutes on Google Meet.</p>
          </a>
          <a href="#message" className="group p-5 md:p-6 hover:bg-foreground/[0.03] transition-colors">
            <div className={`${kicker} mb-2`}>Write to us</div>
            <div className="text-lg md:text-xl font-semibold tracking-tight">
              Send a message <span aria-hidden="true" className="text-muted-foreground group-hover:text-foreground transition-colors">&rarr;</span>
            </div>
            <p className="mt-1.5 mb-0 text-sm text-muted-foreground">Reply within one business day.</p>
          </a>
        </div>
      </header>

      {/* ── CALENDAR + CONTACT ── */}
      <section className={`${W} pb-16 md:pb-24`}>
        <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-10 lg:gap-14 items-start">
          <div id="calendar" className="scroll-mt-28">
            <div className="flex items-end justify-between gap-4 mb-4">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight m-0">Pick a time</h2>
              <a
                href={BOOKING_SHORT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="book"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Open in a new tab &#8599;
              </a>
            </div>
            {/* Google's booking page always renders on white; frame it as a sheet. */}
            <div className="rounded-[20px] p-2 bg-foreground/[0.04] ring-1 ring-border">
              <BookingCalendar height={760} hideFallback />
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 space-y-5">
            <div className="rounded-2xl border border-border p-6">
              <div className="flex items-center gap-4">
                <img
                  src="/lovable-uploads/founder-andreas.jpg"
                  alt="Andreas Myraune"
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="m-0 font-semibold">Andreas Myraune</p>
                  <p className="m-0 text-sm text-muted-foreground">Head of Agency, Beta Ads</p>
                </div>
              </div>
              <ul className="mt-5 mb-0 p-0 list-none space-y-2.5">
                {PROMISES.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[15px] leading-snug">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="message" className="rounded-2xl border border-border p-6 scroll-mt-28">
              <h2 className="text-xl font-semibold tracking-tight m-0 mb-5">Send a message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field: f }) => (
                      <FormItem>
                        <FormLabel>{t.name}</FormLabel>
                        <FormControl><Input placeholder={t.namePlaceholder} autoComplete="name" className={field} {...f} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field: f }) => (
                      <FormItem>
                        <FormLabel>{t.email}</FormLabel>
                        <FormControl><Input type="email" placeholder={t.emailPlaceholder} autoComplete="email" className={field} {...f} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="company" render={({ field: f }) => (
                    <FormItem>
                      <FormLabel>{t.companyOptional}</FormLabel>
                      <FormControl><Input placeholder={t.companyPlaceholder} autoComplete="organization" className={field} {...f} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field: f }) => (
                    <FormItem>
                      <FormLabel>{t.message}</FormLabel>
                      <FormControl><Textarea placeholder={t.messagePlaceholder} className={`${field} min-h-[110px] resize-none`} {...f} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-11">
                    {isSubmitting
                      ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.sending}</>)
                      : (<>{t.sendMessage}<ArrowRight className="ml-2 h-4 w-4" /></>)}
                  </Button>
                </form>
              </Form>
              <p className="mt-4 mb-0 text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  Prefer email?{" "}
                  <a href={`mailto:${SALES_EMAIL}`} data-cta="email" className="text-foreground hover:underline underline-offset-4">{SALES_EMAIL}</a>
                </span>
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── WHAT THE CALL COVERS ── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={W}>
          <div className={`${kicker} mb-4`}>On the call</div>
          <h2 className={h2}>What we cover <span className="text-muted-foreground">in 30 minutes.</span></h2>
          <div className="mt-10 md:mt-12 grid sm:grid-cols-3 gap-x-10 gap-y-2">
            {AGENDA.map((a, i) => (
              <div key={a.t} className="border-t border-border py-5">
                <span className="text-sm tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 m-0 text-lg font-semibold tracking-tight">{a.t}</h3>
                <p className="mt-1.5 mb-0 text-[15px] leading-relaxed text-muted-foreground">{a.d}</p>
              </div>
            ))}
          </div>
          <Link to="/case-studies" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:underline underline-offset-4">
            Read the case studies first <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Demo;
