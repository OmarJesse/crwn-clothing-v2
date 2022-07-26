import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_REDUCER_TPYES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
  if (cartItems.find((cartItem) => cartItem.id === productToAdd.id))
    return increaseQuantity(cartItems, productToAdd);
  else return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const increaseQuantity = (cartItems, productToIncrease) =>
  cartItems.map((cartItem) =>
    cartItem.id === productToIncrease.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );

const decreaseQuantity = (cartItems, productToDecrease) => {
  if (productToDecrease.quantity === 1)
    return removeCartItem(cartItems, productToDecrease);
  return cartItems.map((cartItem) =>
    cartItem.id === productToDecrease.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export const setIsCartOpen = (bool) => {
  console.log(bool);
  return createAction(CART_REDUCER_TPYES.SET_IS_CART_OPEN, bool);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_REDUCER_TPYES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_REDUCER_TPYES.SET_CART_ITEMS, newCartItems);
};

export const decreaseItemQuantity = (cartItems, productToDecrease) => {
  const newCartItems = decreaseQuantity(cartItems, productToDecrease);
  return createAction(CART_REDUCER_TPYES.SET_CART_ITEMS, newCartItems);
};

export const increaseItemQuantity = (cartItems, productToIncrease) => {
  const newCartItems = increaseQuantity(cartItems, productToIncrease);
  return createAction(CART_REDUCER_TPYES.SET_CART_ITEMS, newCartItems);
};
