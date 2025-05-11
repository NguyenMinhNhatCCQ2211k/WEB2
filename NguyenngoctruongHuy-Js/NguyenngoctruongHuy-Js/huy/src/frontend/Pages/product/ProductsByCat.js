import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import ProductItem from "./ProductItem";

function ProductByCat() {
  const { slug } = useParams();
  const [productsByCat, setProductsByCat] = useState([]);

  useEffect(() => {
    apiProduct.getProductByCatSlug(slug)
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

  

  useEffect(() => {
    console.log(productsByCat);
  }, [productsByCat]);

  

  return (
    <div className="container">
      <div className="">
      <h1 style={{ textAlign: "center" }}>Sản phẩm theo danh mục </h1>

      </div>
     
      <div className="title-box">
        <div className="content-product-list">
          {productsByCat.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <ul className="" style={{listStyle:"none"}}>
              {productsByCat.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductByCat;
