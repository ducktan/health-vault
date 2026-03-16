import React from "react";
import { useNavigate } from "react-router-dom";

const PatientRecordsTable: React.FC = () => {

  const navigate = useNavigate();

  const records = [
    {
      id:1,
      created_at:"2026-03-10",
      doctor:"BS. Khang",
      visits:3
    },
    {
      id:2,
      created_at:"2026-02-15",
      doctor:"BS. Lan",
      visits:1
    }
  ];

  return (

    <div className="hv-card">

      <h3>Bệnh án</h3>

      <table className="hv-table">

        <thead>
          <tr>
            <th>Ngày tạo</th>
            <th>Bác sĩ</th>
            <th>Số lần khám</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {records.map(r => (
            <tr key={r.id}>
              <td>{r.created_at}</td>
              <td>{r.doctor}</td>
              <td>{r.visits}</td>
              <td>
                <button
                  className="hv-btn-outline"
                  onClick={() => navigate(`/patient/records/${r.id}`)}
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );
};

export default PatientRecordsTable;