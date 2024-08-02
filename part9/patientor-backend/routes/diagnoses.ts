import express from "express";
import diagnosisService from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnoses = diagnosisService.getEntries();
  return res.status(200).json(diagnoses);
});

export default router;
