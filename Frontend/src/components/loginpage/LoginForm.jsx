import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/api/authApi";
import { Mail, User, Lock, ArrowRight } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("email");
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: "",
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
    setStatus({ loading: true, error: "" });

    try {
      const payload =
        loginType === "email"
          ? { email: formData.identifier, password: formData.password }
          : { username: formData.identifier, password: formData.password };

      await loginUser(payload);
      
      navigate("/dashboard");
    } catch (err) {
      setStatus({
        loading: false,
        error: err?.response?.data?.message || "Login failed",
      });
    } finally {
      setStatus((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  return (
    <div className="w-full lg:w-1/2 h-full bg-black flex items-center justify-center px-4 overflow-hidden relative">
      <div className="absolute top-8 left-8 h-28 w-28 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-8 right-8 h-28 w-28 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 mb-1">
            Welcome Back
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Sign in
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Login to continue managing your tasks.
          </p>
        </div>

        <div className="flex rounded-xl border border-white/10 bg-white/5 p-1 mb-4 w-fit">
          <button
            type="button"
            onClick={() => setLoginType("email")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              loginType === "email"
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Email
          </button>

          <button
            type="button"
            onClick={() => setLoginType("username")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              loginType === "username"
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Username
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-2xl"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300 capitalize">
              {loginType}
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 focus-within:border-white/20 transition">
              {loginType === "email" ? (
                <Mail size={16} className="text-gray-500" />
              ) : (
                <User size={16} className="text-gray-500" />
              )}
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder={`Enter your ${loginType}`}
                required
                className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 focus-within:border-white/20 transition">
              <Lock size={16} className="text-gray-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end text-sm">
            <Link
              to="/forgot-password"
              className="text-gray-400 hover:text-white transition"
            >
              Forgot password?
            </Link>
          </div>

          {status.error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2">
              <p className="text-sm text-red-400">{status.error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white py-2.5 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-60"
          >
            {status.loading ? "Logging in..." : "Login"}
            {!status.loading && <ArrowRight size={16} />}
          </button>
        </form>

        <p className="mt-3 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-white hover:text-gray-300 transition">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};
localStorage.setItem("isLoggedIn", "true");
export default LoginForm;