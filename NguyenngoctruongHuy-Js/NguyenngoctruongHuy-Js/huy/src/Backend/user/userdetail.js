import React, { useState, useEffect } from "react";
import apiUser from "../../api/apiUser";
import { Link } from "react-router-dom";

function Userdetail() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiUser.getAll();
        const userData = res.map((item) => ({
          id: item.id,
          username: item.username,
          email: item.email,
          address: item.address,
          phone: item.phone,
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
      <h1 className="text-center mb-4">User Detail</h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Phone number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link
                      to="/admin/user"
                      className="btn btn-outline-primary"
                      style={{
                        width: "60px",
                        backgroundColor: "#d96a77",
                        borderRadius: "10px",
                        marginLeft: 30,
                      
                        marginBottom: 30,
                      }}
                    >
                      back
                    </Link>
      </div>
    </div>
  );
}

export default Userdetail;
