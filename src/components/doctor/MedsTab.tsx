"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Btn from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ProgressBar from "@/components/ui/ProgressBar";
import { C } from "@/lib/Colors";
import { IcPlus, IcPill, IcCheck, IcTrash } from "@/components/ui/Icons";
import type { DoctorPatient } from "@/types";

type MedSource = "doctor" | "patient";

interface DetailMedication {
    id: number;
    name: string;
    dosage: string;
    freq: number;
    taken: number;
    total: number;
    is_active: boolean;
    source: MedSource;
}

interface PrescribeForm {
    name: string;
    dosage: string;
    freq: string;
    start: string;
    end: string;
    instructions: string;
}

interface MedsTabProps {
    patient: DoctorPatient;
}

const freqOptions: [string, string][] = [
    ["4",  "Cada 4h"],
    ["6",  "Cada 6h"],
    ["8",  "Cada 8h"],
    ["12", "Cada 12h"],
    ["24", "Una vez al día"],
];

const MedsTab: React.FC<MedsTabProps> = ({ patient }) => {
    const [meds, setMeds]         = useState<DetailMedication[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [form, setForm]         = useState<PrescribeForm>({
        name: "", dosage: "", freq: "8",
        start: new Date().toISOString().slice(0, 10),
        end: "", instructions: "",
    });

    const set =
        (k: keyof PrescribeForm) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
                setForm((p) => ({ ...p, [k]: e.target.value }));
            };

    const prescribe = (): void => {
        if (!form.name.trim() || !form.dosage.trim()) return;
        const freq = parseInt(form.freq);
        const newMed: DetailMedication = {
            id: Date.now(),
            name: form.name,
            dosage: form.dosage,
            freq,
            taken: 0,
            total: Math.round(24 / freq),
            is_active: true,
            source: "doctor",
        };
        setMeds((prev) => [newMed, ...prev]);
        setForm({
            name: "", dosage: "", freq: "8",
            start: new Date().toISOString().slice(0, 10),
            end: "", instructions: "",
        });
        setShowForm(false);
    };

    const removeMed = (id: number): void => {
        setMeds((prev) => prev.filter((m) => m.id !== id));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="text-[15px] font-bold" style={{ color: C.text }}>
                    Medicamentos del paciente
                    <span className="text-[13px] font-normal ml-2" style={{ color: C.textMuted }}>
                        {meds.filter((m) => m.is_active).length} activos esta sesión
                    </span>
                </div>
                <Btn icon={<IcPlus size={16} />} onClick={() => setShowForm(!showForm)}>
                    Prescribir medicamento
                </Btn>
            </div>

            {showForm && (
                <Card
                    className="mb-4"
                    style={{ borderLeft: `4px solid ${C.primary}`, background: C.primaryLight }}
                >
                    <div className="font-bold text-sm mb-3.5" style={{ color: C.primaryDark }}>
                        Nueva prescripción para {patient.full_name}
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-3">
                        <Input
                            label="Medicamento"
                            placeholder="Ej. Metformina"
                            value={form.name}
                            onChange={set("name")}
                            required
                        />
                        <Input
                            label="Dosis"
                            placeholder="Ej. 850mg"
                            value={form.dosage}
                            onChange={set("dosage")}
                            required
                        />
                        <div>
                            <label
                                className="text-[13px] font-semibold block mb-[5px]"
                                style={{ color: C.text }}
                            >
                                Frecuencia
                            </label>
                            <select
                                value={form.freq}
                                onChange={set("freq")}
                                className="w-full text-sm px-3.5 py-2.5 rounded-lg outline-none"
                                style={{
                                    fontFamily: "Nunito, sans-serif",
                                    border: `1.5px solid ${C.border}`,
                                    background: C.surface,
                                    color: C.text,
                                }}
                            >
                                {freqOptions.map(([v, l]) => (
                                    <option key={v} value={v}>{l}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <Input label="Fecha inicio" type="date" value={form.start} onChange={set("start")} />
                        <Input label="Fecha fin (vacío = crónico)" type="date" value={form.end} onChange={set("end")} />
                    </div>

                    <Input
                        label="Indicaciones"
                        placeholder="Ej. Tomar con alimentos, en ayunas..."
                        value={form.instructions}
                        onChange={set("instructions")}
                    />

                    <div
                        className="mt-3 px-3 py-2 rounded-lg text-[12px]"
                        style={{ background: C.amberLight, color: C.amberDark }}
                    >
                        Las prescripciones son locales a esta sesión y no se envían al paciente en esta versión.
                    </div>

                    <div className="flex gap-2.5 mt-3">
                        <Btn icon={<IcCheck size={16} />} onClick={prescribe}>
                            Guardar prescripción
                        </Btn>
                        <Btn variant="ghost" onClick={() => setShowForm(false)}>
                            Cancelar
                        </Btn>
                    </div>
                </Card>
            )}

            {meds.length === 0 && !showForm && (
                <div className="text-sm py-10 text-center" style={{ color: C.textMuted }}>
                    No hay medicamentos en esta sesión.
                    <br />Las prescripciones previas del paciente no están disponibles en esta vista.
                </div>
            )}

            <div className="flex flex-col gap-3">
                {meds.map((m) => {
                    const adh  = m.total > 0 ? Math.round((m.taken / m.total) * 100) : 0;
                    const col  = adh >= 80 ? C.primary : C.amber;
                    const isRx = m.source === "doctor";

                    return (
                        <Card
                            key={m.id}
                            pad={16}
                            style={{ borderLeft: `4px solid ${isRx ? C.primary : C.violet}` }}
                        >
                            <div className="flex items-center gap-3.5">
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                    style={{
                                        background: isRx ? C.primaryLight : C.violetLight,
                                        color:      isRx ? C.primary      : C.violet,
                                    }}
                                >
                                    <IcPill size={22} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-[3px]">
                                        <span className="text-[15px] font-bold" style={{ color: C.text }}>{m.name}</span>
                                        <span className="text-sm font-normal" style={{ color: C.textMuted }}>{m.dosage}</span>
                                        {isRx ? (
                                            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: C.primaryLight, color: C.primaryDark }}>
                                                Rx
                                            </span>
                                        ) : (
                                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: C.violetLight, color: C.violet }}>
                                                Propio
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-[13px]" style={{ color: C.textMuted }}>Cada {m.freq}h</div>
                                </div>

                                <div className="text-right min-w-[150px] shrink-0">
                                    <div className="text-[13px] font-semibold mb-1" style={{ color: C.textMuted }}>
                                        {m.taken}/{m.total} tomas ·{" "}
                                        <span style={{ color: col }}>{adh}%</span>
                                    </div>
                                    <ProgressBar value={m.taken} max={m.total} color={col} height={6} />
                                </div>

                                {isRx && (
                                    <Btn variant="ghost" size="sm" icon={<IcTrash size={14} />} onClick={() => removeMed(m.id)}>
                                        {" "}
                                    </Btn>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default MedsTab;
