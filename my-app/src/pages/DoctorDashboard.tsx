import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateRecordModal from "../components/CreateRecordModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/dashboard.css";


const DoctorDashboard: React.FC = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const doctor = {
        name: "BS. Nguyễn Minh Khang",
        department: "Nội tổng quát",
        hospital: "Bệnh viện Health Vault",
    };

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
                            <div className="hv-doctor-name">{doctor.name}</div>
                            <div className="hv-doctor-meta">
                                {doctor.department} • {doctor.hospital}
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

                    {/* SEARCH */}

                    <div className="hv-search-bar">

                        <input
                            type="text"
                            placeholder="Tìm theo tên hoặc CCCD..."
                            className="hv-search-input"
                        />

                        <select className="hv-filter">
                            <option>Giới tính</option>
                            <option>Nam</option>
                            <option>Nữ</option>
                        </select>

                        <select className="hv-filter">
                            <option>Sắp xếp</option>
                            <option>Mới nhất</option>
                            <option>Cũ nhất</option>
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

                            <tr>
                                <td>Nguyễn Văn A</td>
                                <td>0123456789</td>
                                <td>1995-10-10</td>
                                <td>Nam</td>
                                <td>0901234567</td>
                                <td>2026-03-16</td>
                                <td>
                                    <button
                                        className="hv-btn-outline"
                                        onClick={() => navigate("/doctor/records/1")}
                                    >
                                        Xem chi tiết
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td>Trần Thị B</td>
                                <td>0987654321</td>
                                <td>1998-02-20</td>
                                <td>Nữ</td>
                                <td>0912345678</td>
                                <td>2026-03-10</td>
                                <td>
                                    <button
                                        className="hv-btn-outline"
                                        onClick={() => navigate("/doctor/records/1")}
                                    >
                                        Xem chi tiết
                                    </button>
                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

            <Footer />

            {showModal && (
                <CreateRecordModal closeModal={() => setShowModal(false)} />
            )}

        </div>
    );
};

export default DoctorDashboard;