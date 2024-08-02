import patientData from "../data/patients";
import {
  Patient,
  NonSensitivePatient,
  NewPatientEntry,
  NewEntry,
  Entry,
  BaseEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from "../types";
import { v1 as uuid } from "uuid";

const getEntries = (): Patient[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };

  patientData.push(newPatientEntry);

  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const addEntry = (id: string, newEntry: NewEntry): Entry | undefined => {
  const patient = findById(id);

  if (!patient) {
    return undefined;
  }

  const entryId = uuid();

  const baseEntry: BaseEntry = {
    id: entryId,
    description: newEntry.description,
    date: newEntry.date,
    specialist: newEntry.specialist,
    diagnosisCodes: newEntry.diagnosisCodes,
  };

  let entry: Entry;

  switch (newEntry.type) {
    case "HealthCheck":
      const healthCheckEntry: HealthCheckEntry = {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: (newEntry as HealthCheckEntry).healthCheckRating,
      };
      entry = healthCheckEntry;
      break;
    case "Hospital":
      const hospitalEntry: HospitalEntry = {
        ...baseEntry,
        type: "Hospital",
        discharge: (newEntry as HospitalEntry).discharge,
      };
      entry = hospitalEntry;
      break;
    case "OccupationalHealthcare":
      const occupationalHealthcareEntry: OccupationalHealthcareEntry = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: (newEntry as OccupationalHealthcareEntry).employerName,
        sickLeave: (newEntry as OccupationalHealthcareEntry).sickLeave,
      };
      entry = occupationalHealthcareEntry;
      break;
    default:
      return undefined;
  }

  patient.entries.push(entry);

  patientData.map((patientEntry) =>
    patientEntry.id === patient.id ? patient : patientEntry
  );

  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry,
};
