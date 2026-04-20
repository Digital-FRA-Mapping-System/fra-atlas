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
      .then(d => setData(d));
  }, []);

  if (!data) return <p>Loading...</p>;

  // ========================
  // STATUS FORMAT
  // ========================
  const statusData = data.status.map((s: any) => ({
    name: s._id,
    value: s.count
  }));

  // ========================
  // LAND FORMAT
  // ========================
  const landData = [
    { name: "Water", value: data.land.avgWater || 0 },
    { name: "Crops", value: data.land.avgCrops || 0 },
    { name: "Trees", value: data.land.avgTrees || 0 }
  ];

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold">📊 Analytics Dashboard</h2>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <h4>Total Claims</h4>
          <p className="text-xl font-bold">{data.total}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6">

        {/* PIE */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h4 className="mb-4 font-semibold">Claim Status</h4>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} dataKey="value">
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
    </div>
  );
};

export default Analytics;