"use client";

import React, { useState } from "react";

const Input = ({ label, placeholder, type = "text", value, onChange, icon, required, defaultValue }) => {
    const [focus, setFocus] = useState(false);

    return (
        <div className="flex flex-col">
            {label && (
                <label className="text-[13px] font-semibold text-gray-800 block mb-[5px]">
                    {label}
                    {required && <span className="text-red-400 ml-0.5">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 flex pointer-events-none">
            {icon}
          </span>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    className={`w-full text-sm font-medium rounded-lg outline-none transition-all duration-150 bg-white text-gray-800 box-border
            ${icon ? "pl-10 pr-3.5 py-2.5" : "px-3.5 py-2.5"}
            ${focus
                        ? "border-[1.5px] border-blue-400 shadow-[0_0_0_3px_#dbeafe]"
                        : "border-[1.5px] border-gray-200"
                    }`}
                />
            </div>
        </div>
    );
};

export default Input;