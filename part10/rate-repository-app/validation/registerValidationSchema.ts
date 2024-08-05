import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "Username must be at least 1 character long")
    .max(30, "Username must be at most 20 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(50, "Password must be at most 50 characters long")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Password confirmation is required"),
});
