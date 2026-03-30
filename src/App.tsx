import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from "next-themes";
import { Layout } from "@/components/Layout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Entry pages
const Index = lazy(() => import("./pages/Index"));
const Streamers = lazy(() => import("./pages/Streamers"));

// Other pages — lazy, no forced delay
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const TwitchAdvertising = lazy(() => import("./pages/TwitchAdvertising"));
const YouTubeAdvertising = lazy(() => import("./pages/YouTubeAdvertising"));
const KickAdvertising = lazy(() => import("./pages/KickAdvertising"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const Demo = lazy(() => import("./pages/Demo"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const CaseStudyGlorious = lazy(() => import("./pages/CaseStudyGlorious"));
const CaseStudyGokstad = lazy(() => import("./pages/CaseStudyGokstad"));
const Press = lazy(() => import("./pages/Press"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));

const queryClient = new QueryClient();

// English-only translations
const t = {
  heroSubtitle: "Nordic twitch agency",
  heroTitle: ["Your Brand. Part of the Stream.", "Not in the Way."],
  heroDescription: "Native advertising on Twitch that bypasses adblock, reaches Gen Z authentically, and delivers 3-5x higher engagement than traditional video ads.",
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


/* Force dark on /streamers only — all other pages follow system preference.
   Also scrolls to top on every route change. */
const RouteThemeEnforcer = () => {
  const { setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    setTheme(location.pathname === "/streamers" ? "dark" : "system");
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname, setTheme]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem forcedTheme={undefined}>
      <Analytics />
      <SpeedInsights />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteThemeEnforcer />
        <Suspense fallback={null}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/case-studies" element={<CaseStudies t={t} />} />
              <Route path="/twitch-advertising" element={<TwitchAdvertising />} />
              <Route path="/youtube-advertising" element={<YouTubeAdvertising />} />
              <Route path="/kick-advertising" element={<KickAdvertising />} />
              <Route path="/streamers" element={<Streamers t={t} />} />
              <Route path="/about" element={<AboutUs t={t} />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/demo" element={<Demo t={t} language="en" />} />
              <Route path="/press" element={<Press />} />
              <Route path="/pricing" element={<Pricing t={t} />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/case-study/glorious" element={<CaseStudyGlorious />} />
              <Route path="/case-study/gokstad" element={<CaseStudyGokstad />} />
              <Route path="/unsubscribe" element={<Unsubscribe />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
