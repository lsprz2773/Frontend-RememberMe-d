import React from "react";

const EmptyState = ({ icon, title, desc, action }) => (
    <div>
        {icon && <div>{icon}</div>}
        <div>{title}</div>
        {desc && <div>{desc}</div>}
        {action}
    </div>
);

export default EmptyState;