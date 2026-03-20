import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { forgotPasswordAPI } from "../services/auth";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await forgotPasswordAPI(email);

      // ✅ Thông báo
      setMessage("Mật khẩu đã được gửi qua email của bạn!");

      // ✅ Delay 2s rồi chuyển trang
      // setTimeout(() => {
      //   navigate("/login");
      // }, 2000);

    } catch (err: any) {
      setError(err.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="hv-auth">
      <div className="hv-auth-card">
        <h2>Quên mật khẩu</h2>

        <p className="hv-auth-desc">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="hv-form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="hv-btn-primary hv-auth-btn">
            Gửi yêu cầu
          </button>
        </form>

        {/* Thông báo */}
        {message && (
          <div className="mt-4">
            <div className="bg-light text-center rounded-3 p-4 border">
              
              <div className="mb-2" style={{ fontSize: "26px" }}>📩</div>

              <h6 className="fw-semibold mb-1">
                Kiểm tra email của bạn
              </h6>

              <p className="text-muted small mb-3">
                Chúng tôi đã gửi liên kết đặt lại mật khẩu.
              </p>
            </div>
          </div>
        )}
        <p className="hv-auth-link mt-3">
          Quay lại <a href="/login">đăng nhập</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;