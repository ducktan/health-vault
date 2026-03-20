import api from "./api";

export const loginAPI = (username: string, password: string) => {
  return api.post("/auth/login", {
    username,
    password,
  });
};

export const registerAPI = (
  username: string,
  fullname: string,
  email: string,
  password: string
) => {
  return api.post("/auth/register", {
    username,
    fullname,
    email,
    password,
  });
};

export const forgotPasswordAPI = (email: string) => {
  return api.post("/auth/forgot-password", {
    email,
  });
};


export const resetPasswordAPI = (token: string, newPassword: string) => {
  return api.post("/auth/reset-password", {
    token,
    newPassword,
  });
};