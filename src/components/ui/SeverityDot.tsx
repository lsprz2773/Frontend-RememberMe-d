import React from "react";
import type { SeverityDotProps } from "@/types";
import { C } from "@/lib/Colors";

const SeverityDot: React.FC<SeverityDotProps> = ({ value }) => {
    const color =
        value >= 8 ? C.coral
            : value >= 5 ? C.amber
                : C.primary;

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div
                style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: color, flexShrink: 0,
                }}
            />
            <span style={{ fontSize: 12, fontWeight: 700, color }}>
        {value}/10
      </span>
        </div>
    );
};

export default SeverityDot;