export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth: string;
  entries?: Entry[] | [];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type NewDataEntry = Omit<Entry, "id">;

export interface FormDataObject {
  description: FormDataEntryValue | null;
  date: FormDataEntryValue | null;
  specialist: FormDataEntryValue | null;
  healthCheckRating_select?: FormDataEntryValue | null;
  employerName?: FormDataEntryValue | null;
  sickLeave_startDate?: FormDataEntryValue | null;
  sickLeave_endDate?: FormDataEntryValue | null;
  discharge_date?: FormDataEntryValue | null;
  discharge_criteria?: FormDataEntryValue | null;
}
