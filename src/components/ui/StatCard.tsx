import React from "react";
import type { StatCardProps } from "@/types";
import { C } from "@/lib/colors";

const StatCard: React.FC<StatCardProps> = ({ label, value, sub, icon, accent }) => {
    const col = accent ?? C.primary;

    return (
        <div
            style={{
                background: C.surface,
                borderRadius: 14,
                border: `1px solid ${C.border}`,
                padding: 20,
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                position: "relative", overflow: "hidden",
            }}
        >
            <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, marginBottom: 8 }}>
                {label}
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: col, lineHeight: 1 }}>
                {value}
            </div>
            {sub && (
                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{sub}</div>
            )}
            {icon && (
                <div
                    style={{
                        position: "absolute", top: 16, right: 16,
                        color: col + "66",
                    }}
                >
                    {icon}
                </div>
            )}
        </div>
    );
};

export default StatCard;