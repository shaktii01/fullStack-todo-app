import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-3xl font-bold">Dashboard 👋</h2>

      <div className="bg-white/20 px-4 py-2 rounded-lg text-sm text-gray-300">
        Welcome back, {localStorage.getItem("username") || "User"}
      </div>
    </div>
  );
};

export default Header;