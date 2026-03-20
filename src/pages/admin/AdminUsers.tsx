import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 thêm
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UserTable from "../../components/admin/UserTable";
import CreateUserModal from "../../components/admin/CreateUserModal";
import EditUserModal from "./EditUserModal";
import "../../styles/admin.modal.css";
import { deleteUser } from "../../services/user";
const AdminUsers: React.FC = () => {

  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate(); // 👈 thêm
const [reload, setReload] = useState(false);

const handleUpdated = () => {
  setReload(!reload);
};
  // 👇 xử lý các action
  const handleView = (id: string) => {
    navigate(`/admin/users/${id}`);
  };

  const handleEdit = (user: any) => {
    console.log("CLICK EDIT", user); // 👈 thêm dòng này
    setSelectedUser(user);
    setShowEdit(true);
  };

const handleDelete = async (id: string) => {

  const confirmDelete = window.confirm("Bạn có chắc muốn xóa user này?");

  if (!confirmDelete) return;

  try {
    await deleteUser(id);

    alert("Xóa thành công");

    setReload(!reload); // 🔥 reload lại list

  } catch (err) {
    console.error(err);
    alert("Xóa thất bại");
  }
};
  // 👇 state cho edit
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <div className="hv-doctor-layout">

      <Navbar />

      <div className="hv-container">

        <div className="hv-page-header">

          <h2>Quản lý người dùng</h2>

          <button
            className="hv-btn-primary"
            onClick={() => setShowCreate(true)}
          >
            Tạo user
          </button>

        </div>

        {/* 👇 truyền function xuống table */}
<UserTable
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
  reload={reload}
/>

      </div>

      <Footer />

      {showCreate && (
        <CreateUserModal
          closeModal={() => setShowCreate(false)}
        />
      )}

      {/* 👇 modal edit */}
{showEdit && selectedUser && (
<EditUserModal
  user={selectedUser}
  closeModal={() => setShowEdit(false)}
  onUpdated={handleUpdated}
/>
)}

    </div>
  );
};

export default AdminUsers;