import React from "react";
import { Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { HealthCheckEntry } from "../../../types";

interface HealthCheckDetailsProps {
  entry: HealthCheckEntry;
}

const HealthCheckDetails: React.FC<HealthCheckDetailsProps> = ({ entry }) => {
  const healthCheck = (healthLevel: number) => {
    switch (healthLevel) {
      case 0:
      case 1:
        return <FavoriteIcon color="error" />;
      case 2:
      case 3:
        return <FavoriteIcon color="warning" />;
      case 4:
      case 5:
        return <FavoriteIcon color="success" />;
      default:
        return null;
    }
  };

  return <Box>{healthCheck(entry.healthCheckRating)}</Box>;
};

export default HealthCheckDetails;
