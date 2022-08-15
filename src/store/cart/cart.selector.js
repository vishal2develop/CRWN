import { createSelector } from "reselect";

// input Selector - extract off reducer
export const selectCartReducer = (state) => {
  console.log(state.cart);
  return state.cart;
};

// select actual cart items to memoize
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

// select isCartOpen
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
