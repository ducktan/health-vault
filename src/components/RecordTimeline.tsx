import React from "react";

const RecordTimeline: React.FC = () => {

  const visits = [
    {
      id:1,
      date:"2026-03-16",
      doctor:"BS. Khang",
      diagnosis:"Cảm cúm"
    },
    {
      id:2,
      date:"2026-03-10",
      doctor:"BS. Lan",
      diagnosis:"Đau dạ dày"
    }
  ];

  return (
    <div className="hv-card">

      <h3>Lịch sử khám bệnh</h3>

      <table className="hv-table">

        <thead>
          <tr>
            <th>Ngày khám</th>
            <th>Bác sĩ</th>
            <th>Chẩn đoán</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {visits.map(v => (
            <tr key={v.id}>
              <td>{v.date}</td>
              <td>{v.doctor}</td>
              <td>{v.diagnosis}</td>
              <td>
                <button className="hv-btn-outline">
                  Xem
                </button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RecordTimeline;