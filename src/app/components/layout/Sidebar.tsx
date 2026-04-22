"use client";

import React from "react";

const patientNav = [
    { id: "dashboard",   label: "Inicio",        badge: undefined },
    { id: "medications", label: "Medicamentos",  badge: undefined },
    { id: "intakes",     label: "Tomas del día", badge: "3"       },
    { id: "symptoms",    label: "Mi Evolución",  badge: undefined },
    { id: "doctor",      label: "Mi Médico",     badge: undefined },
    { id: "profile",     label: "Mi Perfil",     badge: undefined },
];

const doctorNav = [
    { id: "dashboard", label: "Panel médico"  },
    { id: "patients",  label: "Mis Pacientes" },
    { id: "profile",   label: "Mi Perfil"     },
];

const Sidebar = ({ role, active, onNav, onLogout }) => {
    const nav  = role === "DOCTOR" ? doctorNav : patientNav;
    const user = role === "DOCTOR"
        ? { name: "Dra. Ana López", sub: "Endocrinología" }
        : { name: "Juan Pérez",     sub: "Paciente"       };

    const isActive = (id) =>
        active === id || (id === "patients" && active.startsWith("patient"));

    return (
        <div>
            <div>
                <div>RememberMe-d</div>
                <div>{role === "DOCTOR" ? "Panel Médico" : "Portal Paciente"}</div>
            </div>

            <div>
                <div>{user.name}</div>
                <div>{user.sub}</div>
            </div>

            <nav>
                <div>Navegación</div>
                {nav.map((item) => (
                    <button key={item.id} onClick={() => onNav(item.id)}>
                        <span>{item.label}</span>
                        {item.badge && <span>{item.badge}</span>}
                    </button>
                ))}
            </nav>

            <div>
                <button onClick={onLogout}>Cerrar sesión</button>
            </div>
        </div>
    );
};

export default Sidebar;