// src/hooks/usePatient.js
import { useState, useEffect, useContext } from "react";
import {
  createPatientApi,
  getPatientsApi,
} from "../services/patientService";
import { AuthContext } from "../context/AuthContextObj";

export const usePatient = () => {
  const { accessToken, refreshAccessToken } = useContext(AuthContext);

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH ALL
  const fetchPatients = async () => {
    if (!accessToken) return;

    setLoading(true);
    try {
      const data = await getPatientsApi(accessToken);
      setPatients(data);
    } catch (err) {
      console.error("Fetch patients failed:", err.message);

      // retry with refresh token
      try {
        const newToken = await refreshAccessToken();
        const data = await getPatientsApi(newToken);
        setPatients(data);
      } catch (e) {
        console.error("Fetch after refresh failed:", e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // CREATE (🔥 quan trọng)
  const createPatient = async (payload) => {
    if (!accessToken) return;

    setLoading(true);
    try {
      const res = await createPatientApi(accessToken, payload);

      // append patient vào list
      setPatients((prev) => [res.patient, ...prev]);

      return res; 
      /*
        res = {
          message,
          patient,
          medicalRecord
        }
      */
    } catch (err) {
      console.error("Create patient failed:", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) fetchPatients();
  }, [accessToken]);

  return {
    patients,
    loading,
    fetchPatients,
    createPatient,
  };
};