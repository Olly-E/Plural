import { isValidPhoneNumber } from "react-phone-number-input";
import { object, string, boolean, z } from "zod";

import { OPTION_VALIDATION } from "@/app/utils/constants";

export const addNewPatientSchema = object({
  firstName: string().min(1, "FirsName is required"),
  middleName: string().trim().max(50, "Middle name is too long.").nullable(),
  lastName: string().min(1, "LastName is required"),
  title: OPTION_VALIDATION,
  patientId: string().trim().max(20, "Patient ID is too long.").nullable(),
  dob: z
    .date()
    .max(new Date(), "Date of birth cannot be in the future."),
  gender: OPTION_VALIDATION,
  phoneNumber: z
    .string()
    .trim()
    .nonempty("Phone number is required.")
    .refine(
      (value) => isValidPhoneNumber(value),
      "Invalid phone number format."
    ),
  isNewPatient: boolean(),
});

export type AddNewPatientType = z.infer<typeof addNewPatientSchema>;
