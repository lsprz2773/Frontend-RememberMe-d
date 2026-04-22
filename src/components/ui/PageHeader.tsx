import React from "react";
import { C } from "@/lib/Colors";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => (
    <div className="flex items-start justify-between gap-4 mb-6">
        <div>
            <h1 className="text-2xl font-extrabold m-0 leading-tight" style={{ color: C.text }}>
                {title}
            </h1>
            {subtitle && (
                <p className="text-sm mt-1 m-0" style={{ color: C.textMuted }}>
                    {subtitle}
                </p>
            )}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
    </div>
);

export default PageHeader;
