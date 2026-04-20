import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">

      {/* ================= HERO ================= */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-2">📞 Contact Us</h1>
        <p className="text-sm opacity-90">
          Have questions? We’re here to help you.
        </p>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* ================= LEFT: INFO ================= */}
        <div className="bg-white p-6 rounded-xl shadow space-y-5">

          <h2 className="text-xl font-semibold">Get in touch</h2>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Mail className="text-green-600" />
            support@fradigimap.in
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Phone className="text-green-600" />
            +91 98765 43210
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin className="text-green-600" />
            India
          </div>

          <div className="text-sm text-gray-500">
            Our team typically responds within 24 hours.
          </div>

        </div>

        {/* ================= RIGHT: FORM ================= */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">Send a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            />

            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none h-28"
              required
            />

            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
            >
              Send Message
            </button>

          </form>

          {/* SUCCESS MESSAGE */}
          {success && (
            <p className="text-green-600 text-sm mt-3">
              ✅ Message sent successfully!
            </p>
          )}

        </div>

      </div>

    </div>
  );
};

export default Contact;