import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { AnimatedBackground } from "./AnimatedBackground";
import { PageTransition } from "./PageTransition";

interface LayoutProps {
  language: string;
  setLanguage: (lang: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ language, setLanguage }) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      {/* Scroll sentinel for navbar - 1px invisible div at top */}
      <div id="navbar-sentinel" className="absolute top-0 left-0 w-full h-[1px] pointer-events-none" />
      
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
