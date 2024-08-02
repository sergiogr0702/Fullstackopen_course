import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HealingIcon from "@mui/icons-material/Healing";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { Gender } from "../../../types";

export const getGenderIcon = (gender: Gender): JSX.Element => {
  switch (gender) {
    case "male":
      return <MaleIcon fontSize="inherit" />;
    case "female":
      return <FemaleIcon />;
    default:
      return <TransgenderIcon />;
  }
};

export const getEntryIcon = (type: string): JSX.Element | null => {
  switch (type) {
    case "HealthCheck":
      return <MedicalServicesIcon />;
    case "OccupationalHealthcare":
      return <HealingIcon />;
    case "Hospital":
      return <VaccinesIcon />;
    default:
      return null;
  }
};

export const assertNever = (value: never): never => {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
};
