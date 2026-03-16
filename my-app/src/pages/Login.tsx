import React from "react";
import "../styles/auth.css";

const Login: React.FC = () => {
  return (
    <div className="hv-auth">

      <div className="hv-auth-card">

        <h2>Đăng nhập</h2>

        <form className="hv-form">

          <div className="hv-form-group">
            <label>Email</label>
            <input type="email" placeholder="Nhập email" required />
          </div>

          <div className="hv-form-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" required />
          </div>

          <button type="submit" className="hv-btn-primary hv-auth-btn">
            Đăng nhập
          </button>

        </form>

        <p className="hv-auth-link">
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>

      </div>

    </div>
  );
};

export default Login;