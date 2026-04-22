import React from "react";

const EmptyState = ({ icon, title, desc, action }) => (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center gap-3">
        {icon && <div className="text-gray-300 mb-1">{icon}</div>}
        <div className="text-base font-bold text-gray-800">{title}</div>
        {desc && <div className="text-sm text-gray-400 max-w-[320px]">{desc}</div>}
        {action}
    </div>
);

export default EmptyState;