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
  suggestions: string[];
}

const MyLands = () => {
  const [claim, setClaim] = useState<Claim | null>(null);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("fra_user") || "{}");

    if (!user.claim_id) return;

    fetch("http://localhost:5000/claims")
      .then(res => res.json())
      .then((data: Claim[]) => {

        const myClaim = data.find(c => c.claim_id === user.claim_id);

        if (myClaim) {
          setClaim(myClaim);

          // 🔥 Generate alerts
          const a: string[] = [];

          if (myClaim.land_data?.water < 10) {
            a.push("🚨 Low water in your land");
          }

          if (myClaim.land_data?.crops < 20) {
            a.push("⚠️ Low crop productivity");
          }

          if (myClaim.status === "Rejected") {
            a.push("❌ Your claim was rejected");
          }

          setAlerts(a);
        }
      });
  }, []);

  if (!claim) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        No land data found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          🌍 My Land
        </h2>
        <p className="text-gray-500 text-sm">
          View your land details and claim status
        </p>
      </div>

      {/* STATUS CARD */}
      <div className="bg-white p-6 rounded-2xl shadow flex justify-between">
        <div>
          <p className="text-gray-500 text-sm">Plot ID</p>
          <h3 className="text-xl font-bold">{claim.claim_id}</h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Village</p>
          <h3 className="text-xl font-bold">{claim.village}</h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Status</p>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            claim.status === "Approved"
              ? "bg-green-100 text-green-700"
              : claim.status === "Rejected"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}>
            {claim.status}
          </span>
        </div>
      </div>

      {/* LAND DATA */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-blue-50 p-6 rounded-xl shadow">
          <p className="text-blue-600 text-sm">💧 Water</p>
          <h3 className="text-2xl font-bold">{claim.land_data.water}%</h3>
        </div>

        <div className="bg-green-50 p-6 rounded-xl shadow">
          <p className="text-green-600 text-sm">🌾 Crops</p>
          <h3 className="text-2xl font-bold">{claim.land_data.crops}%</h3>
        </div>

        <div className="bg-emerald-50 p-6 rounded-xl shadow">
          <p className="text-emerald-600 text-sm">🌳 Trees</p>
          <h3 className="text-2xl font-bold">{claim.land_data.trees}%</h3>
        </div>

      </div>

      {/* ALERTS */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h4 className="font-semibold mb-3">🚨 Alerts</h4>

        {alerts.length === 0 ? (
          <p className="text-gray-500">No issues detected</p>
        ) : (
          <ul className="space-y-2">
            {alerts.map((a, i) => (
              <li key={i} className="text-sm text-red-600">{a}</li>
            ))}
          </ul>
        )}
      </div>

      {/* SUGGESTIONS */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h4 className="font-semibold mb-3">🤖 Suggestions</h4>

        {claim.suggestions.length === 0 ? (
          <p className="text-gray-500">No suggestions</p>
        ) : (
          <ul className="space-y-2">
            {claim.suggestions.map((s, i) => (
              <li key={i} className="text-sm text-gray-700">{s}</li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default MyLands;