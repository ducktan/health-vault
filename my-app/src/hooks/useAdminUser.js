// src/hooks/useAdminUsers.js
import { useState, useEffect, useContext } from "react";
import { getUsersApi, createUserApi, updateUserApi, deleteUserApi } from "../services/adminUserApi";
import { AuthContext } from "../context/AuthContextObj";

export const useAdminUsers = () => {
  const { accessToken, refreshAccessToken } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- fetch users ---
  const fetchUsers = async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const data = await getUsersApi(accessToken);
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err.message);
      // thử refresh token 1 lần nếu cần
      try {
        const newToken = await refreshAccessToken();
        const data = await getUsersApi(newToken);
        setUsers(data);
      } catch (e) {
        console.error("Fetch users failed after refresh:", e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // --- create user ---
  const createUser = async (userData) => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const data = await createUserApi(accessToken, userData);
      setUsers((prev) => [...prev, data.user]);
      return data.user;
    } catch (err) {
      console.error("Create user failed:", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- update user ---
  const updateUser = async (id, userData) => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const data = await updateUserApi(accessToken, id, userData);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? data.user : u))
      );
      return data.user;
    } catch (err) {
      console.error("Update user failed:", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- delete user ---
  const deleteUser = async (id) => {
    if (!accessToken) return;
    setLoading(true);
    try {
      await deleteUserApi(accessToken, id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete user failed:", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- load users khi hook mount ---
  useEffect(() => {
    if (accessToken) fetchUsers();
  }, [accessToken]);

  return { users, loading, fetchUsers, createUser, updateUser, deleteUser };
};