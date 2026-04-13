// src/services/medicalRecordService.js
import { api } from "./api";

// GET all records
export const getMedicalRecordsApi = async (accessToken) => {
  return await api("/medical", { method: "GET" }, accessToken);
};

// GET detail
export const getMedicalRecordDetailApi = async (accessToken, id) => {
  return await api(`/medical/${id}`, { method: "GET" }, accessToken);
};

// CREATE
export const createMedicalRecordApi = async (accessToken, patient_id) => {
  return await api(
    "/medical",
    {
      method: "POST",
      data: { patient_id },
    },
    accessToken
  );
};

// DELETE
export const deleteMedicalRecordApi = async (accessToken, id) => {
  return await api(`/medical/${id}`, { method: "DELETE" }, accessToken);
};