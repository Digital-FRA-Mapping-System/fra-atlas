import { useEffect, useState } from "react";

interface Claim {
  _id: string;
  claim_id: string;
  village: string;
  status: string;
  reason: string;
  suggestions: string[];
}

const MyClaims = () => {
  const [claims, setClaims] = useState<Claim[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("fra_user") || "{}");

    fetch("http://localhost:5000/claims")
      .then(res => res.json())
      .then((data: Claim[]) => {
        const myClaims = data.filter(
          c => c.claim_id === user.claim_id
        );
        setClaims(myClaims);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold">📂 My Claims</h2>

      {claims.length === 0 && (
        <p className="text-gray-500">No claims found</p>
      )}

      {claims.map((c) => (
        <div key={c._id} className="bg-white p-5 rounded-xl shadow">

          <div className="flex justify-between">
            <h3 className="font-bold">Claim {c.claim_id}</h3>

            <span className={`px-3 py-1 rounded text-sm ${
              c.status === "Approved"
                ? "bg-green-100 text-green-700"
                : c.status === "Rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {c.status}
            </span>
          </div>

          <p className="text-gray-600 text-sm mt-1">
            Village: {c.village}
          </p>

          {/* REASON */}
          {c.status === "Rejected" && (
            <p className="text-red-600 text-sm mt-2">
              ❌ Reason: {c.reason || "Not specified"}
            </p>
          )}

          {/* SUGGESTIONS */}
          {c.suggestions.length > 0 && (
            <div className="mt-3">
              <p className="font-semibold text-sm">🤖 Suggestions:</p>
              <ul className="text-sm text-gray-600">
                {c.suggestions.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      ))}

    </div>
  );
};

export default MyClaims;