import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser, getUserProfile } from "@/api/authApi";
import {
  LayoutDashboard,
  CheckSquare,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setUser(userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-900/30"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <aside className="h-screen w-72 bg-[#0b0b12] border-r border-white/10 backdrop-blur-xl p-5 flex flex-col justify-between shadow-2xl">
      <div>
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            TodoApp ✨
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your day beautifully
          </p>
        </div>

        {/* Profile */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-md">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white shadow-md">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : user?.username ? (
                user.username.charAt(0).toUpperCase()
              ) : (
                "U"
              )}
            </div>

            <div className="min-w-0">
              <h2 className="text-white font-semibold text-base capitalize truncate">
                {user?.username || "User"}
              </h2>
              <p className="text-sm text-gray-400 truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-3">
          <NavLink to="/dashboard" end className={navItemClass}>
            <LayoutDashboard size={18} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/dashboard/mytask" className={navItemClass}>
            <CheckSquare size={18} />
            <span>My Tasks</span>
          </NavLink>

          <NavLink to="/dashboard/settings" className={navItemClass}>
            <Settings size={18} />
            <span>Profile Settings</span>
          </NavLink>
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:scale-[1.02] hover:opacity-95 transition-all duration-300 shadow-lg shadow-red-900/20"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;