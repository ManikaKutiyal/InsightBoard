import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_BASE } from "../config";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineSparkles, HiArrowRight } from "react-icons/hi";

export default function AuthPage() {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const url =
      tab === "login"
        ? `${API_BASE}/auth/login`
        : `${API_BASE}/auth/signup`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        if (tab === "login") {
          login(data.token);
          navigate("/dashboard");
        } else {
          alert("Signup successful! Please login now.");
          setTab("login");
          setForm({ ...form, password: "" }); // Keep email, clear password for login
        }
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col relative overflow-hidden font-sans selection:bg-brand-coral/30">
      {/* Navigation / Logo */}
      <nav className="absolute top-0 left-0 w-full p-8 z-20">
        <Link to="/" className="flex items-center gap-2 w-max">
          <div className="w-8 h-8 bg-brand-coral rounded-lg flex items-center justify-center">
            <HiOutlineSparkles className="text-white text-xl" />
          </div>
          <span className="text-xl font-serif font-bold tracking-tight text-brand-charcoal">InsightBoard</span>
        </Link>
      </nav>

      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-coral/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-coral-light/10 rounded-full blur-3xl"></div>

      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl w-full max-w-md overflow-hidden relative">

          {/* Header Section */}
          <div className="p-8 pb-0 text-center">
            <h2 className="text-3xl font-serif font-bold mb-2">
              {tab === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-brand-charcoal/60 text-sm">
              {tab === "login"
                ? "Enter your details to access your workspace."
                : "Start your journey to smarter productivity."}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-2 m-8 mb-4 bg-brand-bg/50 rounded-xl relative">
            <div
              className={`absolute top-2 bottom-2 w-[calc(50%-8px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-spring ${tab === "login" ? "left-2" : "left-[calc(50%+4px)]"}`}
            ></div>
            <button
              className={`flex-1 relative z-10 py-2 text-sm font-medium transition-colors duration-300 ${tab === "login" ? "text-brand-charcoal" : "text-brand-charcoal/50"}`}
              onClick={() => setTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 relative z-10 py-2 text-sm font-medium transition-colors duration-300 ${tab === "signup" ? "text-brand-charcoal" : "text-brand-charcoal/50"}`}
              onClick={() => setTab("signup")}
            >
              Signup
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${tab === "signup" ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="relative group">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full bg-white/50 border border-brand-charcoal/10 rounded-xl px-4 py-3 outline-none focus:border-brand-coral/50 focus:ring-2 focus:ring-brand-coral/10 transition-all placeholder:text-brand-charcoal/30"
                />
              </div>
            </div>

            <div className="relative group">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full bg-white/50 border border-brand-charcoal/10 rounded-xl px-4 py-3 outline-none focus:border-brand-coral/50 focus:ring-2 focus:ring-brand-coral/10 transition-all placeholder:text-brand-charcoal/30"
              />
            </div>

            <div className="relative group">
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full bg-white/50 border border-brand-charcoal/10 rounded-xl px-4 py-3 outline-none focus:border-brand-coral/50 focus:ring-2 focus:ring-brand-coral/10 transition-all placeholder:text-brand-charcoal/30"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-charcoal text-white font-medium py-3 rounded-xl hover:bg-brand-charcoal/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-brand-charcoal/10"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {tab === "login" ? "Sign In" : "Create Account"}
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="absolute bottom-8 text-brand-charcoal/40 text-xs text-center w-full">
          &copy; 2024 InsightBoard AI. All rights reserved.
        </p>
      </div>
    </div>
  );
}
