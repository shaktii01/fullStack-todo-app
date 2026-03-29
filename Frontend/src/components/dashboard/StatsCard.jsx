import React from "react";

const StatsCard = ({ title, value, color }) => {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
};

export default StatsCard;