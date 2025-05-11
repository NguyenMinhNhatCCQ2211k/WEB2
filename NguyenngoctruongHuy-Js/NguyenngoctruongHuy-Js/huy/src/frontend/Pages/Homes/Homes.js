import React, { useEffect, useState } from "react";
import apiProduct from "../../../api/apiProduct";
import ProductItem from "../product/ProductItem";

const styles = {
  container: {
    padding: '20px',
  },
  productSection: {
    marginBottom: '40px',
  },
  productGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  productThumb: {
    flex: '1 1 330px',
    border: '1px solid #ddd',
    padding: '10px',
    boxSizing: 'border-box',
  },
  productImg: {
    width: '330px',
    height: '330px',
    display: 'block',
  },
  productTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

function Home() {
  const [newProducts, setNewProducts] = useState([]);
  const [promotionProducts, setPromotionProducts] = useState([]);

  useEffect(() => {
    apiProduct.getNewest()
      .then((res) => {
        const newProductData = res.data.map((product) => ({
          id: product.id,
          name: product.attributes.name,
          price: product.attributes.price,
          slug: product.attributes.slug,
          image: product.attributes.image.data.attributes.url,
          description: product.attributes.description,
        }));
        setNewProducts(newProductData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    apiProduct.getPromotion()
      .then((res) => {
        const promotionProductData = res.data.map((product) => ({
          id: product.id,
          name: product.attributes.name,
          price: product.attributes.price,
          slug: product.attributes.slug,
          image: product.attributes.image.data.attributes.url,
          description: product.attributes.description,
        }));
        setPromotionProducts(promotionProductData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
    <div className="row">
      
      <div className="">
        <div className="content-product-list">
          <h1 style={{ textAlign: "center" }}>Sản Phẩm Mới Nhất</h1>
          <div className="title-box"/>
          <ul className="list-product grid-view row">
            {newProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </ul>
          <div>
            <h1 style={{ textAlign: "center" }}>Sản Phẩm Khuyến mãi</h1>
            <div className="title-box"/>
            <ul className="list-product grid-view row">
              {promotionProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Home;
