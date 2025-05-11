import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('Vui lòng đăng nhập để xem danh sách người dùng.');
          navigate('/signin');
          return;
        }

        const response = await axios.get(
          'http://localhost:8080/api/admin/users?pageNumber=0&pageSize=10&sortBy=userId&sortOrder=asc',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Danh sách người dùng:', response.data);
        setUsers(response.data.content || response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách user:', error);
        if (error.response?.status === 401) {
          setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
          navigate('/signin');
        } else {
          setError('Không thể tải danh sách người dùng.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('Vui lòng đăng nhập để xóa người dùng!');
          navigate('/signin');
          return;
        }

        await axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter((item) => item.userId !== id));
        alert('Xóa người dùng thành công!');
      } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
        if (error.response?.status === 401) {
          alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!');
          navigate('/signin');
        } else {
          alert('Xóa người dùng thất bại!');
        }
      }
    }
  };

  if (isLoading) {
    return <div className="text-center p-6 text-gray-600">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  if (users.length === 0) {
    return <div className="text-center p-6 text-gray-600">Không có người dùng nào.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách người dùng</h2>
      <div>
        <Link to="/add-user" className="text-blue-600 hover:underline">
          Thêm thành viên
        </Link>
      </div>
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Họ tên</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Số điện thoại</th>
            <th className="border px-4 py-2">Vai trò</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.userId !== 6)
            .map((user) => (
              <tr key={user.userId} className="text-center">
                <td className="border px-4 py-2">{user.userId}</td>
                <td className="border px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.mobileNumber}</td>
                <td className="border px-4 py-2">{user.roleName }</td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center space-x-2">
                    <Link
                      to={`/view-user/${user.userId}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded inline-flex items-center"
                      title="Xem"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to={`/edit-user/${user.userId}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded inline-flex items-center"
                      title="Sửa"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(user.userId)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded inline-flex items-center"
                      title="Xóa"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;