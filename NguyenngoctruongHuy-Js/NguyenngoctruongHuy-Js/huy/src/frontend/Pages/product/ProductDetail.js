import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import { useDispatch } from "react-redux";
import { ADD } from "../../../redux/action/cartAction";

function ProductDetail() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null); // Initialize as null for loading state
  const [amountItem, setAmountItem] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await apiProduct.getDetailProductById(id);
        if (!res || (Array.isArray(res) && res.length === 0)) {
          throw new Error("Sản phẩm không tồn tại");
        }
        const p = Array.isArray(res) ? res[0] : res; // Handle both array and object responses
        setProductDetail({
          id: p.productId,
          name: p.productName,
          price: p.price,
          specialPrice: p.specialPrice,
          discount: p.discount || 0,
          image: p.image ? `http://localhost:8080/images/${p.image}` : "https://via.placeholder.com/330",
          description: p.description || "Không có mô tả",
          category: p.categoryName || "Không xác định",
          quantity: p.quantity || 0,
        });
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
        setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAmountChange = (e) => {
    const value = Number(e.target.value);
    if (value < 1) {
      setAmountItem(1);
    } else if (value > (productDetail?.quantity || 100)) {
      setAmountItem(productDetail?.quantity || 100);
      window.alert(`Số lượng tối đa là ${productDetail?.quantity}`);
    } else {
      setAmountItem(value);
    }
  };

  const handleAddToCart = () => {
    if (!productDetail || productDetail.quantity === 0) {
      window.alert("Sản phẩm hiện không có sẵn!");
      return;
    }
    if (amountItem > productDetail.quantity) {
      window.alert(`Chỉ còn ${productDetail.quantity} sản phẩm trong kho!`);
      return;
    }

    const product = {
      id: productDetail.id,
      name: productDetail.name,
      price:
        productDetail.discount > 0 && productDetail.specialPrice
          ? productDetail.specialPrice
          : productDetail.price,
      image: productDetail.image,
      amount: amountItem,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = existingCart.findIndex((item) => item.id === product.id);

    if (productIndex > -1) {
      existingCart[productIndex].amount += amountItem;
    } else {
      existingCart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    dispatch(ADD(product));
    window.alert("Đã thêm sản phẩm vào giỏ hàng!");
    setAmountItem(1); // Reset quantity after adding to cart
  };

  if (loading) {
    return <div className="container my-4">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className="container my-4 text-danger">{error}</div>;
  }

  if (!productDetail) {
    return <div className="container my-4">Sản phẩm không tồn tại</div>;
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={productDetail.image}
            alt={productDetail.name}
            className="img-fluid rounded"
            onError={(e) => (e.target.src = "https://via.placeholder.com/330")}
          />
        </div>
        <div className="col-md-6">
          <h2>{productDetail.name}</h2>
          <p className="text-muted">
            Danh mục: <strong>{productDetail.category}</strong>
          </p>
          <p>{productDetail.description}</p>
          {productDetail.discount > 0 && productDetail.specialPrice ? (
            <h3 className="my-3">
              <ins>{productDetail.specialPrice.toLocaleString()} VND</ins>
              <del className="text-muted ml-2">{productDetail.price.toLocaleString()} VND</del>
            </h3>
          ) : (
            <h3 className="my-3">{productDetail.price.toLocaleString()} VND</h3>
          )}
          <p className="text-muted">
            Số lượng còn lại: {productDetail.quantity > 0 ? productDetail.quantity : "Hết hàng"}
          </p>
          <div className="d-flex align-items-center mb-4">
            <input
              type="number"
              value={amountItem}
              onChange={handleAmountChange}
              className="form-control mx-2"
              style={{ width: "60px" }}
              min="1"
              max={productDetail.quantity || 100}
              disabled={productDetail.quantity === 0}
            />
          </div>
          <button
            className="btn btn-outline-secondary"
            style={{
              width: "15%",
              height: "40px",
              backgroundColor: "#d96a77",
              borderRadius: "10px",
              color: "white",
            }}
            onClick={handleAddToCart}
            disabled={productDetail.quantity === 0}
          >
            Thêm giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;