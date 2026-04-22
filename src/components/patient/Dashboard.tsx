"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import SeverityDot from "@/components/ui/SeverityDot";
import { C } from "@/lib/colors";
import { IcPill } from "@/components/ui/Icons";

interface Medication {
    id: number;
    name: string;
    dosage: string;
    frequency_hours: number;
    start_date: string;
    end_date: string | null;
    instructions: string;
    is_active: boolean;
    taken: number;
    total: number;
    source: "doctor" | "patient";
    prescriber: string | null;
}

interface IntakeLog {
    id: number;
    medication: string;
    dosage: string;
    scheduled_time: string;
    status: "taken" | "pending" | "late" | "skipped";
    taken_at: string | null;
}

interface SymptomEntry {
    id: number;
    symptom_name: string;
    severity: number;
    notes: string;
    entry_date: string;
    high_severity_alert: boolean;
}

const patientDashboardMeds: Medication[] = [
    { id: 1, name: "Metformina",  dosage: "850mg",   frequency_hours: 12, start_date: "2026-03-01", end_date: null,         instructions: "Tomar con alimentos",     is_active: true, taken: 18, total: 22, source: "doctor",  prescriber: "Dra. Ana López" },
    { id: 2, name: "Lisinopril",  dosage: "10mg",    frequency_hours: 24, start_date: "2026-03-15", end_date: "2026-06-15", instructions: "Por la mañana en ayunas", is_active: true, taken: 14, total: 16, source: "doctor",  prescriber: "Dra. Ana López" },
    { id: 3, name: "Paracetamol", dosage: "500mg",   frequency_hours: 8,  start_date: "2026-04-18", end_date: "2026-04-25", instructions: "En caso de dolor",        is_active: true, taken: 5,  total: 6,  source: "patient", prescriber: null },
    { id: 5, name: "Vitamina D3", dosage: "1000 UI", frequency_hours: 24, start_date: "2026-04-01", end_date: null,         instructions: "Con el desayuno",         is_active: true, taken: 22, total: 22, source: "patient", prescriber: null },
];

const todayIntakes: IntakeLog[] = [
    { id: 1, medication: "Metformina",  dosage: "850mg", scheduled_time: "08:00", status: "taken",   taken_at: "08:14" },
    { id: 2, medication: "Lisinopril",  dosage: "10mg",  scheduled_time: "08:00", status: "taken",   taken_at: "08:14" },
    { id: 3, medication: "Paracetamol", dosage: "500mg", scheduled_time: "08:00", status: "taken",   taken_at: "08:30" },
    { id: 4, medication: "Metformina",  dosage: "850mg", scheduled_time: "14:00", status: "pending", taken_at: null    },
    { id: 5, medication: "Paracetamol", dosage: "500mg", scheduled_time: "16:00", status: "pending", taken_at: null    },
    { id: 6, medication: "Paracetamol", dosage: "500mg", scheduled_time: "00:00", status: "pending", taken_at: null    },
];

const recentSymptoms: SymptomEntry[] = [
    { id: 1, symptom_name: "Dolor abdominal", severity: 6, notes: "Leve, después de comer",           entry_date: "2026-04-22", high_severity_alert: false },
    { id: 3, symptom_name: "Mareo",           severity: 9, notes: "Episodio de 10 min al levantarse", entry_date: "2026-04-20", high_severity_alert: true  },
    { id: 4, symptom_name: "Cefalea",         severity: 5, notes: "Tensional leve",                   entry_date: "2026-04-19", high_severity_alert: false },
];

const statusStyles: Record<IntakeLog["status"], { bg: string; color: string; label: string }> = {
    taken:   { bg: C.primaryLight, color: C.primary,   label: "Tomado"    },
    pending: { bg: C.amberLight,   color: C.amber,     label: "Pendiente" },
    late:    { bg: C.coralLight,   color: C.coral,     label: "Tarde"     },
    skipped: { bg: C.borderLight,  color: C.textMuted, label: "Omitido"   },
};

