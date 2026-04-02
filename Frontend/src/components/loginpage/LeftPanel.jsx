import React from "react";

const LeftPanel = () => {
  return (
    <div className="hidden lg:flex w-1/2 h-full bg-black/20 relative overflow-hidden items-center px-10">
      <div className="absolute top-8 left-8 h-28 w-28 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-8 right-8 h-28 w-28 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 h-24 w-24 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 max-w-lg">
        <span className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
          Smart To-Do App
        </span>

        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
          Plan your day
          <br />
          <span className="text-gray-400">stay in control</span>
        </h1>

        <p className="mt-5 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
          Organize tasks, manage priorities, and keep your workflow simple with
          a clean and focused task management experience.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
            Task Manager
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
            Daily Planner
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
            Fast & Simple
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
            Focus Mode
          </span>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-2xl font-semibold text-white">10k+</p>
            <p className="mt-1 text-sm text-gray-400">Tasks managed smoothly</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-2xl font-semibold text-white">99%</p>
            <p className="mt-1 text-sm text-gray-400">Focused daily workflow</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;