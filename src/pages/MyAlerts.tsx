import { useEffect, useState } from "react";

interface Alert {
  message: string;
  severity: "High" | "Medium" | "Info";
}

interface Claim {
  claim_id: string;
  village: string;
  status: string;
  land_data?: {
    water: number;
    crops: number;
    trees: number;
  };
}

const MyAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("fra_user") || "{}");

    if (!user.claim_id) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/claims")
      .then(res => res.json())
      .then((data: Claim[]) => {

        // 🔥 GET ONLY USER CLAIM
        const myClaim = data.find(
          c => c.claim_id === user.claim_id
        );

        if (!myClaim) {
          setLoading(false);
          return;
        }

        const generated: Alert[] = [];

        // 🚨 HIGH: LOW WATER
        if (myClaim.land_data?.water < 10) {
          generated.push({
            message: "Low water in your land",
            severity: "High"
          });
        }

        // ⚠️ MEDIUM: LOW CROPS
        if (myClaim.land_data?.crops < 20) {
          generated.push({
            message: "Low crop productivity",
            severity: "Medium"
          });
        }

        // 🔵 INFO: CLAIM STATUS
        if (myClaim.status === "Pending") {
          generated.push({
            message: "Your claim is under review",
            severity: "Info"
          });
        }

        if (myClaim.status === "Rejected") {
          generated.push({
            message: "Your claim was rejected",
            severity: "High"
          });
        }

        setAlerts(generated);
        setLoading(false);
      })
      .catch(() => setLoading(false));

  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold">🚨 My Alerts</h2>
        <p className="text-gray-500 text-sm">
          Issues and updates related to your land
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500">Loading alerts...</p>
      )}

      {/* NO ALERTS */}
      {!loading && alerts.length === 0 && (
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">✅ No issues detected in your land</p>
        </div>
      )}

      {/* ALERT LIST */}
      <div className="space-y-4">
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
            <p className="font-semibold">{a.message}</p>

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

export default MyAlerts;