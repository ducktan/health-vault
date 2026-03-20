import React, { useState } from "react";
import "../styles/auth.css";
import { loginAPI } from "../services/auth";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await loginAPI(username, password);

    console.log("LOGIN SUCCESS:", res.data);

    // 🔥 lưu token
    localStorage.setItem("token", res.data.token);

    // 🔥 THÊM DÒNG NÀY (QUAN TRỌNG NHẤT)
    localStorage.setItem("user", JSON.stringify(res.data.user));

    window.location.href = "/";

  } catch (err: any) {
    console.error(err);
    alert("Sai tài khoản hoặc mật khẩu");
  }
};

  return (
    <div className="hv-auth">
      <div className="hv-auth-card">
        <h2>Đăng nhập</h2>

        {/* 🔥 thêm onSubmit */}
        <form className="hv-form" onSubmit={handleLogin}>

          <div className="hv-form-group">
            <label>Tên người dùng</label>
            <input
              type="text"
              placeholder="Nhập tên người dùng"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            Đăng nhập
          </button>

        </form>
       <div className="d-flex justify-content-center align-items-center gap-2 mt-3 small text-muted">
          <a href="/register" className="text-decoration-none">
            Đăng ký
          </a>
          <span>•</span>
          <a href="/forgot-password" className="text-decoration-none">
            Quên mật khẩu?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;