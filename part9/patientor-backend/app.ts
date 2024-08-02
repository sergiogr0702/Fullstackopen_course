import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  return res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

export default app;
