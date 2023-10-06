import { object, array, string, number } from "yup";

export const useValidation = () => {
  const currentYear = new Date().getFullYear() + 1;
  const listing = object({
    userId: string().required("User ID is required"),
    make: string().required("Make is required"),
    model: string().required("Model is required"),
    price: number()
      .required("Price is required")
      .min(0, "Must be higher than a 0"),
    images: array().of(string()).required("Image is required"),
    year: number()
      .required("Year is required")
      .min(1900, "Must be between 1900 and 2100")
      .max(currentYear, `Must be between 1900 and ${currentYear}`),
    miles: number().required("Miles are required"),
    city: string().required("City is required"),
    seats: number()
      .required("Number of seats is required")
      .min(1, "Must have at least 1 seat"),
    description: string()
      .required("Description is required")
      .min(50, "Description must be at least 50 characters long")
      .max(1500, "Description is too long(max. 500 chars)"),
    features: string().max(500, "Too many features"),
  });
  const message = object({
    name: string().required("Name is required"),
    email: string().email().required("Email is required"),
    phone: string()
      .length(10)
      .matches(/^[0-9]+$/)
      .required("Phone number is required"),
    message: string()
      .min(25, "Message is too short")
      .required("Message is required"),
  });
  return { listing, message, currentYear };
};
