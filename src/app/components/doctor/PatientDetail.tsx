// components/doctor/PatientDetail.tsx

"use client";

import React, { useState } from "react";

const PatientDetail = ({ patient, onBack }) => {
    const [tab, setTab] = useState("overview");

    if (!patient) return null;

    return (
        <div className="p-6">

            <button
                onClick={onBack}
                className="flex items-center gap-1.5 bg-transparent border-none text-sm font-semibold cursor-pointer mb-5 p-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
                ← Volver al panel
            </button>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">
                <div className="flex items-center gap-4">

                    <div className="w-[60px] h-[60px] rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
                        {patient.full_name?.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                            <h2 className="text-xl font-extrabold m-0 truncate text-gray-800">
                                {patient.full_name}
                            </h2>
                            {patient.alert && (
                                <span className="shrink-0 bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                  Requiere atención
                </span>
                            )}
                            <span className="shrink-0 bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Paciente
              </span>
                        </div>
                        <div className="text-sm truncate text-gray-500">
                            {patient.conditions}
                        </div>
                        <div className="text-[13px] text-gray-400">
                            Vinculado desde {patient.linked_at} · {patient.age} años
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3.5 text-center shrink-0">
                        <div className="px-5 py-3 rounded-[10px] bg-blue-50">
                            <div className="text-2xl font-extrabold text-blue-500">
                                {patient.adherence_pct}%
                            </div>
                            <div className="text-[11px] font-semibold tracking-wide text-gray-400">
                                ADHERENCIA
                            </div>
                        </div>
                        <div className="px-5 py-3 rounded-[10px] bg-blue-50">
                            <div className="text-2xl font-extrabold text-blue-500">
                                {patient.streak}
                            </div>
                            <div className="text-[11px] font-semibold tracking-wide text-gray-400">
                                RACHA
                            </div>
                        </div>
                        <div className="px-5 py-3 rounded-[10px] bg-gray-100">
                            <div className="text-2xl font-extrabold text-gray-700">
                                {patient.meds}
                            </div>
                            <div className="text-[11px] font-semibold tracking-wide text-gray-400">
                                MEDICAMENTOS
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex gap-1 mb-5 p-1 rounded-[10px] w-fit bg-gray-100">
                {[
                    ["overview", "Resumen"],
                    ["meds",     "Medicamentos"],
                    ["symptoms", "Síntomas"],
                    ["profile",  "Perfil clínico"],
                ].map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setTab(key)}
                        className={`px-[18px] py-2 rounded-lg text-[13px] font-semibold border-none cursor-pointer transition-all duration-150
              ${tab === key
                            ? "bg-white text-gray-800 shadow-sm"
                            : "bg-transparent text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {tab === "overview" && (
                <div className="grid grid-cols-2 gap-5">

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="font-bold text-[15px] mb-4 text-gray-800">
                            Adherencia últimos 7 días
                        </div>
                        <div className="flex items-end gap-2 h-20 mb-3">
                            {[88, 100, 75, 100, 88, 63, 88].map((v, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-[3px]">
                                    <div
                                        className={`w-full rounded-t-[3px] ${v >= 80 ? "bg-blue-500" : "bg-amber-400"}`}
                                        style={{ height: `${(v / 100) * 70}px`, minHeight: 4 }}
                                    />
                                    <div className="text-[10px] text-gray-400">
                                        {["L","M","M","J","V","S","D"][i]}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${patient.adherence_pct}%` }}
                            />
                        </div>
                        <div className="text-xs mt-1.5 text-gray-400">
                            Promedio: <strong className="text-blue-500">{patient.adherence_pct}%</strong>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="font-bold text-[15px] mb-4 text-gray-800">
                            Síntomas recientes
                        </div>
                        <div className="flex flex-col gap-2">
                            {[
                                { id: 1, symptom_name: "Dolor abdominal", severity: 6, entry_date: "2026-04-22", high_severity_alert: false },
                                { id: 2, symptom_name: "Náusea",          severity: 4, entry_date: "2026-04-21", high_severity_alert: false },
                                { id: 3, symptom_name: "Mareo",           severity: 9, entry_date: "2026-04-20", high_severity_alert: true  },
                                { id: 4, symptom_name: "Cefalea",         severity: 5, entry_date: "2026-04-19", high_severity_alert: false },
                            ].map((s) => (
                                <div
                                    key={s.id}
                                    className={`flex items-center justify-between px-3 py-2 rounded-lg gap-2 ${s.high_severity_alert ? "bg-red-50" : "bg-gray-100"}`}
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="text-[13px] font-semibold truncate text-gray-800">
                                            {s.symptom_name}
                                        </div>
                                        <div className="text-[11px] text-gray-400">{s.entry_date}</div>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {s.high_severity_alert && (
                                            <span className="bg-red-100 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full">⚠</span>
                                        )}
                                        {/* SeverityDot */}
                                        <span
                                            className={`w-3 h-3 rounded-full inline-block ${
                                                s.severity >= 8 ? "bg-red-500" :
                                                    s.severity >= 5 ? "bg-amber-400" : "bg-green-400"
                                            }`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            )}

            {tab === "meds" && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    {/* MedsTab component */}
                </div>
            )}

            {tab === "symptoms" && (
                <div className="flex flex-col gap-2.5">
                    {[
                        { id: 1, symptom_name: "Dolor abdominal", severity: 6, notes: "Leve, después de comer",      entry_date: "2026-04-22", high_severity_alert: false },
                        { id: 2, symptom_name: "Náusea",          severity: 4, notes: "Por la mañana",               entry_date: "2026-04-21", high_severity_alert: false },
                        { id: 3, symptom_name: "Mareo",           severity: 9, notes: "Episodio de 10 min",           entry_date: "2026-04-20", high_severity_alert: true  },
                        { id: 4, symptom_name: "Cefalea",         severity: 5, notes: "Tensional leve",               entry_date: "2026-04-19", high_severity_alert: false },
                        { id: 5, symptom_name: "Fatiga",          severity: 7, notes: "Cansancio desde el mediodía", entry_date: "2026-04-18", high_severity_alert: false },
                    ].map((s) => (
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
                                            <span className="shrink-0 bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                        Alta severidad
                      </span>
                                        )}
                                    </div>
                                    <div className="text-[13px] text-gray-500">{s.notes}</div>
                                </div>
                                <div className="text-right shrink-0">
                                    <span
                                        className={`w-3 h-3 rounded-full inline-block ${
                                            s.severity >= 8 ? "bg-red-500" :
                                                s.severity >= 5 ? "bg-amber-400" : "bg-green-400"
                                        }`}
                                    />
                                    <div className="text-xs mt-1 text-gray-400">{s.entry_date}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === "profile" && (
                <div className="grid grid-cols-2 gap-5">

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="font-bold text-[15px] mb-4 text-gray-800">
                            Información personal
                        </div>
                        {[
                            { l: "Nombre completo", v: patient.full_name },
                            { l: "Edad",            v: `${patient.age} años` },
                            { l: "Vinculado desde", v: patient.linked_at },
                        ].map((f) => (
                            <div key={f.l} className="px-3 py-2.5 rounded-lg mb-2 bg-gray-100">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.04em] mb-0.5 text-gray-400">
                                    {f.l}
                                </div>
                                <div className="text-sm font-semibold text-gray-800">{f.v}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="font-bold text-[15px] mb-4 text-gray-800">
                            Perfil clínico
                        </div>

                        <div className="px-3.5 py-3 rounded-lg mb-2.5 bg-red-50 border-l-[3px] border-l-red-400">
                            <div className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1 text-red-700">
                                Alergias
                            </div>
                            <div className="text-sm text-gray-800">Penicilina, Aspirina</div>
                        </div>

                        <div className="px-3.5 py-3 rounded-lg mb-2.5 bg-amber-50 border-l-[3px] border-l-amber-400">
                            <div className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1 text-amber-700">
                                Condiciones crónicas
                            </div>
                            <div className="text-sm text-gray-800">{patient.conditions}</div>
                        </div>

                        <div className="px-3.5 py-3 rounded-lg bg-blue-50 border-l-[3px] border-l-blue-400">
                            <div className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1 text-blue-700">
                                Contacto de emergencia
                            </div>
                            <div className="text-sm text-gray-800">
                                María López · +52 961 765 4321
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default PatientDetail;