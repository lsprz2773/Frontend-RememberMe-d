"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import AuthScreen from "@/components/layout/AuthScreen";
import DoctorDashboard from "@/components/doctor/Dashboard";
import PatientDetail from "@/components/doctor/PatientDetail";
import PatientDashboard from "@/components/patient/Dashboard";
import PatientMedications from "@/components/patient/Medications";
import PatientIntakes from "@/components/patient/Intakes";
import PatientSymptoms from "@/components/patient/Symptoms";
import PatientMyDoctor from "@/components/patient/MyDoctor";
import PatientProfile from "@/components/patient/Profile";
import { C } from "@/lib/colors";
import type { UserRole, AppShellProps } from "@/types";
import type { DoctorPatient } from "@/types";

type Screen =
    | "dashboard" | "medications" | "intakes"
    | "symptoms"  | "doctor"      | "profile"
    | "patients"  | "patient-detail";

interface AppState {
    authed: boolean;
    role: UserRole;
}

const AppShell: React.FC<AppShellProps> = ({ role, onLogout }) => {
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
                case "dashboard":   return <PatientDashboard />;
                case "medications": return <PatientMedications />;
                case "intakes":     return <PatientIntakes />;
                case "symptoms":    return <PatientSymptoms />;
                case "doctor":      return <PatientMyDoctor />;
                case "profile":     return <PatientProfile />;
                default:            return <PatientDashboard />;
            }
        }
        if (role === "DOCTOR") {
            switch (screen) {
                case "dashboard":
                case "patients":
                    return <DoctorDashboard onSelectPatient={handleSelectPatient} />;
                case "patient-detail":
                    return <PatientDetail patient={selectedPatient} onBack={() => setScreen("dashboard")} />;
                case "profile":
                    return <PatientProfile />;
                default:
                    return <DoctorDashboard onSelectPatient={handleSelectPatient} />;
            }
        }
        return null;
    };

    return (
        <div
            className="flex min-h-screen"
            style={{ background: C.bg, fontFamily: "Nunito, sans-serif" }}
        >
            <Sidebar role={role} active={screen} onNav={handleNav} onLogout={onLogout} />
            <main
                className="flex-1 min-h-screen overflow-x-hidden"
                style={{ marginLeft: 240, padding: "32px 36px" }}
            >
                {renderContent()}
            </main>
        </div>
    );
};

export const App: React.FC = () => {
    const [state, setState] = useState<Partial<AppState>>(() => {
        try {
            return JSON.parse(localStorage.getItem("rm_state") ?? "{}") as AppState;
        } catch {
            return {};
        }
    });

    const login = (selectedRole: UserRole | null): void => {
        const r: UserRole  = selectedRole ?? "PATIENT";
        const newState: AppState = { authed: true, role: r };
        setState(newState);
        localStorage.setItem("rm_state", JSON.stringify(newState));
    };

    const logout = (): void => {
        localStorage.removeItem("rm_state");
        setState({});
    };

    if (!state.authed) return <AuthScreen onLogin={login} />;
    return <AppShell role={state.role as UserRole} onLogout={logout} />;
};

export default AppShell;