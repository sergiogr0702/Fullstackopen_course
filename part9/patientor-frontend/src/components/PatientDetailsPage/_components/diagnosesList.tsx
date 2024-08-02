import { Box, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../../types";

const diagnosesList = (
  entry: Entry,
  diagnoses: Diagnosis[]
): JSX.Element | null => {
  const diagnosisCodes = entry.diagnosisCodes ?? [];

  if (!diagnosisCodes.length) {
    return null;
  }

  return (
    <Box my={0}>
      <Typography variant="body1">Diagnosis:</Typography>
      <ul>
        {diagnosisCodes
          .map((code) => {
            const diagnosis = diagnoses.find((d) => d.code === code);

            if (!diagnosis) {
              return null;
            }

            return (
              <li key={diagnosis.code}>
                <Typography>
                  {diagnosis.code} {diagnosis.name}
                </Typography>
              </li>
            );
          })
          .filter((item): item is JSX.Element => item !== null)}
      </ul>
    </Box>
  );
};

export default diagnosesList;
