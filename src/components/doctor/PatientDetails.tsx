"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import SeverityDot from "@/components/ui/SeverityDot";
import ProgressBar from "@/components/ui/ProgressBar";
import MedsTab from "@/components/doctor/MedsTab";
import { C } from "@/lib/Colors";
import type { DoctorPatient } from "@/types";
import type { ApiSymptom } from "@/types/api";

type DetailTab = "overview" | "meds" | "symptoms" | "profile";

interface PatientDetailProps {
    patient: DoctorPatient | null;
    onBack: () => void;
}

const adColor = (pct: number): string =>
    pct >= 80 ? C.primary : pct >= 60 ? C.amber : C.coral;

const tabs: Array<[DetailTab, string]> = [
    ["overview",  "Resumen"],
    ["meds",      "Medicamentos"],
    ["symptoms",  "Síntomas"],
    ["profile",   "Perfil clínico"],
];

const profileFields = (patient: DoctorPatient) => [
    { l: "Nombre completo", v: patient.full_name },
    { l: "Edad",            v: patient.age > 0 ? `${patient.age} años` : "No disponible" },
    { l: "Vinculado desde", v: patient.linked_at },
];

const PatientDetails: React.FC<PatientDetailProps> = ({ patient, onBack }) => {
    const [tab, setTab]           = useState<DetailTab>("overview");
    const [symptoms, setSymptoms] = useState<ApiSymptom[]>([]);
    const [loadingSymptoms, setLoadingSymptoms] = useState<boolean>(false);
    const [symptomError, setSymptomError]       = useState<string>("");

    useEffect(() => {
        if (!patient || (tab !== "symptoms" && tab !== "overview")) return;
        setLoadingSymptoms(true);
        setSymptomError("");
        const load = async (): Promise<void> => {
            try {
                const res  = await fetch(`/api/links/patients/${patient.id}/symptoms`);
                const data = await res.json() as ApiSymptom[] | { error?: string };
                if (!res.ok) throw new Error((data as { error?: string }).error ?? "Sin acceso a síntomas");
                setSymptoms(data as ApiSymptom[]);
            } catch (e) {
                setSymptomError(e instanceof Error ? e.message : "Error al cargar síntomas");
            } finally {
                setLoadingSymptoms(false);
            }
        };
        void load();
    }, [patient, tab]);

    if (!patient) return null;

    const color = adColor(patient.adherence_pct);

    const renderOverviewSymptoms = () => {
        if (loadingSymptoms) return <div className="text-xs py-4 text-center" style={{ color: C.textMuted }}>Cargando…</div>;
        if (symptoms.length === 0) return <div className="text-xs py-4 text-center" style={{ color: C.textMuted }}>Sin síntomas disponibles</div>;
        return symptoms.slice(0, 4).map((s) => {
            const isHigh = s.severity >= 8;
            return (
                <div
                    key={s.id}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-lg gap-3"
                    style={{ background: isHigh ? C.coralLight : C.borderLight }}
                >
                    <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-semibold truncate" style={{ color: C.text }}>
                            {s.symptom_name}
                        </div>
                        <div className="text-[11px]" style={{ color: C.textMuted }}>{s.entry_date}</div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                        {isHigh && <Badge label="⚠" variant="alert" />}
                        <SeverityDot value={s.severity} />
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            <button
                onClick={onBack}
                className="flex items-center gap-1.5 bg-transparent border-none text-sm font-semibold cursor-pointer mb-5 p-0 hover:opacity-70 transition-opacity"
                style={{ color: C.textMuted }}
            >
                ← Volver al panel
            </button>

            <Card className="mb-5">
                <div className="flex items-center gap-4">
                    <Avatar
                        name={patient.full_name}
                        size={60}
                        color={patient.alert ? C.coral : C.primary}
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                            <h2 className="text-xl font-extrabold m-0 truncate" style={{ color: C.text }}>
                                {patient.full_name}
                            </h2>
                            {patient.alert && (
                                <span className="shrink-0">
                                    <Badge label="Requiere atención" variant="alert" dot />
                                </span>
                            )}
                            <span className="shrink-0">
                                <Badge label="Paciente" variant="patient" />
                            </span>
                        </div>
                        <div className="text-sm truncate" style={{ color: C.textMuted }}>
                            {patient.conditions}
                        </div>
                        <div className="text-[13px]" style={{ color: C.textMuted }}>
                            Vinculado desde {patient.linked_at}{patient.age > 0 ? ` · ${patient.age} años` : ""}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3.5 text-center shrink-0">
                        <div className="px-5 py-3 rounded-[10px]" style={{ background: color + "1a" }}>
                            <div className="text-2xl font-extrabold" style={{ color }}>{patient.adherence_pct}%</div>
                            <div className="text-[11px] font-semibold tracking-wide" style={{ color: C.textMuted }}>ADHERENCIA</div>
                        </div>
                        <div className="px-5 py-3 rounded-[10px]" style={{ background: C.primaryLight }}>
                            <div className="text-2xl font-extrabold" style={{ color: C.primary }}>{patient.streak}</div>
                            <div className="text-[11px] font-semibold tracking-wide" style={{ color: C.textMuted }}>RACHA</div>
                        </div>
                        <div className="px-5 py-3 rounded-[10px]" style={{ background: C.borderLight }}>
                            <div className="text-2xl font-extrabold" style={{ color: C.text }}>{patient.meds}</div>
                            <div className="text-[11px] font-semibold tracking-wide" style={{ color: C.textMuted }}>MEDICAMENTOS</div>
                        </div>
                    </div>
                </div>
            </Card>

            <div
                className="flex gap-1 mb-5 p-1 rounded-[10px] w-fit"
                style={{ background: C.borderLight }}
            >
                {tabs.map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setTab(key)}
                        className="px-[18px] py-2 rounded-lg text-[13px] font-semibold border-none cursor-pointer transition-all duration-150"
                        style={{
                            background: tab === key ? C.surface    : "transparent",
                            color:      tab === key ? C.text       : C.textMuted,
                            boxShadow:  tab === key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {tab === "overview" && (
                <div className="grid grid-cols-2 gap-5">
                    <Card>
                        <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                            Adherencia general
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center text-sm">
                                <span style={{ color: C.textMuted }}>Porcentaje de adherencia</span>
                                <span className="font-extrabold text-lg" style={{ color }}>{patient.adherence_pct}%</span>
                            </div>
                            <ProgressBar value={patient.adherence_pct} max={100} color={color} height={10} />
                            <div className="flex justify-between text-xs" style={{ color: C.textMuted }}>
                                <span>Racha actual: <strong style={{ color: C.primary }}>{patient.streak} días</strong></span>
                                <span>Último síntoma: {patient.last_symptom}</span>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                            Síntomas recientes
                        </div>
                        <div className="flex flex-col gap-2">
                            {renderOverviewSymptoms()}
                        </div>
                    </Card>
                </div>
            )}

            {tab === "meds" && <MedsTab patient={patient} />}

            {tab === "symptoms" && (
                <div>
                    {loadingSymptoms && (
                        <div className="text-sm py-10 text-center" style={{ color: C.textMuted }}>Cargando síntomas…</div>
                    )}
                    {!loadingSymptoms && symptomError && (
                        <div className="text-sm py-10 text-center" style={{ color: C.coral }}>
                            {symptomError}
                        </div>
                    )}
                    {!loadingSymptoms && !symptomError && symptoms.length === 0 && (
                        <div className="text-sm py-10 text-center" style={{ color: C.textMuted }}>
                            No hay síntomas registrados para este paciente.
                        </div>
                    )}
                    {!loadingSymptoms && symptoms.length > 0 && (
                        <div className="flex flex-col gap-2.5">
                            {symptoms.map((s) => {
                                const isHigh = s.severity >= 8;
                                return (
                                    <Card
                                        key={s.id}
                                        pad={16}
                                        style={{ borderLeft: isHigh ? `4px solid ${C.coral}` : "4px solid transparent" }}
                                    >
                                        <div className="flex items-center gap-3.5">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <span className="text-[15px] font-bold truncate" style={{ color: C.text }}>
                                                        {s.symptom_name}
                                                    </span>
                                                    {isHigh && (
                                                        <span className="shrink-0">
                                                            <Badge label="Alta severidad" variant="alert" dot />
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-[13px]" style={{ color: C.textMuted }}>
                                                    {s.notes ?? ""}
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <SeverityDot value={s.severity} />
                                                <div className="text-xs mt-1" style={{ color: C.textMuted }}>{s.entry_date}</div>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {tab === "profile" && (
                <div className="grid grid-cols-2 gap-5">
                    <Card>
                        <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                            Información personal
                        </div>
                        {profileFields(patient).map((f) => (
                            <div key={f.l} className="px-3.5 py-3 rounded-lg mb-2 bg-gray-100">
                                <div
                                    className="text-[11px] font-semibold uppercase tracking-[0.04em] mb-1"
                                    style={{ color: C.textMuted }}
                                >
                                    {f.l}
                                </div>
                                <div className="text-sm font-semibold" style={{ color: C.text }}>{f.v}</div>
                            </div>
                        ))}
                    </Card>

                    <Card>
                        <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                            Perfil clínico
                        </div>
                        <div
                            className="px-3.5 py-3 rounded-lg mb-2.5"
                            style={{ background: C.amberLight, borderLeft: `3px solid ${C.amber}` }}
                        >
                            <div
                                className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1"
                                style={{ color: C.amberDark }}
                            >
                                Condiciones crónicas
                            </div>
                            <div className="text-sm" style={{ color: C.text }}>
                                {patient.conditions}
                            </div>
                        </div>
                        <div
                            className="px-3.5 py-3 rounded-lg"
                            style={{ background: C.borderLight }}
                        >
                            <div
                                className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1"
                                style={{ color: C.textMuted }}
                            >
                                Alergias y contacto de emergencia
                            </div>
                            <div className="text-sm" style={{ color: C.textMuted }}>
                                No disponible — el paciente debe completar su perfil médico.
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default PatientDetails;
