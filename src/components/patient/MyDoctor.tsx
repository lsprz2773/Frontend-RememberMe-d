"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Btn from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { C } from "@/lib/Colors";
import { IcCheck, IcLink } from "@/components/ui/Icons";

const doctorAccess: string[] = [
    "Tu historial de tomas y adherencia",
    "Registro de síntomas con severidad",
    "Lista de medicamentos activos",
    "Estadísticas de evolución clínica",
];

const PatientMyDoctor: React.FC = () => {
    const [linked, setLinked]   = useState<boolean>(false);
    const [code, setCode]       = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError]     = useState<string>("");
    const [linkedAt, setLinkedAt] = useState<string>("");

    const handleClaim = async (): Promise<void> => {
        if (code.trim().length < 4) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/links/claim", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ link_code: code.trim() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Código inválido o expirado");
            setLinkedAt(new Date(data.created_at).toLocaleDateString("es-MX"));
            setLinked(true);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Error al vincular");
        } finally {
            setLoading(false);
        }
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
                        <div className="font-bold text-base mb-4" style={{ color: C.text }}>
                            Vínculo activo
                        </div>
                        {[
                            { label: "Código usado",       value: code.toUpperCase() },
                            { label: "Vinculados desde",   value: linkedAt            },
                            { label: "Estado",             value: "Activo"            },
                        ].map((f) => (
                            <div key={f.label} className="px-3 py-2.5 rounded-lg mb-2 bg-gray-100">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.04em] mb-1" style={{ color: C.textMuted }}>
                                    {f.label}
                                </div>
                                <div className="text-sm font-semibold" style={{ color: C.text }}>{f.value}</div>
                            </div>
                        ))}
                        <div className="mt-4">
                            <Btn variant="ghost" full onClick={() => { setLinked(false); setCode(""); }}>
                                Desvincular médico
                            </Btn>
                        </div>
                    </Card>

                    <Card>
                        <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                            ¿Qué puede ver tu médico?
                        </div>
                        <div className="flex flex-col gap-2.5">
                            {doctorAccess.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
                                    style={{ background: C.primaryLight }}
                                >
                                    <IcCheck size={14} color={C.primary} />
                                    <span className="text-[13px] font-semibold" style={{ color: C.text }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
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
                    onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(""); }}
                />
                {error && (
                    <div className="mt-2 px-3 py-2 rounded-lg text-[13px] font-semibold" style={{ background: C.coralLight, color: C.coralDark }}>
                        {error}
                    </div>
                )}
                <div className="mt-3">
                    <Btn full icon={<IcCheck size={16} />} disabled={loading || code.trim().length < 4} onClick={() => void handleClaim()}>
                        {loading ? "Vinculando…" : "Vincular con médico"}
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
