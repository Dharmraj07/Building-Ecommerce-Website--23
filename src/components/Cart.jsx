import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import ReactDOM from "react-dom";
import "./Cart.css"; // Import a CSS file for styling

function Cart({ onClose }) {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  return ReactDOM.createPortal(
    <div className="cart-popup">
      <button type="button" className="close-btn" onClick={onClose}>
        X
      </button>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.title} className="cart-item">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div className="cart-item-actions">
              <button onClick={() => dispatch(increaseQuantity(item))}>
                +
              </button>
              <button onClick={() => dispatch(decreaseQuantity(item))}>
                -
              </button>
              <button onClick={() => dispatch(removeFromCart(item))}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      <h3 className="total-amount">Total Amount: ${totalAmount}</h3>
    </div>,
    document.getElementById("portal-root")
  );
}

export default Cart;
