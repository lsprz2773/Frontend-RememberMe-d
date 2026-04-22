"use client";

import React, { useState } from "react";

const PatientSymptoms = () => {
    const [showForm, setShowForm] = useState(false);
    const [list, setList] = useState(initialSymptoms);
    const [form, setForm] = useState({
        name: "", severity: 5, date: "2026-04-22", notes: "",
    });

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

            <div>
                <div>
                    <h1>Mi Evolución</h1>
                    <p>Seguimiento de síntomas y alertas</p>
                </div>
                <button onClick={() => setShowForm(!showForm)}>Registrar síntoma</button>
            </div>

            {showForm && (
                <div>
                    <div>Nuevo registro de síntoma</div>
                    <div>
                        <input
                            placeholder="Ej. Dolor de cabeza"
                            value={form.name}
                            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        />
                        <input
                            type="date"
                            value={form.date}
                            onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                        />
                    </div>
                    <div>
                        <div>
                            <span>Severidad</span>
                            <span>{form.severity}/10</span>
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={10}
                            value={form.severity}
                            onChange={(e) => setForm((p) => ({ ...p, severity: parseInt(e.target.value) }))}
                        />
                        <div>
                            <span>Leve</span>
                            <span>Moderado</span>
                            <span>Severo</span>
                        </div>
                    </div>
                    <input
                        placeholder="Describe el síntoma..."
                        value={form.notes}
                        onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                    />
                    {form.severity >= 8 && (
                        <div>Severidad alta — tu médico recibirá una alerta automática</div>
                    )}
                    <div>
                        <button onClick={save}>Guardar registro</button>
                        <button onClick={() => setShowForm(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            <div>
                <div>Severidad últimos 7 días</div>
                <div>
                    {list.slice(0, 7).reverse().map((s, i) => (
                        <div key={i}>
                            <div>{s.severity}</div>
                            <div style={{ height: `${(s.severity / 10) * 72}px` }} />
                            <div>{s.entry_date.slice(5)}</div>
                        </div>
                    ))}
                </div>
                <div>
                    <div><span /> Leve (1-4)</div>
                    <div><span /> Moderado (5-7)</div>
                    <div><span /> Severo (8-10)</div>
                </div>
            </div>

            <div>
                {list.map((s) => (
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
                        <button onClick={() => remove(s.id)}>Eliminar</button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default PatientSymptoms;