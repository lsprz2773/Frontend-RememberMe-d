import React from "react";

const StatCard = ({ label, value, sub, icon, accent = "#60a5fa" }) => (
    <div className="bg-white rounded-[14px] border border-gray-100 p-5 shadow-sm relative overflow-hidden">
        <div className="text-[13px] font-semibold text-gray-400 mb-2">{label}</div>
        <div className="text-[28px] font-extrabold leading-none" style={{ color: accent }}>
            {value}
        </div>
        {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
        {icon && (
            <div className="absolute top-4 right-4" style={{ color: accent + "66" }}>
                {icon}
            </div>
        )}
    </div>
);

export default StatCard;