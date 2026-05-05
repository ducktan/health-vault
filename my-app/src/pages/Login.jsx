import React from "react";
import { useLogin } from "../hooks/useLogin";
import "../styles/auth.css";

const Login = () => {
  const {
    identifier,
    setIdentifier,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  } = useLogin();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="hv-auth">
      <div className="hv-auth-card">
        <h2>Đăng nhập</h2>

        <form className="hv-form" onSubmit={onSubmit}>
          <div className="hv-form-group">
            <label>Email hoặc Username</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="hv-form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="hv-error">{error}</p>}

          <button
            type="submit"
            className="hv-btn-primary hv-auth-btn"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;