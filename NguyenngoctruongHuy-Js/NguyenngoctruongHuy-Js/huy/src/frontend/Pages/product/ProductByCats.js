import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiProduct from "./apiProduct";
import ProductItem from "./ProductItem";

function ProductByCats() {
  const { categoryId } = useParams();
  const [productsByCat, setProductsByCat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiProduct.getProductByCatId(categoryId)
      .then((data) => {
        const products = data.map((item) => ({
          id: item.Id,
          name: item.Name,
          price: item.Price,
          description: item.Description,
          category: item.CategoryName,
          image: item.Image, // Backend returns image path like "/images/filename.jpg"
        }));
        setProductsByCat(products);
      })
      .catch((error) => {
        setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Sản phẩm theo danh mục</h1>
      {loading && <p className="text-center">Đang tải...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && productsByCat.length === 0 ? (
        <p className="text-center">Không tìm thấy sản phẩm.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsByCat.map((product) => (
            <li key={product.id} role="listitem">
              <ProductItem product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductByCats;