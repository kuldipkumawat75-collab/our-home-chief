import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  // Load from localStorage on start
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
    setCart(storedCart);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD ITEM
  const addToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // REMOVE ITEM COMPLETELY
  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  // INCREASE
  const increaseQty = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // DECREASE
  const decreaseQty = (id) => {
    setCart((prev) => {
      const qty = (prev[id] || 0) - 1;

      if (qty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }

      return {
        ...prev,
        [id]: qty,
      };
    });
  };

  // TOTAL COUNT
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// custom hook
export const useCart = () => useContext(CartContext);