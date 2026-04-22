"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Btn from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { C } from "@/lib/Colors";
import { IcCheck } from "@/components/ui/Icons";
import type { ApiIntakeLog } from "@/types/api";
import type { IntakeStatus } from "@/types";

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

const statusBg: Record<IntakeStatus, string> = {
    taken:   C.primaryLight,
    pending: C.amberLight,
    late:    C.coralLight,
    skipped: C.borderLight,
};

function formatTime(timeStr: string): string {
    return timeStr.slice(0, 5);
}

const PatientIntakes: React.FC = () => {
    const [intakes, setIntakes] = useState<ApiIntakeLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<string>("");

    useEffect(() => {
        fetch("/api/intake-logs/today")
            .then((r) => r.json())
            .then((d: { data: ApiIntakeLog[] }) => setIntakes(d.data ?? []))
            .catch(() => setError("Error al cargar las tomas"))
            .finally(() => setLoading(false));
    }, []);

    const confirm = async (id: number): Promise<void> => {
        try {
            const res = await fetch(`/api/intake-logs/${id}/confirm`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "taken" }),
            });
            if (!res.ok) return;
            const now = new Date();
            const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
            setIntakes((prev) =>
                prev.map((t) =>
                    t.intake_id === id ? { ...t, status: "taken" as IntakeStatus, taken_at: timeStr } : t
                )
            );
        } catch {
            // silent — optimistic update not applied
        }
    };

    const taken = intakes.filter((t) => t.status === "taken").length;
    const total = intakes.length;
    const hours = [...new Set(intakes.map((t) => formatTime(t.scheduled_time)))].sort();

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

            {loading ? (
                <div className="text-sm text-center py-12" style={{ color: C.textMuted }}>Cargando tomas…</div>
            ) : error ? (
                <div className="text-sm text-center py-12" style={{ color: C.coral }}>{error}</div>
            ) : intakes.length === 0 ? (
                <div className="text-sm text-center py-12" style={{ color: C.textMuted }}>Sin tomas programadas para hoy</div>
            ) : (
                <>
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
                                    <div className="text-[11px] font-semibold mt-1" style={{ color: C.textMuted }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="flex flex-col gap-5">
                        {hours.map((hour) => {
                            const group    = intakes.filter((t) => formatTime(t.scheduled_time) === hour);
                            const allTaken = group.every((t) => t.status === "taken");
                            return (
                                <div key={hour} className="flex gap-4">
                                    <div className="text-right shrink-0 pt-1" style={{ width: 52 }}>
                                        <div className="text-sm font-bold" style={{ color: allTaken ? C.primary : C.text }}>
                                            {hour}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2.5 flex-1 relative">
                                        <div
                                            className="absolute left-0 top-0 bottom-0 w-0.5 -ml-2"
                                            style={{ background: allTaken ? C.primary : C.borderLight }}
                                        />
                                        {group.map((t) => (
                                            <Card key={t.intake_id} pad={14}>
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
                                                        style={{
                                                            background: statusBg[t.status],
                                                            color: statusColor[t.status],
                                                        }}
                                                    >
                                                        <IcCheck size={18} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-bold truncate" style={{ color: C.text }}>
                                                            {t.medication_name}
                                                        </div>
                                                        <div className="text-[12px] mb-1" style={{ color: C.textMuted }}>{t.dosage}</div>
                                                        {t.status === "taken" && t.taken_at && (
                                                            <div className="text-[11px] font-semibold" style={{ color: C.primary }}>
                                                                ✓ Registrado a las {t.taken_at.toString().slice(0, 5)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        {t.status === "pending" && (
                                                            <Btn size="sm" icon={<IcCheck size={14} />} onClick={() => void confirm(t.intake_id)}>
                                                                Confirmar
                                                            </Btn>
                                                        )}
                                                        {t.status !== "pending" && (
                                                            <span
                                                                className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                                                                style={{
                                                                    background: statusBg[t.status],
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
                </>
            )}
        </div>
    );
};

export default PatientIntakes;
