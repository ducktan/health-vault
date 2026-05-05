import React, { useState } from "react";

const CreateRecordModal = ({ closeModal, onCreate }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    cccd: "",
    dob: "",
    gender: "Nam",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // ❗ chặn reload

    try {
      await onCreate(formData); // 🔥 gọi lên Dashboard
    } catch (err) {
      alert("Tạo thất bại: " + err.message);
    }
  };

  return (
    <div className="hv-modal-overlay">
      <div className="hv-modal">
        <h3>Tạo bệnh án bệnh nhân</h3>

        {/* 🔥 THÊM onSubmit */}
        <form onSubmit={handleSubmit}>

          <div className="hv-form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              required
            />
          </div>

          <div className="hv-form-group">
            <label>CCCD</label>
            <input
              type="text"
              value={formData.cccd}
              onChange={(e) =>
                setFormData({ ...formData, cccd: e.target.value })
              }
            />
          </div>

          <div className="hv-form-group">
            <label>Ngày sinh</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
            />
          </div>

          <div className="hv-form-group">
            <label>Giới tính</label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>

          <div className="hv-form-group">
            <label>SĐT</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="hv-form-group">
            <label>Địa chỉ</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div className="hv-modal-actions">
            <button
              type="button"
              className="hv-btn-outline"
              onClick={closeModal}
            >
              Hủy
            </button>

            {/* 🔥 QUAN TRỌNG: type="submit" */}
            <button type="submit" className="hv-btn-primary">
              Tạo bệnh án
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateRecordModal;