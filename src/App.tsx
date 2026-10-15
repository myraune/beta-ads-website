import React, { lazy, Suspense, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ConversionTracker } from "@/components/ConversionTracker";
import { EngagementTracker } from "@/components/EngagementTracker";
import blogPhotos from "virtual:blog-photos";
import { registerPhotos } from "@/lib/blogImage";
import { installLucideA11yPatch } from "@/lib/a11y-icons";

// Register user-uploaded blog photos from /public/blog-photos/ folders
registerPhotos(blogPhotos);

// Entry pages
const Index = lazy(() => import("./pages/Index"));
const Streamers = lazy(() => import("./pages/Streamers"));

// Other pages - lazy, no forced delay
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const TwitchAdvertising = lazy(() => import("./pages/TwitchAdvertising"));
const TwitchAdvertisingCost = lazy(() => import("./pages/TwitchAdvertisingCost"));
const TwitchAnnonseringPris = lazy(() => import("./pages/TwitchAnnonseringPris"));
const KickAdvertisingCost = lazy(() => import("./pages/KickAdvertisingCost"));
const NordicLivestreamAdvertising = lazy(() => import("./pages/NordicLivestreamAdvertising"));
const TwitchByraNorge = lazy(() => import("./pages/TwitchByraNorge"));
const TwitchAgencyNorway = lazy(() => import("./pages/TwitchAgencyNorway"));
const LivestreamChatEngagement = lazy(() => import("./pages/LivestreamChatEngagement"));
const CampaignCompliance = lazy(() => import("./pages/CampaignCompliance"));
const BrandSafety = lazy(() => import("./pages/BrandSafety"));
const ReplayReach = lazy(() => import("./pages/ReplayReach"));
const YouTubeAdvertising = lazy(() => import("./pages/YouTubeAdvertising"));
const KickAdvertising = lazy(() => import("./pages/KickAdvertising"));
const KickAnnonsering = lazy(() => import("./pages/KickAnnonsering"));
const KickAnnonseringSverige = lazy(() => import("./pages/KickAnnonseringSverige"));
const KickAnnoncering = lazy(() => import("./pages/KickAnnoncering"));
const KickMainonta = lazy(() => import("./pages/KickMainonta"));
const KickStreamerAdvertising = lazy(() => import("./pages/KickStreamerAdvertising"));
const KickStreamerAnnonsering = lazy(() => import("./pages/KickStreamerAnnonsering"));
const KickStreamerAnnonseringSverige = lazy(() => import("./pages/KickStreamerAnnonseringSverige"));
const KickStreamerAnnoncering = lazy(() => import("./pages/KickStreamerAnnoncering"));
const KickStreamerMainonta = lazy(() => import("./pages/KickStreamerMainonta"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Norge = lazy(() => import("./pages/Norge"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogLocaleHub = lazy(() => import("./pages/BlogLocaleHub"));
const Contact = lazy(() => import("./pages/Contact"));
const Demo = lazy(() => import("./pages/Demo"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const CaseStudyGlorious = lazy(() => import("./pages/CaseStudyGlorious"));
const CaseStudyGokstad = lazy(() => import("./pages/CaseStudyGokstad"));
const CaseStudySamsungFold7 = lazy(() => import("./pages/CaseStudySamsungFold7"));
const CaseStudySamsung = lazy(() => import("./pages/CaseStudySamsung"));
const CaseStudySurfshark = lazy(() => import("./pages/CaseStudySurfshark"));
const CaseStudySurfsharkFinland = lazy(() => import("./pages/CaseStudySurfsharkFinland"));
const CaseStudySaily = lazy(() => import("./pages/CaseStudySaily"));
const CaseStudyShure = lazy(() => import("./pages/CaseStudyShure"));
const CaseStudyKristiania = lazy(() => import("./pages/CaseStudyKristiania"));
const CaseStudyKomplett = lazy(() => import("./pages/CaseStudyKomplett"));
const CaseStudyNki = lazy(() => import("./pages/CaseStudyNki"));
const Press = lazy(() => import("./pages/Press"));
const WorkingWithUs = lazy(() => import("./pages/WorkingWithUs"));
const ManagedCampaigns = lazy(() => import("./pages/ManagedCampaigns"));
const SelfServe = lazy(() => import("./pages/SelfServe"));
const StreamerProfile = lazy(() => import("./pages/StreamerProfile"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));

const queryClient = new QueryClient();

// English-only translations
const t = {
  heroSubtitle: "Nordic twitch agency",
  heroTitle: ["Your Brand. Part of the Stream.", "Not in the Way."],
  heroDescription: "Native advertising on Twitch that bypasses adblock, reaches Gen Z where they actually watch, and can't be skipped.",
  heroSubDescription: "No forced integrations. Just guaranteed visibility.",
  brandButton: "Watch Demo",
  streamerButton: "Book a Call",
  usedByTitle: "Trusted by Samsung, Surfshark, Shure, and 50+ brands",
  seeCampaignExample: "See Campaign Example",
  streamerSectionTitle: "are you a streamer?",
  streamerSectionSubtitle: "Earn while you stream – automatically.",
  streamerSectionDescription: "Earn money automatically with Beta Ads. No shoutouts. No affiliate links. Just passive income through overlays.",
  joinStreamer: "Join as a Streamer",
  trustedByTitle: "Just watch...",
  trustedByDescription: "Designed to blend with the stream – but stand out to the viewer.",
  meetTeamTitle: "Meet the team",
  meetTeamDescription: "Young, international, and passionate about revolutionizing advertising on Twitch.",
  ctaTitle: "Let's talk",
  ctaDescription: "Book a quick demo with our team and we'll show you what your brand could look like live on Twitch.",
  ctaButton: "Get in Touch",
  bookDemo: "Let's have a chat",
  contactTitle: "CONTACT",
  connectTitle: "CONNECT",
  pressTitle: "Featured in Press",
  pressDescription: "Beta Ads has been featured in leading Nordic media outlets for our innovative approach to Twitch advertising.",
  caseStudy: "Case Study",
  caseVideoTitle: "Samsung Campaign",
  watchVideo: "Watch with sound",
  footerDescription: "The future of Twitch advertising is here.",
  passiveIncome: "Earn passive income based on your viewership",
  swipeHelper: "Swipe or use arrows to see more campaign examples",
  campaignOverview: "Overview of multiple campaigns in action",
  joinDiscord: "Join Our Discord",
  mechanismsSubtitle: "AI-Powered Features",
  mechanismsTitle: "Smart Advertising That Works",
  mechanismsDescription: "Our platform uses advanced technology to deliver ads that feel natural and drive real results.",
};


/* Theme follows the OS (prefers-color-scheme) unless the visitor picks one with the
   toggle. /streamers is always dark, via forcedTheme so it is never written to
   storage and never leaks into the rest of the site. The storage key was renamed
   from next-themes' default "theme" so visitors stuck on an old saved value (from
   the former setTheme("dark") on /streamers) start following their OS again. */
const RoutedThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="beta-theme"
      forcedTheme={pathname === "/streamers" ? "dark" : undefined}
    >
      {children}
    </ThemeProvider>
  );
};

/* Scroll to top on every route change, or to the section in the hash
   ("/#tour" from a subpage). Lazy routes render after a moment, so the target
   is polled for a short while before giving up. */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1));
    if (!id) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    let tries = 0;
    let timer = 0;
    const seek = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ block: "start" });
      else if (tries++ < 40) timer = window.setTimeout(seek, 75);
    };
    seek();
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
  return null;
};

