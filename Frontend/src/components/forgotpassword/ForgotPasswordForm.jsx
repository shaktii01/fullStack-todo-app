import React, { useState } from "react";
import { resetPassword } from "@/api/authApi";
import { Link } from "react-router-dom";

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
    <div className="w-1/2 relative bg-gradient-to-br from-gray-900 via-gray-950 to-black p-10 flex flex-col justify-center overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 bg-blue-500/10 blur-3xl"></div>

      <div className="relative z-10 max-w-md">

        <h2 className="text-3xl font-bold text-white mb-2">
          Forgot Password 🔐
        </h2>

        <p className="text-gray-400 mb-6 text-sm">
          Enter your email and we’ll send you a reset link
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl"
        >

          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full mt-1 p-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {status.error && (
            <p className="text-red-500 text-sm">{status.error}</p>
          )}

          {status.success && (
            <p className="text-green-500 text-sm">{status.success}</p>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition"
          >
            {status.loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <p className="text-gray-400 text-sm mt-6">
          Remember your password?{" "}
          <Link to={"/login"} className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default ForgotPasswordForm;