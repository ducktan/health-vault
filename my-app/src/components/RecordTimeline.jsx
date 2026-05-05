import "../styles/recordTimeline.css";
const RecordTimeline = ({ visits, onSelect, selectedId }) => {
  if (!visits || visits.length === 0) {
    return <p>Chưa có lần khám</p>;
  }

  return (
    <div className="hv-card">
      <h3>Lịch sử khám</h3>

      <div className="hv-visit-list">
        {visits.map((v) => (
          <div
            key={v._id}
            className={`hv-visit-item ${
              selectedId === v._id ? "active" : ""
            }`}
            onClick={() => onSelect(v)}
          >
            <div className="hv-visit-time">
              {new Date(v.createdAt).toLocaleString()}
            </div>

            <div className="hv-visit-doctor">
              Bác sĩ: {v.doctor_id?.fullname}
            </div>

            <div className="hv-visit-diagnosis">
              {v.diagnosis || "Chưa có chẩn đoán"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordTimeline;