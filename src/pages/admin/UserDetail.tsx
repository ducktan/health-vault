import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../services/user";

interface User {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface Patient {
  cccd?: string;
  dob?: string;
  gender?: string;
  phone?: string;
  address?: string;
}

const UserDetail: React.FC = () => {
  const { id } = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        const data = await getUserById(id);

        setUser(data.user);
        setPatient(data.patient);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  if (!user) return <p>Đang tải...</p>;

  // 🔥 format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("vi-VN");
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Thông tin người dùng</h2>

      <div className="card p-4 shadow-sm">

        {/* ===== USER INFO ===== */}
        <h4>👤 Thông tin tài khoản</h4>

        <p><b>ID:</b> {user._id}</p>
        <p><b>Username:</b> {user.username}</p>
        <p><b>Họ tên:</b> {user.fullname}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
        <p><b>Ngày tạo:</b> {formatDate(user.createdAt)}</p>
        <p><b>Cập nhật:</b> {formatDate(user.updatedAt)}</p>

        {/* ===== PATIENT INFO ===== */}
        {patient && (
          <>
            <hr />

            <h4>🩺 Thông tin bệnh nhân</h4>

            <p><b>CCCD:</b> {patient.cccd}</p>
            <p><b>Ngày sinh:</b> {patient.dob ? formatDate(patient.dob) : ""}</p>
            <p><b>Giới tính:</b> {patient.gender}</p>
            <p><b>SĐT:</b> {patient.phone}</p>
            <p><b>Địa chỉ:</b> {patient.address}</p>
          </>
        )}

      </div>
    </div>
  );
};

export default UserDetail;