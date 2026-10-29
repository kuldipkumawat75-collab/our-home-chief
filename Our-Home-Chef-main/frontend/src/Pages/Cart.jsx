import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/CSS/Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // Fetch Cart
  const fetchCart = async () => {
    try {
      if (!userId) return;

      const res = await axios.post(
        "http://localhost:4000/api/user/get-cart",
        { userId }
      );

      if (res.data.success) {
        setCartItems(res.data.cartData || []);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.log(error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const syncCart = async () => {
    await fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Increase Quantity
  const increaseQuantity = async (itemId) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/increase",
        { userId, itemId }
      );

      if (res.data.success) {
        syncCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Decrease Quantity
  const decreaseQuantity = async (itemId) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/decrease",
        { userId, itemId }
      );

      if (res.data.success) {
        syncCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Remove Item
  const removeItem = async (itemId) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/remove",
        { userId, itemId }
      );

      if (res.data.success) {
        syncCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.newPrice) * Number(item.quantity),
    0
  );

  return (
    <div className="cart">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                {/* Image */}
                <img
                  src={`http://localhost:4000/image/${item.image}`}
                  alt={item.name}
                />

                {/* Details */}
                <div className="cart-details">
                  <h3>{item.name}</h3>

                  <p>₹{item.newPrice}</p>

                  <div className="quantity">
                    <button onClick={() => decreaseQuantity(item._id)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item._id)}>
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ₹{totalPrice}</h2>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;