import React, { useState } from "react";
import { updateUser } from "../../services/user";

const EditUserModal = ({ user, closeModal, onUpdated }: any) => {

  const [form, setForm] = useState({
    fullname: user.fullname || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    gender: user.gender || ""
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await updateUser(user._id, form);

      alert("Cập nhật thành công");

      onUpdated(); // 🔥 reload list
      closeModal();

    } catch (err) {
      console.error(err);
      alert("Lỗi update");
    }
  };

  return (
    <div className="hv-modal-overlay">
      <div className="hv-modal">

        <h3>Sửa người dùng</h3>

        <input name="fullname" value={form.fullname} onChange={handleChange} placeholder="Họ tên" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="SĐT" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Địa chỉ" />

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Chọn giới tính</option>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
        </select>

        <div className="hv-modal-actions">
          <button className="btn btn-secondary" onClick={closeModal}>Hủy</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Lưu</button>
        </div>

      </div>
    </div>
  );
};

export default EditUserModal;