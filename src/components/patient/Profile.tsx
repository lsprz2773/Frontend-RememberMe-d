"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { C } from "@/lib/colors";

interface ProfileField {
    label: string;
    value: string;
}

const personalFields: ProfileField[] = [
    { label: "Correo electrónico",  value: "juan.perez@email.com"         },
    { label: "Teléfono",            value: "+52 961 123 4567"             },
    { label: "Fecha de nacimiento", value: "20 de abril, 1995 (31 años)" },
    { label: "Registro",            value: "5 de febrero, 2026"          },
];

const PatientProfile: React.FC = () => (
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
                        <Avatar name="Juan Pérez López" size={64} color={C.primary} />
                        <div>
                            <div className="text-lg font-extrabold" style={{ color: C.text }}>
                                Juan Pérez López
                            </div>
                            <div className="text-sm mb-1.5" style={{ color: C.textMuted }}>
                                31 años · Paciente
                            </div>
                            <Badge label="Paciente" variant="patient" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {personalFields.map((f) => (
                            <div
                                key={f.label}
                                className="px-3 py-2.5 rounded-lg"
                                style={{ background: C.borderLight }}
                            >
                                <div
                                    className="text-[11px] font-semibold uppercase tracking-[0.04em] mb-0.5"
                                    style={{ color: C.textMuted }}
                                >
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

            <div className="flex flex-col gap-4">
                <Card>
                    <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                        Perfil clínico
                    </div>

                    <div
                        className="px-3.5 py-3 rounded-lg mb-2.5"
                        style={{ background: C.coralLight, borderLeft: `3px solid ${C.coral}` }}
                    >
                        <div
                            className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1"
                            style={{ color: "oklch(0.45 0.15 25)" }}
                        >
                            Alergias
                        </div>
                        <div className="text-sm" style={{ color: C.text }}>Penicilina, Aspirina</div>
                    </div>

                    <div
                        className="px-3.5 py-3 rounded-lg mb-2.5"
                        style={{ background: C.amberLight, borderLeft: `3px solid ${C.amber}` }}
                    >
                        <div
                            className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1"
                            style={{ color: "oklch(0.45 0.12 75)" }}
                        >
                            Condiciones crónicas
                        </div>
                        <div className="text-sm" style={{ color: C.text }}>
                            Diabetes tipo 2, Hipertensión
                        </div>
                    </div>

                    <div
                        className="px-3.5 py-3 rounded-lg"
                        style={{ background: C.primaryLight, borderLeft: `3px solid ${C.primary}` }}
                    >
                        <div
                            className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1"
                            style={{ color: C.primaryDark }}
                        >
                            Contacto de emergencia
                        </div>
                        <div className="text-sm" style={{ color: C.text }}>
                            María López · +52 961 765 4321
                        </div>
                    </div>
                </Card>

                <Card style={{ background: C.primaryLight, border: `1px solid ${C.primaryMid}` }}>
                    <div className="text-[13px] font-bold mb-3" style={{ color: C.primaryDark }}>
                        Estadísticas de adherencia
                    </div>
                    {[
                        { label: "Este mes",      value: "87%"       },
                        { label: "Semana actual", value: "92%"       },
                        { label: "Racha actual",  value: "5 días 🔥" },
                        { label: "Mejor racha",   value: "12 días"   },
                    ].map((x) => (
                        <div key={x.label} className="flex justify-between text-[13px] mb-2">
                            <span style={{ color: C.textMuted }}>{x.label}</span>
                            <span className="font-bold" style={{ color: C.text }}>{x.value}</span>
                        </div>
                    ))}
                </Card>
            </div>
        </div>
    </div>
);

export default PatientProfile;