"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Btn from "@/components/ui/Btn";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import SeverityDot from "@/components/ui/SeverityDot";
import { C } from "@/lib/colors";
import { IcPlus, IcCheck, IcTrash } from "@/components/ui/Icons";

interface SymptomEntry {
    id: number;
    symptom_name: string;
    severity: number;
    notes: string;
    entry_date: string;
    high_severity_alert: boolean;
}

interface NewSymptomForm {
    name: string;
    severity: number;
    date: string;
    notes: string;
}

const initialSymptoms: SymptomEntry[] = [
    { id: 1, symptom_name: "Dolor abdominal", severity: 6, notes: "Leve, después de comer",          entry_date: "2026-04-22", high_severity_alert: false },
    { id: 2, symptom_name: "Náusea",          severity: 4, notes: "Por la mañana",                   entry_date: "2026-04-21", high_severity_alert: false },
    { id: 3, symptom_name: "Mareo",           severity: 9, notes: "Episodio de 10 min al levantarse", entry_date: "2026-04-20", high_severity_alert: true  },
    { id: 4, symptom_name: "Cefalea",         severity: 5, notes: "Tensional leve",                   entry_date: "2026-04-19", high_severity_alert: false },
    { id: 5, symptom_name: "Fatiga",          severity: 7, notes: "Cansancio desde el mediodía",     entry_date: "2026-04-18", high_severity_alert: false },
    { id: 6, symptom_name: "Dolor abdominal", severity: 3, notes: "Muy leve",                         entry_date: "2026-04-17", high_severity_alert: false },
];

const severityColor = (v: number): string =>
    v >= 8 ? C.coral : v >= 5 ? C.amber : C.primary;

const PatientSymptoms: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [list, setList]         = useState<SymptomEntry[]>(initialSymptoms);
    const [form, setForm]         = useState<NewSymptomForm>({
        name: "", severity: 5, date: "2026-04-22", notes: "",
    });

    const save = (): void => {
        if (!form.name.trim()) return;
        const entry: SymptomEntry = {
            id: Date.now(),
            symptom_name: form.name,
            severity: form.severity,
            notes: form.notes,
            entry_date: form.date,
            high_severity_alert: form.severity >= 8,
        };
        setList((prev) => [entry, ...prev]);
        setForm({ name: "", severity: 5, date: "2026-04-22", notes: "" });
        setShowForm(false);
    };

    const remove = (id: number): void => {
        setList((prev) => prev.filter((s) => s.id !== id));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-7">
                <div>
                    <h1 className="text-[26px] font-extrabold m-0" style={{ color: C.text }}>
                        Mi Evolución
                    </h1>
                    <p className="text-sm mt-1 mb-0" style={{ color: C.textMuted }}>
                        Seguimiento de síntomas y alertas
                    </p>
                </div>
                <Btn icon={<IcPlus size={16} />} onClick={() => setShowForm(!showForm)}>
                    Registrar síntoma
                </Btn>
            </div>

            {showForm && (
                <Card
                    className="mb-5"
                    style={{ borderLeft: `4px solid ${C.primary}`, background: C.primaryLight }}
                >
                    <div className="font-bold text-sm mb-3.5" style={{ color: C.primaryDark }}>
                        Nuevo registro de síntoma
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <Input
                            label="Síntoma"
                            placeholder="Ej. Dolor de cabeza"
                            value={form.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setForm((p) => ({ ...p, name: e.target.value }))
                            }
                            required
                        />
                        <Input
                            label="Fecha"
                            type="date"
                            value={form.date}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setForm((p) => ({ ...p, date: e.target.value }))
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <div
                            className="text-[13px] font-semibold mb-1.5 flex justify-between"
                            style={{ color: C.text }}
                        >
                            <span>Severidad</span>
                            <span style={{ color: severityColor(form.severity) }}>{form.severity}/10</span>
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={10}
                            value={form.severity}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setForm((p) => ({ ...p, severity: parseInt(e.target.value) }))
                            }
                            className="w-full"
                            style={{ accentColor: severityColor(form.severity) }}
                        />
                        <div
                            className="flex justify-between text-[11px] font-semibold mt-1"
                            style={{ color: C.textMuted }}
                        >
                            <span>Leve</span>
                            <span>Moderado</span>
                            <span>Severo</span>
                        </div>
                    </div>
                    <Input
                        label="Notas"
                        placeholder="Describe el síntoma..."
                        value={form.notes}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setForm((p) => ({ ...p, notes: e.target.value }))
                        }
                    />
                    {form.severity >= 8 && (
                        <div
                            className="flex items-center gap-2 px-3 py-2 rounded-lg mt-3 text-[13px] font-semibold"
                            style={{ background: C.coralLight, color: "oklch(0.45 0.15 25)" }}
                        >
                            Severidad alta — tu médico recibirá una alerta automática
                        </div>
                    )}
                    <div className="flex gap-2.5 mt-3.5">
                        <Btn icon={<IcCheck size={16} />} onClick={save}>
                            Guardar registro
                        </Btn>
                        <Btn variant="ghost" onClick={() => setShowForm(false)}>
                            Cancelar
                        </Btn>
                    </div>
                </Card>
            )}

            <Card className="mb-5">
                <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                    Severidad últimos 7 días
                </div>
                <div className="flex items-end gap-3 h-24 mb-3">
                    {list.slice(0, 7).reverse().map((s, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                            <div className="text-[10px] font-bold" style={{ color: severityColor(s.severity) }}>
                                {s.severity}
                            </div>
                            <div
                                className="w-full rounded-t-[3px]"
                                style={{
                                    background: severityColor(s.severity),
                                    height: `${(s.severity / 10) * 72}px`,
                                    minHeight: 4,
                                }}
                            />
                            <div className="text-[10px]" style={{ color: C.textMuted }}>
                                {s.entry_date.slice(5)}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-4">
                    {[
                        { color: C.primary, label: "Leve (1-4)"     },
                        { color: C.amber,   label: "Moderado (5-7)" },
                        { color: C.coral,   label: "Severo (8-10)"  },
                    ].map((x) => (
                        <div key={x.label} className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: x.color }} />
                            <span className="text-[12px]" style={{ color: C.textMuted }}>{x.label}</span>
                        </div>
                    ))}
                </div>
            </Card>

            <div className="flex flex-col gap-2.5">
                {list.map((s) => (
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
                                <div className="text-[13px]" style={{ color: C.textMuted }}>{s.notes}</div>
                            </div>
                            <div className="text-right shrink-0">
                                <SeverityDot value={s.severity} />
                                <div className="text-xs mt-1" style={{ color: C.textMuted }}>{s.entry_date}</div>
                            </div>
                            <Btn
                                variant="ghost"
                                size="sm"
                                icon={<IcTrash size={14} />}
                                onClick={() => remove(s.id)}
                            >
                                {" "}
                            </Btn>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PatientSymptoms;