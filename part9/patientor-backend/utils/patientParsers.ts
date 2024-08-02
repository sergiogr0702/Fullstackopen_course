import {
  parseStringField,
  parseDateField,
  isGender,
  isNumber,
  isString,
  assertNever,
} from "./parsers";
import {
  Gender,
  Diagnosis,
  HealthCheckEntry,
  Discharge,
  SickLeave,
  Entry,
  BaseEntry,
  HospitalEntry,
  HealthCheckRating,
  OccupationalHealthcareEntry,
  NewBaseEntry,
  NewEntry,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
} from "../types";
import diagnosisData from "../data/diagnoses";

const parsePatientName = (name: unknown): string =>
  parseStringField(name, "Incorrect or missing name");

const parsePatientDOB = (dob: unknown): string =>
  parseDateField(dob, "Incorrect or missing date of birth");

const parsePatientSsn = (ssn: unknown): string =>
  parseStringField(ssn, "Incorrect or missing ssn");

const parsePatientGender = (gender: unknown): Gender => {
  if (!isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parsePatientOccupation = (occupation: unknown): string =>
  parseStringField(occupation, "Incorrect or missing occupation");

const parseEntryId = (id: unknown): string =>
  parseStringField(id, "Incorrect or missing id");

export const parseEntryDescription = (description: unknown): string =>
  parseStringField(description, "Incorrect or missing description");

export const parseEntryDate = (date: unknown): string =>
  parseDateField(date, "Incorrect or missing date");

export const parseEntrySpecialist = (specialist: unknown): string =>
  parseStringField(specialist, "Incorrect or missing specialist");

export const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis["code"]> => {
  if (!Array.isArray(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnosis codes");
  }

  if (diagnosisCodes.length === 0) {
    return diagnosisCodes;
  }

  const parsedDiagnosisCodes = diagnosisCodes.map((code) => {
    if (!isString(code)) {
      throw new Error("Incorrect diagnosis code format");
    }

    const diagnosis = diagnosisData.find((d) => d.code === code);

    if (!diagnosis) {
      throw new Error(`Diagnosis code not found: ${code}`);
    }

    return diagnosis.code;
  });

  return parsedDiagnosisCodes;
};

const parseEntryType = (type: unknown): string =>
  parseStringField(type, "Incorrect or missing type");

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !Number.isInteger(healthCheckRating)) {
    throw new Error("Incorrect or missing health check rating");
  }

  if (healthCheckRating < 0 || healthCheckRating > 3) {
    throw new Error("Invalid health check rating");
  }

  return healthCheckRating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (typeof discharge !== "object" || !discharge) {
    throw new Error("Incorrect discharge format");
  }

  if ("date" in discharge && "criteria" in discharge) {
    const parsedDischarge: Discharge = {
      date: parseEntryDate(discharge.date),
      criteria: parseEntryDescription(discharge.criteria),
    };
    return parsedDischarge;
  }
  throw new Error("Missing fields in discharge");
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (typeof sickLeave !== "object" || !sickLeave) {
    throw new Error("Incorrect sick leave format");
  }

  if ("startDate" in sickLeave && "endDate" in sickLeave) {
    const parsedSickLeave: SickLeave = {
      startDate: parseEntryDate(sickLeave.startDate),
      endDate: parseEntryDate(sickLeave.endDate),
    };
    return parsedSickLeave;
  }
  throw new Error("Missing fields in sick leave");
};

const entriesSwitcher = (
  parsedBaseEntry: BaseEntry,
  parseEntry: any
): Entry => {
  const type = parseEntryType(parseEntry.type);
  switch (type) {
    case "HealthCheck":
      if ("healthCheckRating" in parseEntry) {
        const parsedHealthCheckEntry: HealthCheckEntry = {
          ...parsedBaseEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(
            parseEntry.healthCheckRating
          ),
        };

        return parsedHealthCheckEntry;
      }
      throw new Error("Missing health check rating in entry");
    case "Hospital":
      const parsedHospitalEntry: HospitalEntry = {
        ...parsedBaseEntry,
        type: "Hospital",
      };

      if ("discharge" in parseEntry) {
        parsedHospitalEntry.discharge = parseDischarge(parseEntry.discharge);
      }

      return parsedHospitalEntry;
    case "OccupationalHealthcare":
      if ("employerName" in parseEntry) {
        const parsedOccupationalHealthcareEntry: OccupationalHealthcareEntry = {
          ...parsedBaseEntry,
          type: "OccupationalHealthcare",
          employerName: parseEntryDescription(parseEntry.employerName),
        };

        if ("sickLeave" in parseEntry) {
          parsedOccupationalHealthcareEntry.sickLeave = parseSickLeave(
            parseEntry.sickLeave
          );
        }

        return parsedOccupationalHealthcareEntry;
      }
      throw new Error("Missing employer name in entry");
    default:
      return assertNever(parseEntry);
  }
};

export const newEntriesSwitcher = (
  parsedBaseEntry: NewBaseEntry,
  parseEntry: any
): NewEntry => {
  const type = parseEntryType(parseEntry.type);
  switch (type) {
    case "HealthCheck":
      if ("healthCheckRating" in parseEntry) {
        const parsedHealthCheckEntry: NewHealthCheckEntry = {
          ...parsedBaseEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(
            parseEntry.healthCheckRating
          ),
        };

        return parsedHealthCheckEntry;
      }
      throw new Error("Missing health check rating in entry");
    case "Hospital":
      const parsedHospitalEntry: NewHospitalEntry = {
        ...parsedBaseEntry,
        type: "Hospital",
      };

      if ("discharge" in parseEntry) {
        parsedHospitalEntry.discharge = parseDischarge(parseEntry.discharge);
      }

      return parsedHospitalEntry;
    case "OccupationalHealthcare":
      if ("employerName" in parseEntry) {
        const parsedOccupationalHealthcareEntry: NewOccupationalHealthcareEntry =
          {
            ...parsedBaseEntry,
            type: "OccupationalHealthcare",
            employerName: parseEntryDescription(parseEntry.employerName),
          };

        if ("sickLeave" in parseEntry) {
          parsedOccupationalHealthcareEntry.sickLeave = parseSickLeave(
            parseEntry.sickLeave
          );
        }

        return parsedOccupationalHealthcareEntry;
      }
      throw new Error("Missing employer name in entry");
    default:
      return assertNever(parseEntry);
  }
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error("Incorrect or missing entries");
  }

  if (entries.length === 0) {
    return entries;
  }

  const parsedEntries = entries.map((parseEntry) => {
    if (typeof parseEntry !== "object" || parseEntry === null) {
      throw new Error("Incorrect entry format");
    }
    if (
      "id" in parseEntry &&
      "description" in parseEntry &&
      "date" in parseEntry &&
      "specialist" in parseEntry
    ) {
      const parsedBaseEntry: BaseEntry = {
        id: parseEntryId(parseEntry.id),
        description: parseEntryDescription(parseEntry.description),
        date: parseEntryDate(parseEntry.date),
        specialist: parseEntrySpecialist(parseEntry.specialist),
      };

      if ("diagnosisCodes" in parseEntry) {
        parsedBaseEntry.diagnosisCodes = parseDiagnosisCodes(
          parseEntry.diagnosisCodes
        );
      }

      if ("type" in parseEntry) {
        return entriesSwitcher(parsedBaseEntry, parseEntry);
      }
      throw new Error("Missing type from entry");
    }
    throw new Error("Missing fields in entry");
  });

  return parsedEntries;
};

export {
  parsePatientName,
  parsePatientDOB,
  parsePatientSsn,
  parsePatientGender,
  parsePatientOccupation,
  parseEntries,
};
