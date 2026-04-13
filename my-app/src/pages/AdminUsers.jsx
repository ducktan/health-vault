import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UserTable from "../../components/admin/UserTable";
import CreateUserModal from "../../components/admin/CreateUserModal";

import "../../styles/admin.modal.css";


const AdminUsers = () => {

  const [showCreate, setShowCreate] = useState(false);

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

        <UserTable />

      </div>

      <Footer />

      {showCreate && (
        <CreateUserModal
          closeModal={() => setShowCreate(false)}
        />
      )}

    </div>
  );
};

export default AdminUsers;