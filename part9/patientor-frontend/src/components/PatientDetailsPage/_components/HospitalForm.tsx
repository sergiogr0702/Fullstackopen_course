import { Box, FormControl, TextField } from "@mui/material";

const HospitalForm = () => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <FormControl fullWidth>
        <TextField
          id="discharge_date"
          name="discharge_date"
          label="Discharge Date"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          id="discharge_criteria"
          name="discharge_criteria"
          label="Discharge Criteria"
          type="text"
        />
      </FormControl>
    </Box>
  );
};

export default HospitalForm;
