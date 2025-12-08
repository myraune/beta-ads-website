import React from "react";
import { Navbar } from "./Navbar";
import { AnimatedBackground } from "./AnimatedBackground";
import { PageTransition } from "./PageTransition";

interface LayoutProps {
  children: React.ReactNode;
  language: string;
  setLanguage: (lang: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, language, setLanguage }) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Unified Aurora Background */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <Navbar language={language} setLanguage={setLanguage} />
      
      {/* Main Content with Page Transitions */}
      <main className="relative z-10">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
    </div>
  );
};
