import React from "react";

const PatientProfileCard = ({ user }) => {
  return (
    <div className="hv-card">
      <h3>Thông tin cá nhân</h3>

      <p><strong>Họ tên:</strong> {user?.fullname}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>
  );
};

export default PatientProfileCard;