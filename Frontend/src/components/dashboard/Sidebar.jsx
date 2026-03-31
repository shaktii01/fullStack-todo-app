import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "@/api/authApi";
import { getUserProfile } from "@/api/authApi";


const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setUser(userProfile);
      }
      catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.log(err);
    }

    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="w-1/6 bg-black backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between">

      <div>
        <h1 className="text-[1.5vw] font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          TodoApp ✨
        </h1>


        <nav className="space-y-4 text-[1.1vw]">
          <div className="flex items-center  gap-[1vw] mb-10">
            <div className="h-12 w-12 flex justify-center items-center overflow-hidden bg-gray-700 rounded-full  ">
              {user?.profilePic ? (
                <img src={user.profilePic} alt="profile" className="h-full w-full rounded-full" />
              ) : user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="text-[0.8vw] capitalize font-semibold"> {user?.username || 'User'} <br /> {user?.email || 'user@example.com'}</div>
          </div>
          <p className="text-gray-400 hover:text-white cursor-pointer" ><Link to="/dashboard">🏠 Home</Link></p>
          <p className="text-gray-400 hover:text-white cursor-pointer"><Link to="createTask">⭐ Create Task</Link></p>
          <p className="text-gray-400 hover:text-white cursor-pointer">
            <Link to="mytask">📋 My Task</Link>

          </p>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="mt-10 py-2 rounded-[0.5vw] font-semibold text-[1vw] bg-gradient-to-r from-red-500 to-pink-500/50 hover:opacity-90 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;