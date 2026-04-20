import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

interface UserData {
  type: "tribal" | "government";
  name: string;
}

const DashboardGovernment = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("fra_user");
    if (!stored) { navigate("/"); return; }

    const parsed = JSON.parse(stored);
    if (parsed.type !== "government") { navigate("/"); return; }

    setUser(parsed);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("fra_user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream/40">

      {/* TOP BAR */}
      <header className="p-4 border-b flex justify-between items-center bg-white">
        <h1 className="text-xl font-semibold">Dashboard</h1>

        <Button onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </header>

      {/* CONTENT */}
      <div className="p-6">
        <h2 className="text-xl font-bold">Welcome, {user.name}</h2>
        <p className="text-gray-600 mt-2">
          Click GIS Atlas to open your map 🌍
        </p>
      </div>

    </div>
  );
};

export default DashboardGovernment;