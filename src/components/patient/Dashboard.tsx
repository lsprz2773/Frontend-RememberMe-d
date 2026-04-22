"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import SeverityDot from "@/components/ui/SeverityDot";
import { C } from "@/lib/Colors";
import { IcPill } from "@/components/ui/Icons";
import type { ApiIntakeLog, ApiMedication } from "@/types/api";
import type { IntakeStatus } from "@/types";

interface Props {
    userName: string;
}

const statusStyles: Record<IntakeStatus, { bg: string; color: string; label: string }> = {
    taken:   { bg: C.primaryLight, color: C.primary,   label: "Tomado"    },
    pending: { bg: C.amberLight,   color: C.amber,     label: "Pendiente" },
    late:    { bg: C.coralLight,   color: C.coral,     label: "Tarde"     },
    skipped: { bg: C.borderLight,  color: C.textMuted, label: "Omitido"   },
};

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MONTH_NAMES = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function formatDate(d: Date): string {
    return `${DAY_NAMES[d.getDay()].charAt(0).toUpperCase() + DAY_NAMES[d.getDay()].slice(1)} ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]}, ${d.getFullYear()}`;
}

function formatTime(timeStr: string): string {
    return timeStr.slice(0, 5);
}

const PatientDashboard: React.FC<Props> = ({ userName }) => {
    const [intakes, setIntakes]   = useState<ApiIntakeLog[]>([]);
    const [meds, setMeds]         = useState<ApiMedication[]>([]);
    const [loadingI, setLoadingI] = useState(true);
    const [loadingM, setLoadingM] = useState(true);

    useEffect(() => {
        fetch("/api/intake-logs/today")
            .then((r) => r.json())
            .then((d: { data: ApiIntakeLog[] }) => setIntakes(d.data ?? []))
            .catch(() => setIntakes([]))
            .finally(() => setLoadingI(false));

        fetch("/api/medications")
            .then((r) => r.json())
            .then((d: { data: ApiMedication[] }) => setMeds(d.data ?? []))
            .catch(() => setMeds([]))
            .finally(() => setLoadingM(false));
    }, []);

    const taken   = intakes.filter((t) => t.status === "taken").length;
    const pending = intakes.filter((t) => t.status === "pending").length;
    const firstName = userName.split(" ")[0];

    return (
        <div>
            <div className="mb-7">
                <div className="text-[13px] font-semibold mb-0.5" style={{ color: C.textMuted }}>
                    {formatDate(new Date())}
                </div>
                <h1 className="text-[26px] font-extrabold m-0" style={{ color: C.text }}>
                    Buenos días, {firstName} 👋
                </h1>
            </div>

            <div className="grid grid-cols-3 gap-3.5 mb-7">
                <div className="px-5 py-5 rounded-[12px]" style={{ background: C.amberLight, border: `1px solid ${C.amber}` }}>
                    <div className="text-[28px] font-extrabold leading-none" style={{ color: C.amber }}>
                        {loadingI ? "…" : pending}
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide mt-1.5" style={{ color: C.textMuted }}>Tomas pendientes</div>
                </div>
                <div className="px-5 py-5 rounded-[12px]" style={{ background: C.primaryLight, border: `1px solid ${C.primaryMid}` }}>
                    <div className="text-[28px] font-extrabold leading-none" style={{ color: C.primary }}>
                        {loadingI ? "…" : taken}
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide mt-1.5" style={{ color: C.textMuted }}>Tomas tomadas hoy</div>
                </div>
                <div className="px-5 py-5 rounded-[12px]" style={{ background: C.borderLight, border: `1px solid ${C.border}` }}>
                    <div className="text-[28px] font-extrabold leading-none" style={{ color: C.text }}>
                        {loadingM ? "…" : meds.length}
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide mt-1.5" style={{ color: C.textMuted }}>Medicamentos activos</div>
                </div>
            </div>

            <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <Card>
                    <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                        Tomas de hoy
                        <span className="text-[13px] font-normal ml-2" style={{ color: C.textMuted }}>
                            {taken}/{intakes.length}
                        </span>
                    </div>
                    {loadingI ? (
                        <div className="text-sm text-center py-6" style={{ color: C.textMuted }}>Cargando…</div>
                    ) : intakes.length === 0 ? (
                        <div className="text-sm text-center py-6" style={{ color: C.textMuted }}>Sin tomas programadas para hoy</div>
                    ) : (
                        <>
                            <ProgressBar value={taken} max={intakes.length} color={C.primary} height={6} />
                            <div className="flex flex-col gap-2 mt-4">
                                {intakes.map((t) => {
                                    const s = statusStyles[t.status];
                                    return (
                                        <div
                                            key={t.intake_id}
                                            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg gap-3"
                                            style={{ background: s.bg }}
                                        >
                                            <div className="min-w-0 flex-1">
                                                <div className="text-[13px] font-semibold truncate" style={{ color: C.text }}>
                                                    {t.medication_name}
                                                </div>
                                                <div className="text-[11px] mt-0.5" style={{ color: C.textMuted }}>
                                                    {t.dosage} · {formatTime(t.scheduled_time)}
                                                </div>
                                            </div>
                                            <span
                                                className="text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 bg-white"
                                                style={{ color: s.color }}
                                            >
                                                {s.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </Card>

                <Card>
                    <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                        Medicamentos activos
                    </div>
                    {loadingM ? (
                        <div className="text-sm text-center py-6" style={{ color: C.textMuted }}>Cargando…</div>
                    ) : meds.length === 0 ? (
                        <div className="text-sm text-center py-6" style={{ color: C.textMuted }}>Sin medicamentos activos</div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {meds.map((m) => (
                                <div key={m.id} className="flex items-center gap-3">
                                    <div
                                        className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
                                        style={{ background: C.primaryLight, color: C.primary }}
                                    >
                                        <IcPill size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            <span className="text-sm font-bold truncate" style={{ color: C.text }}>{m.name}</span>
                                            <span className="text-xs" style={{ color: C.textMuted }}>{m.dosage}</span>
                                        </div>
                                        <div className="text-[11px]" style={{ color: C.textMuted }}>
                                            Cada {m.frequency_hours}h
                                            {m.end_date ? ` · Hasta ${m.end_date.slice(0, 10)}` : " · Crónico"}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default PatientDashboard;
