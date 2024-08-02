import { NewBaseEntry, NewEntry, NewPatientEntry } from "../types";
import {
  parsePatientName,
  parsePatientOccupation,
  parsePatientGender,
  parsePatientSsn,
  parsePatientDOB,
  parseEntries,
  parseEntryDescription,
  parseEntryDate,
  parseEntrySpecialist,
  parseDiagnosisCodes,
  newEntriesSwitcher,
} from "./patientParsers";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data.");
  }

  if (
    "name" in object &&
    "occupation" in object &&
    "gender" in object &&
    "ssn" in object &&
    "dateOfBirth" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parsePatientName(object.name),
      occupation: parsePatientOccupation(object.occupation),
      gender: parsePatientGender(object.gender),
      ssn: parsePatientSsn(object.ssn),
      dateOfBirth: parsePatientDOB(object.dateOfBirth),
      entries: parseEntries(object.entries),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data.");
  }

  if ("description" in object && "date" in object && "specialist" in object) {
    const parsedBaseEntry: NewBaseEntry = {
      description: parseEntryDescription(object.description),
      date: parseEntryDate(object.date),
      specialist: parseEntrySpecialist(object.specialist),
    };

    if ("diagnosisCodes" in object) {
      parsedBaseEntry.diagnosisCodes = parseDiagnosisCodes(
        object.diagnosisCodes
      );
    }

    if ("type" in object) {
      return newEntriesSwitcher(parsedBaseEntry, object);
    }
    throw new Error("Invalid data: type field is missing");
  }
  throw new Error("Incorrect data: some fields are missing");
};
