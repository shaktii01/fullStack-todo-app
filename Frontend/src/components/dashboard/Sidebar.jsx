import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/authApi";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.log(err);
    }

    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between">

      <div>
        <h1 className="text-2xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          TodoApp ✨
        </h1>

        <nav className="space-y-4">
          <p className="text-gray-400 hover:text-white cursor-pointer">📋 Dashboard</p>
          <p className="text-gray-400 hover:text-white cursor-pointer">⚙️ Settings</p>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="mt-10 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500/30 hover:opacity-90 transition"
      >
        Logout 😭😭
      </button>
    </div>
  );
};

export default Sidebar;