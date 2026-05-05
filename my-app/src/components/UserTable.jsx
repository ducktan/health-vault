import React from "react";

const UserTable = () => {

  const users = [
    {
      id:1,
      name:"Nguyễn Văn A",
      email:"a@gmail.com",
      role:"patient",
      status:"active"
    },
    {
      id:2,
      name:"BS. Khang",
      email:"doctor@gmail.com",
      role:"doctor",
      status:"active"
    }
  ];

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
            <th></th>
          </tr>
        </thead>

        <tbody>

          {users.map(u => (
            <tr key={u.id}>

              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>

              <td>

                <button className="hv-btn-outline mx-2">
                  Xem
                </button>

                <button className="hv-btn-outline mx-2">
                  Sửa
                </button>

                <button className="btn btn-danger mx-2">
                  Disable
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