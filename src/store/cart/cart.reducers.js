import { CART_REDUCER_TPYES } from "./cart.types";

export const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_REDUCER_TPYES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_REDUCER_TPYES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      return state;
  }
};
