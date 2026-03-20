import React from "react";
import "../styles/auth.css";

const Register: React.FC = () => {
  return (
    <div className="hv-auth">

      <div className="hv-auth-card">

        <h2>Đăng ký</h2>

        <form className="hv-form">

          <div className="hv-form-group">
            <label>Họ và tên</label>
            <input type="text" placeholder="Nhập họ tên" required />
          </div>

          <div className="hv-form-group">
            <label>Email</label>
            <input type="email" placeholder="Nhập email" required />
          </div>

          <div className="hv-form-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" required />
          </div>

          <div className="hv-form-group">
            <label>Xác nhận mật khẩu</label>
            <input type="password" placeholder="Nhập lại mật khẩu" required />
          </div>

          <button type="submit" className="hv-btn-primary hv-auth-btn">
            Tạo tài khoản
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