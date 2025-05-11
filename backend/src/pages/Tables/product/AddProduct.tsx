import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: 0,
    quantity: 0,
    CategoryId: 0,
    BrandId: 0,
    IsActive: false,
    // Loại bỏ image khỏi formData vì sẽ xử lý riêng
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Thêm trạng thái để kiểm soát submit

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/public/categories?pageNumber=0&pageSize=5&sortBy=categoryId&sortOrder=asc');
        setCategories(res.data.content);
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/public/brands?pageNumber=0&pageSize=5&sortBy=brandId&sortOrder=asc');
        setBrands(res.data.content);
      } catch (error) {
        console.error('Lỗi khi tải thương hiệu:', error);
      }
    };

    fetchBrands();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('authToken');
      console.log('Token retrieved:', token);
      if (!token) {
        alert('Vui lòng đăng nhập để tạo sản phẩm!');
        navigate('/signin');
        return;
      }

      if (!token.startsWith('eyJ')) {
        console.warn('Token không có định dạng JWT hợp lệ:', token);
      }

      // Gửi dữ liệu sản phẩm dưới dạng JSON
      const response = await axios.post('http://localhost:8080/api/admin/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Phản hồi từ server:', response.data);
      const productId = response.data.productId; // Lấy productId từ response

      // Nếu có ảnh, gửi yêu cầu upload ảnh
      if (image) {
        const formDataImage = new FormData();
        formDataImage.append('image', image);

        await axios.put(`http://localhost:8080/api/admin/products/${productId}/image`, formDataImage, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Upload ảnh thành công');
      }

      alert('Thêm sản phẩm thành công!');
      navigate('/list-product');
      setFormData({
        productName: '',
        description: '',
        price: 0,
        quantity: 0,
        BrandId: 0,
        CategoryId: 0,
        IsActive: false,
      });
      setImage(null);
      setImagePreview(null);
    } catch (error: any) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      console.log('Chi tiết lỗi:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
      if (error.response?.status === 401) {
        alert('Xác thực thất bại. Vui lòng đăng nhập lại!');
        localStorage.removeItem('authToken');
        navigate('/signin');
      } else {
        alert('Thêm sản phẩm thất bại! Lỗi: ' + (error.response?.data?.message || error.message));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4">Thêm sản phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Tên sản phẩm</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Giá (VNĐ)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Số lượng</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Danh mục</label>
          <select
            name="CategoryId"
            value={formData.CategoryId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
          <label className="block font-semibold">Thương hiệu</label>
          <select
            name="BrandId"
            value={formData.BrandId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Chọn thương hiệu --</option>
            {brands.map((brand) => (
              <option key={brand.brandId} value={brand.brandId}>
                {brand.brandName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="IsActive"
            checked={formData.IsActive}
            onChange={handleChange}
          />
          <label className="font-semibold">Kích hoạt</label>
        </div>

        <div>
          <label className="block font-semibold">Chọn ảnh sản phẩm</label>
          <input type="file" onChange={handleFileChange} className="w-full" disabled={isSubmitting} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded border" />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Đang xử lý...' : 'Thêm sản phẩm'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;