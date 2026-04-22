"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Btn from "@/components/ui/Button";
import { C } from "@/lib/Colors";
import { IcCheck, IcActivity, IcUsers, IcUser, IcPill } from "@/components/ui/Icons";
import type { AuthScreenProps, UserRole } from "@/types";

interface AuthForm {
    email: string;
    password: string;
    full_name: string;
    phone: string;
    dob: string;
}

type AuthMode = "login" | "register";

const brandFeatures = [
    { icon: <IcCheck size={16} />,    label: "Recordatorios de tomas personalizados" },
    { icon: <IcActivity size={16} />, label: "Seguimiento de síntomas diario"        },
    { icon: <IcUsers size={16} />,    label: "Vinculación directa con tu médico"     },
];

const decorativeCircles: Array<[string, string, number]> = [
    ["-80px", "-80px", 320],
    ["-40px", "60%",   180],
    ["70%",   "80%",   240],
];

const roleOptions: Array<[UserRole, string, string, React.ReactNode]> = [
    ["PATIENT", "Paciente", "Gestiona tu tratamiento",  <IcUser size={20} />  ],
    ["DOCTOR",  "Médico",   "Monitorea a tus pacientes", <IcUsers size={20} />],
];

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
    const [mode, setMode]       = useState<AuthMode>("login");
    const [role, setRole]       = useState<UserRole>("PATIENT");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError]     = useState<string>("");
    const [form, setForm]       = useState<AuthForm>({
        email: "", password: "", full_name: "", phone: "", dob: "",
    });

    const set =
        (k: keyof AuthForm) =>
            (e: React.ChangeEvent<HTMLInputElement>): void => {
                setError("");
                setForm((p) => ({ ...p, [k]: e.target.value }));
            };

    const handleSubmit = async (): Promise<void> => {
        setError("");
        setLoading(true);
        try {
            const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
            const body =
                mode === "login"
                    ? { email: form.email, password: form.password }
                    : {
                          email: form.email,
                          password: form.password,
                          full_name: form.full_name,
                          phone: form.phone || undefined,
                          date_of_birth: form.dob || undefined,
                          role,
                      };

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error ?? "Error al autenticarse");
                return;
            }

            onLogin({ role: data.user.role as UserRole, full_name: data.user.full_name });
        } catch {
            setError("No se pudo conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen" style={{ fontFamily: "Nunito, sans-serif" }}>

            <div
                className="flex flex-col justify-between shrink-0 relative overflow-hidden"
                style={{ width: 480, background: C.primaryDark, padding: "48px 44px" }}
            >
                {decorativeCircles.map(([top, left, size], i) => (
                    <div
                        key={i}
                        className="absolute pointer-events-none rounded-full"
                        style={{ top, left, width: size, height: size, border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                ))}

                <div>
                    <div className="flex items-center gap-3 mb-16">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.15)" }}
                        >
                            <IcPill size={22} color="#fff" />
                        </div>
                        <span className="text-xl font-extrabold tracking-[-0.02em]" style={{ color: "#fff" }}>
              RememberMe<span style={{ opacity: 0.6 }}>-d</span>
            </span>
                    </div>
                    <h2 className="text-[32px] font-extrabold leading-[1.2] mb-4" style={{ color: "#fff" }}>
                        Tu adherencia terapéutica,<br />siempre contigo.
                    </h2>
                    <p className="text-[15px] leading-relaxed m-0" style={{ color: "rgba(255,255,255,0.65)" }}>
                        Gestiona medicamentos, registra síntomas y mantén a tu médico informado en tiempo real.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {brandFeatures.map(({ icon, label }) => (
                        <div
                            key={label}
                            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px]"
                            style={{ background: "rgba(255,255,255,0.08)" }}
                        >
                            <span className="flex" style={{ color: "rgba(255,255,255,0.8)" }}>{icon}</span>
                            <span className="text-[13px] font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>
                {label}
              </span>
                        </div>
                    ))}
                </div>
            </div>

            <div
                className="flex-1 flex items-center justify-center overflow-y-auto p-10"
                style={{ background: C.bg }}
            >
                <div className="w-full max-w-[400px]">
                    <div className="mb-8">
                        <h1 className="text-[26px] font-extrabold mb-1.5" style={{ color: C.text }}>
                            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
                        </h1>
                        <p className="text-sm m-0" style={{ color: C.textMuted }}>
                            {mode === "login" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
                            <button
                                onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
                                className="bg-transparent border-none font-bold cursor-pointer p-0 text-sm"
                                style={{ color: C.primary, fontFamily: "Nunito, sans-serif" }}
                            >
                                {mode === "login" ? "Regístrate gratis" : "Inicia sesión"}
                            </button>
                        </p>
                    </div>

                    <div className="flex flex-col gap-3.5">
                        {mode === "register" && (
                            <>
                                <Input
                                    label="Nombre completo"
                                    placeholder="Ana González Martínez"
                                    value={form.full_name}
                                    onChange={set("full_name")}
                                    required
                                />

                                <div>
                                    <label className="text-[13px] font-semibold block mb-2" style={{ color: C.text }}>
                                        Tipo de cuenta <span style={{ color: C.coral }}>*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {roleOptions.map(([val, name, desc, icon]) => (
                                            <div
                                                key={val}
                                                onClick={() => setRole(val)}
                                                className="px-4 py-3.5 rounded-[10px] cursor-pointer transition-all duration-150"
                                                style={{
                                                    border:     `2px solid ${role === val ? C.primary : C.border}`,
                                                    background:  role === val ? C.primaryLight : C.surface,
                                                }}
                                            >
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span style={{ color: role === val ? C.primary : C.textMuted }}>{icon}</span>
                                                    <span className="text-sm font-bold" style={{ color: C.text }}>{name}</span>
                                                </div>
                                                <div className="text-xs" style={{ color: C.textMuted }}>{desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Input
                                    label="Teléfono"
                                    placeholder="+52 961 000 0000"
                                    value={form.phone}
                                    onChange={set("phone")}
                                />
                                <Input
                                    label="Fecha de nacimiento"
                                    type="date"
                                    value={form.dob}
                                    onChange={set("dob")}
                                    required
                                />
                            </>
                        )}

                        <Input
                            label="Correo electrónico"
                            placeholder="correo@ejemplo.com"
                            type="email"
                            value={form.email}
                            onChange={set("email")}
                            required
                        />
                        <Input
                            label="Contraseña"
                            placeholder="••••••••"
                            type="password"
                            value={form.password}
                            onChange={set("password")}
                            required
                        />

                        {error && (
                            <div
                                className="px-3.5 py-2.5 rounded-lg text-[13px] font-semibold"
                                style={{ background: C.coralLight, color: C.coralDark }}
                            >
                                {error}
                            </div>
                        )}

                        <Btn
                            full
                            size="lg"
                            style={{ marginTop: 4 }}
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading
                                ? "Cargando..."
                                : mode === "login"
                                    ? "Entrar a mi cuenta"
                                    : "Crear cuenta"}
                        </Btn>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AuthScreen;
