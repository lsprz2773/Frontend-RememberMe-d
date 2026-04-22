"use client";

import React, { useState } from "react";

const PatientDetail = ({ patient, onBack }) => {
    const [tab, setTab] = useState("overview");

    if (!patient) return null;

    return (
        <div>

            <button onClick={onBack}>
                ← Volver al panel
            </button>

            <div>
                <div>
                    <div>{patient.full_name}</div>

                    <div>
                        <div>
                            <h2>{patient.full_name}</h2>
                            {patient.alert && <span>Requiere atención</span>}
                            <span>Paciente</span>
                        </div>
                        <div>{patient.conditions}</div>
                        <div>Vinculado desde {patient.linked_at} · {patient.age} años</div>
                    </div>

                    <div>
                        <div>
                            <div>{patient.adherence_pct}%</div>
                            <div>ADHERENCIA</div>
                        </div>
                        <div>
                            <div>{patient.streak}</div>
                            <div>RACHA</div>
                        </div>
                        <div>
                            <div>{patient.meds}</div>
                            <div>MEDICAMENTOS</div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {[
                    ["overview", "Resumen"],
                    ["meds",     "Medicamentos"],
                    ["symptoms", "Síntomas"],
                    ["profile",  "Perfil clínico"],
                ].map(([key, label]) => (
                    <button key={key} onClick={() => setTab(key)}>
                        {label}
                    </button>
                ))}
            </div>

            {tab === "overview" && (
                <div>

                    <div>
                        <div>Adherencia últimos 7 días</div>
                        <div>
                            {[88, 100, 75, 100, 88, 63, 88].map((v, i) => (
                                <div key={i}>
                                    <div style={{ height: `${(v / 100) * 70}px` }} />
                                    <div>{["L","M","M","J","V","S","D"][i]}</div>
                                </div>
                            ))}
                        </div>
                        <div></div>
                        <div>Promedio: <strong>{patient.adherence_pct}%</strong></div>
                    </div>

                    <div>
                        <div>Síntomas recientes</div>
                        <div>
                            {[
                                { id: 1, symptom_name: "Dolor abdominal", severity: 6, entry_date: "2026-04-22", high_severity_alert: false },
                                { id: 2, symptom_name: "Náusea",          severity: 4, entry_date: "2026-04-21", high_severity_alert: false },
                                { id: 3, symptom_name: "Mareo",           severity: 9, entry_date: "2026-04-20", high_severity_alert: true  },
                                { id: 4, symptom_name: "Cefalea",         severity: 5, entry_date: "2026-04-19", high_severity_alert: false },
                            ].map((s) => (
                                <div key={s.id}>
                                    <div>
                                        <div>{s.symptom_name}</div>
                                        <div>{s.entry_date}</div>
                                    </div>
                                    <div>
                                        {s.high_severity_alert && <span>⚠</span>}
                                        <span>{s.severity}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            )}

            {tab === "meds" && (
                <div></div>
            )}

            {tab === "symptoms" && (
                <div>
                    {[
                        { id: 1, symptom_name: "Dolor abdominal", severity: 6, notes: "Leve, después de comer",      entry_date: "2026-04-22", high_severity_alert: false },
                        { id: 2, symptom_name: "Náusea",          severity: 4, notes: "Por la mañana",               entry_date: "2026-04-21", high_severity_alert: false },
                        { id: 3, symptom_name: "Mareo",           severity: 9, notes: "Episodio de 10 min",           entry_date: "2026-04-20", high_severity_alert: true  },
                        { id: 4, symptom_name: "Cefalea",         severity: 5, notes: "Tensional leve",               entry_date: "2026-04-19", high_severity_alert: false },
                        { id: 5, symptom_name: "Fatiga",          severity: 7, notes: "Cansancio desde el mediodía", entry_date: "2026-04-18", high_severity_alert: false },
                    ].map((s) => (
                        <div key={s.id}>
                            <div>
                                <div>
                                    <span>{s.symptom_name}</span>
                                    {s.high_severity_alert && <span>Alta severidad</span>}
                                </div>
                                <div>{s.notes}</div>
                            </div>
                            <div>
                                <span>{s.severity}</span>
                                <div>{s.entry_date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === "profile" && (
                <div>

                    <div>
                        <div>Información personal</div>
                        {[
                            { l: "Nombre completo", v: patient.full_name },
                            { l: "Edad",            v: `${patient.age} años` },
                            { l: "Vinculado desde", v: patient.linked_at },
                        ].map((f) => (
                            <div key={f.l}>
                                <div>{f.l}</div>
                                <div>{f.v}</div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div>Perfil clínico</div>

                        <div>
                            <div>Alergias</div>
                            <div>Penicilina, Aspirina</div>
                        </div>

                        <div>
                            <div>Condiciones crónicas</div>
                            <div>{patient.conditions}</div>
                        </div>

                        <div>
                            <div>Contacto de emergencia</div>
                            <div>María López · +52 961 765 4321</div>
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
};

export default PatientDetail;