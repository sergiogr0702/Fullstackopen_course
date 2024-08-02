import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";

import patientService from "../../services/patients";

import HealthCheckDetails from "./_components/HealthCheckDetails";
import OccupationalHealthcareDetails from "./_components/OccupationalHealthcareDetails";
import HospitalDetails from "./_components/HospitalDetails";
import diagnosesList from "./_components/diagnosesList";
import CreateEntryForm from "./_components/CreateEntryForm";

import { Diagnosis, Entry, NewDataEntry, Patient } from "../../types";
import { getGenderIcon, getEntryIcon, assertNever } from "./_utils";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({ diagnoses }: Props) => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (!id) {
          throw new Error("Patient ID is required");
        }
        const patient = await patientService.getById(id);
        setPatient(patient);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          navigate("/");
        } else {
          console.error("Failed to fetch patient");
        }
        setPatient(null);
      }
    };

    fetchPatient();
  }, [id, navigate]);

  if (!patient) {
    return null;
  }

  const entryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheckDetails entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareDetails entry={entry} />;
      case "Hospital":
        return <HospitalDetails entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  const handleCreateEntry = async (entry: NewDataEntry) => {
    try {
      const newEntry = await patientService.createNewEntry(patient.id, entry);

      const updatedPatient: Patient = {
        ...patient,
        entries: patient.entries ? [...patient.entries, newEntry] : [newEntry],
      };
      setPatient(updatedPatient);

      return newEntry;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        throw new Error(err.message);
      }
      throw new Error("Failed to create entry");
    }
  };

  return (
    <div>
      <Box>
        <Typography align="center" justifyContent="center" variant="h2">
          {patient.name} {getGenderIcon(patient.gender)}
        </Typography>
      </Box>

      <Container maxWidth="lg">
        <CreateEntryForm diagnoses={diagnoses} onCreate={handleCreateEntry}>
          <Box display="flex" flexDirection="column" gap={1} my={2}>
            <Typography variant="body1">ssn: {patient.ssn}</Typography>

            <Typography variant="body1">
              Occupation: {patient.occupation}
            </Typography>
          </Box>

          <Typography align="center" justifyContent="center" variant="h4">
            Entries
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            {patient.entries
              ? patient.entries.map((entry) => {
                  return (
                    <Card variant="outlined" key={entry.id}>
                      <CardContent>
                        <Box display="flex" flexDirection="row" gap={1}>
                          <Typography variant="body1">
                            {entry.date} {getEntryIcon(entry.type)}
                          </Typography>
                        </Box>
                        <Typography variant="body1">
                          <i>{entry.description}</i>
                        </Typography>
                        {entryDetails(entry)}
                        {diagnosesList(entry, diagnoses)}
                        <Typography variant="body1">
                          Diagnosed by {entry.specialist}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })
              : null}
          </Box>
        </CreateEntryForm>
      </Container>
    </div>
  );
};

export default PatientDetailsPage;
