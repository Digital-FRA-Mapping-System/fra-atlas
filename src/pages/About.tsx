import {
    Globe,
    Target,
    Cpu,
    BarChart3,
    Bot,
    Users
  } from "lucide-react";
  
  const About = () => {
    return (
      <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
  
        {/* ================= HERO ================= */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8 rounded-2xl shadow">
          <h1 className="text-3xl font-bold mb-2">🌍 FRA DigiMap</h1>
          <p className="text-sm opacity-90 max-w-2xl">
            A smart platform for analyzing land, verifying forest claims,
            and enabling data-driven decisions using satellite intelligence.
          </p>
        </div>
  
        {/* ================= FEATURES ================= */}
        <div>
          <h2 className="text-xl font-bold mb-4">🚀 What this system does</h2>
  
          <div className="grid md:grid-cols-3 gap-4">
  
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
              <Globe className="text-green-600 mb-2" />
              <h3 className="font-semibold">GIS Analysis</h3>
              <p className="text-sm text-gray-600">
                Visualize land cover using satellite data.
              </p>
            </div>
  
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
              <Target className="text-green-600 mb-2" />
              <h3 className="font-semibold">Claim Verification</h3>
              <p className="text-sm text-gray-600">
                Review and validate forest land claims efficiently.
              </p>
            </div>
  
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
              <BarChart3 className="text-green-600 mb-2" />
              <h3 className="font-semibold">Analytics</h3>
              <p className="text-sm text-gray-600">
                Gain insights through structured reports and charts.
              </p>
            </div>
  
          </div>
        </div>
  
        {/* ================= PURPOSE ================= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">🎯 Purpose</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            FRA DigiMap simplifies the Forest Rights Act process by integrating
            satellite-based land analysis with claim verification workflows.
            It helps officers make faster, accurate, and transparent decisions.
          </p>
        </div>
  
        {/* ================= TECHNOLOGY ================= */}
        <div>
          <h2 className="text-xl font-bold mb-4">💻 Technology</h2>
  
          <div className="grid md:grid-cols-4 gap-4">
  
            {[
              "React",
              "Node.js",
              "MongoDB",
              "Google Earth Engine"
            ].map((tech, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow text-center text-sm font-medium"
              >
                {tech}
              </div>
            ))}
  
          </div>
        </div>
  
        {/* ================= EXTRA FEATURES ================= */}
        <div>
          <h2 className="text-xl font-bold mb-4">⚡ Smart Features</h2>
  
          <div className="grid md:grid-cols-3 gap-4">
  
            <div className="bg-white p-5 rounded-xl shadow">
              <Bot className="text-green-600 mb-2" />
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-sm text-gray-600">
                Chatbot for instant help and guidance.
              </p>
            </div>
  
            <div className="bg-white p-5 rounded-xl shadow">
              <Cpu className="text-green-600 mb-2" />
              <h3 className="font-semibold">Smart Alerts</h3>
              <p className="text-sm text-gray-600">
                Detect issues like low water, crops automatically.
              </p>
            </div>
  
            <div className="bg-white p-5 rounded-xl shadow">
              <Users className="text-green-600 mb-2" />
              <h3 className="font-semibold">User Roles</h3>
              <p className="text-sm text-gray-600">
                Separate dashboards for officers and tribal users.
              </p>
            </div>
  
          </div>
        </div>
  
        {/* ================= FOOTER ================= */}
        <div className="text-center text-sm text-gray-500 mt-10">
          Built by <span className="font-semibold">Harshitha Reddy</span> 🚀
        </div>
  
      </div>
    );
  };
  
  export default About;