// src/services/adminService.js
import { api } from "./api";

// --- GET /admin/users ---
export const getUsersApi = async (accessToken) => {
  return await api("/admin/users", { method: "GET" }, accessToken);
};

// --- POST /admin/users ---
export const createUserApi = async (accessToken, userData) => {
  // userData = { username, password, fullname, email, role }
  return await api("/admin/users", { method: "POST", data: userData }, accessToken);
};

// --- PUT /admin/users/:id ---
export const updateUserApi = async (accessToken, id, userData) => {
  // userData = { fullname?, email?, role? }
  return await api(`/admin/users/${id}`, { method: "PUT", data: userData }, accessToken);
};

// --- DELETE /admin/users/:id ---
export const deleteUserApi = async (accessToken, id) => {
  return await api(`/admin/users/${id}`, { method: "DELETE" }, accessToken);
};