import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const UserEdit = () => {
  const { id } = useParams(); // Lấy ID user từ URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    roleName: 'USER',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Lấy dữ liệu người dùng theo ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('Vui lòng đăng nhập!');
          navigate('/signin');
          return;
        }

        const response = await axios.get(`http://localhost:8080/api/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData(response.data);
      } catch (error: any) {
        console.error('Lỗi khi lấy thông tin user:', error);
        if (error.response?.status === 401) {
          alert('Không có quyền truy cập. Vui lòng đăng nhập lại!');
          navigate('/signin');
        } else {
          alert('Không thể lấy dữ liệu người dùng.');
        }
      }
    };

    fetchUser();
  }, [id, navigate]);

  // Xử lý thay đổi trong form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Gửi form cập nhật
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Vui lòng đăng nhập!');
        navigate('/signin');
        return;
      }

      await axios.put(`http://localhost:8080/api/admin/users/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Cập nhật người dùng thành công!');
      navigate('/list-user');
    } catch (error: any) {
      console.error('Lỗi khi cập nhật user:', error);
      if (error.response?.status === 401) {
        alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!');
        navigate('/signin');
      } else {
        setError('Cập nhật thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Chỉnh sửa người dùng</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Họ"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Tên"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          placeholder="Số điện thoại"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mật khẩu mới (nếu muốn thay đổi)"
          className="w-full px-4 py-2 border rounded"
        />
        <select
          name="roleName"
          value={formData.roleName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Đang cập nhật...' : 'Cập nhật'}
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
