import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';

const ListOrder = () => {
  const [orders, setOrders] = useState([]);
  

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/admin/orders?pageNumber=0&pageSize=5&sortBy=totalAmount&sortOrder=asc');
      setOrders(res.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      alert('Lỗi khi tải đơn hàng: ' + (error.response?.data?.message || error.message));
    }
  };

  

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h2>

      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Người dùng (ID)</th>
            <th className="border px-4 py-2">Ngày đặt</th>
            <th className="border px-4 py-2">Trạng thái</th>
            <th className="border px-4 py-2">Tổng tiền</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="text-center">
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.userId}</td>
              <td className="border px-4 py-2">
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">{order.totalAmount.toLocaleString()}₫</td>
              <td className="border px-4 py-2 text-center">
                <div className="flex justify-center items-center space-x-2">
                  <Link
                    to={`/view-order/${order.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded inline-flex items-center"
                    title="Xem"
                  >
                    <FaEye />
                  </Link>

                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded inline-flex items-center"
                    title="Xóa"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                Không có đơn hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListOrder;