import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordWithToken } from "@/api/authApi";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 Check passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      return setStatus({
        loading: false,
        error: "Passwords do not match",
        success: "",
      });
    }

    setStatus({ loading: true, error: "", success: "" });

    try {
      await resetPasswordWithToken(token, formData.newPassword);

      setStatus({
        loading: false,
        error: "",
        success: "Password updated successfully 🎉",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      setStatus({
        loading: false,
        error:
          err?.response?.data?.message || "Invalid or expired link",
        success: "",
      });
    }
  };

  return (
    <div className="w-1/2 relative bg-gradient-to-br from-gray-900 via-gray-950 to-black p-10 flex flex-col justify-center overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 bg-blue-500/10 blur-3xl"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-md mx-auto">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-white mb-2">
          Reset Password 🔐
        </h2>

        <p className="text-gray-400 mb-6 text-sm">
          Create a new secure password for your account
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl"
        >

          {/* New Password */}
          <div>
            <label className="text-gray-400 text-sm">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full mt-1 p-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-400 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full mt-1 p-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Error */}
          {status.error && (
            <p className="text-red-500 text-sm">{status.error}</p>
          )}

          {/* Success */}
          {status.success && (
            <p className="text-green-500 text-sm">{status.success}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition"
          >
            {status.loading ? "Updating..." : "Reset Password"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default ResetPasswordForm;