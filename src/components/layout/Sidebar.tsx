"use client";

import React from "react";
import Avatar from "@/components/ui/Avatar";
import { C } from "@/lib/colors";
import {
    IcHome, IcPill, IcCheck, IcActivity,
    IcLink, IcUser, IcUsers, IcLogout,
} from "@/components/ui/Icons";
import type { SidebarProps } from "@/types";

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    badge?: string;
}

const patientNav: NavItem[] = [
    { id: "dashboard",   label: "Inicio",        icon: <IcHome size={18} />                       },
    { id: "medications", label: "Medicamentos",  icon: <IcPill size={18} />                       },
    { id: "intakes",     label: "Tomas del día", icon: <IcCheck size={18} />,    badge: "3"       },
    { id: "symptoms",    label: "Mi Evolución",  icon: <IcActivity size={18} />                   },
    { id: "doctor",      label: "Mi Médico",     icon: <IcLink size={18} />                       },
    { id: "profile",     label: "Mi Perfil",     icon: <IcUser size={18} />                       },
];

const doctorNav: NavItem[] = [
    { id: "dashboard", label: "Panel médico",  icon: <IcHome size={18} />  },
    { id: "patients",  label: "Mis Pacientes", icon: <IcUsers size={18} /> },
    { id: "profile",   label: "Mi Perfil",     icon: <IcUser size={18} />  },
];

const Sidebar: React.FC<SidebarProps> = ({ role, active, onNav, onLogout }) => {
    const nav  = role === "DOCTOR" ? doctorNav : patientNav;
    const user = role === "DOCTOR"
        ? { name: "Dra. Ana López", sub: "Endocrinología", color: C.violet  }
        : { name: "Juan Pérez",     sub: "Paciente",       color: C.primary };

    const isActive = (id: string): boolean =>
        active === id || (id === "patients" && active.startsWith("patient"));

    return (
        <div
            className="flex flex-col h-screen shrink-0 fixed top-0 left-0 z-10"
            style={{ width: 240, background: C.surface, borderRight: `1px solid ${C.border}` }}
        >
            <div className="px-5 pt-6 pb-5" style={{ borderBottom: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-2.5">
                    <div
                        className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                        style={{ background: C.primaryLight, color: C.primary }}
                    >
                        <IcPill size={18} />
                    </div>
                    <div>
                        <div className="text-[15px] font-extrabold tracking-[-0.02em]" style={{ color: C.text }}>
                            RememberMe<span style={{ color: C.textLight }}>-d</span>
                        </div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.06em]" style={{ color: C.textMuted }}>
                            {role === "DOCTOR" ? "Panel Médico" : "Portal Paciente"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-3.5" style={{ borderBottom: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px]" style={{ background: C.bg }}>
                    <Avatar name={user.name} size={36} color={user.color} />
                    <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold truncate" style={{ color: C.text }}>{user.name}</div>
                        <div className="text-[11px]" style={{ color: C.textMuted }}>{user.sub}</div>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-3 overflow-y-auto">
                <div
                    className="text-[11px] font-bold uppercase tracking-[0.08em] px-2 py-1 mb-1"
                    style={{ color: C.textLight }}
                >
                    Navegación
                </div>
                {nav.map((item) => {
                    const on = isActive(item.id);
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNav(item.id)}
                            className="w-full flex items-center gap-2.5 px-3 py-[9px] rounded-[9px] mb-0.5 border-none cursor-pointer text-left transition-all duration-150"
                            style={{
                                fontFamily: "Nunito, sans-serif",
                                fontSize: 14,
                                fontWeight: on ? 700 : 500,
                                background: on ? C.primaryLight : "transparent",
                                color:      on ? C.primary      : C.textMuted,
                            }}
                            onMouseEnter={(e) => {
                                if (!on) (e.currentTarget as HTMLButtonElement).style.background = C.borderLight;
                            }}
                            onMouseLeave={(e) => {
                                if (!on) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                            }}
                        >
                            <span className="flex shrink-0">{item.icon}</span>
                            <span className="flex-1">{item.label}</span>
                            {item.badge && (
                                <span
                                    className="text-[11px] font-bold px-[7px] py-px rounded-full"
                                    style={{ background: C.amber, color: "#fff" }}
                                >
                  {item.badge}
                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="p-3" style={{ borderTop: `1px solid ${C.border}` }}>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-[9px] rounded-[9px] border-none cursor-pointer text-sm font-medium transition-all duration-150"
                    style={{ fontFamily: "Nunito, sans-serif", color: C.textMuted, background: "transparent" }}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.background = C.borderLight)
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
                    }
                >
                    <IcLogout size={18} />
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Sidebar;