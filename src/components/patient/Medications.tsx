"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Btn from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ProgressBar from "@/components/ui/ProgressBar";
import PageHeader from "@/components/ui/PageHeader";
import { C } from "@/lib/Colors";
import { IcPill, IcPlus, IcSearch, IcEdit, IcTrash } from "@/components/ui/Icons";
import type { Medication } from "@/types";

type MedFilter = "all" | "active" | "inactive" | "rx" | "own";

const filterLabels: Record<MedFilter, string> = {
    all: "Todos", active: "Activos", inactive: "Inactivos", rx: "Rx", own: "Propios",
};

const allMedications: Medication[] = [
    { id: 1, name: "Metformina",  dosage: "850mg",   frequency_hours: 12, start_date: "2026-03-01", end_date: null,         instructions: "Tomar con alimentos",                      is_active: true,  taken: 18, total: 22, source: "doctor",  prescriber: "Dra. Ana López" },
    { id: 2, name: "Lisinopril",  dosage: "10mg",    frequency_hours: 24, start_date: "2026-03-15", end_date: "2026-06-15", instructions: "Por la mañana en ayunas",                   is_active: true,  taken: 14, total: 16, source: "doctor",  prescriber: "Dra. Ana López" },
    { id: 3, name: "Paracetamol", dosage: "500mg",   frequency_hours: 8,  start_date: "2026-04-18", end_date: "2026-04-25", instructions: "En caso de dolor. No exceder 4 dosis/día", is_active: true,  taken: 5,  total: 6,  source: "patient", prescriber: null             },
    { id: 4, name: "Omeprazol",   dosage: "20mg",    frequency_hours: 24, start_date: "2026-02-01", end_date: "2026-03-01", instructions: "Antes de desayunar",                        is_active: false, taken: 28, total: 28, source: "doctor",  prescriber: "Dra. Ana López" },
    { id: 5, name: "Vitamina D3", dosage: "1000 UI", frequency_hours: 24, start_date: "2026-04-01", end_date: null,         instructions: "Con el desayuno",                           is_active: true,  taken: 22, total: 22, source: "patient", prescriber: null             },
];

const PatientMedications: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<MedFilter>("all");

    const filtered = allMedications.filter((m) => {
        const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
        const matchFilter =
            filter === "all"      ? true :
                filter === "active"   ? m.is_active :
                    filter === "inactive" ? !m.is_active :
                        filter === "rx"       ? m.source === "doctor" :
                            m.source === "patient";
        return matchSearch && matchFilter;
    });

    return (
        <div>
            <PageHeader
                title="Mis Medicamentos"
                subtitle="Historial completo de tratamientos activos e inactivos"
                actions={<Btn icon={<IcPlus size={16} />}>Agregar medicamento</Btn>}
            />

            <div className="flex items-center gap-3 mb-5 flex-wrap">
                <div className="w-56">
                    <Input
                        placeholder="Buscar medicamento..."
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        icon={<IcSearch size={15} />}
                    />
                </div>
                {(Object.keys(filterLabels) as MedFilter[]).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-[9px] rounded-lg text-[13px] font-semibold cursor-pointer transition-all duration-150${filter !== f ? " bg-white" : ""}`}
                        style={{
                            border:     `1.5px solid ${filter === f ? C.primary : C.border}`,
                            background:  filter === f ? C.primaryLight : undefined,
                            color:       filter === f ? C.primary      : C.textMuted,
                        }}
                    >
                        {filterLabels[f]}
                    </button>
                ))}
            </div>

            <div className="flex gap-4 mb-5">
                {[
                    { color: C.primary, label: "Rx — Prescrito por médico" },
                    { color: C.violet,  label: "Propio — Agregado por ti"  },
                ].map((x) => (
                    <div key={x.label} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: x.color }} />
                        <span className="text-xs font-semibold" style={{ color: C.textMuted }}>{x.label}</span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {filtered.map((m) => {
                    const adherence   = Math.round((m.taken / m.total) * 100);
                    const isRx        = m.source === "doctor";
                    const accentColor = isRx ? C.primary : C.violet;
                    const adhColor    = adherence >= 80 ? C.primary : C.amber;

                    return (
                        <Card
                            key={m.id}
                            style={{
                                borderLeft: `4px solid ${accentColor}`,
                                opacity:     m.is_active ? 1 : 0.65,
                            }}
                        >
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: accentColor + "1a", color: accentColor }}
                                    >
                                        <IcPill size={22} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <span className="text-[15px] font-bold" style={{ color: C.text }}>{m.name}</span>
                                            {isRx ? (
                                                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: C.primaryLight, color: C.primaryDark }}>Rx</span>
                                            ) : (
                                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: C.violetLight, color: C.violet }}>Propio</span>
                                            )}
                                            {!m.is_active && (
                                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gray-100" style={{ color: C.textMuted }}>Inactivo</span>
                                            )}
                                        </div>
                                        <div className="text-[13px]" style={{ color: C.textMuted }}>
                                            {m.dosage} · cada {m.frequency_hours}h
                                            {isRx && m.prescriber && <span> · {m.prescriber}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="flex items-start gap-2 px-3 py-2 rounded-lg mb-3 text-[13px] bg-gray-100"
                                style={{ color: C.textMuted }}
                            >
                                <span>📋</span>
                                <span>{m.instructions}</span>
                            </div>

                            <div className="mb-3">
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-[12px] font-semibold" style={{ color: C.textMuted }}>Adherencia</span>
                                    <span className="text-sm font-extrabold" style={{ color: adhColor }}>{adherence}%</span>
                                </div>
                                <ProgressBar value={m.taken} max={m.total} color={adhColor} height={7} />
                                <div className="text-[11px] mt-1" style={{ color: C.textMuted }}>
                                    {m.taken} de {m.total} tomas completadas
                                </div>
                            </div>

                            <div className="text-[12px] mb-3" style={{ color: C.textMuted }}>
                                Inicio: {m.start_date}
                                {m.end_date  && <> · Fin: {m.end_date}</>}
                                {!m.end_date && <> · <span style={{ color: C.primary }}>Crónico</span></>}
                            </div>

                            {!isRx && (
                                <div className="flex gap-2">
                                    <Btn variant="ghost" size="sm" icon={<IcEdit size={14} />}>{" "}</Btn>
                                    {m.is_active && (
                                        <Btn variant="ghost" size="sm" icon={<IcTrash size={14} />}>{" "}</Btn>
                                    )}
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default PatientMedications;