import { api } from "./api";

export const linkPatientApi = async (accessToken, cccd) => {
  return await api("/patients/link-by-cccd", {
    method: "POST",
    data: { cccd },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};


// CREATE PATIENT (doctor)
export const createPatientApi = async (accessToken, data) => {
  return api(
    "/patients",
    {
      method: "POST",
      data, // { fullname, email, cccd, dob, gender, phone, address }
    },
    accessToken
  );
};

// GET ALL PATIENTS
export const getPatientsApi = async (accessToken) => {
  return api("/patients", { method: "GET" }, accessToken);
};

// GET DETAIL
export const getPatientDetailApi = async (accessToken, id) => {
  return api(`/patients/${id}`, { method: "GET" }, accessToken);
};

// UPDATE PATIENT
export const updatePatientApi = async (accessToken, id, data) => {
  return api(
    `/patients/${id}`,
    {
      method: "PUT",
      data,
    },
    accessToken
  );
};

