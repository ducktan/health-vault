const API_URL = "http://localhost:5000/api/users";

// 🔹 Lấy toàn bộ user
export const getUsers = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Lỗi khi lấy danh sách user");
  }

  return res.json();
};

export const getUserById = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/users/${id}`);

  if (!res.ok) {
    throw new Error("Lỗi lấy chi tiết user");
  }

  return res.json();
};

// 🔹 Xóa user
export const deleteUser = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Xóa thất bại");
  }

  return res.json();
};
export const updateUser = async (id: string, data: any) => {
  const res = await fetch(`http://localhost:5000/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Update thất bại");
  }

  return res.json();
};
export const createUser = async (data: any) => {
  const res = await fetch("http://localhost:5000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Tạo user thất bại");
  }

  return res.json();
};