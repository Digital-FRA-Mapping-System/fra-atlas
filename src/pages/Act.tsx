import { Leaf, Home, Trees, Scale, BookOpen } from "lucide-react";

const Act = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6 space-y-10">

      {/* ================= HERO ================= */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-2">📜 Forest Rights Act, 2006</h1>
        <p className="text-sm opacity-90 max-w-2xl">
          A landmark law recognizing the rights of forest-dwelling communities 
          over land, resources, and livelihood.
        </p>
      </div>

      {/* ================= OVERVIEW ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="text-green-600" />
          <h2 className="text-lg font-semibold">Overview</h2>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          The Forest Rights Act (FRA), 2006 aims to correct historical injustices 
          faced by forest-dwelling communities by granting them legal rights 
          over land and forest resources.
        </p>
      </div>

      {/* ================= RIGHTS ================= */}
      <div>
        <h2 className="text-xl font-bold mb-4">🌿 Key Rights</h2>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <Trees className="text-green-600 mb-2" />
            <h3 className="font-semibold">Cultivation Rights</h3>
            <p className="text-sm text-gray-600">
              Right to cultivate forest land for livelihood.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <Home className="text-green-600 mb-2" />
            <h3 className="font-semibold">Habitation</h3>
            <p className="text-sm text-gray-600">
              Right to live and settle in forest areas.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <Leaf className="text-green-600 mb-2" />
            <h3 className="font-semibold">Forest Resources</h3>
            <p className="text-sm text-gray-600">
              Access to minor forest produce and resources.
            </p>
          </div>

        </div>
      </div>

      {/* ================= IMPORTANCE ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-2 mb-2">
          <Scale className="text-green-600" />
          <h2 className="text-lg font-semibold">Why It Matters</h2>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          The FRA plays a crucial role in ensuring justice, empowering tribal 
          communities, and promoting sustainable forest management. It balances 
          conservation with human rights.
        </p>
      </div>

      {/* ================= HIGHLIGHT ================= */}
      <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-xl">
        <p className="text-sm text-gray-700">
          💡 <b>Did you know?</b> FRA is one of the most important laws in India 
          for protecting tribal rights and biodiversity together.
        </p>
      </div>

    </div>
  );
};

export default Act;