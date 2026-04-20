import { useEffect, useState } from "react";

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

  // ========================
  // FETCH DATA
  // ========================
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/beneficiaries");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ========================
  // FILTER LOGIC
  // ========================
  const filtered = data.filter((b) => {
    return (
      (filter === "All" || b.status === filter) &&
      (b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.village.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold">👥 Beneficiaries</h2>
        <p className="text-gray-500 text-sm">View all claim applicants</p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4">
        <input
          placeholder="Search by name or village..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-1/3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option>All</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* TABLE */}
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
              <tr key={b._id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{b.name}</td>
                <td className="p-3">{b.village}</td>
                <td className="p-3">{b.aadhaar}</td>
                <td className="p-3">{b.claim_id}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
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
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS PANEL */}
      {selected && (
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold">👤 Beneficiary Details</h3>

          <p><b>Name:</b> {selected.name}</p>
          <p><b>Village:</b> {selected.village}</p>
          <p><b>Aadhaar:</b> {selected.aadhaar}</p>
          <p><b>Claim ID:</b> {selected.claim_id}</p>
          <p><b>Status:</b> {selected.status}</p>

          <button
            onClick={() => window.location.href = `/dashboard/claims-review`}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
          >
            🔍 View Claim
          </button>
        </div>
      )}
    </div>
  );
};

export default Beneficiaries;