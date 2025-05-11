import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('Vui lòng đăng nhập để xem sản phẩm.');
          setIsLoading(false);
          navigate('/signin');
          return;
        }

        const [productRes, categoryRes, brandRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/public/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8080/api/public/categories?pageNumber=0&pageSize=5&sortBy=categoryId&sortOrder=asc'),
          axios.get('http://localhost:8080/api/public/brands?pageNumber=0&pageSize=5&sortBy=brandId&sortOrder=asc'),
        ]);

        setProduct(productRes.data);
        setCategories(categoryRes.data.content);
        setBrands(brandRes.data.content);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        if (error.response?.status === 401) {
          setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
          navigate('/signin');
        } else {
          setError(error.response?.data?.message || 'Không thể tải dữ liệu.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const brandName = brands.find((b) => b.brandId === product?.brandId)?.brandName || 'N/A';
  const categoryName = categories.find((c) => c.categoryId === product?.categoryId)?.categoryName || 'N/A';

  if (isLoading) {
    return (
      <div className="text-center p-6 text-gray-600 dark:text-gray-400">
        Đang tải...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center p-6 text-red-600 dark:text-red-400">
        {error || 'Không tìm thấy sản phẩm.'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Thông tin sản phẩm
        </h3>
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">ID:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{product.productId}</span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Tên:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{product.productName}</span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Mô tả:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{product.description || 'Không có mô tả'}</span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Giá:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{product.price.toLocaleString()}₫</span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Số lượng:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{product.quantity}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Danh mục:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{categoryName}</span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Thương hiệu:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">{brandName}</span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Trạng thái:</strong>{' '}
                  <span
                    className={
                      product.isActive
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }
                  >
                    {product.isActive ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Ngày tạo:</strong>{' '}
                  <span className="text-gray-900 dark:text-white">
                    {new Date(product.createdDate).toLocaleString()}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-300">Hình ảnh:</strong>
                  <div className="mt-2">
                    {product.image ? (
                      <img
                        src={`http://localhost:8080/api/public/products/image/${product.image}`}
                        alt={product.productName}
                        className="w-48 h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">Không có ảnh</span>
                    )}
                  </div>
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
              onClick={() => navigate(`/edit-product/${product.productId}`)}
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

export default ProductView;