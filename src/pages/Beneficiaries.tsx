import { useEffect, useState } from "react";
import { Search, Users } from "lucide-react";

interface Beneficiary {
  _id: string;
  name: string;
  village: string;
  aadhaar: string;
  claim_id: string;
  status: string;
}

const Beneficiaries = () => {
  const [data, setData] = useState<Beneficiary[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Beneficiary | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/beneficiaries")
      .then(res => res.json())
      .then(setData);
  }, []);

  // FILTER
  const filtered = data.filter((b) => {
    return (
      (filter === "All" || b.status === filter) &&
      (b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.village.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6 rounded-xl shadow flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users /> Beneficiaries
          </h2>
          <p className="text-sm opacity-90">
            Manage and view all claim applicants
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm">Total</p>
          <p className="text-xl font-bold">{data.length}</p>
        </div>
      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="flex gap-4 items-center">

        <div className="relative w-1/3">
          <Search className="absolute left-3 top-2.5 text-gray-400 h-4" />
          <input
            placeholder="Search by name or village..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 border p-2 rounded-md w-full focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-md focus:ring-2 focus:ring-green-500"
        >
          <option>All</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Village</th>
              <th className="p-3 text-left">Aadhaar</th>
              <th className="p-3 text-left">Claim ID</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((b) => (
              <tr
                key={b._id}
                className="border-t hover:bg-green-50 transition"
              >
                <td className="p-3 font-medium">{b.name}</td>
                <td className="p-3">{b.village}</td>
                <td className="p-3">{b.aadhaar}</td>
                <td className="p-3">{b.claim_id}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      b.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : b.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelected(b)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No beneficiaries found
          </p>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-xl shadow-lg p-6 w-[350px] space-y-3 animate-scaleIn">

            <h3 className="text-lg font-semibold">
              👤 Beneficiary Details
            </h3>

            <p><b>Name:</b> {selected.name}</p>
            <p><b>Village:</b> {selected.village}</p>
            <p><b>Aadhaar:</b> {selected.aadhaar}</p>
            <p><b>Claim ID:</b> {selected.claim_id}</p>

            <p>
              <b>Status:</b>{" "}
              <span className="text-green-600 font-medium">
                {selected.status}
              </span>
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Close
              </button>

              <button
                onClick={() =>
                  (window.location.href = `/dashboard/claims-review`)
                }
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                View Claim
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Beneficiaries;