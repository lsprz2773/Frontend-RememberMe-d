"use client";

import React from "react";

const personalFields = [
    { label: "Correo electrónico",  value: "juan.perez@email.com"         },
    { label: "Teléfono",            value: "+52 961 123 4567"             },
    { label: "Fecha de nacimiento", value: "20 de abril, 1995 (31 años)" },
    { label: "Registro",            value: "5 de febrero, 2026"          },
];

const PatientProfile = () => (
    <div>

        <div className="mb-7">
            <h1 className="text-[26px] font-extrabold m-0 text-gray-800">Mi Perfil</h1>
            <p className="text-sm mt-1 mb-0 text-gray-400">Información personal y perfil clínico</p>
        </div>

        <div className="grid grid-cols-2 gap-5">

            <div className="flex flex-col gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold shrink-0">
                            J
                        </div>
                        <div>
                            <div className="text-lg font-extrabold text-gray-800">Juan Pérez López</div>
                            <div className="text-sm mb-1.5 text-gray-400">31 años · Paciente</div>
                            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Paciente
              </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {personalFields.map((f) => (
                            <div key={f.label} className="px-3 py-2.5 rounded-lg bg-gray-100">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.04em] mb-0.5 text-gray-400">
                                    {f.label}
                                </div>
                                <div className="text-sm font-semibold text-gray-800">{f.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="font-bold text-[15px] mb-4 text-gray-800">Perfil clínico</div>

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
                        <div className="text-sm text-gray-800">Diabetes tipo 2, Hipertensión</div>
                    </div>

                    <div className="px-3.5 py-3 rounded-lg bg-blue-50 border-l-[3px] border-l-blue-400">
                        <div className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1 text-blue-700">
                            Contacto de emergencia
                        </div>
                        <div className="text-sm text-gray-800">María López · +52 961 765 4321</div>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                    <div className="text-[13px] font-bold mb-3 text-blue-700">
                        Estadísticas de adherencia
                    </div>
                    {[
                        { label: "Este mes",      value: "87%"       },
                        { label: "Semana actual", value: "92%"       },
                        { label: "Racha actual",  value: "5 días 🔥" },
                        { label: "Mejor racha",   value: "12 días"   },
                    ].map((x) => (
                        <div key={x.label} className="flex justify-between text-[13px] mb-2">
                            <span className="text-gray-400">{x.label}</span>
                            <span className="font-bold text-gray-800">{x.value}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    </div>
);

export default PatientProfile;