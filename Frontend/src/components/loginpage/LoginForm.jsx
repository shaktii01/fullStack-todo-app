import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '@/api/authApi'

const LoginForm = () => {

  const navigate = useNavigate()

  const [loginType, setLoginType] = useState('email')

  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })

  const [status, setStatus] = useState({
    loading: false,
    error: ''
  })

  // Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    setStatus({ loading: true, error: '' })

    try {
      const payload =
        loginType === 'email'
          ? { email: formData.identifier, password: formData.password }
          : { username: formData.identifier, password: formData.password }

      await loginUser(payload)

      localStorage.setItem("isLoggedIn", "true")

      navigate("/dashboard")



    } catch (err) {
      setStatus({
        loading: false,
        error: err?.response?.data?.message || 'Login failed'
      })
    } finally {
      setStatus((prev) => ({
        ...prev,
        loading: false
      }))
    }
  }

  return (
    <div className="w-1/2 relative bg-gradient-to-br from-gray-900 via-gray-950 to-black p-10 flex flex-col justify-center overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 bg-blue-500/10 blur-3xl"></div>

      <div className="relative z-10">

        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-gray-400 mb-6 text-sm">
          Login to continue managing your tasks
        </p>

        <div className="flex bg-white/10 rounded-xl p-1 mb-5 w-fit">
          <button
            type="button"
            onClick={() => setLoginType('email')}
            className={`px-4 py-1 rounded-lg text-sm transition ${loginType === 'email'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
              : 'text-gray-400'
              }`}
          >
            Email
          </button>

          <button
            type="button"
            onClick={() => setLoginType('username')}
            className={`px-4 py-1 rounded-lg text-sm transition ${loginType === 'username'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'text-gray-400'
              }`}
          >
            Username
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl"
        >

          <div>
            <label className="text-gray-400 text-sm capitalize">
              {loginType}
            </label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder={`Enter your ${loginType}`}
              required
              className="w-full mt-1 p-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full mt-1 p-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
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
            <p className="text-red-500 text-sm">{status.error}</p>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition shadow-lg"
          >
            {status.loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Create one
          </Link>
        </p>

      </div>
    </div>
  )
}

export default LoginForm