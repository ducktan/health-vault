import React, { useState } from "react";
import { useVisitRecord } from "../hooks/useVisitRecord";

const ExaminationDetail = ({ visit, patient_id }) => {
  const { exportSignedPdf } = useVisitRecord();
  const [loading, setLoading] = useState(false);

  if (!visit) {
    return (
      <div className="hv-card">
        <h3>Chi tiết khám bệnh</h3>
        <p>Chọn một lần khám để xem chi tiết</p>
      </div>
    );
  }

  const handleExport = async () => {
    try {
      setLoading(true);

      const payload = {
        patient_id: patient_id,
        symptoms: visit.symptoms,
        diagnosis: visit.diagnosis,
        treatment: visit.treatment,
        note: visit.note,
        doctor_name: visit.doctor_id?.fullname,
        created_at: new Date(visit.createdAt).toLocaleString()
      };

      console.log("Data gửi BE:", payload);
      const blob = await exportSignedPdf(payload);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "benh_an_signed.pdf";
      a.click();

    } catch (err) {
      console.error(err);
      alert("Xuất PDF thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hv-card">
      <h3>Chi tiết khám bệnh</h3>

      <div className="hv-record-grid">
        <div>
          <label>Khoa</label>
          <p>{visit.department || "—"}</p>
        </div>

        <div>
          <label>Triệu chứng</label>
          <p>{visit.symptoms || "—"}</p>
        </div>

        <div>
          <label>Chẩn đoán</label>
          <p>{visit.diagnosis || "—"}</p>
        </div>

        <div>
          <label>Phác đồ điều trị</label>
          <p>{visit.treatment || "—"}</p>
        </div>

        <div>
          <label>Ghi chú</label>
          <p>{visit.note || "—"}</p>
        </div>

        <div>
          <label>Bác sĩ</label>
          <p>{visit.doctor_id?.fullname || "—"}</p>
        </div>

        <div>
          <label>Thời gian</label>
          <p>{new Date(visit.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* 🔥 BUTTON */}
      <div style={{ marginTop: 20 }}>
        <button
          className="hv-btn-primary"
          onClick={handleExport}
          disabled={loading}
        >
          {loading ? "Đang ký..." : "Ký & Xuất PDF"}
        </button>
      </div>
    </div>
  );
};

export default ExaminationDetail;