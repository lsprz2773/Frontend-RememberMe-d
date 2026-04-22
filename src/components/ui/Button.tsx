"use client";

import React, { useState } from "react";
import type { BtnProps } from "@/types";
import { C } from "@/lib/Colors";

const Btn: React.FC<BtnProps> = ({
                                     children, variant = "primary", size = "md",
                                     onClick, icon, full, style, className, disabled,
                                 }) => {
    const [hov, setHov] = useState<boolean>(false);

    const sizes: Record<NonNullable<BtnProps["size"]>, React.CSSProperties> = {
        sm: { fontSize: 13, padding: "6px 12px"  },
        md: { fontSize: 14, padding: "9px 18px"  },
        lg: { fontSize: 15, padding: "12px 24px" },
    };

    const variants: Record<NonNullable<BtnProps["variant"]>, React.CSSProperties> = {
        primary:   { background: hov ? C.primaryHover : C.primary,                   color: "#fff"      },
        secondary: { background: hov ? C.primaryLight : "transparent", color: C.primary, border: `1.5px solid ${C.primaryMid}` },
        ghost:     { background: hov ? C.borderLight  : "transparent", color: C.text                    },
        danger:    { background: hov ? "oklch(0.55 0.18 25)" : C.coral,              color: "#fff"      },
        amber:     { background: hov ? "oklch(0.70 0.15 75)" : C.amber,              color: "#fff"      },
    };

    return (
        <button
            onClick={onClick}
            className={className}
            disabled={disabled}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "Nunito, sans-serif", fontWeight: 600,
                border: "none", cursor: disabled ? "not-allowed" : "pointer",
                transition: "all .18s ease", borderRadius: 8,
                whiteSpace: "nowrap",
                width: full ? "100%" : undefined,
                justifyContent: full ? "center" : undefined,
                opacity: disabled ? 0.55 : 1,
                ...sizes[size],
                ...variants[variant],
                ...style,
            }}
        >
            {icon && <span style={{ display: "flex" }}>{icon}</span>}
            {children}
        </button>
    );
};

export default Btn;