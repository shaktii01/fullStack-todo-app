import React from 'react'

const LeftPanel = () => {
    return (
        <div className="w-1/2 relative bg-gradient-to-br from-slate-100 via-white to-slate-200 p-10 flex flex-col justify-center overflow-hidden">

            <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/30 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/30 blur-3xl rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-pink-400/20 blur-3xl rounded-full"></div>

            <div className="relative z-10">

                <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold bg-white/70 backdrop-blur-md rounded-full shadow text-gray-700">
                    🚀 Smart To-Do App
                </span>

                <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
                    Plan Your Day <br />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        Stay in Control
                    </span>
                </h1>

                <p className="text-gray-600 mb-8 max-w-md">
                    Organize tasks, boost productivity, and never miss what matters.
                    Your all-in-one smart task manager.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                    <span className="px-4 py-2 bg-white/70 backdrop-blur-md shadow-md rounded-full text-sm text-gray-700 hover:scale-105 transition">
                        ✅ Task Manager
                    </span>
                    <span className="px-4 py-2 bg-white/70 backdrop-blur-md shadow-md rounded-full text-sm text-gray-700 hover:scale-105 transition">
                        📅 Daily Planner
                    </span>
                    <span className="px-4 py-2 bg-white/70 backdrop-blur-md shadow-md rounded-full text-sm text-gray-700 hover:scale-105 transition">
                        ⚡ Fast & Simple
                    </span>
                    <span className="px-4 py-2 bg-white/70 backdrop-blur-md shadow-md rounded-full text-sm text-gray-700 hover:scale-105 transition">
                        🎯 Focus Mode
                    </span>
                </div>
            </div>
        </div>
    )
}

export default LeftPanel