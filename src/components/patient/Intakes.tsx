"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Btn from "@/components/ui/Btn";
import ProgressBar from "@/components/ui/ProgressBar";
import { C } from "@/lib/colors";
import { IcCheck } from "@/components/ui/Icons";

type IntakeStatus = "taken" | "pending" | "late" | "skipped";

interface IntakeLog {
    id: number;
    medication: string;
    dosage: string;
    scheduled_time: string;
    status: IntakeStatus;
    taken_at: string | null;
}

const initialIntakes: IntakeLog[] = [
    { id: 1, medication: "Metformina",  dosage: "850mg",   scheduled_time: "08:00", status: "taken",   taken_at: "08:14" },
    { id: 2, medication: "Lisinopril",  dosage: "10mg",    scheduled_time: "08:00", status: "taken",   taken_at: "08:14" },
    { id: 3, medication: "Paracetamol", dosage: "500mg",   scheduled_time: "08:00", status: "taken",   taken_at: "08:30" },
    { id: 4, medication: "Metformina",  dosage: "850mg",   scheduled_time: "14:00", status: "pending", taken_at: null    },
    { id: 5, medication: "Paracetamol", dosage: "500mg",   scheduled_time: "16:00", status: "pending", taken_at: null    },
    { id: 6, medication: "Vitamina D3", dosage: "1000 UI", scheduled_time: "08:00", status: "taken",   taken_at: "08:20" },
];

const statusLabel: Record<IntakeStatus, string> = {
    taken:   "Tomado",
    pending: "Pendiente",
    late:    "Tarde",
    skipped: "Omitido",
};

const statusColor: Record<IntakeStatus, string> = {
    taken:   C.primary,
    pending: C.amber,
    late:    C.coral,
    skipped: C.textMuted,
};

const PatientIntakes: React.FC = () => {
    const [intakes, setIntakes] = useState<IntakeLog[]>(initialIntakes);

    const taken = intakes.filter((t) => t.status === "taken").length;
    const total = intakes.length;
    const hours = [...new Set(intakes.map((t) => t.scheduled_time))].sort();

    const confirm = (id: number): void => {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        setIntakes((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: "taken" as IntakeStatus, taken_at: timeStr } : t))
        );
    };

    const skip = (id: number): void => {
        setIntakes((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: "skipped" as IntakeStatus } : t))
        );
    };

    return (
        <div>
            <div className="mb-7">
                <h1 className="text-[26px] font-extrabold m-0" style={{ color: C.text }}>
                    Tomas del día
                </h1>
                <p className="text-sm mt-1 mb-0" style={{ color: C.textMuted }}>
                    <strong style={{ color: C.text }}>{taken}</strong> / {total} tomas registradas
                </p>
            </div>

            <Card className="mb-5">
                <ProgressBar value={taken} max={total} color={C.primary} height={10} />
                <div className="grid grid-cols-4 gap-3 mt-4">
                    {([
                        { label: "Tomadas",    count: intakes.filter((t) => t.status === "taken").length,   color: C.primary   },
                        { label: "Pendientes", count: intakes.filter((t) => t.status === "pending").length, color: C.amber     },
                        { label: "Tarde",      count: intakes.filter((t) => t.status === "late").length,    color: C.coral     },
                        { label: "Omitidas",   count: intakes.filter((t) => t.status === "skipped").length, color: C.textMuted },
                    ] as const).map((s) => (
                        <div key={s.label} className="text-center">
                            <div className="text-2xl font-extrabold" style={{ color: s.color }}>{s.count}</div>
                            <div className="text-[11px] font-semibold" style={{ color: C.textMuted }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </Card>

            <div className="flex flex-col gap-5">
                {hours.map((hour) => {
                    const group    = intakes.filter((t) => t.scheduled_time === hour);
                    const allTaken = group.every((t) => t.status === "taken");
                    return (
                        <div key={hour} className="flex gap-4">
                            <div className="text-right shrink-0 pt-1" style={{ width: 52 }}>
                                <div
                                    className="text-sm font-bold"
                                    style={{ color: allTaken ? C.primary : C.text }}
                                >
                                    {hour}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 flex-1 relative">
                                <div
                                    className="absolute left-0 top-0 bottom-0 w-0.5 -ml-2"
                                    style={{ background: allTaken ? C.primary : C.borderLight }}
                                />
                                {group.map((t) => (
                                    <Card key={t.id} pad={14}>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
                                                style={{
                                                    background: statusColor[t.status] + "1a",
                                                    color: statusColor[t.status],
                                                }}
                                            >
                                                <IcCheck size={18} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-bold truncate" style={{ color: C.text }}>
                                                    {t.medication}
                                                </div>
                                                <div className="text-[12px]" style={{ color: C.textMuted }}>{t.dosage}</div>
                                                {t.status === "taken" && (
                                                    <div className="text-[11px] font-semibold mt-0.5" style={{ color: C.primary }}>
                                                        ✓ Registrado a las {t.taken_at}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                {t.status === "pending" && (
                                                    <>
                                                        <Btn size="sm" icon={<IcCheck size={14} />} onClick={() => confirm(t.id)}>
                                                            Confirmar
                                                        </Btn>
                                                        <Btn variant="ghost" size="sm" onClick={() => skip(t.id)}>
                                                            Omitir
                                                        </Btn>
                                                    </>
                                                )}
                                                {t.status !== "pending" && (
                                                    <span
                                                        className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                                                        style={{
                                                            background: statusColor[t.status] + "22",
                                                            color: statusColor[t.status],
                                                        }}
                                                    >
                            {statusLabel[t.status]}
                          </span>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PatientIntakes;