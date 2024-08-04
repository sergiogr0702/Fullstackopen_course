import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Username must be at least 2 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(2, "Password must be at least 2 characters long")
    .required("Password is required"),
});
