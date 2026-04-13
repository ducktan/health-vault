/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateRecordModal from "../components/CreateRecordModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/dashboard.css";
import { useAuth } from "../hooks/useAuth";
import { useMedicalRecords } from "../hooks/useMedicalRecords";
import { usePatient } from "../hooks/usePatient";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  // 🔥 search states
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [sort, setSort] = useState("newest");

  const { user } = useAuth();
  console.log("DoctorDashboard user:", user);
  const { createPatient } = usePatient();
  const { records, loading, deleteRecord, fetchRecords } =
    useMedicalRecords();

  // 🔥 FILTER + SEARCH + SORT
  const filteredRecords = records
    .filter((r) => {
      const name = r.patient_id?.fullname?.toLowerCase() || "";
      const cccd = r.patient_id?.cccd || "";

      const matchSearch =
        name.includes(search.toLowerCase()) ||
        cccd.includes(search);

      const matchGender =
        !genderFilter || r.patient_id?.gender === genderFilter;

      return matchSearch && matchGender;
    })
    .sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  return (
    <div className="hv-doctor-layout">
      <Navbar />

      {/* DOCTOR INFO */}
      <div className="hv-doctor-bar">
        <div className="hv-container hv-doctor-inner">
          <div className="hv-doctor-left">
            <div className="hv-avatar">
              <i className="fa-solid fa-user-doctor"></i>
            </div>

            <div className="hv-doctor-info">
              <div className="hv-doctor-name">
                BS. {user?.fullname || "Đang tải..."}
              </div>

              <div className="hv-doctor-meta">
                {user?.department || "Chưa cập nhật"} • Bệnh viện Health Vault
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hv-dashboard">
        <div className="hv-container">
          <div className="hv-dashboard-header">
            <h2>Quản lý hồ sơ bệnh án</h2>

            <button
              className="hv-btn-primary"
              onClick={() => setShowModal(true)}
            >
              Tạo bệnh án
            </button>
          </div>

          {/* 🔥 SEARCH */}
          <div className="hv-search-bar">
            <input
              type="text"
              placeholder="Tìm theo tên hoặc CCCD..."
              className="hv-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="hv-filter"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">Giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>

            <select
              className="hv-filter"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
            </select>
          </div>

          {/* TABLE */}
          <table className="hv-table">
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>CCCD</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>SĐT</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7">Đang tải dữ liệu...</td>
                </tr>
              ) : filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="7">Không có hồ sơ</td>
                </tr>
              ) : (
                filteredRecords.map((r) => (
                  <tr key={r._id}>
                    <td>{r.patient_id?.fullname}</td>
                    <td>{r.patient_id?.cccd || "—"}</td>
                    <td>{r.patient_id?.dob?.slice(0, 10) || "—"}</td>
                    <td>{r.patient_id?.gender}</td>
                    <td>{r.patient_id?.phone}</td>
                    <td>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <button
                        className="hv-btn-outline mx-2"
                        onClick={() =>
                          navigate(`/doctor/records/${r._id}`)
                        }
                      >
                        Xem
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />

      {/* MODAL */}
      {showModal && (
        <CreateRecordModal
          closeModal={() => setShowModal(false)}
          onCreate={async (formData) => {
            try {
              const res = await createPatient(formData);

              // 🔥 sau khi tạo patient → reload records
              await fetchRecords();

              setShowModal(false);
            } catch (err) {
              alert("Tạo bệnh án thất bại: " + err.message);
            }
          }}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;