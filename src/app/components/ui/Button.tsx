"use client";

import React from "react";

const sizeClass = {
    sm: "text-[13px] px-3 py-1.5",
    md: "text-sm px-[18px] py-[9px]",
    lg: "text-[15px] px-6 py-3",
};

const variantClass = {
    primary:   "bg-blue-500 hover:bg-blue-600 text-white border-none",
    secondary: "bg-transparent hover:bg-blue-50 text-blue-500 border-[1.5px] border-blue-200",
    ghost:     "bg-transparent hover:bg-gray-100 text-gray-800 border-none",
    danger:    "bg-red-400 hover:bg-red-500 text-white border-none",
    amber:     "bg-amber-400 hover:bg-amber-500 text-white border-none",
};

const Btn = ({ children, variant = "primary", size = "md", onClick, icon, full, style, className }) => (
    <button
        onClick={onClick}
        style={style}
        className={`
      inline-flex items-center gap-1.5 font-semibold rounded-lg cursor-pointer
      transition-all duration-[180ms] whitespace-nowrap
      ${sizeClass[size]}
      ${variantClass[variant]}
      ${full ? "w-full justify-center" : ""}
      ${className ?? ""}
    `}
    >
        {icon && <span className="flex">{icon}</span>}
        {children}
    </button>
);

export default Btn;