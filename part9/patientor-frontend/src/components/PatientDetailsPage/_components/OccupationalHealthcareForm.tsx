import { Box, FormControl, TextField } from "@mui/material";

const OccupationalHealthcareForm = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <FormControl fullWidth>
        <TextField
          required
          id="employerName"
          name="employerName"
          label="Employer Name"
          type="text"
        />
      </FormControl>
      <Box display="flex" flexDirection="row" gap={1}>
        <FormControl fullWidth>
          <TextField
            id="sickLeave_startDate"
            name="sickLeave_startDate"
            label="Sick leave Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="sickLeave_endDate"
            name="sickLeave_endDate"
            label="Sick leave End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default OccupationalHealthcareForm;
