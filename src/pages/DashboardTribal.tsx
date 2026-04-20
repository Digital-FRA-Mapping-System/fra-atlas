import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

interface UserData {
  type: "tribal" | "government";
  name: string;
  aadhaar?: string;
  claim_id?: string;
}

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

const DashboardTribal = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const navigate = useNavigate();

  // ========================
  // LOAD USER
  // ========================
  useEffect(() => {
    const stored = localStorage.getItem("fra_user");

    if (!stored) {
      navigate("/");
      return;
    }

    const parsed = JSON.parse(stored);

    if (parsed.type !== "tribal") {
      navigate("/");
      return;
    }

    setUser(parsed);

    // FETCH CLAIMS
    fetch("http://localhost:5000/claims")
      .then(res => res.json())
      .then(data => {
        const myClaims = data.filter(
          (c: Claim) => c.claim_id === parsed.claim_id
        );
        setClaims(myClaims);
      });

  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>

        <div className="flex items-center gap-3">
          <User />
          <span>{user.aadhaar}</span>
        </div>
      </div>

      {/* CLAIMS DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {claims.length === 0 && (
          <p className="text-gray-500">No land data found</p>
        )}

        {claims.map((c) => (
          <div
            key={c.claim_id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h3 className="font-bold text-lg mb-2">
              Plot {c.claim_id}
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              Village: {c.village}
            </p>

            <p className={`font-semibold mb-3 ${
              c.status === "Approved"
                ? "text-green-600"
                : c.status === "Rejected"
                ? "text-red-600"
                : "text-yellow-600"
            }`}>
              Status: {c.status}
            </p>

            {/* LAND DATA */}
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>💧 {c.land_data?.water}%</div>
              <div>🌾 {c.land_data?.crops}%</div>
              <div>🌳 {c.land_data?.trees}%</div>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default DashboardTribal;