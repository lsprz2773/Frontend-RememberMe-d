"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import AuthScreen from "@/components/layout/AuthScreen";
import DoctorDashboard from "@/components/doctor/Dashboard";
import PatientDetail from "@/components/doctor/PatientDetails";
import PatientDashboard from "@/components/patient/Dashboard";
import PatientMedications from "@/components/patient/Medications";
import PatientIntakes from "@/components/patient/Intakes";
import PatientSymptoms from "@/components/patient/Symptoms";
import PatientMyDoctor from "@/components/patient/MyDoctor";
import PatientProfile from "@/components/patient/Profile";
import { C } from "@/lib/Colors";
import type { UserRole, AppShellProps } from "@/types";
import type { DoctorPatient } from "@/types";

type Screen =
    | "dashboard" | "medications" | "intakes"
    | "symptoms"  | "doctor"      | "profile"
    | "patients"  | "patient-detail";

interface AppState {
    authed: boolean;
    role: UserRole;
    full_name: string;
}

const AppShell: React.FC<AppShellProps> = ({ role, userName, onLogout }) => {
    const [screen, setScreen]                   = useState<Screen>("dashboard");
    const [selectedPatient, setSelectedPatient] = useState<DoctorPatient | null>(null);

    const handleSelectPatient = (p: DoctorPatient): void => {
        setSelectedPatient(p);
        setScreen("patient-detail");
    };

    const handleNav = (id: string): void => {
        setSelectedPatient(null);
        setScreen(id as Screen);
    };

    const renderContent = (): React.ReactNode => {
        if (role === "PATIENT") {
            switch (screen) {
                case "dashboard":   return <PatientDashboard userName={userName} />;
                case "medications": return <PatientMedications />;
                case "intakes":     return <PatientIntakes />;
                case "symptoms":    return <PatientSymptoms />;
                case "doctor":      return <PatientMyDoctor />;
                case "profile":     return <PatientProfile userName={userName} />;
                default:            return <PatientDashboard userName={userName} />;
            }
        }
        if (role === "DOCTOR") {
            switch (screen) {
                case "dashboard":
                    return <DoctorDashboard onSelectPatient={handleSelectPatient} userName={userName} />;
                case "patient-detail":
                    return <PatientDetail patient={selectedPatient} onBack={() => setScreen("dashboard")} />;
                case "profile":
                    return <PatientProfile userName={userName} />;
                default:
                    return <DoctorDashboard onSelectPatient={handleSelectPatient} />;
            }
        }
        return null;
    };

    return (
        <div style={{ background: C.bg, fontFamily: "Nunito, sans-serif", minHeight: "100vh" }}>
            <Sidebar role={role} active={screen} onNav={handleNav} onLogout={onLogout} />
            <main style={{ marginLeft: 240, padding: "32px 36px", minHeight: "100vh" }}>
                {renderContent()}
            </main>
        </div>
    );
};

export const App: React.FC = () => {
    const [state, setState] = useState<Partial<AppState>>({});
    const [ready, setReady]  = useState(false);

    useEffect(() => {
        const init = async (): Promise<void> => {
            try {
                const saved = JSON.parse(localStorage.getItem("rm_state") ?? "{}") as Partial<AppState>;
                if (saved.authed) {
                    // Verificar que la cookie rm_token sigue válida
                    const res = await fetch("/api/auth/profile");
                    if (res.ok) {
                        setState(saved);
                    } else {
                        // Cookie expirada o inexistente — limpiar estado
                        localStorage.removeItem("rm_state");
                    }
                }
            } catch {
                // ignore
            }
            setReady(true);
        };
        void init();
    }, []);

    const login = (user: { role: UserRole; full_name: string }): void => {
        const newState: AppState = { authed: true, role: user.role, full_name: user.full_name };
        setState(newState);
        localStorage.setItem("rm_state", JSON.stringify(newState));
    };

    const logout = async (): Promise<void> => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
        } catch {
            // ignore network errors on logout
        }
        localStorage.removeItem("rm_state");
        setState({});
    };

    if (!ready) return null;
    if (!state.authed) return <AuthScreen onLogin={login} />;
    return (
        <AppShell
            role={state.role as UserRole}
            userName={state.full_name ?? "Usuario"}
            onLogout={logout}
        />
    );
};

export default AppShell;
