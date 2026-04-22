import React from "react";
import type { AvatarProps } from "@/types";
import { C } from "@/lib/Colors";

const lightOf: Record<string, string> = {
    [C.primary]: C.primaryLight,
    [C.coral]:   C.coralLight,
    [C.amber]:   C.amberLight,
    [C.violet]:  C.violetLight,
};

const Avatar: React.FC<AvatarProps> = ({ name, size = 36, color }) => {
    const fg = color ?? C.primary;
    const bg = lightOf[fg] ?? C.borderLight;
    const initial = (name ?? "?")
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div
            style={{
                width: size, height: size, borderRadius: "50%",
                background: bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: size * 0.36, fontWeight: 800, color: fg,
                flexShrink: 0,
            }}
        >
            {initial}
        </div>
    );
};

export default Avatar;