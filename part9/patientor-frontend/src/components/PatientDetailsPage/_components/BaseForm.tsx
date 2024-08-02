import { Diagnosis } from "../../../types";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

interface Props {
  diagnoses: Diagnosis[];
  selectedCodes: string[];
  setSelectedCodes: (codes: string[]) => void;
}

const BaseForm = ({ diagnoses, selectedCodes, setSelectedCodes }: Props) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleCodesChange = (
    event: SelectChangeEvent<typeof selectedCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Box display="flex" flexDirection="column" gap={1.5}>
      <FormControl>
        <TextField
          required
          id="description"
          name="description"
          label="Description"
          type="text"
        />
      </FormControl>
      <FormControl>
        <TextField
          required
          id="date"
          name="date"
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <FormControl>
        <TextField
          required
          id="specialist"
          name="specialist"
          label="Specialist"
          type="text"
        />
      </FormControl>
      <FormControl>
        <InputLabel id="diagnosisCodes-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosisCodes-label"
          id="diagnosisCodes-checkbox"
          multiple
          value={selectedCodes}
          onChange={handleCodesChange}
          input={<OutlinedInput label="Diagnosis Codes" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              <Checkbox checked={selectedCodes.indexOf(diagnosis.code) > -1} />
              <ListItemText primary={`${diagnosis.code} - ${diagnosis.name}`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BaseForm;
