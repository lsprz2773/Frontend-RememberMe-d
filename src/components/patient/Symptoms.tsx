"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Btn from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import SeverityDot from "@/components/ui/SeverityDot";
import { C } from "@/lib/Colors";
import { IcPlus, IcCheck } from "@/components/ui/Icons";
import type { ApiSymptom } from "@/types/api";

interface NewSymptomForm {
    name: string;
    severity: number;
    date: string;
    notes: string;
}

const severityColor = (v: number): string =>
    v >= 8 ? C.coral : v >= 5 ? C.amber : C.primary;

const PatientSymptoms: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [list, setList]         = useState<ApiSymptom[]>([]);
    const [loading, setLoading]   = useState<boolean>(true);
    const [saving, setSaving]     = useState<boolean>(false);
    const [saveError, setSaveError] = useState<string>("");
    const [form, setForm]         = useState<NewSymptomForm>({
        name: "", severity: 5,
        date: new Date().toISOString().slice(0, 10),
        notes: "",
    });

    React.useEffect(() => {
        const load = async (): Promise<void> => {
            try {
                const res = await fetch("/api/symptoms");
                if (res.ok) {
                    const data = await res.json() as ApiSymptom[];
                    setList(data);
                }
            } catch {
                // no GET endpoint or network error — start empty, still allow POST
            } finally {
                setLoading(false);
            }
        };
        void load();
    }, []);

    const save = async (): Promise<void> => {
        if (!form.name.trim()) return;
        setSaving(true);
        setSaveError("");
        try {
            const res = await fetch("/api/symptoms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    symptom_name: form.name,
                    severity: form.severity,
                    notes: form.notes || undefined,
                    entry_date: form.date,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Error al guardar");
            setList((prev) => [data as ApiSymptom, ...prev]);
            setForm({ name: "", severity: 5, date: new Date().toISOString().slice(0, 10), notes: "" });
            setShowForm(false);
        } catch (e) {
            setSaveError(e instanceof Error ? e.message : "Error al guardar");
        } finally {
            setSaving(false);
        }
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
                            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                            required
                        />
                        <Input
                            label="Fecha"
                            type="date"
                            value={form.date}
                            onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
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
                            onChange={(e) => setForm((p) => ({ ...p, severity: parseInt(e.target.value) }))}
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
                        onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                    />
                    {form.severity >= 8 && (
                        <div
                            className="flex items-center gap-2 px-3 py-2 rounded-lg mt-3 text-[13px] font-semibold"
                            style={{ background: C.coralLight, color: C.coralDark }}
                        >
                            Severidad alta — tu médico recibirá una alerta automática
                        </div>
                    )}
                    {saveError && (
                        <div className="px-3 py-2 rounded-lg mt-3 text-[13px] font-semibold" style={{ background: C.coralLight, color: C.coralDark }}>
                            {saveError}
                        </div>
                    )}
                    <div className="flex gap-2.5 mt-3.5">
                        <Btn icon={<IcCheck size={16} />} disabled={saving} onClick={() => void save()}>
                            {saving ? "Guardando…" : "Guardar registro"}
                        </Btn>
                        <Btn variant="ghost" onClick={() => { setShowForm(false); setSaveError(""); }}>
                            Cancelar
                        </Btn>
                    </div>
                </Card>
            )}

            {list.length > 1 && (
                <Card className="mb-5">
                    <div className="font-bold text-[15px] mb-4" style={{ color: C.text }}>
                        Severidad (sesión actual)
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
                </Card>
            )}

            {loading ? (
                <div className="text-sm text-center py-12" style={{ color: C.textMuted }}>
                    Cargando síntomas…
                </div>
            ) : list.length === 0 ? (
                <div className="text-sm text-center py-12" style={{ color: C.textMuted }}>
                    Aún no has registrado síntomas.
                    <br />Usa el botón de arriba para registrar uno.
                </div>
            ) : (
                <div className="flex flex-col gap-2.5">
                    {list.map((s) => {
                        const isHigh = s.severity >= 8;
                        return (
                            <Card
                                key={s.id}
                                pad={16}
                                style={{
                                    borderLeft: isHigh
                                        ? `4px solid ${C.coral}`
                                        : "4px solid transparent",
                                }}
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                                            <span className="text-[15px] font-bold truncate" style={{ color: C.text }}>
                                                {s.symptom_name}
                                            </span>
                                            {isHigh && (
                                                <span className="shrink-0">
                                                    <Badge label="Alta severidad" variant="alert" dot />
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-[13px]" style={{ color: C.textMuted }}>{s.notes ?? ""}</div>
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
    );
};

export default PatientSymptoms;
