import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { HealthCheckRating } from "../../../types";

const HealthCheckForm = () => {
  const [healthCheckRating, setHealthCheckRating] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setHealthCheckRating(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="healthCheckRating_label">
          Health Check Rating
        </InputLabel>
        <Select
          labelId="healthCheckRating_label"
          id="healthCheckRating_select"
          name="healthCheckRating_select"
          value={healthCheckRating}
          label="Health Check Rating"
          onChange={handleChange}
        >
          {Object.entries(HealthCheckRating)
            .filter(([_key, value]) => typeof value === "number")
            .map(([key, value]) => (
              <MenuItem key={value} value={value}>
                {key}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default HealthCheckForm;
