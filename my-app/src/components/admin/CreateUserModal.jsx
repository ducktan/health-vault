import React, { useState } from "react";

const CreateUserModal = ({ closeModal, onCreate }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    role: "patient",
    department: "" // thêm field department
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onCreate(formData);
      closeModal(); // đóng modal sau khi tạo thành công
    } catch (err) {
      alert("Tạo user thất bại: " + err.message);
    }
  };

  return (
    <div className="hv-modal-overlay">
      <div className="hv-modal">
        <h3>Tạo người dùng mới</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Fullname"
            value={formData.fullname}
            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                role: e.target.value,
                department: "" // reset department khi đổi role
              }))
            }
          >
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>

          {/* chỉ show department nếu role là doctor/admin */}
          {(formData.role === "doctor" || formData.role === "admin") && (
            <input
              type="text"
              placeholder="Department"
              value={formData.department}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, department: e.target.value }))
              }
              required
            />
          )}

          <div className="hv-modal-actions">
            <button type="submit" className="hv-btn-primary">Tạo</button>
            <button type="button" className="hv-btn-outline" onClick={closeModal}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;