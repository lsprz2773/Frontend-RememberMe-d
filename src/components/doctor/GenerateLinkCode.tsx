"use client";

import React, { useState } from "react";
import Btn from "@/components/ui/Button";
import { C } from "@/lib/Colors";
import { IcPlus } from "@/components/ui/Icons";
import type { ApiDoctorPatientLink } from "@/types/api";

const GenerateLinkCode: React.FC = () => {
    const [link, setLink]       = useState<ApiDoctorPatientLink | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError]     = useState<string>("");

    const generate = async (): Promise<void> => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/links/generate", { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Error al generar código");
            setLink(data as ApiDoctorPatientLink);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Error al generar código");
        } finally {
            setLoading(false);
        }
    };

    if (link) {
        return (
            <div>
                <div
                    className="rounded-xl p-4 text-center mb-3"
                    style={{
                        background: C.surface,
                        border: `2px dashed ${C.violet}`,
                    }}
                >
                    <div
                        className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-1.5"
                        style={{ color: C.textMuted }}
                    >
                        Código de vinculación
                    </div>
                    <div
                        className="text-[32px] font-black tracking-[0.2em]"
                        style={{ color: C.violet }}
                    >
                        {link.link_code}
                    </div>
                    <div className="text-[11px] mt-1.5" style={{ color: C.textMuted }}>
                        Expira en 24 horas
                    </div>
                </div>
                {error && (
                    <div className="mb-2 px-3 py-2 rounded-lg text-[13px] font-semibold" style={{ background: C.coralLight, color: C.coralDark }}>
                        {error}
                    </div>
                )}
                <Btn variant="ghost" full size="sm" disabled={loading} onClick={() => void generate()}>
                    {loading ? "Generando…" : "Generar nuevo código"}
                </Btn>
            </div>
        );
    }

    return (
        <>
            {error && (
                <div className="mb-2 px-3 py-2 rounded-lg text-[13px] font-semibold" style={{ background: C.coralLight, color: C.coralDark }}>
                    {error}
                </div>
            )}
            <Btn full icon={<IcPlus size={16} />} disabled={loading} onClick={() => void generate()}>
                {loading ? "Generando…" : "Generar código"}
            </Btn>
        </>
    );
};

export default GenerateLinkCode;
