import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Navbar: React.FC = () => {
  return (
    <nav className="hv-nav">
      <div className="hv-container hv-nav-inner">

        <Link to="/" className="hv-logo" style={{ textDecoration: "none" }}>
          <i className="fa-solid fa-heart-pulse"></i>
          <span>Health Vault</span>
        </Link>


        <div className="hv-nav-actions">

          <Link to="/register" className="hv-btn-outline">
            Đăng ký
          </Link>

          <Link to="/login" className="hv-btn-primary">
            Đăng nhập
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;