import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import ProductItem from "./ProductItem";

function ProductByBrand() {
    const { slug } = useParams();
    const [productsByBrand, setProductsByCat] = useState([]);
  
    useEffect(() => {
      apiProduct.getProductByBrandSlug(slug)
        .then((res) => {
          const data = res.data;
          const products = data.map((item) => ({
            id: item.id,
            name: item.attributes.name,
            price: item.attributes.price,
            slug: item.attributes.slug,
            description: item.attributes.description,
            category: item.attributes.category,
            image: item.attributes.image.data.attributes.url,
          }));
          setProductsByCat(products);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }, [slug]);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Sản phẩm theo thương hiệu</h1>
      <div className="title-box"></div>
      <div className="content-product-list">
        {productsByBrand.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <ul className="product-list" style={{listStyle:"none"}}>
            {productsByBrand.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProductByBrand;