import React, { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import apiOrder from "../../../api/apiOrder";
import { CLEAR } from "../../../redux/action/cartAction";
import { toast } from "react-toastify";

// Custom hook for managing cart data
const useCartData = () => {
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartData(cartItems);

    const total = cartItems.reduce((acc, item) => acc + item.price * item.amount, 0);
    setTotalAmount(total);
  }, []);

  const clearCartLocally = () => {
    localStorage.removeItem("cart");
    setCartData([]);
    setTotalAmount(0);
  };

  return { cartData, totalAmount, clearCartLocally };
};

function Checkout() {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const [note, setNote] = useState("");
  const { cartData, totalAmount, clearCartLocally } = useCartData();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const order = {
      user_id: user.id,
      order_date: new Date().toISOString(),
      note: note,
      
    };

    try {
     
      const orderResponse = await apiOrder.createOrder({ data: order });
      const orderId = orderResponse.data.data.id;

    
      const orderDetails = cartData.map((item) => ({
        order_id: orderId,
        product_name: item.name,
        amount: item.amount,
        price: item.price,
      
      }));

     
      const orderDetailResponses = await Promise.all(
        orderDetails.map((detail) =>
          apiOrder.createOrderDetail({ data: detail })
        )
      );

      
      if (orderDetailResponses.every((res) => res.status === 200)) {
      
       
        clearCartLocally();

        toast.success(`Cart checkout successfully`, {
          position: "bottom-right",
          autoClose: 2000,
        });
        alert("Đặt hàng thành công")
        navigate("/home");
      }
    } catch (error) {
      console.error("Failed to save order or order details:", error);
      toast.error("Failed to process your order. Please try again.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return user ? (
    <div className="row m-5">
      <div className="col-lg-6 wow slideInUp" data-wow-delay="0.3s">
        <div className="bg-light rounded p-5">
          <h3>Thông tin khách hàng</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <input
                  type="text"
                  className="form-control border-0 px-4"
                  placeholder="Your Name"
                  style={{ height: "55px" }}
                  value={user.username}
                  name="name"
                 
                />
              </div>
              <div className="col-12">
                <input
                  type="email"
                  className="form-control border-0 px-4"
                  placeholder="Your Email"
                  style={{ height: "55px" }}
                  value={user.email}
                  name="email"
                 
                />
              </div>
              <div className="col-12">
                <input
                  type="tel"
                  className="form-control border-0 px-4"
                  placeholder="Phone Number"
                  style={{ height: "55px" }}
                  value={user.phone}
                  name="phone"
                 
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  className="form-control border-0 px-4"
                  placeholder="Address"
                  style={{ height: "55px" }}
                  value={user.address}
                  name="address"
                 
                />
              </div>
              <div className="col-12">
                <textarea
                  className="form-control border-0 px-4"
                  placeholder="Note"
                  style={{ height: "100px" }}
                  value={note}
                  name="note"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="col-12">
              <button
                className="btn btn-outline-secondary"
                style={{ backgroundColor: "#d96a77", borderRadius: "5px", marginBottom: 10, marginLeft: 30, marginTop:10 }}
              >
                  Thanh toán
                </button>

                <Link to="/home"className="btn btn-outline-secondary"
                style={{ backgroundColor: "#d96a77", borderRadius: "5px", marginBottom: 10, marginLeft: 10, marginTop:10 }}>Hủy</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-lg-6 wow slideInUp" data-wow-delay="0.3s">
        <div className="bg-light rounded p-5">
          <h3>Cart information</h3>
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>{item.amount}</td>
                  <td>{(item.price * item.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Tổng: {totalAmount.toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="cart justify-content-center">
      <h4>Bạn cần đăng nhập trước khi thanh toán</h4>
      <button type="button" className="btn btn-info">
        <Link
          to="/login"
          className="text-white text-decoration-none justify-content-center"
        >
          Đăng nhập
        </Link>
      </button>
    </div>
  );
}

export default Checkout;
