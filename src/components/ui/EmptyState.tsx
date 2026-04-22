import React from "react";
import type { EmptyStateProps } from "@/types";
import { C } from "@/lib/colors";

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, desc, action }) => (
    <div
        style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "48px 24px", textAlign: "center", gap: 12,
        }}
    >
        {icon && (
            <div style={{ color: C.textLight, marginBottom: 4 }}>{icon}</div>
        )}
        <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{title}</div>
        {desc && (
            <div style={{ fontSize: 14, color: C.textMuted, maxWidth: 320 }}>{desc}</div>
        )}
        {action}
    </div>
);

export default EmptyState;