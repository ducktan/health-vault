import React from "react";
import "../styles/global.css";
import "../styles/profile.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile: React.FC = () => {
    return (
        <div className="hv-page">
            <Navbar />
            <div className="hv-profile">

                <div className="hv-container">

                    <h2 className="hv-page-title">
                        Thông tin cá nhân
                    </h2>

                    <div className="hv-profile-card">

                        <form>

                            <div className="hv-profile-grid">

                                <div className="hv-form-group">
                                    <label>Username</label>
                                    <input type="text" defaultValue="user01" disabled />
                                </div>

                                <div className="hv-form-group">
                                    <label>Email</label>
                                    <input type="email" defaultValue="user@email.com" />
                                </div>

                                <div className="hv-form-group">
                                    <label>Họ và tên</label>
                                    <input type="text" defaultValue="Nguyễn Văn A" />
                                </div>

                                <div className="hv-form-group">
                                    <label>CCCD</label>
                                    <input type="text" defaultValue="012345678901" />
                                </div>

                                <div className="hv-form-group">
                                    <label>Ngày sinh</label>
                                    <input type="date" />
                                </div>

                                <div className="hv-form-group">
                                    <label>Giới tính</label>

                                    <select className="hv-input">
                                        <option>Nam</option>
                                        <option>Nữ</option>
                                    </select>

                                </div>

                                <div className="hv-form-group">
                                    <label>Số điện thoại</label>
                                    <input type="text" />
                                </div>

                                <div className="hv-form-group">
                                    <label>Địa chỉ</label>
                                    <input type="text" />
                                </div>

                            </div>

                            <button className="hv-btn-primary">
                                Cập nhật thông tin
                            </button>

                        </form>

                    </div>

                </div>

            </div>
            <Footer />

        </div>


    );
};

export default Profile;