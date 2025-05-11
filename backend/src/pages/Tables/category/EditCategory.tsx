import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

const EditCategory = () => {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoryName: '',
    description: '',
    IsActive: false,
  });
  console.log('ID:', id);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
            const token = localStorage.getItem('authToken');

      const res = await axios.get(`http://localhost:8080/api/public/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      console.log('Phản hồi từ server (thành công):', res.data);
      setFormData({
        categoryName: res.data.categoryName || res.data.categoryname || '',
        description: res.data.Description || res.data.description || '',
        IsActive: res.data.IsActive || res.data.isActive || false,
      });
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu (chi tiết):', error);
      console.log('Phản hồi từ server (lỗi):', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      }); // Log chi tiết phản hồi
      alert('Không thể tải danh mục!');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      console.log('Token in handleSubmit:', token); // Log token để debug
      if (!token) {
        alert('Vui lòng đăng nhập để cập nhật danh mục!');
        navigate('/signin');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      console.log('Request config (PUT):', config); // Log header để kiểm tra

      await axios.put(`http://localhost:8080/api/admin/categories/${id}`, formData, config);
      alert('Cập nhật danh mục thành công!');
      navigate('/list-category');
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
      console.log('Phản hồi từ server:', error.response?.data);
      alert('Cập nhật thất bại!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Chỉnh sửa danh mục</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Tên danh mục</label>
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="IsActive"
            checked={formData.IsActive}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">Hoạt động</label>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Cập nhật danh mục
        </button>
      </form>
    </div>
  );
};

export default EditCategory;