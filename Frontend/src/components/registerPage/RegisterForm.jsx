import React, { useState } from "react";
import { registerUser } from "@/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ loading: true, error: "", success: "" });

    try {
      await registerUser(formData);

      setStatus({
        loading: false,
        error: "",
        success: "Account created successfully 🎉",
      });

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setStatus({
        loading: false,
        error: err?.response?.data?.message || "Registration failed",
        success: "",
      });
    }
  };

  return (
    <div className="w-full lg:w-1/2 min-h-full bg-black flex items-center justify-center px-6 py-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"></div>

      <div className="relative z-10 w-full ax-w-mmd">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.25em] text-gray-500 mb-3">
            Join Now
          </p>
          <h2 className="text-4xl font-bold text-white leading-tight">
            Create your <span className="text-gray-300">account</span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm">
            Start managing your tasks with a clean and modern workflow.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Username
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-white/20 transition">
              <User size={18} className="text-gray-500" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-white/20 transition">
              <Mail size={18} className="text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-white/20 transition">
              <Lock size={18} className="text-gray-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
              />
            </div>
          </div>

          {status.error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">{status.error}</p>
            </div>
          )}

          {status.success && (
            <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3">
              <p className="text-sm text-green-400">{status.success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-black py-3 font-semibold transition hover:bg-gray-200 disabled:opacity-60"
          >
            {status.loading ? "Creating..." : "Register"}
            {!status.loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:text-gray-300 transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;