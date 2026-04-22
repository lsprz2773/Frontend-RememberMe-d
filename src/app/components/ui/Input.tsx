"use client";

import React, { useState } from "react";

const Input = ({ label, placeholder, type = "text", value, onChange, icon, required, defaultValue }) => {
    const [focus, setFocus] = useState(false);

    return (
        <div>
            {label && (
                <label>
                    {label}
                    {required && <span>*</span>}
                </label>
            )}
            <div>
                {icon && <span>{icon}</span>}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
            </div>
        </div>
    );
};

export default Input;