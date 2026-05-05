// src/hooks/useMedicalRecordDetail.js
import { useState, useEffect, useContext } from "react";
import { getMedicalRecordDetailApi } from "../services/medicalRecordService";
import { AuthContext } from "../context/AuthContextObj";

export const useMedicalRecordDetail = (id) => {
  const { accessToken } = useContext(AuthContext);

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!accessToken || !id) return;

      setLoading(true);
      try {
        const data = await getMedicalRecordDetailApi(accessToken, id);
        setRecord(data);
      } catch (err) {
        console.error("Fetch record detail failed:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [accessToken, id]);

  return { record, loading };
};