import React from "react";

const Avatar = ({ name, size = 36, color = "#60a5fa" }) => {
    const initial = (name ?? "?")
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div
            className="rounded-full flex items-center justify-center shrink-0 font-extrabold"
            style={{
                width: size,
                height: size,
                background: color + "22",
                fontSize: size * 0.36,
                color,
            }}
        >
            {initial}
        </div>
    );
};

export default Avatar;