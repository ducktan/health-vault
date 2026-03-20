import React, { useState } from "react";
import { registerAPI } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await registerAPI(
        username,
        fullname,
        email,
        password
      );

      console.log("REGISTER SUCCESS:", res.data);

      setSuccess("Đăng ký thành công! Đang chuyển sang đăng nhập...");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err: any) {
      console.error(err.response?.data);

      setError(err.response?.data?.message || "Đăng ký thất bại");
      setSuccess("");
    }
  };

  return (
    <div className="hv-auth">
      <div className="hv-auth-card">
        <h2>Đăng ký</h2>

        {/* 🔥 THÊM UI THÔNG BÁO */}
        {success && (
          <div className="alert alert-success text-center">
            {success}
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <form className="hv-form" onSubmit={handleRegister}>
          <div className="hv-form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Nhập email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="hv-form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Nhập username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="hv-form-group">
            <label>Họ tên</label>
            <input
              type="text"
              placeholder="Nhập họ tên"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div className="hv-form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="hv-btn-primary hv-auth-btn">
            Đăng ký
          </button>
        </form>

        <p className="hv-auth-link">
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      </div>
    </div>
  );
};

export default Register;