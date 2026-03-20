import React, { useState } from "react";
import { createUser } from "../../services/user";

interface Props {
  closeModal: () => void;
}

const CreateUserModal: React.FC<Props> = ({ closeModal }) => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",

    // 🔥 patient fields
    cccd: "",
    dob: "",
    gender: "male",
    phone: "",
    address: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {

      // 🔥 gửi data
      await createUser(form);

      alert("Tạo thành công");

      closeModal();
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Lỗi tạo user");
    }
  };

  return (
    <div className="hv-modal-overlay">
      <div className="hv-modal">

        <h3>Tạo người dùng</h3>

        {/* ===== USER ===== */}
        <input name="name" placeholder="Họ tên" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        <select name="role" onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>

        {/* ===== PATIENT (chỉ hiện khi patient) ===== */}
        {form.role === "patient" && (
          <>
            <hr />

            <h4>Thông tin bệnh nhân</h4>

            <input name="cccd" placeholder="CCCD" onChange={handleChange} />

            <input
              name="dob"
              type="date"
              onChange={handleChange}
            />

            <select name="gender" onChange={handleChange}>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>

            <input name="phone" placeholder="SĐT" onChange={handleChange} />
            <input name="address" placeholder="Địa chỉ" onChange={handleChange} />
          </>
        )}

        <div className="hv-modal-actions">
          <button className="hv-btn-outline" onClick={closeModal}>
            Hủy
          </button>

          <button className="hv-btn-primary" onClick={handleSubmit}>
            Tạo
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateUserModal;