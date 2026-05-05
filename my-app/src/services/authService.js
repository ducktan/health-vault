import { api } from "./api";

// LOGIN
export const loginApi = async (identifier, password) => {
  return api("/auth/login", {
    method: "POST",
    data: {
      identifier,
      password,
    },
  });
};

// REGISTER
export const registerApi = async (
  username,
  password,
  fullname,
  email
) => {
  return api("/auth/register", {
    method: "POST",
    data: {
      username,
      password,
      fullname,
      email,
    },
  });
};

// GET ME
export const getMeApi = async (auth) => {
  return api("/users/me", {
    method: "GET",
  }, auth);
};

// UPDATE ME
export const updateMeApi = async (auth, data) => {
  return api("/users/me", {
    method: "PUT",
    data,
  }, auth);
};

// LOGOUT
export const logoutApi = async () => {
  return api("/auth/logout", {
    method: "POST",
  });
};

// REFRESH (nếu cần gọi thủ công)
export const refreshApi = async () => {
  return await api("/auth/refresh", {
    method: "POST",       // BE đang dùng POST
    credentials: "include" // ✅ bắt buộc gửi cookie
  });
};