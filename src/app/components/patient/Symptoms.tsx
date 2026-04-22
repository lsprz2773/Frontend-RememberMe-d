"use client";

import React, { useState } from "react";

const initialSymptoms = [
    { id: 1, symptom_name: "Dolor abdominal", severity: 6, notes: "Leve, después de comer",          entry_date: "2026-04-22", high_severity_alert: false },
    { id: 2, symptom_name: "Náusea",          severity: 4, notes: "Por la mañana",                   entry_date: "2026-04-21", high_severity_alert: false },
    { id: 3, symptom_name: "Mareo",           severity: 9, notes: "Episodio de 10 min al levantarse", entry_date: "2026-04-20", high_severity_alert: true  },
    { id: 4, symptom_name: "Cefalea",         severity: 5, notes: "Tensional leve",                   entry_date: "2026-04-19", high_severity_alert: false },
    { id: 5, symptom_name: "Fatiga",          severity: 7, notes: "Cansancio desde el mediodía",     entry_date: "2026-04-18", high_severity_alert: false },
    { id: 6, symptom_name: "Dolor abdominal", severity: 3, notes: "Muy leve",                         entry_date: "2026-04-17", high_severity_alert: false },
];

const sevColor      = (v) => v >= 8 ? "text-red-400"  : v >= 5 ? "text-amber-400"  : "text-blue-500";
const sevBg         = (v) => v >= 8 ? "bg-red-400"    : v >= 5 ? "bg-amber-400"    : "bg-blue-500";
const sevAccent     = (v) => v >= 8 ? "#f87171"        : v >= 5 ? "#fbbf24"         : "#60a5fa";

const PatientSymptoms = () => {
    const [showForm, setShowForm] = useState(false);
    const [list, setList]         = useState(initialSymptoms);
    const [form, setForm]         = useState({ name: "", severity: 5, date: "2026-04-22", notes: "" });

    const save = () => {
        if (!form.name.trim()) return;
        setList((prev) => [{
            id: Date.now(),
            symptom_name: form.name,
            severity: form.severity,
            notes: form.notes,
            entry_date: form.date,
            high_severity_alert: form.severity >= 8,
        }, ...prev]);
        setForm({ name: "", severity: 5, date: "2026-04-22", notes: "" });
        setShowForm(false);
    };

    const remove = (id) => setList((prev) => prev.filter((s) => s.id !== id));

    return (
        <div>

            <div className="flex justify-between items-center mb-7">
                <div>
                    <h1 className="text-[26px] font-extrabold m-0 text-gray-800">Mi Evolución</h1>
                    <p className="text-sm mt-1 mb-0 text-gray-400">Seguimiento de síntomas y alertas</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 border-none cursor-pointer transition-colors"
                >
                    + Registrar síntoma
                </button>
            </div>

            {showForm && (
                <div className="mb-5 p-5 rounded-2xl border-l-4 border-blue-400 bg-blue-50">
                    <div className="font-bold text-sm mb-3.5 text-blue-700">
                        Nuevo registro de síntoma
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                            <label className="text-[13px] font-semibold block mb-[5px] text-gray-700">Síntoma</label>
                            <input
                                placeholder="Ej. Dolor de cabeza"
                                value={form.name}
                                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-[13px] font-semibold block mb-[5px] text-gray-700">Fecha</label>
                            <input
                                type="date"
                                value={form.date}
                                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-colors"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="text-[13px] font-semibold mb-1.5 flex justify-between text-gray-700">
                            <span>Severidad</span>
                            <span className={sevColor(form.severity)}>{form.severity}/10</span>
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={10}
                            value={form.severity}
                            onChange={(e) => setForm((p) => ({ ...p, severity: parseInt(e.target.value) }))}
                            className="w-full"
                            style={{ accentColor: sevAccent(form.severity) }}
                        />
                        <div className="flex justify-between text-[11px] font-semibold mt-1 text-gray-400">
                            <span>Leve</span>
                            <span>Moderado</span>
                            <span>Severo</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-[13px] font-semibold block mb-[5px] text-gray-700">Notas</label>
                        <input
                            placeholder="Describe el síntoma..."
                            value={form.notes}
                            onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-colors"
                        />
                    </div>
                    {form.severity >= 8 && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg mt-3 text-[13px] font-semibold bg-red-50 text-red-700">
                            Severidad alta — tu médico recibirá una alerta automática
                        </div>
                    )}
                    <div className="flex gap-2.5 mt-3.5">
                        <button
                            onClick={save}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 border-none cursor-pointer transition-colors"
                        >
                            Guardar registro
                        </button>
                        <button
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-500 bg-transparent border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">
                <div className="font-bold text-[15px] mb-4 text-gray-800">Severidad últimos 7 días</div>
                <div className="flex items-end gap-3 h-24 mb-3">
                    {list.slice(0, 7).reverse().map((s, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                            <div className={`text-[10px] font-bold ${sevColor(s.severity)}`}>{s.severity}</div>
                            <div
                                className={`w-full rounded-t-[3px] ${sevBg(s.severity)}`}
                                style={{ height: `${(s.severity / 10) * 72}px`, minHeight: 4 }}
                            />
                            <div className="text-[10px] text-gray-400">{s.entry_date.slice(5)}</div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-4">
                    {[
                        { cls: "bg-blue-500",  label: "Leve (1-4)"     },
                        { cls: "bg-amber-400", label: "Moderado (5-7)" },
                        { cls: "bg-red-400",   label: "Severo (8-10)"  },
                    ].map((x) => (
                        <div key={x.label} className="flex items-center gap-1.5">
                            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${x.cls}`} />
                            <span className="text-[12px] text-gray-400">{x.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2.5">
                {list.map((s) => (
                    <div
                        key={s.id}
                        className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 border-l-4 ${
                            s.high_severity_alert ? "border-l-red-400" : "border-l-transparent"
                        }`}
                    >
                        <div className="flex items-center gap-3.5">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[15px] font-bold truncate text-gray-800">
                    {s.symptom_name}
                  </span>
                                    {s.high_severity_alert && (
                                        <span className="shrink-0 bg-red-100 text-red-500 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                      Alta severidad
                    </span>
                                    )}
                                </div>
                                <div className="text-[13px] text-gray-400">{s.notes}</div>
                            </div>
                            <div className="text-right shrink-0">
                                <span className={`w-3 h-3 rounded-full inline-block ${sevBg(s.severity)}`} />
                                <div className="text-xs mt-1 text-gray-400">{s.entry_date}</div>
                            </div>
                            <button
                                onClick={() => remove(s.id)}
                                className="p-2 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 border-none bg-transparent cursor-pointer transition-colors"
                            >
                                X
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default PatientSymptoms;