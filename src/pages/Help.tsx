import { useState, useEffect } from "react";

const Help = () => {
  const [messages, setMessages] = useState<any[]>([
    { from: "bot", text: "Hi 👋 How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const [typing, setTyping] = useState(false);

  // ========================
  // ANSWERS
  // ========================
  const getAnswer = (text: string) => {
    text = text.toLowerCase();

    if (text.includes("water"))
      return "Low water (<10%) means irrigation support is needed.";

    if (text.includes("crop"))
      return "Low crops (<20%) means agriculture subsidy may be required.";

    if (text.includes("pending"))
      return "Pending means the claim has not been reviewed yet.";

    if (text.includes("approved"))
      return "Approved means the claim is accepted.";

    if (text.includes("rejected"))
      return "Rejected means the claim did not meet requirements.";

    if (text.includes("gis"))
      return "GIS Atlas shows land cover like water, crops, and trees.";

    if (text.includes("alert"))
      return "Alerts show issues like low water, crops, or pending claims.";

    if (text.includes("claim"))
      return "A claim is a request for land ownership verification.";

    if (text.includes("how"))
      return "Use GIS → analyze land → review claims → approve/reject.";

    return "Try asking about water, crops, claims, alerts, or GIS.";
  };

  // ========================
  // SEND MESSAGE
  // ========================
  const sendMessage = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;

    const userMsg = { from: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botMsg = { from: "bot", text: getAnswer(msg) };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 1000); // typing delay
  };

  // ========================
  // AUTO SCROLL
  // ========================
  useEffect(() => {
    const el = document.getElementById("chat-box");
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  return (
    <div className="relative p-6">

      {/* ================= GUIDE ================= */}
      <div className="space-y-6">

        <h2 className="text-2xl font-bold">📘 Help Guide</h2>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Overview</h3>
          <p className="text-sm text-gray-600">
            This system helps officers analyze land data, review claims, and monitor alerts.
          </p>
        </div>

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

      </div>

      {/* ================= FLOATING BUTTON ================= */}
      <button
        onClick={() => setOpenChat(!openChat)}
        className="fixed bottom-5 right-5 bg-green-600 text-white p-4 rounded-full shadow-lg animate-pulse"
      >
        🤖
      </button>

      {/* ================= CHAT WINDOW ================= */}
      {openChat && (
        <div className="fixed bottom-20 right-5 w-80 bg-white shadow-2xl rounded-xl flex flex-col animate-fadeIn">

          {/* HEADER */}
          <div className="bg-green-600 text-white p-3 rounded-t-xl flex justify-between items-center">
            <span>FRA Assistant</span>
            <button onClick={() => setOpenChat(false)}>✖</button>
          </div>

          {/* CHAT */}
          <div
            id="chat-box"
            className="h-64 overflow-y-auto p-3 space-y-2 text-sm"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] ${
                    m.from === "user"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* TYPING */}
            {typing && (
              <div className="text-gray-400 text-xs">Bot is typing...</div>
            )}
          </div>

          {/* SUGGESTIONS */}
          <div className="px-2 py-2 flex gap-2 flex-wrap">
            {["What is water?", "Explain alerts", "What is claim?"].map(
              (q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="text-xs bg-gray-200 px-2 py-1 rounded"
                >
                  {q}
                </button>
              )
            )}
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
              onClick={() => sendMessage()}
              className="px-3 bg-green-600 text-white"
            >
              Send
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default Help;