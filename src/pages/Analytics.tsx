import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const Analytics = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/analytics")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  // ========================
  // STATUS FORMAT
  // ========================
  const statusData = data.status.map((s: any) => ({
    name: s._id,
    value: s.count
  }));

  const total = data.total || 1;

  // ========================
  // LAND DATA
  // ========================
  const landData = [
    { name: "Water", value: data.land.avgWater || 0 },
    { name: "Crops", value: data.land.avgCrops || 0 },
    { name: "Trees", value: data.land.avgTrees || 0 }
  ];

  // ========================
  // EXTRA STATS
  // ========================
  const getCount = (status: string) =>
    statusData.find((s: any) => s.name === status)?.value || 0;

  const approved = getCount("Approved");
  const pending = getCount("Pending");
  const rejected = getCount("Rejected");

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold">📊 Analytics Dashboard</h2>
        <p className="text-sm opacity-90">
          Insights and performance overview
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Claims</p>
          <p className="text-xl font-bold">{total}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-xl font-bold text-green-600">{approved}</p>
          <p className="text-xs text-gray-400">
            {(approved / total * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-xl font-bold text-yellow-600">{pending}</p>
          <p className="text-xs text-gray-400">
            {(pending / total * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-xl font-bold text-red-600">{rejected}</p>
          <p className="text-xs text-gray-400">
            {(rejected / total * 100).toFixed(1)}%
          </p>
        </div>

      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* PIE */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h4 className="mb-4 font-semibold">Claim Status</h4>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} dataKey="value" label>
                {statusData.map((_: any, i: number) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h4 className="mb-4 font-semibold">Land Distribution</h4>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={landData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ================= INSIGHTS ================= */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h4 className="font-semibold mb-2">📌 Insights</h4>

        <ul className="text-sm text-gray-600 space-y-1">
          <li>✔ Approval Rate: {(approved / total * 100).toFixed(1)}%</li>
          <li>⚠ Pending Claims: {pending}</li>
          <li>❌ Rejection Rate: {(rejected / total * 100).toFixed(1)}%</li>
        </ul>
      </div>

    </div>
  );
};

export default Analytics;