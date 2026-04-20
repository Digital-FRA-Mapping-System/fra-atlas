import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OverviewGovernment = () => {
  const [claims, setClaims] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // ========================
  // FETCH DATA
  // ========================
  useEffect(() => {
    // Claims
    fetch("http://localhost:5000/claims")
      .then(res => res.json())
      .then(data => setClaims(data));

    // Logged-in officer
    const stored = localStorage.getItem("fra_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // ========================
  // ALERTS
  // ========================
  const alerts: string[] = [];

  claims.forEach((c) => {
    if (!c.land_data) return;

    if (c.land_data.water < 10) {
      alerts.push(`🚨 Low water in ${c.village}`);
    }

    if (c.land_data.crops < 20) {
      alerts.push(`⚠️ Low crops in ${c.village}`);
    }

    if (c.status === "Pending") {
      alerts.push(`⏳ Pending claim ${c.claim_id}`);
    }
  });

  // ========================
  // PENDING COUNT
  // ========================
  const pendingCount = claims.filter(
    (c) => c.status === "Pending"
  ).length;

  // ========================
  // FOCUS VILLAGES
  // ========================
  const focusVillages = claims
    .filter(
      (c) =>
        c.land_data &&
        (c.land_data.water < 10 || c.land_data.crops < 20)
    )
    .slice(0, 3);

  // ========================
  // RECENT ACTIVITY
  // ========================
  const recent = claims.slice(0, 5);

  return (
    <div className="space-y-6">

      {/* ========================
          HEADER (Officer Name)
      ======================== */}
      <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">
            Welcome, {user?.name || "Officer"}
          </h2>
          <p className="text-gray-500 text-sm">
            Government Dashboard
          </p>
        </div>

        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* ========================
          ALERTS
      ======================== */}
      <div className="bg-red-50 p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-3">🚨 Priority Alerts</h3>

        {alerts.length === 0 ? (
          <p>No urgent issues</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {alerts.slice(0, 5).map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        )}
      </div>

      {/* ========================
          PENDING WORK
      ======================== */}
      <div className="bg-yellow-50 p-5 rounded-xl shadow flex justify-between items-center">
        <div>
          <h3 className="font-semibold">⏳ Pending Work</h3>
          <p>{pendingCount} claims need review</p>
        </div>

        <button
          onClick={() =>
            navigate("/dashboard/government1/claims-review")
          }
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Review Now
        </button>
      </div>

      {/* ========================
          FOCUS VILLAGES
      ======================== */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-3">📍 Focus Villages</h3>

        {focusVillages.map((v, i) => (
          <div key={i} className="text-sm border-b py-2">
            <b>{v.village}</b> →
            {v.land_data.water < 10 && " Low water "}
            {v.land_data.crops < 20 && " Low crops"}
          </div>
        ))}
      </div>

      {/* ========================
          RECENT ACTIVITY
      ======================== */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-3">📂 Recent Activity</h3>

        {recent.map((c) => (
          <div key={c._id} className="text-sm border-b py-2">
            {c.status === "Approved" && "✔"}
            {c.status === "Rejected" && "❌"}
            {c.status === "Pending" && "⏳"}{" "}
            Claim {c.claim_id} ({c.village}) → {c.status}
          </div>
        ))}
      </div>

      {/* ========================
          QUICK ACTIONS
      ======================== */}
      <div className="grid grid-cols-3 gap-4">

        <button
          onClick={() =>
            navigate("/dashboard/government1/claims-review")
          }
          className="bg-blue-500 text-white p-4 rounded-xl"
        >
          📂 Review Claims
        </button>

        <button
          onClick={() =>
            navigate("/dashboard/government1/gis")
          }
          className="bg-green-500 text-white p-4 rounded-xl"
        >
          🌍 Open GIS Map
        </button>

        <button
          onClick={() =>
            navigate("/dashboard/government1/analytics")
          }
          className="bg-purple-500 text-white p-4 rounded-xl"
        >
          📊 View Analytics
        </button>

      </div>

    </div>
  );
};

export default OverviewGovernment;