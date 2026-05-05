import React from "react";

const PatientCard = ({ patient }) => {
  // chưa có data
  if (!patient) {
    return (
      <div className="hv-card">
        <h3>Thông tin bệnh nhân</h3>
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="hv-card">
      <h3>Thông tin bệnh nhân</h3>

      <div className="hv-patient-grid">

        <div>
          <label>Họ tên</label>
          <p>{patient.fullname || "—"}</p>
        </div>

        <div>
          <label>CCCD</label>
          <p>{patient.cccd || "—"}</p>
        </div>

        <div>
          <label>Ngày sinh</label>
          <p>{patient.dob?.slice(0, 10) || "—"}</p>
        </div>

        <div>
          <label>Giới tính</label>
          <p>{patient.gender || "—"}</p>
        </div>

        <div>
          <label>SĐT</label>
          <p>{patient.phone || "—"}</p>
        </div>

        <div>
          <label>Địa chỉ</label>
          <p>{patient.address || "—"}</p>
        </div>

      </div>
    </div>
  );
};

export default PatientCard;