import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Shield, LogOut, MapPin, Bell, Users,
  Home, FileText, BarChart3, Settings, HelpCircle, Upload
} from "lucide-react";

import { Button } from "@/components/ui/button";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("fra_user");
    navigate("/");
  };

  const menuItems = [
    { icon: Home, label: "Overview", path: "/dashboard/government1" },
    { icon: MapPin, label: "GIS Atlas", path: "/dashboard/government1/gei" },
    { icon: Users, label: "Beneficiaries", path: "/dashboard/government1/beneficiaries" },
    { icon: Upload, label: "Upload Document", path: "/dashboard/government1/upload" },
    { icon: FileText, label: "Claims Review", path: "/dashboard/government1/claims-review" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/government1/analytics" },
    { icon: Bell, label: "Alerts", path: "/dashboard/government1/alerts" },

  ];

  return (
    <div className="min-h-screen bg-cream/40 flex">

      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-64 flex-col gradient-forest text-cream sticky top-0 h-screen">

        {/* LOGO */}
        <div className="p-6 border-b border-cream/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-amber flex items-center justify-center">
              <Shield className="h-5 w-5 text-forest-dark" />
            </div>
            <div>
              <p className="font-bold">FRA DigiMap</p>
              <p className="text-xs text-cream/50">Officer Portal</p>
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                location.pathname === item.path
                  ? "bg-amber/15 text-amber border-l-2 border-amber"
                  : "text-cream/70 hover:bg-cream/5 hover:text-cream"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-cream/10 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm">
            <Settings className="h-4 w-4" /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm">
            <HelpCircle className="h-4 w-4" /> Help
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1">

        {/* TOP BAR */}
        <header className="p-4 border-b flex justify-between">
          <h1>Dashboard</h1>
          <Button onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </header>

        {/* CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>

      </main>
    </div>
  );
};

export default MainLayout;