import { useState } from "react";

const Help = () => {
  const [messages, setMessages] = useState<any[]>([
    { from: "bot", text: "Hi 👋 Ask me anything!" }
  ]);
  const [input, setInput] = useState("");

  // ========================
  // CHATBOT LOGIC
  // ========================
  const getAnswer = (text: string) => {
    text = text.toLowerCase();

    if (text.includes("water")) {
      return "Low water (<10%) means irrigation support is needed.";
    }

    if (text.includes("crop")) {
      return "Low crops (<20%) means agriculture subsidy may be required.";
    }

    if (text.includes("pending")) {
      return "Pending means the claim has not been reviewed yet.";
    }

    if (text.includes("approved")) {
      return "Approved means the claim is accepted.";
    }

    if (text.includes("rejected")) {
      return "Rejected means the claim did not meet requirements.";
    }

    if (text.includes("gis")) {
      return "GIS Atlas shows land cover like water, crops, and trees.";
    }

    if (text.includes("alert")) {
      return "Alerts highlight issues like low water, crops, or pending claims.";
    }

    if (text.includes("claim")) {
      return "A claim is a request for land ownership verification.";
    }

    if (text.includes("how to use")) {
      return "Open GIS → analyze land → review claims → approve/reject.";
    }

    return "Try asking about water, crops, claims, alerts, or GIS.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: getAnswer(input) };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">

      {/* ================= LEFT SIDE: GUIDE ================= */}
      <div className="space-y-6">

        <h2 className="text-2xl font-bold">📘 Help Guide</h2>

        {/* OVERVIEW */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Overview</h3>
          <p className="text-sm text-gray-600">
            This system helps officers analyze land data, review claims,
            and monitor alerts.
          </p>
        </div>

        {/* HOW TO USE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-3">How to Use</h3>
          <ol className="list-decimal pl-5 text-sm space-y-1">
            <li>Open GIS Atlas</li>
            <li>Select a plot</li>
            <li>Check land data</li>
            <li>Review claims</li>
            <li>Approve or reject</li>
          </ol>
        </div>

        {/* FEATURES */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-3">Features</h3>
          <ul className="text-sm space-y-1">
            <li>🌍 GIS → Land analysis</li>
            <li>📂 Claims → Verification</li>
            <li>🚨 Alerts → Issues</li>
            <li>📊 Analytics → Reports</li>
          </ul>
        </div>

        {/* ALERT GUIDE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-3">Alerts Guide</h3>
          <ul className="text-sm space-y-1">
            <li>🚨 High → Immediate action</li>
            <li>⚠️ Medium → Needs attention</li>
            <li>ℹ️ Low → Info</li>
          </ul>
        </div>

      </div>

      {/* ================= RIGHT SIDE: CHATBOT ================= */}
      <div className="bg-white rounded-xl shadow flex flex-col">

        <div className="bg-green-600 text-white p-3 rounded-t-xl">
          🤖 Chat Assistant
        </div>

        {/* CHAT */}
        <div className="flex-1 h-[400px] overflow-y-auto p-3 space-y-2 text-sm">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded ${
                m.from === "user"
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="flex border-t">
          <input
            className="flex-1 p-2 text-sm outline-none"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="px-3 bg-green-600 text-white"
          >
            Send
          </button>
        </div>

      </div>

    </div>
  );
};

export default Help;