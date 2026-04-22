"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Btn from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { C } from "@/lib/Colors";
import { IcCheck, IcLink } from "@/components/ui/Icons";
import type { ApiMyDoctor, ApiDoctorPatientLink } from "@/types/api";

const doctorAccess: string[] = [
    "Tu historial de tomas y adherencia",
    "Registro de síntomas con severidad",
    "Lista de medicamentos activos",
    "Estadísticas de evolución clínica",
];

const PatientMyDoctor: React.FC = () => {
    const [doctorInfo, setDoctorInfo]   = useState<ApiMyDoctor | null>(null);
    const [code, setCode]               = useState<string>("");
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [claiming, setClaiming]       = useState<boolean>(false);
    const [unlinking, setUnlinking]     = useState<boolean>(false);
    const [error, setError]             = useState<string>("");

    useEffect(() => {
        const load = async (): Promise<void> => {
            try {
                const res = await fetch("/api/links/my-doctor");
                if (res.ok) {
                    setDoctorInfo(await res.json() as ApiMyDoctor);
                }
            } catch {
                // endpoint not available — show claim form
            } finally {
                setInitialLoading(false);
            }
        };
        void load();
    }, []);

    const handleClaim = async (): Promise<void> => {
        if (code.trim().length < 4) return;
        setClaiming(true);
        setError("");
        try {
            const res  = await fetch("/api/links/claim", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ link_code: code.trim() }),
            });
            const data = await res.json() as ApiDoctorPatientLink & { error?: string };
            if (!res.ok) throw new Error(data.error ?? "Código inválido o expirado");

            // Try to fetch full doctor info; if endpoint not available, build minimal info
            try {
                const profileRes = await fetch("/api/links/my-doctor");
                if (profileRes.ok) {
                    setDoctorInfo(await profileRes.json() as ApiMyDoctor);
                    return;
                }
            } catch { /* ignore */ }

            // Fallback: show minimal info from claim response
            setDoctorInfo({
                link_id:    data.id,
                doctor_id:  data.doctor_id,
                full_name:  "Médico vinculado",
                email:      "—",
                linked_at:  data.created_at,
                status:     "active",
            });
        } catch (e) {
            setError(e instanceof Error ? e.message : "Error al vincular");
        } finally {
            setClaiming(false);
        }
    };

    const handleUnlink = async (): Promise<void> => {
        if (!doctorInfo) return;
        setUnlinking(true);
        setError("");
        try {
            const res = await fetch(`/api/links/${doctorInfo.link_id}`, { method: "DELETE" });
            if (res.ok || res.status === 204) {
                setDoctorInfo(null);
                setCode("");
                return;
            }
            const d = await res.json() as { error?: string };
            throw new Error(d.error ?? "Error al desvincular");
        } catch (e) {
            setError(e instanceof Error ? e.message : "Error al desvincular");
        } finally {
            setUnlinking(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="text-sm py-16 text-center" style={{ color: C.textMuted }}>
                Cargando…
            </div>
        );
    }

    if (doctorInfo) {
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
                            { label: "Médico",           value: doctorInfo.full_name },
                            { label: "Email",            value: doctorInfo.email     },
                            { label: "Vinculados desde", value: new Date(doctorInfo.linked_at).toLocaleDateString("es-MX") },
                            { label: "Estado",           value: "Activo"             },
                        ].map((f) => (
                            <div key={f.label} className="px-3 py-2.5 rounded-lg mb-2 bg-gray-100">
                                <div
                                    className="text-[11px] font-semibold uppercase tracking-[0.04em] mb-1"
                                    style={{ color: C.textMuted }}
                                >
                                    {f.label}
                                </div>
                                <div className="text-sm font-semibold" style={{ color: C.text }}>{f.value}</div>
                            </div>
                        ))}
                        {error && (
                            <div
                                className="mt-2 px-3 py-2 rounded-lg text-[13px] font-semibold"
                                style={{ background: C.coralLight, color: C.coralDark }}
                            >
                                {error}
                            </div>
                        )}
                        <div className="mt-4">
                            <Btn variant="ghost" full disabled={unlinking} onClick={() => void handleUnlink()}>
                                {unlinking ? "Desvinculando…" : "Desvincular médico"}
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
                    <div
                        className="mt-2 px-3 py-2 rounded-lg text-[13px] font-semibold"
                        style={{ background: C.coralLight, color: C.coralDark }}
                    >
                        {error}
                    </div>
                )}
                <div className="mt-3">
                    <Btn
                        full
                        icon={<IcCheck size={16} />}
                        disabled={claiming || code.trim().length < 4}
                        onClick={() => void handleClaim()}
                    >
                        {claiming ? "Vinculando…" : "Vincular con médico"}
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
