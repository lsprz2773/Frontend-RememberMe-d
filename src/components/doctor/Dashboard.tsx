"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import StatCard from "@/components/ui/StatCard";
import Input from "@/components/ui/Input";
import GenerateLinkCode from "@/components/doctor/GenerateLinkCode";
import { C } from "@/lib/colors";
import { IcUsers, IcChart, IcBell, IcPill, IcLink, IcChevronR, IcSearch } from "@/components/ui/Icons";

export interface DoctorPatient {
    id: number;
    full_name: string;
    age: number;
    linked_at: string;
    adherence_pct: number;
    streak: number;
    conditions: string;
    last_symptom: string;
    alert: boolean;
    meds: number;
}

interface DoctorDashboardProps {
    onSelectPatient: (patient: DoctorPatient) => void;
}

const doctorPatients: DoctorPatient[] = [
    { id: 3, full_name: "Juan Pérez López",   age: 31, linked_at: "2026-03-01", adherence_pct: 87, streak: 5,  conditions: "Diabetes tipo 2, Hipertensión", last_symptom: "2026-04-22", alert: false, meds: 3 },
    { id: 5, full_name: "Carla Ruiz Morales", age: 46, linked_at: "2026-02-14", adherence_pct: 62, streak: 0,  conditions: "Hipotiroidismo",                last_symptom: "2026-04-21", alert: true,  meds: 2 },
    { id: 7, full_name: "Roberto Gómez Díaz", age: 58, linked_at: "2026-01-20", adherence_pct: 94, streak: 12, conditions: "Diabetes tipo 2",                last_symptom: "2026-04-20", alert: false, meds: 4 },
    { id: 9, full_name: "Laura Mendoza Cruz", age: 34, linked_at: "2026-03-18", adherence_pct: 45, streak: 0,  conditions: "Hipertensión, Ansiedad",         last_symptom: "2026-04-22", alert: true,  meds: 3 },
];