/**
 * Reports the matched route to Speed Insights instead of letting every pageview
 * land in the "Unknown" bucket. Dynamic segments are collapsed to their pattern
 * so the dashboard groups pages rather than listing one row per blog slug.
 */
const SpeedInsightsWithRoute = () => {
  const { pathname } = useLocation();
  const route = pathname
    .replace(/^\/blog\/.+/, "/blog/:slug")
    .replace(/^\/streamere\/.+/, "/streamere/:handle");
  return <SpeedInsights route={route} />;
};

const App = () => {
  useEffect(() => {
    installLucideA11yPatch();
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <RoutedThemeProvider>
      <Analytics />
      <ConversionTracker />
      <Toaster />
      <Sonner />
      <MotionConfig reducedMotion="user">
        <EngagementTracker />
        <SpeedInsightsWithRoute />
        <ScrollToTop />
        <Suspense
          fallback={<div className="fixed inset-0 z-[100] bg-background pointer-events-none" />}
        >
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/case-studies" element={<CaseStudies t={t} />} />
              <Route path="/twitch-advertising" element={<TwitchAdvertising />} />
              <Route path="/twitch-advertising-cost" element={<TwitchAdvertisingCost />} />
              <Route path="/twitch-annonsering-pris" element={<TwitchAnnonseringPris />} />
              <Route path="/kick-advertising-cost" element={<KickAdvertisingCost />} />
              <Route path="/nordic-livestream-advertising" element={<NordicLivestreamAdvertising />} />
              <Route path="/twitch-byra-norge" element={<TwitchByraNorge />} />
              <Route path="/twitch-agency-norway" element={<TwitchAgencyNorway />} />
              <Route path="/livestream-chat-engagement" element={<LivestreamChatEngagement />} />
              <Route path="/campaign-compliance" element={<CampaignCompliance />} />
              <Route path="/brand-safety" element={<BrandSafety />} />
              <Route path="/replay-reach" element={<ReplayReach />} />
              <Route path="/youtube-advertising" element={<YouTubeAdvertising />} />
              <Route path="/kick-advertising" element={<KickAdvertising />} />
              <Route path="/kick-annonsering" element={<KickAnnonsering />} />
              <Route path="/kick-annonsering-sverige" element={<KickAnnonseringSverige />} />
              <Route path="/kick-annoncering" element={<KickAnnoncering />} />
              <Route path="/kick-mainonta" element={<KickMainonta />} />
              <Route path="/kick-streamer-advertising" element={<KickStreamerAdvertising />} />
              <Route path="/kick-streamer-annonsering" element={<KickStreamerAnnonsering />} />
              <Route path="/kick-streamer-annonsering-sverige" element={<KickStreamerAnnonseringSverige />} />
              <Route path="/kick-streamer-annoncering" element={<KickStreamerAnnoncering />} />
              <Route path="/kick-streamer-mainonta" element={<KickStreamerMainonta />} />
              <Route path="/streamers" element={<Streamers t={t} />} />
              <Route path="/about" element={<AboutUs t={t} />} />
              <Route path="/norge" element={<Norge />} />
              <Route path="/blog" element={<Blog />} />
              {/* Per-country Nordic blog hubs (static segments rank above /blog/:slug) */}
              <Route path="/blog/norge" element={<BlogLocaleHub hubSlug="norge" />} />
              <Route path="/blog/sverige" element={<BlogLocaleHub hubSlug="sverige" />} />
              <Route path="/blog/suomi" element={<BlogLocaleHub hubSlug="suomi" />} />
              <Route path="/blog/danmark" element={<BlogLocaleHub hubSlug="danmark" />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/demo" element={<Demo t={t} language="en" />} />
              <Route path="/press" element={<Press />} />
              <Route path="/working-with-us" element={<WorkingWithUs />} />
              <Route path="/managed-campaigns" element={<ManagedCampaigns />} />
              <Route path="/self-serve" element={<SelfServe />} />
              {/* Norske streamer-profiler (én side per creator i den norske roundup-saken) */}
              <Route path="/streamere/:handle" element={<StreamerProfile />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/case-study/glorious" element={<CaseStudyGlorious />} />
              <Route path="/case-study/gokstad" element={<CaseStudyGokstad />} />
              <Route path="/case-study/samsung" element={<CaseStudySamsung />} />
              <Route path="/case-study/samsung-fold7" element={<CaseStudySamsungFold7 />} />
              <Route path="/case-study/surfshark" element={<CaseStudySurfshark />} />
              <Route path="/case-study/surfshark-finland" element={<CaseStudySurfsharkFinland />} />
              <Route path="/case-study/saily" element={<CaseStudySaily />} />
              <Route path="/case-study/shure" element={<CaseStudyShure />} />
              <Route path="/case-study/kristiania" element={<CaseStudyKristiania />} />
              <Route path="/case-study/komplett" element={<CaseStudyKomplett />} />
              <Route path="/case-study/nki" element={<CaseStudyNki />} />
              <Route path="/unsubscribe" element={<Unsubscribe />} />
              {/* SEO redirects - mirrors vercel.json edge redirects for client-side nav */}
              <Route path="/how-it-works" element={<Navigate to="/case-studies" replace />} />
              <Route path="/pricing" element={<Navigate to="/twitch-advertising-cost" replace />} />
              <Route path="/blog/samsung-twitch-campaign-case-study" element={<Navigate to="/case-study/samsung" replace />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </MotionConfig>
    </RoutedThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
  );
};

export default App;
