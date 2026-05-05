import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "../../styles/admin.record.css"

const AdminRecords = () => {

  return (

    <div className="hv-doctor-layout">

      <Navbar />

      <div className="hv-container">

        <div className="hv-page-header">
          <h2>Quản lý bệnh án</h2>
        </div>

        {/* SEARCH */}

        <div className="hv-search-bar">

          <input
            placeholder="Tìm theo tên hoặc CCCD..."
            className="hv-search-input"
          />

          <select className="hv-filter">
            <option>Bác sĩ</option>
            <option>Dr A</option>
            <option>Dr B</option>
          </select>

          <select className="hv-filter">
            <option>Trạng thái</option>
            <option>Active</option>
            <option>Locked</option>
          </select>

        </div>

        {/* TABLE */}

        <table className="hv-table">

          <thead>
            <tr>
              <th>Bệnh nhân</th>
              <th>CCCD</th>
              <th>Bác sĩ</th>
              <th>Số lần khám</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>

            <tr>

              <td>Nguyễn Văn A</td>
              <td>0123456789</td>
              <td>Dr Nguyễn</td>
              <td>3</td>
              <td>2026-03-10</td>
              <td>
                <span className="hv-status-active">Active</span>
              </td>

              <td className="hv-actions">

                <button className="hv-btn-outline">
                  Xem
                </button>

                <button className="hv-btn-warning">
                  Khóa
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

      <Footer />

    </div>

  );

};

export default AdminRecords;