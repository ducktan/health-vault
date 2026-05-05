// Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/home.css";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // nếu đang load, chưa set user → tránh render trống
  if (loading) return null; // hoặc <div>Loading...</div>

  return (
    <nav className="hv-nav">
      <div className="hv-container hv-nav-inner">
        <Link to="/" className="hv-logo" style={{ textDecoration: "none" }}>
          <i className="fa-solid fa-heart-pulse"></i>
          <span>Health Vault</span>
        </Link>

        <div className="hv-nav-actions">
          {!user ? (
            <>
              <Link
                to="/register"
                className="hv-btn-outline"
                style={{ textDecoration: "none" }}
              >
                Đăng ký
              </Link>
              <Link
                to="/login"
                className="hv-btn-primary"
                style={{ textDecoration: "none" }}
              >
                Đăng nhập
              </Link>
            </>
          ) : (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-user"></i> {user.fullname}
              </button>
              <ul className="dropdown-menu" aria-labelledby="userDropdown">
                {/* Doctor */}
                {user.role === "doctor" && (
                  <li>
                    <Link className="dropdown-item" to="/doctor">
                      <i className="fa-solid fa-house-medical"></i> Dashboard
                    </Link>
                  </li>
                )}

                {/* Admin */}
                {user.role === "admin" && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/admin/users">
                        <i className="fa-solid fa-users-gear"></i> Admin
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/health">
                        <i className="fa-solid fa-user-doctor"></i> Bệnh án
                      </Link>
                    </li>
                  </>
                )}

                {/* Patient */}
                {user.role === "patient" && (
                  <li>
                    <Link className="dropdown-item" to="/patient">
                      <i className="fa-solid fa-bed"></i> Dashboard
                    </Link>
                  </li>
                )}

                {/* Luôn có link profile */}
                <li>
                  <Link className="dropdown-item" to="/profile">
                    <i className="fa-solid fa-id-card"></i> Profile
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* Logout */}
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;