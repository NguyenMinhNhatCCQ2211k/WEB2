import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './cartItem';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cartData);
    calculateTotalAmount(cartData);
  }, []);

  const calculateTotalAmount = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.amount;
    });
    setTotalAmount(total);
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
    setTotalAmount(0);
  };

  const updateCart = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    calculateTotalAmount(cartItems);
    alert('Đã cập nhật giỏ hàng');
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, amount: newQuantity } : item
    );
    setCartItems(updatedCartItems); 
    calculateTotalAmount(updatedCartItems);
  
  
  };

  return (
    <div className="container my-4">
      {cartItems.length === 0 ? (
        <div className="text-center">
          <h2>Giỏ hàng trống</h2>
        </div>
      ) : (
        <>
          <h1 className="text-center mb-4">Giỏ hàng</h1>
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Hình ảnh</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Thành tiền</th>
                <th scope="col">Loại bỏ</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} amount={item.amount} onQuantityChange={handleQuantityChange} />
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Tổng : {totalAmount}</h4>
            <div>
              <button
                className="btn btn-outline-secondary"
                style={{ backgroundColor: "#d96a77", borderRadius: "5px", marginBottom: 10 }}
                onClick={clearCart}
              >
                Xóa giỏ hàng
              </button>
              <button
                className="btn btn-outline-secondary"
                style={{ backgroundColor: "#d96a77", borderRadius: "5px", marginBottom: 10, marginLeft: 30 }}
                onClick={updateCart}
              >
                Cập nhật giỏ hàng
              </button>
              <button
                className="btn btn-outline-secondary"
                style={{ backgroundColor: "#d96a77", borderRadius: "5px", marginBottom: 10, marginLeft: 30 }}
               
              >
                <Link to="/Checkout" style={{ textDecoration: 'none', color: 'white' }}>Thanh toán</Link>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