const adColor = (pct: number): string =>
    pct >= 80 ? C.primary : pct >= 60 ? C.amber : C.coral;

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ onSelectPatient }) => {
    const [search, setSearch] = useState<string>("");

    const avgAdherence = Math.round(
        doctorPatients.reduce((a, p) => a + p.adherence_pct, 0) / doctorPatients.length
    );
    const alerts = doctorPatients.filter((p) => p.alert).length;

    const filtered = doctorPatients.filter((p) =>
        p.full_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="mb-7">
                <div
                    className="text-[13px] font-semibold mb-0.5"
                    style={{ color: C.textMuted }}
                >
                    Martes 22 de abril, 2026
                </div>
                <h1
                    className="text-[26px] font-extrabold m-0"
                    style={{ color: C.text }}
                >
                    Panel Médico
                </h1>
                <p
                    className="text-sm mt-1 mb-0"
                    style={{ color: C.textMuted }}
                >
                    Bienvenida,{" "}
                    <strong style={{ color: C.text }}>Dra. Ana López</strong>
                </p>
            </div>

            <div className="grid grid-cols-4 gap-3.5 mb-7">
                <StatCard
                    label="Pacientes"
                    value={doctorPatients.length}
                    sub="Vinculados activos"
                    icon={<IcUsers size={22} />}
                />
                <StatCard
                    label="Adherencia promedio"
                    value={`${avgAdherence}%`}
                    sub="Todos los pacientes"
                    icon={<IcChart size={22} />}
                    accent={avgAdherence >= 80 ? C.primary : C.amber}
                />
                <StatCard
                    label="Alertas activas"
                    value={alerts}
                    sub="Requieren atención"
                    icon={<IcBell size={22} />}
                    accent={alerts > 0 ? C.coral : C.primary}
                />
                <StatCard
                    label="Esta semana"
                    value="148"
                    sub="Tomas registradas"
                    icon={<IcPill size={22} />}
                    accent={C.violet}
                />
            </div>

            {alerts > 0 && (
                <Card
                    className="mb-5"
                    style={{
                        borderLeft: `4px solid ${C.coral}`,
                        background: C.coralLight,
                    }}
                >
                    <div className="flex items-center gap-2.5 mb-3">
                        <IcBell size={18} color={C.coral} />
                        <div
                            className="font-bold text-[15px]"
                            style={{ color: "oklch(0.40 0.15 25)" }}
                        >
                            Pacientes que requieren atención
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {doctorPatients
                            .filter((p) => p.alert)
                            .map((p) => (
                                <div
                                    key={p.id}
                                    onClick={() => onSelectPatient(p)}
                                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] cursor-pointer flex-1"
                                    style={{
                                        background: C.surface,
                                        border: `1px solid ${C.coral}44`,
                                    }}
                                >
                                    <Avatar name={p.full_name} size={36} color={C.coral} />
                                    <div className="flex-1 min-w-0">
                                        <div
                                            className="text-[13px] font-bold truncate"
                                            style={{ color: C.text }}
                                        >
                                            {p.full_name}
                                        </div>
                                        <div
                                            className="text-xs font-semibold"
                                            style={{ color: C.coral }}
                                        >
                                            {p.adherence_pct < 70
                                                ? `Adherencia baja: ${p.adherence_pct}%`
                                                : "Síntoma de alta severidad"}
                                        </div>
                                    </div>
                                    <IcChevronR size={16} color={C.coral} />
                                </div>
                            ))}
                    </div>
                </Card>
            )}

            <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 320px" }}>
                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <div className="font-bold text-base" style={{ color: C.text }}>
                            Mis Pacientes
                        </div>
                        <div className="w-[220px]">
                            <Input
                                placeholder="Buscar paciente..."
                                value={search}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                                icon={<IcSearch size={15} />}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-0.5">
                        {filtered.map((p) => (
                            <div
                                key={p.id}
                                onClick={() => onSelectPatient(p)}
                                className="flex items-center gap-3.5 px-3.5 py-3 rounded-[10px] cursor-pointer transition-colors duration-150"
                                style={{
                                    background: p.alert ? C.coralLight : "transparent",
                                    border: `1px solid ${p.alert ? C.coral + "33" : "transparent"}`,
                                }}
                                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                                    if (!p.alert)
                                        (e.currentTarget as HTMLDivElement).style.background = C.borderLight;
                                }}
                                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                                    if (!p.alert)
                                        (e.currentTarget as HTMLDivElement).style.background = "transparent";
                                }}
                            >
                                <Avatar
                                    name={p.full_name}
                                    size={40}
                                    color={p.alert ? C.coral : C.primary}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                    <span
                        className="text-sm font-bold truncate"
                        style={{ color: C.text }}
                    >
                      {p.full_name}
                    </span>
                                        {p.alert && (
                                            <span className="shrink-0">
                        <Badge label="Alerta" variant="alert" dot />
                      </span>
                                        )}
                                    </div>
                                    <div className="text-xs truncate" style={{ color: C.textMuted }}>
                                        {p.conditions} · {p.meds} medicamentos
                                    </div>
                                </div>
                                <div className="text-right min-w-[80px] shrink-0">
                                    <div
                                        className="text-lg font-extrabold"
                                        style={{ color: adColor(p.adherence_pct) }}
                                    >
                                        {p.adherence_pct}%
                                    </div>
                                    <div className="text-[11px]" style={{ color: C.textMuted }}>
                                        adherencia
                                    </div>
                                    <div className="mt-1 w-20">
                                        <ProgressBar
                                            value={p.adherence_pct}
                                            max={100}
                                            color={adColor(p.adherence_pct)}
                                            height={5}
                                        />
                                    </div>
                                </div>
                                <IcChevronR size={16} color={C.textLight} />
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="flex flex-col gap-4">
                    <Card>
                        <div className="flex items-center gap-2.5 mb-4">
                            <div
                                className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                                style={{ background: C.violetLight, color: C.violet }}
                            >
                                <IcLink size={18} />
                            </div>
                            <div className="font-bold text-[15px]" style={{ color: C.text }}>
                                Vincular nuevo paciente
                            </div>
                        </div>
                        <p
                            className="text-[13px] mb-3.5 mt-0"
                            style={{ color: C.textMuted }}
                        >
                            Genera un código único. Tu paciente deberá ingresarlo en las próximas 24 horas.
                        </p>
                        <GenerateLinkCode />
                    </Card>

                    <Card
                        style={{
                            background: C.primaryLight,
                            border: `1px solid ${C.primaryMid}`,
                        }}
                    >
                        <div
                            className="text-[13px] font-bold mb-3"
                            style={{ color: C.primaryDark }}
                        >
                            Resumen de la semana
                        </div>
                        {[
                            { label: "Tomas registradas",   value: "148" },
                            { label: "Síntomas reportados", value: "23"  },
                            { label: "Alertas generadas",   value: "5"   },
                        ].map((x) => (
                            <div
                                key={x.label}
                                className="flex justify-between text-[13px] mb-2"
                            >
                                <span style={{ color: C.textMuted }}>{x.label}</span>
                                <span className="font-bold" style={{ color: C.text }}>
                  {x.value}
                </span>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export { doctorPatients };
export default DoctorDashboard;