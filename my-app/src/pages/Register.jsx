import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const Register = () => {
  const { register } = useAuth();
  console.log(register);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    try {
      setLoading(true);

      await register(
        form.username,
        form.password,
        form.fullname,
        form.email
      );

      navigate("/"); // đã login

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đăng ký thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hv-auth">
      <div className="hv-auth-card">
        <h2>Đăng ký</h2>

        {error && <p className="hv-error">{error}</p>}

        <form className="hv-form" onSubmit={handleSubmit}>

          <div className="hv-form-group">
            <label>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="hv-form-group">
            <label>Họ và tên</label>
            <input
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="hv-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="hv-form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="hv-form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="hv-btn-primary hv-auth-btn"
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "Tạo tài khoản"}
          </button>

        </form>

        <p className="hv-auth-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;