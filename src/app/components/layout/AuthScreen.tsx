"use client";

import React, { useState } from "react";

type AuthMode = "login" | "register";
type UserRole = "PATIENT" | "DOCTOR";

const AuthScreen = ({ onLogin }) => {
    const [mode, setMode] = useState<AuthMode>("login");
    const [role, setRole] = useState<UserRole>("PATIENT");
    const [form, setForm] = useState({
        email: "", password: "", full_name: "", phone: "", dob: "",
    });

    const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

    return (
        <div>

            <div>
                <div>
                    <div>RememberMe-d</div>
                    <h2>Tu adherencia terapéutica, siempre contigo.</h2>
                    <p>Gestiona medicamentos, registra síntomas y mantén a tu médico informado en tiempo real.</p>
                </div>
                <div>
                    <div>Recordatorios de tomas personalizados</div>
                    <div>Seguimiento de síntomas diario</div>
                    <div>Vinculación directa con tu médico</div>
                </div>
            </div>

            <div>
                <div>
                    <h1>{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</h1>
                    <p>
                        {mode === "login" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
                        <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
                            {mode === "login" ? "Regístrate gratis" : "Inicia sesión"}
                        </button>
                    </p>
                </div>

                <div>
                    {mode === "register" && (
                        <>
                            <input placeholder="Ana González Martínez" value={form.full_name} onChange={set("full_name")} />

                            <div>
                                <div>Tipo de cuenta</div>
                                <div>
                                    {[
                                        ["PATIENT", "Paciente",  "Gestiona tu tratamiento"   ],
                                        ["DOCTOR",  "Médico",    "Monitorea a tus pacientes" ],
                                    ].map(([val, name, desc]) => (
                                        <div key={val} onClick={() => setRole(val as UserRole)}>
                                            <div>{name}</div>
                                            <div>{desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <input placeholder="+52 961 000 0000" value={form.phone} onChange={set("phone")} />
                            <input type="date" value={form.dob} onChange={set("dob")} />
                        </>
                    )}

                    <input placeholder="correo@ejemplo.com" type="email" value={form.email} onChange={set("email")} />
                    <input placeholder="••••••••" type="password" value={form.password} onChange={set("password")} />

                    <button onClick={() => onLogin(mode === "register" ? role : null)}>
                        {mode === "login" ? "Entrar a mi cuenta" : "Crear cuenta"}
                    </button>

                    {mode === "login" && (
                        <div>
                            <button onClick={() => onLogin("PATIENT")}>Demo Paciente</button>
                            <button onClick={() => onLogin("DOCTOR")}>Demo Médico</button>
                        </div>
                    )}
                </div>

                <p>Al continuar aceptas los Términos de uso y la Política de privacidad.</p>
            </div>

        </div>
    );
};

export default AuthScreen;