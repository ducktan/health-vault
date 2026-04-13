import React from "react";

const AccessLogs = () => {

  const logs = [
    {
      doctor: "BS. Khang",
      time: "2026-03-16 09:10"
    },
    {
      doctor: "BS. Lan",
      time: "2026-03-15 14:22"
    }
  ];

  return (
    <div className="hv-card">

      <h3>Ai đã xem hồ sơ</h3>

      <table className="hv-table">

        <thead>
          <tr>
            <th>Bác sĩ</th>
            <th>Thời gian</th>
          </tr>
        </thead>

        <tbody>

          {logs.map((l, i) => (
            <tr key={i}>
              <td>{l.doctor}</td>
              <td>{l.time}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default AccessLogs;