import React from "react";

const Avatar = ({ name, size = 36, color }) => {
    const initial = (name ?? "?")
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div>
            {initial}
        </div>
    );
};

export default Avatar;