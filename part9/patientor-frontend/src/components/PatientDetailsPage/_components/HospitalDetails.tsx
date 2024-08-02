import React from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExitToApp from "@mui/icons-material/ExitToApp";
import { HospitalEntry } from "../../../types";

interface HospitalDetailsProps {
  entry: HospitalEntry;
}

const HospitalDetails: React.FC<HospitalDetailsProps> = ({ entry }) => {
  return (
    <Box my={1}>
      {entry.discharge ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={entry.id}
            id={entry.id}
          >
            <ExitToApp />
            <Typography variant="body1">Discharge details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Date of discharge: {entry.discharge.date}
            </Typography>
            <Typography variant="body1">
              Criteria of discharge: {entry.discharge.criteria}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ) : null}
    </Box>
  );
};

export default HospitalDetails;
