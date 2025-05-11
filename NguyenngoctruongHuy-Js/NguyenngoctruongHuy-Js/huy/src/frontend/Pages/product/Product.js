import React, { useEffect, useState } from "react";
import apiProduct from "../../../api/apiProduct";
import ProductItem from "./ProductItem";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiProduct.getAll()
      .then((res) => {
        console.log("API Response:", res.content); // Debug: Log raw API response
        try {
          if (Array.isArray(res.content)) {
            const productData = res.content.map((product) => ({
              id: product.productId,
              name: product.productName,
              price: product.price,
              specialPrice: product.specialPrice,
              discount: product.discount,
              image: product.image ? `http://localhost:8080/images/${product.image}` : 'https://via.placeholder.com/330',
              description: product.description,
              categoryName: product.categoryName,
              quantity: product.quantity
            }));
            console.log("Mapped Product Data:", productData); // Debug: Log mapped data
            setProducts(productData);
          } else {
            console.error("Unexpected data structure:", res);
          }
        } catch (error) {
          console.error("Error processing data:", error.message);
        } finally {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Tất cả sản phẩm</h1>
      <div className="title-box"></div>
      <div className="content-product-list">
        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : products.length > 0 ? (
          <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap" }}>
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </ul>
        ) : (
          <p>Không có sản phẩm nào để hiển thị.</p>
        )}
      </div>
    </div>
  );
}

export default Products;