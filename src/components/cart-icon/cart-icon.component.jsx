import React, { useContext } from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/111 shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { setIsCartOpen } = useContext(CartContext);

  const toggleIsCartOpen = () => {
    setIsCartOpen((prev) => !prev);
  };
  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" onClick={toggleIsCartOpen} />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
