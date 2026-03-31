import React, { useState } from "react";
import { registerUser } from "@/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import InputField from "@/ui/InputField";

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

  // Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit
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

      // Reset form
      setFormData({
        username: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setStatus({
        loading: false,
        error: err?.response?.data?.message || "Registration failed",
        success: "",
      });
    }
  };

  return (
    <div className="w-1/2 relative bg-gradient-to-br from-gray-900 via-gray-950 to-black p-10 flex flex-col justify-center overflow-hidden">

      <div className="absolute inset-0 bg-blue-500/10 blur-3xl"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white mb-2">
          Create Account ✨
        </h2>

        <p className="text-gray-400 mb-6 text-sm">
          Start managing your tasks today
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl"
        >
          <InputField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />

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
            {status.loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterForm;
