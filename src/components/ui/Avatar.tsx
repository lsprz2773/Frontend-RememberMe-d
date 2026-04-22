import React from "react";
import type { AvatarProps } from "@/types";
import { C } from "@/lib/colors";

const Avatar: React.FC<AvatarProps> = ({ name, size = 36, color }) => {
    const initial = (name ?? "?")
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    const bg = color ?? C.primary;

    return (
        <div
            style={{
                width: size, height: size, borderRadius: "50%",
                background: bg + "22",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: size * 0.36, fontWeight: 800, color: bg,
                flexShrink: 0,
            }}
        >
            {initial}
        </div>
    );
};

export default Avatar;