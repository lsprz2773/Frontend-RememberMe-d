import React from "react";

const ProgressBar = ({ value, max = 100, color, height = 6 }) => {
    const pct = Math.min(100, Math.round((value / max) * 100));

    return (
        <div style={{ height }}>
            <div style={{ width: `${pct}%`, height: "100%" }} />
        </div>
    );
};

export default ProgressBar;