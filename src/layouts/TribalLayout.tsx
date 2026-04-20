import { Outlet, useNavigate } from "react-router-dom";
import { Trees, LogOut, MapPin, Bell, Home, FileText } from "lucide-react";

const TribalLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("fra_user");
    navigate("/");
  };

  const menuItems = [
    { icon: Home, label: "Overview", path: "/dashboard/tribal" },
    { icon: MapPin, label: "My Lands", path: "/dashboard/tribal/my-lands" },
    { icon: FileText, label: "My Claims", path: "/dashboard/tribal/my-claims" },
    { icon: Bell, label: "Alerts", path: "/dashboard/tribal/my-alerts" }
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-green-900 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Trees /> FRA DigiMap
        </h2>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-green-700"
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 bg-red-500 rounded mt-6"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default TribalLayout;