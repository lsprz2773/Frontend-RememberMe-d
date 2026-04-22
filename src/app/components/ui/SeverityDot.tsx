import React from "react";

const colorClass = (v: number) =>
    v >= 8 ? "bg-red-400 text-red-400" : v >= 5 ? "bg-amber-400 text-amber-400" : "bg-blue-500 text-blue-500";

const SeverityDot = ({ value }) => {
    const cls = colorClass(value);
    const [bg, text] = cls.split(" ");
    return (
        <div className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${bg}`} />
            <span className={`text-xs font-bold ${text}`}>{value}/10</span>
        </div>
    );
};

export default SeverityDot;