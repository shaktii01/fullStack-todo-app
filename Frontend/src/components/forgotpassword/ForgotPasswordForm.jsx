import React, { useState } from "react";
import { resetPassword } from "@/api/authApi";
import { Link } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ loading: true, error: "", success: "" });

    try {
      await resetPassword(email);

      setStatus({
        loading: false,
        error: "",
        success: "Reset link sent to your email 📩",
      });

      setEmail("");
    } catch (err) {
      setStatus({
        loading: false,
        error: err?.response?.data?.message || "User not found",
        success: "",
      });
    }
  };

  return (
    <div className="w-full lg:w-1/2 h-full bg-black flex items-center justify-center px-4 overflow-hidden relative">
      <div className="absolute top-8 left-8 h-28 w-28 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-8 right-8 h-28 w-28 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 mb-1">
            Password Recovery
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-2xl"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 focus-within:border-white/20 transition">
              <Mail size={16} className="text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none text-sm"
              />
            </div>
          </div>

          {status.error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2">
              <p className="text-sm text-red-400">{status.error}</p>
            </div>
          )}

          {status.success && (
            <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-2">
              <p className="text-sm text-green-400">{status.success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white py-2.5 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-60"
          >
            {status.loading ? "Sending..." : "Send Reset Link"}
            {!status.loading && <ArrowRight size={16} />}
          </button>
        </form>

        <p className="mt-3 text-sm text-gray-400">
          Remember your password?{" "}
          <Link to="/login" className="text-white hover:text-gray-300 transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;