import React, { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";
const addCartItem = (cartItems, productToAdd) => {
  // find if cart item contains productToAdd
  // if found, increment quantity
  // else, create new cart item
  // return new array with modified cartItems/ new cart item

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find existing cart item
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity of item is 1 => if it is remove it
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartItems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const clearCartItem = (cartItems, cartItemToBeCleared) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToBeCleared.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  deleteItemFromCart: () => {},
  removeItemfromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};
// Action Creator
export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    /**
     * 1. generate newCartTotal
     * 2. generate newCartCount
     *
     * 3. dispatch new action with payload = {
     *  newCartItems,
     * newCartTotal,
     * newCartCount,
     * }
     */

    // 1
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    // 2
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    // 3
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemfromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const deleteItemFromCart = (cartItemToBeCleared) => {
    const newCartItems = clearCartItem(cartItems, cartItemToBeCleared);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    deleteItemFromCart,
    cartTotal,
    removeItemfromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
