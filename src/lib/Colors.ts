export const C = {
    primary:      "oklch(0.58 0.16 162)",
    primaryHover: "oklch(0.52 0.16 162)",
    primaryLight: "oklch(0.96 0.04 162)",
    primaryMid:   "oklch(0.88 0.09 162)",
    primaryDark:  "oklch(0.36 0.14 162)",
    amber:        "oklch(0.76 0.14 75)",
    amberLight:   "oklch(0.96 0.06 75)",
    amberDark:    "oklch(0.45 0.12 75)",
    coral:        "oklch(0.62 0.16 25)",
    coralLight:   "oklch(0.96 0.05 25)",
    coralDark:    "oklch(0.45 0.15 25)",
    violet:       "oklch(0.58 0.14 290)",
    violetLight:  "oklch(0.96 0.04 290)",
    text:         "#111827",
    textMuted:    "#6B7280",
    textLight:    "#9CA3AF",
    border:       "#E5E7EB",
    borderLight:  "#F3F4F6",
    bg:           "#F8FAFC",
    surface:      "#FFFFFF",
} as const;

export type ColorToken = typeof C;