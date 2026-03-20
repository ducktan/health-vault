"use client";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPasswordAPI } from "../services/auth";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e: any) => {
    e.preventDefault();

    if (!token) {
      setError("Token không hợp lệ");
      return;
    }

    try {
      const res = await resetPasswordAPI(token, password);
      setMessage(res.data.message);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Lỗi");
      setMessage("");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3 className="text-center mb-3">Đặt lại mật khẩu</h3>

      <form onSubmit={handleReset}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Nhập mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success w-100">
          Đổi mật khẩu
        </button>
      </form>

      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}