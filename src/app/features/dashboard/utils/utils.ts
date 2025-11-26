import { PatientData } from "../types";

export const filterPatientsByKeyword = ({
  patients,
  keyword,
}: {
  patients: PatientData[];
  keyword: string;
}) => {
  if (!keyword || keyword.trim() === "") {
    return patients;
  }

  const normalizedKeyword = keyword.toLowerCase().trim();

  return patients.filter((patient: PatientData) => {
    const searchableValues = [
      patient.patientName,
      patient.hospitalId,
      patient.gender,
      patient.age,
      patient.clinic,
      patient.status,
      ...(Array.isArray(patient.statusTags) ? patient.statusTags : []),
      patient.walletBalance.toString(),
      patient.time,
      patient.date,
    ];

    return searchableValues.some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(normalizedKeyword);
      }

      return String(value).toLowerCase().includes(normalizedKeyword);
    });
  });
};
