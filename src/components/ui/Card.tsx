import React from "react";
import type { CardProps } from "@/types";
import { C } from "@/lib/Colors";

const Card: React.FC<CardProps> = ({ children, style, pad = 20, className }) => (
    <div
        className={className}
        style={{
            background: C.surface,
            borderRadius: 14,
            border: `1px solid ${C.border}`,
            padding: pad,
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            ...style,
        }}
    >
        {children}
    </div>
);

export default Card;