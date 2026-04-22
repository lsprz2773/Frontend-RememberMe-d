"use client";

import React from "react";

const PatientProfile = () => (
    <div>

        <div>
            <h1>Mi Perfil</h1>
            <p>Información personal y perfil clínico</p>
        </div>

        <div>

            {/* Left column */}
            <div>
                <div>
                    <div>
                        <div>{/* Avatar */}</div>
                        <div>
                            <div>Juan Pérez López</div>
                            <div>31 años · Paciente</div>
                            <span>Paciente</span>
                        </div>
                    </div>
                    <div>
                        {[
                            { label: "Correo electrónico",  value: "juan.perez@email.com"         },
                            { label: "Teléfono",            value: "+52 961 123 4567"             },
                            { label: "Fecha de nacimiento", value: "20 de abril, 1995 (31 años)" },
                            { label: "Registro",            value: "5 de febrero, 2026"          },
                        ].map((f) => (
                            <div key={f.label}>
                                <div>{f.label}</div>
                                <div>{f.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right column */}
            <div>

                {/* Clinical profile */}
                <div>
                    <div>Perfil clínico</div>
                    <div>
                        <div>Alergias</div>
                        <div>Penicilina, Aspirina</div>
                    </div>
                    <div>
                        <div>Condiciones crónicas</div>
                        <div>Diabetes tipo 2, Hipertensión</div>
                    </div>
                    <div>
                        <div>Contacto de emergencia</div>
                        <div>María López · +52 961 765 4321</div>
                    </div>
                </div>

                {/* Adherence stats */}
                <div>
                    <div>Estadísticas de adherencia</div>
                    {[
                        { label: "Este mes",      value: "87%"       },
                        { label: "Semana actual", value: "92%"       },
                        { label: "Racha actual",  value: "5 días" },
                        { label: "Mejor racha",   value: "12 días"   },
                    ].map((x) => (
                        <div key={x.label}>
                            <span>{x.label}</span>
                            <span>{x.value}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    </div>
);

export default PatientProfile;