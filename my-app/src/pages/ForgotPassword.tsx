import React from "react";
import "../styles/auth.css";

const ForgotPassword: React.FC = () => {
  return (
    <div className="hv-auth">

      <div className="hv-auth-card">

        <h2>Quên mật khẩu</h2>

        <p className="hv-auth-desc">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
        </p>

        <form>

          <div className="hv-form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <button className="hv-btn-primary hv-auth-btn">
            Gửi yêu cầu
          </button>

        </form>

        <p className="hv-auth-link">
          Quay lại <a href="/login">Đăng nhập</a>
        </p>

      </div>

    </div>
  );
};

export default ForgotPassword;