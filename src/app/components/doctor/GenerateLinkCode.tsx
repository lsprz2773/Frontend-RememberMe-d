"use client";

import React, { useState } from "react";

const GenerateLinkCode = () => {
    const [code, setCode] = useState(null);

    const generate = () => {
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
                <div className="rounded-xl p-4 text-center mb-3 bg-white border-2 border-dashed border-violet-400">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-1.5 text-gray-400">
                        Código de vinculación
                    </div>
                    <div className="text-[32px] font-black tracking-[0.2em] text-violet-500">
                        {code}
                    </div>
                    <div className="text-[11px] mt-1.5 text-gray-400">
                        Expira en 24 horas
                    </div>
                </div>
                <button
                    onClick={() => setCode(null)}
                    className="w-full py-2 rounded-lg text-sm font-semibold text-gray-500 bg-transparent border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    Generar nuevo código
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={generate}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer border-none"
        >
            <span>+</span>
            Generar código
        </button>
    );
};

export default GenerateLinkCode;