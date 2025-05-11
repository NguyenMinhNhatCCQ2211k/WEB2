import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD, REMOVE } from '../../../redux/action/cartAction';

const CartItem = ({ item, amount, onQuantityChange }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(amount); 

  const handleRemove = () => {
    dispatch(REMOVE(item));
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cartData.filter((cartItem) => cartItem.id !== item.id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.alert('Sản phẩm đã bị loại bỏ khỏi giỏ hàng.');
    window.location.reload();
  };

  const handleUpdate = () => {
    const updatedItem = { ...item, amount: quantity };
    dispatch(ADD(updatedItem));
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cartData.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, amount: quantity } : cartItem
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.alert('Giỏ hàng đã được cập nhât.');
    window.location.reload();
  };


  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity); 
  };

  return (
    <tr>
      <td><img src={`http://localhost:1337${item.image}`} alt={item.name} style={{ width: '50px' }} /></td>
      <td>{item.name}</td>
      <td>{item.price.toFixed(2)}</td>
      <td>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange} 
          style={{ width: '60px' }}
          min="1"
        />
      </td>
      <td>{(item.price * quantity).toFixed(2)}</td>
      <td>
        <button onClick={handleRemove} className="btn btn-outline-secondary" style={{ backgroundColor: "#d96a77", borderRadius: "10px", marginLeft: 'auto' }}>
          loại bỏ
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
