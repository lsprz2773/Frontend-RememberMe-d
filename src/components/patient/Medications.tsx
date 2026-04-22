"use client";

import React, { useState, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Btn from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PageHeader from "@/components/ui/PageHeader";
import { C } from "@/lib/Colors";
import { IcPill, IcPlus, IcSearch, IcTrash } from "@/components/ui/Icons";
import type { ApiMedication } from "@/types/api";

type MedFilter = "all" | "active" | "inactive";

const filterLabels: Record<MedFilter, string> = {
    all: "Todos", active: "Activos", inactive: "Inactivos",
};

interface AddForm {
    name: string;
    dosage: string;
    frequency_hours: string;
    start_date: string;
    end_date: string;
    instructions: string;
}

const emptyForm: AddForm = {
    name: "", dosage: "", frequency_hours: "8",
    start_date: new Date().toISOString().slice(0, 10),
    end_date: "", instructions: "",
};

const PatientMedications: React.FC = () => {
    const [meds, setMeds]         = useState<ApiMedication[]>([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState<string>("");
    const [search, setSearch]     = useState<string>("");
    const [filter, setFilter]     = useState<MedFilter>("all");
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving]     = useState(false);
    const [formError, setFormError] = useState<string>("");
    const [form, setForm]         = useState<AddForm>(emptyForm);

    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/medications");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Error");
            setMeds(data.data ?? []);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Error al cargar medicamentos");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { void load(); }, [load]);

    const setField =
        (k: keyof AddForm) =>
            (e: React.ChangeEvent<HTMLInputElement>): void => {
                setFormError("");
                setForm((p) => ({ ...p, [k]: e.target.value }));
            };

    const handleAdd = async (): Promise<void> => {
        if (!form.name.trim() || !form.dosage.trim()) {
            setFormError("El nombre y la dosis son obligatorios");
            return;
        }
        setSaving(true);
        setFormError("");
        try {
            const res = await fetch("/api/medications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    dosage: form.dosage,
                    frequency_hours: Number(form.frequency_hours),
                    start_date: form.start_date,
                    end_date: form.end_date || undefined,
                    instructions: form.instructions || undefined,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Error");
            setMeds((prev) => [...prev, data as ApiMedication]);
            setForm(emptyForm);
            setShowForm(false);
        } catch (e) {
            setFormError(e instanceof Error ? e.message : "Error al guardar");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number): Promise<void> => {
        if (!confirm("¿Eliminar este medicamento?")) return;
        try {
            await fetch(`/api/medications/${id}`, { method: "DELETE" });
            setMeds((prev) => prev.filter((m) => m.id !== id));
        } catch {
            // silent
        }
    };

    const filtered = meds.filter((m) => {
        const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
        const matchFilter =
            filter === "all"      ? true :
            filter === "active"   ? m.is_active :
                                    !m.is_active;
        return matchSearch && matchFilter;
    });

    return (
        <div>
            <PageHeader
                title="Mis Medicamentos"
                subtitle="Medicamentos activos registrados en tu tratamiento"
                actions={
                    <Btn icon={<IcPlus size={16} />} onClick={() => setShowForm(!showForm)}>
                        Agregar medicamento
                    </Btn>
                }
            />

            {showForm && (
                <Card className="mb-5" style={{ borderLeft: `4px solid ${C.primary}`, background: C.primaryLight }}>
                    <div className="font-bold text-sm mb-3.5" style={{ color: C.primaryDark }}>
                        Nuevo medicamento
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <Input label="Nombre" placeholder="Ej. Paracetamol" value={form.name} onChange={setField("name")} required />
                        <Input label="Dosis" placeholder="Ej. 500mg" value={form.dosage} onChange={setField("dosage")} required />
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                        <Input label="Frecuencia (horas)" type="number" value={form.frequency_hours} onChange={setField("frequency_hours")} />
                        <Input label="Fecha inicio" type="date" value={form.start_date} onChange={setField("start_date")} />
                        <Input label="Fecha fin (vacío = crónico)" type="date" value={form.end_date} onChange={setField("end_date")} />
                    </div>
                    <Input label="Indicaciones" placeholder="Ej. Tomar con alimentos" value={form.instructions} onChange={setField("instructions")} />
                    {formError && (
                        <div className="mt-2 text-[13px] font-semibold px-3 py-2 rounded-lg" style={{ background: C.coralLight, color: C.coralDark }}>
                            {formError}
                        </div>
                    )}
                    <div className="flex gap-2.5 mt-3.5">
                        <Btn disabled={saving} onClick={handleAdd}>{saving ? "Guardando…" : "Guardar"}</Btn>
                        <Btn variant="ghost" onClick={() => { setShowForm(false); setFormError(""); setForm(emptyForm); }}>Cancelar</Btn>
                    </div>
                </Card>
            )}

            <div className="flex items-center gap-3 mb-5 flex-wrap">
                <div className="w-56">
                    <Input
                        placeholder="Buscar medicamento..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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

            {loading ? (
                <div className="text-sm text-center py-12" style={{ color: C.textMuted }}>Cargando medicamentos…</div>
            ) : error ? (
                <div className="text-sm text-center py-12" style={{ color: C.coral }}>{error}</div>
            ) : filtered.length === 0 ? (
                <div className="text-sm text-center py-12" style={{ color: C.textMuted }}>
                    {search ? "Sin resultados para tu búsqueda" : "Sin medicamentos registrados"}
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {filtered.map((m) => (
                        <Card
                            key={m.id}
                            style={{
                                borderLeft: `4px solid ${C.primary}`,
                                opacity: m.is_active ? 1 : 0.65,
                            }}
                        >
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: C.primaryLight + "1a", color: C.primary }}
                                    >
                                        <IcPill size={22} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <span className="text-[15px] font-bold" style={{ color: C.text }}>{m.name}</span>
                                            {!m.is_active && (
                                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gray-100" style={{ color: C.textMuted }}>Inactivo</span>
                                            )}
                                        </div>
                                        <div className="text-[13px]" style={{ color: C.textMuted }}>
                                            {m.dosage} · cada {m.frequency_hours}h
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {m.instructions && (
                                <div className="flex items-start gap-2 px-3 py-2 rounded-lg mb-3 text-[13px] bg-gray-100" style={{ color: C.textMuted }}>
                                    <span>📋</span>
                                    <span>{m.instructions}</span>
                                </div>
                            )}

                            <div className="text-[12px] mb-3" style={{ color: C.textMuted }}>
                                Inicio: {m.start_date.slice(0, 10)}
                                {m.end_date  && <> · Fin: {m.end_date.slice(0, 10)}</>}
                                {!m.end_date && <> · <span style={{ color: C.primary }}>Crónico</span></>}
                            </div>

                            <div className="flex gap-2">
                                <Btn variant="ghost" size="sm" icon={<IcTrash size={14} />} onClick={() => void handleDelete(m.id)}>
                                    {" "}
                                </Btn>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientMedications;
