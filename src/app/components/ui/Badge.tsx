import React from "react";

const map = {
    taken:    { bg: "bg-blue-50",   text: "text-blue-700"   },
    pending:  { bg: "bg-amber-50",  text: "text-amber-700"  },
    late:     { bg: "bg-red-50",    text: "text-red-700"    },
    skipped:  { bg: "bg-gray-100",  text: "text-gray-400"   },
    active:   { bg: "bg-blue-50",   text: "text-blue-700"   },
    inactive: { bg: "bg-gray-100",  text: "text-gray-400"   },
    alert:    { bg: "bg-red-50",    text: "text-red-700"    },
    doctor:   { bg: "bg-violet-50", text: "text-violet-600" },
    patient:  { bg: "bg-blue-50",   text: "text-blue-700"   },
    default:  { bg: "bg-gray-100",  text: "text-gray-400"   },
};

const dotColor = {
    taken:    "bg-blue-700",
    pending:  "bg-amber-700",
    late:     "bg-red-700",
    skipped:  "bg-gray-400",
    active:   "bg-blue-700",
    inactive: "bg-gray-400",
    alert:    "bg-red-700",
    doctor:   "bg-violet-600",
    patient:  "bg-blue-700",
    default:  "bg-gray-400",
};

const Badge = ({ label, variant = "default", dot }) => {
    const s = map[variant] ?? map.default;
    const d = dotColor[variant] ?? dotColor.default;
    return (
        <span
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${s.bg} ${s.text}`}
        >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${d}`} />}
            {label}
    </span>
    );
};

export default Badge;