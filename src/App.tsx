import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import CaseStudies from "./pages/CaseStudies";
import HowItWorks from "./pages/HowItWorks";
import Streamers from "./pages/Streamers";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";
import Unsubscribe from "./pages/Unsubscribe";
import Press from "./pages/Press";
import Pricing from "./pages/Pricing";

// Dashboard
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CampaignList from "./pages/dashboard/CampaignList";
import CampaignDetail from "./pages/dashboard/CampaignDetail";
import StreamerProfile from "./pages/dashboard/StreamerProfile";
import AudienceInsights from "./pages/dashboard/AudienceInsights";

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
  mechanismsTitle: "This should convince you.",
  mechanismsDescription: "Discover our cutting-edge AI functionalities that make your brand integration more engaging and interactive.",
  vrmTitle: "Voice Recognition Mechanism",
  vrmDescription: "Contextual artwork appears when streamers say keywords, creating natural brand integration.",
  vrmHowItWorks: ["The streamer says one of the keywords.", "The mechanism recognises the word and launches the artwork.", "Viewers see a contextual message on the stream."],
  vrmWhyWorthIt: ["An innovative mechanism that surprises audiences.", "The brand becomes part of the themes or games on the stream.", "Contextual messages reach the audience better."],
  votingTitle: "Voting Mechanism",
  votingDescription: "Interactive voting system that allows viewers to participate in decision-making and games.",
  votingHowItWorks: ["Artwork encouraging people to vote for a particular option appears on the stream.", "Another artwork appears with the result that the players have chosen."],
  votingWhyWorthIt: ["Involving the audience in decision-making strengthens their focus.", "The brand is the interactive part of the stream. And since I'm already clicking on the chat, I can also click the link...."],
  howItWorksTitle: "HOW DOES IT WORK?",
  whyWorthItTitle: "WHY IS IT WORTH IT?",
  exploreMoreCampaigns: "Explore more campaigns",
  seeOurWork: "See our work",
  howItWorksSectionTitle: "How It Works",
  howItWorksSectionSubtitle: "From brief to broadcast in 4 simple steps",
  step1Title: "Define Your Goal",
  step1Desc: "Awareness, traffic, or conversions — we tailor the campaign to your KPIs.",
  step2Title: "We Create Native Artwork",
  step2Desc: "Custom overlays designed to feel like part of the stream, not interruptions.",
  step3Title: "Launch Across 100s of Streams",
  step3Desc: "Go live simultaneously across Nordic Twitch, YouTube & Kick streamers.",
  step4Title: "Track & Optimize",
  step4Desc: "Real-time dashboard with impressions, CTR, and weekly performance reports.",
  adFormatsTitle: "Ad Formats",
  adFormatsSubtitle: "Native advertising designed for live streaming",
  bestFor: "Best for",
  ourWork: "Our Work",
  realCampaigns: "Real campaigns with real brands. Here's what we delivered.",
  viewAllCases: "View all case studies",
  impressions: "Impressions",
  ctr: "CTR",
  newsletterTitle: "Get Nordic Twitch Market Insights",
  newsletterSubtitle: "Interested in getting first-hand info about the Nordic Twitch market?",
  marketingProfessionals: "500+ Marketing Professionals",
  exclusiveCaseStudies: "Exclusive Case Studies",
  marketTrends: "Market Trends",
  getInsights: "Get Exclusive Market Insights",
  subscribing: "Subscribing...",
  privacyNote: "We respect your privacy. Unsubscribe at any time.",
  requestDemo: "Request a Demo",
  seeInAction: "See Beta Ads in action",
  demoFormDescription: "Fill out the form below or book a call directly with our team.",
  bookCallDirect: "Book a Call Directly",
  orFillForm: "Or fill out the form",
  name: "Name",
  email: "Email",
  company: "Company",
  message: "Message",
  sending: "Sending...",
  sendMessage: "Send Message",
  discoverHow: "Discover how we've helped brands connect with streaming audiences through authentic partnerships.",
  readMore: "Read more",
  preferTalkDirectly: "Prefer to talk directly? Book a 15-minute call.",
  namePlaceholder: "Your name",
  emailPlaceholder: "you@company.com",
  companyOptional: "Company (optional)",
  companyPlaceholder: "Your company",
  messagePlaceholder: "Tell us about your campaign goals...",
  messageSent: "Message sent!",
  wellGetBack: "We'll get back to you shortly.",
  somethingWentWrong: "Something went wrong. Please try again.",
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="beta-ads-theme">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index t={t} />} />
              <Route path="/case-studies" element={<CaseStudies t={t} />} />
              <Route path="/how-it-works" element={<HowItWorks t={t} />} />
              <Route path="/streamers" element={<Streamers t={t} />} />
              <Route path="/about" element={<AboutUs t={t} />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost t={t} />} />
              <Route path="/contact" element={<Contact t={t} />} />
              <Route path="/demo" element={<Demo t={t} />} />
              <Route path="/press" element={<Press />} />
              <Route path="/pricing" element={<Pricing />} />
            </Route>
            
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="campaigns" element={<CampaignList />} />
              <Route path="campaigns/:id" element={<CampaignDetail />} />
              <Route path="streamers/:id" element={<StreamerProfile />} />
              <Route path="audience" element={<AudienceInsights />} />
            </Route>
            
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
