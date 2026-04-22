"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Btn from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import Input from "@/components/ui/Input";
import { C } from "@/lib/Colors";
import { IcCheck, IcLink } from "@/components/ui/Icons";

interface DoctorLink {
    doctor_id: number;
    full_name: string;
    specialty: string;
    hospital: string;
    linked_at: string;
    status: "active" | "inactive";
}

const linkedDoctor: DoctorLink = {
    doctor_id: 2,
    full_name:  "Dra. Ana López Ramírez",
    specialty:  "Endocrinología",
    hospital:   "Clínica San José",
    linked_at:  "2026-03-01",
    status:     "active",
};

const doctorAccess: string[] = [
    "Tu historial de tomas y adherencia",
    "Registro de síntomas con severidad",
    "Lista de medicamentos activos y propios",
    "Estadísticas de evolución clínica",
];

const PatientMyDoctor: React.FC = () => {
    const [linked, setLinked] = useState<boolean>(true);
    const [code, setCode]     = useState<string>("");

    const handleClaim = (): void => {
        if (code.trim().length >= 4) setLinked(true);
    };

    if (linked) {
        return (
            <div>
                <div className="mb-7">
                    <h1 className="text-[26px] font-extrabold m-0" style={{ color: C.text }}>
                        Mi Médico
                    </h1>
                    <p className="text-sm mt-1 mb-0" style={{ color: C.textMuted }}>
                        Médico vinculado activamente
                    </p>
                </div>

                <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
                    <Card>
                        <div className="flex items-center gap-4 mb-5">
                            <Avatar name={linkedDoctor.full_name} size={56} color={C.violet} />
                            <div className="min-w-0">
                                <div className="text-base font-extrabold truncate" style={{ color: C.text }}>
                                    {linkedDoctor.full_name}
                                </div>
                                <div className="text-sm font-semibold" style={{ color: C.violet }}>
                                    {linkedDoctor.specialty}
                                </div>
                                <div className="text-[13px]" style={{ color: C.textMuted }}>
                                    {linkedDoctor.hospital}
                                </div>
                            </div>
                        </div>

                        {[
                            { label: "Vinculados desde",  value: linkedDoctor.linked_at },
                            { label: "Reportes enviados", value: "12 reportes"          },
                            { label: "Acceso a mis datos",value: "Meds + síntomas"      },
                        ].map((f) => (
                            <div
                                key={f.label}
                                className="px-3 py-2.5 rounded-lg mb-2"
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

                        <div className="mt-4">
                            <Btn variant="ghost" full onClick={() => setLinked(false)}>
                                Desvincular médico
                            </Btn>
                        </div>
                    </Card>

                    <div className="flex flex-col gap-4">
                        <Card>
                            <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                                ¿Qué puede ver tu médico?
                            </div>
                            <div className="flex flex-col gap-2">
                                {doctorAccess.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
                                        style={{ background: C.primaryLight }}
                                    >
                                        <IcCheck size={14} color={C.primary} />
                                        <span className="text-[13px] font-semibold" style={{ color: C.text }}>
                      {item}
                    </span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card style={{ background: C.amberLight, border: `1px solid ${C.amber}` }}>
                            <div className="font-bold text-[14px] mb-2" style={{ color: C.text }}>
                                ¿Quieres cambiar de médico?
                            </div>
                            <p className="text-[13px] mb-3 mt-0" style={{ color: C.textMuted }}>
                                Primero deberás desvincular a tu médico actual. Luego podrás ingresar
                                un nuevo código de vinculación.
                            </p>
                            <Btn variant="ghost" size="sm" onClick={() => setLinked(false)}>
                                Solicitar cambio
                            </Btn>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-7">
                <h1 className="text-[26px] font-extrabold m-0" style={{ color: C.text }}>
                    Vincular con un médico
                </h1>
                <p className="text-sm mt-1 mb-0" style={{ color: C.textMuted }}>
                    Ingresa el código que te proporcionó tu médico
                </p>
            </div>

            <Card style={{ maxWidth: 420 }}>
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: C.violetLight, color: C.violet }}
                >
                    <IcLink size={22} />
                </div>
                <Input
                    label="Código de vinculación"
                    placeholder="Ej. AB3X7K"
                    value={code}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCode(e.target.value.toUpperCase())
                    }
                />
                <div className="mt-3">
                    <Btn full icon={<IcCheck size={16} />} onClick={handleClaim}>
                        Vincular con médico
                    </Btn>
                </div>
                <p className="text-[12px] text-center mt-3 mb-0" style={{ color: C.textMuted }}>
                    El código expira en 24 horas. Solicita uno nuevo si ya venció.
                </p>
            </Card>
        </div>
    );
};

export default PatientMyDoctor;