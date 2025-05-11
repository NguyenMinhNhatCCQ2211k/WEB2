import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

const EditProduct = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: 0,
    quantity: 0,
    BrandId: '',
    CategoryId: '',
    IsActive: false,
  });

  

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/public/brands?pageNumber=0&pageSize=5&sortBy=brandId&sortOrder=asc');
        setBrands(res.data.content);
      } catch (error) {
        console.error('Lỗi khi tải thương hiệu:', error);
      }
    };
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/public/categories?pageNumber=0&pageSize=5&sortBy=categoryId&sortOrder=asc');
        setCategories(res.data.content);
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
      }
    };

    const fetchProduct = async () => {
    try {
            const token = localStorage.getItem('authToken');

      const res = await axios.get(`http://localhost:8080/api/public/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      console.log('Phản hồi từ server (thành công):', res.data);
        setFormData({
          productName: res.data.productName,
          description: res.data.description,
          price: res.data.price,
          quantity: res.data.quantity,
          BrandId: res.data.brandId,
          CategoryId: res.data.categoryId,
          IsActive:res.data.isActive,
        });
        setImagePreview("http://localhost:8080/api/public/products/image/"+product.image); // Giả sử có imageUrl
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
      }
    };

    fetchCategories();
    fetchBrands();
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
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

      await axios.put(`http://localhost:8080/api/admin/products/${id}`, formData, config);
      alert('Cập nhật danh mục thành công!');
      navigate('/list-product');
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
      console.log('Phản hồi từ server:', error.response?.data);
      alert('Cập nhật thất bại!');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4">Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-semibold">Tên sản phẩm</label>
          <input type="text" name="productName" value={formData.productName} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-semibold">Mô tả</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-semibold">Giá (VNĐ)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-semibold">Số lượng</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-semibold">Danh mục</label>
          <select name="CategoryId" value={formData.CategoryId} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold">Thương hiệu</label>
          <select name="BrandId" value={formData.BrandId} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">-- Chọn danh thương hiệu --</option>
            {brands.map((brand) => (
              <option key={brand.brandId} value={brand.brandId}>
                {brand.brandName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" name="IsActive" checked={formData.IsActive} onChange={handleChange} />
          <label className="font-semibold">Kích hoạt</label>
        </div>

        <div>
          <label className="block font-semibold">Cập nhật ảnh sản phẩm</label>
          <input type="file" onChange={handleFileChange} className="w-full" />
          {imagePreview && (
            <img src={`${imagePreview}`} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded border" />
          )}
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Cập nhật sản phẩm
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
