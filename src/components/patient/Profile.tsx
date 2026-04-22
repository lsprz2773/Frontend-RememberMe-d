"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { C } from "@/lib/Colors";
import type { ApiUser, ApiMedicalProfile } from "@/types/api";

interface Props {
    userName: string;
}

function calcAge(dob: string | null): string {
    if (!dob) return "—";
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())) age--;
    return `${age} años`;
}

const PatientProfile: React.FC<Props> = ({ userName }) => {
    const [user, setUser]       = useState<ApiUser | null>(null);
    const [profile, setProfile] = useState<ApiMedicalProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch("/api/auth/profile").then((r) => r.json()),
            fetch("/api/medical-profiles/me").then((r) => (r.ok ? r.json() : null)),
        ])
            .then(([u, p]) => {
                setUser(u as ApiUser);
                setProfile(p as ApiMedicalProfile | null);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="text-sm text-center py-16" style={{ color: C.textMuted }}>
                Cargando perfil…
            </div>
        );
    }

    const displayName = user?.full_name ?? userName;
    const role        = user?.role ?? "PATIENT";
    const roleLabel   = role === "PATIENT" ? "Paciente" : "Médico";
    const roleBadge   = role === "PATIENT" ? "patient" : "doctor";

    const personalFields = [
        { label: "Correo electrónico",  value: user?.email ?? "—" },
        { label: "Teléfono",            value: user?.phone ?? "—" },
        { label: "Fecha de nacimiento", value: user?.date_of_birth
            ? `${new Date(user.date_of_birth).toLocaleDateString("es-MX")} (${calcAge(user.date_of_birth)})`
            : "—" },
        { label: "Registro",            value: user?.created_at
            ? new Date(user.created_at).toLocaleDateString("es-MX")
            : "—" },
    ];

    return (
        <div>
            <div className="mb-7">
                <h1 className="text-[26px] font-extrabold m-0" style={{ color: C.text }}>
                    Mi Perfil
                </h1>
                <p className="text-sm mt-1 mb-0" style={{ color: C.textMuted }}>
                    Información personal y perfil clínico
                </p>
            </div>

            <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div className="flex flex-col gap-4">
                    <Card>
                        <div className="flex items-center gap-4 mb-5">
                            <Avatar name={displayName} size={64} color={C.primary} />
                            <div>
                                <div className="text-lg font-extrabold" style={{ color: C.text }}>
                                    {displayName}
                                </div>
                                <div className="text-sm mb-1.5" style={{ color: C.textMuted }}>
                                    {user?.date_of_birth ? `${calcAge(user.date_of_birth)} · ` : ""}{roleLabel}
                                </div>
                                <Badge label={roleLabel} variant={roleBadge as "patient" | "doctor"} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            {personalFields.map((f) => (
                                <div key={f.label} className="px-3 py-2.5 rounded-lg bg-gray-100">
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.04em] mb-1" style={{ color: C.textMuted }}>
                                        {f.label}
                                    </div>
                                    <div className="text-sm font-semibold" style={{ color: C.text }}>
                                        {f.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {role === "PATIENT" && (
                    <div className="flex flex-col gap-4">
                        <Card>
                            <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                                Perfil clínico
                            </div>

                            <div
                                className="px-3.5 py-3 rounded-lg mb-2.5"
                                style={{ background: C.coralLight, borderLeft: `3px solid ${C.coral}` }}
                            >
                                <div className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1" style={{ color: C.coralDark }}>
                                    Alergias
                                </div>
                                <div className="text-sm" style={{ color: C.text }}>
                                    {profile?.allergies || "Sin alergias registradas"}
                                </div>
                            </div>

                            <div
                                className="px-3.5 py-3 rounded-lg mb-2.5"
                                style={{ background: C.amberLight, borderLeft: `3px solid ${C.amber}` }}
                            >
                                <div className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1" style={{ color: C.amberDark }}>
                                    Condiciones crónicas
                                </div>
                                <div className="text-sm" style={{ color: C.text }}>
                                    {profile?.chronic_conditions || "Sin condiciones crónicas registradas"}
                                </div>
                            </div>

                            <div
                                className="px-3.5 py-3 rounded-lg"
                                style={{ background: C.primaryLight, borderLeft: `3px solid ${C.primary}` }}
                            >
                                <div className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1" style={{ color: C.primaryDark }}>
                                    Contacto de emergencia
                                </div>
                                <div className="text-sm" style={{ color: C.text }}>
                                    {profile?.emergency_contact_name
                                        ? `${profile.emergency_contact_name}${profile.emergency_contact_phone ? ` · ${profile.emergency_contact_phone}` : ""}`
                                        : "Sin contacto de emergencia registrado"}
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientProfile;
