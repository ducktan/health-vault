import React, { useState } from "react";

interface Props {
  patientId?: string;
  closeModal: () => void;
}

const CreateVisitModal: React.FC<Props> = ({ patientId, closeModal }) => {

  const [form, setForm] = useState({
    symptoms: "",
    diagnosis: "",
    treatment: "",
    prescription: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {

    console.log("Create visit:", {
      patientId,
      ...form
    });

    closeModal();
  };

  return (

    <div className="hv-modal-overlay">

      <div className="hv-modal">

        <h3>Tạo lần khám mới</h3>

        <label>Triệu chứng</label>
        <textarea
          name="symptoms"
          onChange={handleChange}
        />

        <label>Chẩn đoán</label>
        <textarea
          name="diagnosis"
          onChange={handleChange}
        />

        <label>Phác đồ điều trị</label>
        <textarea
          name="treatment"
          onChange={handleChange}
        />

        <label>Đơn thuốc</label>
        <textarea
          name="prescription"
          onChange={handleChange}
        />

        <label>Ghi chú</label>
        <textarea
          name="notes"
          onChange={handleChange}
        />

        <div className="hv-modal-actions">

          <button
            className="hv-btn-outline"
            onClick={closeModal}
          >
            Hủy
          </button>

          <button
            className="hv-btn-primary"
            onClick={handleSubmit}
          >
            Lưu
          </button>

        </div>

      </div>

    </div>

  );
};

export default CreateVisitModal;