import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getNonSensitiveEntries();
  return res.status(200).json(patients);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);

    return res.status(201).json(addedPatient);
  } catch (err: unknown) {
    let errorMessage = "An error occurred";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
});

router.get("/:id", (req, res) => {
  const patientId = String(req.params.id);
  const patient = patientService.findById(patientId);

  if (patient) {
    return res.status(200).json(patient);
  } else {
    return res.status(404).json({ error: "Patient not found" });
  }
});

router.post("/:id/entries", (req, res) => {
  const patientId = String(req.params.id);
  const patient = patientService.findById(patientId);

  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);
      const addedEntry = patientService.addEntry(patient.id, newEntry);

      if (!addedEntry) {
        return res.status(500).json({ error: "Internal server error" });
      } else {
        return res.status(201).json(addedEntry);
      }
    } catch (err: unknown) {
      let errorMessage = "An error occurred";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      return res.status(400).json({ error: errorMessage });
    }
  } else {
    return res.status(404).json({ error: "Patient not found" });
  }
});

export default router;