const PatientDashboard: React.FC = () => {
    const taken   = todayIntakes.filter((t) => t.status === "taken").length;
    const pending = todayIntakes.filter((t) => t.status === "pending").length;

    return (
        <div>
            <div className="mb-7">
                <div className="text-[13px] font-semibold mb-0.5" style={{ color: C.textMuted }}>
                    Martes 22 de abril, 2026
                </div>
                <h1 className="text-[26px] font-extrabold m-0" style={{ color: C.text }}>
                    Buenos días, Juan 👋
                </h1>
                <p className="text-sm mt-1 mb-0" style={{ color: C.textMuted }}>
                    Llevas <strong style={{ color: C.text }}>5 días</strong> con adherencia perfecta. ¡Sigue así!
                </p>
            </div>

            <div className="grid grid-cols-3 gap-3.5 mb-7">
                <div className="px-5 py-4 rounded-[12px]" style={{ background: C.primaryLight }}>
                    <div className="text-[28px] font-extrabold" style={{ color: C.primary }}>87%</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.textMuted }}>Adherencia mensual</div>
                </div>
                <div className="px-5 py-4 rounded-[12px]" style={{ background: C.amberLight }}>
                    <div className="text-[28px] font-extrabold" style={{ color: C.amber }}>{pending}</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.textMuted }}>Tomas pendientes</div>
                </div>
                <div className="px-5 py-4 rounded-[12px]" style={{ background: C.borderLight }}>
                    <div className="text-[28px] font-extrabold" style={{ color: C.text }}>5🔥</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.textMuted }}>Días de racha</div>
                </div>
            </div>

            <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <Card>
                    <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                        Tomas de hoy
                        <span className="text-[13px] font-normal ml-2" style={{ color: C.textMuted }}>
              {taken}/{todayIntakes.length}
            </span>
                    </div>
                    <ProgressBar value={taken} max={todayIntakes.length} color={C.primary} height={6} />
                    <div className="flex flex-col gap-2 mt-4">
                        {todayIntakes.map((t) => {
                            const s = statusStyles[t.status];
                            return (
                                <div
                                    key={t.id}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg gap-2"
                                    style={{ background: s.bg }}
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="text-[13px] font-semibold truncate" style={{ color: C.text }}>
                                            {t.medication}
                                        </div>
                                        <div className="text-[11px]" style={{ color: C.textMuted }}>
                                            {t.dosage} · {t.scheduled_time}
                                        </div>
                                    </div>
                                    <span
                                        className="text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0"
                                        style={{ background: s.color + "22", color: s.color }}
                                    >
                    {s.label}
                  </span>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                <div className="flex flex-col gap-4">
                    <Card>
                        <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                            Medicamentos activos
                        </div>
                        <div className="flex flex-col gap-3">
                            {patientDashboardMeds.map((m) => {
                                const adh = m.total > 0 ? Math.round((m.taken / m.total) * 100) : 0;
                                const col = adh >= 80 ? C.primary : C.amber;
                                return (
                                    <div key={m.id} className="flex items-center gap-3">
                                        <div
                                            className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
                                            style={{
                                                background: m.source === "doctor" ? C.primaryLight : C.violetLight,
                                                color:      m.source === "doctor" ? C.primary      : C.violet,
                                            }}
                                        >
                                            <IcPill size={18} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <span className="text-sm font-bold truncate" style={{ color: C.text }}>{m.name}</span>
                                                <span className="text-xs" style={{ color: C.textMuted }}>{m.dosage}</span>
                                            </div>
                                            <ProgressBar value={m.taken} max={m.total} color={col} height={4} />
                                        </div>
                                        <div className="text-sm font-bold shrink-0" style={{ color: col }}>{adh}%</div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    <Card>
                        <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                            Síntomas recientes
                        </div>
                        <div className="flex flex-col gap-2">
                            {recentSymptoms.map((s) => (
                                <div
                                    key={s.id}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg gap-2"
                                    style={{ background: s.high_severity_alert ? C.coralLight : C.borderLight }}
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="text-[13px] font-semibold truncate" style={{ color: C.text }}>
                                            {s.symptom_name}
                                        </div>
                                        <div className="text-[11px]" style={{ color: C.textMuted }}>{s.entry_date}</div>
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
            </div>
        </div>
    );
};

export default PatientDashboard;