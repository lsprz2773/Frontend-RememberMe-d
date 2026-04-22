"use client";

import React, { useState } from "react";
import Btn from "@/components/ui/Btn";
import { C } from "@/lib/colors";
import { IcPlus } from "@/components/ui/Icons";

const GenerateLinkCode: React.FC = () => {
    const [code, setCode] = useState<string | null>(null);

    const generate = (): void => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        const newCode = Array.from(
            { length: 6 },
            () => chars[Math.floor(Math.random() * chars.length)]
        ).join("");
        setCode(newCode);
    };

    if (code) {
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
                        {code}
                    </div>
                    <div
                        className="text-[11px] mt-1.5"
                        style={{ color: C.textMuted }}
                    >
                        Expira en 24 horas
                    </div>
                </div>
                <Btn variant="ghost" full size="sm" onClick={() => setCode(null)}>
                    Generar nuevo código
                </Btn>
            </div>
        );
    }

    return (
        <Btn full icon={<IcPlus size={16} />} onClick={generate}>
            Generar código
        </Btn>
    );
};

export default GenerateLinkCode;