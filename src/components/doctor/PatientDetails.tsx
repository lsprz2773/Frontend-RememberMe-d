"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import SeverityDot from "@/components/ui/SeverityDot";
import ProgressBar from "@/components/ui/ProgressBar";
import MedsTab from "@/components/doctor/MedsTab";
import { C } from "@/lib/colors";

type DetailTab = "overview" | "meds" | "symptoms" | "profile";

interface SymptomEntry {
    id: number;
    symptom_name: string;
    severity: number;
    notes: string;
    entry_date: string;
    high_severity_alert: boolean;
}

interface Patient {
    full_name: string;
    alert: boolean;
    conditions: string;
    linked_at: string;
    age: number;
    adherence_pct: number;
    streak: number;
    meds: number;
}

interface PatientDetailProps {
    patient: Patient | null;
    onBack: () => void;
}

const detailSymptoms: SymptomEntry[] = [
    { id: 1, symptom_name: "Dolor abdominal", severity: 6, notes: "Leve, después de comer",      entry_date: "2026-04-22", high_severity_alert: false },
    { id: 2, symptom_name: "Náusea",          severity: 4, notes: "Por la mañana",               entry_date: "2026-04-21", high_severity_alert: false },
    { id: 3, symptom_name: "Mareo",           severity: 9, notes: "Episodio de 10 min",           entry_date: "2026-04-20", high_severity_alert: true  },
    { id: 4, symptom_name: "Cefalea",         severity: 5, notes: "Tensional leve",               entry_date: "2026-04-19", high_severity_alert: false },
    { id: 5, symptom_name: "Fatiga",          severity: 7, notes: "Cansancio desde el mediodía", entry_date: "2026-04-18", high_severity_alert: false },
];

const weeklyAdherence: number[] = [88, 100, 75, 100, 88, 63, 88];
const weekDays: string[] = ["L", "M", "M", "J", "V", "S", "D"];

const adColor = (pct: number): string =>
    pct >= 80 ? C.primary : pct >= 60 ? C.amber : C.coral;

const tabs: Array<[DetailTab, string]> = [
    ["overview", "Resumen"],
    ["meds",     "Medicamentos"],
    ["symptoms", "Síntomas"],
    ["profile",  "Perfil clínico"],
];

const profileFields = (patient: Patient) => [
    { l: "Nombre completo", v: patient.full_name },
    { l: "Edad",            v: `${patient.age} años` },
    { l: "Vinculado desde", v: patient.linked_at },
];

const PatientDetails: React.FC<PatientDetailProps> = ({ patient, onBack }) => {
    const [tab, setTab] = useState<DetailTab>("overview");

    if (!patient) return null;

    const color = adColor(patient.adherence_pct);

    return (
        <div className="p-6">
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
                            <h2
                                className="text-xl font-extrabold m-0 truncate"
                                style={{ color: C.text }}
                            >
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
                            Vinculado desde {patient.linked_at} · {patient.age} años
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3.5 text-center shrink-0">
                        <div
                            className="px-5 py-3 rounded-[10px]"
                            style={{ background: color + "1a" }}
                        >
                            <div className="text-2xl font-extrabold" style={{ color }}>
                                {patient.adherence_pct}%
                            </div>
                            <div className="text-[11px] font-semibold tracking-wide" style={{ color: C.textMuted }}>
                                ADHERENCIA
                            </div>
                        </div>
                        <div className="px-5 py-3 rounded-[10px]" style={{ background: C.primaryLight }}>
                            <div className="text-2xl font-extrabold" style={{ color: C.primary }}>
                                {patient.streak}
                            </div>
                            <div className="text-[11px] font-semibold tracking-wide" style={{ color: C.textMuted }}>
                                RACHA
                            </div>
                        </div>
                        <div className="px-5 py-3 rounded-[10px]" style={{ background: C.borderLight }}>
                            <div className="text-2xl font-extrabold" style={{ color: C.text }}>
                                {patient.meds}
                            </div>
                            <div className="text-[11px] font-semibold tracking-wide" style={{ color: C.textMuted }}>
                                MEDICAMENTOS
                            </div>
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
                            Adherencia últimos 7 días
                        </div>
                        <div className="flex items-end gap-2 h-20 mb-3">
                            {weeklyAdherence.map((v, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-[3px]">
                                    <div
                                        className="w-full rounded-t-[3px]"
                                        style={{
                                            background: v >= 80 ? C.primary : C.amber,
                                            height: `${(v / 100) * 70}px`,
                                            minHeight: 4,
                                        }}
                                    />
                                    <div className="text-[10px]" style={{ color: C.textMuted }}>
                                        {weekDays[i]}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ProgressBar value={patient.adherence_pct} max={100} color={color} height={8} />
                        <div className="text-xs mt-1.5" style={{ color: C.textMuted }}>
                            Promedio:{" "}
                            <strong style={{ color }}>{patient.adherence_pct}%</strong>
                        </div>
                    </Card>

                    <Card>
                        <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                            Síntomas recientes
                        </div>
                        <div className="flex flex-col gap-2">
                            {detailSymptoms.slice(0, 4).map((s) => (
                                <div
                                    key={s.id}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg gap-2"
                                    style={{ background: s.high_severity_alert ? C.coralLight : C.borderLight }}
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="text-[13px] font-semibold truncate" style={{ color: C.text }}>
                                            {s.symptom_name}
                                        </div>
                                        <div className="text-[11px]" style={{ color: C.textMuted }}>
                                            {s.entry_date}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {s.high_severity_alert && <Badge label="⚠" variant="alert" />}
                                        <SeverityDot value={s.severity} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {tab === "meds" && <MedsTab patient={patient} />}

            {tab === "symptoms" && (
                <div className="flex flex-col gap-2.5">
                    {detailSymptoms.map((s) => (
                        <Card
                            key={s.id}
                            pad={16}
                            style={{
                                borderLeft: s.high_severity_alert
                                    ? `4px solid ${C.coral}`
                                    : "4px solid transparent",
                            }}
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[15px] font-bold truncate" style={{ color: C.text }}>
                      {s.symptom_name}
                    </span>
                                        {s.high_severity_alert && (
                                            <span className="shrink-0">
                        <Badge label="Alta severidad" variant="alert" dot />
                      </span>
                                        )}
                                    </div>
                                    <div className="text-[13px]" style={{ color: C.textMuted }}>
                                        {s.notes}
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <SeverityDot value={s.severity} />
                                    <div className="text-xs mt-1" style={{ color: C.textMuted }}>
                                        {s.entry_date}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {tab === "profile" && (
                <div className="grid grid-cols-2 gap-5">
                    <Card>
                        <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                            Información personal
                        </div>
                        {profileFields(patient).map((f) => (
                            <div
                                key={f.l}
                                className="px-3 py-2.5 rounded-lg mb-2"
                                style={{ background: C.borderLight }}
                            >
                                <div
                                    className="text-[11px] font-semibold uppercase tracking-[0.04em] mb-0.5"
                                    style={{ color: C.textMuted }}
                                >
                                    {f.l}
                                </div>
                                <div className="text-sm font-semibold" style={{ color: C.text }}>
                                    {f.v}
                                </div>
                            </div>
                        ))}
                    </Card>

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
                            <div className="text-sm" style={{ color: C.text }}>
                                Penicilina, Aspirina
                            </div>
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
                                {patient.conditions}
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
                </div>
            )}
        </div>
    );
};

export default PatientDetails;