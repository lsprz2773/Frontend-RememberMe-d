"use client";

import React, { useState } from "react";

const doctorAccess = [
    "Tu historial de tomas y adherencia",
    "Registro de síntomas con severidad",
    "Lista de medicamentos activos y propios",
    "Estadísticas de evolución clínica",
];

const PatientMyDoctor = () => {
    const [linked, setLinked] = useState(true);
    const [code, setCode]     = useState("");

    const handleClaim = () => {
        if (code.trim().length >= 4) setLinked(true);
    };

    if (linked) {
        return (
            <div>
                <div className="mb-7">
                    <h1 className="text-[26px] font-extrabold m-0 text-gray-800">Mi Médico</h1>
                    <p className="text-sm mt-1 mb-0 text-gray-400">Médico vinculado activamente</p>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-14 h-14 rounded-full bg-violet-500 text-white flex items-center justify-center text-xl font-bold shrink-0">
                                D
                            </div>
                            <div className="min-w-0">
                                <div className="text-base font-extrabold truncate text-gray-800">
                                    Dra. Ana López Ramírez
                                </div>
                                <div className="text-sm font-semibold text-violet-500">Endocrinología</div>
                                <div className="text-[13px] text-gray-400">Clínica San José</div>
                            </div>
                        </div>

                        {[
                            { label: "Vinculados desde",  value: "2026-03-01"      },
                            { label: "Reportes enviados", value: "12 reportes"     },
                            { label: "Acceso a mis datos",value: "Meds + síntomas" },
                        ].map((f) => (
                            <div key={f.label} className="px-3 py-2.5 rounded-lg mb-2 bg-gray-100">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.04em] mb-0.5 text-gray-400">
                                    {f.label}
                                </div>
                                <div className="text-sm font-semibold text-gray-800">{f.value}</div>
                            </div>
                        ))}

                        <div className="mt-4">
                            <button
                                onClick={() => setLinked(false)}
                                className="w-full py-2 rounded-lg text-sm font-semibold text-gray-500 bg-transparent border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                Desvincular médico
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <div className="font-bold text-[15px] mb-4 text-gray-800">
                                ¿Qué puede ver tu médico?
                            </div>
                            <div className="flex flex-col gap-2">
                                {doctorAccess.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-blue-50"
                                    >
                                        <span className="text-blue-500 text-sm font-bold">✓</span>
                                        <span className="text-[13px] font-semibold text-gray-800">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                            <div className="font-bold text-[14px] mb-2 text-gray-800">
                                ¿Quieres cambiar de médico?
                            </div>
                            <p className="text-[13px] mb-3 mt-0 text-gray-400">
                                Primero deberás desvincular a tu médico actual. Luego podrás ingresar
                                un nuevo código de vinculación.
                            </p>
                            <button
                                onClick={() => setLinked(false)}
                                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-gray-500 bg-transparent border border-gray-300 hover:bg-white cursor-pointer transition-colors"
                            >
                                Solicitar cambio
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-7">
                <h1 className="text-[26px] font-extrabold m-0 text-gray-800">
                    Vincular con un médico
                </h1>
                <p className="text-sm mt-1 mb-0 text-gray-400">
                    Ingresa el código que te proporcionó tu médico
                </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100" style={{ maxWidth: 420 }}>
                <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center mb-4 text-xl">
                    🔗
                </div>
                <div className="mb-3">
                    <label className="text-[13px] font-semibold block mb-[5px] text-gray-700">
                        Código de vinculación
                    </label>
                    <input
                        placeholder="Ej. AB3X7K"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-blue-400 transition-colors tracking-widest font-bold"
                    />
                </div>
                <button
                    onClick={handleClaim}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 border-none cursor-pointer transition-colors"
                >
                    ✓ Vincular con médico
                </button>
                <p className="text-[12px] text-center mt-3 mb-0 text-gray-400">
                    El código expira en 24 horas. Solicita uno nuevo si ya venció.
                </p>
            </div>
        </div>
    );
};

export default PatientMyDoctor;