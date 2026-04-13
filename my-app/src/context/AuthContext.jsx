// AuthProvider.js
import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContextObj";
import { loginApi, logoutApi, refreshApi, getMeApi, registerApi} from "../services/authService";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [patient, setPatient] = useState(null); // nếu backend trả về patient info
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true); // chờ refresh token + user info

  // LOGIN
  const login = async (identifier, password) => {
    const data = await loginApi(identifier, password);
    setUser(data.user || null);
    setPatient(data.patient || null);
    setAccessToken(data.accessToken);
  };

  // LOGOUT
  const logout = async () => {
    await logoutApi();
    setUser(null);
    setPatient(null);
    setAccessToken(null);
  };

  // REFRESH TOKEN
  const refreshAccessToken = async () => {
    const data = await refreshApi(); // gọi refreshApi từ service
    setAccessToken(data.accessToken);
    return data.accessToken;
  };

  const register = async (username, password, fullname, email) => {
    const data = await registerApi(username, password, fullname, email);

    // nếu backend trả luôn token (nhiều hệ thống làm vậy)
    setUser(data.user || null);
    setPatient(data.patient || null);
    setAccessToken(data.accessToken);

    return data;
  };

  // 🔄 Auto refresh token khi load trang
  useEffect(() => {
    (async () => {
      try {
        const token = await refreshAccessToken();
        // nếu refresh thành công, lấy luôn user + patient info
        const userData = await getMeApi(token);
        setUser(userData.user || null);
        setPatient(userData.patient || null);
      } catch (err) {
        console.log("User not logged in or refresh failed:", err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, patient, accessToken, login, logout, refreshAccessToken, loading, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};