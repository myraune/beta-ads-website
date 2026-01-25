import React from "react";
import { Menu, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onToggleMobileSidebar: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  sidebarOpen,
  onToggleSidebar,
  onToggleMobileSidebar,
}) => {
  return (
    <header className="sticky top-0 z-20 h-16 bg-background/80 backdrop-blur-md shadow-md shadow-black/5">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggleMobileSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Desktop sidebar toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={onToggleSidebar}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeft className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="default"
            size="sm"
            className="bg-primary hover:bg-primary/90"
            onClick={() => window.open("https://calendar.app.google/coW5NLQJtLxfRer19", "_blank")}
          >
            Book demo
          </Button>
        </div>
      </div>
    </header>
  );
};
