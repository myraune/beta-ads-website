import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  BarChart3,
  Briefcase,
  X,
} from "lucide-react";

interface DashboardSidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Kampanjer",
    path: "/dashboard/campaigns",
    icon: FolderOpen,
    exact: false,
  },
  {
    label: "Streamers",
    path: "/dashboard/streamers",
    icon: Users,
    exact: false,
  },
  {
    label: "Audience Insights",
    path: "/dashboard/audience",
    icon: BarChart3,
    exact: true,
  },
  {
    label: "Mine Kampanjer",
    path: "/dashboard/my-campaigns",
    icon: Briefcase,
    exact: true,
  },
];

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpen,
  isMobileOpen,
  onMobileClose,
}) => {
  const location = useLocation();

  const isActive = (path: string, exact: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-card/95 backdrop-blur-md border-r border-border/50 z-30 transition-all duration-300 hidden lg:block",
          isOpen ? "w-60" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-border/50">
          <NavLink to="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">B</span>
            </div>
            {isOpen && (
              <span className="font-bold text-lg text-foreground">BETA</span>
            )}
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.path, item.exact);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50">
            <NavLink
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Tilbake til nettside
            </NavLink>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-72 bg-card/95 backdrop-blur-md border-r border-border/50 z-50 transition-transform duration-300 lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
          <NavLink to="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-lg text-foreground">BETA</span>
          </NavLink>
          <button
            onClick={onMobileClose}
            className="p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.path, item.exact);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onMobileClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50">
          <NavLink
            to="/"
            onClick={onMobileClose}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Tilbake til nettside
          </NavLink>
        </div>
      </aside>
    </>
  );
};
