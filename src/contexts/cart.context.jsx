import React, { useState, createContext } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  setCartItems: () => null,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
