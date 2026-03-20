import React from "react";

const ExaminationDetail: React.FC = () => {

  return (
    <div className="hv-card">

      <h3>Chi tiết khám bệnh</h3>

      <div className="hv-record-grid">

        <div>
          <label>Triệu chứng</label>
          <p>Sốt, đau họng</p>
        </div>

        <div>
          <label>Chẩn đoán</label>
          <p>Cảm cúm</p>
        </div>

        <div>
          <label>Phác đồ điều trị</label>
          <p>Uống thuốc hạ sốt</p>
        </div>

        <div>
          <label>Đơn thuốc</label>
          <p>Paracetamol 500mg</p>
        </div>

        <div>
          <label>Ghi chú</label>
          <p>Nghỉ ngơi 3 ngày</p>
        </div>

      </div>

    </div>
  );
};

export default ExaminationDetail;