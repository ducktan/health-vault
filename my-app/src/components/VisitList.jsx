const VisitList = ({ visits }) => {
  if (!visits || visits.length === 0) {
    return <p>Chưa có lịch sử khám</p>;
  }

  return (
    <div className="hv-card hv-visit-list">
      <h3>Lịch sử khám bệnh</h3>

      {visits.map((v) => (
        <div key={v._id} className="hv-visit-item">

          <div className="hv-visit-header">
            <div className="hv-visit-date">
              {new Date(v.createdAt).toLocaleString()}
            </div>
            <div className="hv-visit-doctor">
              BS. {v.doctor_id?.fullname}
            </div>
          </div>

          <div className="hv-visit-body">
            <div><span>Triệu chứng:</span> {v.symptoms}</div>
            <div><span>Chẩn đoán:</span> {v.diagnosis}</div>
            <div><span>Điều trị:</span> {v.treatment}</div>
            <div><span>Ghi chú:</span> {v.note}</div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default VisitList;