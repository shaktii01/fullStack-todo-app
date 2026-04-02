import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950/50 text-white">

      {/* 🔝 Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-zinc-800">
        <h1 className="text-2xl font-semibold tracking-wide">
          TaskFlow
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 text-sm border border-zinc-700 rounded-lg hover:bg-zinc-800 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate('/register')}
            className="px-5 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
          >
            Register
          </button>
        </div>
      </nav>

      {/* 🚀 Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-24 max-w-5xl mx-auto">

        <h2 className="text-5xl font-semibold leading-tight mb-6">
          Organize Your Work.
          <br />
          Focus on What Matters.
        </h2>

        <p className="text-lg text-zinc-400 max-w-2xl mb-10">
          TaskFlow helps you manage your daily tasks, organize them into folders,
          and stay productive with a clean and distraction-free experience.
        </p>

        <div className="flex gap-6">
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-lg font-medium transition shadow-lg"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 border border-zinc-700 rounded-lg text-lg hover:bg-zinc-800 transition"
          >
            Login
          </button>
        </div>

      </section>

      {/* ✨ Features Section */}
      <section className="px-10 pb-20 max-w-6xl mx-auto">

        <h3 className="text-3xl font-semibold mb-12 text-center">
          Why Choose TaskFlow?
        </h3>

        <div className="grid grid-cols-3 gap-8">

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h4 className="text-xl font-medium mb-3">
              Smart Organization
            </h4>
            <p className="text-zinc-400">
              Group tasks into folders and manage your workflow efficiently.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h4 className="text-xl font-medium mb-3">
              Clean Interface
            </h4>
            <p className="text-zinc-400">
              Minimal and distraction-free design focused on productivity.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h4 className="text-xl font-medium mb-3">
              Fast & Simple
            </h4>
            <p className="text-zinc-400">
              Create, manage, and complete tasks quickly with smooth experience.
            </p>
          </div>

        </div>
      </section>

      {/* 🔚 Footer */}
      <footer className="text-center text-zinc-500 py-6 border-t border-zinc-800">
        © 2026 TaskFlow. All rights reserved.
      </footer>

    </div>
  );
};

export default HomePage;