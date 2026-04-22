import React from "react";
import type { ProgressBarProps } from "@/types";
import { C } from "@/lib/Colors";

const ProgressBar: React.FC<ProgressBarProps> = ({
                                                     value, max = 100, color, height = 6,
                                                 }) => {
    const pct = Math.min(100, Math.round((value / max) * 100));
    const col = color ?? C.primary;

    return (
        <div
            style={{
                width: "100%", height,
                background: C.borderLight,
                borderRadius: 999, overflow: "hidden",
            }}
        >
            <div
                style={{
                    width: `${pct}%`, height: "100%",
                    background: col,
                    borderRadius: 999,
                    transition: "width .3s ease",
                }}
            />
        </div>
    );
};

export default ProgressBar;