import * as yup from "yup";

export const reviewValidationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(2, "Username must be at least 2 characters long")
    .required("The owner's name is required"),
  name: yup
    .string()
    .min(2, "Username must be at least 2 characters long")
    .required("The repository name is required"),
  rating: yup
    .number()
    .integer("The rating value must be an integer number")
    .positive("The rating value must be a positive number")
    .min(0, "The rating value must be greater than 0")
    .max(100, "The rating value must be lower than 0")
    .required("Rating is required"),
  review: yup.string().optional(),
});
