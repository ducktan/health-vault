import React, { useState } from "react";

const CreateVisitModal = ({ closeModal, onCreate, medicalRecordId }) => {
  const [form, setForm] = useState({
    symptoms: "",
    diagnosis: "",
    treatment: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await onCreate({
        ...form,
        medical_record_id: medicalRecordId,
      });

    } catch (err) {
      alert("Tạo lần khám thất bại: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hv-modal-overlay">
      <div className="hv-modal">

        <h3>Thêm lần khám</h3>

        <form onSubmit={handleSubmit}>

          {/* TRIỆU CHỨNG */}
          <div className="hv-form-group">
            <label>Triệu chứng</label>
            <textarea
              name="symptoms"
              placeholder="VD: Sốt, ho, đau họng..."
              value={form.symptoms}
              onChange={handleChange}
              required
            />
          </div>

          {/* CHẨN ĐOÁN */}
          <div className="hv-form-group">
            <label>Chẩn đoán</label>
            <textarea
              name="diagnosis"
              placeholder="VD: Viêm họng cấp"
              value={form.diagnosis}
              onChange={handleChange}
              required
            />
          </div>

          {/* ĐIỀU TRỊ */}
          <div className="hv-form-group">
            <label>Phác đồ điều trị</label>
            <textarea
              name="treatment"
              placeholder="VD: Uống thuốc, nghỉ ngơi"
              value={form.treatment}
              onChange={handleChange}
            />
          </div>

          {/* GHI CHÚ */}
          <div className="hv-form-group">
            <label>Ghi chú</label>
            <textarea
              name="note"
              placeholder="Ghi chú thêm nếu có..."
              value={form.note}
              onChange={handleChange}
            />
          </div>

          {/* ACTION */}
          <div className="hv-modal-actions">
            <button
              type="button"
              className="hv-btn-outline"
              onClick={closeModal}
              disabled={loading}
            >
              Hủy
            </button>

            <button
              type="submit"
              className="hv-btn-primary"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu lần khám"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateVisitModal;