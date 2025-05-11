import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListBrand = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/public/brands?pageNumber=0&pageSize=5&sortBy=brandId&sortOrder=asc');
       console.log(res.data.content);
      setBrands(res.data.content);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách danh mục:', error);
    }
  };

const handleDelete = async (id) => {
  if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
    try {
      const token = localStorage.getItem('authToken');
      console.log('DELETE Token:', token);
      if (!token) {
        alert('Vui lòng đăng nhập!');
        return;
      }

      await axios.delete(`http://localhost:8080/api/admin/brands/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBrands(brands.filter((item) => item.brandId !== id));

    } catch (error) {
      console.error('Lỗi khi xóa danh mục:', error);
      if (error.response?.status === 401) {
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
      } else {
        alert('Xóa danh mục thất bại.');
      }
    }
  }
};

//   const handleEdit = (id) => {
//     alert(`Chuyển đến trang chỉnh sửa danh mục ID: ${id}`);
//     // Có thể dùng useNavigate để chuyển trang nếu bạn đang dùng React Router
//   };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Danh sách thương hiệu</h2>
      <div><Link to={"/add-Brand"} className="text-blue-600 hover:underline">Thêm thương hiệu</Link></div>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Tên</th>
            <th className="border px-4 py-2">Mô tả</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id} className="text-center">
              <td className="border px-4 py-2">{brand.brandId}</td>
              <td className="border px-4 py-2">{brand.brandName}</td>
              <td className="border px-4 py-2">{brand.description}</td>
              <td className="border px-4 py-2 space-x-2">
                <Link
                  to={`/edit-Brand/${brand.brandId}`}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded inline-flex items-center"
                  title="Sửa"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleDelete(brand.brandId)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded inline-flex items-center"
                  title="Xóa"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {brands.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                Không có danh mục nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListBrand;
