import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { AnimatedBackground } from "./AnimatedBackground";
import { PageTransition } from "./PageTransition";
import { ScrollProgress } from "./ScrollProgress";

interface LayoutProps {
  language: string;
  setLanguage: (lang: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ language, setLanguage }) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Unified Aurora Background */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <Navbar language={language} setLanguage={setLanguage} />
      
      {/* Main Content with Page Transitions */}
      <main className="relative z-10">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
};
