import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { AnimatedBackground } from "./AnimatedBackground";
import { PageTransition } from "./PageTransition";
import { AnnouncementBar } from "./sections/AnnouncementBar";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      {/* Scroll sentinel for navbar - 1px invisible div at top */}
      <div id="navbar-sentinel" className="absolute top-0 left-0 w-full h-[1px] pointer-events-none" />
      
      {/* Unified Aurora Background */}
      <AnimatedBackground />

      {/* Announcement Bar */}
      <AnnouncementBar />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content with Page Transitions */}
      <main className="relative z-10">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
};
