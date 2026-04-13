import React, { useEffect, useState } from "react";
import "../styles/global.css";
import "../styles/profile.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import { getMeApi, updateMeApi } from "../services/authService";
import { linkPatientApi } from "../services/patientService";

const Profile = () => {
  const { accessToken } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    fullname: "",
    cccd: "",
    dob: "",
    gender: "",
    phone: "",
    address: ""
  });

  const [isLinked, setIsLinked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [linking, setLinking] = useState(false);

  // =========================
  // Utils
  // =========================
  const normalizeGender = (g) => {
    if (!g) return "";
    const val = g.toLowerCase();

    if (["male", "m", "nam"].includes(val)) return "male";
    if (["female", "f", "nu"].includes(val)) return "female";

    return "";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString().split("T")[0];
  };

  const handleError = (err, fallback = "Có lỗi xảy ra") => {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      fallback;
    alert(message);
  };

  // =========================
  // Load profile
  // =========================
  const loadProfile = async () => {
    if (!accessToken) return;

    try {
      const data = await getMeApi(accessToken);

      setForm({
        username: data.user.username,
        email: data.user.email,
        fullname: data.user.fullname,
        cccd: data.patient?.cccd || "",
        dob: formatDate(data.patient?.dob),
        gender: normalizeGender(data.patient?.gender),
        phone: data.patient?.phone || "",
        address: data.patient?.address || ""
      });

      setIsLinked(!!data.patient);
    } catch (err) {
      console.error(err);
      handleError(err, "Không tải được thông tin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [accessToken]);

  // =========================
  // Handlers
  // =========================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLinkCCCD = async () => {
    if (!accessToken) return;

    if (!form.cccd) {
      alert("Vui lòng nhập CCCD");
      return;
    }

    try {
      setLinking(true);

      await linkPatientApi(accessToken, form.cccd);

      await loadProfile();

      alert("Liên kết bệnh án thành công");
    } catch (err) {
      handleError(err, "Liên kết thất bại");
    } finally {
      setLinking(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!accessToken) return;

    try {
      setUpdating(true);

      await updateMeApi(accessToken, {
        fullname: form.fullname,
        email: form.email,
        phone: form.phone,
        address: form.address
      });

      await loadProfile();

      alert("Cập nhật thành công");
    } catch (err) {
      handleError(err, "Cập nhật thất bại");
    } finally {
      setUpdating(false);
    }
  };

  // =========================
  // Render
  // =========================
  if (loading) return <div className="hv-container">Loading...</div>;

  return (
    <div className="hv-page">
      <Navbar />

      <div className="hv-profile">
        <div className="hv-container">
          <h2 className="hv-page-title">Thông tin cá nhân</h2>

          {!isLinked && (
            <div className="hv-warning">
              Bạn chưa liên kết hồ sơ bệnh án
            </div>
          )}

          <div className="hv-profile-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProfile();
              }}
            >
              <div className="hv-profile-grid">

                <div className="hv-form-group">
                  <label>Username</label>
                  <input name="username" value={form.username} disabled />
                </div>

                <div className="hv-form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="hv-form-group">
                  <label>Họ và tên</label>
                  <input
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                  />
                </div>

                <div className="hv-form-group">
                  <label>CCCD</label>
                  <input
                    name="cccd"
                    value={form.cccd}
                    onChange={handleChange}
                    disabled={isLinked}
                  />
                </div>

                <div className="hv-form-group">
                  <label>Ngày sinh</label>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                  />
                </div>

                <div className="hv-form-group">
                  <label>Giới tính</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="hv-input"
                  >
                    <option value="">Chọn</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                </div>

                <div className="hv-form-group">
                  <label>Số điện thoại</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="hv-form-group">
                  <label>Địa chỉ</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div style={{ marginTop: "20px" }}>
                <button className="hv-btn-primary" disabled={updating}>
                  {updating ? "Đang cập nhật..." : "Cập nhật thông tin"}
                </button>

                {!isLinked && (
                  <button
                    type="button"
                    className="hv-btn-primary"
                    style={{ marginLeft: "20px" }}
                    onClick={handleLinkCCCD}
                    disabled={linking}
                  >
                    {linking ? "Đang liên kết..." : "Liên kết bệnh án"}
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;