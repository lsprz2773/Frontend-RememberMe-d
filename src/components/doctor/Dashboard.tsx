"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import StatCard from "@/components/ui/StatCard";
import Input from "@/components/ui/Input";
import GenerateLinkCode from "@/components/doctor/GenerateLinkCode";
import { C } from "@/lib/Colors";
import { IcUsers, IcChart, IcBell, IcPill, IcLink, IcChevronR, IcSearch } from "@/components/ui/Icons";
import type { DoctorPatient, DoctorDashboardProps } from "@/types";
import type { ApiLinkedPatient } from "@/types/api";

const calcAge = (dob: string): number => {
    const d = new Date(dob);
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
    return age;
};

const mapPatient = (p: ApiLinkedPatient): DoctorPatient => ({
    id:            p.patient_id,
    full_name:     p.full_name,
    age:           p.date_of_birth ? calcAge(p.date_of_birth) : 0,
    linked_at:     p.linked_at.slice(0, 10),
    adherence_pct: Math.round(p.adherence_pct ?? 0),
    streak:        p.streak ?? 0,
    conditions:    p.chronic_conditions ?? "Sin condiciones registradas",
    last_symptom:  p.last_symptom_date?.slice(0, 10) ?? "—",
    alert:         p.high_severity_alert || (p.adherence_pct ?? 100) < 60,
    meds:          p.active_meds_count ?? 0,
});

const adColor = (pct: number): string =>
    pct >= 80 ? C.primary : pct >= 60 ? C.amber : C.coral;

