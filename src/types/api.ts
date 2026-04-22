export type UserRole = 'PATIENT' | 'DOCTOR';
export type IntakeStatus = 'pending' | 'taken' | 'skipped' | 'late';
export type LinkStatus = 'pending' | 'active' | 'revoked';

export interface ApiUser {
  id: number;
  email: string;
  full_name: string;
  phone: string | null;
  role: UserRole;
  date_of_birth: string | null;
  created_at: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: ApiUser;
}

export interface ApiMedication {
  id: number;
  patient_id: number;
  name: string;
  dosage: string;
  frequency_hours: number;
  start_date: string;
  end_date: string | null;
  instructions: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/** Campos devueltos por la vista v_today_intake */
export interface ApiIntakeLog {
  intake_id: number;
  medication_id: number;
  medication_name: string;
  dosage: string;
  patient_id: number;
  patient_name: string;
  scheduled_date: string;
  scheduled_time: string;
  taken_at: string | null;
  status: IntakeStatus;
  is_adherent: boolean | null;
}

export interface ApiSymptom {
  id: number;
  patient_id: number;
  symptom_name: string;
  severity: number;
  notes: string | null;
  entry_date: string;
  created_at: string;
  updated_at: string;
}

export interface ApiDoctorPatientLink {
  id: number;
  doctor_id: number;
  patient_id: number | null;
  link_code: string;
  status: LinkStatus;
  created_at: string;
}

export interface ApiMedicalProfile {
  id: number;
  user_id: number;
  allergies: string | null;
  chronic_conditions: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  emergency_contact_relation: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiLinkedPatient {
  link_id: number;
  patient_id: number;
  full_name: string;
  date_of_birth: string | null;
  linked_at: string;
  adherence_pct: number | null;
  streak: number | null;
  chronic_conditions: string | null;
  high_severity_alert: boolean;
  active_meds_count: number | null;
  last_symptom_date: string | null;
}

export interface ApiMyDoctor {
  link_id: number;
  doctor_id: number;
  full_name: string;
  email: string;
  linked_at: string;
  status: LinkStatus;
}
