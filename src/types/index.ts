export type UserRole     = "PATIENT" | "DOCTOR";
export type IntakeStatus = "pending" | "taken" | "skipped" | "late";
export type LinkStatus   = "pending" | "active" | "revoked";
export type MedSource    = "doctor"  | "patient";

export interface User {
    id: number;
    email: string;
    full_name: string;
    phone?: string;
    role: UserRole;
    date_of_birth?: string;
    created_at: string;
}

export interface MedicalProfile {
    id: number;
    user_id: number;
    allergies: string | null;
    chronic_conditions: string | null;
    emergency_contact_name: string | null;
    emergency_contact_phone: string | null;
    emergency_contact_relation: string | null;
}

export interface Medication {
    id: number;
    name: string;
    dosage: string;
    frequency_hours: number;
    start_date: string;
    end_date: string | null;
    instructions: string | null;
    is_active: boolean;
    taken: number;
    total: number;
    source: MedSource;
    prescriber: string | null;
}

export interface IntakeLog {
    id: number;
    medication: string;
    dosage: string;
    scheduled_time: string;
    status: IntakeStatus;
    taken_at: string | null;
}

export interface SymptomEntry {
    id: number;
    symptom_name: string;
    severity: number;
    notes: string;
    entry_date: string;
    high_severity_alert: boolean;
}

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

export interface DoctorLink {
    doctor_id: number;
    full_name: string;
    specialty: string;
    hospital: string;
    linked_at: string;
    status: LinkStatus;
}

export interface AdherenceStats {
    adherence_pct: number;
    streak: number;
    total_taken: number;
    total_skipped: number;
}

// ── Component prop types ───────────────────────────────────────────────────

export interface BtnProps {
    children?: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "danger" | "amber";
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
    icon?: React.ReactNode;
    full?: boolean;
    style?: React.CSSProperties;
    className?: string;
    disabled?: boolean;
}

export interface BadgeProps {
    label: string;
    variant?: "taken" | "pending" | "late" | "skipped" | "active" | "inactive" | "alert" | "doctor" | "patient" | "default";
    dot?: boolean;
}

export interface CardProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    pad?: number;
    className?: string;
}

export interface StatCardProps {
    label: string;
    value: string | number;
    sub?: string;
    icon?: React.ReactNode;
    accent?: string;
}

export interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

export interface AvatarProps {
    name: string;
    size?: number;
    color?: string;
}

export interface ProgressBarProps {
    value: number;
    max?: number;
    color?: string;
    height?: number;
}

export interface InputProps {
    label?: string;
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
    required?: boolean;
    defaultValue?: string;
}

export interface SeverityDotProps {
    value: number;
}

export interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    desc?: string;
    action?: React.ReactNode;
}

export interface SidebarProps {
    role: UserRole;
    active: string;
    onNav: (id: string) => void;
    onLogout: () => void;
}

export interface AppShellProps {
    role: UserRole;
    userName: string;
    onLogout: () => void;
}

export interface AuthScreenProps {
    onLogin: (user: { role: UserRole; full_name: string }) => void;
}

export interface PatientDetailProps {
    patient: DoctorPatient | null;
    onBack: () => void;
}

export interface DoctorDashboardProps {
    onSelectPatient: (patient: DoctorPatient) => void;
}

export interface MedsTabProps {
    patient: DoctorPatient;
}
