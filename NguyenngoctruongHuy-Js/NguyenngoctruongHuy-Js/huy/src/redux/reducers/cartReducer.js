import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initCart = {
  carts: [],
  amountItem: 0,
  totalAmount: 0,
};

const cartReducer = (state = initCart, action) => {
  switch (action.type) {
    case "ADD":
      const existingItemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const updatedCart = state.carts.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + parseInt(action.payload.amount) }
            : item
        );
        toast.info(`Increased amount of ${action.payload.name}`, {
          position: "bottom-right",
          autoClose: 2000,
        });
        return {
          ...state,
          carts: updatedCart,
        };
      } else {
        toast.success(`Added ${action.payload.name} to cart`, {
          position: "bottom-right",
          autoClose: 2000,
        });
        return {
          ...state,
          carts: [
            ...state.carts,
            { ...action.payload, quantity: parseInt(action.payload.amount) },
          ],
          amountItem: state.amountItem + 1,
        };
      }
    case "TOTAL":
      let total = 0;
      state.carts.forEach((item) => {
        total += item.price * item.quantity;
      });
      return {
        ...state,
        totalAmount: total,
      };
    case "REMOVE":
      toast.warning(`Removed item from cart`, {
        position: "bottom-right",
        autoClose: 2000,
      });
      return {
        ...state,
        carts: state.carts.filter((item) => item.id !== action.payload),
      };
    case "CLEAR":
      toast.info("Cart cleared", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return {
        ...state,
        carts: [],
        amountItem: 0,
        totalAmount: 0,
      };
    default:
      return state;
  }
};export default cartReducer;