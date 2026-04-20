import { MapPin, Search, FileCheck, BarChart } from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: <MapPin />,
      title: "Select Land",
      desc: "Officer opens GIS Atlas and selects a land plot."
    },
    {
      icon: <Search />,
      title: "Analyze Data",
      desc: "System analyzes land cover like water, crops, and trees."
    },
    {
      icon: <FileCheck />,
      title: "Review Claim",
      desc: "Officer checks claim details and verifies eligibility."
    },
    {
      icon: <BarChart />,
      title: "Decision",
      desc: "Approve or reject claim based on insights."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 space-y-10">

      {/* ================= HERO ================= */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-2">⚙️ Process Flow</h1>
        <p className="text-sm opacity-90">
          Understand how FRA DigiMap helps in land claim verification step-by-step.
        </p>
      </div>

      {/* ================= TIMELINE ================= */}
      <div className="relative max-w-3xl mx-auto">

        {/* LINE */}
        <div className="absolute left-4 top-0 h-full w-1 bg-green-200"></div>

        <div className="space-y-10">

          {steps.map((step, i) => (
            <div key={i} className="relative flex items-start gap-6">

              {/* STEP ICON */}
              <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white shadow">
                {i + 1}
              </div>

              {/* CONTENT */}
              <div className="bg-white p-5 rounded-xl shadow w-full hover:shadow-md transition">

                <div className="flex items-center gap-2 mb-2 text-green-600">
                  {step.icon}
                  <h3 className="font-semibold">
                    Step {i + 1}: {step.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-600">
                  {step.desc}
                </p>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="bg-white p-6 rounded-xl shadow text-center max-w-2xl mx-auto">
        <h3 className="font-semibold mb-2">✨ Outcome</h3>
        <p className="text-sm text-gray-600">
          This streamlined process ensures faster, accurate, and transparent
          decision-making for forest land claims.
        </p>
      </div>

    </div>
  );
};

export default Process;