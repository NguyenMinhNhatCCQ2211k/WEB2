import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/public/products?pageNumber=0&pageSize=5&sortBy=productId&sortOrder=asc');
      setProducts(res.data.content);
      console.log(res.data.content);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
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

      await axios.delete(`http://localhost:8080/api/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(products.filter((item) => item.productId !== id));

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
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h2>
      <div><Link to={"/add-product"} className="text-blue-600 hover:underline">Thêm sản phẩm</Link></div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Tên</th>
              <th className="py-2 px-4 border">Mô tả</th>
              <th className="py-2 px-4 border">Giá</th>
              <th className="py-2 px-4 border">Số lượng</th>
              <th className="py-2 px-4 border">Hình ảnh</th>
              {/* <th className="py-2 px-4 border">Trạng thái</th> */}
              <th className="border px-4 py-2">Hành động</th>

            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="py-2 px-4 border">{product.productId}</td>
                <td className="py-2 px-4 border">{product.productName}</td>
                <td className="py-2 px-4 border">{product.description}</td>
                <td className="py-2 px-4 border">{product.price.toLocaleString()}₫</td>
                <td className="py-2 px-4 border">{product.quantity}</td>
                <td className="py-2 px-4 border">
                  <img src={`https://localhost:7045${product.image}`} alt={product.productName} className="w-16 h-16 object-cover mx-auto" />
                </td>
                {/* <td className="py-2 px-4 border">
                  {product.isActive ? (
                    <span className="text-green-600 font-semibold">Hoạt động</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Không hoạt động</span>
                  )}
                </td> */}
<td className="border px-4 py-2 text-center">
  <div className="flex justify-center items-center space-x-2">
    <Link
      to={`/view-product/${product.productId}`}
      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded inline-flex items-center"
      title="Xem"
    >
      <FaEye />
    </Link>
    <Link
      to={`/edit-product/${product.productId}`}
      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded inline-flex items-center"
      title="Sửa"
    >
      <FaEdit />
    </Link>
    <button
      onClick={() => handleDelete(product.productId)}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded inline-flex items-center"
      title="Xóa"
    >
      <FaTrash />
    </button>
  </div>
</td>

              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">Không có sản phẩm nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
