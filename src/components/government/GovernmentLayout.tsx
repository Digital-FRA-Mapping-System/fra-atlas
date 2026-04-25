import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Shield,
  LogOut,
  MapPin,
  Bell,
  Users,
  Home,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GovernmentUser {
  type: "tribal" | "government";
  name: string;
}

interface GovernmentLayoutProps {
  user: GovernmentUser;
  headerTitle: string;
  headerSubtitle?: string;
  children: ReactNode;
}

const navItemClass = (active: boolean) =>
  `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
    active ? "bg-amber/15 text-amber border-l-2 border-amber" : "text-cream/70 hover:bg-cream/5 hover:text-cream"
  }`;

export const GovernmentLayout = ({
  user,
  headerTitle,
  headerSubtitle = "Officer Portal",
  children,
}: GovernmentLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("fra_user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-cream/40 flex">
      <aside className="hidden lg:flex w-64 flex-col gradient-forest text-cream sticky top-0 h-screen">
        <div className="p-6 border-b border-cream/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-amber flex items-center justify-center">
              <Shield className="h-5 w-5 text-forest-dark" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-base font-bold text-cream">FRA DigiMap</p>
              <p className="text-[10px] uppercase tracking-widest text-cream/50">Officer Portal</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/dashboard/government" className={navItemClass(path === "/dashboard/government")}>
            <Home className="h-4 w-4" />
            Overview
          </Link>
          <button type="button" className={navItemClass(false)}>
            <MapPin className="h-4 w-4" />
            GIS Atlas
          </button>
          <button type="button" className={navItemClass(false)}>
            <Users className="h-4 w-4" />
            Beneficiaries
          </button>
          <Link
            to="/dashboard/government/claims-review"
            className={navItemClass(path.startsWith("/dashboard/government/claims-review"))}
          >
            <FileText className="h-4 w-4" />
            Claims Review
          </Link>
          <Link
            to="/dashboard/government/analytics"
            className={navItemClass(path === "/dashboard/government/analytics")}
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Link>
          <button type="button" className={navItemClass(false)}>
            <Bell className="h-4 w-4" />
            Alerts
          </button>
        </nav>
        <div className="p-4 border-t border-cream/10 space-y-1">
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/70 hover:bg-cream/5 hover:text-cream transition-colors"
          >
            <Settings className="h-4 w-4" /> Settings
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/70 hover:bg-cream/5 hover:text-cream transition-colors"
          >
            <HelpCircle className="h-4 w-4" /> Help
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="bg-background border-b border-border sticky top-0 z-40">
          <div className="px-6 lg:px-10 h-16 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{headerSubtitle}</p>
              <h1 className="font-display text-lg font-semibold text-foreground leading-tight">{headerTitle}</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber" />
              </Button>
              <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-border">
                <div className="text-right leading-tight">
                  <p className="text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="text-[11px] text-muted-foreground">District Collector · IAS</p>
                </div>
                <div className="w-9 h-9 rounded-full gradient-forest flex items-center justify-center ring-2 ring-amber/30">
                  <Shield className="h-4 w-4 text-amber" />
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10 space-y-8 max-w-[1500px]">{children}</div>
      </main>
    </div>
  );
};
