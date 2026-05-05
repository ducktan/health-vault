import React, { useState } from "react";

const UserTable = ({ users = [], loading = false, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  if (loading) return <p>Đang tải dữ liệu...</p>;

  const handleSave = async (id) => {
    await onUpdate(id, editData);
    setEditId(null);
  };

  return (
    <div className="hv-card">
      <table className="hv-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Role</th>
           
            <th>Phòng ban</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u._id}</td>

              <td>
                {editId === u._id ? (
                  <input
                    type="text"
                    value={editData.fullname || u.fullname}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, fullname: e.target.value }))
                    }
                  />
                ) : (
                  u.fullname
                )}
              </td>

              <td>
                {editId === u._id ? (
                  <input
                    type="email"
                    value={editData.email || u.email}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                ) : (
                  u.email
                )}
              </td>

              <td>
                {editId === u._id ? (
                  <select
                    value={editData.role || u.role}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, role: e.target.value }))
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                  </select>
                ) : (
                  u.role
                )}
              </td>

             
              <td>
                {editId === u._id ? (
                  <input
                    type="text"
                    value={editData.department || u.department || ""}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, department: e.target.value }))
                    }
                  />
                ) : (
                  u.department || "-"
                )}
              </td>
              <td>
                {editId === u._id ? (
                  <>
                    <button className="hv-btn-outline mx-2" onClick={() => handleSave(u._id)}>
                      Lưu
                    </button>
                    <button className="hv-btn-outline mx-2" onClick={() => setEditId(null)}>
                      Hủy
                    </button>
                  </>
                ) : (
                  <>
                    <button className="hv-btn-outline mx-2" onClick={() => setEditId(u._id)}>
                      Sửa
                    </button>
                    <button className="btn btn-danger mx-2" onClick={() => onDelete(u._id)}>
                      Xóa
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;