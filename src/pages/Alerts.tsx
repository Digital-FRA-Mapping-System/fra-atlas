import { useEffect, useState } from "react";

interface Claim {
  claim_id: string;
  village: string;
  status: string;
  land_data: {
    water: number;
    crops: number;
    trees: number;
  };
}

interface Alert {
  type: string;
  message: string;
  village: string;
  severity: "High" | "Medium" | "Info";
}

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [claimsRes, settingsRes] = await Promise.all([
          fetch("http://localhost:5000/claims"),
          fetch("http://localhost:5000/settings")
        ]);
  
        const claims = await claimsRes.json();
        const settings = await settingsRes.json();
  
        console.log("CLAIMS:", claims);
        console.log("SETTINGS:", settings);
  
        const generated: Alert[] = [];
  
        claims.forEach((c: Claim) => {
          // 🚨 Skip invalid
          if (!c.land_data) return;
  
          // ✅ USE SETTINGS (IMPORTANT)
          if (c.land_data.water < settings.waterThreshold) {
            generated.push({
              type: "Water",
              message: `Low water detected in ${c.village}`,
              village: c.village,
              severity: "High"
            });
          }
  
          if (c.land_data.crops < settings.cropsThreshold) {
            generated.push({
              type: "Crops",
              message: `Low crop production in ${c.village}`,
              village: c.village,
              severity: "Medium"
            });
          }
  
          if (c.status === "Pending") {
            generated.push({
              type: "Claim",
              message: `Pending claim (${c.claim_id}) needs review`,
              village: c.village,
              severity: "Info"
            });
          }
        });
  
        setAlerts(generated);
  
      } catch (err) {
        console.error("Error loading alerts:", err);
      }
    };
  
    loadData();
  }, []);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold">🚨 Alerts Dashboard</h2>
        <p className="text-gray-500 text-sm">
          Monitor critical issues and system warnings
        </p>
      </div>

      {/* ALERT LIST */}
      <div className="space-y-4">

        {alerts.length === 0 && (
          <p className="text-gray-500">No alerts available</p>
        )}

        {alerts.map((a, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl shadow flex justify-between items-center ${
              a.severity === "High"
                ? "bg-red-100 border-l-4 border-red-500"
                : a.severity === "Medium"
                ? "bg-yellow-100 border-l-4 border-yellow-500"
                : "bg-blue-100 border-l-4 border-blue-500"
            }`}
          >
            <div>
              <p className="font-semibold">{a.message}</p>
              <p className="text-sm text-gray-600">
                Village: {a.village}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                a.severity === "High"
                  ? "bg-red-500 text-white"
                  : a.severity === "Medium"
                  ? "bg-yellow-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {a.severity}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Alerts;