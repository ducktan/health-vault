import React from "react";

const VisitList: React.FC = () => {

  const visits = [
    {
      date:"2026-03-16",
      doctor:"BS. Khang",
      diagnosis:"Cảm cúm"
    },
    {
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
            <th>Ngày</th>
            <th>Bác sĩ</th>
            <th>Chẩn đoán</th>
          </tr>
        </thead>

        <tbody>

          {visits.map((v,i)=>(
            <tr key={i}>
              <td>{v.date}</td>
              <td>{v.doctor}</td>
              <td>{v.diagnosis}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default VisitList;