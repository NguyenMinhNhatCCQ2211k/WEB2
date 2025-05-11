import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://localhost:7045/api/Users/${id}`);
        console.log('Dữ liệu người dùng:', res.data); // Ghi log để kiểm tra
        setUser(res.data);
      } catch (error) {
        console.error('Lỗi khi tải người dùng:', error);
        setError(error.response?.data?.message || 'Không thể tải người dùng.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center p-6 text-gray-600 dark:text-gray-400">
        Đang tải...
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center p-6 text-red-600 dark:text-red-400">
        {error || 'Không tìm thấy người dùng.'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Thông tin người dùng
        </h3>
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">ID:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{user.id}</span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Tên đăng nhập:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{user.username}</span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Email:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{user.email}</span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Họ tên:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{user.fullName || 'N/A'}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Vai trò:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{user.role || 'N/A'}</span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Trạng thái:</strong>{' '}
                  <span
                    className={
                      user.isActive
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }
                  >
                    {user.isActive ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Ngày tạo:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">
                    {new Date(user.createdDate).toLocaleString()}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Ngày sửa:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">
                    {user.lastModifiedDate
                      ? new Date(user.lastModifiedDate).toLocaleString()
                      : 'Chưa sửa'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6">
  <button
    onClick={() => navigate('/list-product')}
    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
  >
    Quay lại danh sách
  </button>

  <button
    onClick={() => navigate(`/edit-user/${user.id}`)}
    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500"
  >
    Sửa
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;