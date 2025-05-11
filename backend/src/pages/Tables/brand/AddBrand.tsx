import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

const AddBrand = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brandName: '',
    description: '',
    IsActive: false,
  });

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      console.log('Token:', token);
      if (!token) {
        alert('Vui lòng đăng nhập để tạo danh mục!');
        navigate('/signin');
        return;
      }

      await axios.post('http://localhost:8080/api/admin/brands', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Tạo danh mục thành công!');
      navigate('/list-brand');
      setFormData({ brandName: '', description: '', IsActive: false });
    } catch (error: any) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      if (error.response?.status === 401) {
        alert('Xác thực thất bại. Vui lòng đăng nhập lại!');
        navigate('/signin');
      } else {
        console.log('Phản hồi từ server:', error.response?.data);
        alert('Tạo danh mục thất bại! Lỗi: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Tạo thương hiệu mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Tên thương hiệu</label>
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
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
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Tạo danh mục
        </button>
      </form>
    </div>
  );
};

export default AddBrand;
