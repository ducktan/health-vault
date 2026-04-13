// src/hooks/useMedicalRecords.js
import { useState, useEffect, useContext } from "react";
import {
  getMedicalRecordsApi,
  createMedicalRecordApi,
  deleteMedicalRecordApi,
} from "../services/medicalRecordService";
import { AuthContext } from "../context/AuthContextObj";

export const useMedicalRecords = () => {
  const { accessToken, refreshAccessToken } = useContext(AuthContext);

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH ALL
  const fetchRecords = async () => {
    if (!accessToken) return;

    setLoading(true);
    try {
      const data = await getMedicalRecordsApi(accessToken);
      setRecords(data);
    } catch (err) {
      console.error("Fetch records failed:", err.message);

      // thử refresh token
      try {
        const newToken = await refreshAccessToken();
        const data = await getMedicalRecordsApi(newToken);
        setRecords(data);
      } catch (e) {
        console.error("Fetch after refresh failed:", e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const createRecord = async (patient_id) => {
    console.log("Creating record for patient_id:", patient_id);
    if (!accessToken) return;

    setLoading(true);
    try {
      const res = await createMedicalRecordApi(accessToken, patient_id);

      // append vào list
      setRecords((prev) => [res.data, ...prev]);

      return res.data;
    } catch (err) {
      console.error("Create record failed:", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteRecord = async (id) => {
    if (!accessToken) return;

    setLoading(true);
    try {
      await deleteMedicalRecordApi(accessToken, id);

      setRecords((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete record failed:", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // AUTO LOAD
  useEffect(() => {
    if (accessToken) fetchRecords();
  }, [accessToken]);

  return {
    records,
    loading,
    fetchRecords,
    createRecord,
    deleteRecord,
  };
};