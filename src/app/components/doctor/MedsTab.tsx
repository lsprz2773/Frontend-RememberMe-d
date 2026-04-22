"use client";

import React, { useState } from "react";

const initialDetailMeds = [
    { id: 1, name: "Metformina",  dosage: "850mg", freq: 12, taken: 18, total: 22, is_active: true, source: "doctor"  },
    { id: 2, name: "Lisinopril",  dosage: "10mg",  freq: 24, taken: 14, total: 16, is_active: true, source: "doctor"  },
    { id: 3, name: "Paracetamol", dosage: "500mg", freq: 8,  taken: 5,  total: 6,  is_active: true, source: "patient" },
];

const MedsTab = ({ patient }) => {
    const [meds, setMeds]         = useState(initialDetailMeds);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm]         = useState({
        name: "", dosage: "", freq: "8",
        start: "2026-04-22", end: "", instructions: "",
    });

    const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

    const prescribe = () => {
        if (!form.name.trim() || !form.dosage.trim()) return;
        const freq = parseInt(form.freq);
        setMeds((prev) => [{
            id: Date.now(), name: form.name, dosage: form.dosage,
            freq, taken: 0, total: Math.round(24 / freq), is_active: true, source: "doctor",
        }, ...prev]);
        setForm({ name: "", dosage: "", freq: "8", start: "2026-04-22", end: "", instructions: "" });
        setShowForm(false);
    };

    const removeMed = (id) => setMeds((prev) => prev.filter((m) => m.id !== id));

    return (
        <div>

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="text-[15px] font-bold text-gray-800">
                    Medicamentos del paciente
                    <span className="text-[13px] font-normal ml-2 text-gray-400">
            {meds.filter((m) => m.is_active).length} activos
          </span>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 border-none cursor-pointer transition-colors"
                >
                    <span>+</span> Prescribir medicamento
                </button>
            </div>

            {/* Prescription form */}
            {showForm && (
                <div className="mb-4 p-5 rounded-2xl border-l-4 border-blue-400 bg-blue-50">
                    <div className="font-bold text-sm mb-3.5 text-blue-700">
                        Nueva prescripción para {patient.full_name}
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                        <div>
                            <label className="text-[13px] font-semibold block mb-[5px] text-gray-700">Medicamento</label>
                            <input
                                placeholder="Ej. Metformina"
                                value={form.name}
                                onChange={set("name")}
                                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-[13px] font-semibold block mb-[5px] text-gray-700">Dosis</label>
                            <input
                                placeholder="Ej. 850mg"
                                value={form.dosage}
                                onChange={set("dosage")}
                                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-[13px] font-semibold block mb-[5px] text-gray-700">Frecuencia</label>
                            <select
                                value={form.freq}
                                onChange={set("freq")}
                                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-colors cursor-pointer"
                            >
                                {[["4","Cada 4h"],["6","Cada 6h"],["8","Cada 8h"],["12","Cada 12h"],["24","Una vez al día"]].map(([v, l]) => (
                                    <option key={v} value={v}>{l}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                            <label className="text-[13px] font-semibold block mb-[5px] text-gray-700">Fecha inicio</label>
                            <input
                                type="date"
                                value={form.start}
                                onChange={set("start")}
                                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-[13px] font-semibold block mb-[5px] text-gray-700">Fecha fin (vacío = crónico)</label>
                            <input
                                type="date"
                                value={form.end}
                                onChange={set("end")}
                                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-colors"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-[13px] font-semibold block mb-[5px] text-gray-700">Indicaciones</label>
                        <input
                            placeholder="Ej. Tomar con alimentos, en ayunas..."
                            value={form.instructions}
                            onChange={set("instructions")}
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-colors"
                        />
                    </div>
                    <div className="flex gap-2.5 mt-3.5">
                        <button
                            onClick={prescribe}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 border-none cursor-pointer transition-colors"
                        >
                            ✓ Guardar prescripción
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

            {/* Medication list */}
            <div className="flex flex-col gap-3">
                {meds.map((m) => {
                    const adh   = m.total > 0 ? Math.round((m.taken / m.total) * 100) : 0;
                    const isRx  = m.source === "doctor";
                    const col   = adh >= 80 ? "bg-blue-500" : "bg-amber-400";
                    const colTx = adh >= 80 ? "text-blue-500" : "text-amber-400";

                    return (
                        <div
                            key={m.id}
                            className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 border-l-4 ${isRx ? "border-l-blue-500" : "border-l-violet-400"}`}
                        >
                            <div className="flex items-center gap-3.5">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl ${isRx ? "bg-blue-50 text-blue-500" : "bg-violet-50 text-violet-500"}`}>
                                    💊
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-[3px]">
                                        <span className="text-[15px] font-bold text-gray-800">{m.name}</span>
                                        <span className="text-sm text-gray-400">{m.dosage}</span>
                                        {isRx ? (
                                            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">Rx</span>
                                        ) : (
                                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-violet-50 text-violet-500">Propio</span>
                                        )}
                                    </div>
                                    <div className="text-[13px] text-gray-400">Cada {m.freq}h</div>
                                </div>
                                <div className="text-right min-w-[150px] shrink-0">
                                    <div className="text-[13px] font-semibold mb-1 text-gray-400">
                                        {m.taken}/{m.total} tomas ·{" "}
                                        <span className={colTx}>{adh}%</span>
                                    </div>
                                    <div className="w-full h-[6px] bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${col}`}
                                            style={{ width: `${(m.taken / m.total) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                {isRx && (
                                    <button
                                        onClick={() => removeMed(m.id)}
                                        className="p-2 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 border-none bg-transparent cursor-pointer transition-colors"
                                    >
                                        🗑
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default MedsTab;