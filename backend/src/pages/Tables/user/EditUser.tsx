import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: 0,
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    password: '',
    roleName: 'user',
  });

useEffect(() => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('Vui lòng đăng nhập để chỉnh sửa người dùng.');
    navigate('/signin');
    return;
  }

  // Gửi yêu cầu lấy thông tin người dùng
  axios
    .get(`http://localhost:8080/api/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      setFormData({
        userId: res.data.userId || 0,
        firstName: res.data.firstName || '',
        lastName: res.data.lastName || '',
        mobileNumber: res.data.mobileNumber || '',
        email: res.data.email || '',
        password: res.data.password || '', // Lưu ý: Không nên gửi mật khẩu về client
        roleName: res.data.roleName || 'user',
      });
    })
    .catch((err) => {
      console.error('Lỗi khi lấy user:', err);
      if (err.response?.status === 401) {
        alert('Phiên đăng nhập hết hạn hoặc token không hợp lệ. Vui lòng đăng nhập lại.');
        localStorage.removeItem('authToken'); // Xóa token không hợp lệ
        navigate('/signin');
      } else {
        alert('Không thể lấy thông tin người dùng. Vui lòng thử lại sau.');
      }
    });
}, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Vui lòng đăng nhập để cập nhật người dùng.');
      navigate('/signin');
      return;
    }

    axios.put(`http://localhost:8080/api/admin/users/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        alert('Cập nhật người dùng thành công!');
        navigate('/list-user');
      })
      .catch(err => {
        console.error('Lỗi khi cập nhật user:', err);
        if (err.response?.status === 401) {
          alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
          navigate('/signin');
        } else {
          alert('Cập nhật thất bại!');
        }
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Chỉnh sửa người dùng</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-semibold">Họ</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Tên</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Số điện thoại</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Vai trò</label>
          <select
            name="roleName"
            value={formData.roleName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Cập nhật người dùng
        </button>
      </form>
    </div>
  );
};

export default EditUser;
