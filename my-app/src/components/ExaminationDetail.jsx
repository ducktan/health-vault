import React from "react";

const ExaminationDetail = ({ visit }) => {
  if (!visit) {
    return (
      <div className="hv-card">
        <h3>Chi tiết khám bệnh</h3>
        <p>Chọn một lần khám để xem chi tiết</p>
      </div>
    );
  }

  return (
    <div className="hv-card">
      <h3>Chi tiết khám bệnh</h3>

      <div className="hv-record-grid">

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
    </div>
  );
};

export default ExaminationDetail;