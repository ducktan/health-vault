import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

const Home: React.FC = () => {
  return (
    <div className="hv-page">

      <Navbar />

      {/* HERO */}
      <section className="hv-hero">
        <div className="hv-container hv-hero-grid">
          <div className="hv-hero-text">
            <h1>Quản lý hồ sơ bệnh án điện tử</h1>

            <p>
              Health Vault giúp bạn lưu trữ, quản lý và truy cập hồ sơ sức khỏe
              một cách an toàn, nhanh chóng và tiện lợi.
            </p>

            <div className="hv-hero-actions">
              <button className="hv-btn-primary">Bắt đầu ngay</button>
              <button className="hv-btn-outline">Tìm hiểu thêm</button>
            </div>
          </div>

          <div className="hv-hero-card">
            <i className="fa-solid fa-notes-medical"></i>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="hv-features">
        <div className="hv-container">
          <h2 className="hv-section-title">Chức năng hệ thống</h2>

          <div className="hv-feature-grid">

            <div className="hv-feature-card">
              <i className="fa-solid fa-file-medical"></i>
              <h3>Quản lý hồ sơ</h3>
              <p>Lưu trữ và quản lý hồ sơ bệnh án cá nhân.</p>
            </div>

            <div className="hv-feature-card">
              <i className="fa-solid fa-user-doctor"></i>
              <h3>Bác sĩ</h3>
              <p>Bác sĩ có thể truy cập hồ sơ bệnh nhân.</p>
            </div>

            <div className="hv-feature-card">
              <i className="fa-solid fa-chart-line"></i>
              <h3>Theo dõi sức khỏe</h3>
              <p>Theo dõi lịch sử khám bệnh và điều trị.</p>
            </div>

            <div className="hv-feature-card">
              <i className="fa-solid fa-shield-heart"></i>
              <h3>Bảo mật</h3>
              <p>Dữ liệu sức khỏe được bảo vệ an toàn.</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
};

export default Home;