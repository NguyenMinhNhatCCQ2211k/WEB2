import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD } from "../../../redux/action/cartAction";

function ProductItem(props) {
  const { product } = props;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const productData = {
      id: product.id,
      name: product.name,
      price: product.discount > 0 && product.specialPrice ? product.specialPrice : product.price,
      image: product.image,
      amount: 1,
    };
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = existingCart.findIndex((item) => item.id === productData.id);
    if (productIndex > -1) {
      existingCart[productIndex].amount += 1;
    } else {
      existingCart.push(productData);
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    dispatch(ADD(productData));
    window.alert("Đã thêm sản phẩm vào giỏ hàng!");
  };

  const renderPrice = () => {
    if (product.discount > 0 && product.specialPrice) {
      return (
        <>
          <ins>
            <span className="woocommerce-Price-amount amount">
              <span>{product.specialPrice}</span> VND
            </span>
          </ins>
          <del>
            <span className="woocommerce-Price-amount amount">
              <span>{product.price}</span> VND
            </span>
          </del>
        </>
      );
    }
    return (
      <ins>
        <span className="woocommerce-Price-amount amount">
          <span>{product.price}</span> VND
        </span>
      </ins>
    );
  };

  return (
    <li className="col-md-3 col-sm-4 col-xs-12" style={{ width: '33%' }}>
      <div className="product-item" style={styles.productItem}>
        <div className="product-thumb" style={styles.productThumb}>
          <img
            src={product.image}
            alt={product.name}
            style={styles.productImg}
            onError={(e) => (e.target.src = 'https://via.placeholder.com/330')}
          />
          <div className="col-md-12" style={{ display: "flex", paddingTop: "10px" }}>
            <button
              onClick={handleAddToCart}
              className="btn btn-outline-secondary"
              style={{ width: "40%", backgroundColor: "#d96a77", borderRadius: "10px" }}
            >
              <h5>Thêm giỏ hàng</h5>
            </button>
            <p style={{ width: '10px' }}></p>
            <Link
              to={`/Detail/${product.id}`}
              className="btn btn-outline-secondary"
              style={{ width: "40%", backgroundColor: "#d96a77", borderRadius: "10px" }}
            >
              <h5>Chi tiết</h5>
            </Link>
          </div>
        </div>
        <div className="product-info" style={styles.productInfo}>
          <h5 className="name">
            <Link to={`/Detail/${product.id}`}>
              {product.name}
            </Link>
          </h5>
          <div className="product-price">
            {renderPrice()}
          </div>
        </div>
      </div>
      <p style={{ height: "10px", width: "10px" }}></p>
    </li>
  );
}

const styles = {
  productItem: {
    border: "1px solid #ddd",
    padding: "10px",
    boxSizing: "border-box",
    paddingBottom: "10px",
  },
  productThumb: {
    position: "relative",
    textAlign: "center",
  },
  productImg: {
    width: "330px",
    height: "330px",
    objectFit: "cover",
  },
  productInfo: {
    textAlign: "center",
    margin: "10px",
    padding: "10px",
  },
};

export default ProductItem;