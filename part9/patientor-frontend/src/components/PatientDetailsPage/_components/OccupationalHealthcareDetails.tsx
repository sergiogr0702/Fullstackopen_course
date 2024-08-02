import React from "react";
import { Box, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator,
} from "@mui/lab";
import { OccupationalHealthcareEntry, SickLeave } from "../../../types";

interface OccupationalHealthcareDetailsProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareDetails: React.FC<
  OccupationalHealthcareDetailsProps
> = ({ entry }) => {
  const getTimeline = (sickLeave: SickLeave) => {
    return (
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        <TimelineItem>
          <TimelineOppositeContent>
            {sickLeave.startDate}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Start date</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>{sickLeave.endDate}</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>End date</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
  };

  return (
    <Box my={1}>
      <Typography variant="body1">Employer: {entry.employerName}</Typography>
      {entry.sickLeave && getTimeline(entry.sickLeave)}
    </Box>
  );
};

export default OccupationalHealthcareDetails;
