import React from "react";

const Card = ({ title, value, color }) => {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-[1.02] transition">

      {/* Title */}
      <h3 className="text-gray-400 text-sm mb-2">
        {title}
      </h3>

      {/* Value */}
      <p className={`text-3xl font-bold ${color}`}>
        {value}
      </p>

    </div>
  );
};

export default Card;