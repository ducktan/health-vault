// src/services/visitRecordService.js
import { api } from "./api";

// GET list visit theo medical_record_id
export const getVisitsByMedicalRecordApi = async (accessToken, recordId) => {
  return await api(
    `/medical/${recordId}/visits`,
    {},
    accessToken
  );
};

// GET detail 1 visit
export const getVisitDetailApi = async (accessToken, id) => {
  return await api(
    `/visit/${id}`,
    {},
    accessToken
  );
};

// CREATE visit
export const createVisitApi = async (accessToken, data) => {
  return await api(
    "/visit",
    {
      method: "POST",
      data,
    },
    accessToken
  );
};

// UPDATE visit
export const updateVisitApi = async (accessToken, id, data) => {
  return await api(
    `/visit/${id}`,
    {
      method: "PUT",
      data,
    },
    accessToken
  );
};

// DELETE visit
export const deleteVisitApi = async (accessToken, id) => {
  return await api(
    `/visit/${id}`,
    {
      method: "DELETE",
    },
    accessToken
  );
};

export const exportVisitPdfApi = async (accessToken, payload) => {
  return await api(
    `/visit/export-pdf`, 
    {
      method: "POST",
      data: payload, // 🔥 gửi thẳng payload
      responseType: "blob"
    },
    accessToken
  );
};