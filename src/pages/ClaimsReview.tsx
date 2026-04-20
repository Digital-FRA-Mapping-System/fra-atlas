import { useEffect, useState } from "react";

interface Claim {
  _id: string;
  claim_id: string;
  village: string;
  land_data: {
    water: number;
    crops: number;
    trees: number;
  };
  status: string;
  reason: string;
  suggestions: string[];
}

const statusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  Approved: {
    label: "Approved",
    bg: "#EAF3DE",
    text: "#3B6D11",
    dot: "#639922",
  },
  Rejected: {
    label: "Rejected",
    bg: "#FCEBEB",
    text: "#A32D2D",
    dot: "#E24B4A",
  },
  Pending: {
    label: "Pending",
    bg: "#FAEEDA",
    text: "#854F0B",
    dot: "#EF9F27",
  },
};

const LandBar = ({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: string;
}) => (
  <div style={{ marginBottom: 14 }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
      }}
    >
      <span style={{ fontSize: 13, color: "#5F5E5A", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 14 }}>{icon}</span>
        {label}
      </span>
      <span style={{ fontSize: 13, fontWeight: 500, color: "#2C2C2A" }}>{value}%</span>
    </div>
    <div
      style={{
        height: 6,
        borderRadius: 100,
        background: "#F1EFE8",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${value}%`,
          borderRadius: 100,
          background: color,
          transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  </div>
);

const ClaimsReview = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [selected, setSelected] = useState<Claim | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/claims");
      const data = await res.json();
      setClaims(data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`http://localhost:5000/claims/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reason }),
      });
      setSelected(null);
      setReason("");
      fetchClaims();
    } catch (err) {
      console.error(err);
    }
  };

  const statusCounts = claims.reduce(
    (acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F6F2",
        fontFamily:
          "'DM Sans', 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#2C2C2A",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #E8E6DF",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#1D9E75",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h8M2 12h5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.02em" }}>
            Land Claims Portal
          </span>
        </div>

        <button
          onClick={fetchClaims}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "#5F5E5A",
            background: "transparent",
            border: "1px solid #D3D1C7",
            borderRadius: 8,
            padding: "6px 14px",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M12.5 7A5.5 5.5 0 1 1 7 1.5a5.5 5.5 0 0 1 4.243 2"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path d="M11 1v4h-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Refresh
        </button>
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>
        {/* ── Page Title ── */}
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              margin: "0 0 4px",
              color: "#2C2C2A",
            }}
          >
            Claims Review
          </h1>
          <p style={{ fontSize: 14, color: "#888780", margin: 0 }}>
            Review and process land use claims from villages
          </p>
        </div>

        {/* ── Stats Row ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {[
            { label: "Total Claims", value: claims.length, color: "#1D9E75" },
            { label: "Pending", value: statusCounts["Pending"] || 0, color: "#EF9F27" },
            { label: "Approved", value: statusCounts["Approved"] || 0, color: "#639922" },
            { label: "Rejected", value: statusCounts["Rejected"] || 0, color: "#E24B4A" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#fff",
                borderRadius: 12,
                border: "1px solid #E8E6DF",
                padding: "16px 18px",
              }}
            >
              <p style={{ fontSize: 12, color: "#888780", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>
                {stat.label}
              </p>
              <p style={{ fontSize: 28, fontWeight: 700, margin: 0, color: stat.color, letterSpacing: "-0.04em" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Main Layout ── */}
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap: 16 }}>
          {/* ── Table Card ── */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #E8E6DF",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #F1EFE8",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: 14 }}>All Claims</span>
              {loading && (
                <span style={{ fontSize: 12, color: "#888780" }}>Loading…</span>
              )}
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#FAFAF8" }}>
                  {["Claim ID", "Village", "Status", ""].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 20px",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#888780",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        textAlign: "left",
                        borderBottom: "1px solid #F1EFE8",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {claims.map((c) => {
                  const s = statusConfig[c.status] || statusConfig["Pending"];
                  const isActive = selected?._id === c._id;
                  const isHovered = hoveredRow === c._id;
                  return (
                    <tr
                      key={c._id}
                      onMouseEnter={() => setHoveredRow(c._id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{
                        background: isActive
                          ? "#F1FAF5"
                          : isHovered
                          ? "#FAFAF8"
                          : "transparent",
                        transition: "background 0.15s",
                        borderBottom: "1px solid #F1EFE8",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelected(c);
                        setReason("");
                      }}
                    >
                      <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 500, color: "#2C2C2A" }}>
                        {c.claim_id}
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "#5F5E5A" }}>
                        {c.village}
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 12,
                            fontWeight: 500,
                            padding: "3px 10px",
                            borderRadius: 100,
                            background: s.bg,
                            color: s.text,
                          }}
                        >
                          <span
                            style={{
                              width: 5,
                              height: 5,
                              borderRadius: "50%",
                              background: s.dot,
                              display: "inline-block",
                              flexShrink: 0,
                            }}
                          />
                          {s.label}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px", textAlign: "right" }}>
                        <span
                          style={{
                            fontSize: 12,
                            color: isActive ? "#1D9E75" : "#888780",
                            fontWeight: isActive ? 600 : 400,
                          }}
                        >
                          {isActive ? "Viewing" : "View →"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {claims.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} style={{ padding: "40px 20px", textAlign: "center", color: "#888780", fontSize: 14 }}>
                      No claims found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── Detail Panel ── */}
          {selected && (
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid #E8E6DF",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid #F1EFE8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 14 }}>Claim Details</span>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#888780",
                    fontSize: 20,
                    lineHeight: 1,
                    padding: "0 4px",
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ padding: "20px", flex: 1, overflowY: "auto" }}>
                {/* Claim Meta */}
                <div
                  style={{
                    background: "#F7F6F2",
                    borderRadius: 10,
                    padding: "14px 16px",
                    marginBottom: 20,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontSize: 11, color: "#888780", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>
                        Claim ID
                      </p>
                      <p style={{ fontSize: 16, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.02em" }}>
                        {selected.claim_id}
                      </p>
                    </div>
                    {(() => {
                      const s = statusConfig[selected.status] || statusConfig["Pending"];
                      return (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "4px 10px",
                            borderRadius: 100,
                            background: s.bg,
                            color: s.text,
                          }}
                        >
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
                          {s.label}
                        </span>
                      );
                    })()}
                  </div>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1a3.5 3.5 0 0 1 3.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 0 1 6 1z" stroke="#888780" strokeWidth="1" />
                      <circle cx="6" cy="4.5" r="1" fill="#888780" />
                    </svg>
                    <span style={{ fontSize: 13, color: "#5F5E5A" }}>{selected.village}</span>
                  </div>
                </div>

                {/* Land Data */}
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#888780", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 14px" }}>
                    Land Composition
                  </p>
                  <LandBar label="Water Coverage" value={selected.land_data.water} color="#378ADD" icon="💧" />
                  <LandBar label="Crop Coverage" value={selected.land_data.crops} color="#639922" icon="🌾" />
                  <LandBar label="Tree Coverage" value={selected.land_data.trees} color="#1D9E75" icon="🌳" />
                </div>

                {/* DSS Suggestions */}
                {selected.suggestions?.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#888780", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 10px" }}>
                      DSS Recommendations
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {selected.suggestions.map((s, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            gap: 10,
                            fontSize: 13,
                            color: "#444441",
                            background: "#F7F6F2",
                            borderRadius: 8,
                            padding: "10px 12px",
                            alignItems: "flex-start",
                          }}
                        >
                          <span
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              background: "#E1F5EE",
                              color: "#0F6E56",
                              fontSize: 10,
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: 1,
                            }}
                          >
                            {i + 1}
                          </span>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Decision */}
                <div style={{ borderTop: "1px solid #F1EFE8", paddingTop: 20 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#888780", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 10px" }}>
                    Decision
                  </p>

                  <input
                    type="text"
                    placeholder="Add a note or rejection reason…"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      fontSize: 13,
                      border: "1px solid #D3D1C7",
                      borderRadius: 8,
                      outline: "none",
                      fontFamily: "inherit",
                      color: "#2C2C2A",
                      background: "#fff",
                      boxSizing: "border-box",
                      marginBottom: 12,
                    }}
                  />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <button
                      onClick={() => updateStatus(selected._id, "Approved")}
                      style={{
                        padding: "10px",
                        fontSize: 13,
                        fontWeight: 600,
                        border: "none",
                        borderRadius: 8,
                        background: "#1D9E75",
                        color: "#fff",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(selected._id, "Rejected")}
                      style={{
                        padding: "10px",
                        fontSize: 13,
                        fontWeight: 600,
                        border: "1px solid #F09595",
                        borderRadius: 8,
                        background: "#FCEBEB",
                        color: "#A32D2D",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M4 4l6 6M10 4l-6 6" stroke="#A32D2D" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimsReview;