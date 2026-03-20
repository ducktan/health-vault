import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/user"; // 👈 import service

// ✅ Type chuẩn MongoDB
interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
}

// ✅ Props
interface UserTableProps {
  onView: (id: string) => void;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ onView, onEdit, onDelete }) => {

  // 🔥 state thật (thay mock)
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // 🚀 gọi API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error("Lỗi lấy user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ⏳ loading
  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="hv-card">

      <table className="hv-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Role</th>
            <th>Trạng thái</th>
          </tr>
        </thead>

        <tbody>

          {users.map((u) => (
            <tr key={u._id}>

              <td>{u._id}</td>
              <td>{u.fullname}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>

              <td style={{ display: "flex", gap: "10px", marginRight: "50px" }}>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => onView(u._id)}
                >
                  Xem
                </button>

                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => onEdit(u)}
                >
                  Sửa
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(u._id)}
                >
                  Xóa
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default UserTable;