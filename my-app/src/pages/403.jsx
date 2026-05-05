import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.code}>403</h1>
        <h2 style={styles.title}>Bạn không có quyền truy cập</h2>

        <p style={styles.desc}>
          Trang này yêu cầu quyền truy cập đặc biệt hoặc bạn đã nhập URL không hợp lệ.
        </p>

        <div style={styles.actions}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/")}
          >
            Về trang chủ
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f7fb"
  },
  card: {
    textAlign: "center",
    background: "white",
    padding: "50px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    maxWidth: "420px",
    width: "100%"
  },
  code: {
    fontSize: "72px",
    margin: 0,
    color: "#ff4d4f"
  },
  title: {
    marginTop: "10px",
    fontSize: "24px"
  },
  desc: {
    marginTop: "10px",
    color: "#666"
  },
  actions: {
    marginTop: "30px",
    display: "flex",
    gap: "10px",
    justifyContent: "center"
  },
  primaryBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#1677ff",
    color: "white",
    cursor: "pointer"
  },
  secondaryBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "white",
    cursor: "pointer"
  }
};