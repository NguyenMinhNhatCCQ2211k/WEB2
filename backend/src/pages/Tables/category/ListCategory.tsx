import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { FaEdit, FaTrash } from 'react-icons/fa';


const ListCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/public/categories?pageNumber=0&pageSize=5&sortBy=categoryId&sortOrder=asc');
      console.log(res.data.content);
      setCategories(res.data.content);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách danh mục:', error);
    }
  };

const handleDelete = async (id) => {
  if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
    try {
      const token = localStorage.getItem('authToken');
      console.log('DELETE Token:', token); // 👈 Kiểm tra token
      if (!token) {
        alert('Vui lòng đăng nhập!');
        return;
      }

      await axios.delete(`http://localhost:8080/api/admin/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(categories.filter((item) => item.categoryId !== id));

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


;

//   const handleEdit = (id) => {
//     alert(`Chuyển đến trang chỉnh sửa danh mục ID: ${id}`);
//     // Có thể dùng useNavigate để chuyển trang nếu bạn đang dùng React Router
//   };
console.log(categories);
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Danh sách danh mục</h2>
      <div><Link to={"/add-category"} className="text-blue-600 hover:underline">Thêm danh mục</Link></div>
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
          {categories.map((cat) => (
            <tr key={cat.id} className="text-center">
              <td className="border px-4 py-2">{cat.categoryId}</td>
              <td className="border px-4 py-2">{cat.categoryName}</td>
              <td className="border px-4 py-2">{cat.description}</td>
              <td className="border px-4 py-2">
  <div className="flex justify-center items-center space-x-2">
    <Link
      to={`/edit-category/${cat.categoryId}`}
      className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded inline-flex items-center"
      title="Sửa"
    >
      <FaEdit />
    </Link>
    <button
      onClick={() => handleDelete(cat.categoryId)}
      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded inline-flex items-center"
      title="Xóa"
    >
      <FaTrash />
    </button>
  </div>
</td>

            </tr>
          ))}
          {categories.length === 0 && (
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

export default ListCategory;
