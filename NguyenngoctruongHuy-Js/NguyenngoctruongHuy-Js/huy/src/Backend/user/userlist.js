import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiUser from "../../api/apiUser";
import detail from "./detail.jpg";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiUser.getAll();
        const userData = res.map((item) => ({
          id: item.id,
          username: item.username,
        }));
        setUsers(userData);
      } catch (e) {
        console.error("Error fetching users:", e);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">User List</h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>
                  <Link to={`/admin/userdetail/${item.id}`}>
                    <img
                      style={{ width: "20px", height: "20px", marginLeft: "10px", marginTop: "10px" }}
                      src={detail}
                      alt="detail"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
