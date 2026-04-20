import { useEffect, useState } from "react";

const Settings = () => {
  const [user, setUser] = useState<any>(null);
  const [water, setWater] = useState(10);
  const [crops, setCrops] = useState(20);
  const [loading, setLoading] = useState(false);

  // ========================
  // LOAD DATA
  // ========================
  useEffect(() => {
    const stored = localStorage.getItem("fra_user");
    if (stored) setUser(JSON.parse(stored));

    fetch("http://localhost:5000/settings")
      .then(res => res.json())
      .then(data => {
        setWater(data.waterThreshold);
        setCrops(data.cropsThreshold);
      });
  }, []);

  // ========================
  // SAVE SETTINGS
  // ========================
  const saveSettings = async () => {
    setLoading(true);

    await fetch("http://localhost:5000/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        waterThreshold: water,
        cropsThreshold: crops
      })
    });

    alert("✅ Settings saved!");
    setLoading(false);
  };

  // ========================
  // SYNC GEE
  // ========================
  const syncData = async () => {
    setLoading(true);

    await fetch("http://localhost:5000/sync-gee");

    alert("🌍 GEE Data Synced!");
    setLoading(false);
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">⚙️ Settings</h2>

      {/* ================= PROFILE ================= */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-2">👤 Profile</h3>
        <p><b>Name:</b> {user?.name}</p>
        <p><b>Role:</b> Government Officer</p>
      </div>

      {/* ================= ALERT SETTINGS ================= */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-4">🔔 Alert Thresholds</h3>

        <div className="space-y-3">
          <div>
            <label>Water Threshold (%)</label>
            <input
              type="number"
              value={water}
              onChange={(e) => setWater(Number(e.target.value))}
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label>Crops Threshold (%)</label>
            <input
              type="number"
              value={crops}
              onChange={(e) => setCrops(Number(e.target.value))}
              className="border p-2 w-full rounded"
            />
          </div>
        </div>

        <button
          onClick={saveSettings}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          💾 Save Settings
        </button>
      </div>

      {/* ================= SYNC ================= */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-2">🌍 Data Sync</h3>

        <button
          onClick={syncData}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          🔄 Sync GEE Data
        </button>
      </div>

      {loading && <p>Loading...</p>}

    </div>
  );
};

export default Settings;