import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  cartCount: 0,
  cartTotal: 0,
  removeItemFromCart: () => null,
  decreaseItemQuantity: () => null,
  increaseItemQuantity: () => null,
});

const CART_REDUCER_TPYES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CARD_OPEN: "SET_IS_CARD_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_REDUCER_TPYES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_REDUCER_TPYES.SET_IS_CARD_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandled type ${type}`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReduce = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(
      createAction(CART_REDUCER_TPYES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_REDUCER_TPYES.SET_IS_CARD_OPEN, bool));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReduce(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReduce(newCartItems);
  };

  const decreaseItemQuantity = (productToDecrease) => {
    const newCartItems = decreaseQuantity(cartItems, productToDecrease);
    updateCartItemsReduce(newCartItems);
  };

  const increaseItemQuantity = (productToIncrease) => {
    const newCartItems = increaseQuantity(cartItems, productToIncrease);
    updateCartItemsReduce(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    decreaseItemQuantity,
    increaseItemQuantity,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [cartTotal, setCartTotal] = useState(0);

//   useEffect(() => {
//     const newCartCount = cartItems.reduce(
//       (acc, cartItem) => acc + cartItem.quantity,
//       0
//     );
//     setCartCount(newCartCount);
//   }, [cartItems]);

//   useEffect(() => {
//     const newCartTotal = cartItems.reduce(
//       (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
//       0
//     );

//     setCartTotal(newCartTotal);
//   }, [cartItems]);