const todayLabel = (): string => {
    const s = new Date().toLocaleDateString("es-MX", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ onSelectPatient, userName }) => {
    const [patients, setPatients] = useState<DoctorPatient[]>([]);
    const [search, setSearch]     = useState<string>("");
    const [loading, setLoading]   = useState<boolean>(true);
    const [error, setError]       = useState<string>("");

    useEffect(() => {
        const load = async (): Promise<void> => {
            try {
                const res  = await fetch("/api/links/patients");
                const data = await res.json() as ApiLinkedPatient[] | { error?: string };
                if (!res.ok) throw new Error((data as { error?: string }).error ?? "Error al cargar pacientes");
                setPatients((data as ApiLinkedPatient[]).map(mapPatient));
            } catch (e) {
                setError(e instanceof Error ? e.message : "Error al cargar pacientes");
            } finally {
                setLoading(false);
            }
        };
        void load();
    }, []);

    const avgAdherence = patients.length > 0
        ? Math.round(patients.reduce((a, p) => a + p.adherence_pct, 0) / patients.length)
        : 0;
    const alerts   = patients.filter((p) => p.alert).length;
    const firstName = userName?.split(" ")[0] ?? "";

    const filtered = patients.filter((p) =>
        p.full_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="mb-7">
                <div className="text-[13px] font-semibold mb-0.5" style={{ color: C.textMuted }}>
                    {todayLabel()}
                </div>
                <h1 className="text-[26px] font-extrabold m-0" style={{ color: C.text }}>
                    Panel Médico
                </h1>
                {firstName && (
                    <p className="text-sm mt-1 mb-0" style={{ color: C.textMuted }}>
                        Bienvenido/a,{" "}
                        <strong style={{ color: C.text }}>Dr/a. {firstName}</strong>
                    </p>
                )}
            </div>

            <div className="grid grid-cols-4 gap-3.5 mb-7">
                <StatCard
                    label="Pacientes"
                    value={loading ? "—" : patients.length}
                    sub="Vinculados activos"
                    icon={<IcUsers size={22} />}
                />
                <StatCard
                    label="Adherencia promedio"
                    value={loading ? "—" : `${avgAdherence}%`}
                    sub="Todos los pacientes"
                    icon={<IcChart size={22} />}
                    accent={avgAdherence >= 80 ? C.primary : C.amber}
                />
                <StatCard
                    label="Alertas activas"
                    value={loading ? "—" : alerts}
                    sub="Requieren atención"
                    icon={<IcBell size={22} />}
                    accent={alerts > 0 ? C.coral : C.primary}
                />
                <StatCard
                    label="Medicamentos totales"
                    value={loading ? "—" : patients.reduce((a, p) => a + p.meds, 0)}
                    sub="De todos los pacientes"
                    icon={<IcPill size={22} />}
                    accent={C.violet}
                />
            </div>

            {!loading && alerts > 0 && (
                <Card
                    className="mb-5"
                    style={{ borderLeft: `4px solid ${C.coral}`, background: C.coralLight }}
                >
                    <div className="flex items-center gap-2.5 mb-3">
                        <IcBell size={18} color={C.coral} />
                        <div className="font-bold text-[15px]" style={{ color: C.coralDark }}>
                            Pacientes que requieren atención
                        </div>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        {patients.filter((p) => p.alert).map((p) => (
                            <div
                                key={p.id}
                                onClick={() => onSelectPatient(p)}
                                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] cursor-pointer flex-1 min-w-[180px]"
                                style={{ background: C.surface, border: `1px solid ${C.coral}` }}
                            >
                                <Avatar name={p.full_name} size={36} color={C.coral} />
                                <div className="flex-1 min-w-0">
                                    <div className="text-[13px] font-bold truncate" style={{ color: C.text }}>
                                        {p.full_name}
                                    </div>
                                    <div className="text-xs font-semibold" style={{ color: C.coral }}>
                                        {p.adherence_pct < 60
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

                    {loading && (
                        <div className="text-sm py-10 text-center" style={{ color: C.textMuted }}>
                            Cargando pacientes…
                        </div>
                    )}

                    {!loading && error && (
                        <div className="py-10 text-center">
                            <div className="text-sm font-semibold mb-1" style={{ color: C.coral }}>{error}</div>
                            <div className="text-xs" style={{ color: C.textMuted }}>
                                Verifica que tengas pacientes vinculados o que el servidor esté activo.
                            </div>
                        </div>
                    )}

                    {!loading && !error && patients.length === 0 && (
                        <div className="text-sm py-10 text-center" style={{ color: C.textMuted }}>
                            Aún no tienes pacientes vinculados.
                            <br />Genera un código y compártelo con tu paciente.
                        </div>
                    )}

                    {!loading && !error && filtered.length > 0 && (
                        <div className="flex flex-col gap-1">
                            {filtered.map((p) => (
                                <div
                                    key={p.id}
                                    onClick={() => onSelectPatient(p)}
                                    className="flex items-center gap-3.5 px-3.5 py-3 rounded-[10px] cursor-pointer transition-colors duration-150"
                                    style={{
                                        background: p.alert ? C.coralLight : "transparent",
                                        border: `1px solid ${p.alert ? C.coral : "transparent"}`,
                                    }}
                                    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                                        if (!p.alert) (e.currentTarget as HTMLDivElement).style.background = C.borderLight;
                                    }}
                                    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                                        if (!p.alert) (e.currentTarget as HTMLDivElement).style.background = "transparent";
                                    }}
                                >
                                    <Avatar name={p.full_name} size={40} color={p.alert ? C.coral : C.primary} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-bold truncate" style={{ color: C.text }}>
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
                                        <div className="text-lg font-extrabold" style={{ color: adColor(p.adherence_pct) }}>
                                            {p.adherence_pct}%
                                        </div>
                                        <div className="text-[11px]" style={{ color: C.textMuted }}>adherencia</div>
                                        <div className="mt-1 w-20">
                                            <ProgressBar value={p.adherence_pct} max={100} color={adColor(p.adherence_pct)} height={5} />
                                        </div>
                                    </div>
                                    <IcChevronR size={16} color={C.textLight} />
                                </div>
                            ))}
                        </div>
                    )}
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
                        <p className="text-[13px] mb-3.5 mt-0" style={{ color: C.textMuted }}>
                            Genera un código único. Tu paciente deberá ingresarlo en las próximas 24 horas.
                        </p>
                        <GenerateLinkCode />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
