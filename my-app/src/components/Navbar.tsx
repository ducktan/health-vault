import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <nav className="hv-nav">
      <div className="hv-container hv-nav-inner">

        <Link to="/" className="hv-logo" style={{ textDecoration: "none" }}>
          <i className="fa-solid fa-heart-pulse"></i>
          <span>Health Vault</span>
        </Link>

        <div className="hv-nav-actions">

          {user ? (
            // 🔥 ĐÃ LOGIN
            <>
              <div className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-user-circle fs-6 text-primary"></i>

                <span className="mb-0">
                  {" "}
                  <strong className="text-primary">
                    {user.fullname || user.username}
                  </strong>
                </span>
              </div>

              <button onClick={handleLogout} className="hv-btn-outline">
                Đăng xuất
              </button>
            </>
          ) : (
            // 🔥 CHƯA LOGIN
            <>
              <Link to="/register" className="hv-btn-outline">
                Đăng ký
              </Link>

              <Link to="/login" className="hv-btn-primary">
                Đăng nhập
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;