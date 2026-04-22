import React from "react";

interface IconBaseProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
}

interface IconProps extends IconBaseProps {
    d: string | string[];
    fill?: string;
}

const Ic: React.FC<IconProps> = ({
                                     d,
                                     size = 20,
                                     fill = "none",
                                     color = "currentColor",
                                     strokeWidth = 1.8,
                                 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {Array.isArray(d)
            ? d.map((p, i) => <path key={i} d={p} />)
            : <path d={d} />}
    </svg>
);

export const IcHome:     React.FC<IconBaseProps> = (p) => <Ic {...p} d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />;
export const IcPill:     React.FC<IconBaseProps> = (p) => <Ic {...p} d="M10.5 3.5a5 5 0 017 7l-7.5 7.5a5 5 0 01-7-7l7.5-7.5zM9 15l6-6" />;
export const IcCheck:    React.FC<IconBaseProps> = (p) => <Ic {...p} d="M20 6L9 17l-5-5" />;
export const IcChart:    React.FC<IconBaseProps> = (p) => <Ic {...p} d="M3 3v18h18M7 16l4-4 4 4 4-4" />;
export const IcUser:     React.FC<IconBaseProps> = (p) => <Ic {...p} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />;
export const IcUsers:    React.FC<IconBaseProps> = (p) => <Ic {...p} d={["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", "M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"]} />;
export const IcLink:     React.FC<IconBaseProps> = (p) => <Ic {...p} d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />;
export const IcBell:     React.FC<IconBaseProps> = (p) => <Ic {...p} d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />;
export const IcPlus:     React.FC<IconBaseProps> = (p) => <Ic {...p} d="M12 5v14M5 12h14" />;
export const IcEdit:     React.FC<IconBaseProps> = (p) => <Ic {...p} d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />;
export const IcSearch:   React.FC<IconBaseProps> = (p) => <Ic {...p} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />;
export const IcCalendar: React.FC<IconBaseProps> = (p) => <Ic {...p} d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />;
export const IcX:        React.FC<IconBaseProps> = (p) => <Ic {...p} d="M18 6L6 18M6 6l12 12" />;
export const IcLogout:   React.FC<IconBaseProps> = (p) => <Ic {...p} d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />;
export const IcActivity: React.FC<IconBaseProps> = (p) => <Ic {...p} d="M22 12h-4l-3 9L9 3l-3 9H2" />;
export const IcShield:   React.FC<IconBaseProps> = (p) => <Ic {...p} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
export const IcChevronR: React.FC<IconBaseProps> = (p) => <Ic {...p} d="M9 18l6-6-6-6" />;
export const IcChevronD: React.FC<IconBaseProps> = (p) => <Ic {...p} d="M6 9l6 6 6-6" />;
export const IcClock:    React.FC<IconBaseProps> = (p) => <Ic {...p} d="M12 2a10 10 0 100 20A10 10 0 0012 2zM12 6v6l4 2" />;
export const IcStar:     React.FC<IconBaseProps> = (p) => <Ic {...p} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;
export const IcTrash:    React.FC<IconBaseProps> = (p) => <Ic {...p} d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />;

export { Ic };