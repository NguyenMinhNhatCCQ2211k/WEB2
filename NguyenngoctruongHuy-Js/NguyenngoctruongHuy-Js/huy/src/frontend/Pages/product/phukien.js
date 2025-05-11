import React, { useState, useEffect } from "react";
import apiProduct from "../../../api/apiProduct";
import ProductItem from "./ProductItem";

function Phukien() {
  const [productsBanPhim, setProductsBanPhim] = useState([]);
  const [productsChuot, setProductsChuot] = useState([]);

  useEffect(() => {
    apiProduct.getProductByCatSlug("banphim")
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
        setProductsBanPhim(products);
      })
      .catch((error) => {
        console.error("Error fetching ban phim data: ", error);
      });

    apiProduct.getProductByCatSlug("chuot")
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
        setProductsChuot(products);
      })
      .catch((error) => {
        console.error("Error fetching chuot data: ", error);
      });
  }, []);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Sản phẩm theo danh mục</h1>
      <div className="title-box">
        <div className="content-product-list">
         
          {productsBanPhim.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <ul className="" style={{listStyle:'none'}}>
              {productsBanPhim.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </ul>
          )}
        </div>
        <div className="content-product-list">
         
          {productsChuot.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <ul className=""style={{listStyle:'none'}}>
              {productsChuot.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Phukien;
