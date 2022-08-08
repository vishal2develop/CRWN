import React, { useContext } from "react";
import { CartIconContainer, ItemCount } from "./cart-icon.styles";
import { ReactComponent as ShoppingIcon } from "../../assets/111 shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => {
    setIsCartOpen((prev) => !prev);
  };
  return (
    <CartIconContainer>
      <ShoppingIcon className="shopping-icon" onClick={toggleIsCartOpen} />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
