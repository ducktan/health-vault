import React from "react";

const PatientCard: React.FC = () => {

  const patient = {
    name: "Nguyễn Văn A",
    cccd: "0123456789",
    dob: "1995-10-10",
    gender: "Nam",
    phone: "0901234567",
    address: "TP.HCM"
  };

  return (
    <div className="hv-card">

      <h3>Thông tin bệnh nhân</h3>

      <div className="hv-patient-grid">

        <div>
          <label>Họ tên</label>
          <p>{patient.name}</p>
        </div>

        <div>
          <label>CCCD</label>
          <p>{patient.cccd}</p>
        </div>

        <div>
          <label>Ngày sinh</label>
          <p>{patient.dob}</p>
        </div>

        <div>
          <label>Giới tính</label>
          <p>{patient.gender}</p>
        </div>

        <div>
          <label>SĐT</label>
          <p>{patient.phone}</p>
        </div>

        <div>
          <label>Địa chỉ</label>
          <p>{patient.address}</p>
        </div>

      </div>

    </div>
  );
};

export default PatientCard;