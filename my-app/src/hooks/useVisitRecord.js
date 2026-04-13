// src/hooks/useVisitRecord.js
import { useState, useContext } from "react";
import {
  getVisitsByMedicalRecordApi,
  createVisitApi,
  deleteVisitApi,
} from "../services/visitRecordService";
import { AuthContext } from "../context/AuthContextObj";

export const useVisitRecord = () => {
  const { accessToken } = useContext(AuthContext);

  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH visits theo record
  const fetchVisits = async (recordId) => {
    if (!accessToken) return;

    setLoading(true);
    try {
      const data = await getVisitsByMedicalRecordApi(accessToken, recordId);
      setVisits(data);
    } catch (err) {
      console.error("Fetch visits failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // CREATE visit
  const createVisit = async (formData) => {
    console.log("Creating visit with data:", formData);
    if (!accessToken) return;

    setLoading(true);
    try {
      const res = await createVisitApi(accessToken, formData);

      setVisits((prev) => [res.data, ...prev]);

      return res.data;
    } catch (err) {
      console.error("Create visit failed:", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // DELETE visit
  const deleteVisit = async (id) => {
    if (!accessToken) return;

    setLoading(true);
    try {
      await deleteVisitApi(accessToken, id);

      setVisits((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error("Delete visit failed:", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    visits,
    loading,
    fetchVisits,
    createVisit,
    deleteVisit,
  };
};