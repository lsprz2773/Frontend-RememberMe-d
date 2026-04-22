import React from "react";

const Badge = ({ label, variant = "default", dot }) => (
    <span>
    {dot && <span />}
        {label}
  </span>
);

export default Badge;