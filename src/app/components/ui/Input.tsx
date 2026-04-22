"use client";

import React, { useState } from "react";
import type { InputProps } from "@/types";
import { C } from "@/lib/colors";

const Input: React.FC<InputProps> = ({
                                         label, placeholder, type = "text",
                                         value, onChange, icon, required, defaultValue,
                                     }) => {
    const [focus, setFocus] = useState<boolean>(false);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {label && (
                <label
                    style={{
                        fontSize: 13, fontWeight: 600, color: C.text,
                        display: "block", marginBottom: 5,
                    }}
                >
                    {label}
                    {required && <span style={{ color: C.coral, marginLeft: 2 }}>*</span>}
                </label>
            )}
            <div style={{ position: "relative" }}>
                {icon && (
                    <span
                        style={{
                            position: "absolute", left: 12, top: "50%",
                            transform: "translateY(-50%)",
                            color: C.textMuted, display: "flex", pointerEvents: "none",
                        }}
                    >
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
                    style={{
                        width: "100%",
                        fontFamily: "Nunito, sans-serif",
                        fontSize: 14, fontWeight: 500,
                        padding: icon ? "10px 14px 10px 40px" : "10px 14px",
                        border: `1.5px solid ${focus ? C.primary : C.border}`,
                        borderRadius: 8, outline: "none",
                        background: C.surface, color: C.text,
                        boxSizing: "border-box",
                        boxShadow: focus ? `0 0 0 3px ${C.primaryLight}` : "none",
                        transition: "all .15s ease",
                    }}
                />
            </div>
        </div>
    );
};

export default Input;