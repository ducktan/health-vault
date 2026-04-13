import React from "react";

const PatientRecordsTable = ({ records, onSelect, selectedId }) => {
  return (
    <div className="hv-card">
      <h3>Bệnh án của bạn</h3>

      {records.map((r) => (
        <div
          key={r._id}
          className={`hv-record-item ${
            selectedId === r._id ? "active" : ""
          }`}
          onClick={() => onSelect(r._id)}
        >
          <div>Ngày tạo: {new Date(r.createdAt).toLocaleDateString()}</div>
          <div>Khoa: {r.department}</div>
        </div>
      ))}
    </div>
  );
};

export default PatientRecordsTable;