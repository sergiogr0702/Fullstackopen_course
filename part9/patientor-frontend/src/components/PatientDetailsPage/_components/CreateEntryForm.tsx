import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import BaseForm from "./BaseForm";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";
import {
  Diagnosis,
  NewDataEntry,
  FormDataObject,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  Entry,
} from "../../../types";
import { assertNever } from "../_utils";

interface Props {
  onCreate: (entry: NewDataEntry) => Promise<Entry>;
  children: React.ReactNode;
  diagnoses: Diagnosis[];
}

const CreateEntryForm = ({ onCreate, children, diagnoses }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const notify = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const formValues: FormDataObject = {
      description: formData.get("description"),
      date: formData.get("date"),
      specialist: formData.get("specialist"),
      healthCheckRating_select: formData.get("healthCheckRating_select"),
      employerName: formData.get("employerName"),
      sickLeave_startDate: formData.get("sickLeave_startDate"),
      sickLeave_endDate: formData.get("sickLeave_endDate"),
      discharge_date: formData.get("discharge_date"),
      discharge_criteria: formData.get("discharge_criteria"),
    };

    if (!formValues.description || !formValues.date || !formValues.specialist) {
      notify("Some required fields are missing");
      return;
    }

    let newEntryData: NewDataEntry;

    switch (type) {
      case "HealthCheck":
        if (!formValues.healthCheckRating_select) {
          notify("Health Check Rating is required");
          return;
        }

        if (
          (formValues.healthCheckRating_select &&
            parseInt(formValues.healthCheckRating_select.toString()) < 0) ||
          parseInt(formValues.healthCheckRating_select.toString()) > 6
        ) {
          notify("Health Check Rating must be between 1 and 5");
          return;
        }

        newEntryData = {
          type: "HealthCheck",
          description: formValues.description.toString(),
          date: formValues.date.toString(),
          specialist: formValues.specialist.toString(),
          healthCheckRating: parseInt(
            formValues.healthCheckRating_select.toString()
          ),
        } as HealthCheckEntry;
        break;
      case "OccupationalHealthcare":
        if (!formValues.employerName) {
          notify("Employer Name is required");
          return;
        }
        if (
          (formValues.sickLeave_startDate && !formValues.sickLeave_endDate) ||
          (!formValues.sickLeave_startDate && formValues.sickLeave_endDate)
        ) {
          notify("Sick leave dates are required");
          return;
        }
        newEntryData = {
          type: "OccupationalHealthcare",
          description: formValues.description.toString(),
          date: formValues.date.toString(),
          specialist: formValues.specialist.toString(),
          employerName: formValues.employerName.toString(),
          sickLeave:
            formValues.sickLeave_startDate && formValues.sickLeave_endDate
              ? {
                  startDate: formValues.sickLeave_startDate.toString(),
                  endDate: formValues.sickLeave_endDate.toString(),
                }
              : undefined,
        } as OccupationalHealthcareEntry;
        break;
      case "Hospital":
        if (
          (formValues.discharge_date && !formValues.discharge_criteria) ||
          (!formValues.discharge_date && formValues.discharge_criteria)
        ) {
          notify("Discharge info is required");
          return;
        }
        newEntryData = {
          type: "Hospital",
          description: formValues.description.toString(),
          date: formValues.date.toString(),
          specialist: formValues.specialist.toString(),
          discharge:
            formValues.discharge_date && formValues.discharge_criteria
              ? {
                  date: formValues.discharge_date.toString(),
                  criteria: formValues.discharge_criteria.toString(),
                }
              : undefined,
        } as HospitalEntry;
        break;
      default:
        notify("Invalid entry type: " + type);
        return assertNever(type as never);
    }

    if (selectedCodes) {
      newEntryData.diagnosisCodes = selectedCodes;
    } else {
      newEntryData.diagnosisCodes = undefined;
    }

    try {
      const returnedData = await onCreate(newEntryData);

      if (returnedData) {
        handleClose();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        notify(err.message);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
    setType("");
    setSelectedCodes([]);
  };

  const formType = () => {
    switch (type) {
      case "HealthCheck":
        return (
          <Box display="flex" flexDirection="column" gap={1} my={2}>
            <BaseForm
              selectedCodes={selectedCodes}
              setSelectedCodes={setSelectedCodes}
              diagnoses={diagnoses}
            />
            <HealthCheckForm />
          </Box>
        );
      case "OccupationalHealthcare":
        return (
          <Box display="flex" flexDirection="column" gap={1} my={2}>
            <BaseForm
              selectedCodes={selectedCodes}
              setSelectedCodes={setSelectedCodes}
              diagnoses={diagnoses}
            />
            <OccupationalHealthcareForm />
          </Box>
        );
      case "Hospital":
        return (
          <Box display="flex" flexDirection="column" gap={1} my={2}>
            <BaseForm
              selectedCodes={selectedCodes}
              setSelectedCodes={setSelectedCodes}
              diagnoses={diagnoses}
            />
            <HospitalForm />
          </Box>
        );
      default:
        return (
          <Typography my={1} align="center" variant="body1">
            Please select the type of entry to create
          </Typography>
        );
    }
  };

  const submitButtonDisabled = type === "";

  return (
    <Container>
      {error && <Alert severity="error">{error}</Alert>}

      {isOpen && (
        <Card variant="elevation">
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Typography align="center" my={1} variant="h5" component="div">
                Create new entry
              </Typography>
              <Box>
                <FormControl fullWidth>
                  <InputLabel id="type-select-label">Type</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={type}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="HealthCheck">Health Check Entry</MenuItem>
                    <MenuItem value={"OccupationalHealthcare"}>
                      Occupational Healthcare Entry
                    </MenuItem>
                    <MenuItem value={"Hospital"}>Hospital Entry</MenuItem>
                  </Select>
                </FormControl>
                {formType()}
              </Box>
            </CardContent>
            <CardActions>
              <Box display="flex" flexDirection="row" gap={1}>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={submitButtonDisabled}
                >
                  Submit
                </Button>
              </Box>
            </CardActions>
          </form>
        </Card>
      )}
      {children}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setIsOpen(true)}
      >
        Add new entry
      </Button>
    </Container>
  );
};

export default CreateEntryForm;
