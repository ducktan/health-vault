import React, { useState } from "react";

interface Props {
  closeModal: () => void;
}

interface FormState {
  name: string;
  email: string;
  role: string;
  password: string;
}

const CreateUserModal: React.FC<Props> = ({ closeModal }) => {

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    role: "patient",
    password: ""
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

  const handleSubmit = () => {
    console.log("create user", form);
    closeModal();
  };

  return (

    <div className="hv-modal-overlay">

      <div className="hv-modal">

        <h3>Tạo người dùng</h3>

        <input
          name="name"
          placeholder="Tên"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <select
          name="role"
          onChange={handleChange}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>

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
            Tạo
          </button>

        </div>

      </div>

    </div>

  );
};

export default CreateUserModal;