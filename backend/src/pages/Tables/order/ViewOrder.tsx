import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

const OrderView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/public/users/%C6%B0q/orders/${id}`);
        console.log('Dữ liệu đơn hàng:', res.data);
        console.log('Chi tiết đơn hàng:', res.data.orderDetails);
        setOrder(res.data);
      } catch (error) {
        console.error('Lỗi khi tải đơn hàng:', error);
        setError(error.response?.data?.message || 'Không thể tải đơn hàng.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center p-6 text-gray-600 dark:text-gray-400">
        Đang tải...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center p-6 text-red-600 dark:text-red-400">
        {error || 'Không tìm thấy đơn hàng.'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Thông tin đơn hàng
        </h3>
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">ID:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{order.id}</span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Người dùng ID:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{order.userId}</span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Ngày đặt:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">
                    {new Date(order.orderDate).toLocaleString()}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Trạng thái:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{order.status}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Tổng tiền:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">
                    {order.totalAmount.toLocaleString()}₫
                  </span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Hoạt động:</strong>{' '}
                  <span
                    className={
                      order.isActive
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }
                  >
                    {order.isActive ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Ngày sửa:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">
                    {order.lastModifiedDate
                      ? new Date(order.lastModifiedDate).toLocaleString()
                      : 'Chưa sửa'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 dark:border-gray-700">
            <h4 className="text-md font-semibold text-gray-800 dark:text-white/90 mb-4">
              Chi tiết đơn hàng
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="p-2 text-gray-700 dark:text-gray-300">Sản phẩm</th>
                    <th className="p-2 text-gray-700 dark:text-gray-300">Số lượng</th>
                    <th className="p-2 text-gray-700 dark:text-gray-300">Đơn giá</th>
                    <th className="p-2 text-gray-700 dark:text-gray-300">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderDetails && order.orderDetails.length > 0 ? (
                    order.orderDetails.map((detail) => (
                      <tr key={detail.id} className="border-t dark:border-gray-700">
                        <td className="p-2 text-gray-900 dark:text-white">
                          {detail.product?.name ||
                           detail.product?.Name ||
                           detail.Product?.name ||
                           detail.Product?.Name ||
                           `Sản phẩm ID: ${detail.productId}`}
                        </td>
                        <td className="p-2 text-gray-900 dark:text-white">{detail.quantity}</td>
                        <td className="p-2 text-gray-900 dark:text-white">
                          {detail.unitPrice.toLocaleString()}₫
                        </td>
                        <td className="p-2 text-gray-900 dark:text-white">
                          {(detail.quantity * detail.unitPrice).toLocaleString()}₫
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-2 text-center text-gray-500 dark:text-gray-400">
                        Không có chi tiết đơn hàng
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <button
              onClick={() => navigate('/list-order')}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Quay lại danh sách
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderView;