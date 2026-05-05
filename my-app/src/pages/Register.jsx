import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const Register = () => {
  const { register } = useAuth();
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

  // ===== SANITIZE =====
  const sanitizeInput = (value) => {
    return value.replace(/[<>$]/g, "");
  };

  // ===== HANDLE CHANGE =====
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: sanitizeInput(value)
    });
  };

  // ===== VALIDATE =====
  const validateForm = () => {
    const { username, fullname, email, password, confirmPassword } = form;

    // username
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return "Username chỉ gồm chữ, số, _ (3-20 ký tự)";
    }

    // fullname
    if (fullname.trim().length < 2) {
      return "Họ tên không hợp lệ";
    }

    // email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Email không hợp lệ";
    }

    // password
    if (password.length < 6) {
      return "Mật khẩu tối thiểu 6 ký tự";
    }

    // confirm password
    if (password !== confirmPassword) {
      return "Mật khẩu không khớp";
    }

    return null;
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await register(
        form.username.trim(),
        form.password,
        form.fullname.trim(),
        form.email.trim().toLowerCase()
      );

      navigate("/"); // đăng ký xong -> chuyển trang

    } catch (err) {
      setError(err?.message || "Đăng ký thất bại");
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