import { CategoryItem } from "../categories/categories.types";
import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CartItem, CART_REDUCER_TPYES } from "./cart.types";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  if (cartItems.find((cartItem) => cartItem.id === productToAdd.id))
    return increaseQuantity(cartItems, productToAdd);
  else return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const increaseQuantity = (
  cartItems: CartItem[],
  productToIncrease: CategoryItem
): CartItem[] =>
  cartItems.map((cartItem) =>
    cartItem.id === productToIncrease.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );

const decreaseQuantity = (
  cartItems: CartItem[],
  productToDecrease: CartItem
): CartItem[] => {
  if (productToDecrease.quantity === 1)
    return removeCartItem(cartItems, productToDecrease);
  return cartItems.map((cartItem) =>
    cartItem.id === productToDecrease.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export type SetIsCartOpen = ActionWithPayload<
  CART_REDUCER_TPYES.SET_IS_CART_OPEN,
  boolean
>;

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => {
  return createAction(CART_REDUCER_TPYES.SET_IS_CART_OPEN, bool);
});

export type SetCartItems = ActionWithPayload<
  CART_REDUCER_TPYES.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartItems = withMatcher(
  (newCartItems: CartItem[]): SetCartItems => {
    return createAction(CART_REDUCER_TPYES.SET_CART_ITEMS, newCartItems);
  }
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
};

export const decreaseItemQuantity = (
  cartItems: CartItem[],
  productToDecrease: CartItem
) => {
  const newCartItems = decreaseQuantity(cartItems, productToDecrease);
  return setCartItems(newCartItems);
};

export const increaseItemQuantity = (
  cartItems: CartItem[],
  productToIncrease: CategoryItem
) => {
  const newCartItems = increaseQuantity(cartItems, productToIncrease);
  return setCartItems(newCartItems);
};
